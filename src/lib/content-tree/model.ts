import type {
  ArticleNode,
  ArticleVersion,
  CascadeDeletionPlan,
  ContentLocale,
  ContentSnapshot,
  ContentTreePayload,
  FolderKind,
  FolderNode,
  RawArticleEntry,
  RawFolderEntry,
} from './types';

const localeOrder: ContentLocale[] = ['zh', 'en', 'de'];

const folderCollection = {
  category: 'categories',
  project: 'projects',
  collection: 'series',
} as const;

const articleCollection = {
  zh: 'articlesZh',
  en: 'articlesEn',
  de: 'articlesDe',
} as const;

export const folderKey = (kind: FolderKind, id: string) => `${kind}:${id}`;

export function articleParentKey(article: RawArticleEntry) {
  if (article.collection) return folderKey('collection', article.collection);
  if (article.project) return folderKey('project', article.project);
  if (article.category) return folderKey('category', article.category);
  return null;
}

export function buildContentTree(
  snapshot: ContentSnapshot,
  storageKind: ContentTreePayload['storageKind'],
  branch: string | null,
): ContentTreePayload {
  const warnings: string[] = [];
  const folderKeys = new Set(snapshot.folders.map((entry) => folderKey(entry.kind, entry.id)));
  const folders: FolderNode[] = snapshot.folders.map((entry) => {
    const expectedParentKey =
      entry.kind === 'category' || !entry.parentId
        ? null
        : folderKey(entry.kind === 'project' ? 'category' : 'project', entry.parentId);
    if (expectedParentKey && !folderKeys.has(expectedParentKey)) {
      warnings.push(`文件夹“${entry.label || entry.id}”的父级不存在，已暂时显示在根目录。`);
    }
    return {
      key: folderKey(entry.kind, entry.id),
      kind: entry.kind,
      id: entry.id,
      label: entry.label || entry.id,
      parentKey: expectedParentKey && folderKeys.has(expectedParentKey) ? expectedParentKey : null,
      order: entry.order ?? 0,
      editorCollection: folderCollection[entry.kind],
    };
  });

  const articleGroups = new Map<string, RawArticleEntry[]>();
  for (const article of snapshot.articles) {
    const group = articleGroups.get(article.translationKey) ?? [];
    group.push(article);
    articleGroups.set(article.translationKey, group);
  }

  const articles: ArticleNode[] = [...articleGroups.entries()].map(([translationKey, entries]) => {
    const orderedEntries = [...entries].sort(
      (a, b) => localeOrder.indexOf(a.locale) - localeOrder.indexOf(b.locale),
    );
    const parentKeys = new Set(orderedEntries.map(articleParentKey));
    const hasInconsistentParent = parentKeys.size > 1;
    if (hasInconsistentParent) {
      warnings.push(`翻译组“${translationKey}”的语言版本位于不同文件夹，请统一归属。`);
    }
    const preferred = orderedEntries[0]!;
    const expectedParentKey = articleParentKey(preferred);
    if (expectedParentKey && !folderKeys.has(expectedParentKey)) {
      warnings.push(`文章“${preferred.title || translationKey}”的父级不存在，已暂时显示在根目录。`);
    }
    const versions: ArticleVersion[] = orderedEntries.map((entry) => ({
      locale: entry.locale,
      contentId: entry.contentId,
      title: entry.title,
      status: entry.status,
      editorCollection: articleCollection[entry.locale],
    }));

    return {
      key: `article:${translationKey}`,
      kind: 'article',
      translationKey,
      label: preferred.title || translationKey,
      parentKey: expectedParentKey && folderKeys.has(expectedParentKey) ? expectedParentKey : null,
      order: preferred.order ?? 0,
      versions,
      hasInconsistentParent,
    };
  });

  return { storageKind, branch, folders, articles, warnings };
}

function contentPathForFolder(folder: RawFolderEntry) {
  const directory =
    folder.kind === 'category'
      ? 'categories'
      : folder.kind === 'project'
        ? 'projects'
        : 'collections';
  return `src/content/${directory}/${folder.id}.yaml`;
}

export function planCascadeDeletion(
  snapshot: ContentSnapshot,
  rootKind: FolderKind,
  rootId: string,
): CascadeDeletionPlan | null {
  const root = snapshot.folders.find((entry) => entry.kind === rootKind && entry.id === rootId);
  if (!root) return null;

  const categoryIds = new Set<string>();
  const projectIds = new Set<string>();
  const collectionIds = new Set<string>();

  if (rootKind === 'category') categoryIds.add(rootId);
  if (rootKind === 'project') projectIds.add(rootId);
  if (rootKind === 'collection') collectionIds.add(rootId);

  if (categoryIds.size) {
    for (const folder of snapshot.folders) {
      if (folder.kind === 'project' && folder.parentId && categoryIds.has(folder.parentId)) {
        projectIds.add(folder.id);
      }
    }
  }
  if (projectIds.size) {
    for (const folder of snapshot.folders) {
      if (folder.kind === 'collection' && folder.parentId && projectIds.has(folder.parentId)) {
        collectionIds.add(folder.id);
      }
    }
  }

  const folders = snapshot.folders.filter(
    (entry) =>
      (entry.kind === 'category' && categoryIds.has(entry.id)) ||
      (entry.kind === 'project' && projectIds.has(entry.id)) ||
      (entry.kind === 'collection' && collectionIds.has(entry.id)),
  );
  const articles = snapshot.articles.filter(
    (entry) =>
      Boolean(entry.category && categoryIds.has(entry.category)) ||
      Boolean(entry.project && projectIds.has(entry.project)) ||
      Boolean(entry.collection && collectionIds.has(entry.collection)),
  );

  const deletedIds = new Set([
    ...folders.map((entry) => entry.id),
    ...articles.map((entry) => entry.contentId),
  ]);
  const retainedIds = new Set([
    ...snapshot.folders.filter((entry) => !folders.includes(entry)).map((entry) => entry.id),
    ...snapshot.articles
      .filter((entry) => !articles.includes(entry))
      .map((entry) => entry.contentId),
  ]);

  const paths = new Set<string>();
  for (const folder of folders) paths.add(contentPathForFolder(folder));
  for (const article of articles) {
    paths.add(`src/content/articles/${article.locale}/${article.contentId}`);
    paths.add(`src/assets/content/body/${article.contentId}`);
  }
  for (const id of deletedIds) {
    if (!retainedIds.has(id)) paths.add(`src/assets/content/covers/${id}`);
  }

  return {
    root: { kind: root.kind, id: root.id, label: root.label },
    folders,
    articles,
    paths: [...paths].sort(),
  };
}
