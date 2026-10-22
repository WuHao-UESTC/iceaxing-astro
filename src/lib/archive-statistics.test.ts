import { describe, expect, it } from 'vitest';
import { archiveStatistics } from './archive-statistics';

describe('archiveStatistics', () => {
  it('separates projects and directly owned articles on category pages', () => {
    expect(
      archiveStatistics('category', [
        { kind: 'project' },
        { kind: 'project' },
        { kind: 'article' },
        { kind: 'article', standalone: false },
      ]),
    ).toEqual([
      { type: 'project', count: 2 },
      { type: 'article', count: 1 },
    ]);
  });
  it('does not count collection articles as standalone project articles', () => {
    expect(
      archiveStatistics('project', [
        { kind: 'collection' },
        { kind: 'article', standalone: true },
        { kind: 'article', standalone: false },
        { kind: 'article', standalone: false },
      ]),
    ).toEqual([
      { type: 'collection', count: 1 },
      { type: 'article', count: 1 },
    ]);
  });
  it('counts all implicit article cards in a collection', () => {
    expect(archiveStatistics('collection', [{}, {}, { standalone: false }])).toEqual([
      { type: 'article', count: 3 },
    ]);
  });
  it('keeps both statistics visible when a category or project is empty', () => {
    expect(archiveStatistics('category', [])).toEqual([
      { type: 'project', count: 0 },
      { type: 'article', count: 0 },
    ]);
    expect(archiveStatistics('project', [])).toEqual([
      { type: 'collection', count: 0 },
      { type: 'article', count: 0 },
    ]);
    expect(archiveStatistics('collection', [])).toEqual([{ type: 'article', count: 0 }]);
  });
  it('supports index pages without changing their card types', () => {
    expect(archiveStatistics('index', [{ kind: 'project' }, { kind: 'project' }])).toEqual([
      { type: 'project', count: 2 },
    ]);
    expect(archiveStatistics('index', [{}, {}])).toEqual([{ type: 'entry', count: 2 }]);
    expect(archiveStatistics('index', [])).toEqual([{ type: 'entry', count: 0 }]);
  });
});
