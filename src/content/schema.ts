import { z } from 'astro/zod';

export const locales = ['zh', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const stableKeyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const urlSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dateTimeSchema = z.coerce.date();

export const localizedTextSchema = z.object({
  zh: z.object({ title: z.string().min(1), description: z.string().default('') }),
  en: z.object({ title: z.string().min(1), description: z.string().default('') }),
  de: z.object({ title: z.string().min(1), description: z.string().default('') }),
});

export const seoSchema = z
  .object({
    title: z.string().default(''),
    description: z.string().default(''),
  })
  .default({ title: '', description: '' });

export const baseContentSchema = z.object({
  contentId: z.string().regex(stableKeyPattern),
  translationKey: z.string().regex(stableKeyPattern),
  title: z.string().min(1),
  slug: z.string().regex(urlSlugPattern),
  excerpt: z.string().default(''),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']),
  publishedAt: dateTimeSchema,
  updatedAt: dateTimeSchema.optional(),
  tags: z.array(z.string().min(1)).default([]),
  authorName: z.string().min(1).default('iceaxing'),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
  seo: seoSchema,
  legacySanityId: z.string().optional(),
  legacyPath: z.string().optional(),
});

export const articleSchema = baseContentSchema.extend({
  category: z.string().regex(stableKeyPattern).nullable().optional(),
  project: z.string().regex(stableKeyPattern).nullable().optional(),
  collection: z.string().regex(stableKeyPattern).nullable().optional(),
});

export const logSchema = baseContentSchema.extend({
  logDate: dateTimeSchema,
  category: z.string().default('随笔'),
});

export const pageSchema = baseContentSchema
  .pick({
    contentId: true,
    translationKey: true,
    title: true,
    slug: true,
    excerpt: true,
    status: true,
    updatedAt: true,
    seo: true,
  })
  .extend({
    pageKind: z.enum(['about', 'profile', 'custom']),
  });

export const categorySchema = z.object({
  categoryId: z.string().regex(stableKeyPattern),
  slug: z.string().regex(urlSlugPattern),
  group: z.enum(['skill', 'life']),
  labels: localizedTextSchema,
  tags: z.array(z.string()).default([]),
  order: z.number().int().min(0).default(0),
  icon: z.string().default(''),
  createdAt: dateTimeSchema,
});

export const projectSchema = z.object({
  projectId: z.string().regex(stableKeyPattern),
  slug: z.string().regex(urlSlugPattern),
  category: z.string().regex(stableKeyPattern),
  labels: localizedTextSchema,
  status: z.enum(['planned', 'active', 'completed', 'archived']),
  progress: z.number().int().min(0).max(100),
  tags: z.array(z.string()).default([]),
  order: z.number().int().min(0).default(0),
  createdAt: dateTimeSchema,
});

export const seriesSchema = z.object({
  collectionId: z.string().regex(stableKeyPattern),
  slug: z.string().regex(urlSlugPattern),
  project: z.string().regex(stableKeyPattern),
  labels: localizedTextSchema,
  tags: z.array(z.string()).default([]),
  order: z.number().int().min(0).default(0),
  createdAt: dateTimeSchema,
});

export const friendSchema = z.object({
  friendId: z.string().regex(stableKeyPattern),
  name: z.string().min(1),
  url: z.url(),
  avatar: z.url().or(z.string().startsWith('/')).optional(),
  description: z.string().default(''),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const mottoSchema = z.object({
  mottoId: z.string().regex(stableKeyPattern),
  locale: z.enum(locales),
  text: z.string().min(1),
  source: z.string().default(''),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1),
  authorName: z.string().min(1),
  descriptions: z.object({ zh: z.string(), en: z.string(), de: z.string() }),
  socialLinks: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  features: z.object({ subscriptions: z.boolean(), comments: z.boolean() }),
});
