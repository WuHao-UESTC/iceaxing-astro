import { rm } from 'node:fs/promises';
import path from 'node:path';

import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';

import keystaticConfig from '../../../keystatic.config';
import { buildContentTree, planCascadeDeletion } from './model';
import type {
  ContentLocale,
  ContentSnapshot,
  ContentTreePayload,
  FolderKind,
  RawArticleEntry,
  RawFolderEntry,
} from './types';

type LooseRecord = Record<string, unknown>;
type ReaderItem = { slug: string; entry: unknown };
type CollectionReader = { all(): Promise<readonly ReaderItem[]> };
type ContentReader = {
  collections: {
    categories: CollectionReader;
    projects: CollectionReader;
    series: CollectionReader;
    articlesZh: CollectionReader;
    articlesEn: CollectionReader;
    articlesDe: CollectionReader;
    logsZh: CollectionReader;
    logsEn: CollectionReader;
    logsDe: CollectionReader;
    pagesZh: CollectionReader;
    pagesEn: CollectionReader;
    pagesDe: CollectionReader;
  };
};

type GitHubRepo = { owner: string; name: string };

const allowedDeleteRoots = [
  'src/content/categories/',
  'src/content/projects/',
  'src/content/collections/',
  'src/content/articles/',
  'src/assets/content/covers/',
  'src/assets/content/body/',
] as const;

const asRecord = (value: unknown): LooseRecord =>
  typeof value === 'object' && value !== null ? (value as LooseRecord) : {};

const asString = (value: unknown) => (typeof value === 'string' ? value : '');
const asOptionalString = (value: unknown) => {
  const result = asString(value);
  return result || null;
};
const asNumber = (value: unknown) => (typeof value === 'number' ? value : 0);

function localizedLabel(entry: LooseRecord, fallback: string) {
  const labels = asRecord(entry.labels);
  for (const locale of ['zh', 'en', 'de']) {
    const title = asString(asRecord(labels[locale]).title);
    if (title) return title;
  }
  return fallback;
}

function folderEntries(items: readonly ReaderItem[], kind: FolderKind): RawFolderEntry[] {
  return items.map(({ slug, entry: rawEntry }) => {
    const entry = asRecord(rawEntry);
    const idField =
      kind === 'category' ? 'categoryId' : kind === 'project' ? 'projectId' : 'collectionId';
    const parentField = kind === 'project' ? 'category' : kind === 'collection' ? 'project' : null;
    return {
      kind,
      id: asString(entry[idField]) || slug,
      parentId: parentField ? asOptionalString(entry[parentField]) : null,
      label: localizedLabel(entry, slug),
      order: asNumber(entry.order),
      group:
        kind === 'category' && ['skill', 'life', 'study'].includes(asString(entry.group))
          ? (entry.group as RawFolderEntry['group'])
          : undefined,
    };
  });
}

function articleEntries(
  items: readonly ReaderItem[],
  collectionLocale: ContentLocale,
): RawArticleEntry[] {
  return items.map(({ slug, entry: rawEntry }) => {
    const entry = asRecord(rawEntry);
    return {
      locale: collectionLocale,
      contentId: asString(entry.contentId) || slug,
      translationKey: asString(entry.translationKey) || asString(entry.contentId) || slug,
      title: asString(entry.title) || slug,
      status: asString(entry.status) || 'draft',
      order: asNumber(entry.order),
      category: asOptionalString(entry.category),
      project: asOptionalString(entry.project),
      collection: asOptionalString(entry.collection),
    };
  });
}

async function snapshotFromReader(reader: ContentReader): Promise<ContentSnapshot> {
  const documentCollections = [
    ['logsZh', 'logs', 'zh'],
    ['logsEn', 'logs', 'en'],
    ['logsDe', 'logs', 'de'],
    ['pagesZh', 'pages', 'zh'],
    ['pagesEn', 'pages', 'en'],
    ['pagesDe', 'pages', 'de'],
  ] as const;
  const documentsPromise = Promise.all(
    documentCollections.map(async ([collection, contentType, locale]) =>
      articleEntries(await reader.collections[collection].all(), locale).map((entry) => ({
        ...entry,
        contentType,
        category: null,
        project: null,
        collection: null,
      })),
    ),
  );
  const [categories, projects, series, articlesZh, articlesEn, articlesDe, documents] =
    await Promise.all([
      reader.collections.categories.all(),
      reader.collections.projects.all(),
      reader.collections.series.all(),
      reader.collections.articlesZh.all(),
      reader.collections.articlesEn.all(),
      reader.collections.articlesDe.all(),
      documentsPromise,
    ]);

  return {
    documents: documents.flat(),
    folders: [
      ...folderEntries(categories, 'category'),
      ...folderEntries(projects, 'project'),
      ...folderEntries(series, 'collection'),
    ],
    articles: [
      ...articleEntries(articlesZh, 'zh'),
      ...articleEntries(articlesEn, 'en'),
      ...articleEntries(articlesDe, 'de'),
    ],
  };
}

function githubRepo(): GitHubRepo {
  if (keystaticConfig.storage.kind !== 'github') {
    throw new Error('GitHub storage is not configured.');
  }
  const repo = keystaticConfig.storage.repo;
  if (typeof repo === 'string') {
    const [owner, name] = repo.split('/');
    if (!owner || !name) throw new Error('Keystatic GitHub 仓库配置无效。');
    return { owner, name };
  }
  return repo;
}

async function githubJson<T>(url: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub 请求失败（${response.status}）：${message}`);
  }
  return (await response.json()) as T;
}

async function defaultGitHubBranch(token: string) {
  const repo = githubRepo();
  const data = await githubJson<{ default_branch: string }>(
    `https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}`,
    token,
  );
  return data.default_branch;
}

export async function loadContentSnapshot(options: {
  token?: string;
  branch?: string | null;
}): Promise<{ snapshot: ContentSnapshot; branch: string | null }> {
  if (keystaticConfig.storage.kind === 'local') {
    const reader = createReader(process.cwd(), keystaticConfig) as unknown as ContentReader;
    return { snapshot: await snapshotFromReader(reader), branch: null };
  }

  const token = options.token;
  if (!token) throw new Error('请先在 Keystatic 中登录 GitHub。');
  const branch = options.branch || (await defaultGitHubBranch(token));
  const repo = githubRepo();
  const reader = createGitHubReader(keystaticConfig, {
    repo: `${repo.owner}/${repo.name}`,
    ref: branch,
    token,
  }) as unknown as ContentReader;
  return { snapshot: await snapshotFromReader(reader), branch };
}

export async function loadContentTree(options: {
  token?: string;
  branch?: string | null;
}): Promise<ContentTreePayload> {
  const { snapshot, branch } = await loadContentSnapshot(options);
  if (keystaticConfig.storage.kind === 'cloud') {
    throw new Error('内容树工作区暂不支持 Keystatic Cloud storage。');
  }
  return buildContentTree(snapshot, keystaticConfig.storage.kind, branch);
}

function assertDeletePath(candidate: string) {
  const normalized = candidate.replaceAll('\\', '/').replace(/^\/+/, '');
  if (
    normalized.includes('../') ||
    !allowedDeleteRoots.some((root) => normalized.startsWith(root))
  ) {
    throw new Error(`拒绝删除不受管理的路径：${candidate}`);
  }
  return normalized;
}

function pathPrefix() {
  if (keystaticConfig.storage.kind !== 'github' || !keystaticConfig.storage.pathPrefix) return '';
  return `${keystaticConfig.storage.pathPrefix.replace(/^\/+|\/+$/g, '')}/`;
}

async function deleteLocalPaths(paths: string[]) {
  const root = path.resolve(process.cwd());
  for (const candidate of paths) {
    const normalized = assertDeletePath(candidate);
    const absolute = path.resolve(root, normalized);
    if (!absolute.startsWith(`${root}${path.sep}`)) {
      throw new Error(`拒绝删除工作区之外的路径：${candidate}`);
    }
    await rm(absolute, { recursive: true, force: true });
  }
}

async function deleteGitHubPaths(paths: string[], branch: string, token: string) {
  const repo = githubRepo();
  const repoPath = `${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}`;
  const refPath = branch
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  const ref = await githubJson<{ object: { sha: string } }>(
    `https://api.github.com/repos/${repoPath}/git/ref/heads/${refPath}`,
    token,
  );
  const tree = await githubJson<{
    truncated: boolean;
    tree: Array<{ path: string; type: string }>;
  }>(`https://api.github.com/repos/${repoPath}/git/trees/${ref.object.sha}?recursive=1`, token);
  if (tree.truncated) throw new Error('仓库文件树过大，GitHub 返回了截断结果，已中止删除。');

  const prefix = pathPrefix();
  const targets = paths.map((candidate) => prefix + assertDeletePath(candidate));
  const deletions = tree.tree
    .filter(
      (entry) =>
        entry.type === 'blob' &&
        targets.some((target) => entry.path === target || entry.path.startsWith(`${target}/`)),
    )
    .map((entry) => ({ path: entry.path }));
  if (!deletions.length) throw new Error('没有找到可删除的文件，内容可能已经被其他提交修改。');

  const mutation = `
    mutation DeleteContentTree($input: CreateCommitOnBranchInput!) {
      createCommitOnBranch(input: $input) { ref { target { oid } } }
    }
  `;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          branch: {
            repositoryNameWithOwner: `${repo.owner}/${repo.name}`,
            branchName: branch,
          },
          expectedHeadOid: ref.object.sha,
          message: { headline: 'Cascade delete content folder' },
          fileChanges: { deletions },
        },
      },
    }),
  });
  const result = (await response.json()) as {
    errors?: Array<{ message?: string; type?: string }>;
  };
  if (!response.ok || result.errors?.length) {
    const detail = result.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join('；');
    throw new Error(detail || `GitHub 删除提交失败（${response.status}）。`);
  }
}

export async function cascadeDeleteFolder(options: {
  kind: FolderKind;
  id: string;
  confirmation: string;
  token?: string;
  branch?: string | null;
}) {
  if (options.confirmation !== options.id) throw new Error('删除确认信息不匹配。');
  const { snapshot, branch } = await loadContentSnapshot(options);
  const plan = planCascadeDeletion(snapshot, options.kind, options.id);
  if (!plan) throw new Error('要删除的文件夹不存在，内容可能已经被其他操作修改。');

  if (keystaticConfig.storage.kind === 'local') {
    if (!import.meta.env.DEV) {
      throw new Error('Local storage 的级联删除只允许在 Astro 开发服务器中执行。');
    }
    await deleteLocalPaths(plan.paths);
  } else {
    if (!options.token || !branch) throw new Error('缺少 GitHub 登录信息或分支。');
    await deleteGitHubPaths(plan.paths, branch, options.token);
  }

  return {
    branch,
    deleted: {
      folders: plan.folders.length,
      articleGroups: new Set(plan.articles.map((entry) => entry.translationKey)).size,
      articleVersions: plan.articles.length,
      paths: plan.paths.length,
    },
  };
}
