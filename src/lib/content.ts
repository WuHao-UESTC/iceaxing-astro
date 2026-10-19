import { getCollection, type CollectionEntry } from 'astro:content';

import routeManifest from '../generated/route-manifest.json';
import type { Locale } from '../i18n/config';

export type RouteKind = 'category' | 'project' | 'collection' | 'article' | 'log' | 'page';

export interface RouteEntry {
  pathname: string;
  kind: RouteKind;
  contentId: string;
  locale: Locale;
  sourceFile: string;
}

export type ArticleEntry = CollectionEntry<'articles'>;
export type LogEntry = CollectionEntry<'logs'>;
export type PageEntry = CollectionEntry<'pages'>;
export type CategoryEntry = CollectionEntry<'categories'>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type SeriesEntry = CollectionEntry<'series'>;

export const routes = routeManifest as RouteEntry[];

export function isPublicContent(data: { status: string; publishedAt?: Date }) {
  return (
    data.status === 'published' ||
    (data.status === 'scheduled' && data.publishedAt && data.publishedAt.getTime() <= Date.now())
  );
}

export function routeFor(contentId: string, locale: Locale, kind?: RouteKind) {
  return routes.find(
    (route) =>
      route.contentId === contentId && route.locale === locale && (!kind || route.kind === kind),
  )?.pathname;
}

export function localizedLabel(entry: CategoryEntry | ProjectEntry | SeriesEntry, locale: Locale) {
  return entry.data.labels[locale];
}

export async function getContentIndex() {
  const [articles, logs, pages, categories, projects, series, friends, mottos, settings] =
    await Promise.all([
      getCollection('articles'),
      getCollection('logs'),
      getCollection('pages'),
      getCollection('categories'),
      getCollection('projects'),
      getCollection('series'),
      getCollection('friends'),
      getCollection('mottos'),
      getCollection('settings'),
    ]);

  return { articles, logs, pages, categories, projects, series, friends, mottos, settings };
}

export function byOrder<T extends { data: { order: number } }>(entries: T[]) {
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

export function newestFirst<T extends { data: { publishedAt: Date } }>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function formatDate(value: Date, locale: Locale) {
  const language = locale === 'zh' ? 'zh-CN' : locale === 'de' ? 'de-DE' : 'en-US';
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(value);
}

export function contentAlternates(
  translationKey: string,
  kind: Extract<RouteKind, 'article' | 'log' | 'page'>,
  entries: Array<ArticleEntry | LogEntry | PageEntry>,
) {
  const alternates: Partial<Record<Locale, string>> = {};
  for (const entry of entries) {
    if (entry.data.translationKey !== translationKey) continue;
    const pathname = routeFor(entry.data.contentId, entry.data.locale, kind);
    if (pathname) alternates[entry.data.locale] = pathname;
  }
  return alternates;
}
