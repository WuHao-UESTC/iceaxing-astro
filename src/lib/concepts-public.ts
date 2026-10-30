import { getContentIndex, isPublicContent, routeFor } from './content';
import { conceptsFromSource, type Concept } from './concepts';

/** Never put definitions or snippets from drafts/private folders into public HTML. */
export async function publicConcepts(): Promise<Concept[]> {
  const index = await getContentIndex();
  return (
    [
      ['article', index.articles],
      ['log', index.logs],
      ['page', index.pages],
    ] as const
  ).flatMap(([kind, entries]) =>
    entries
      .filter((entry) => isPublicContent(entry.data))
      .flatMap((entry) => {
        const href = routeFor(entry.data.contentId, entry.data.locale, kind);
        return href
          ? conceptsFromSource(entry.body ?? '').map((c) => ({
              ...c,
              articleId: entry.data.contentId,
              locale: entry.data.locale,
              href: `${href}#concept-${c.id}`,
            }))
          : [];
      }),
  );
}
