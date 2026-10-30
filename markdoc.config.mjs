import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

const mathComponent = component('./src/components/markdoc/Math.astro');
export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: 'github-dark-default',
      wrap: true,
    }),
  ],
  tags: {
    conceptStart: {
      render: component('./src/components/markdoc/ConceptBoundary.astro'),
      selfClosing: true,
      attributes: { id: { type: String, required: true }, name: { type: String, default: '' } },
    },
    conceptEnd: {
      render: component('./src/components/markdoc/ConceptBoundary.astro'),
      selfClosing: true,
      attributes: { id: { type: String, required: true }, end: { type: Boolean, default: true } },
    },
    conceptLink: {
      render: component('./src/components/markdoc/ConceptLink.astro'),
      selfClosing: true,
      attributes: { target: { type: String, required: true }, name: { type: String, default: '' } },
    },
    wikiLink: {
      render: component('./src/components/markdoc/WikiLink.astro'),
      selfClosing: true,
      attributes: {
        target: { type: String, required: true },
        label: { type: String, default: '' },
        anchor: { type: String, default: '' },
      },
    },
    articleImage: {
      render: component('./src/components/markdoc/ArticleImage.astro'),
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, default: '' },
        title: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
    },
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
    image: {
      ...nodes.image,
      render: component('./src/components/markdoc/MarkdocImage.astro'),
    },
  },
});
