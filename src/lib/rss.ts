import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import type { Locale } from '../i18n/config';
import { isPublicContent, newestFirst, routeFor } from './content';

export async function createRss(locale: Locale, site: URL) {
  const entries = newestFirst(
    (await getCollection('articles')).filter(
      (entry) => entry.data.locale === locale && isPublicContent(entry.data),
    ),
  );
  const copy =
    locale === 'zh'
      ? { title: 'iceaxing · 文章', description: '技术、项目、生活与沿途思考。', language: 'zh-CN' }
      : locale === 'de'
        ? {
            title: 'iceaxing · Artikel',
            description: 'Technik, Projekte, Leben und Gedanken unterwegs.',
            language: 'de-DE',
          }
        : {
            title: 'iceaxing · Articles',
            description: 'Technology, projects, life, and notes along the way.',
            language: 'en-US',
          };

  return rss({
    title: copy.title,
    description: copy.description,
    site,
    customData: `<language>${copy.language}</language>`,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: entry.data.publishedAt,
      link: routeFor(entry.data.contentId, locale, 'article'),
      categories: entry.data.tags,
    })),
  });
}
