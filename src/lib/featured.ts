/** One editorial order across articles, projects, categories and collections. */
export const defaultFeaturedOrder = 1_000_000;
export function compareFeatured(
  a: { featuredOrder?: number; kind?: string; id: string },
  b: { featuredOrder?: number; kind?: string; id: string },
) {
  return (
    (a.featuredOrder ?? defaultFeaturedOrder) - (b.featuredOrder ?? defaultFeaturedOrder) ||
    `${a.kind ?? ''}:${a.id}`.localeCompare(`${b.kind ?? ''}:${b.id}`, 'en')
  );
}
