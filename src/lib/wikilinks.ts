import type { Locale } from '../i18n/config';

export interface WikiLinkValue {
  target: string;
  label: string;
  anchor: string;
}

export interface WikiLinkTarget {
  id: string;
  title: string;
  locale: Locale;
  kind: 'article' | 'log' | 'page';
  status?: string;
  href?: string;
}

export interface WikiLinkSpan extends WikiLinkValue {
  from: number;
  to: number;
}

export function parseWikiLink(text: string): WikiLinkValue | undefined {
  const match = text.match(/^\[\[([^[\]\r\n]+)\]\]$/);
  if (!match || match[1]!.length > 300) return;
  const [destination, ...alias] = match[1]!.split('|');
  const hash = destination!.indexOf('#');
  const target = (hash < 0 ? destination! : destination!.slice(0, hash)).trim();
  const anchor = hash < 0 ? '' : destination!.slice(hash + 1).trim();
  if (!target || alias.length > 1) return;
  return { target, anchor, label: alias.join('').trim() };
}

/** Find wiki syntax in prose, preserving code, escaped text and existing links/tags. */
export function findWikiLinks(source: string): WikiLinkSpan[] {
  const links: WikiLinkSpan[] = [];
  let cursor = source.match(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0].length ?? 0;
  let fence: { marker: string; length: number } | undefined;
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
        cursor = end;
        continue;
      }
      if (marker?.[1]) {
        fence = { marker: marker[1][0]!, length: marker[1].length };
        cursor = end;
        continue;
      }
      if (/^(?: {4}|\t)/.test(line)) {
        cursor = end;
        continue;
      }
    }
    if (source[cursor] === '\\') {
      cursor += 2;
      continue;
    }
    if (source.startsWith('<!--', cursor)) {
      const close = source.indexOf('-->', cursor + 4);
      cursor = close < 0 ? source.length : close + 3;
      continue;
    }
    if (source.startsWith('{%', cursor)) {
      let quote = '';
      cursor += 2;
      while (cursor < source.length) {
        const char = source[cursor]!;
        if (char === '\\') {
          cursor += 2;
          continue;
        }
        if (quote) {
          if (char === quote) quote = '';
        } else if (char === '"' || char === "'") quote = char;
        else if (source.startsWith('%}', cursor)) {
          cursor += 2;
          break;
        }
        cursor++;
      }
      continue;
    }
    if (source[cursor] === '`') {
      let end = cursor;
      while (source[end] === '`') end++;
      const marker = source.slice(cursor, end);
      let close = source.indexOf(marker, end);
      while (close >= 0 && (source[close - 1] === '`' || source[close + marker.length] === '`'))
        close = source.indexOf(marker, close + marker.length);
      cursor = close < 0 ? end : close + marker.length;
      continue;
    }
    // Skip a complete Markdown link/image, including nested brackets in its label.
    if (source[cursor] === '[' && !source.startsWith('[[', cursor)) {
      let depth = 1;
      let end = cursor + 1;
      for (; end < source.length && depth; end++) {
        if (source[end] === '\\') end++;
        else if (source[end] === '[') depth++;
        else if (source[end] === ']') depth--;
      }
      if (!depth && (source[end] === '(' || source[end] === '[')) {
        const open = source[end]!;
        const close = open === '(' ? ')' : ']';
        depth = 1;
        for (end++; end < source.length && depth; end++) {
          if (source[end] === '\\') end++;
          else if (source[end] === open) depth++;
          else if (source[end] === close) depth--;
        }
        cursor = end;
        continue;
      }
    }
    if (source.startsWith('[[', cursor) && source[cursor - 1] !== '!') {
      const close = source.indexOf(']]', cursor + 2);
      if (close >= 0) {
        const value = parseWikiLink(source.slice(cursor, close + 2));
        if (value) {
          links.push({ ...value, from: cursor, to: close + 2 });
          cursor = close + 2;
          continue;
        }
      }
    }
    cursor++;
  }
  return links;
}

export function normalizeWikiLinks(source: string): string {
  let output = '';
  let cursor = 0;
  for (const link of findWikiLinks(source)) {
    output += source.slice(cursor, link.from);
    output += `{% wikiLink target=${JSON.stringify(link.target)} label=${JSON.stringify(link.label)} anchor=${JSON.stringify(link.anchor)} /%}`;
    cursor = link.to;
  }
  return output + source.slice(cursor);
}

/** Actual references serialize as tags; remaining bracket text is intentional prose. */
export function escapeLiteralWikiLinks(source: string): string {
  for (const link of findWikiLinks(source).reverse())
    source = source.slice(0, link.from) + '\\' + source.slice(link.from);
  return source;
}

const normalize = (text: string) => text.normalize('NFKC').trim().toLocaleLowerCase();

export function searchWikiTargets(targets: WikiLinkTarget[], query: string, locale: Locale) {
  const terms = normalize(query.split('|')[0]!.split('#')[0]!).split(/\s+/).filter(Boolean);
  return targets
    .filter((target) =>
      terms.every((term) => normalize(`${target.title} ${target.id}`).includes(term)),
    )
    .sort(
      (a, b) =>
        Number(b.locale === locale) - Number(a.locale === locale) || a.title.localeCompare(b.title),
    )
    .slice(0, 12);
}

export function resolveWikiTarget(target: string, targets: WikiLinkTarget[], locale?: Locale) {
  const byId = targets.find((entry) => entry.id === target);
  if (byId) return byId;
  const matches = targets.filter((entry) => normalize(entry.title) === normalize(target));
  const localized = matches.filter((entry) => entry.locale === locale);
  return localized.length === 1 ? localized[0] : matches.length === 1 ? matches[0] : undefined;
}

export function wikiLinkHref(target: WikiLinkTarget, anchor: string) {
  let fragment = anchor;
  try {
    fragment = decodeURIComponent(anchor);
  } catch {
    /* A literal percent sign is part of the anchor. */
  }
  return target.href
    ? target.href + (fragment ? `#${encodeURIComponent(fragment)}` : '')
    : undefined;
}
