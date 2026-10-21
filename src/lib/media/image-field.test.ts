import type { fields } from '@keystatic/core';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { articleImage } from '../../content/article-image';
import {
  articleImageField,
  ARTICLE_IMAGE_DIRECTORY,
  ARTICLE_IMAGE_PUBLIC_PATH,
} from './image-field';

const data = new Uint8Array([82, 73, 70, 70]);
const hash = createHash('sha256').update(data).digest('hex');
const filename = `${hash}.webp`;
const reference = `${ARTICLE_IMAGE_PUBLIC_PATH}${filename}`;

describe('shared Git image persistence', () => {
  it('ignores article slugs and suggested field names when saving and reopening assets', () => {
    const value = { data, filename, extension: 'webp' };
    const serialized = articleImageField.serialize(value, {
      slug: 'article-one',
      suggestedFilenamePrefix: 'body.0.src',
    });
    expect(serialized.value).toBe(reference);
    expect(serialized.asset).toEqual({ filename, content: data });
    expect(
      articleImageField.filename(reference, {
        slug: 'article-two',
        suggestedFilenamePrefix: 'other',
      }),
    ).toBe(filename);
    expect(articleImageField.parse(reference, { asset: data, slug: 'article-two' })).toEqual(value);
  });

  it('round-trips multiple references through the real Markdoc field with a single shared file', async () => {
    const browserModule = new URL(
      '../../../node_modules/@keystatic/core/dist/keystatic-core.js',
      import.meta.url,
    ).href;
    const browser = (await import(/* @vite-ignore */ browserModule)) as { fields: typeof fields };
    const field = browser.fields.markdoc({ label: '正文', components: { articleImage } });
    const tag = `{% articleImage src="${reference}" alt="circuit" title="" width=20 height=10 /%}`;
    const state = field.parse(undefined, {
      content: new TextEncoder().encode(`${tag}\n\n${tag}\n`),
      slug: 'first-article',
      other: new Map(),
      external: new Map([[ARTICLE_IMAGE_DIRECTORY, new Map([[filename, data]])]]),
    });
    const saved = field.serialize(state, { slug: 'second-article' });
    const assets = saved.external.get(ARTICLE_IMAGE_DIRECTORY)!;
    expect(assets.size).toBe(1);
    expect(assets.get(filename)).toEqual(data);
    const content = new TextDecoder().decode(saved.content);
    expect(content.match(/articleImage/g)).toHaveLength(2);
    expect(content).not.toContain('second-article');
    const reopened = field.parse(undefined, {
      content: saved.content,
      slug: 'third-article',
      other: saved.other,
      external: saved.external,
    });
    expect(
      new TextDecoder().decode(field.serialize(reopened, { slug: 'third-article' }).content),
    ).toBe(content);
  }, 30_000);

  it('rejects original filenames so unprocessed same-named files cannot overwrite each other', () => {
    expect(() =>
      articleImageField.serialize(
        { data, filename: '图片.png', extension: 'png' },
        { slug: 'article', suggestedFilenamePrefix: undefined },
      ),
    ).toThrow('SHA-256');
  });
});
