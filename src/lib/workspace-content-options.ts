import type { ContentTreePayload } from './content-tree/types';

const requests = new Map<string, { expires: number; promise: Promise<ContentTreePayload> }>();
export function workspaceBranch(pathname: string) {
  const branch = pathname.match(/^\/keystatic\/branch\/([^/]+)/)?.[1];
  return branch ? decodeURIComponent(branch) : '';
}
export function loadWorkspaceOptions(branch: string, force = false) {
  const cached = requests.get(branch);
  if (!force && cached && cached.expires > Date.now()) return cached.promise;
  const url = new URL('/api/keystatic-tree', window.location.origin);
  if (branch) url.searchParams.set('branch', branch);
  const promise = fetch(url, { headers: { Accept: 'application/json' } }).then(async (response) => {
    if (!response.ok) throw new Error('暂时无法加载内容名称，请重新聚焦以重试。');
    return response.json() as Promise<ContentTreePayload>;
  });
  requests.set(branch, { expires: Date.now() + 5000, promise });
  void promise.catch(() => {
    if (requests.get(branch)?.promise === promise) requests.delete(branch);
  });
  return promise;
}
