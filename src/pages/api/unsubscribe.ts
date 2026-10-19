import type { APIRoute } from 'astro';

import { isLocale, type Locale } from '../../i18n/config';
import { markResendContactUnsubscribed } from '../../lib/subscriptions/email';
import { htmlStatusPage, localizedMessage } from '../../lib/subscriptions/responses';
import { tokenSecrets, verifyUnsubscribeToken } from '../../lib/subscriptions/security';
import { unsubscribeSubscriber } from '../../lib/subscriptions/service';
import { getPersistentStore } from '../../lib/subscriptions/store';

async function unsubscribe(request: Request) {
  const url = new URL(request.url);
  const requestedLocale = url.searchParams.get('locale') ?? undefined;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : 'zh';
  const subscriberId = url.searchParams.get('s');
  const token = url.searchParams.get('t');
  const secrets = tokenSecrets();
  if (
    !subscriberId ||
    !token ||
    secrets.length === 0 ||
    !verifyUnsubscribeToken(subscriberId, token, secrets)
  ) {
    return htmlStatusPage(locale, '退订失败', '退订链接无效或已经过期。', 400);
  }

  try {
    const store = getPersistentStore();
    const subscriber = await unsubscribeSubscriber(store, subscriberId);
    if (subscriber) {
      try {
        await markResendContactUnsubscribed(subscriber);
      } catch {
        // The persistent local opt-out is authoritative; provider sync can be retried separately.
      }
    }
    return htmlStatusPage(
      locale,
      localizedMessage(locale, { zh: '退订成功', en: 'Unsubscribed', de: 'Abgemeldet' }),
      localizedMessage(locale, {
        zh: '你已从通知列表中移除，不会再收到发布邮件。',
        en: 'You have been removed from publication notifications.',
        de: 'Du erhältst keine weiteren Veröffentlichungsmails.',
      }),
    );
  } catch {
    return htmlStatusPage(locale, '退订失败', '退订服务暂不可用，请稍后重试。', 503);
  }
}

export const GET: APIRoute = ({ request }) => unsubscribe(request);
export const POST: APIRoute = ({ request }) => unsubscribe(request);
