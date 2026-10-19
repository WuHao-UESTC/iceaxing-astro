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
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

export function wantsHtml(request: Request) {
  return request.headers.get('accept')?.includes('text/html') ?? false;
}
