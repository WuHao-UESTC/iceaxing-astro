import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { ARTICLE_IMAGE_DIRECTORY as shared } from './image-field';

const legacy = 'src/assets/content/body';
const data = new Uint8Array([1, 2, 3]);

describe('installed shared asset read/save/delete rules', () => {
  it('loads shared files outside the article folder and excludes them from entry deletion', async () => {
    const source = await readFile('node_modules/@keystatic/core/dist/keystatic-core-ui.js', 'utf8');
    const code = source.slice(
      source.indexOf('class TrackedMap extends Map'),
      source.indexOf('function getAllFilesInTree'),
    );
    const parseProps = (
      _schema: unknown,
      _loaded: unknown,
      _path: unknown,
      _slugs: unknown,
      visit: (schema: unknown, value: unknown, path: string[], withSlugs: string[]) => unknown,
    ) =>
      visit(
        {
          formKind: 'content',
          contentExtension: '.mdoc',
          directories: [shared, legacy],
          parse(_value: unknown, args: { external: Map<string, Map<string, Uint8Array>> }) {
            expect(args.external.get(shared)?.get('hash.webp')).toEqual(data);
            expect(args.external.get(legacy)?.get('old.png')).toEqual(data);
            return 'parsed';
          },
        },
        undefined,
        ['body'],
        ['body'],
      );
    const parseEntry = new Function(
      'getEntryDataFilepath',
      'loadDataFile',
      'object',
      'parseProps',
      'toFormattedFormDataError',
      `${code}; return parseEntry;`,
    )(
      () => 'article/index.yaml',
      () => ({ loaded: {} }),
      () => ({}),
      parseProps,
      (error: unknown) => error,
    );
    const parsed = parseEntry(
      { dirpath: 'article', format: {}, schema: {}, slug: { slug: 'first', field: 'id' } },
      new Map([
        ['article/index.yaml', data],
        ['article/body.mdoc', data],
        [`${shared}/hash.webp`, data],
        [`${legacy}/first/old.png`, data],
      ]),
    );
    expect(parsed.initialState).toBe('parsed');
    expect(parsed.initialFiles).toContain(`${legacy}/first/old.png`);
    expect(parsed.initialFiles).not.toContain(`${shared}/hash.webp`);
  });

  it('saves shared images at the root while keeping existing per-article asset paths', async () => {
    const source = await readFile('node_modules/@keystatic/core/dist/keystatic-core-ui.js', 'utf8');
    const start = source.indexOf('function serializeEntryToFiles(args)');
    const code = source.slice(start, source.indexOf('function useUpsertItem(', start));
    const serialize = new Function(
      'serializeProps',
      'object',
      'textEncoder',
      'getEntryDataFilepath',
      `${code}; return serializeEntryToFiles;`,
    )(
      () => ({
        value: {},
        extraFiles: [
          { parent: shared, path: 'hash.webp', contents: data },
          { parent: legacy, path: 'old.png', contents: data },
        ],
      }),
      () => ({}),
      new TextEncoder(),
      () => 'article/index.json',
    );
    const files = serialize({
      schema: {},
      state: {},
      basePath: 'article',
      slug: { field: 'id', value: 'first' },
      format: { data: 'json' },
    });
    expect(files.map((file: { path: string }) => file.path)).toEqual([
      'article/index.json',
      `${shared}/hash.webp`,
      `${legacy}/first/old.png`,
    ]);
  });
});
