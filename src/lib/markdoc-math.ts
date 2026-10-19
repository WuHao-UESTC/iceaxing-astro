export interface DollarMathSpan {
  start: number;
  end: number;
  expression: string;
  inline: boolean;
}

/** Preserve LaTeX before Markdown can consume escapes, underscores or blank lines. */
export function normalizeDollarMath(
  source: string,
  onMath?: (span: DollarMathSpan) => void,
): string {
  const output: string[] = [];
  const frontmatter = source.match(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/);
  let cursor = frontmatter?.[0].length ?? 0;
  if (cursor) output.push(source.slice(0, cursor));
  let fence: { marker: string; length: number } | undefined;

  const escaped = (position: number) => {
    let slashes = 0;
    while (source[position - slashes - 1] === '\\') slashes++;
    return slashes % 2 === 1;
  };
  const dollars = (position: number) => {
    let end = position;
    while (source[end] === '$') end++;
    return end - position;
  };

  while (cursor < source.length) {
    if (cursor === 0 || source[cursor - 1] === '\n') {
      const newline = source.indexOf('\n', cursor);
      const end = newline < 0 ? source.length : newline + 1;
      const line = source.slice(cursor, end);
      const marker = line.match(/^[\t ]*(?:>[\t ]*)*(`{3,}|~{3,})([^\n]*)/);
      if (fence) {
        if (
          marker?.[1]?.[0] === fence.marker &&
          marker[1].length >= fence.length &&
          !marker[2]?.trim()
        )
          fence = undefined;
        output.push(line);
        cursor = end;
        continue;
      }
      if (marker?.[1]) {
        fence = { marker: marker[1][0]!, length: marker[1].length };
        output.push(line);
        cursor = end;
        continue;
      }
    }

    // Existing Markdoc components (including their attribute strings) stay intact.
    if (source.startsWith('{%', cursor)) {
      let end = cursor + 2;
      let quote = '';
      for (; end < source.length; end++) {
        const char = source[end]!;
        if (quote) {
          if (char === quote && !escaped(end)) quote = '';
        } else if (char === '"' || char === "'") quote = char;
        else if (source.startsWith('%}', end)) {
          end += 2;
          break;
        }
      }
      output.push(source.slice(cursor, end));
      cursor = end;
      continue;
    }

    // Inline code may contain dollar signs and may itself span several lines.
    if (source[cursor] === '`' && !escaped(cursor)) {
      let end = cursor;
      while (source[end] === '`') end++;
      const marker = source.slice(cursor, end);
      let close = source.indexOf(marker, end);
      while (close >= 0 && (source[close - 1] === '`' || source[close + marker.length] === '`')) {
        close = source.indexOf(marker, close + marker.length);
      }
      if (close >= 0) {
        output.push(source.slice(cursor, close + marker.length));
        cursor = close + marker.length;
        continue;
      }
      output.push(marker);
      cursor = end;
      continue;
    }

    if (source[cursor] !== '$' || escaped(cursor)) {
      output.push(source[cursor]!);
      cursor++;
      continue;
    }
    const length = dollars(cursor);
    if (length > 2) {
      output.push(source.slice(cursor, cursor + length));
      cursor += length;
      continue;
    }
    const block = length === 2;
    let close = cursor + length;
    while (close < source.length) {
      if (!block && /[\r\n]/.test(source[close]!)) break;
      if (source[close] === '$' && !escaped(close)) {
        const run = dollars(close);
        if (run === length && (block || !/\d/.test(source[close + length] ?? ''))) break;
        close += run;
      } else close++;
    }
    if (source[close] !== '$' || dollars(close) !== length) {
      output.push(source.slice(cursor, cursor + length));
      cursor += length;
      continue;
    }
    const expression = source.slice(cursor + length, close).trim();
    const end = close + length;
    if (!expression) {
      output.push(source.slice(cursor, end));
      cursor = end;
      continue;
    }
    onMath?.({ start: cursor, end, expression, inline: !block });
    const tag = `{% ${block ? 'math' : 'inlineMath'} expression=${JSON.stringify(expression)} /%}`;
    if (block) {
      const lineStart = source.lastIndexOf('\n', cursor - 1) + 1;
      const nextNewline = source.indexOf('\n', end);
      const before = source.slice(lineStart, cursor).trim();
      const after = source.slice(end, nextNewline < 0 ? source.length : nextNewline).trim();
      const padding = '\n'.repeat(source.slice(cursor, end).match(/\n/g)?.length ?? 0);
      output.push((before ? '\n\n' : '') + tag + padding + (after ? '\n\n' : ''));
    } else output.push(tag);
    cursor = end;
  }
  return output.join('');
}

export function findDollarMath(source: string): DollarMathSpan[] {
  const spans: DollarMathSpan[] = [];
  normalizeDollarMath(source, (span) => spans.push(span));
  return spans;
}
