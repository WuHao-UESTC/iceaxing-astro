import type { APIRoute } from 'astro';
import { z } from 'zod';

import { isLocale, type Locale } from '../../i18n/config';
import { confirmationEmail, sendMessage } from '../../lib/subscriptions/email';
import { htmlStatusPage, localizedMessage, wantsHtml } from '../../lib/subscriptions/responses';
import {
  hasAllowedOrigin,
  normalizeEmail,
  opaqueToken,
  requestFingerprint,
  sha256,
} from '../../lib/subscriptions/security';
import { getPersistentStore, StoreConfigurationError } from '../../lib/subscriptions/store';
import { subscriptionKeys, type PendingSubscription } from '../../lib/subscriptions/types';

const schema = z.object({
  email: z.email().max(254),
  locale: z.enum(['zh', 'en', 'de']).default('zh'),
  subscriptions: z.array(z.string()).max(50).default([]),
  website: z.string().max(0).optional(),
});

async function requestData(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) return request.json();
  const form = await request.formData();
  return {
    email: form.get('email'),
    locale: form.get('locale'),
    subscriptions: form.getAll('subscriptions'),
    website: form.get('website') || undefined,
  };
}

function response(request: Request, locale: Locale, message: string, status: number) {
  if (wantsHtml(request))
    return htmlStatusPage(locale, status < 400 ? '订阅请求已提交' : '订阅失败', message, status);
  return Response.json({ success: status < 400, message }, { status });
}

export const POST: APIRoute = async ({ request, url }) => {
  if (!hasAllowedOrigin(request)) return Response.json({ success: false }, { status: 403 });

  let locale: Locale = 'zh';
  try {
    const parsed = schema.safeParse(await requestData(request));
    if (!parsed.success) return response(request, locale, '请输入有效的邮箱地址。', 400);
    locale = isLocale(parsed.data.locale) ? parsed.data.locale : 'zh';
    const subscriptions = [...new Set(parsed.data.subscriptions)];
    if (subscriptions.some((key) => !subscriptionKeys.has(key))) {
      return response(request, locale, '订阅选项无效，请刷新页面后重试。', 400);
    }

    const store = getPersistentStore();
    const fingerprint = requestFingerprint(request);
    const requests = await store.incrementWindow(`rate:subscribe:${fingerprint}`, 60 * 60);
    if (requests > 3) {
      return response(
        request,
        locale,
        localizedMessage(locale, {
          zh: '请求过于频繁，请稍后再试。',
          en: 'Too many requests. Please try again later.',
          de: 'Zu viele Anfragen. Bitte versuche es später erneut.',
        }),
        429,
      );
    }

    const email = normalizeEmail(parsed.data.email);
    const token = opaqueToken();
    const pending: PendingSubscription = {
      email,
      locale,
      subscriptions,
      requestedAt: new Date().toISOString(),
    };
    const pendingKey = `subscription:pending:${sha256(token)}`;
    await store.set(pendingKey, pending, { ex: 48 * 60 * 60 });

    const siteUrl = process.env.PUBLIC_SITE_URL ?? url.origin;
    const confirmUrl = new URL('/api/confirm-subscription', siteUrl);
    confirmUrl.searchParams.set('token', token);
    confirmUrl.searchParams.set('locale', locale);
    try {
      await sendMessage(confirmationEmail(locale, email, confirmUrl.href));
    } catch (error) {
      await store.delete(pendingKey);
      throw error;
    }

    return response(
      request,
      locale,
      localizedMessage(locale, {
        zh: '确认邮件已发送，请在 48 小时内完成确认。',
        en: 'Confirmation sent. Please confirm within 48 hours.',
        de: 'Bestätigung gesendet. Bitte bestätige innerhalb von 48 Stunden.',
      }),
      202,
    );
  } catch (error) {
    const unavailable = error instanceof StoreConfigurationError || error instanceof Error;
    return response(
      request,
      locale,
      localizedMessage(locale, {
        zh: '订阅服务暂不可用，请稍后重试。',
        en: 'Subscriptions are temporarily unavailable.',
        de: 'Der Abonnementdienst ist vorübergehend nicht verfügbar.',
      }),
      unavailable ? 503 : 500,
    );
  }
};
