/** Collapsible sections keep every React-managed field mounted and in place. */
export function attachWorkspaceSections(document: Document) {
  const win = document.defaultView!;
  let preferences: Record<string, boolean> = {};
  try {
    const stored = JSON.parse(win.localStorage.getItem('iceaxing-workspace-sections') ?? '{}');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) preferences = stored;
  } catch {
    /* Optional preferences. */
  }
  const headings = new Map<HTMLElement, HTMLButtonElement>();
  const fields = new Set<HTMLElement>();
  let nextId = 0;
  const persist = () => {
    try {
      win.localStorage.setItem('iceaxing-workspace-sections', JSON.stringify(preferences));
    } catch {
      /* Optional storage. */
    }
  };
  const decorate = (root: HTMLElement) => {
    const collection =
      win.location.pathname
        .match(/\/collection\/([^/]+)/)?.[1]
        ?.replace(/^articles(?:Zh|En|De)$/, 'articles') ?? 'other';
    const entries = Array.from(root.children)
      .filter((entry): entry is HTMLElement => entry instanceof win.HTMLElement)
      .sort((a, b) => Number(a.style.order || 0) - Number(b.style.order || 0));
    let heading: HTMLElement | null = null;
    let members: HTMLElement[] = [];
    const apply = () => {
      if (!heading) return;
      const key = `${collection}:${heading.dataset.wsArticleDivider ?? heading.dataset.wsFolderDivider}`;
      if (
        preferences[key] &&
        members.some((entry) => entry.querySelector('[aria-invalid="true"], [role="alert"]'))
      ) {
        preferences[key] = false;
        persist();
      }
      const collapsed = preferences[key] === true;
      let button = headings.get(heading);
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.dataset.wsSectionToggle = 'true';
        button.append(...Array.from(heading.childNodes));
        heading.append(button);
        headings.set(heading, button);
        button.addEventListener('click', () => {
          preferences[key] = button!.getAttribute('aria-expanded') === 'true';
          persist();
          decorate(root);
        });
      }
      const ids: string[] = [];
      for (const member of members) {
        if (!member.id) member.id = `ws-section-field-${++nextId}`;
        ids.push(member.id);
        member.dataset.wsSectionCollapsed = String(collapsed);
        member.inert = collapsed;
        fields.add(member);
      }
      button.setAttribute('aria-expanded', String(!collapsed));
      button.setAttribute('aria-controls', ids.join(' '));
      heading.dataset.wsSectionState = collapsed ? 'closed' : 'open';
    };
    for (const entry of entries) {
      if (entry.matches('[data-ws-article-divider], [data-ws-folder-divider]')) {
        apply();
        heading = entry;
        members = [];
      } else if (heading && !entry.matches('[data-ws-guide], [data-ws-compact-body]'))
        members.push(entry);
    }
    apply();
  };
  return {
    decorate,
    cleanup() {
      for (const field of fields) {
        field.inert = false;
        delete field.dataset.wsSectionCollapsed;
      }
      for (const [heading, button] of headings) {
        button.replaceWith(...Array.from(button.childNodes));
        delete heading.dataset.wsSectionState;
      }
    },
  };
}
