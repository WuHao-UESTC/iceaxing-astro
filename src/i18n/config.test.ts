import { describe, expect, it } from 'vitest';
import { isLocale, isPrefixedLocale, localizedPath } from './config';

describe('locale routing', () => {
  it('keeps Chinese at the unprefixed root', () => {
    expect(localizedPath('zh')).toBe('/');
    expect(localizedPath('zh', '/articles/')).toBe('/articles');
  });

  it('prefixes English and German paths', () => {
    expect(localizedPath('en')).toBe('/en');
    expect(localizedPath('de', 'tools')).toBe('/de/tools');
  });

  it('recognizes supported locales', () => {
    expect(isLocale('zh')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isPrefixedLocale('en')).toBe(true);
    expect(isPrefixedLocale('zh')).toBe(false);
  });
});
