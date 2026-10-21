import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { patchKeystaticImages } from '../../../scripts/patch-keystatic-images.mjs';

// Minimal unpatched entry points from the pinned Keystatic browser bundle.
const cleanBundle = `function imageDropPlugin(schema) {
  const imageType = schema.nodes.image;
  return new Plugin({
    props: {
      handleDrop(view, event) {
        var _event$dataTransfer;
        return false;
      },
      handlePaste(view, event) {
        var _event$clipboardData;
        return false;
      }
    }
  });
}
function ImageToolbarButton() {
  return async function(view) {
          const file = await getUploadedFileObject('image/*');
          const schema = getEditorSchema(view.state.schema);
          if (!file || !schema.config.image) {
            return;
          }
  };
}
function insertImageFromMenu(view, nodeType) {
  return async function() {
              const file = await getUploadedFileObject('image/*');
              const schema = getEditorSchema(nodeType.schema);
              if (!file || !schema.config.image) return;
  };
}
`;

const syntax = (filename: string) =>
  spawnSync(process.execPath, ['--check', filename], { encoding: 'utf8' });

async function cleanup(directory: string) {
  const target = path.resolve(directory);
  if (
    !target.startsWith(path.resolve(tmpdir()) + path.sep) ||
    !path.basename(target).startsWith('keystatic-')
  )
    throw new Error('Unexpected temporary test directory.');
  await rm(target, { recursive: true, force: true });
}

describe('image patch installation paths', () => {
  it('generates valid JavaScript from a clean install and is repeatable', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'keystatic-clean-install-'));
    const filename = path.join(directory, 'editor.mjs');
    try {
      await writeFile(filename, cleanBundle);
      await patchKeystaticImages(filename);
      const generated = await readFile(filename, 'utf8');
      expect(syntax(filename).stderr).toBe('');
      expect(syntax(filename).status).toBe(0);
      expect(generated).toContain('正在处理图片');
      await patchKeystaticImages(filename);
      expect(await readFile(filename, 'utf8')).toBe(generated);
    } finally {
      await cleanup(directory);
    }
  });

  it('repairs a cached v1 bundle containing broken generated string literals', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'keystatic-cached-install-'));
    const filename = path.join(directory, 'editor.mjs');
    try {
      await writeFile(filename, cleanBundle);
      await patchKeystaticImages(filename);
      const broken = (await readFile(filename, 'utf8'))
        .replace('iceaxing-keystatic-git-images:v2', 'iceaxing-keystatic-git-images:v1')
        .replace(/^.*status\.textContent = .*$/m, "        status.textContent = 'broken;");
      await writeFile(filename, broken);
      expect(syntax(filename).status).not.toBe(0);
      await patchKeystaticImages(filename);
      expect(syntax(filename).status).toBe(0);
      expect(await readFile(filename, 'utf8')).toContain('iceaxing-keystatic-git-images:v2');
    } finally {
      await cleanup(directory);
    }
  });
});
