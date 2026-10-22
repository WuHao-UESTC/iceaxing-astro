export const searchTypes = ['article', 'log', 'page', 'category', 'project', 'collection'] as const;
export type SearchType = (typeof searchTypes)[number];
export const searchPageSize = 12;
export const searchQueryLimit = 120;

export interface SearchDocument {
  url: string;
  title: string;
  description: string;
  body?: string;
  tags?: string[];
  type: SearchType;
  category?: string;
}
export interface SearchItem {
  url: string;
  title: string;
  excerpt: string;
  type?: string;
  category?: string;
  html?: boolean;
}

export function normalizeSearchText(text: string) {
  return text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
export function searchTerms(query: string) {
  return [
    ...new Set(
      (query.match(/"[^"]+"|\S+/g) ?? [])
        .map((term) => normalizeSearchText(term.replace(/^"|"$/g, '').replace(/^#/, '')))
        .filter(Boolean),
    ),
  ].slice(0, 12);
}

export function searchableBody(body: string) {
  return body
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/{%[\s\S]*?%}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[`*_#>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchDocuments(
  documents: SearchDocument[],
  query: string,
  filters: { type?: string; category?: string; page?: number } = {},
) {
  const terms = searchTerms(query.slice(0, searchQueryLimit));
  if (query.trim() && !terms.length) return { items: [], total: 0, hasMore: false };
  const matches = documents
    .filter(
      (doc) =>
        (!filters.type || doc.type === filters.type) &&
        (!filters.category || doc.category === filters.category),
    )
    .map((doc) => {
      const fields = [doc.title, (doc.tags ?? []).join(' '), doc.description, doc.body ?? ''].map(
        normalizeSearchText,
      );
      if (!terms.every((term) => fields.some((field) => field.includes(term)))) return undefined;
      const score =
        terms.reduce(
          (sum, term) =>
            sum +
            fields.reduce(
              (weight, field, index) => weight + (field.includes(term) ? [12, 8, 4, 1][index]! : 0),
              0,
            ),
          0,
        ) + (terms.length && fields[0]!.includes(terms.join(' ')) ? 20 : 0);
      return { doc, score };
    })
    .filter((match): match is { doc: SearchDocument; score: number } => Boolean(match))
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const items: SearchItem[] = matches
    .slice((page - 1) * searchPageSize, page * searchPageSize)
    .map(({ doc }) => {
      const bodyMatch =
        terms.length && terms.some((term) => normalizeSearchText(doc.description).includes(term))
          ? doc.description
          : terms.some((term) => normalizeSearchText(doc.body ?? '').includes(term))
            ? doc.body!
            : doc.description || doc.body || '';
      // Locate a nearby sentence without assuming normalized offsets equal Unicode source offsets.
      const sentences = bodyMatch.match(/[^。！？.!?\n]+[。！？.!?]?/gu) ?? [bodyMatch];
      const sentenceIndex = sentences.findIndex((sentence) =>
        terms.some((term) => normalizeSearchText(sentence).includes(term)),
      );
      let context =
        sentenceIndex < 0 ? bodyMatch : sentences.slice(sentenceIndex, sentenceIndex + 3).join(' ');
      if (context.length > 180 && terms.length) {
        for (let start = 0; start < context.length; start += 60) {
          const chunk = context.slice(start, start + 180);
          if (terms.some((term) => normalizeSearchText(chunk).includes(term))) {
            context = `${start ? '…' : ''}${chunk}…`;
            break;
          }
        }
      }
      return {
        url: doc.url,
        title: doc.title,
        type: doc.type,
        category: doc.category,
        excerpt: context.length > 182 ? `${context.slice(0, 180)}…` : context,
      };
    });
  return { items, total: matches.length, hasMore: page * searchPageSize < matches.length };
}

export function safeSearchUrl(value: string, origin: string) {
  try {
    const url = new URL(value, origin);
    return url.origin === new URL(origin).origin && ['http:', 'https:'].includes(url.protocol)
      ? `${url.pathname}${url.search}${url.hash}`
      : undefined;
  } catch {
    return undefined;
  }
}
