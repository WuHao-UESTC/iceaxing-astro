import { fields } from '@keystatic/core';
import { block, inline, repeating, wrapper } from '@keystatic/core/content-components';
import { createElement } from 'react';
import { articleImage } from './article-image';
import { normalizeDollarMath } from '../lib/markdoc-math';
import { wikiLink } from './wiki-link';

const requiredText = (label: string, description?: string) =>
  fields.text({
    label,
    description,
    validation: { isRequired: true },
  });

export const markdocComponents = {
  wikiLink,
  articleImage,
  callout: wrapper({
    label: '提示框',
    description: '用于提示、警告、说明或成功状态。',
    schema: {
      variant: fields.select({
        label: '样式',
        defaultValue: 'note',
        options: [
          { label: '说明', value: 'note' },
          { label: '提示', value: 'tip' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
        ],
      }),
      title: fields.text({ label: '标题' }),
    },
    ContentView: ({ children }) => children,
  }),
  toggle: wrapper({
    label: '折叠内容',
    schema: {
      summary: requiredText('摘要'),
      open: fields.checkbox({ label: '默认展开', defaultValue: false }),
    },
    ContentView: ({ children }) => children,
  }),
  column: wrapper({
    label: '分栏项',
    schema: {},
    forSpecificLocations: true,
    ContentView: ({ children }) =>
      createElement(
        'div',
        {
          style: {
            minWidth: 0,
            padding: '0.75rem',
            border: '1px solid color-mix(in srgb, currentColor 18%, transparent)',
            borderRadius: '0.5rem',
          },
        },
        children,
      ),
  }),
  columns: repeating({
    label: '分栏',
    description: '2–4 个响应式分栏；窄屏自动改为单栏。',
    schema: {
      gap: fields.select({
        label: '间距',
        defaultValue: 'medium',
        options: [
          { label: '紧凑', value: 'small' },
          { label: '标准', value: 'medium' },
          { label: '宽松', value: 'large' },
        ],
      }),
    },
    children: 'column',
    validation: { children: { min: 2, max: 4 } },
    ContentView: ({ children }) =>
      createElement(
        'div',
        {
          style: {
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'minmax(12rem, 1fr)',
            gap: '0.75rem',
            alignItems: 'start',
            overflowX: 'auto',
          },
        },
        children,
      ),
  }),
  math: Object.assign(
    block({
      label: '块级公式',
      schema: {
        expression: fields.text({
          label: 'LaTeX',
          multiline: true,
          validation: { isRequired: true },
        }),
      },
      ContentView: ({ value }) => value.expression,
    }),
    { normalizeClipboard: normalizeDollarMath },
  ),
  inlineMath: inline({
    label: '行内公式',
    schema: { expression: requiredText('LaTeX') },
    ContentView: ({ value }) => value.expression,
  }),
  anchor: inline({
    label: '锚点',
    schema: {
      id: fields.text({
        label: 'ID',
        validation: {
          isRequired: true,
          pattern: {
            regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            message: '只允许小写字母、数字和连字符。',
          },
        },
      }),
    },
    ContentView: ({ value }) => `#${value.id}`,
  }),
  pdf: block({
    label: 'PDF',
    schema: {
      title: requiredText('标题'),
      file: fields.file({
        label: 'PDF 文件',
        directory: 'public/media/files',
        publicPath: '/media/files/',
        validation: { isRequired: true },
      }),
    },
    ContentView: ({ value }) => value.title,
  }),
  mindmap: block({
    label: '思维导图',
    schema: {
      title: fields.text({ label: '标题' }),
      source: fields.text({
        label: 'Markmap Markdown',
        multiline: true,
        validation: { isRequired: true },
      }),
    },
    ContentView: ({ value }) => value.title || '思维导图',
  }),
};
