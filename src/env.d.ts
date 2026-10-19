/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_DEPLOY_ENV?: 'development' | 'preview' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
