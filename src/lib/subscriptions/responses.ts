import { htmlLanguage, localizedPath, type Locale } from '../../i18n/config';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function localizedMessage(locale: Locale, messages: Record<Locale, string>) {
  return messages[locale];
}

export function htmlStatusPage(locale: Locale, title: string, message: string, status = 200) {
  const home = localizedPath(locale);
  return new Response(
    `<!doctype html><html lang="${htmlLanguage[locale]}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex, nofollow"><title>${escapeHtml(title)} · iceaxing</title><style>body{margin:0;background:#f4f1e8;color:#163832;font-family:system-ui,sans-serif}.card{width:min(90%,38rem);margin:12vh auto;padding:clamp(2rem,6vw,4rem);border:1px solid #b9c6bc;background:#fff;border-radius:1rem;box-sizing:border-box}h1{font-family:Georgia,serif;font-size:clamp(2rem,7vw,4rem);margin:0 0 1rem}p{line-height:1.7;color:#52645f}a{display:inline-block;margin-top:1rem;color:#176b61;font-weight:700}</style></head><body><main class="card"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><a href="${home}">${locale === 'zh' ? '返回首页' : locale === 'de' ? 'Zur Startseite' : 'Back home'}</a></main></body></html>`,
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  );
}

export function htmlConfirmationPage(locale: Locale, token: string) {
  const copy = {
    zh: {
      title: '确认你的订阅',
      message: '点击下面的按钮完成订阅。此步骤可以防止邮件安全扫描器误用确认链接。',
      action: '确认订阅',
    },
    en: {
      title: 'Confirm your subscription',
      message:
        'Use the button below to finish subscribing. This step prevents email security scanners from consuming the confirmation link.',
      action: 'Confirm subscription',
    },
    de: {
      title: 'Abonnement bestätigen',
      message:
        'Bestätige dein Abonnement über die folgende Schaltfläche. Dieser Schritt verhindert, dass E-Mail-Sicherheitsscanner den Bestätigungslink verbrauchen.',
      action: 'Abonnement bestätigen',
    },
  }[locale];

  return new Response(
    `<!doctype html><html lang="${htmlLanguage[locale]}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex, nofollow"><title>${escapeHtml(copy.title)} · iceaxing</title><style>body{margin:0;background:#f4f1e8;color:#163832;font-family:system-ui,sans-serif}.card{width:min(90%,38rem);margin:12vh auto;padding:clamp(2rem,6vw,4rem);border:1px solid #b9c6bc;background:#fff;border-radius:1rem;box-sizing:border-box}h1{font-family:Georgia,serif;font-size:clamp(2rem,7vw,4rem);margin:0 0 1rem}p{line-height:1.7;color:#52645f}button{margin-top:1rem;border:0;border-radius:.5rem;background:#176b61;color:#fff;font:inherit;font-weight:700;padding:.8rem 1.1rem;cursor:pointer}</style></head><body><main class="card"><h1>${escapeHtml(copy.title)}</h1><p>${escapeHtml(copy.message)}</p><form method="post" action="/api/confirm-subscription"><input type="hidden" name="token" value="${escapeHtml(token)}"><input type="hidden" name="locale" value="${locale}"><button type="submit">${escapeHtml(copy.action)}</button></form></main></body></html>`,
    {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  );
}

export function wantsHtml(request: Request) {
  return request.headers.get('accept')?.includes('text/html') ?? false;
}
