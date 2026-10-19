import type { PersistentStore } from './store';
import type { Subscriber } from './types';

export async function unsubscribeSubscriber(
  store: PersistentStore,
  subscriberId: string,
  now = new Date(),
) {
  const key = `subscription:subscriber:${subscriberId}`;
  const subscriber = await store.get<Subscriber>(key);
  if (!subscriber) return null;
  const updated: Subscriber = subscriber.unsubscribedAt
    ? subscriber
    : { ...subscriber, unsubscribedAt: now.toISOString() };
  await store.set(key, updated);
  await store.removeFromSet('subscription:active', subscriberId);
  return updated;
}
