import { describe, expect, it } from 'vitest';
import { conceptEditorLocation, conceptWorkspaceHref } from './concept-location';
describe('concept source opens inside the themed workspace', () => {
  it('retains the source branch, article and exact fragment', () => {
    const source =
      '/keystatic/branch/feature%2Fnotes/collection/articlesZh/item/systems#concept-c-one';
    expect(new URLSearchParams(conceptWorkspaceHref(source)!.split('?')[1]).get('editor')).toBe(
      source,
    );
    expect(conceptEditorLocation(source)).toBe(source);
  });
  it.each([
    'https://example.com',
    '//example.com',
    '/keystatic/workspace',
    '/keystatic/collection/friends/item/a',
    '/keystatic/collection/articlesZh/item/../a',
    '/keystatic/collection/articlesZh/item/a?redirect=https://example.com',
    null,
  ])('rejects arbitrary iframe targets: %s', (source) => {
    expect(conceptEditorLocation(source)).toBeNull();
  });
});
