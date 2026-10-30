import { describe, expect, it } from 'vitest';
import { conceptsFromSource, mergeConcepts, searchConcepts } from './concepts';

describe('concept definitions stay in source text', () => {
  it('extracts formatted, multiline text and math only between matching boundaries', () => {
    const source =
      'before {% conceptStart id="c-test" name="稳定性" /%}有界 **输入**，{% inlineMath expression="x_i" /%}。\n\n另一段。{% conceptEnd id="c-test" /%} after';
    expect(conceptsFromSource(source)).toEqual([
      { id: 'c-test', name: '稳定性', definition: '有界 输入，$x_i$。\n另一段。' },
    ]);
    expect(
      conceptsFromSource(
        '```md\n{% conceptStart id="fake" name="fake" /%}\ntext\n{% conceptEnd id="fake" /%}\n```',
      ),
    ).toEqual([]);
  });
  it('ignores missing boundaries and follows edits to original text', () => {
    expect(conceptsFromSource('{% conceptStart id="c-test" name="稳定性" /%}orphan')).toEqual([]);
    expect(
      conceptsFromSource(
        '{% conceptStart id="c-test" name="稳定性" /%}修订后的定义{% conceptEnd id="c-test" /%}',
      )[0]?.definition,
    ).toBe('修订后的定义');
  });
  it('replaces saved definitions with current unsaved state, including deletion/undo', () => {
    const saved = [
      { id: 'c-one', name: 'A', definition: 'old', articleId: 'one' },
      { id: 'c-two', name: 'B', definition: 'keep', articleId: 'two' },
    ];
    expect(mergeConcepts(saved, [], 'one')).toEqual([saved[1]]);
    const merged = mergeConcepts(saved, [{ ...saved[0]!, definition: 'new' }], 'one');
    expect(merged.find((c) => c.id === 'c-one')?.definition).toBe('new');
    expect(searchConcepts(merged, 'a')).toHaveLength(1);
  });
});
