import type { APIRoute } from 'astro';
import { isLocale } from '../../i18n/config';
import { publicSearchDocuments } from '../../lib/search-content';
import { searchDocuments, searchQueryLimit, searchTypes } from '../../lib/search';

export const prerender = false;
export const GET: APIRoute = async ({ url }) => {
  const locale = url.searchParams.get('locale') ?? 'zh';
  const query = (url.searchParams.get('q') ?? '').trim();
  const type = url.searchParams.get('type') ?? '';
  const category = url.searchParams.get('category') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');
  if (
    !isLocale(locale) ||
    query.length > searchQueryLimit ||
    (type && !searchTypes.some((value) => value === type)) ||
    (category && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category)) ||
    !Number.isSafeInteger(page) ||
    page < 1 ||
    page > 1000
  ) {
    return Response.json({ error: 'Invalid search parameters' }, { status: 400 });
  }
  if (!query && !type && !category) return Response.json({ items: [], total: 0, hasMore: false });
  const result = searchDocuments(await publicSearchDocuments(locale), query, {
    type,
    category,
    page,
  });
  return Response.json(result, {
    headers: { 'Cache-Control': 'public, max-age=30', 'X-Robots-Tag': 'noindex' },
  });
};
