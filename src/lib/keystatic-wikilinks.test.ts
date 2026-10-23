import type { fields } from '@keystatic/core';
import type { EditorState } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { describe, expect, it } from 'vitest';
import { markdocComponents } from '../content/markdoc-components';
import { withMathPersistence } from './keystatic-math';
import { preserveEditorWikiLinks, wikiQuery, withWikiLinks } from './keystatic-wikilinks';

async function field() {
  const url = new URL('../../node_modules/@keystatic/core/dist/keystatic-core.js', import.meta.url)
    .href;
  const browser = (await import(/* @vite-ignore */ url)) as { fields: typeof fields };
  return withMathPersistence(
    withWikiLinks(browser.fields.markdoc({ label: '正文', components: markdocComponents })),
  );
}
function links(state: EditorState) {
  const values: Array<{ target: string; label: string; anchor: string }> = [];
  state.doc.descendants((node) => {
    if (node.type.name === 'wikiLink')
      values.push({ label: '', anchor: '', ...node.attrs.props.value });
  });
  return values;
}

describe('real Keystatic WikiLink editing and persistence', () => {
  it('round trips links, custom labels, anchors and math through repeated saves', async () => {
    const body = await field();
    const args = { other: new Map(), external: new Map(), slug: 'test' };
    let state = body.parse(undefined, {
      ...args,
      content: new TextEncoder().encode(
        '参阅 [[filter-design#low-pass|低通]] 和 [[other]]，$x_i$。',
      ),
    });
    for (let i = 0; i < 3; i++) {
      expect(links(state)).toEqual([
        { target: 'filter-design', label: '低通', anchor: 'low-pass' },
        { target: 'other', label: '', anchor: '' },
      ]);
      const saved = body.serialize(state, { slug: 'test' });
      state = body.parse(undefined, { ...saved, slug: 'test' });
    }
    expect(state.doc.toJSON()).toMatchObject({ type: 'doc' });
  });
  it('opens a query on [[ and converts a completed typed reference into an inline node', async () => {
    const body = await field();
    let state = body.defaultValue();
    state = state.apply(state.tr.insertText('[[filter'));
    expect(wikiQuery(state)?.text).toBe('filter');
    state = state.apply(state.tr.insertText('-design|文字]]'));
    expect(links(state)).toEqual([{ target: 'filter-design', label: '文字', anchor: '' }]);
    expect(wikiQuery(state)).toBeUndefined();
  });
  it('preserves literal escaped brackets, code blocks and ordinary links on save', async () => {
    const body = await field();
    const source =
      String.raw`\[[literal]] and ` +
      '`[[inline-code]]`\n\n```md\n[[block-code]]\n```\n\n[normal](https://example.com)';
    let state = body.parse(undefined, {
      content: new TextEncoder().encode(source),
      other: new Map(),
      external: new Map(),
      slug: 'test',
    });
    expect(links(state)).toHaveLength(0);
    for (let i = 0; i < 2; i++) {
      const saved = body.serialize(state, { slug: 'test' });
      state = body.parse(undefined, { ...saved, slug: 'test' });
      expect(links(state)).toHaveLength(0);
    }
  });
  it('normalizes plain-text clipboard wiki syntax before the Keystatic Markdown parser', async () => {
    const body = await field();
    const state = body.defaultValue();
    const plugin = state.plugins.find((plugin) => plugin.props.transformPastedText)!;
    const view = { state } as EditorView;
    const normalized = plugin.props.transformPastedText!.call(
      plugin,
      '[[filter-design]]',
      true,
      view,
    );
    expect(normalized).toContain('{% wikiLink');
    const parser = state.plugins.find((plugin) => plugin.props.clipboardTextParser)!;
    const slice = parser.props.clipboardTextParser!.call(
      parser,
      normalized,
      state.doc.resolve(1),
      true,
      view,
    );
    const pasted = state.apply(state.tr.replaceSelection(slice).setMeta('paste', true));
    expect(links(pasted)[0]?.target).toBe('filter-design');
  });
  it('canonicalizes an imported title reference to a stable ID without rewriting labels', async () => {
    const body = await field();
    const state = body.parse(undefined, {
      content: new TextEncoder().encode('[[滤波器设计|详细说明]]'),
      other: new Map(),
      external: new Map(),
      slug: 'test',
    });
    const saved = preserveEditorWikiLinks(state, [
      { id: 'filter-design', title: '滤波器设计', locale: 'zh', kind: 'article' },
    ]);
    expect(links(saved)).toEqual([{ target: 'filter-design', label: '详细说明', anchor: '' }]);
  });

  it('keeps typed and pasted brackets literal when inline code is active', async () => {
    const body = await field();
    let state = body.defaultValue();
    state = state.apply(state.tr.setStoredMarks([state.schema.marks.code!.create()]));
    state = state.apply(state.tr.insertText('[[code]]'));
    expect(links(state)).toHaveLength(0);
    expect(wikiQuery(state)).toBeUndefined();
    const plugin = state.plugins.find((plugin) => plugin.props.transformPastedText)!;
    const text = plugin.props.transformPastedText!.call(plugin, '[[literal]]', true, {
      state,
    } as EditorView);
    expect(text).toBe('[[literal]]');
  });
});
