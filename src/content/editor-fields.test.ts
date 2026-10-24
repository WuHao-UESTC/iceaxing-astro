import { describe, expect, it } from 'vitest';
import { normalizeTags, tagField } from './tag-field';
import { renderEditorMath } from './editor-math';

describe('workspace editor fields', () => {
  it('preserves ordinary YAML tag arrays and ignores unfinished empty slots', () => {
    const stored = ['电路', 'RF design', '滤波器'];
    expect(tagField.reader.parse(stored)).toEqual(stored);
    expect(tagField.serialize([...tagField.parse(stored), '', '  ']).value).toEqual(stored);
    expect(normalizeTags(undefined)).toEqual([]);
    expect(() => normalizeTags(['valid', 1])).toThrow();
    expect(() => normalizeTags('a|b')).toThrow();
  });
  it('renders inline and multiline formulas without exposing raw source by default', () => {
    const inline = renderEditorMath(String.raw`x_i^2 + \frac{1}{2}`, true);
    expect(inline.error).toBe('');
    expect(inline.html).toContain('class="katex"');
    const block = renderEditorMath(String.raw`\begin{aligned}a &= b \\ c &= d\end{aligned}`, false);
    expect(block.error).toBe('');
    expect(block.html).toContain('katex-display');
  });
  it('reports syntax errors and rejects trusted HTML commands', () => {
    expect(renderEditorMath(String.raw`\frac{`, false).error).not.toBe('');
    const unsafe = renderEditorMath(String.raw`\href{javascript:alert(1)}{click}`, true);
    expect(unsafe.html).not.toContain('href="javascript:');
  });
});
