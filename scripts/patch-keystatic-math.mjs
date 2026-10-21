import { readFile, writeFile } from 'node:fs/promises';

const marker = 'iceaxing-keystatic-math-paste:v1';

/** Protect raw LaTeX before the clipboard Markdown parser consumes escapes. */
export async function patchKeystaticMath(bundlePath) {
  let source = await readFile(bundlePath, 'utf8');
  if (source.includes(marker)) return;
  const replaceOnce = (search, replacement) => {
    const first = source.indexOf(search);
    if (first < 0 || source.indexOf(search, first + search.length) >= 0)
      throw new Error('Unable to locate a unique Keystatic math clipboard patch point.');
    source = source.replace(search, () => replacement);
  };
  replaceOnce(
    'return Slice.maxOpen(markdocToProseMirror(parse(text), getEditorSchema(view.state.schema), undefined, undefined, undefined).content);',
    `/* ${marker} */
          const schema = getEditorSchema(view.state.schema);
          const normalize = schema.components.math?.normalizeClipboard;
          const protectedText = normalize ? normalize(text) : text;
          return Slice.maxOpen(markdocToProseMirror(parse(protectedText), schema, undefined, undefined, undefined).content);`,
  );
  replaceOnce(
    `        const html = event.clipboardData.getData('text/html');
        if (html && isProbablyHtmlFromVscode(html)) {`,
    `        const html = event.clipboardData.getData('text/html');
          const text = event.clipboardData.getData('text/plain');
          const normalize = getEditorSchema(view.state.schema).components.math?.normalizeClipboard;
          if (html && !html.includes('data-pm-slice') && text && normalize && normalize(text) !== text) {
            view.pasteText(text);
            return true;
          }
        if (html && isProbablyHtmlFromVscode(html)) {`,
  );
  await writeFile(bundlePath, source);
}
