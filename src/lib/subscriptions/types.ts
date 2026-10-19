import subscriptionManifest from '../../generated/subscription-options.json';

import type { Locale } from '../../i18n/config';

export type SubscriptionOptionKind = 'category' | 'project' | 'collection';

export interface SubscriptionOption {
  key: string;
  kind: SubscriptionOptionKind;
  id: string;
  parentKey?: string;
  labels: Record<Locale, string>;
}

export interface PendingSubscription {
  email: string;
  locale: Locale;
  subscriptions: string[];
  requestedAt: string;
}

export interface Subscriber extends PendingSubscription {
  subscriberId: string;
  contactId?: string;
  confirmedAt: string;
  unsubscribedAt?: string;
}

export const subscriptionOptions = subscriptionManifest.options as SubscriptionOption[];
export const subscriptionKeys = new Set(subscriptionOptions.map((option) => option.key));

export function matchesSubscription(
  subscriptions: readonly string[],
  publicationKeys: readonly string[],
) {
  return (
    subscriptions.length === 0 ||
    subscriptions.some((subscription) => publicationKeys.includes(subscription))
  );
}
