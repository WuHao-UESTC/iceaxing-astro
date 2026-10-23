import Markdoc from '@markdoc/markdoc';
import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { normalizeDollarMath } from './markdoc-math';

const parse = (source: string) => Markdoc.parse(normalizeDollarMath(source));
const mathNodes = (source: string) =>
  [...parse(source).walk()].filter((node) => node.tag === 'math' || node.tag === 'inlineMath');

describe('dollar math before Markdoc parsing', () => {
  it.each(['\n', '\r\n'])(
    'keeps prose after a formula when Astro blanks frontmatter (%j)',
    (newline) => {
      // Astro replaces YAML with blank lines to preserve source locations.
      const source =
        newline.repeat(18) +
        '{% inlineMath expression="e^{-s t}" /%}  **是不应当有量纲的**！' +
        newline +
        newline +
        '{% inlineMath expression="x" /%}，其中 x 是变量。';
      const tokenizer = new Markdoc.Tokenizer({ allowComments: true, typographer: true });
      const ast = Markdoc.parse(tokenizer.tokenize(source));
      const tree = Markdoc.transform(ast, {
        tags: {
          inlineMath: {
            render: 'inline-math',
            selfClosing: true,
            attributes: { expression: { type: String } },
          },
        },
      });
      const html = Markdoc.renderers.html(tree);
      expect(html).toContain('<strong>是不应当有量纲的</strong>！');
      expect(html).toContain('，其中 x 是变量。');
      expect([...ast.walk()].find((node) => node.tag === 'inlineMath')?.lines[0]).toBe(18);
    },
  );

  it.each([
    '$$ E = mc^2 $$',
    '$$\nE = mc^2\n$$',
    '$$\n\nE = mc^2\n\n$$',
    '$$\r\n\r\nE = mc^2\r\n\r\n$$',
  ])('recognizes display math including blank paragraphs: %s', (source) => {
    const formulas = mathNodes(source);
    expect(formulas).toHaveLength(1);
    expect(formulas[0]?.tag).toBe('math');
    expect(formulas[0]?.attributes.expression).toBe('E = mc^2');
  });

  it('preserves aligned rows, escapes, underscores and blank lines exactly', () => {
    const expression = String.raw`\begin{aligned}
a_i &= b_i + c_i \\

d_j &= \frac{1}{2} \int_{-\infty}^{t} x(\tau)\,d\tau
\end{aligned}`;
    const source = '$$\n\n' + expression + '\n\n$$';
    expect(mathNodes(source)[0]?.attributes.expression).toBe(expression);
    expect(() =>
      katex.renderToString(mathNodes(source)[0]?.attributes.expression, { displayMode: true }),
    ).not.toThrow();
    expect(normalizeDollarMath(source).split('\n')).toHaveLength(source.split('\n').length);
  });

  it('normalizes inline math before emphasis and backslash processing', () => {
    const expression = String.raw`x_i + y_i + \text{a\_b} + \alpha`;
    const formulas = mathNodes('前文 $ ' + expression + ' $ 后文');
    expect(formulas).toHaveLength(1);
    expect(formulas[0]?.tag).toBe('inlineMath');
    expect(formulas[0]?.attributes.expression).toBe(expression);
  });

  it('registers math as real tags without requiring a manual math component elsewhere', () => {
    const ast = parse('$$\n\nx_{i} = 1\n\n$$');
    expect(
      Markdoc.validate(ast, {
        tags: {
          math: { selfClosing: true, attributes: { expression: { type: String, required: true } } },
        },
      }),
    ).toEqual([]);
    const tree = Markdoc.transform(ast, {
      tags: { math: { render: 'display-math', attributes: { expression: { type: String } } } },
    });
    expect(Markdoc.renderers.html(tree)).toContain('<display-math expression="x_{i} = 1">');
  });

  it('supports consecutive display blocks and mixed inline expressions', () => {
    const formulas = mathNodes('$$a^2$$\n\n正文 $b_i$。\n\n$$\n\nc^2\n\n$$');
    expect(formulas.map((node) => [node.tag, node.attributes.expression])).toEqual([
      ['math', 'a^2'],
      ['inlineMath', 'b_i'],
      ['math', 'c^2'],
    ]);
  });

  it('places embedded display equations outside paragraph wrappers', () => {
    const ast = parse('公式：$$x = 1$$继续。');
    expect(ast.children.map((node) => (node.type === 'tag' ? node.tag : node.type))).toEqual([
      'paragraph',
      'math',
      'paragraph',
    ]);
  });

  it.each([
    String.raw`文字 \$x\$ 与价格 $5 和 $10。`,
    '`$$x$$` 与 `` $y_i$ ``',
    '```latex\n$$\n\nx_i\n\n$$\n```',
    '~~~~md\n$$x_i$$\n~~~\n$y$\n~~~~',
    '---\ntitle: "$x$ and $$y$$"\n---\n普通文字',
    '{% math expression="x = \\text{price $5}" /%}',
    '$$unclosed',
    '$unclosed',
    '$$$literal$$$',
  ])('leaves literal/code/frontmatter content untouched: %s', (source) => {
    expect(normalizeDollarMath(source)).toBe(source);
  });

  it('keeps explicit math tags unchanged and does not double-normalize', () => {
    const source = '$$x_i$$\n\n正文 $y_i$';
    const normalized = normalizeDollarMath(source);
    expect(normalizeDollarMath(normalized)).toBe(normalized);
  });

  it('preserves aligned row separators through repeated formatter/parser save cycles', () => {
    const expression = String.raw`\begin{aligned}a_i &= b_i \\ c_i &= \frac{d_i}{2}\end{aligned}`;
    let source = normalizeDollarMath('$$\n\n' + expression + '\n\n$$');
    for (let round = 0; round < 5; round++) {
      source = Markdoc.format(Markdoc.parse(Markdoc.format(Markdoc.parse(source))));
      expect(mathNodes(source)[0]?.attributes.expression).toBe(expression);
    }
  });
});
