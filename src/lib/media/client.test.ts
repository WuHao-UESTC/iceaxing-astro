import { createHash } from 'node:crypto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { hasPendingImages, prepareArticleImage } from './client';

afterEach(() => vi.unstubAllGlobals());

function codec({ width = 100, height = 50, type = 'image/webp', fail = false } = {}) {
  const close = vi.fn();
  vi.stubGlobal(
    'createImageBitmap',
    vi.fn(async (file: File) => ({ width, height, file, close })),
  );
  let rendered: { file: File };
  const drawImage = vi.fn((bitmap) => {
    rendered = bitmap;
  });
  const canvas = {
    width: 0,
    height: 0,
    getContext: () => ({ drawImage }),
    toBlob: async (done: (value: Blob | null) => void) =>
      done(fail ? null : new Blob([await rendered.file.arrayBuffer()], { type })),
  };
  vi.stubGlobal('document', { createElement: () => canvas });
  return { canvas, close, drawImage };
}

describe('compression before Git persistence', () => {
  it('hashes the encoded bytes, reuses identical outputs and distinguishes same-named images', async () => {
    const { close } = codec();
    const one = new File(['encoded-one'], '图片.png', { type: 'image/png' });
    const two = new File(['encoded-two'], '图片.png', { type: 'image/png' });
    const first = await prepareArticleImage(one);
    expect(first.src.filename).toBe(
      `${createHash('sha256').update('encoded-one').digest('hex')}.webp`,
    );
    expect(first.src.extension).toBe('webp');
    expect((await prepareArticleImage(one)).src.filename).toBe(first.src.filename);
    expect((await prepareArticleImage(two)).src.filename).not.toBe(first.src.filename);
    expect(close).toHaveBeenCalledTimes(3);
    expect(hasPendingImages()).toBe(false);
  });

  it('bounds dimensions without upscaling and releases resources on conversion errors', async () => {
    const file = new File(['x'], 'photo.png', { type: 'image/png' });
    const large = codec({ width: 6400, height: 3200 });
    expect(await prepareArticleImage(file)).toMatchObject({ width: 3200, height: 1600 });
    expect(large.canvas.width).toBe(3200);
    const small = codec({ width: 10, height: 5, fail: true });
    await expect(prepareArticleImage(file)).rejects.toThrow('图片压缩失败');
    expect(small.close).toHaveBeenCalledOnce();
    expect(hasPendingImages()).toBe(false);
    codec({ type: 'image/png' });
    await expect(prepareArticleImage(file)).rejects.toThrow('不支持 WebP');
  });
});
