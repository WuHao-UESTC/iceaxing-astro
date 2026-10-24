import { loadWorkspaceOptions, workspaceBranch } from './workspace-content-options';
import type { ContentTreePayload } from './content-tree/types';

export type WorkspaceEditorLocation = { label: string; id: string; parents: string[] };
export function attachWorkspaceNames(
  document: Document,
  onChange?: (location: WorkspaceEditorLocation | null) => void,
) {
  const win = document.defaultView!;
  let tree: ContentTreePayload | null = null;
  let signature = '';
  let disposed = false;
  let branch = workspaceBranch(win.location.pathname);
  const update = () => {
    const currentBranch = workspaceBranch(win.location.pathname);
    if (currentBranch !== branch) {
      branch = currentBranch;
      tree = null;
      load();
    }
    if (!tree || disposed) return;
    const match = win.location.pathname.match(/\/collection\/([^/]+)\/item\/([^/]+)/);
    let location: WorkspaceEditorLocation | null = null;
    if (match) {
      const [, collection, encoded] = match;
      const id = decodeURIComponent(encoded!);
      const folder = tree.folders.find(
        (folder) => folder.editorCollection === collection && folder.id === id,
      );
      const article = [...tree.articles, ...tree.documents].find((article) =>
        article.versions.some(
          (version) => version.editorCollection === collection && version.contentId === id,
        ),
      );
      const version = article?.versions.find(
        (version) => version.editorCollection === collection && version.contentId === id,
      );
      if (folder || article) {
        const parents: string[] = [];
        let parent = tree.folders.find(
          (item) => item.key === (folder?.parentKey ?? article?.parentKey),
        );
        const visited = new Set<string>();
        while (parent && !visited.has(parent.key)) {
          visited.add(parent.key);
          parents.unshift(parent.label);
          const key = parent.parentKey;
          parent = tree.folders.find((item) => item.key === key);
        }
        const labels = Array.from(
          document.querySelectorAll<HTMLLabelElement>('[data-ws-metadata] label[for]'),
        );
        const titleLabel = labels.find((label) =>
          ['标题', '中文标题'].includes((label.textContent ?? '').replace(/\*/g, '').trim()),
        );
        const liveTitle = titleLabel
          ? (document.getElementById(titleLabel.htmlFor) as HTMLInputElement | null)?.value.trim()
          : '';
        location = {
          label: liveTitle || folder?.label || version?.title || article!.label,
          id,
          parents,
        };
        const last = document.querySelector('header nav li:last-child');
        if (last) {
          const target = Array.from(last.querySelectorAll<HTMLElement>('*'))
            .reverse()
            .find((element) => element.textContent?.trim() === id);
          if (target) {
            target.dataset.wsReadableName = location.label;
            target.title = `${location.label} · ${id}`;
            target.setAttribute('aria-label', location.label);
          }
        }
      }
    }
    const next = JSON.stringify(location);
    if (!location) {
      for (const element of document.querySelectorAll<HTMLElement>('[data-ws-readable-name]')) {
        delete element.dataset.wsReadableName;
        element.removeAttribute('aria-label');
        element.title = element.textContent?.trim() ?? '';
      }
    }
    if (next !== signature) {
      signature = next;
      onChange?.(location);
    }
  };
  const load = (force = false) => {
    const requestedBranch = workspaceBranch(win.location.pathname);
    void loadWorkspaceOptions(requestedBranch, force)
      .then((result) => {
        if (!disposed && requestedBranch === workspaceBranch(win.location.pathname)) {
          tree = result;
          update();
        }
      })
      .catch(() => {
        /* Native IDs remain usable while names are unavailable. */
      });
  };
  const onInput = () => update();
  const onSubmit = () => {
    win.setTimeout(() => {
      if (!disposed) load(true);
    }, 1600);
  };
  document.addEventListener('input', onInput);
  document.addEventListener('submit', onSubmit);
  load();
  return {
    update,
    cleanup() {
      disposed = true;
      document.removeEventListener('input', onInput);
      document.removeEventListener('submit', onSubmit);
    },
  };
}
