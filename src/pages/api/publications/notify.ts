import { timingSafeEqual } from 'node:crypto';

import type { APIRoute } from 'astro';

import {
  currentPublicationManifest,
  notifyPublications,
} from '../../../lib/subscriptions/publications';
import { getPersistentStore, type PersistentStore } from '../../../lib/subscriptions/store';

function authorized(request: Request) {
  const configured = process.env.PUBLICATION_NOTIFY_SECRET;
  const provided = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!configured || !provided) return false;
  const expected = Buffer.from(configured);
  const received = Buffer.from(provided);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export const POST: APIRoute = async ({ request, url }) => {
  if (!authorized(request)) return Response.json({ success: false }, { status: 401 });
  const tokenSecret = process.env.SUBSCRIPTION_TOKEN_SECRET;
  if (!tokenSecret)
    return Response.json({ success: false, error: 'not_configured' }, { status: 503 });
  const lockKey = 'publication:notify-lock';
  let store: PersistentStore | undefined;
  try {
    store = getPersistentStore();
    const locked = await store.set(lockKey, 'processing', { nx: true, ex: 10 * 60 });
    if (!locked)
      return Response.json({ success: false, error: 'already_processing' }, { status: 409 });
    const summary = await notifyPublications(store, currentPublicationManifest, {
      siteUrl: process.env.PUBLIC_SITE_URL ?? url.origin,
      tokenSecret,
      batchLimit: Number(process.env.NOTIFICATION_BATCH_SIZE ?? 50),
      intervalMs: Number(process.env.EMAIL_SEND_INTERVAL_MS ?? 400),
    });
    await store.delete(lockKey);
    const success = summary.failed === 0;
    return Response.json(
      { success, data: summary },
      { status: !success ? 503 : summary.remaining ? 202 : 200 },
    );
  } catch {
    await store?.delete(lockKey);
    return Response.json({ success: false, error: 'notification_failed' }, { status: 503 });
  }
};
