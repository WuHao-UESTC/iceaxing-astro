import Markdoc from '@markdoc/markdoc';

export interface Concept {
  id: string;
  name: string;
  definition: string;
  articleId?: string;
  locale?: string;
  editorHref?: string;
  href?: string;
  from?: number;
  to?: number;
}

export interface ConceptNode {
  type: string;
  tag?: string;
  attributes: Record<string, unknown>;
  children: readonly ConceptNode[];
}

export const conceptIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const normalizeConceptName = (name: string) => name.normalize('NFKC').trim().toLowerCase();

/** Boundary tags preserve the original text, formatting, math and paragraph structure. */
export function conceptsFromAst(root: ConceptNode): Concept[] {
  const result: Concept[] = [];
  const active = new Map<string, { name: string; text: string }>();
  const append = (text: string) => active.forEach((entry) => (entry.text += text));
  const walk = (node: ConceptNode) => {
    const { id, name } = node.attributes;
    if (node.tag === 'conceptStart' && typeof id === 'string' && typeof name === 'string') {
      if (conceptIdPattern.test(id) && name.trim()) active.set(id, { name: name.trim(), text: '' });
      return;
    }
    if (node.tag === 'conceptEnd' && typeof id === 'string') {
      const entry = active.get(id);
      if (entry?.text.trim()) result.push({ id, name: entry.name, definition: entry.text.trim() });
      active.delete(id);
      return;
    }
    if (node.type === 'text' || node.type === 'code' || node.type === 'fence') {
      append(String(node.attributes.content ?? ''));
    } else if (node.tag === 'inlineMath' || node.tag === 'math') {
      append(`$${String(node.attributes.expression ?? '')}$`);
    } else if (node.tag === 'conceptLink') {
      append(String(node.attributes.name ?? ''));
    } else {
      node.children.forEach(walk);
      if (['paragraph', 'heading', 'list_item'].includes(node.type)) append('\n');
      if (node.type === 'softbreak' || node.type === 'hardbreak') append('\n');
    }
  };
  walk(root);
  return result;
}

export function conceptsFromSource(source: string) {
  return conceptsFromAst(Markdoc.parse(source) as unknown as ConceptNode);
}

export function searchConcepts(concepts: readonly Concept[], query: string, locale?: string) {
  const terms = normalizeConceptName(query).split(/\s+/).filter(Boolean);
  return concepts
    .filter((c) => terms.every((term) => normalizeConceptName(c.name).includes(term)))
    .sort(
      (a, b) =>
        Number(b.locale === locale) - Number(a.locale === locale) ||
        a.name.localeCompare(b.name, 'zh'),
    );
}

/** Current editor state overrides saved entries, including deletions and undo. */
export function mergeConcepts(
  saved: readonly Concept[],
  local: readonly Concept[],
  articleId?: string,
) {
  const map = new Map(
    saved.filter((c) => !articleId || c.articleId !== articleId).map((c) => [c.id, c]),
  );
  local.forEach((c) => map.set(c.id, c));
  return [...map.values()];
}
