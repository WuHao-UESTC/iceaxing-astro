/** Classify flat Keystatic fields without moving React-managed controls. */
export function decorateFolderForm(root: HTMLElement, pathname: string) {
  const collection = pathname.match(/\/collection\/(categories|projects|series)\//)?.[1];
  if (!collection) return;
  root.dataset.wsFolderForm = collection;
  const text = (element: Element) => (element.textContent ?? '').replace(/\*/g, '').trim();
  const entries = Array.from(root.children).filter(
    (entry): entry is HTMLElement =>
      entry.nodeType === 1 &&
      !entry.hasAttribute('data-ws-guide') &&
      !entry.hasAttribute('data-ws-folder-divider'),
  );
  const property = (entry: HTMLElement) => {
    if (entry.querySelector('[data-ws-canonical-id]')) return 'id';
    if (entry.hasAttribute('data-ws-localized')) return 'languages';
    if (entry.querySelector('[data-ws-tags]')) return 'tags';
    if (entry.matches('[data-ws-checkbox]') || entry.querySelector('[data-ws-checkbox]'))
      return 'featured';
    if (entry.querySelector('[data-ws-progress]')) return 'progress';
    const labels = Array.from(entry.querySelectorAll('[data-ws-label], label')).map(text);
    return (
      [
        ['URL slug', 'slug'],
        ['首页板块', 'parent'],
        ['所属分类', 'parent'],
        ['所属项目', 'parent'],
        ['发布状态', 'publication'],
        ['发布时间', 'published'],
        ['排序', 'order'],
        ['创建时间', 'created'],
        ['状态', 'status'],
        ['图标键', 'icon'],
        ['封面图', 'cover'],
      ] as const
    ).find(([label]) => labels.includes(label))?.[1];
  };
  const groups: Record<string, string> = {
    id: 'basic',
    parent: 'basic',
    languages: 'languages',
    tags: 'settings',
    featured: 'settings',
    order: 'settings',
    created: 'settings',
    status: 'settings',
    publication: 'settings',
    published: 'settings',
    progress: 'settings',
    icon: 'media',
    cover: 'media',
  };
  for (const entry of entries) {
    const key = property(entry);
    if (!key) continue;
    entry.dataset.wsFolderField = key;
    if (key === 'languages') {
      entry.style.order = '20';
      for (const label of entry.querySelectorAll<HTMLLabelElement>('label[for]')) {
        const original = text(label);
        const caption = (
          { 中文标题: '标题', 'English title': 'Title', 'Deutscher Titel': 'Titel' } as Record<
            string,
            string
          >
        )[original];
        if (caption) {
          label.dataset.wsShortCaption = `${caption}：`;
          label.closest('[data-ws-field]')?.setAttribute('data-ws-inline-title', 'true');
        } else if (
          ['中文简介', 'English description', 'Deutsche Beschreibung'].includes(original)
        ) {
          label.dataset.wsNotebookLabel = 'true';
        }
      }
    }
    if (key !== 'languages')
      entry.style.order = String(
        (
          {
            id: 1,
            parent: 2,
            slug: 3,
            tags: 31,
            publication: 32,
            featured: 33,
            order: 34,
            created: 35,
            published: 36,
            status: 37,
            progress: 38,
            icon: 41,
            cover: 42,
          } as Record<string, number>
        )[key] ?? 43,
      );
    if (key === 'featured') {
      const label = entry.querySelector('[data-ws-checkbox] [class~="kui:Text"]');
      label?.setAttribute('data-ws-short-caption', '卡片精选：');
    }
  }
  // Section dividers are added beside the fields, preserving their inputs and focus.
  for (const [index, [group, title]] of Object.entries({
    basic: '基本信息',
    languages: '多语言信息',
    settings: '标签与设置',
    media: '图片信息',
  }).entries()) {
    const first = entries.find((entry) => groups[entry.dataset.wsFolderField ?? ''] === group);
    if (!first || root.querySelector(`:scope > [data-ws-folder-divider="${group}"]`)) continue;
    const heading = root.ownerDocument.createElement('h2');
    heading.style.order = String(
      ({ basic: 0, languages: 10, settings: 30, media: 40 } as Record<string, number>)[group],
    );
    heading.dataset.wsFolderDivider = group;
    const number = root.ownerDocument.createElement('span');
    number.textContent = `0${index + 1}`;
    heading.append(number, root.ownerDocument.createTextNode(title));
    root.insertBefore(heading, first);
  }
  root.querySelector<HTMLElement>('[data-ws-guide]')?.style.setProperty('order', '50');
  const scheduled =
    root.querySelector<HTMLSelectElement>('[data-ws-publication] select')?.value === 'scheduled';
  root
    .querySelector<HTMLElement>('[data-ws-folder-field="published"]')
    ?.setAttribute('data-ws-publish-time-hidden', String(!scheduled));
}
