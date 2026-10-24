/** Arrange article metadata without moving React-owned fields. */
export function decorateArticleForm(root: HTMLElement, pathname: string) {
  if (!/\/collection\/articles(?:Zh|En|De)\//.test(pathname)) return;
  root.dataset.wsArticleForm = 'true';
  const text = (element: Element) => (element.textContent ?? '').replace(/\*/g, '').trim();
  const fields: Record<string, [string, number]> = {
    '稳定内容 ID': ['id', 1],
    '翻译组 ID': ['linked', 2],
    'URL slug': ['linked', 3],
    标题: ['title', 11],
    摘要: ['excerpt', 12],
    语言: ['locale', 21],
    状态: ['status', 22],
    发布时间: ['published', 23],
    更新时间: ['updated', 24],
    标签: ['tags', 25],
    作者: ['author', 26],
    首页列表精选: ['featured', 27],
    直属分类: ['category', 31],
    所属项目: ['project', 32],
    所属合集: ['collection', 33],
    排序: ['order', 28],
    封面图: ['cover', 42],
    'SEO 覆盖（可选）': ['seo', 51],
  };
  for (const entry of Array.from(root.children)) {
    if (!(entry instanceof root.ownerDocument.defaultView!.HTMLElement)) continue;
    if (entry.matches('[data-ws-guide], [data-ws-article-divider]')) continue;
    if (entry.hasAttribute('data-ws-compact-body')) {
      entry.style.order = '70';
      continue;
    }
    const labels = Array.from(entry.querySelectorAll('[data-ws-label], label')).map(text);
    if (entry.querySelector('[data-ws-tags]')) labels.unshift('标签');
    const checkbox = entry.matches('[data-ws-checkbox]')
      ? entry
      : entry.querySelector('[data-ws-checkbox]');
    if (checkbox) {
      const caption = checkbox.querySelector('[class~="kui:Text"]');
      if (caption) labels.unshift(text(caption));
    }
    const match = labels.map((label) => fields[label]).find(Boolean);
    if (!match) continue;
    const [key, order] = match;
    entry.dataset.wsArticleField = key;
    entry.style.order = String(order);
    if (key === 'title') {
      const label = entry.querySelector('[data-ws-label]');
      label?.setAttribute('data-ws-short-caption', '标题：');
    }
    if (key === 'excerpt') {
      entry.querySelector('[data-ws-label]')?.setAttribute('data-ws-notebook-label', 'true');
      entry.querySelector('textarea')?.setAttribute('data-ws-notebook', 'true');
    }
  }
  for (const [index, title] of [
    '基本信息',
    '标题与摘要',
    '发布设置',
    '归属信息',
    '图片信息',
    'SEO 设置',
  ].entries()) {
    if (root.querySelector(`[data-ws-article-divider="${index}"]`)) continue;
    const heading = root.ownerDocument.createElement('h2');
    heading.dataset.wsArticleDivider = String(index);
    heading.style.order = String(index * 10);
    const number = root.ownerDocument.createElement('span');
    number.textContent = `0${index + 1}`;
    heading.append(number, root.ownerDocument.createTextNode(title));
    root.append(heading);
  }
  root.querySelector<HTMLElement>('[data-ws-guide]')?.style.setProperty('order', '80');
}
