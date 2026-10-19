import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      ok: true,
      service: 'iceaxing-astro',
      environment: import.meta.env.PUBLIC_DEPLOY_ENV ?? 'development',
    }),
    {
      headers: {
        'cache-control': 'no-store',
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
};
