import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

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
      render: component('./src/components/markdoc/Math.astro'),
      selfClosing: true,
      attributes: { expression: { type: String, required: true } },
    },
    inlineMath: {
      render: component('./src/components/markdoc/Math.astro'),
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
    image: {
      ...nodes.image,
      render: component('./src/components/markdoc/MarkdocImage.astro'),
    },
  },
});
