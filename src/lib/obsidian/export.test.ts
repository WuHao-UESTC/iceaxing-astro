import { describe, expect, it, vi } from 'vitest';

const contents = vi.hoisted(() => new Map<string, string>());
vi.mock('./repository', () => ({
  isExportAsset: (file: string) => file.startsWith('src/assets/'),
  exportRepository: async () => ({
    source: 'test',
    branch: null,
    revision: 'snapshot',
    articles: [...contents.keys()].filter((file) => file.endsWith('.mdoc')),
    folders: [...contents.keys()].filter((file) => file.endsWith('.yaml')),
    read: async (file: string) => new TextEncoder().encode(contents.get(file)!),
  }),
}));

import { buildObsidianExport } from './export';
import { safeExportPath } from './client';

describe('hierarchical Obsidian export', () => {
  it('exports localized folders, direct articles, links, assets and empty folders from one snapshot', async () => {
    contents.clear();
    contents.set(
      'src/content/categories/category.yaml',
      'group: skill\nlabels:\n  zh:\n    title: 分类\n  en:\n    title: Category',
    );
    contents.set(
      'src/content/projects/project.yaml',
      'category: category\nlabels:\n  zh:\n    title: 项目',
    );
    contents.set(
      'src/content/collections/collection.yaml',
      'project: project\nlabels:\n  zh:\n    title: 合集',
    );
    contents.set(
      'src/content/collections/empty.yaml',
      'project: project\nlabels:\n  zh:\n    title: 空合集',
    );
    const article = (id: string, title: string, relationship: string, body = '', locale = 'zh') => {
      contents.set(
        `src/content/articles/${locale}/${id}/index.mdoc`,
        `---\ncontentId: ${id}\ntitle: ${title}\n${relationship}\n---\n${body}`,
      );
    };
    article(
      'one',
      '文章一',
      'collection: collection',
      '{% wikiLink target="two" /%}\n\n[分类文章](../two/index.mdoc)\n\n![图](../../../../assets/image.webp)',
    );
    article('two', '分类文章 (二)', 'category: category');
    article('three', '项目文章', 'project: project');
    article('four', 'English', 'project: project', '', 'en');
    article('orphan', '孤立文章', 'collection: missing');
    const output = await buildObsidianExport({});
    const notes = new Map(output.files.map((file) => [file.path, file.text]));
    expect(output.articleCount).toBe(5);
    expect(notes.has('zh/技术栈/分类/分类文章 (二).md')).toBe(true);
    expect(notes.has('zh/技术栈/分类/项目/项目文章.md')).toBe(true);
    expect(notes.has('en/技术栈/Category/项目/English.md')).toBe(true);
    expect(notes.has('zh/未归类/孤立文章.md')).toBe(true);
    const body = notes.get('zh/技术栈/分类/项目/合集/文章一.md');
    expect(body).toContain('[[iceaxing-astro/zh/技术栈/分类/分类文章 (二)|分类文章 (二)]]');
    expect(body).toContain(
      '[分类文章](../../%E5%88%86%E7%B1%BB%E6%96%87%E7%AB%A0%20%28%E4%BA%8C%29.md)',
    );
    expect(body).toContain('![图](../../../../../%E9%99%84%E4%BB%B6/');
    expect(output.files.some((file) => file.asset === 'src/assets/image.webp')).toBe(true);
    expect(notes.has('.sources/zh/one.mdoc')).toBe(true);
    expect(output.directories).toContain('zh/技术栈/分类/项目/空合集');
    expect(output.warnings).toEqual([expect.stringContaining('orphan')]);
  });

  it('disambiguates duplicate and sanitized titles deterministically without losing articles', async () => {
    contents.clear();
    for (const [id, title] of [
      ['a', 'Same'],
      ['b', 'same'],
      ['c', 'A/B'],
      ['d', 'A:B'],
      ['e', 'CON'],
      ['f', '__proto__'],
    ]) {
      contents.set(
        `src/content/articles/zh/${id}/index.mdoc`,
        `---\ncontentId: ${id}\ntitle: ${title}\n---\n正文`,
      );
    }
    const output = await buildObsidianExport({});
    const paths = output.files.filter((file) => file.path.endsWith('.md')).map((file) => file.path);
    expect(paths).toContain('zh/未归类/Same.md');
    expect(paths).toContain('zh/未归类/same (b).md');
    expect(paths).toContain('zh/未归类/A-B (d).md');
    expect(new Set(paths.map((file) => file.toLowerCase())).size).toBe(6);
    for (const file of paths) expect(() => safeExportPath(file)).not.toThrow();
    const reversed = [...contents].reverse();
    contents.clear();
    for (const [key, value] of reversed) contents.set(key, value);
    expect((await buildObsidianExport({})).files).toEqual(output.files);
  });
});
