import { byOrder, getContentIndex, isPublicContent, localizedLabel, routeFor } from './content';
import { localizedPath, type Locale } from '../i18n/config';
import { searchableBody, type SearchDocument } from './search';

export async function publicSearchDocuments(locale: Locale): Promise<SearchDocument[]> {
  const index = await getContentIndex();
  const documents: SearchDocument[] = [];
  for (const type of ['article', 'log', 'page'] as const) {
    const entries = type === 'article' ? index.articles : type === 'log' ? index.logs : index.pages;
    for (const entry of entries) {
      if (entry.data.locale !== locale || !isPublicContent(entry.data)) continue;
      const url = routeFor(entry.data.contentId, locale, type);
      if (!url) continue;
      const projectId = 'project' in entry.data ? entry.data.project : undefined;
      const project = index.projects.find((item) => item.data.projectId === projectId);
      const directCategory = 'category' in entry.data ? entry.data.category : undefined;
      documents.push({
        url,
        type,
        title: entry.data.title,
        description: entry.data.excerpt,
        body: searchableBody(entry.body ?? ''),
        tags: 'tags' in entry.data ? entry.data.tags : [],
        category: project?.data.category ?? directCategory ?? undefined,
      });
    }
  }
  for (const category of byOrder(index.categories)) {
    const url = routeFor(category.data.categoryId, locale, 'category');
    if (url)
      documents.push({
        url,
        type: 'category',
        ...localizedLabel(category, locale),
        category: category.data.categoryId,
        tags: category.data.tags,
      });
  }
  for (const project of byOrder(index.projects)) {
    const url = routeFor(project.data.projectId, locale, 'project');
    if (url)
      documents.push({
        url,
        type: 'project',
        ...localizedLabel(project, locale),
        category: project.data.category,
        tags: project.data.tags,
      });
  }
  for (const collection of byOrder(index.series)) {
    const url = routeFor(collection.data.collectionId, locale, 'collection');
    const project = index.projects.find((item) => item.data.projectId === collection.data.project);
    if (url)
      documents.push({
        url,
        type: 'collection',
        ...localizedLabel(collection, locale),
        category: project?.data.category,
        tags: collection.data.tags,
      });
  }
  const tools =
    locale === 'zh'
      ? [
          [
            '/tools/smith-chart',
            '史密斯圆图',
            'Smith Chart 射频阻抗匹配、反射系数与传输线计算工具。',
          ],
          ['/tools/pomodoro', '番茄钟', 'Pomodoro 专注计时、休息与循环统计。'],
        ]
      : locale === 'de'
        ? [
            [
              '/tools/smith-chart',
              'Smith-Diagramm',
              'Smith Chart für Impedanzanpassung und Reflexionskoeffizienten.',
            ],
            ['/tools/pomodoro', 'Pomodoro-Timer', 'Fokus, Pausen und Pomodoro-Zyklen.'],
          ]
        : [
            [
              '/tools/smith-chart',
              'Smith chart',
              'RF impedance matching, reflection coefficients and transmission lines.',
            ],
            ['/tools/pomodoro', 'Pomodoro timer', 'Focus sessions, breaks and Pomodoro cycles.'],
          ];
  tools.forEach(([path, title, description]) =>
    documents.push({
      url: localizedPath(locale, path),
      title: title!,
      description: description!,
      type: 'page',
    }),
  );
  return documents;
}
