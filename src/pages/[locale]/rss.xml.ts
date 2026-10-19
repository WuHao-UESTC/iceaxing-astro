import type { APIRoute } from 'astro';

import { prefixedLocales } from '../../i18n/config';
import { createRss } from '../../lib/rss';

export const prerender = true;

export function getStaticPaths() {
  return prefixedLocales.map((locale) => ({ params: { locale }, props: { locale } }));
}

export const GET: APIRoute = ({ props, site }) =>
  createRss(props.locale, site ?? new URL('http://localhost:4321'));
