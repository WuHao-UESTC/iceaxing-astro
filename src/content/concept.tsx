import { fields } from '@keystatic/core';
import { inline } from '@keystatic/core/content-components';

const id = () => fields.text({ label: '概念 ID', validation: { isRequired: true } });
export const conceptStart = inline({
  label: '概念起点',
  schema: { id: id(), name: fields.text({ label: '概念名称', validation: { isRequired: true } }) },
  ContentView: ({ value }) => (
    <span
      data-concept-start={value.id}
      aria-label={`概念：${value.name}`}
      style={{ color: 'var(--ws-accent, currentColor)', fontSize: 10 }}
    >
      ◇
    </span>
  ),
});
export const conceptEnd = inline({
  label: '概念终点',
  schema: { id: id() },
  ContentView: ({ value }) => (
    <span
      data-concept-end={value.id}
      aria-label="概念文字终点"
      style={{ color: 'var(--ws-accent, currentColor)', fontSize: 10 }}
    >
      ◇
    </span>
  ),
});
export const conceptLink = inline({
  label: '概念链接',
  schema: { target: id(), name: fields.text({ label: '概念名称' }) },
  ContentView: ({ value }) => (
    <span
      data-concept-link={value.target}
      role="button"
      tabIndex={0}
      style={{
        color: 'var(--ws-accent, currentColor)',
        textDecoration: 'underline',
        textUnderlineOffset: 4,
      }}
    >
      {value.name || '概念链接'}
    </span>
  ),
});
