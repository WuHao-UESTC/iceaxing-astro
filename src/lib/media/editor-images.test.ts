import { readFile, readdir } from 'node:fs/promises';
import { Schema, Fragment, Slice, type Node as PMNode } from 'prosemirror-model';
import { EditorState, Plugin, TextSelection, type Transaction } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Markdoc from '@markdoc/markdoc';

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { content: 'inline*', group: 'block' },
    text: { group: 'inline' },
    articleImage: { group: 'block', atom: true, attrs: { props: {} } },
  },
});

async function editor(handleFile: (file: File) => Promise<{ src: string }>) {
  const directory = 'node_modules/@keystatic/core/dist';
  const bundles = (await readdir(directory)).filter((name) => /^index-[a-f0-9]+\.js$/.test(name));
  let source = '';
  for (const name of bundles) {
    const contents = await readFile(`${directory}/${name}`, 'utf8');
    if (contents.includes('iceaxing-keystatic-git-images:v2')) source = contents;
  }
  expect(source).not.toBe('');
  const start = source.indexOf('const articleImageTasks = new WeakMap();');
  const end = source.indexOf('function ImageToolbarButton()', start);
  const config = {
    schema,
    components: { articleImage: { kind: 'block', schema: {}, handleFile } },
    nodes: schema.nodes,
    config: {},
  };
  const { imageDropPlugin } = new Function(
    'getEditorSchema',
    'Plugin',
    'Slice',
    'Fragment$2',
    'toSerialized',
    `${source.slice(start, end)}; return {imageDropPlugin};`,
  )(
    () => config,
    Plugin,
    Slice,
    Fragment,
    (value: unknown) => ({ value }),
  );
  let state = EditorState.create({
    schema,
    doc: schema.nodes.doc!.create(null, schema.nodes.paragraph!.create(null, schema.text('abc'))),
    plugins: [imageDropPlugin(config)],
  });
  state = state.apply(state.tr.setSelection(TextSelection.create(state.doc, 2)));
  const view = {
    get state() {
      return state;
    },
    props: { config: {} },
    isDestroyed: false,
    dispatch(transaction: Transaction) {
      state = state.apply(transaction);
    },
    posAtCoords() {
      return { pos: 1 };
    },
  } as unknown as EditorView;
  vi.stubGlobal('document', {
    createElement: () => ({ style: {}, setAttribute() {}, remove() {} }),
    body: { append() {} },
  });
  const alert = vi.fn();
  vi.stubGlobal('window', { alert });
  const plugin = state.plugins[0]!;
  const imageNodes = () => {
    const images: PMNode[] = [];
    state.doc.descendants((node) => {
      if (node.type.name === 'articleImage') images.push(node);
    });
    return images;
  };
  return { view, plugin, alert, imageNodes };
}

afterEach(() => vi.unstubAllGlobals());

describe('installed Keystatic image integration', () => {
  it('round-trips migrated image tags through Markdoc without corrupting surrounding content', () => {
    const ast = Markdoc.parse('before\n\n![circuit](picture.png)\n\nafter');
    for (const node of ast.walk()) {
      if (node.type !== 'image') continue;
      node.type = 'tag';
      node.tag = 'articleImage';
      node.inline = false;
      node.attributes = {
        src: 'https://img.example.com/hash.webp',
        alt: 'circuit',
        width: 100,
        height: 50,
      };
    }
    const output = Markdoc.format(ast);
    const parsed = Markdoc.parse(output);
    const images = [...parsed.walk()].filter((node) => node.tag === 'articleImage');
    expect(images).toHaveLength(1);
    expect(images[0]?.attributes.src).toBe('https://img.example.com/hash.webp');
    expect(output).toContain('before');
    expect(output).toContain('after');
    expect([...parsed.walk()].filter((node) => node.type === 'image')).toHaveLength(0);
  });
  it('processes every same-named clipboard image in order and inserts URL-only component nodes', async () => {
    let count = 0;
    const handle = vi.fn(async () => ({ src: `https://img.example.com/${++count}.webp` }));
    const { view, plugin, imageNodes } = await editor(handle);
    const files = [
      new File(['one'], '鍥剧墖.png', { type: 'image/png' }),
      new File(['two'], '鍥剧墖.png', { type: 'image/png' }),
    ];
    expect(
      plugin.props.handlePaste?.call(
        plugin,
        view,
        { clipboardData: { files } } as unknown as ClipboardEvent,
        Slice.empty,
      ),
    ).toBe(true);
    await vi.waitFor(() => expect(imageNodes()).toHaveLength(2));
    expect(imageNodes().map((node) => node.attrs.props.value.src)).toEqual([
      'https://img.example.com/1.webp',
      'https://img.example.com/2.webp',
    ]);
    expect(handle).toHaveBeenCalledTimes(2);
    expect(view.state.doc.textContent).toBe('abc');
    expect(JSON.stringify(view.state.doc.toJSON())).not.toContain('鍥剧墖.png');
  });

  it('keeps the original insertion location when the user edits during image processing', async () => {
    let complete!: (value: { src: string }) => void;
    const { view, plugin } = await editor(
      () =>
        new Promise((resolve) => {
          complete = resolve;
        }),
    );
    const file = new File(['one'], '鍥剧墖.png', { type: 'image/png' });
    plugin.props.handlePaste?.call(
      plugin,
      view,
      { clipboardData: { files: [file] } } as unknown as ClipboardEvent,
      Slice.empty,
    );
    const transaction = view.state.tr.insertText('prefix', 1);
    transaction.setSelection(TextSelection.create(transaction.doc, 10));
    view.dispatch(transaction);
    complete({ src: 'https://img.example.com/one.webp' });
    await vi.waitFor(() => expect(view.state.doc.childCount).toBe(3));
    expect(view.state.doc.child(0).textContent).toBe('prefixa');
    expect(view.state.doc.child(1).type.name).toBe('articleImage');
    expect(view.state.doc.child(2).textContent).toBe('bc');
  });

  it('reports processing failures and leaves the document intact', async () => {
    const { view, plugin, alert, imageNodes } = await editor(async () => {
      throw new Error('Image processing failed');
    });
    const before = view.state.doc;
    plugin.props.handlePaste?.call(
      plugin,
      view,
      {
        clipboardData: { files: [new File(['x'], '鍥剧墖.png', { type: 'image/png' })] },
      } as unknown as ClipboardEvent,
      Slice.empty,
    );
    await vi.waitFor(() => expect(alert).toHaveBeenCalledWith('Image processing failed'));
    expect(imageNodes()).toHaveLength(0);
    expect(view.state.doc).toBe(before);
  });
});
