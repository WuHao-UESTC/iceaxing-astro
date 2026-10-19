import { Schema, type Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';
import { preserveEditorMath } from './keystatic-math';

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { group: 'block', content: 'inline*' },
    heading: { group: 'block', content: 'inline*' },
    blockquote: { group: 'block', content: 'block+' },
    column: { group: 'block', content: 'block+' },
    code_block: { group: 'block', content: 'text*', code: true },
    math: {
      group: 'block',
      atom: true,
      attrs: { props: { default: { value: {}, extraFiles: 'retained' } } },
    },
    inlineMath: {
      group: 'inline',
      inline: true,
      atom: true,
      attrs: { props: { default: { value: {} } } },
    },
    hard_break: { group: 'inline', inline: true },
    text: { group: 'inline' },
  },
  marks: { code: { code: true }, bold: {}, link: { attrs: { href: {} } } },
});
const paragraph = (text = '') =>
  schema.nodes.paragraph!.create(null, text ? schema.text(text) : undefined);
const state = (...nodes: ProseMirrorNode[]) =>
  EditorState.create({ schema, doc: schema.nodes.doc!.create(null, nodes) });
const formulas = (value: EditorState) => {
  const values: string[] = [];
  value.doc.descendants((node) => {
    if (node.type.name === 'math' || node.type.name === 'inlineMath')
      values.push(node.attrs.props.value.expression);
  });
  return values;
};

describe('Keystatic math persistence before serialization', () => {
  it('preserves aligned row separators typed into ordinary paragraphs', () => {
    const expression = String.raw`\begin{aligned}a_i &= b_i \\ c_i &= d_i\end{aligned}`;
    const result = preserveEditorMath(state(paragraph('$$ ' + expression + ' $$')));
    expect(formulas(result)).toEqual([expression]);
    expect(result.doc.childCount).toBe(1);
    expect(result.doc.firstChild?.type.name).toBe('math');
    expect(result.doc.firstChild?.attrs.props.extraFiles).toBe('retained');
  });

  it('collects formulas split across paragraphs, blank lines and hard breaks', () => {
    const first = String.raw`\begin{aligned}a &= b \\`;
    const last = String.raw`c &= d\end{aligned}`;
    const input = state(
      paragraph('$$'),
      paragraph(),
      paragraph(first),
      paragraph(last),
      paragraph('$$'),
    );
    const result = preserveEditorMath(input);
    expect(formulas(result)).toEqual([first + '\n\n' + last]);
    expect(result.doc.childCount).toBe(1);
    const soft = schema.nodes.paragraph!.create(null, [
      schema.text('$$a'),
      schema.nodes.hard_break!.create(),
      schema.text(String.raw`\\ b$$`),
    ]);
    expect(formulas(preserveEditorMath(state(soft)))).toEqual([
      String.raw`a` + '\n' + String.raw`\\ b`,
    ]);
  });

  it('supports inline formulas while preserving surrounding marks and links', () => {
    const bold = schema.text('before ', [schema.marks.bold!.create()]);
    const after = schema.text(' after', [
      schema.marks.link!.create({ href: 'https://example.com' }),
    ]);
    const input = state(
      schema.nodes.paragraph!.create(null, [bold, schema.text(String.raw`$x_i + \alpha$`), after]),
    );
    const result = preserveEditorMath(input);
    expect(formulas(result)).toEqual([String.raw`x_i + \alpha`]);
    expect(result.doc.firstChild?.firstChild?.marks[0]?.type.name).toBe('bold');
    expect(result.doc.firstChild?.lastChild?.marks[0]?.attrs.href).toBe('https://example.com');
  });

  it('preserves nested columns and blockquotes and several formulas in one save', () => {
    const input = state(
      schema.nodes.column!.create(null, [paragraph('$$a_i$$'), paragraph('next $b_i$')]),
      schema.nodes.blockquote!.create(null, [paragraph('$$c_i$$')]),
    );
    const result = preserveEditorMath(input);
    expect(formulas(result)).toEqual(['a_i', 'b_i', 'c_i']);
    expect(result.doc.firstChild?.type.name).toBe('column');
    expect(result.doc.lastChild?.type.name).toBe('blockquote');
  });

  it('fits display math between surrounding text', () => {
    const result = preserveEditorMath(state(paragraph('before $$x_i$$ after')));
    expect(formulas(result)).toEqual(['x_i']);
    expect(result.doc.textContent).toContain('before');
    expect(result.doc.textContent).toContain('after');
  });

  it('leaves code blocks, inline code and non-math documents unchanged', () => {
    const input = state(
      schema.nodes.code_block!.create(null, schema.text(String.raw`$$a \\ b$$`)),
      schema.nodes.paragraph!.create(null, schema.text('$x_i$', [schema.marks.code!.create()])),
      paragraph('normal text'),
    );
    expect(preserveEditorMath(input)).toBe(input);
    expect(formulas(input)).toEqual([]);
  });

  it('does not change existing formula component attributes on repeated saves', () => {
    const expression = String.raw`\begin{aligned}a &= b \\ c &= d\end{aligned}`;
    let result = preserveEditorMath(state(paragraph('$$' + expression + '$$')));
    for (let round = 0; round < 5; round++) {
      const previous = result;
      result = preserveEditorMath(result);
      expect(result).toBe(previous);
      expect(formulas(result)).toEqual([expression]);
    }
  });
});
