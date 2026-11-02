import katex from 'katex';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'katex/dist/katex.min.css';
import '../styles/keystatic-math-editor.css';

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
  const [portalDocument, setPortalDocument] = useState<Document | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const id = useId();
  const result = useMemo(
    () => renderEditorMath(value.expression, inline),
    [inline, value.expression],
  );
  const draftResult = useMemo(() => renderEditorMath(draft, inline), [draft, inline]);
  useEffect(() => {
    if (editing) setPortalDocument(triggerRef.current?.ownerDocument ?? null);
  }, [editing]);
  useEffect(() => {
    if (!editing || !portalDocument) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = triggerRef.current;
    dialog.showModal();
    inputRef.current?.focus();
    return () => {
      dialog.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [editing, portalDocument]);
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
        ref={triggerRef}
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
      {editing &&
        portalDocument &&
        createPortal(
          <dialog
            ref={dialogRef}
            data-editor-math-dialog
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            onCancel={(event) => {
              event.preventDefault();
              setEditing(false);
            }}
            onKeyDown={(event) => {
              event.stopPropagation();
              if (
                !event.nativeEvent.isComposing &&
                (event.ctrlKey || event.metaKey) &&
                event.key === 'Enter'
              ) {
                event.preventDefault();
                finish();
              }
            }}
          >
            <h2 id={`${id}-title`}>编辑{inline ? '行内' : '块级'}公式</h2>
            <label htmlFor={id}>LaTeX 源码</label>
            <textarea
              id={id}
              ref={inputRef}
              autoFocus
              rows={inline ? 3 : 7}
              value={draft}
              spellCheck={false}
              onChange={(event) => setDraft(event.target.value)}
            />
            <div data-editor-math-preview aria-label="公式预览">
              {draftResult.error ? (
                <p role="alert">{draftResult.error}</p>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: draftResult.html }} />
              )}
            </div>
            <p className="math-editor-hint">Ctrl / ⌘ + Enter 应用，Esc 取消。</p>
            <div className="math-editor-actions">
              <button type="button" onClick={finish} disabled={!draft.trim()}>
                应用公式
              </button>
              <button type="button" onClick={() => setEditing(false)}>
                取消
              </button>
              <button type="button" onClick={onRemove}>
                删除公式
              </button>
            </div>
          </dialog>,
          portalDocument.body,
        )}
    </Tag>
  );
}
