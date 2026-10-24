import { createHash } from 'node:crypto';
import path from 'node:path';
import { parse } from 'yaml';
import { exportRepository, isExportAsset } from './repository';
import { obsidianMarkdown, parseExportArticle } from './markdown';
import { assignExportTree, type ExportFolder } from './tree';

const markdownPath = (value: string) =>
  encodeURI(value).replace(/[()]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);

export type ObsidianExport = {
  version: 1;
  source: string;
  branch: string | null;
  revision?: string | null;
  articleCount: number;
  warnings: string[];
  directories?: string[];
  files: { path: string; text?: string; asset?: string }[];
};
export async function buildObsidianExport(options: {
  token?: string;
  branch?: string | null;
}): Promise<ObsidianExport> {
  const repository = await exportRepository(options);
  const sources = await Promise.all(
    repository.articles
      .sort()
      .map(async (file) => ({ file, text: new TextDecoder().decode(await repository.read(file)) })),
  );
  const articles = sources.map(({ file, text }) => parseExportArticle(file, text));
  const warnings: string[] = [];
  const folders = await Promise.all(
    repository.folders.sort().map(async (file): Promise<ExportFolder> => ({
      kind: file.split('/')[2] as ExportFolder['kind'],
      id: path.posix.basename(file, '.yaml'),
      metadata: parse(new TextDecoder().decode(await repository.read(file))),
    })),
  );
  const directories = assignExportTree(articles, folders, warnings);
  const assets = new Map<string, string>();
  const files: ObsidianExport['files'] = [];
  for (const article of articles) {
    const asset = (url: string) => {
      if (!url || /^(?:https?:|mailto:|#)/i.test(url)) return url;
      if (/^(?:data:|javascript:|file:)/i.test(url))
        throw new Error(`文章包含不支持的资源地址：${article.id}`);
      const suffix = url.match(/[?#].*$/)?.[0] ?? '';
      const raw = decodeURIComponent(url.replace(/[?#].*$/, ''));
      const resolved = raw.startsWith('/media/')
        ? `public${raw}`
        : path.posix.normalize(path.posix.join(path.posix.dirname(article.source), raw));
      const linkedArticle = articles.find(
        (entry) =>
          entry.source === resolved || entry.source === `${resolved.replace(/\/$/, '')}/index.mdoc`,
      );
      if (linkedArticle)
        return (
          markdownPath(
            path.posix.relative(path.posix.dirname(article.notePath), linkedArticle.notePath),
          ) + suffix
        );
      if (!isExportAsset(resolved)) {
        warnings.push(`${article.id}：保留无法转换的链接“${url}”。`);
        return url;
      }
      const exported = `附件/${createHash('sha256').update(resolved).digest('hex').slice(0, 24)}${path.posix.extname(resolved).toLowerCase()}`;
      assets.set(resolved, exported);
      return (
        markdownPath(path.posix.relative(path.posix.dirname(article.notePath), exported)) + suffix
      );
    };
    files.push({
      path: article.notePath,
      text: obsidianMarkdown(article, articles, asset, warnings),
    });
    files.push({
      path: `.sources/${article.locale}/${article.id}.mdoc`,
      text: sources.find((source) => source.file === article.source)!.text,
    });
  }
  files.unshift(...[...assets].map(([asset, path]) => ({ path, asset })));
  return {
    version: 1,
    source: repository.source,
    branch: repository.branch,
    revision: repository.revision,
    articleCount: articles.length,
    warnings: [...new Set(warnings)],
    directories,
    files,
  };
}
