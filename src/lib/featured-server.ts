import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'yaml';
import keystaticConfig from '../../keystatic.config';
import { githubJson, githubRepo, pathPrefix, workspaceContentReader } from './content-tree/server';
import { publicationIsPublic } from './publication';
import { defaultFeaturedOrder, compareFeatured } from './featured';
import type { FeaturedItem, FeaturedPayload, FeaturedEdit, FeaturedKind } from './featured-types';
import routeManifest from '../generated/route-manifest.json';

type Options = { token?: string; branch?: string | null };
type Source = { path: string; raw: string; data: Record<string, unknown>; item: FeaturedItem };
const roots = [
  'src/content/articles/',
  'src/content/categories/',
  'src/content/projects/',
  'src/content/collections/',
] as const;
const locales = ['zh', 'en', 'de'] as const;
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export class FeaturedConflict extends Error {}
export function parseFeaturedSource(raw: string, file: string) {
  const match = file.endsWith('.mdoc') ? raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/) : null;
  if (file.endsWith('.mdoc') && !match) throw new Error(`内容缺少 frontmatter：${file}`);
  const document = parseDocument(match ? match[1]! : raw);
  if (document.errors.length) throw new Error(`内容格式错误：${file}`);
  return { document, match, data: document.toJS() as Record<string, unknown> };
}
export function rewriteFeatured(
  raw: string,
  file: string,
  edit: Pick<FeaturedEdit, 'featured' | 'featuredOrder'>,
) {
  const { document, match } = parseFeaturedSource(raw, file);
  document.set('featured', edit.featured);
  document.set('featuredOrder', edit.featuredOrder);
  const yaml = document.toString().trimEnd();
  return match
    ? `---\n${yaml}\n---${raw.slice(match[0].length - (match[0].endsWith('\r\n') ? 2 : match[0].endsWith('\n') ? 1 : 0))}`
    : yaml + '\n';
}
const text = (v: unknown) => (typeof v === 'string' ? v : '');
const record = (v: unknown) => (v && typeof v === 'object' ? (v as Record<string, unknown>) : {});
function sourceFor(file: string, raw: string): Source {
  const { data } = parseFeaturedSource(raw, file);
  const article = file.startsWith(roots[0]);
  const kind: FeaturedKind = article
    ? 'article'
    : file.startsWith(roots[1])
      ? 'category'
      : file.startsWith(roots[2])
        ? 'project'
        : 'collection';
  const id = text(
    data[
      article
        ? 'contentId'
        : kind === 'category'
          ? 'categoryId'
          : kind === 'project'
            ? 'projectId'
            : 'collectionId'
    ],
  );
  if (!id) throw new Error(`内容缺少稳定 ID：${file}`);
  const locale = article ? (file.split('/')[3] as 'zh' | 'en' | 'de') : 'all';
  const title = article ? text(data.title) : text(record(record(data.labels).zh).title) || id;
  const collection = article
    ? `articles${locale.charAt(0).toUpperCase() + locale.slice(1)}`
    : kind === 'category'
      ? 'categories'
      : kind === 'project'
        ? 'projects'
        : 'series';
  const slug = article
    ? (file.split('/')[4] ?? '')
    : path.posix.basename(file).replace(/\.ya?ml$/, '');
  if (!slug || (article && !locales.includes(locale as (typeof locales)[number])))
    throw new Error('内容路径无效。');
  const status =
    text(data[article ? 'status' : 'publicationStatus']) || (article ? 'draft' : 'published');
  return {
    path: file,
    raw,
    data,
    item: {
      key: `${kind}:${locale}:${slug}`,
      id,
      kind,
      title,
      locale,
      collection,
      slug,
      featured: data.featured === true,
      featuredOrder:
        typeof data.featuredOrder === 'number' ? data.featuredOrder : defaultFeaturedOrder,
      status,
      isPublic: publicationIsPublic(status, text(data.publishedAt)),
      warning: '',
      preview: null,
    },
  };
}
async function localFiles() {
  const output: { path: string; raw: string }[] = [];
  async function walk(dir: string) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw e;
    }
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;
      const file = path.posix.join(dir, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (
        (dir.startsWith(roots[0]) && entry.name === 'index.mdoc') ||
        (!dir.startsWith(roots[0]) && /\.ya?ml$/.test(entry.name))
      )
        output.push({ path: file, raw: await readFile(file, 'utf8') });
    }
  }
  for (const root of roots) await walk(root);
  return output;
}
async function githubFiles(options: Options) {
  const { branch } = await workspaceContentReader(options);
  if (!options.token || !branch) throw new Error('请先登录并选择分支。');
  const repo = githubRepo();
  const api = `https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}`;
  const ref = await githubJson<{ object: { sha: string } }>(
    `${api}/git/ref/heads/${branch.split('/').map(encodeURIComponent).join('/')}`,
    options.token,
  );
  const tree = await githubJson<{
    truncated: boolean;
    tree: { path: string; type: string; sha: string }[];
  }>(`${api}/git/trees/${ref.object.sha}?recursive=1`, options.token);
  if (tree.truncated) throw new Error('仓库目录被截断，无法安全加载精选。');
  const prefix = pathPrefix();
  const candidates = tree.tree.filter(
    (e) =>
      e.type === 'blob' &&
      e.path.startsWith(prefix) &&
      roots.some((root) => e.path.slice(prefix.length).startsWith(root)) &&
      (/\/index\.mdoc$/.test(e.path) || /\.ya?ml$/.test(e.path)),
  );
  const files: { path: string; raw: string }[] = [];
  // Bound parallel blob reads on larger repositories.
  for (let i = 0; i < candidates.length; i += 8) {
    files.push(
      ...(await Promise.all(
        candidates.slice(i, i + 8).map(async (e) => {
          const blob = await githubJson<{ content: string; encoding: string }>(
            `${api}/git/blobs/${e.sha}`,
            options.token!,
          );
          if (blob.encoding !== 'base64') throw new Error('不支持的 GitHub 内容编码。');
          return {
            path: e.path.slice(prefix.length),
            raw: Buffer.from(blob.content, 'base64').toString('utf8'),
          };
        }),
      )),
    );
  }
  return { files, branch, head: ref.object.sha };
}
async function load(options: Options) {
  if (keystaticConfig.storage.kind === 'cloud') throw new Error('精选工作区暂不支持 Cloud 存储。');
  if (keystaticConfig.storage.kind === 'local' && !import.meta.env.DEV)
    throw new Error('本地精选管理只在开发服务器开放。');
  const remote =
    keystaticConfig.storage.kind === 'github'
      ? await githubFiles(options)
      : { files: await localFiles(), branch: null, head: '' };
  const sources = remote.files
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((f) => sourceFor(f.path, f.raw));
  const folderById = new Map(
    sources.filter((s) => s.item.kind !== 'article').map((s) => [s.item.kind + ':' + s.item.id, s]),
  );
  function visible(source: Source, seen = new Set<string>()): boolean {
    if (!source.item.isPublic || seen.has(source.path)) return false;
    seen.add(source.path);
    for (const field of ['category', 'project', 'collection']) {
      const id = text(source.data[field]);
      if (id) {
        const parent = folderById.get(field + ':' + id);
        if (!parent || !visible(parent, new Set(seen))) return false;
      }
    }
    return true;
  }
  for (const source of sources) {
    source.item.isPublic = visible(source);
    const available =
      source.item.locale === 'all'
        ? locales.filter((l) => text(record(record(source.data.labels)[l]).title))
        : [source.item.locale];
    source.item.warning = !source.item.isPublic
      ? '未公开或上级未公开，不在前台展示'
      : available.length < 3 && source.item.locale === 'all'
        ? '部分语言缺少标题'
        : '';
    source.item.preview =
      routeManifest.find(
        (route) =>
          route.contentId === source.item.id &&
          route.kind === source.item.kind &&
          route.locale === (source.item.locale === 'all' ? 'zh' : source.item.locale),
      )?.pathname ?? null;
  }
  const revision = hash(
    remote.head + '\n' + sources.map((s) => s.path + ':' + hash(s.raw)).join('\n'),
  );
  const payload: FeaturedPayload = {
    items: sources.map((s) => s.item).sort(compareFeatured),
    revision,
    branch: remote.branch,
    storageKind: keystaticConfig.storage.kind as 'local' | 'github',
  };
  return { sources, payload, head: remote.head };
}
export async function loadFeatured(options: Options) {
  return (await load(options)).payload;
}
let localQueue: Promise<unknown> = Promise.resolve();
export async function saveFeatured(options: Options & { revision: string; items: FeaturedEdit[] }) {
  const perform = async () => {
    const { sources, payload, head } = await load(options);
    if (payload.revision !== options.revision)
      throw new FeaturedConflict('内容已被修改，请重新加载后再排序。未覆盖已有改动。');
    if (!Array.isArray(options.items) || options.items.length > sources.length)
      throw new Error('精选数据无效。');
    const byKey = new Map(sources.map((s) => [s.item.key, s]));
    const seen = new Set<string>();
    const changes: { source: Source; raw: string }[] = [];
    for (const edit of options.items) {
      const source = byKey.get(edit.key);
      if (
        !source ||
        seen.has(edit.key) ||
        typeof edit.featured !== 'boolean' ||
        !Number.isSafeInteger(edit.featuredOrder) ||
        edit.featuredOrder < 0 ||
        edit.featuredOrder > 1_000_000_000
      )
        throw new Error('精选条目或排序无效。');
      seen.add(edit.key);
      if (
        edit.featured !== source.item.featured ||
        edit.featuredOrder !== source.item.featuredOrder
      )
        changes.push({ source, raw: rewriteFeatured(source.raw, source.path, edit) });
    }
    if (changes.length && payload.storageKind === 'github') {
      const repo = githubRepo();
      const input = {
        branch: {
          repositoryNameWithOwner: repo.owner + '/' + repo.name,
          branchName: payload.branch,
        },
        expectedHeadOid: head,
        message: { headline: 'Update homepage editorial selection' },
        fileChanges: {
          additions: changes.map((c) => ({
            path: pathPrefix() + c.source.path,
            contents: Buffer.from(c.raw).toString('base64'),
          })),
        },
      };
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + options.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query:
            'mutation SaveFeatured($input: CreateCommitOnBranchInput!) { createCommitOnBranch(input:$input) { ref { target { oid } } } }',
          variables: { input },
        }),
      });
      const result = (await response.json()) as { errors?: { message: string }[] };
      if (!response.ok || result.errors?.length)
        throw new FeaturedConflict(
          result.errors?.map((e) => e.message).join('；') || '提交失败，请重新加载后重试。',
        );
    } else if (changes.length) {
      const written: typeof changes = [];
      try {
        for (const change of changes) {
          if ((await readFile(change.source.path, 'utf8')) !== change.source.raw)
            throw new FeaturedConflict('条目刚刚被修改，请重新加载。');
          const tmp = change.source.path + '.featured-tmp';
          try {
            await writeFile(tmp, change.raw, 'utf8');
            await rename(tmp, change.source.path);
          } finally {
            await unlink(tmp).catch(() => {});
          }
          written.push(change);
        }
      } catch (error) {
        for (const change of written.reverse()) {
          if ((await readFile(change.source.path, 'utf8')) === change.raw)
            await writeFile(change.source.path, change.source.raw, 'utf8');
        }
        throw error;
      }
    }
    return loadFeatured(options);
  };
  if (keystaticConfig.storage.kind !== 'local') return perform();
  const pending = localQueue.then(perform, perform);
  localQueue = pending.catch(() => {});
  return pending;
}
