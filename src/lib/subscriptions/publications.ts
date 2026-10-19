import manifest from '../../generated/publication-manifest.json';

import type { Locale } from '../../i18n/config';
import { publicationEmail, sendMessage, type SendMessage } from './email';
import type { PersistentStore } from './store';
import { matchesSubscription, type Subscriber } from './types';

export interface PublicationEntry {
  contentId: string;
  kind: 'article' | 'category' | 'project' | 'collection';
  versionHash: string;
  publishedAt?: string;
  titles: Partial<Record<Locale, string>>;
  urls: Partial<Record<Locale, string>>;
  subscriptionKeys: string[];
}

export interface PublicationManifest {
  version: number;
  entries: PublicationEntry[];
}

export const currentPublicationManifest = manifest as PublicationManifest;

export function newPublications(
  previous: PublicationManifest | null,
  current: PublicationManifest,
) {
  if (!previous) return [];
  const previousIds = new Set(previous.entries.map((entry) => `${entry.kind}:${entry.contentId}`));
  return current.entries.filter((entry) => !previousIds.has(`${entry.kind}:${entry.contentId}`));
}

export function localizedPublication(entry: PublicationEntry, locale: Locale, siteUrl: string) {
  const fallbackLocale = (Object.keys(entry.titles)[0] ?? 'zh') as Locale;
  const title =
    entry.titles[locale] ?? entry.titles.zh ?? entry.titles[fallbackLocale] ?? entry.contentId;
  const pathname = entry.urls[locale] ?? entry.urls.zh ?? entry.urls[fallbackLocale] ?? '/';
  return {
    contentId: entry.contentId,
    versionHash: entry.versionHash,
    title,
    url: new URL(pathname, siteUrl).href,
  };
}

export interface NotificationSummary {
  baseline: boolean;
  publications: number;
  attempted: number;
  sent: number;
  skipped: number;
  failed: number;
  remaining: number;
}

export async function notifyPublications(
  store: PersistentStore,
  current: PublicationManifest,
  options: {
    siteUrl: string;
    tokenSecret: string;
    send?: (message: SendMessage) => Promise<unknown>;
    batchLimit?: number;
    intervalMs?: number;
  },
): Promise<NotificationSummary> {
  const previous = await store.get<PublicationManifest>('publication:manifest:last');
  if (!previous) {
    await store.set('publication:manifest:last', current);
    return {
      baseline: true,
      publications: 0,
      attempted: 0,
      sent: 0,
      skipped: 0,
      failed: 0,
      remaining: 0,
    };
  }

  const publications = newPublications(previous, current);
  const subscriberIds = await store.members('subscription:active');
  const summary: NotificationSummary = {
    baseline: false,
    publications: publications.length,
    attempted: 0,
    sent: 0,
    skipped: 0,
    failed: 0,
    remaining: 0,
  };
  const deliver = options.send ?? sendMessage;
  const batchLimit = Math.max(1, options.batchLimit ?? 50);
  const intervalMs = Math.max(0, options.intervalMs ?? 0);

  for (const entry of publications) {
    for (const subscriberId of subscriberIds) {
      const subscriber = await store.get<Subscriber>(`subscription:subscriber:${subscriberId}`);
      if (!subscriber || subscriber.unsubscribedAt) {
        summary.skipped += 1;
        continue;
      }
      if (!matchesSubscription(subscriber.subscriptions, entry.subscriptionKeys)) {
        summary.skipped += 1;
        continue;
      }
      const deliveryKey = `publication:delivery:${entry.contentId}:${entry.versionHash}:${subscriberId}`;
      const existing = await store.get<{ status?: string }>(deliveryKey);
      if (existing?.status === 'sent') {
        summary.skipped += 1;
        continue;
      }
      if (existing || summary.attempted >= batchLimit) {
        summary.remaining += 1;
        continue;
      }
      const claimed = await store.set(
        deliveryKey,
        { status: 'sending', startedAt: new Date().toISOString() },
        { nx: true, ex: 60 * 60 },
      );
      if (!claimed) {
        summary.remaining += 1;
        continue;
      }
      summary.attempted += 1;
      try {
        const publication = localizedPublication(entry, subscriber.locale, options.siteUrl);
        await deliver(
          publicationEmail(subscriber, publication, options.siteUrl, options.tokenSecret),
        );
        await store.set(
          deliveryKey,
          { status: 'sent', sentAt: new Date().toISOString() },
          { ex: 365 * 24 * 60 * 60 },
        );
        summary.sent += 1;
        if (intervalMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, intervalMs));
        }
      } catch {
        await store.delete(deliveryKey);
        summary.failed += 1;
      }
    }
  }

  if (summary.failed === 0 && summary.remaining === 0) {
    await store.set('publication:manifest:last', current);
  }
  return summary;
}
