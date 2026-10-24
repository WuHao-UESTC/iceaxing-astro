import katex from 'katex';
import { useId, useMemo, useState } from 'react';
import 'katex/dist/katex.min.css';

export function renderEditorMath(expression: string, inline: boolean) {
  try {
    return {
      html: katex.renderToString(expression || '\\phantom{x}', {
        displayMode: !inline,
        throwOnError: true,
        strict: false,
        trust: false,
        output: 'htmlAndMathml',
      }),
      error: '',
    };
  } catch (error) {
    return { html: '', error: error instanceof Error ? error.message : '公式语法错误' };
  }
}

type Props = {
  value: { expression: string };
  onChange(value: { expression: string }): void;
  onRemove(): void;
  inline?: boolean;
};
export function EditorMath({ value, onChange, onRemove, inline = false }: Props) {
  const [editing, setEditing] = useState(!value.expression.trim());
  const [draft, setDraft] = useState(value.expression);
  const id = useId();
  const result = useMemo(
    () => renderEditorMath(editing ? draft : value.expression, inline),
    [draft, editing, inline, value.expression],
  );
  const Tag = inline ? 'span' : 'div';
  const start = () => {
    setDraft(value.expression);
    setEditing(true);
  };
  const finish = () => {
    if (!draft.trim()) return;
    onChange({ expression: draft });
    setEditing(false);
  };
  return (
    <Tag
      contentEditable={false}
      data-editor-math={inline ? 'inline' : 'block'}
      style={{ display: inline ? 'inline' : 'block', margin: inline ? '0 0.12em' : '1rem 0' }}
    >
      <span
        role="button"
        tabIndex={0}
        aria-label={`编辑${inline ? '行内' : '块级'}公式`}
        onClick={start}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            start();
          }
        }}
        style={{
          display: inline ? 'inline-block' : 'block',
          maxWidth: '100%',
          cursor: 'pointer',
          overflowX: inline ? undefined : 'auto',
        }}
      >
        {result.error ? (
          <span role="status" style={{ color: '#c43d3d', fontSize: '0.85em' }}>
            公式语法错误 · 点击编辑
          </span>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: result.html }} />
        )}
      </span>
      {editing && (
        <span
          role="dialog"
          aria-modal="false"
          aria-labelledby={id}
          style={{
            display: 'block',
            padding: '0.75rem',
            marginBlock: 8,
            background: 'var(--kui-color-background-surface, Canvas)',
            color: 'CanvasText',
            boxShadow: '0 5px 24px #0002',
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Escape') {
              event.preventDefault();
              setEditing(false);
            }
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
              event.preventDefault();
              finish();
            }
          }}
        >
          <label id={id} style={{ display: 'block', fontSize: 12 }}>
            LaTeX · {inline ? '行内公式' : '块级公式'}
          </label>
          <textarea
            aria-labelledby={id}
            autoFocus
            rows={inline ? 2 : 5}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            style={{
              display: 'block',
              width: '100%',
              fontFamily: 'ui-monospace, monospace',
              resize: 'vertical',
              marginBlock: 8,
            }}
          />
          {result.error && (
            <span role="alert" style={{ display: 'block', color: '#c43d3d', fontSize: 12 }}>
              {result.error}
            </span>
          )}
          <span style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <button type="button" onClick={finish} disabled={!draft.trim()}>
              应用公式
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              取消
            </button>
            <button type="button" onClick={onRemove}>
              删除公式
            </button>
          </span>
        </span>
      )}
    </Tag>
  );
}
