import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { format, resolveConfig } from 'prettier';
import { parse } from 'yaml';

import {
  articleSchema,
  categorySchema,
  friendSchema,
  locales,
  logSchema,
  mottoSchema,
  pageSchema,
  projectSchema,
  seriesSchema,
  siteSettingsSchema,
  type Locale,
} from '../src/content/schema';

type AnyRecord = Record<string, unknown>;
type LoadedEntry = {
  entryKey: string;
  sourceFile: string;
  data: AnyRecord;
  versionHash: string;
};
type RouteKind = 'category' | 'project' | 'collection' | 'article' | 'log' | 'page';
type RouteEntry = {
  pathname: string;
  kind: RouteKind;
  contentId: string;
  locale: Locale;
  sourceFile: string;
};

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const errors: string[] = [];
const prettierConfig = (await resolveConfig(path.join(root, 'package.json'))) ?? {};

const json = (value: unknown) =>
  format(JSON.stringify(value), { ...prettierConfig, parser: 'json' });

const relative = (file: string) => path.relative(root, file).replaceAll('\\', '/');
const versionHash = (source: string) =>
  createHash('sha256').update(source).digest('hex').slice(0, 24);

async function findFiles(directory: string, predicate: (file: string) => boolean) {
  const files: string[] = [];
  try {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) files.push(...(await findFiles(fullPath, predicate)));
      else if (entry.isFile() && predicate(entry.name)) files.push(fullPath);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  return files.sort();
}

function parseMarkdocFrontmatter(source: string, sourceFile: string): AnyRecord {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${sourceFile}: 缺少有效的 YAML frontmatter`);
  return parse(match[1]!) as AnyRecord;
}

function issue(sourceFile: string, message: string) {
  errors.push(`${sourceFile}: ${message}`);
}

function parseWithSchema(
  sourceFile: string,
  raw: AnyRecord,
  schema: {
    safeParse(value: unknown): { success: boolean; data?: unknown; error?: { issues: unknown[] } };
  },
) {
  const result = schema.safeParse(raw);
  if (!result.success) {
    for (const zodIssue of result.error?.issues ?? []) issue(sourceFile, JSON.stringify(zodIssue));
    return null;
  }
  return result.data as AnyRecord;
}

async function loadYaml(
  directory: string,
  idField: string,
  schema: Parameters<typeof parseWithSchema>[2],
) {
  const result: LoadedEntry[] = [];
  for (const file of await findFiles(directory, (name) => /\.ya?ml$/i.test(name))) {
    const sourceFile = relative(file);
    const entryKey = path.basename(file, path.extname(file));
    const source = await readFile(file, 'utf8');
    const raw = parse(source) as AnyRecord;
    const data = parseWithSchema(sourceFile, raw, schema);
    if (!data) continue;
    if (data[idField] !== entryKey) {
      issue(sourceFile, `${idField} 必须与文件键“${entryKey}”一致`);
    }
    result.push({ entryKey, sourceFile, data, versionHash: versionHash(source) });
  }
  return result;
}

async function loadMarkdoc(
  group: 'articles' | 'logs' | 'pages',
  locale: Locale,
  schema: Parameters<typeof parseWithSchema>[2],
) {
  const directory = path.join(contentRoot, group, locale);
  const result: LoadedEntry[] = [];
  for (const file of await findFiles(directory, (name) => name === 'index.mdoc')) {
    const sourceFile = relative(file);
    const entryKey = path.basename(path.dirname(file));
    let raw: AnyRecord;
    try {
      const source = await readFile(file, 'utf8');
      await validateLocalImages(source, file, sourceFile);
      raw = parseMarkdocFrontmatter(source, sourceFile);
      const data = parseWithSchema(sourceFile, raw, schema);
      if (!data) continue;
      data.locale = raw.locale;
      if (data.contentId !== entryKey) issue(sourceFile, `contentId 必须与目录键“${entryKey}”一致`);
      if (data.locale !== locale) issue(sourceFile, `locale 必须是目录语言“${locale}”`);
      result.push({ entryKey, sourceFile, data, versionHash: versionHash(source) });
    } catch (error) {
      issue(sourceFile, (error as Error).message);
    }
  }
  return result;
}

const markdownImagePattern = /!\[[^\]]*\]\(\s*<?([^\s)>]+)>?(?:\s+[^)]*)?\)/g;
const markdocImagePattern =
  /{%\s*image\s+[^%]*?\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s%]+))[^%]*?\/%}/g;

async function validateLocalImages(source: string, file: string, sourceFile: string) {
  const references = new Set<string>();
  for (const match of source.matchAll(markdownImagePattern)) {
    if (match[1]) references.add(match[1]);
  }
  for (const match of source.matchAll(markdocImagePattern)) {
    const reference = match[1] ?? match[2] ?? match[3];
    if (reference) references.add(reference);
  }

  for (const reference of references) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
    let decoded: string;
    try {
      decoded = decodeURI(reference);
    } catch {
      issue(sourceFile, `圖片路徑包含無效的 URL 編碼：${reference}`);
      continue;
    }
    const candidates = decoded.startsWith('/')
      ? [path.resolve(root, 'public', decoded.slice(1))]
      : [path.resolve(path.dirname(file), decoded), path.resolve(root, decoded)];
    let found = false;
    for (const candidate of candidates) {
      try {
        await readFile(candidate);
        found = true;
        break;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      }
    }
    if (!found) issue(sourceFile, `找不到圖片文件：${reference}（解碼後：${decoded}）`);
  }
}

function requiredString(entry: LoadedEntry, key: string) {
  const value = entry.data[key];
  if (typeof value !== 'string' || !value) {
    issue(entry.sourceFile, `${key} 必须是非空字符串`);
    return '';
  }
  return value;
}

function localePrefix(locale: Locale) {
  return locale === 'zh' ? '' : `/${locale}`;
}

function joinRoute(...parts: string[]) {
  return `/${parts
    .filter(Boolean)
    .map((part) => part.replace(/^\/+|\/+$/g, ''))
    .join('/')}`;
}

function isPublic(data: AnyRecord) {
  if (data.status === 'published') return true;
  const publishedAt = data.publishedAt;
  const timestamp =
    publishedAt instanceof Date
      ? publishedAt.getTime()
      : typeof publishedAt === 'string'
        ? Date.parse(publishedAt)
        : Number.NaN;
  return data.status === 'scheduled' && Number.isFinite(timestamp) && timestamp <= Date.now();
}

function uniqueMap(entries: LoadedEntry[], key: string, label: string) {
  const map = new Map<string, LoadedEntry>();
  for (const entry of entries) {
    const value = requiredString(entry, key);
    const previous = map.get(value);
    if (previous) issue(entry.sourceFile, `${label}“${value}”已在 ${previous.sourceFile} 中定义`);
    else if (value) map.set(value, entry);
  }
  return map;
}

const categories = await loadYaml(
  path.join(contentRoot, 'categories'),
  'categoryId',
  categorySchema,
);
const projects = await loadYaml(path.join(contentRoot, 'projects'), 'projectId', projectSchema);
const series = await loadYaml(path.join(contentRoot, 'collections'), 'collectionId', seriesSchema);
await loadYaml(path.join(contentRoot, 'friends'), 'friendId', friendSchema);
await loadYaml(path.join(contentRoot, 'mottos'), 'mottoId', mottoSchema);

const settingsFile = path.join(contentRoot, 'settings', 'site.yaml');
try {
  parseWithSchema(
    relative(settingsFile),
    parse(await readFile(settingsFile, 'utf8')) as AnyRecord,
    siteSettingsSchema,
  );
} catch (error) {
  issue(relative(settingsFile), `无法读取站点设置：${(error as Error).message}`);
}

const articles: LoadedEntry[] = [];
const logs: LoadedEntry[] = [];
const pages: LoadedEntry[] = [];
for (const locale of locales) {
  articles.push(...(await loadMarkdoc('articles', locale, articleSchema)));
  logs.push(...(await loadMarkdoc('logs', locale, logSchema)));
  pages.push(...(await loadMarkdoc('pages', locale, pageSchema)));
}

const categoryById = uniqueMap(categories, 'categoryId', '分类 ID');
const projectById = uniqueMap(projects, 'projectId', '项目 ID');
const seriesById = uniqueMap(series, 'collectionId', '合集 ID');
uniqueMap([...articles, ...logs, ...pages], 'contentId', '内容 ID');

const translationPairs = new Map<string, string>();
for (const entry of [...articles, ...logs, ...pages]) {
  const key = `${requiredString(entry, 'translationKey')}:${requiredString(entry, 'locale')}`;
  const previous = translationPairs.get(key);
  if (previous) issue(entry.sourceFile, `翻译键与语言组合“${key}”已在 ${previous} 中使用`);
  else translationPairs.set(key, entry.sourceFile);
}

const articleTranslationParents = new Map<string, { parent: string; sourceFile: string }>();
for (const article of articles) {
  const translationKey = requiredString(article, 'translationKey');
  const parent = [
    String(article.data.category ?? ''),
    String(article.data.project ?? ''),
    String(article.data.collection ?? ''),
  ].join(':');
  const previous = articleTranslationParents.get(translationKey);
  if (previous && previous.parent !== parent) {
    issue(
      article.sourceFile,
      `翻译组“${translationKey}”必须与 ${previous.sourceFile} 位于同一分类、项目和合集`,
    );
  } else if (!previous) {
    articleTranslationParents.set(translationKey, { parent, sourceFile: article.sourceFile });
  }
}

for (const project of projects) {
  const category = requiredString(project, 'category');
  if (!categoryById.has(category)) issue(project.sourceFile, `引用了不存在的分类“${category}”`);
}

for (const item of series) {
  const project = requiredString(item, 'project');
  if (!projectById.has(project)) issue(item.sourceFile, `引用了不存在的项目“${project}”`);
}

const routes: RouteEntry[] = [];
const addRoute = (route: RouteEntry) => routes.push(route);

for (const locale of locales) {
  const prefix = localePrefix(locale);
  for (const category of categories) {
    addRoute({
      pathname: joinRoute(prefix, requiredString(category, 'slug')),
      kind: 'category',
      contentId: requiredString(category, 'categoryId'),
      locale,
      sourceFile: category.sourceFile,
    });
  }
  for (const project of projects) {
    const category = categoryById.get(requiredString(project, 'category'));
    if (!category) continue;
    addRoute({
      pathname: joinRoute(
        prefix,
        requiredString(category, 'slug'),
        requiredString(project, 'slug'),
      ),
      kind: 'project',
      contentId: requiredString(project, 'projectId'),
      locale,
      sourceFile: project.sourceFile,
    });
  }
  for (const item of series) {
    const project = projectById.get(requiredString(item, 'project'));
    const category = project && categoryById.get(requiredString(project, 'category'));
    if (!project || !category) continue;
    addRoute({
      pathname: joinRoute(
        prefix,
        requiredString(category, 'slug'),
        requiredString(project, 'slug'),
        requiredString(item, 'slug'),
      ),
      kind: 'collection',
      contentId: requiredString(item, 'collectionId'),
      locale,
      sourceFile: item.sourceFile,
    });
  }
}

for (const article of articles) {
  if (!isPublic(article.data)) continue;
  const locale = requiredString(article, 'locale') as Locale;
  const categoryId = typeof article.data.category === 'string' ? article.data.category : '';
  const projectId = typeof article.data.project === 'string' ? article.data.project : '';
  const seriesId = typeof article.data.collection === 'string' ? article.data.collection : '';
  if (Boolean(categoryId) === Boolean(projectId)) {
    issue(article.sourceFile, 'category 与 project 必须且只能填写一个');
    continue;
  }

  let category = categoryId ? categoryById.get(categoryId) : undefined;
  const project = projectId ? projectById.get(projectId) : undefined;
  if (categoryId && !category) issue(article.sourceFile, `引用了不存在的分类“${categoryId}”`);
  if (projectId && !project) issue(article.sourceFile, `引用了不存在的项目“${projectId}”`);
  if (project) category = categoryById.get(requiredString(project, 'category'));

  let item: LoadedEntry | undefined;
  if (seriesId) {
    item = seriesById.get(seriesId);
    if (!projectId) issue(article.sourceFile, '填写 collection 时必须同时填写 project');
    if (!item) issue(article.sourceFile, `引用了不存在的合集“${seriesId}”`);
    else if (requiredString(item, 'project') !== projectId) {
      issue(article.sourceFile, `合集“${seriesId}”不属于项目“${projectId}”`);
    }
  }
  if (!category || (projectId && !project)) continue;

  addRoute({
    pathname: joinRoute(
      localePrefix(locale),
      requiredString(category, 'slug'),
      project ? requiredString(project, 'slug') : '',
      item ? requiredString(item, 'slug') : '',
      requiredString(article, 'slug'),
    ),
    kind: 'article',
    contentId: requiredString(article, 'contentId'),
    locale,
    sourceFile: article.sourceFile,
  });
}

for (const log of logs) {
  if (!isPublic(log.data)) continue;
  const locale = requiredString(log, 'locale') as Locale;
  addRoute({
    pathname: joinRoute(localePrefix(locale), 'log', requiredString(log, 'slug')),
    kind: 'log',
    contentId: requiredString(log, 'contentId'),
    locale,
    sourceFile: log.sourceFile,
  });
}

for (const page of pages) {
  if (page.data.status !== 'published') continue;
  const locale = requiredString(page, 'locale') as Locale;
  addRoute({
    pathname: joinRoute(localePrefix(locale), requiredString(page, 'slug')),
    kind: 'page',
    contentId: requiredString(page, 'contentId'),
    locale,
    sourceFile: page.sourceFile,
  });
}

const routeOwners = new Map<string, RouteEntry>();
for (const route of routes) {
  const previous = routeOwners.get(route.pathname);
  if (previous) {
    issue(
      route.sourceFile,
      `路由“${route.pathname}”与 ${previous.sourceFile}（${previous.kind}）冲突`,
    );
  } else routeOwners.set(route.pathname, route);
}

if (errors.length) {
  console.error(
    `内容校验失败（${errors.length} 项）：\n${errors.map((error) => `- ${error}`).join('\n')}`,
  );
  process.exitCode = 1;
} else {
  const generatedDirectory = path.join(root, 'src', 'generated');
  const publicDirectory = path.join(root, 'public');
  const output = path.join(generatedDirectory, 'route-manifest.json');
  await mkdir(generatedDirectory, { recursive: true });
  await writeFile(
    output,
    await json(routes.sort((a, b) => a.pathname.localeCompare(b.pathname))),
    'utf8',
  );

  const labelsFor = (entry: LoadedEntry) => {
    const labels = entry.data.labels as Record<Locale, { title: string; description?: string }>;
    return Object.fromEntries(
      locales.map((locale) => [locale, labels[locale]?.title ?? entry.entryKey]),
    );
  };
  const subscriptionOptions = {
    version: 1,
    options: [
      ...categories.map((entry) => ({
        key: `category:${entry.entryKey}`,
        kind: 'category',
        id: entry.entryKey,
        labels: labelsFor(entry),
      })),
      ...projects.map((entry) => ({
        key: `project:${entry.entryKey}`,
        kind: 'project',
        id: entry.entryKey,
        parentKey: `category:${String(entry.data.category)}`,
        labels: labelsFor(entry),
      })),
      ...series.map((entry) => ({
        key: `collection:${entry.entryKey}`,
        kind: 'collection',
        id: entry.entryKey,
        parentKey: `project:${String(entry.data.project)}`,
        labels: labelsFor(entry),
      })),
    ],
  };
  await writeFile(
    path.join(generatedDirectory, 'subscription-options.json'),
    await json(subscriptionOptions),
    'utf8',
  );

  const localizedRoutes = (kind: RouteKind, contentId: string) =>
    Object.fromEntries(
      routes
        .filter((route) => route.kind === kind && route.contentId === contentId)
        .map((route) => [route.locale, route.pathname]),
    );
  const asIso = (value: unknown) => {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  };
  const publicationEntries = [
    ...categories.map((entry) => ({
      contentId: entry.entryKey,
      kind: 'category',
      versionHash: entry.versionHash,
      publishedAt: asIso(entry.data.createdAt),
      titles: labelsFor(entry),
      urls: localizedRoutes('category', entry.entryKey),
      subscriptionKeys: [`category:${entry.entryKey}`],
    })),
    ...projects.map((entry) => ({
      contentId: entry.entryKey,
      kind: 'project',
      versionHash: entry.versionHash,
      publishedAt: asIso(entry.data.createdAt),
      titles: labelsFor(entry),
      urls: localizedRoutes('project', entry.entryKey),
      subscriptionKeys: [`category:${String(entry.data.category)}`, `project:${entry.entryKey}`],
    })),
    ...series.map((entry) => {
      const project = projectById.get(String(entry.data.project));
      return {
        contentId: entry.entryKey,
        kind: 'collection',
        versionHash: entry.versionHash,
        publishedAt: asIso(entry.data.createdAt),
        titles: labelsFor(entry),
        urls: localizedRoutes('collection', entry.entryKey),
        subscriptionKeys: [
          ...(project ? [`category:${String(project.data.category)}`] : []),
          `project:${String(entry.data.project)}`,
          `collection:${entry.entryKey}`,
        ],
      };
    }),
    ...articles
      .filter((entry) => isPublic(entry.data))
      .map((entry) => {
        const project = projectById.get(String(entry.data.project ?? ''));
        const categoryId = String(entry.data.category ?? project?.data.category ?? '');
        const locale = entry.data.locale as Locale;
        return {
          contentId: entry.entryKey,
          kind: 'article',
          versionHash: entry.versionHash,
          publishedAt: asIso(entry.data.publishedAt),
          titles: { [locale]: String(entry.data.title) },
          urls: { [locale]: localizedRoutes('article', entry.entryKey)[locale] },
          subscriptionKeys: [
            ...(categoryId ? [`category:${categoryId}`] : []),
            ...(entry.data.project ? [`project:${String(entry.data.project)}`] : []),
            ...(entry.data.collection ? [`collection:${String(entry.data.collection)}`] : []),
          ],
        };
      }),
  ].sort((a, b) => `${a.kind}:${a.contentId}`.localeCompare(`${b.kind}:${b.contentId}`));
  const publicationManifest = { version: 1, entries: publicationEntries };
  const publicationJson = await json(publicationManifest);
  await writeFile(
    path.join(generatedDirectory, 'publication-manifest.json'),
    publicationJson,
    'utf8',
  );
  await writeFile(path.join(publicDirectory, 'publication-manifest.json'), publicationJson, 'utf8');
  console.log(
    `内容校验通过：${articles.length} 篇文章、${logs.length} 条日志、${pages.length} 个页面、${routes.length} 条公开路由。`,
  );
}
