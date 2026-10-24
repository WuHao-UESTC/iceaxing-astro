import { describe, expect, it, vi } from 'vitest';
import { parseExportArticle, obsidianMarkdown } from './markdown';
import { safeExportPath, syncObsidian } from './client';

const source = 'src/content/articles/zh/example/index.mdoc';
const article = (body: string, id = 'example') =>
  parseExportArticle(
    source.replace('/example/', `/${id}/`),
    `---\ncontentId: ${id}\ntranslationKey: ${id}\ntitle: 标题 ${id}\nstatus: draft\ntags: [test]\n---\n${body}`,
  );
function vault() {
  const files = new Map<string, Uint8Array>();
  const dirs = new Set(['']);
  const directory = (prefix = ''): FileSystemDirectoryHandle =>
    ({
      name: prefix.split('/').at(-1) || 'vault',
      kind: 'directory',
      async getDirectoryHandle(name: string, options?: { create?: boolean }) {
        const key = prefix ? `${prefix}/${name}` : name;
        if (
          !dirs.has(key) &&
          !options?.create &&
          ![...files.keys()].some((file) => file.startsWith(`${key}/`))
        )
          throw new DOMException('missing', 'NotFoundError');
        dirs.add(key);
        return directory(key);
      },
      async getFileHandle(name: string, options?: { create?: boolean }) {
        const key = prefix ? `${prefix}/${name}` : name;
        if (!files.has(key) && !options?.create) throw new DOMException('missing', 'NotFoundError');
        return {
          async getFile() {
            return new Blob([new Uint8Array(files.get(key)!)]);
          },
          async createWritable() {
            let next: Uint8Array;
            return {
              async write(value: string | Uint8Array) {
                next = typeof value === 'string' ? new TextEncoder().encode(value) : value;
              },
              async close() {
                files.set(key, next);
              },
              async abort() {},
            };
          },
        };
      },
    }) as unknown as FileSystemDirectoryHandle;
  return { root: directory(), files, dirs };
}
describe('Obsidian export', () => {
  it('creates empty hierarchy directories beneath the selected root and leaves the legacy folder intact', async () => {
    const { root, files, dirs } = vault();
    files.set('Keystatic/old.md', new TextEncoder().encode('legacy'));
    await syncObsidian(
      root,
      {
        version: 1,
        source: 'test',
        branch: null,
        articleCount: 0,
        warnings: [],
        directories: ['zh/技术栈/分类/项目/空合集'],
        files: [],
      },
      () => {},
    );
    expect(dirs.has('iceaxing-astro/zh/技术栈/分类/项目/空合集')).toBe(true);
    expect(new TextDecoder().decode(files.get('Keystatic/old.md'))).toBe('legacy');
  });
  it('converts formulas, resolved links, callouts, tables and image assets, retaining code literally', () => {
    const current = article(
      '公式：{% inlineMath expression="a_b" /%}\n\n{% math expression="\\\\frac{1}{2}" /%}\n\n{% wikiLink target="other" /%}\n\n{% callout variant="tip" title="提示" %}\n正文\n{% /callout %}\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n{% articleImage src="image.webp" alt="图" /%}\n\n```md\n{% math expression="literal" /%}\n```',
    );
    const warnings: string[] = [];
    const output = obsidianMarkdown(
      current,
      [current, article('target', 'other')],
      (url) => `assets/${url}`,
      warnings,
    );
    expect(output).toContain('$a_b$');
    expect(output).toContain('$$\n\\frac{1}{2}\n$$');
    expect(output).toContain('[[iceaxing-astro/文章/zh/other|标题 other]]');
    expect(output).toContain('> [!tip] 提示\n> 正文');
    expect(output).toContain('| 1 | 2 |');
    expect(output).toContain('![图](assets/image.webp)');
    expect(output).toContain('{% math expression="literal" /%}');
    expect(output).toContain('status: draft');
    expect(output).toContain('aliases:');
    expect(warnings).toEqual([]);
  });
  it('rejects paths escaping the selected managed folder', () => {
    for (const path of [
      '../note.md',
      '/absolute.md',
      'a/../../note.md',
      'C:\\vault\\note.md',
      'a//b.md',
      '.keystatic-sync.json',
    ])
      expect(() => safeExportPath(path)).toThrow();
    expect(safeExportPath('.sources/zh/id.mdoc')).toEqual(['.sources', 'zh', 'id.mdoc']);
  });
  it('updates only untouched managed files, is repeatable and preserves local edits and unrelated files', async () => {
    const { root, files } = vault();
    files.set('personal.md', new TextEncoder().encode('personal'));
    const payload = {
      version: 1 as const,
      source: 'test',
      branch: null,
      articleCount: 1,
      warnings: [],
      files: [{ path: '文章/zh/id.md', text: 'first' }],
    };
    expect((await syncObsidian(root, payload, () => {})).changed).toBe(1);
    expect((await syncObsidian(root, payload, () => {})).unchanged).toBe(1);
    payload.files[0]!.text = 'second';
    expect((await syncObsidian(root, payload, () => {})).changed).toBe(1);
    files.set('iceaxing-astro/文章/zh/id.md', new TextEncoder().encode('local edit'));
    payload.files[0]!.text = 'third';
    expect((await syncObsidian(root, payload, () => {})).conflicts).toEqual(['文章/zh/id.md']);
    expect(new TextDecoder().decode(files.get('iceaxing-astro/文章/zh/id.md'))).toBe('local edit');
    expect(new TextDecoder().decode(files.get('personal.md'))).toBe('personal');
    expect((await syncObsidian(root, { ...payload, files: [] }, () => {})).changed).toBe(0);
    expect(files.has('iceaxing-astro/文章/zh/id.md')).toBe(true);
  });
  it('does not take over a foreign manifest or overwrite an existing untracked note', async () => {
    const { root, files } = vault();
    files.set('iceaxing-astro/文章/zh/id.md', new TextEncoder().encode('existing'));
    const payload = {
      version: 1 as const,
      source: 'test',
      branch: null,
      articleCount: 1,
      warnings: [],
      files: [{ path: '文章/zh/id.md', text: 'new' }],
    };
    expect((await syncObsidian(root, payload, () => {})).conflicts).toHaveLength(1);
    files.set(
      'iceaxing-astro/.keystatic-sync.json',
      new TextEncoder().encode('{"owner":"other","files":{}}'),
    );
    await expect(syncObsidian(root, payload, () => {})).rejects.toThrow('其他来源');
  });
  it('downloads bounded asset chunks from the pinned revision and reassembles the original bytes', async () => {
    const { root, files } = vault();
    const fetchMock = vi.fn(async (input: URL) => {
      const url = new URL(input);
      expect(url.searchParams.get('branch')).toBe('pinned-tree');
      const offset = Number(url.searchParams.get('offset'));
      return new Response(new Uint8Array(offset === 0 ? [1, 2, 3] : [4, 5]), {
        headers: { 'X-Asset-Size': '5', 'X-Asset-Offset': String(offset) },
      });
    });
    vi.stubGlobal('window', { location: { origin: 'https://example.com' } });
    vi.stubGlobal('fetch', fetchMock);
    try {
      await syncObsidian(
        root,
        {
          version: 1,
          source: 'test',
          branch: 'main',
          revision: 'pinned-tree',
          articleCount: 0,
          warnings: [],
          files: [{ path: '附件/image.webp', asset: 'src/assets/image.webp' }],
        },
        () => {},
      );
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect([...files.get('iceaxing-astro/附件/image.webp')!]).toEqual([1, 2, 3, 4, 5]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('keeps wiki anchors when converting a reference', () => {
    const current = article('{% wikiLink target="other" anchor="section" label="自定义文字" /%}');
    expect(
      obsidianMarkdown(current, [current, article('## section', 'other')], (url) => url, []),
    ).toContain('[[iceaxing-astro/文章/zh/other#section|自定义文字]]');
  });
});
