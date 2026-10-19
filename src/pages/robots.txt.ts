import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('http://localhost:4321');
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /keystatic/\nSitemap: ${new URL('/sitemap-index.xml', origin).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
