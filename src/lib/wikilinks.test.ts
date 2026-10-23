import Markdoc from '@markdoc/markdoc';
import { describe, expect, it } from 'vitest';
import { normalizeDollarMath } from './markdoc-math';
import {
  findWikiLinks,
  normalizeWikiLinks,
  parseWikiLink,
  resolveWikiTarget,
  searchWikiTargets,
  wikiLinkHref,
  type WikiLinkTarget,
} from './wikilinks';

const targets: WikiLinkTarget[] = [
  {
    id: 'filter-design',
    title: '滤波器设计',
    locale: 'zh',
    kind: 'article',
    href: '/notes/filter-design',
  },
  {
    id: 'filter-design-en',
    title: 'Filter design',
    locale: 'en',
    kind: 'article',
    href: '/en/notes/filter-design',
  },
  { id: 'other', title: '另一篇文章', locale: 'zh', kind: 'article', href: '/another' },
];

describe('wiki syntax in Markdoc', () => {
  it('supports stable IDs, titles, aliases and heading fragments', () => {
    expect(parseWikiLink('[[filter-design#low-pass|低通滤波器]]')).toEqual({
      target: 'filter-design',
      anchor: 'low-pass',
      label: '低通滤波器',
    });
    expect(parseWikiLink('[[ 滤波器设计 ]]')).toEqual({
      target: '滤波器设计',
      anchor: '',
      label: '',
    });
    expect(findWikiLinks('参阅 [[filter-design]] 和 [[other|另外一篇]]。')).toHaveLength(2);
  });
  it.each(['[[]]', '[[#anchor]]', '[[one|two|three]]', '[[one\ntwo]]', '[[unfinished'])(
    'leaves incomplete or invalid syntax alone: %s',
    (source) => {
      expect(parseWikiLink(source)).toBeUndefined();
      expect(normalizeWikiLinks(source)).toBe(source);
    },
  );
  it('preserves code, frontmatter, attributes, escapes and existing Markdown links', () => {
    const source = [
      '---\ntitle: "[[frontmatter]]"\n---',
      '```md\n[[fence]]\n```',
      '> ~~~~\n> [[quote-code]]\n> ~~~~',
      '    [[indented-code]]',
      '`[[inline-code]]` and ``a ` [[also-code]]``',
      String.raw`\[[escaped]]`,
      '{% callout title="[[attribute]]" %}正文{% /callout %}',
      '[label [[nested]]](https://example.com/[[destination]])',
      '![image [[label]]](image.png)',
      '<!-- [[comment]] -->',
    ].join('\n\n');
    expect(normalizeWikiLinks(source)).toBe(source);
  });
  it('produces safe attributes, stays idempotent, and coexists with math', () => {
    const source = String.raw`[[filter-design|文字 "quoted"]] $x_{[[i]]}$`;
    const normalized = normalizeWikiLinks(normalizeDollarMath(source));
    expect(normalizeWikiLinks(normalized)).toBe(normalized);
    const tags = [...Markdoc.parse(normalized).walk()].filter((node) => node.type === 'tag');
    expect(tags.map((node) => node.tag)).toEqual(['wikiLink', 'inlineMath']);
    expect(tags[0]?.attributes.target).toBe('filter-design');
    expect(tags[1]?.attributes.expression).toContain('[[i]]');
  });
});

describe('wiki target resolution', () => {
  it('keeps references valid across title and route changes', () => {
    const changed = targets.map((target) =>
      target.id === 'filter-design'
        ? { ...target, title: '新的标题', href: '/moved/new-slug' }
        : target,
    );
    const target = resolveWikiTarget('filter-design', changed, 'zh')!;
    expect(target.title).toBe('新的标题');
    expect(wikiLinkHref(target, '低通 标题')).toBe(
      '/moved/new-slug#%E4%BD%8E%E9%80%9A%20%E6%A0%87%E9%A2%98',
    );
    expect(wikiLinkHref(target, '%E4%BD%8E%E9%80%9A')).toBe('/moved/new-slug#%E4%BD%8E%E9%80%9A');
  });
  it('searches titles and IDs and prioritizes the editor language', () => {
    expect(searchWikiTargets(targets, 'filter design', 'en')[0]?.id).toBe('filter-design-en');
    expect(searchWikiTargets(targets, '滤波器#anchor|自定义', 'zh')[0]?.id).toBe('filter-design');
  });
  it('does not guess an ambiguous title or generate links to missing/unpublished entries', () => {
    const duplicate = { ...targets[0]!, id: 'duplicate' };
    expect(resolveWikiTarget('滤波器设计', [...targets, duplicate], 'zh')).toBeUndefined();
    expect(resolveWikiTarget('missing', targets, 'zh')).toBeUndefined();
    expect(resolveWikiTarget('javascript:alert(1)', targets, 'zh')).toBeUndefined();
    expect(
      wikiLinkHref({ id: 'draft', title: 'Draft', locale: 'zh', kind: 'article' }, ''),
    ).toBeUndefined();
    expect(resolveWikiTarget('filter-design', [...targets, duplicate])?.id).toBe('filter-design');
  });
});
