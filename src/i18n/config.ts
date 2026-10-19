export const locales = ['zh', 'en', 'de'] as const;
export const prefixedLocales = ['en', 'de'] as const;
export const defaultLocale = 'zh' as const;

export type Locale = (typeof locales)[number];
export type PrefixedLocale = (typeof prefixedLocales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

export function isPrefixedLocale(value: string | undefined): value is PrefixedLocale {
  return typeof value === 'string' && prefixedLocales.includes(value as PrefixedLocale);
}

export function localizedPath(locale: Locale, path = '/'): string {
  const normalized = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return locale === defaultLocale ? normalized || '/' : `/${locale}${normalized}`;
}

export const htmlLanguage: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  de: 'de',
};
