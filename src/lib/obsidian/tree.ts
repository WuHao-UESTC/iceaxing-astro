import type { ExportArticle } from './markdown';

export type ExportFolder = {
  kind: 'categories' | 'projects' | 'collections';
  id: string;
  metadata: Record<string, unknown>;
};

export const exportRoot = 'iceaxing-astro';

// Keep names portable across Windows, macOS and Obsidian wiki links.
export function exportName(value: string, fallback: string) {
  const name = value
    .normalize('NFC')
    .replace(/[<>:"/\\|?*[\]#^]/g, '-')
    .replace(/\p{Cc}/gu, '-')
    .replace(/[. ]+$/g, '')
    .trim()
    .slice(0, 80)
    .replace(/[. ]+$/g, '');
  return !name ||
    /^\.+$/.test(name) ||
    /^(?:__proto__|constructor|prototype)$/i.test(name) ||
    /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(name)
    ? `_${fallback}`
    : name;
}

export function assignExportTree(
  articles: ExportArticle[],
  folders: ExportFolder[],
  warnings: string[],
) {
  const directories = new Set<string>();
  const used = new Set<string>();
  const paths = new Map<string, string>();
  const byKey = new Map(folders.map((folder) => [`${folder.kind}:${folder.id}`, folder]));
  const reserve = (parent: string, label: string, id: string, extension = '') => {
    const name = exportName(label, id);
    let candidate = `${parent}/${name}${extension}`;
    let suffix = 0;
    while (used.has(candidate.toLowerCase())) {
      candidate = `${parent}/${name} (${id}${suffix ? `-${suffix}` : ''})${extension}`;
      suffix++;
    }
    used.add(candidate.toLowerCase());
    return candidate;
  };
  const folderPath = (folder: ExportFolder, locale: string): string | null => {
    const key = `${locale}:${folder.kind}:${folder.id}`;
    if (paths.has(key)) return paths.get(key)!;
    let parent: string;
    if (folder.kind === 'categories') {
      const groups: Record<string, string> = {
        skill: '技术栈',
        study: '学习笔记',
        life: '生活日常',
      };
      const group = groups[String(folder.metadata.group ?? 'skill')];
      if (!group) return null;
      parent = `${locale}/${group}`;
    } else {
      const kind = folder.kind === 'projects' ? 'categories' : 'projects';
      const relationship = folder.kind === 'projects' ? 'category' : 'project';
      const ancestor = byKey.get(`${kind}:${folder.metadata[relationship]}`);
      const resolved = ancestor && folderPath(ancestor, locale);
      if (!resolved) return null;
      parent = resolved;
    }
    const labels = folder.metadata.labels as Record<string, { title?: string }> | undefined;
    const label = labels?.[locale]?.title || labels?.zh?.title || folder.id;
    const result = reserve(parent, label, folder.id);
    paths.set(key, result);
    directories.add(parent);
    directories.add(result);
    return result;
  };
  const ordered = [...folders].sort((a, b) => a.id.localeCompare(b.id, 'en'));
  for (const locale of ['zh', 'en', 'de']) {
    for (const folder of ordered) {
      if (!folderPath(folder, locale))
        warnings.push(`${locale}/${folder.id}：层级归属无效，未创建文件夹。`);
    }
  }
  for (const article of [...articles].sort((a, b) => a.source.localeCompare(b.source, 'en'))) {
    const m = article.metadata;
    const key = m.collection
      ? `collections:${m.collection}`
      : m.project
        ? `projects:${m.project}`
        : m.category
          ? `categories:${m.category}`
          : null;
    const folder = key ? byKey.get(key) : undefined;
    let parent = folder ? folderPath(folder, article.locale) : null;
    if (!parent) {
      parent = `${article.locale}/未归类`;
      if (key) warnings.push(`${article.id}：层级归属无效，已导出至“未归类”。`);
    }
    directories.add(parent);
    article.notePath = reserve(parent, article.title, article.id, '.md');
  }
  return [...directories].sort();
}
