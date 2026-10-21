import type { fields } from '@keystatic/core';
import type { EditorView } from 'prosemirror-view';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import { describe, expect, it, vi } from 'vitest';
import katex from 'katex';
import { markdocComponents } from '../content/markdoc-components';
import { withMathPersistence } from './keystatic-math';

const aligned = String.raw`\begin{aligned}
& V_{\text {in, }, \mathrm{CM}}>V_{T H} \\
& V_{\text {in, }, \mathrm{Cm}}>\left(V_{G S_3}-V_{T H 3}\right)+V_{T H} \\
& V_{\text {in, } \mathrm{Cm}}>V_{D D}-\frac{1}{2} R_D I_{S S}+V_{T H}
\end{aligned}`;
const cases = String.raw`\left\{\begin{array}{l}
V_{\text {out } 1}=V_{\text {out } 2}=V_{D D}-\frac{1}{2} R_D I_{S S} \\
V_{\text {out }}-V_{\text {out } 2}=0
\end{array}\right.`;

function expressions(doc: ProseMirrorNode) {
  const values: string[] = [];
  doc.descendants((node) => {
    if (node.type.name === 'math' || node.type.name === 'inlineMath')
      values.push(node.attrs.props.value.expression);
  });
  return values;
}

async function editor() {
  const moduleUrl = new URL(
    '../../node_modules/@keystatic/core/dist/keystatic-core.js',
    import.meta.url,
  ).href;
  const browser = (await import(/* @vite-ignore */ moduleUrl)) as { fields: typeof fields };
  const field = withMathPersistence(
    browser.fields.markdoc({ label: '正文', components: markdocComponents }),
  );
  const state = field.defaultValue();
  const plugin = state.plugins.find((plugin) => plugin.props.clipboardTextParser)!;
  return { field, state, plugin };
}

describe('real Keystatic clipboard → save → reopen → KaTeX', () => {
  it('preserves both reported formulas across repeated saves', async () => {
    const { field, state, plugin } = await editor();
    const view = { state } as unknown as EditorView;
    const source = `$$\n${aligned}\n$$\n\n$$\n${cases}\n$$`;
    const slice = plugin.props.clipboardTextParser!.call(
      plugin,
      source,
      state.doc.resolve(1),
      true,
      view,
    );
    let value = state.apply(state.tr.replaceSelection(slice));
    expect(expressions(value.doc)).toEqual([aligned, cases]);
    for (let round = 0; round < 3; round++) {
      const saved = field.serialize(value, { slug: 'formula-test' });
      value = field.parse(undefined, {
        content: saved.content,
        other: saved.other,
        external: saved.external,
        slug: 'formula-test',
      });
      expect(expressions(value.doc)).toEqual([aligned, cases]);
    }
    for (const expression of expressions(value.doc)) {
      const html = katex.renderToString(expression, {
        displayMode: true,
        throwOnError: true,
        strict: 'error',
      });
      expect(html).toContain('class="katex"');
      expect(html).not.toContain('katex-error');
    }
  }, 30_000);

  it('protects raw formulas in HTML clipboard payloads before rich-text parsing', async () => {
    const { state, plugin } = await editor();
    const pasteText = vi.fn();
    const view = { state, props: {}, pasteText } as unknown as EditorView;
    const text = `$$\n${cases}\n$$`;
    const event = {
      clipboardData: {
        getData: (type: string) => (type === 'text/plain' ? text : '<div>copied formula</div>'),
      },
    } as unknown as ClipboardEvent;
    expect(plugin.props.handlePaste!.call(plugin, view, event, state.selection.content())).toBe(
      true,
    );
    expect(pasteText).toHaveBeenCalledWith(text);
  }, 30_000);

  it('leaves fenced formula examples as code', async () => {
    const { state, plugin } = await editor();
    const source = '```latex\n$$\n' + cases + '\n$$\n```';
    const slice = plugin.props.clipboardTextParser!.call(
      plugin,
      source,
      state.doc.resolve(1),
      true,
      { state } as unknown as EditorView,
    );
    const value = state.apply(state.tr.replaceSelection(slice));
    expect(expressions(value.doc)).toEqual([]);
    expect(value.doc.textContent).toContain(cases);
  }, 30_000);
});
