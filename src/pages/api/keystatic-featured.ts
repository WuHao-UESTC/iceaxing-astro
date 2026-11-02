import type { APIRoute } from 'astro';
import { FeaturedConflict, loadFeatured, saveFeatured } from '../../lib/featured-server';
export const prerender = false;
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    return json(
      await loadFeatured({
        branch: new URL(request.url).searchParams.get('branch'),
        token: cookies.get('keystatic-gh-access-token')?.value,
      }),
    );
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : '读取失败' }, 401);
  }
};
export const PUT: APIRoute = async ({ request, cookies }) => {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return json({ error: '请求来源无效。' }, 403);
  try {
    const raw = await request.text();
    if (raw.length > 256_000) return json({ error: '请求过大。' }, 413);
    const body = JSON.parse(raw);
    if (
      typeof body.revision !== 'string' ||
      !Array.isArray(body.items) ||
      (body.branch !== null && body.branch !== undefined && typeof body.branch !== 'string')
    )
      return json({ error: '请求格式无效。' }, 400);
    return json(
      await saveFeatured({
        revision: body.revision,
        items: body.items,
        branch: body.branch,
        token: cookies.get('keystatic-gh-access-token')?.value,
      }),
    );
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : '保存失败' },
      error instanceof FeaturedConflict ? 409 : 400,
    );
  }
};
