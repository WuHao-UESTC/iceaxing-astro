import type { APIRoute } from 'astro';

import { isLocale, type Locale } from '../../i18n/config';
import { upsertResendContact } from '../../lib/subscriptions/email';
import {
  htmlConfirmationPage,
  htmlStatusPage,
  localizedMessage,
} from '../../lib/subscriptions/responses';
import { sha256, subscriberIdFor } from '../../lib/subscriptions/security';
import { getPersistentStore } from '../../lib/subscriptions/store';
import type { PendingSubscription, Subscriber } from '../../lib/subscriptions/types';

function requestedLocale(value: FormDataEntryValue | string | null): Locale {
  const normalized = typeof value === 'string' ? value : undefined;
  return isLocale(normalized) ? normalized : 'zh';
}

function validToken(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 32 && value.length <= 256;
}

function invalidToken(locale: Locale) {
  return htmlStatusPage(locale, '确认失败', '确认链接无效或已经过期。', 400);
}

export const GET: APIRoute = async ({ url }) => {
  const locale = requestedLocale(url.searchParams.get('locale'));
  const token = url.searchParams.get('token');
  if (!validToken(token)) return invalidToken(locale);
  return htmlConfirmationPage(locale, token);
};

async function requestData(request: Request) {
  if ((request.headers.get('content-type') ?? '').includes('application/json')) {
    return (await request.json()) as { token?: unknown; locale?: unknown };
  }
  const form = await request.formData();
  return { token: form.get('token'), locale: form.get('locale') };
}

export const POST: APIRoute = async ({ request }) => {
  const data = await requestData(request);
  const locale = requestedLocale(typeof data.locale === 'string' ? data.locale : null);
  const token = data.token;
  if (!validToken(token)) return invalidToken(locale);

  const tokenHash = sha256(token);
  const confirmationKey = `subscription:confirmed-token:${tokenHash}`;

  try {
    const store = getPersistentStore();
    const alreadyConfirmed = await store.get<{ confirmedAt: string }>(confirmationKey);
    if (alreadyConfirmed) {
      return htmlStatusPage(
        locale,
        localizedMessage(locale, {
          zh: '订阅已经确认',
          en: 'Subscription already confirmed',
          de: 'Abonnement bereits bestätigt',
        }),
        localizedMessage(locale, {
          zh: '该确认链接已经成功使用，无需再次操作。',
          en: 'This confirmation link has already been used successfully.',
          de: 'Dieser Bestätigungslink wurde bereits erfolgreich verwendet.',
        }),
      );
    }

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
      await store.set(
        confirmationKey,
        { confirmedAt: subscriber.confirmedAt },
        { ex: 48 * 60 * 60 },
      );
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
