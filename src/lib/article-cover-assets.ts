import type { ImageMetadata } from 'astro';
import { resolveArticleCover, type CoverEntry, type ArticleCover } from './article-cover';

const assets: Record<string, { default: ArticleCover }> = import.meta.glob<{
  default: ImageMetadata;
}>('/src/assets/**/*.{avif,webp,jpg,jpeg,png,gif,JPG,JPEG,PNG,AVIF,WEBP,GIF}', { eager: true });
// SVG imports are components in Astro; request their URL for decorative covers.
const vectors = import.meta.glob<string>('/src/assets/**/*.{svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
});
for (const [key, source] of Object.entries(vectors)) assets[key] = { default: source };

export const getArticleCover = (entry: CoverEntry) => resolveArticleCover(entry, assets);
