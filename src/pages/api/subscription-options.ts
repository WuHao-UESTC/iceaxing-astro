import type { APIRoute } from 'astro';

import { isLocale } from '../../i18n/config';
import { subscriptionOptions } from '../../lib/subscriptions/types';

export const prerender = true;

export const GET: APIRoute = ({ url }) => {
  const requestedLocale = url.searchParams.get('locale') ?? undefined;
  const locale = isLocale(requestedLocale) ? requestedLocale : 'zh';
  return new Response(
    JSON.stringify({
      success: true,
      data: subscriptionOptions.map((option) => ({
        key: option.key,
        kind: option.kind,
        parentKey: option.parentKey,
        label: option.labels[locale],
      })),
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      },
    },
  );
};
