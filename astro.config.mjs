import markdocWithContentExtensions from './src/lib/markdoc-math-integration.mjs';
import keystaticDevSave from './src/lib/keystatic-dev-save.mjs';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import studyMigration from './src/data/study-migration.json' with { type: 'json' };

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  output: 'server',
  adapter: vercel(),
  redirects: Object.fromEntries(
    Object.entries(studyMigration.redirects).map(([from, to]) => [
      from,
      { status: 301, destination: to },
    ]),
  ),
  integrations: [
    react(),
    markdocWithContentExtensions({ allowHTML: false, typographer: true }),
    keystatic(),
    keystaticDevSave(),
    sitemap({
      filter: (page) =>
        !page.includes('/keystatic') && !page.includes('/api/') && !page.includes('/fixtures/'),
    }),
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
});
