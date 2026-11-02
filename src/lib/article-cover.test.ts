import { describe, expect, it } from 'vitest';
import type { ImageMetadata } from 'astro';
import { firstArticleImage, articleImagePath, resolveArticleCover } from './article-cover';

const image = {
  src: '/_astro/example.webp',
  width: 900,
  height: 600,
  format: 'webp',
} satisfies ImageMetadata;
const entry = (body: string) => ({ id: 'zh/example', body, data: {} });
describe('article cover selection', () => {
  it('prefers an explicit cover over the first image', () => {
    expect(
      resolveArticleCover({ ...entry('![](/first.jpg)'), data: { coverImage: image } }, {}),
    ).toBe(image);
  });
  it('finds the first Markdown or Keystatic image in document order', () => {
    expect(firstArticleImage('![](a.png)\n{% articleImage src="b.webp" /%}')).toBe('a.png');
    expect(firstArticleImage('{% articleImage\n src="a.webp"\n alt="test" /%}\n![](b.png)')).toBe(
      'a.webp',
    );
    expect(firstArticleImage('{% image src="a.png" /%}')).toBe('a.png');
  });
  it('ignores fenced code, inline code and escaped Markdown', () => {
    expect(
      firstArticleImage(
        '```md\n![](code.png)\n```\n`![](inline.png)`\n\\![](escaped.png)\n![](real.png)',
      ),
    ).toBe('real.png');
  });
  it('supports Markdown reference images', () => {
    expect(firstArticleImage('![diagram][figure]\n\n[figure]: /diagram.png')).toBe('/diagram.png');
  });
  it('does not use images inside a Markdoc comment block', () => {
    expect(
      firstArticleImage('{% comment %}\n![](hidden.png)\n{% /comment %}\n![](visible.png)'),
    ).toBe('visible.png');
  });
  it('resolves SVG cover URLs without treating them as Astro components', () => {
    expect(
      resolveArticleCover(entry('![](../../../../assets/content/body/diagram.svg)'), {
        '/src/assets/content/body/diagram.svg': { default: '/_astro/diagram.svg' },
      }),
    ).toBe('/_astro/diagram.svg');
  });
  it('resolves percent-encoded local paths against the content file', () => {
    const body = '![](../../../../assets/content/body/example/%E5%9B%BE%E7%89%87.png)';
    expect(
      resolveArticleCover(entry(body), {
        '/src/assets/content/body/example/图片.png': { default: image },
      }),
    ).toBe(image);
  });
  it('supports absolute Windows content paths and nested shared images', () => {
    expect(
      articleImagePath(
        '../../../../assets/article-images/shared.webp',
        'E:\\repo\\src\\content\\articles\\zh\\example\\index.mdoc',
      ),
    ).toBe('/src/assets/article-images/shared.webp');
  });
  it('retains public and remote URLs including signed query parameters', () => {
    expect(resolveArticleCover(entry('![](/media/photo.jpg)'), {})).toBe('/media/photo.jpg');
    expect(resolveArticleCover(entry('![](https://example.com/photo.jpg?token=abc)'), {})).toBe(
      'https://example.com/photo.jpg?token=abc',
    );
  });
  it('keeps text-only and unresolved local-image articles without a cover', () => {
    expect(resolveArticleCover(entry('Text without images'), {})).toBeUndefined();
    expect(resolveArticleCover(entry('![](missing.png)'), {})).toBeUndefined();
    expect(
      articleImagePath('javascript:alert(1)', 'src/content/articles/zh/example/index.mdoc'),
    ).toBeUndefined();
  });
});
