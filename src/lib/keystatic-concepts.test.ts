import type { fields } from '@keystatic/core';
import type { EditorState } from 'prosemirror-state';
import { TextSelection } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';
import { markdocComponents } from '../content/markdoc-components';
import { withMathPersistence } from './keystatic-math';
import { withWikiLinks } from './keystatic-wikilinks';
import {
  defineEditorConcept,
  editorConcepts,
  insertEditorConcept,
  withConcepts,
} from './keystatic-concepts';
import { conceptsFromSource } from './concepts';

async function field() {
  const browser = (await import(
    /* @vite-ignore */ new URL(
      '../../node_modules/@keystatic/core/dist/keystatic-core.js',
      import.meta.url,
    ).href
  )) as { fields: typeof fields };
  return withMathPersistence(
    withConcepts(
      withWikiLinks(browser.fields.markdoc({ label: '正文', components: markdocComponents })),
    ),
  );
}
function parse(body: Awaited<ReturnType<typeof field>>, text: string) {
  return body.parse(undefined, {
    content: new TextEncoder().encode(text),
    other: new Map(),
    external: new Map(),
    slug: 'test',
  });
}
function draft(state: EditorState) {
  return {
    from: 1,
    to: state.doc.firstChild!.nodeSize - 1,
    text: state.doc.textBetween(1, state.doc.firstChild!.nodeSize - 1, '\n').trim(),
  };
}
describe('real Keystatic concept persistence', () => {
  it('preserves rich text, round trips boundaries/links and derives the current definition', async () => {
    const body = await field();
    let state = parse(body, '有界 **输入** 对应有界输出。');
    const before = state.doc.toJSON().content[0].content;
    state = state.apply(defineEditorConcept(state, draft(state), '稳定性', 'c-test'));
    expect(state.doc.toJSON().content[0].content.slice(1, -1)).toEqual(before);
    expect(editorConcepts(state)[0]).toMatchObject({
      id: 'c-test',
      name: '稳定性',
      definition: '有界 输入 对应有界输出。',
    });
    state = state.apply(insertEditorConcept(state, editorConcepts(state)[0]!));
    for (let i = 0; i < 3; i++) {
      const saved = body.serialize(state, { slug: 'test' });
      expect(conceptsFromSource(new TextDecoder().decode(saved.content))[0]?.name).toBe('稳定性');
      state = body.parse(undefined, { ...saved, slug: 'test' });
      expect(editorConcepts(state)).toHaveLength(1);
      let links = 0;
      state.doc.descendants((node) => {
        if (node.type.name === 'conceptLink') links++;
      });
      expect(links).toBe(1);
    }
    const concept = editorConcepts(state)[0]!;
    state = state.apply(state.tr.insertText('修改后的', concept.from));
    expect(editorConcepts(state)[0]?.definition).toContain('修改后的');
  });
  it('rejects stale selections and overlapping definitions without changing the document', async () => {
    const body = await field();
    let state = parse(body, '原始文字。');
    const stale = draft(state);
    state = state.apply(state.tr.insertText('改', 1));
    expect(() => defineEditorConcept(state, stale, '概念', 'c-test')).toThrow('文字已变化');
    state = state.apply(defineEditorConcept(state, draft(state), '概念', 'c-test'));
    const c = editorConcepts(state)[0]!;
    expect(() =>
      defineEditorConcept(
        state,
        { from: c.from!, to: c.to!, text: c.definition },
        '重复',
        'c-other',
      ),
    ).toThrow('已有概念');
    const selected = state.apply(
      state.tr.setSelection(TextSelection.create(state.doc, c.from!, c.to!)),
    );
    expect(editorConcepts(selected)).toHaveLength(1);
  });
});
