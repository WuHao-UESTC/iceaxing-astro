export interface ArticleImageAsset {
  data: Uint8Array;
  filename: string;
  extension: string;
}

let pendingImages = 0;
export const hasPendingImages = () => pendingImages > 0;

/** Compress before Keystatic serializes any binary into the Git save request. */
export async function prepareArticleImage(file: File) {
  pendingImages++;
  try {
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/avif'].includes(file.type))
      throw new Error('请选择 PNG、JPEG、WebP 或 AVIF 静态图片。');
    if (file.size > 25 * 1024 * 1024) throw new Error('请选择小于 25 MiB 的图片。');
    const bitmap = await createImageBitmap(file);
    try {
      const scale = Math.min(1, 3200 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext('2d');
      if (!context) throw new Error('浏览器无法处理图片。');
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (result) => (result ? resolve(result) : reject(new Error('图片压缩失败。'))),
          'image/webp',
          0.96,
        ),
      );
      if (blob.type !== 'image/webp')
        throw new Error('当前浏览器不支持 WebP 编码，请使用新版浏览器。');
      if (blob.size > 3 * 1024 * 1024)
        throw new Error('压缩后的图片超过 3 MiB，请缩小图片后重试。');
      const buffer = await blob.arrayBuffer();
      const digest = await crypto.subtle.digest('SHA-256', buffer);
      const hash = Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, '0'),
      ).join('');
      return {
        src: { data: new Uint8Array(buffer), extension: 'webp', filename: `${hash}.webp` },
        alt: '',
        title: '',
        width: canvas.width,
        height: canvas.height,
      };
    } finally {
      bitmap.close();
    }
  } finally {
    pendingImages--;
  }
}
