import type { APIRoute } from 'astro';
import { workspaceContentReader } from '../../lib/content-tree/server';
import { conceptsFromAst, type ConceptNode } from '../../lib/concepts';
import config from '../../../keystatic.config';
export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    if (config.storage.kind === 'local' && !import.meta.env.DEV)
      throw new Error('本地概念目录仅在开发服务中可用。');
    const { reader, branch } = await workspaceContentReader({
      branch: new URL(request.url).searchParams.get('branch'),
      token: cookies.get('keystatic-gh-access-token')?.value,
    });
    const base = branch ? `/keystatic/branch/${encodeURIComponent(branch)}` : '/keystatic';
    const names = [
      'articlesZh',
      'articlesEn',
      'articlesDe',
      'logsZh',
      'logsEn',
      'logsDe',
      'pagesZh',
      'pagesEn',
      'pagesDe',
    ] as const;
    const groups = await Promise.all(
      names.map(async (name) => {
        const items = await reader.collections[name].all();
        return (
          await Promise.all(
            items.map(async ({ slug, entry }) => {
              const value = entry as {
                contentId: string;
                locale: string;
                body: () => Promise<{ node: ConceptNode }>;
              };
              const body = await value.body();
              return conceptsFromAst(body.node).map((concept) => ({
                ...concept,
                articleId: value.contentId,
                locale: value.locale,
                editorHref: `${base}/collection/${name}/item/${encodeURIComponent(slug)}#concept-${concept.id}`,
              }));
            }),
          )
        ).flat();
      }),
    );
    return Response.json({ concepts: groups.flat() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : '概念读取失败' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }
};
