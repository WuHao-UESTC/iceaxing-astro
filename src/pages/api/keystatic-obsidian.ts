import type { APIRoute } from 'astro';
import { buildObsidianExport } from '../../lib/obsidian/export';
import { exportRepository, isExportAsset } from '../../lib/obsidian/repository';
export const prerender = false;
export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url);
  const options = {
    token: cookies.get('keystatic-gh-access-token')?.value,
    branch: url.searchParams.get('branch'),
  };
  try {
    const asset = url.searchParams.get('asset');
    if (asset) {
      if (!isExportAsset(asset)) return new Response('资源路径无效。', { status: 400 });
      const repository = await exportRepository(options);
      const bytes = await repository.read(asset);
      const offset = Number(url.searchParams.get('offset') ?? 0);
      if (!Number.isSafeInteger(offset) || offset < 0 || offset > bytes.byteLength)
        return new Response('附件分段参数无效。', { status: 400 });
      return new Response(new Uint8Array(bytes.subarray(offset, offset + 3 * 1024 * 1024)), {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
          'X-Asset-Size': String(bytes.byteLength),
          'X-Asset-Offset': String(offset),
        },
      });
    }
    return Response.json(await buildObsidianExport(options), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : '导出失败。' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }
};
