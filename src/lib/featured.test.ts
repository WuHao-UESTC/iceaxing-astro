import { describe, it, expect, vi } from 'vitest';
vi.mock('../../keystatic.config', () => ({ default: { storage: { kind: 'local' } } }));
vi.mock('./content-tree/server', () => ({
  githubJson: vi.fn(),
  githubRepo: vi.fn(),
  pathPrefix: () => '',
  workspaceContentReader: vi.fn(),
}));
import { compareFeatured } from './featured';
import { parseFeaturedSource, rewriteFeatured } from './featured-server';
describe('unified editorial selection', () => {
  it('sorts mixed content by editorial rank, independently of directory order', () => {
    const items = [
      { kind: 'project', id: 'circuit', featuredOrder: 20 },
      { kind: 'article', id: 'note', featuredOrder: 10 },
      { kind: 'category', id: 'books', featuredOrder: 30 },
      { kind: 'collection', id: 'series', featuredOrder: 15 },
    ];
    expect([...items].sort(compareFeatured).map((i) => i.id)).toEqual([
      'note',
      'series',
      'circuit',
      'books',
    ]);
  });
  it('uses a deterministic tie break for existing selections with no rank', () => {
    const a = { kind: 'article', id: 'b' },
      b = { kind: 'project', id: 'a' };
    expect([a, b].sort(compareFeatured)).toEqual([b, a].sort(compareFeatured));
  });
  it('preserves the complete Markdoc body including math, spacing and line endings', () => {
    const body = '\r\n# A note\r\n\r\n$$x^2$$\r\n\r\n{% concept %}Text{% /concept %}\r\n';
    const raw = '---\r\ncontentId: sample\r\nfeatured: false\r\norder: 7\r\n---' + body;
    const saved = rewriteFeatured(raw, 'src/content/articles/zh/sample/index.mdoc', {
      featured: true,
      featuredOrder: 12,
    });
    const parsed = parseFeaturedSource(saved, 'sample.mdoc');
    expect(parsed.data).toMatchObject({ featured: true, featuredOrder: 12, order: 7 });
    expect(saved.slice(saved.indexOf('\n---', 4) + 4)).toBe(body);
  });
  it('keeps folder labels, comments and publication state when adjusting selection', () => {
    const raw =
      '# Author note\ncategoryId: books\npublicationStatus: draft\nlabels:\n  zh:\n    title: 书架\nfeatured: true\norder: 4\n';
    const saved = rewriteFeatured(raw, 'books.yaml', { featured: false, featuredOrder: 30 });
    expect(saved).toContain('# Author note');
    expect(parseFeaturedSource(saved, 'books.yaml').data).toMatchObject({
      publicationStatus: 'draft',
      labels: { zh: { title: '书架' } },
      order: 4,
      featured: false,
      featuredOrder: 30,
    });
  });
  it('rejects malformed frontmatter before any rewrite', () => {
    expect(() =>
      rewriteFeatured('No frontmatter', 'sample.mdoc', { featured: true, featuredOrder: 1 }),
    ).toThrow();
  });
});
