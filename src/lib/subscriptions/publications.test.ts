import { describe, expect, it } from 'vitest';

import { notifyPublications, type PublicationManifest } from './publications';
import { unsubscribeSubscriber } from './service';
import type { PersistentStore } from './store';
import type { Subscriber } from './types';

class MemoryStore implements PersistentStore {
  values = new Map<string, unknown>();
  sets = new Map<string, Set<string>>();

  async get<T>(key: string) {
    return (this.values.get(key) as T | undefined) ?? null;
  }
  async getdel<T>(key: string) {
    const value = await this.get<T>(key);
    this.values.delete(key);
    return value;
  }
  async set<T>(key: string, value: T, options?: { nx?: boolean }) {
    if (options?.nx && this.values.has(key)) return false;
    this.values.set(key, value);
    return true;
  }
  async delete(key: string) {
    this.values.delete(key);
  }
  async addToSet(key: string, value: string) {
    const set = this.sets.get(key) ?? new Set<string>();
    set.add(value);
    this.sets.set(key, set);
  }
  async removeFromSet(key: string, value: string) {
    this.sets.get(key)?.delete(value);
  }
  async members(key: string) {
    return [...(this.sets.get(key) ?? [])];
  }
  async incrementWindow(key: string) {
    const value = Number(this.values.get(key) ?? 0) + 1;
    this.values.set(key, value);
    return value;
  }
}

const previous: PublicationManifest = { version: 1, entries: [] };
const current: PublicationManifest = {
  version: 1,
  entries: [
    {
      contentId: 'new-post',
      kind: 'article',
      versionHash: 'abc',
      titles: { zh: '新文章' },
      urls: { zh: '/new-post' },
      subscriptionKeys: ['category:technology'],
    },
  ],
};

describe('publication notifications', () => {
  it('baselines the first deployment without sending historical content', async () => {
    const store = new MemoryStore();
    const summary = await notifyPublications(store, current, {
      siteUrl: 'https://example.com',
      tokenSecret: 'secret',
      send: async () => undefined,
    });
    expect(summary.baseline).toBe(true);
    expect(summary.sent).toBe(0);
  });

  it('retries failures and never repeats a successful delivery', async () => {
    const store = new MemoryStore();
    await store.set('publication:manifest:last', previous);
    const subscriber: Subscriber = {
      subscriberId: 'reader',
      email: 'reader@example.com',
      locale: 'zh',
      subscriptions: ['category:technology'],
      requestedAt: '',
      confirmedAt: '',
    };
    await store.set('subscription:subscriber:reader', subscriber);
    await store.addToSet('subscription:active', 'reader');
    let attempts = 0;
    const send = async () => {
      attempts += 1;
      if (attempts === 1) throw new Error('temporary');
    };

    expect(
      (
        await notifyPublications(store, current, {
          siteUrl: 'https://example.com',
          tokenSecret: 'secret',
          send,
        })
      ).failed,
    ).toBe(1);
    expect(
      (
        await notifyPublications(store, current, {
          siteUrl: 'https://example.com',
          tokenSecret: 'secret',
          send,
        })
      ).sent,
    ).toBe(1);
    expect(
      (
        await notifyPublications(store, current, {
          siteUrl: 'https://example.com',
          tokenSecret: 'secret',
          send,
        })
      ).sent,
    ).toBe(0);
    expect(attempts).toBe(2);
  });

  it('removes an unsubscribed reader from the active audience immediately', async () => {
    const store = new MemoryStore();
    const subscriber: Subscriber = {
      subscriberId: 'reader',
      email: 'reader@example.com',
      locale: 'en',
      subscriptions: [],
      requestedAt: '',
      confirmedAt: '',
    };
    await store.set('subscription:subscriber:reader', subscriber);
    await store.addToSet('subscription:active', 'reader');
    const updated = await unsubscribeSubscriber(store, 'reader', new Date('2026-10-19T00:00:00Z'));
    expect(updated?.unsubscribedAt).toBe('2026-10-19T00:00:00.000Z');
    expect(await store.members('subscription:active')).toEqual([]);
  });
});
