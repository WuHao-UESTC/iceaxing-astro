import type { APIRoute } from 'astro';

import { isLocale, type Locale } from '../../i18n/config';
import { upsertResendContact } from '../../lib/subscriptions/email';
import { htmlStatusPage, localizedMessage } from '../../lib/subscriptions/responses';
import { sha256, subscriberIdFor } from '../../lib/subscriptions/security';
import { getPersistentStore } from '../../lib/subscriptions/store';
import type { PendingSubscription, Subscriber } from '../../lib/subscriptions/types';

export const GET: APIRoute = async ({ url }) => {
  const requestedLocale = url.searchParams.get('locale') ?? undefined;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : 'zh';
  const token = url.searchParams.get('token');
  if (!token || token.length < 32 || token.length > 256) {
    return htmlStatusPage(locale, '确认失败', '确认链接无效或已经过期。', 400);
  }

  try {
    const store = getPersistentStore();
    const tokenHash = sha256(token);
    const pendingKey = `subscription:pending:${tokenHash}`;
    const lockKey = `subscription:confirm-lock:${tokenHash}`;
    const locked = await store.set(lockKey, 'processing', { nx: true, ex: 120 });
    if (!locked)
      return htmlStatusPage(locale, '正在确认', '该确认请求正在处理中，请稍后刷新。', 409);

    const pending = await store.get<PendingSubscription>(pendingKey);
    if (!pending) {
      await store.delete(lockKey);
      return htmlStatusPage(locale, '确认失败', '确认链接无效、已使用或已经过期。', 400);
    }

    try {
      const contactId = await upsertResendContact(pending.email);
      const subscriberId = subscriberIdFor(pending.email);
      const subscriber: Subscriber = {
        ...pending,
        subscriberId,
        contactId,
        confirmedAt: new Date().toISOString(),
      };
      await store.set(`subscription:subscriber:${subscriberId}`, subscriber);
      await store.addToSet('subscription:active', subscriberId);
      await store.delete(pendingKey);
      await store.delete(lockKey);
      return htmlStatusPage(
        pending.locale,
        localizedMessage(pending.locale, {
          zh: '订阅已确认',
          en: 'Subscription confirmed',
          de: 'Abonnement bestätigt',
        }),
        localizedMessage(pending.locale, {
          zh: '之后有符合你偏好的新内容时，我们会发送通知。',
          en: 'You will receive notifications for new content matching your preferences.',
          de: 'Du erhältst Benachrichtigungen für neue Inhalte passend zu deinen Einstellungen.',
        }),
      );
    } catch (error) {
      await store.delete(lockKey);
      throw error;
    }
  } catch {
    return htmlStatusPage(locale, '确认失败', '订阅服务暂不可用，请稍后重试。', 503);
  }
};
