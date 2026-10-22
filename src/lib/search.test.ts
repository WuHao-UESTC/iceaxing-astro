import { describe, expect, it } from 'vitest';
import {
  normalizeSearchText,
  safeSearchUrl,
  searchableBody,
  searchDocuments,
  searchTerms,
  type SearchDocument,
} from './search';
import { searchCountLabel } from './search-copy';

const documents: SearchDocument[] = [
  {
    url: '/filters',
    title: '射频滤波器设计',
    description: '模拟电路',
    body: '从传递函数开始学习。',
    tags: ['RF', '模拟'],
    type: 'article',
    category: 'analog-ic',
  },
  {
    url: '/cmos',
    title: 'CMOS notes',
    description: 'Filters and circuits',
    body: 'MOS 小信号模型与射频滤波器',
    type: 'article',
    category: 'cmos',
  },
  {
    url: '/project',
    title: 'Filter project',
    description: 'A résumé of circuits',
    tags: ['RF'],
    type: 'project',
    category: 'analog-ic',
  },
];
describe('search', () => {
  it('matches Chinese substrings and ranks titles ahead of body text', () => {
    const result = searchDocuments(documents, '滤波器');
    expect(result.total).toBe(2);
    expect(result.items[0]?.url).toBe('/filters');
    expect(result.items[1]?.excerpt).toContain('滤波器');
  });
  it('normalizes accents, case and whitespace', () => {
    expect(normalizeSearchText('  RÉSUMÉ  CMOS ')).toBe('resume cmos');
    expect(searchDocuments(documents, 'resume').items[0]?.url).toBe('/project');
    expect(searchDocuments(documents, 'cMoS').total).toBe(1);
  });
  it('requires all terms and supports tag prefixes and quoted phrases', () => {
    expect(searchDocuments(documents, '#RF 模拟').total).toBe(1);
    expect(searchDocuments(documents, 'RF nonexistent').total).toBe(0);
    expect(searchTerms('"CMOS notes" RF RF')).toEqual(['cmos notes', 'rf']);
    expect(searchDocuments(documents, '#').total).toBe(0);
  });
  it('combines type and category filters and permits filter-only browsing', () => {
    expect(
      searchDocuments(documents, '', { type: 'article', category: 'analog-ic' }).items.map(
        (item) => item.url,
      ),
    ).toEqual(['/filters']);
    expect(searchDocuments(documents, 'filter', { type: 'project' }).total).toBe(1);
  });
  it('paginates without losing the actual total or duplicating entries', () => {
    const many = Array.from({ length: 25 }, (_, i) => ({ ...documents[0]!, url: '/a-' + i }));
    const first = searchDocuments(many, '滤波器'),
      second = searchDocuments(many, '滤波器', { page: 2 });
    expect(first.total).toBe(25);
    expect(first.items).toHaveLength(12);
    expect(second.items).toHaveLength(12);
    expect(new Set([...first.items, ...second.items].map((item) => item.url)).size).toBe(24);
    expect(searchDocuments(many, '', { page: 3 }).hasMore).toBe(false);
    expect(searchDocuments(many, '', { page: 3 }).items).toHaveLength(1);
  });
  it('keeps a late match in the excerpt rather than truncating it away', () => {
    const result = searchDocuments(
      [{ ...documents[0]!, description: '', body: '开头'.repeat(300) + '目标词出现在这里' }],
      '目标词',
    );
    expect(result.items[0]?.excerpt).toContain('目标词');
  });
  it('strips Markdoc commands, HTML comments and image URLs', () => {
    expect(
      searchableBody(
        '<!-- private -->{% callout %}Hello **world** [link](/foo) ![image](/image.jpg){% /callout %}',
      ),
    ).toBe('Hello world link');
  });
  it('rejects executable, external and malformed result URLs', () => {
    expect(safeSearchUrl('javascript:alert(1)', 'https://blog.test')).toBeUndefined();
    expect(safeSearchUrl('//evil.test/', 'https://blog.test')).toBeUndefined();
    expect(safeSearchUrl('https://evil.test/', 'https://blog.test')).toBeUndefined();
    expect(safeSearchUrl('/hello?q=x#section', 'https://blog.test')).toBe('/hello?q=x#section');
  });
  it('localizes exact totals independently of the visible page size', () => {
    expect(searchCountLabel('zh', 12, 25)).toContain('25');
    expect(searchCountLabel('en', 1, 1)).toBe('1 result · 1 shown');
    expect(searchCountLabel('de', 12, 25)).toBe('25 Treffer · 12 angezeigt');
  });
});
