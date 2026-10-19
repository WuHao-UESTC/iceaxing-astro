import type { APIRoute } from 'astro';

import { createRss } from '../lib/rss';

export const prerender = true;

export const GET: APIRoute = ({ site }) =>
  createRss('zh', site ?? new URL('http://localhost:4321'));
