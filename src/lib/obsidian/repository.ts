import { readFile, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import config from '../../../keystatic.config';

function isExportFolder(file: string) {
  return /^src\/content\/(?:categories|projects|collections)\/[a-z0-9-]+\.yaml$/.test(file);
}

export function isExportAsset(file: string) {
  return (
    /^(?:src\/assets\/|public\/media\/)/.test(file) &&
    !file.split('/').some((part) => !part || part === '..' || part === '.') &&
    !/[\\\0]/.test(file) &&
    /\.(?:png|jpe?g|webp|avif|gif|svg|pdf|mp3|mp4|wav|ogg)$/i.test(file)
  );
}
export async function exportRepository(options: { token?: string; branch?: string | null }) {
  if (config.storage.kind === 'local') {
    if (!import.meta.env.DEV) throw new Error('本地文章导出仅在本地开发服务中可用。');
    const root = await realpath(process.cwd());
    const articles: string[] = [];
    const folders: string[] = [];
    for (const kind of ['categories', 'projects', 'collections']) {
      const entries = await readdir(path.join(root, 'src/content', kind)).catch(() => []);
      folders.push(...entries.map((name) => `src/content/${kind}/${name}`).filter(isExportFolder));
    }
    for (const locale of ['zh', 'en', 'de']) {
      const dir = path.join(root, 'src/content/articles', locale);
      const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
      for (const entry of entries)
        if (
          entry.isDirectory() &&
          /^[a-z0-9-]+$/.test(entry.name) &&
          (await readdir(path.join(dir, entry.name))).includes('index.mdoc')
        )
          articles.push(`src/content/articles/${locale}/${entry.name}/index.mdoc`);
    }
    return {
      source: `local:${createHash('sha256').update(root).digest('hex').slice(0, 24)}`,
      branch: null,
      revision: null,
      articles,
      folders,
      async read(file: string) {
        if (!articles.includes(file) && !folders.includes(file) && !isExportAsset(file))
          throw new Error('不允许导出此路径。');
        const absolute = await realpath(path.join(root, file));
        const relative = path.relative(root, absolute);
        if (relative.startsWith('..') || path.isAbsolute(relative))
          throw new Error('资源路径超出仓库。');
        return new Uint8Array(await readFile(absolute));
      },
    };
  }
  if (config.storage.kind !== 'github') throw new Error('当前存储模式不支持 Obsidian 同步。');
  if (!options.token) throw new Error('请先在 Keystatic 中登录 GitHub。');
  const repo =
    typeof config.storage.repo === 'string'
      ? config.storage.repo
      : `${config.storage.repo.owner}/${config.storage.repo.name}`;
  const base = `https://api.github.com/repos/${repo.split('/').map(encodeURIComponent).join('/')}`;
  const json = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${options.token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!response.ok) throw new Error(`读取 GitHub 内容失败（${response.status}）。`);
    return response.json() as Promise<T>;
  };
  const branch = options.branch || (await json<{ default_branch: string }>(base)).default_branch;
  const tree = await json<{
    sha: string;
    truncated: boolean;
    tree: { path: string; type: string; sha: string }[];
  }>(`${base}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
  if (tree.truncated) throw new Error('GitHub 文件列表不完整，暂时无法导出。');
  const prefix = config.storage.pathPrefix?.replace(/^\/+|\/+$/g, '');
  const files = new Map(
    tree.tree
      .filter((entry) => entry.type === 'blob' && (!prefix || entry.path.startsWith(`${prefix}/`)))
      .map((entry) => [prefix ? entry.path.slice(prefix.length + 1) : entry.path, entry.sha]),
  );
  const articles = [...files.keys()].filter((file) =>
    /^src\/content\/articles\/(?:zh|en|de)\/[a-z0-9-]+\/index\.mdoc$/.test(file),
  );
  const folders = [...files.keys()].filter(isExportFolder);
  return {
    source: `github:${repo}`,
    branch,
    revision: tree.sha,
    articles,
    folders,
    async read(file: string) {
      if (!articles.includes(file) && !folders.includes(file) && !isExportAsset(file))
        throw new Error('不允许导出此路径。');
      const sha = files.get(file);
      if (!sha) throw new Error(`找不到文章资源：${file}`);
      const blob = await json<{ encoding: string; content: string }>(`${base}/git/blobs/${sha}`);
      if (blob.encoding !== 'base64') throw new Error('GitHub 资源编码不受支持。');
      return new Uint8Array(Buffer.from(blob.content.replace(/\s/g, ''), 'base64'));
    },
  };
}
