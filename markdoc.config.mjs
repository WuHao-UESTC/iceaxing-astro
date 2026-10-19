import { component, defineMarkdocConfig, Markdoc, nodes } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

const mathComponent = component('./src/components/markdoc/Math.astro');
const inlineMathPattern = /(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g;

function transformInlineMath(content, render) {
  const output = [];
  let cursor = 0;
  for (const match of content.matchAll(inlineMathPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) output.push(content.slice(cursor, index));
    output.push(new Markdoc.Tag(render, { expression: match[1].trim(), inline: true }, []));
    cursor = index + match[0].length;
  }
  if (cursor === 0) return content;
  if (cursor < content.length) output.push(content.slice(cursor));
  return output;
}

function plainParagraphContent(node) {
  let content = '';
  for (const child of node.children) {
    if (child.type === 'text') content += child.attributes.content;
    else if (child.type === 'softbreak') content += '\n';
    else return null;
  }
  return content;
}

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: 'github-dark-default',
      wrap: true,
    }),
  ],
  tags: {
    callout: {
      render: component('./src/components/markdoc/Callout.astro'),
      attributes: {
        variant: { type: String, default: 'note' },
        title: { type: String, required: false },
      },
    },
    toggle: {
      render: component('./src/components/markdoc/Toggle.astro'),
      attributes: {
        summary: { type: String, required: true },
        open: { type: Boolean, default: false },
      },
    },
    columns: {
      render: component('./src/components/markdoc/Columns.astro'),
      attributes: { gap: { type: String, default: 'medium' } },
    },
    column: { render: component('./src/components/markdoc/Column.astro') },
    math: {
      render: mathComponent,
      selfClosing: true,
      attributes: { expression: { type: String, required: true } },
    },
    inlineMath: {
      render: mathComponent,
      selfClosing: true,
      attributes: {
        expression: { type: String, required: true },
        inline: { type: Boolean, default: true },
      },
    },
    anchor: {
      render: component('./src/components/markdoc/Anchor.astro'),
      selfClosing: true,
      attributes: { id: { type: String, required: true } },
    },
    pdf: {
      render: component('./src/components/markdoc/PdfEmbed.astro'),
      selfClosing: true,
      attributes: {
        title: { type: String, required: true },
        file: { type: String, required: true },
      },
    },
    mindmap: {
      render: component('./src/components/markdoc/Mindmap.astro'),
      selfClosing: true,
      attributes: {
        title: { type: String, required: false },
        source: { type: String, required: true },
      },
    },
  },
  nodes: {
    paragraph: {
      ...nodes.paragraph,
      transform(node, config) {
        const content = plainParagraphContent(node);
        const match = content?.match(/^\s*\$\$([\s\S]+?)\$\$\s*$/);
        if (match) {
          return new Markdoc.Tag(
            config.tags.math.render,
            {
              expression: match[1].trim(),
              inline: false,
            },
            [],
          );
        }
        return new Markdoc.Tag(
          'p',
          node.transformAttributes(config),
          node.transformChildren(config),
        );
      },
    },
    text: {
      ...nodes.text,
      transform(node, config) {
        return transformInlineMath(node.attributes.content, config.tags.inlineMath.render);
      },
    },
    image: {
      ...nodes.image,
      render: component('./src/components/markdoc/MarkdocImage.astro'),
    },
  },
});
