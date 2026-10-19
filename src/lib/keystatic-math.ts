import type { fields } from '@keystatic/core';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { EditorState } from 'prosemirror-state';
import { findDollarMath, normalizeDollarMath } from './markdoc-math';

type MarkdocField = ReturnType<typeof fields.markdoc>;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** Move raw dollar math into component attributes before Markdown serialization. */
export function preserveEditorMath(state: EditorState): EditorState {
  const edits: Array<{ from: number; to: number; node: ProseMirrorNode; block: boolean }> = [];
  const collect = (
    paragraphs: Array<{ node: ProseMirrorNode; position: number }>,
    allowBlocks = true,
  ) => {
    if (!paragraphs.length) return;
    let text = '';
    const protectedRanges: Array<{ start: number; end: number }> = [];
    const ranges: Array<{ start: number; end: number; node: ProseMirrorNode; position: number }> =
      [];
    for (const paragraph of paragraphs) {
      if (ranges.length) text += '\n\n';
      const start = text.length;
      paragraph.node.forEach((child) => {
        const from = text.length;
        if (child.isText) text += child.text;
        else if (child.type.name === 'hard_break') text += '\n';
        else text += '\uFFFC'.repeat(child.nodeSize);
        if (
          (!child.isText && child.type.name !== 'hard_break') ||
          child.marks.some((mark) => mark.type.name === 'code')
        ) {
          protectedRanges.push({ start: from, end: text.length });
        }
      });
      ranges.push({ start, end: text.length, ...paragraph });
    }
    const base = paragraphs[0]!.position + 1;
    for (const math of findDollarMath(text)) {
      if (!allowBlocks && !math.inline) continue;
      if (protectedRanges.some((range) => range.start < math.end && range.end > math.start))
        continue;
      const type = state.schema.nodes[math.inline ? 'inlineMath' : 'math'];
      const defaults = type?.createAndFill()?.attrs.props;
      if (!type || !defaults?.value) continue;
      const node = type.createAndFill({
        props: { ...defaults, value: { ...defaults.value, expression: math.expression } },
      });
      if (!node) continue;
      let from = base + math.start;
      let to = base + math.end;
      if (!math.inline) {
        const first = ranges.find((range) => range.start <= math.start && range.end >= math.start);
        const last = ranges.find((range) => range.start < math.end && range.end >= math.end);
        if (
          first &&
          last &&
          !text.slice(first.start, math.start).trim() &&
          !text.slice(math.end, last.end).trim()
        ) {
          from = first.position;
          to = last.position + last.node.nodeSize;
        }
      }
      edits.push({ from, to, node, block: !math.inline });
    }
  };
  const walk = (parent: ProseMirrorNode, contentStart: number) => {
    let run: Array<{ node: ProseMirrorNode; position: number }> = [];
    const flush = () => {
      collect(run);
      run = [];
    };
    parent.forEach((child, offset) => {
      const position = contentStart + offset;
      if (child.type.name === 'paragraph') run.push({ node: child, position });
      else {
        flush();
        if (child.isTextblock && child.type.name !== 'code_block')
          collect([{ node: child, position }], false);
        else if (!child.isLeaf && child.type.name !== 'code_block') walk(child, position + 1);
      }
    });
    flush();
  };
  walk(state.doc, 0);
  if (!edits.length) return state;
  const transaction = state.tr;
  for (const edit of edits.sort((a, b) => b.from - a.from)) {
    if (edit.block) transaction.replaceRangeWith(edit.from, edit.to, edit.node);
    else transaction.replaceWith(edit.from, edit.to, edit.node);
  }
  return state.apply(transaction);
}

/** The public field keeps its editor, assets and collaboration support unchanged. */
export function withMathPersistence(field: MarkdocField): MarkdocField {
  const normalize = (content: Uint8Array | undefined) =>
    content === undefined
      ? undefined
      : encoder.encode(normalizeDollarMath(decoder.decode(content)));
  return {
    ...field,
    parse(value, args) {
      return field.parse(value, { ...args, content: normalize(args.content) });
    },
    serialize(value, args) {
      return field.serialize(preserveEditorMath(value), args);
    },
    reader: {
      ...field.reader,
      parse(value, args) {
        return field.reader.parse(value, { ...args, content: normalize(args.content) });
      },
    },
  };
}
