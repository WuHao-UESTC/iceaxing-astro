import type { ImageMetadata } from 'astro';
import Markdoc from '@markdoc/markdoc';
import { posix } from 'node:path';

export type ArticleCover = ImageMetadata | string;
export interface CoverEntry {
  id: string;
  filePath?: string;
  body?: string;
  data: { coverImage?: ImageMetadata };
}

/** Parse actual image nodes so examples in code, comments and escaped text do not become covers. */
export function firstArticleImage(body: string): string | undefined {
  const document = Markdoc.parse(body);
  const visit = (node: typeof document): string | undefined => {
    if (node.type === 'comment' || node.type === 'code' || node.tag === 'comment') return;
    if (
      node.type === 'image' ||
      (node.type === 'tag' && ['articleImage', 'image'].includes(node.tag ?? ''))
    ) {
      const source: unknown = node.attributes.src;
      if (typeof source === 'string' && source.trim()) return source.trim();
    }
    for (const child of node.children) {
      const source = visit(child);
      if (source) return source;
    }
  };
  return visit(document);
}

export function articleImagePath(source: string, filePath: string): string | undefined {
  if (/^https?:\/\//i.test(source)) return source;
  if (/^[a-z][a-z\d+.-]*:|^\/\//i.test(source)) return;
  let decoded: string;
  try {
    decoded = decodeURIComponent(source.split(/[?#]/)[0]!);
  } catch {
    return;
  }
  if (decoded.startsWith('/')) return posix.normalize(decoded);
  const file = filePath.replaceAll('\\', '/');
  const start = file.indexOf('/src/');
  const relativeFile = start >= 0 ? file.slice(start) : '/' + file.replace(/^\/+/, '');
  return posix.normalize(posix.join(posix.dirname(relativeFile), decoded));
}

export function resolveArticleCover(
  entry: CoverEntry,
  assets: Record<string, { default: ArticleCover }>,
): ArticleCover | undefined {
  if (entry.data.coverImage) return entry.data.coverImage;
  const source = firstArticleImage(entry.body ?? '');
  if (!source) return;
  const imagePath = articleImagePath(
    source,
    entry.filePath ?? `src/content/articles/${entry.id}/index.mdoc`,
  );
  if (!imagePath) return;
  if (imagePath.startsWith('/src/')) return assets[imagePath]?.default;
  if (imagePath.startsWith('/') || /^https?:\/\//i.test(imagePath)) return imagePath;
}
