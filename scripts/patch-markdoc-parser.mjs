import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const marker = 'iceaxing-markdoc-tag-boundary:v1';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function patchMarkdocParser() {
  const directory = path.join(root, 'node_modules/@markdoc/markdoc/dist');
  const original = 'const lastPossible = state.src.slice(0, finish).trim().length;';
  const fixed = 'const lastPossible = state.src.slice(0, finish).trimEnd().length;';
  for (const name of ['index.js', 'index.mjs']) {
    const filename = path.join(directory, name);
    const source = await readFile(filename, 'utf8');
    if (source.includes(marker)) continue;
    // Astro preserves frontmatter line numbers by replacing YAML with newlines.
    // trim() incorrectly subtracts those leading characters from an absolute
    // offset, making inline tags consume the rest of the line as block tags.
    if (source.split(original).length !== 2) {
      if (source.split(fixed).length === 2) continue;
      throw new Error(
        `Cannot locate the Markdoc tag boundary in ${name}; review the parser patch.`,
      );
    }
    await writeFile(filename, source.replace(original, `/* ${marker} */\n  ${fixed}`));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await patchMarkdocParser();
}
