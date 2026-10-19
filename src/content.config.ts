import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import {
  articleSchema,
  categorySchema,
  friendSchema,
  logSchema,
  locales,
  mottoSchema,
  pageSchema,
  projectSchema,
  seriesSchema,
  siteSettingsSchema,
} from './content/schema';

const localizedContent = <T extends z.ZodType>(base: string, schema: T) =>
  defineCollection({
    loader: glob({
      pattern: '**/index.mdoc',
      base,
      generateId: ({ entry }) => entry.replaceAll('\\', '/').replace(/\/index\.mdoc$/, ''),
    }),
    schema: ({ image }) =>
      schema.and(
        z.object({
          locale: z.enum(locales),
          coverImage: image().optional(),
        }),
      ),
  });

const yamlCollection = <T extends z.ZodType>(base: string, schema: T) =>
  defineCollection({
    loader: glob({ pattern: '**/*.{yaml,yml}', base }),
    schema: ({ image }) => schema.and(z.object({ coverImage: image().optional() })),
  });

export const collections = {
  articles: localizedContent('./src/content/articles', articleSchema),
  logs: localizedContent('./src/content/logs', logSchema),
  pages: localizedContent('./src/content/pages', pageSchema),
  categories: yamlCollection('./src/content/categories', categorySchema),
  projects: yamlCollection('./src/content/projects', projectSchema),
  series: yamlCollection('./src/content/collections', seriesSchema),
  friends: yamlCollection('./src/content/friends', friendSchema),
  mottos: yamlCollection('./src/content/mottos', mottoSchema),
  settings: yamlCollection('./src/content/settings', siteSettingsSchema),
};
