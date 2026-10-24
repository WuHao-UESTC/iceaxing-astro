import { useId, useRef } from 'react';

export function normalizeTags(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string'))
    throw new Error('标签必须是文本列表。');
  return [...new Set(value.map((tag: string) => tag.trim()).filter(Boolean))];
}

type Props = { value: string[]; onChange(value: string[]): void; autoFocus: boolean };
function TagsInput({ value, onChange, autoFocus }: Props) {
  const id = useId();
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const slots = value.length && value[value.length - 1] === '' ? value : [...value, ''];
  const focusNext = (index: number) => requestAnimationFrame(() => refs.current[index]?.focus());
  return (
    <div data-ws-tags="true">
      <span id={id}>标签</span>
      <div role="group" aria-labelledby={id} className="ws-tag-list">
        {slots.map((tag, index) => (
          <span className="ws-tag-slot" key={index}>
            {index > 0 && (
              <span className="ws-tag-divider" aria-hidden="true">
                │
              </span>
            )}
            <input
              ref={(input) => {
                refs.current[index] = input;
              }}
              type="text"
              aria-label={index === slots.length - 1 && !tag ? '添加标签' : `标签 ${index + 1}`}
              value={tag}
              placeholder={index === 0 ? '填写标签' : ''}
              autoFocus={autoFocus && index === 0}
              style={{
                width: `${Math.max(
                  3,
                  [...tag].reduce((n, char) => n + (/[^\x00-\xff]/.test(char) ? 2 : 1), 1),
                )}ch`,
              }}
              onChange={(event) => {
                const next = [...slots];
                const parts = event.target.value.split(/[|│,，\n]+/);
                next.splice(index, 1, ...parts);
                onChange(next);
                if (parts.length > 1) focusNext(index + parts.length - 1);
              }}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return;
                if (event.key === 'Enter' || event.key === '|') {
                  event.preventDefault();
                  if (tag.trim()) {
                    if (index === slots.length - 1) onChange([...slots, '']);
                    focusNext(index + 1);
                  }
                }
                if (event.key === 'Backspace' && !tag && index > 0) {
                  event.preventDefault();
                  const next = [...slots];
                  next.splice(index, 1);
                  onChange(next);
                  focusNext(index - 1);
                }
                if (event.key === 'Delete' && event.ctrlKey && tag) {
                  event.preventDefault();
                  onChange(slots.filter((_, i) => i !== index));
                  focusNext(Math.max(0, index - 1));
                }
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Storage remains an ordinary YAML string array, including reader compatibility. */
export const tagField = {
  kind: 'form' as const,
  label: '标签',
  Input: TagsInput,
  defaultValue: (): string[] => [],
  parse: normalizeTags,
  serialize: (value: string[]) => ({ value: normalizeTags(value) }),
  validate: normalizeTags,
  reader: { parse: normalizeTags },
};
