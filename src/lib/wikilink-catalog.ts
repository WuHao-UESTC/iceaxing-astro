import type { ContentTreePayload } from './content-tree/types';
import type { Locale } from '../i18n/config';
import type { WikiLinkTarget } from './wikilinks';

const cache = new Map<
  string,
  { expiresAt: number; promise: Promise<WikiLinkTarget[]>; targets?: WikiLinkTarget[] }
>();
const editorBranch = () =>
  typeof window === 'undefined'
    ? ''
    : (window.location.pathname.match(/\/branch\/([^/]+)/)?.[1] ?? '');

export function currentWikiTargets() {
  return cache.get(editorBranch())?.targets ?? [];
}

export function editorWikiLocale(): Locale {
  const collection = typeof window === 'undefined' ? '' : window.location.pathname;
  return /(?:articles|logs|pages)En\b/.test(collection)
    ? 'en'
    : /(?:articles|logs|pages)De\b/.test(collection)
      ? 'de'
      : 'zh';
}

export function loadWikiTargets(): Promise<WikiLinkTarget[]> {
  const branch = editorBranch();
  const cached = cache.get(branch);
  if (cached && Date.now() < cached.expiresAt) return cached.promise;
  const url = new URL('/api/keystatic-tree', window.location.origin);
  if (branch) url.searchParams.set('branch', decodeURIComponent(branch));
  const promise = fetch(url, { headers: { Accept: 'application/json' } })
    .then(async (response) => {
      const data = (await response.json()) as ContentTreePayload & { error?: string };
      if (!response.ok) throw new Error(data.error || '无法读取文章列表');
      const targets = [...data.articles, ...data.documents].flatMap((article) =>
        article.versions.map((version): WikiLinkTarget => ({
          id: version.contentId,
          title: version.title,
          locale: version.locale,
          status: version.status,
          kind: version.editorCollection.startsWith('logs')
            ? 'log'
            : version.editorCollection.startsWith('pages')
              ? 'page'
              : 'article',
        })),
      );
      const cached = cache.get(branch);
      if (cached) cached.targets = targets;
      return targets;
    })
    .catch((error) => {
      cache.delete(branch);
      throw error;
    });
  cache.set(branch, { expiresAt: Date.now() + 10_000, promise });
  return promise;
}
