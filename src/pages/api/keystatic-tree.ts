import type { APIRoute } from 'astro';

import { cascadeDeleteFolder, loadContentTree } from '../../lib/content-tree/server';
import type { FolderKind } from '../../lib/content-tree/types';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

const errorResponse = (error: unknown, status = 400) =>
  json({ error: error instanceof Error ? error.message : '未知错误' }, status);

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const url = new URL(request.url);
    const branch = url.searchParams.get('branch');
    const token = cookies.get('keystatic-gh-access-token')?.value;
    return json(await loadContentTree({ branch, token }));
  } catch (error) {
    return errorResponse(error, 401);
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== requestUrl.origin)
    return errorResponse(new Error('请求来源无效。'), 403);

  try {
    const body = (await request.json()) as Partial<{
      kind: FolderKind;
      id: string;
      confirmation: string;
      branch: string | null;
    }>;
    if (!body.kind || !['category', 'project', 'collection'].includes(body.kind)) {
      return errorResponse(new Error('文件夹类型无效。'));
    }
    if (!body.id || !body.confirmation) return errorResponse(new Error('缺少删除确认信息。'));

    const result = await cascadeDeleteFolder({
      kind: body.kind,
      id: body.id,
      confirmation: body.confirmation,
      branch: body.branch,
      token: cookies.get('keystatic-gh-access-token')?.value,
    });
    return json(result);
  } catch (error) {
    return errorResponse(error);
  }
};
