import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import Markdoc from '@markdoc/markdoc';
import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { normalizeDollarMath } from './markdoc-math';

async function contentFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await contentFiles(filename)));
    else if (filename.endsWith('.mdoc')) files.push(filename);
  }
  return files;
}

describe('math saved in real content', () => {
  it('renders every stored formula without falling back to source text', async () => {
    const failures: string[] = [];
    for (const filename of await contentFiles('src/content')) {
      const ast = Markdoc.parse(normalizeDollarMath(await readFile(filename, 'utf8')));
      for (const node of ast.walk()) {
        if (node.tag !== 'math' && node.tag !== 'inlineMath') continue;
        try {
          katex.renderToString(node.attributes.expression, {
            displayMode: node.tag === 'math',
            throwOnError: true,
            strict: 'error',
          });
        } catch (error) {
          failures.push(`${filename}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
