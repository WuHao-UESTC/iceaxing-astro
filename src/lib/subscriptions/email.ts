import { Resend } from 'resend';

import type { Locale } from '../../i18n/config';
import { createUnsubscribeToken, sha256 } from './security';
import type { Subscriber } from './types';

export interface SendMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
  idempotencyKey: string;
  replyTo?: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function deliveryMode() {
  return process.env.EMAIL_DELIVERY_MODE ?? 'disabled';
}

function allowedRecipient(email: string) {
  const mode = deliveryMode();
  if (mode === 'production') return true;
  if (mode !== 'allowlist') return false;
  const allowlist = new Set(
    (process.env.EMAIL_TEST_ALLOWLIST ?? '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
  return allowlist.has(email.toLowerCase());
}

export class EmailDeliveryDisabledError extends Error {
  constructor() {
    super('Email delivery is disabled for this environment.');
    this.name = 'EmailDeliveryDisabledError';
  }
}

export async function sendMessage(message: SendMessage) {
  if (!allowedRecipient(message.to)) throw new EmailDeliveryDisabledError();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) throw new EmailDeliveryDisabledError();
  const resend = new Resend(apiKey);
  const result = await resend.emails.send(
    {
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      headers: message.headers,
      replyTo: message.replyTo,
    },
    { idempotencyKey: message.idempotencyKey.slice(0, 256) },
  );
  if (result.error) throw new Error(`Resend delivery failed: ${result.error.message}`);
  return result.data?.id;
}

export async function upsertResendContact(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new EmailDeliveryDisabledError();
  const resend = new Resend(apiKey);
  const segments = process.env.RESEND_SEGMENT_ID
    ? [{ id: process.env.RESEND_SEGMENT_ID }]
    : undefined;
  const created = await resend.contacts.create({ email, unsubscribed: false, segments });
  if (!created.error) return created.data?.id;

  const updated = await resend.contacts.update({ email, unsubscribed: false });
  if (updated.error) throw new Error(`Resend contact update failed: ${updated.error.message}`);
  return updated.data?.id;
}

export async function markResendContactUnsubscribed(subscriber: Subscriber) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const resend = new Resend(apiKey);
  const result = await resend.contacts.update(
    subscriber.contactId
      ? { id: subscriber.contactId, unsubscribed: true }
      : { email: subscriber.email, unsubscribed: true },
  );
  if (result.error) throw new Error(`Resend unsubscribe failed: ${result.error.message}`);
}

export function confirmationEmail(locale: Locale, email: string, confirmUrl: string): SendMessage {
  const copy = {
    zh: {
      subject: '确认订阅 iceaxing',
      heading: '确认你的订阅',
      body: '点击下面的按钮完成订阅。未确认前，我们不会把你加入通知列表。',
      action: '确认订阅',
    },
    en: {
      subject: 'Confirm your iceaxing subscription',
      heading: 'Confirm your subscription',
      body: 'Use the button below to finish subscribing. You will not receive publication emails before confirmation.',
      action: 'Confirm subscription',
    },
    de: {
      subject: 'iceaxing-Abonnement bestätigen',
      heading: 'Abonnement bestätigen',
      body: 'Bestätige dein Abonnement über die folgende Schaltfläche. Vorher werden keine Veröffentlichungsmails gesendet.',
      action: 'Abonnement bestätigen',
    },
  }[locale];
  return {
    to: email,
    subject: copy.subject,
    html: `<main style="font-family:system-ui;max-width:560px;margin:auto;padding:32px"><h1>${escapeHtml(copy.heading)}</h1><p>${escapeHtml(copy.body)}</p><p><a href="${escapeHtml(confirmUrl)}" style="display:inline-block;padding:12px 18px;background:#176b61;color:white;text-decoration:none;border-radius:6px">${escapeHtml(copy.action)}</a></p><p style="color:#667">${escapeHtml(confirmUrl)}</p></main>`,
    text: `${copy.heading}\n\n${copy.body}\n\n${confirmUrl}`,
    idempotencyKey: `subscription-confirm/${sha256(`${email}:${confirmUrl}`).slice(0, 48)}`,
  };
}

export function publicationEmail(
  subscriber: Subscriber,
  publication: { contentId: string; versionHash: string; title: string; url: string },
  siteUrl: string,
  tokenSecret: string,
): SendMessage {
  const unsubscribeToken = createUnsubscribeToken(subscriber.subscriberId, tokenSecret);
  const unsubscribeUrl = new URL('/api/unsubscribe', siteUrl);
  unsubscribeUrl.searchParams.set('s', subscriber.subscriberId);
  unsubscribeUrl.searchParams.set('t', unsubscribeToken);
  unsubscribeUrl.searchParams.set('locale', subscriber.locale);
  const subject =
    subscriber.locale === 'zh'
      ? `新内容：${publication.title}`
      : subscriber.locale === 'de'
        ? `Neuer Beitrag: ${publication.title}`
        : `New publication: ${publication.title}`;
  return {
    to: subscriber.email,
    subject,
    html: `<main style="font-family:system-ui;max-width:560px;margin:auto;padding:32px"><p>ICEAXING / NEW</p><h1>${escapeHtml(publication.title)}</h1><p><a href="${escapeHtml(publication.url)}">Read online</a></p><hr><p style="font-size:12px"><a href="${escapeHtml(unsubscribeUrl.href)}">Unsubscribe</a></p></main>`,
    text: `${publication.title}\n${publication.url}\n\nUnsubscribe: ${unsubscribeUrl.href}`,
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl.href}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    idempotencyKey: `publication/${publication.contentId}/${publication.versionHash}/${subscriber.subscriberId}`,
  };
}
