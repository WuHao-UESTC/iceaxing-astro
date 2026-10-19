import { describe, expect, it } from 'vitest';

import { buildContentTree, planCascadeDeletion } from './model';
import type { ContentSnapshot } from './types';

const snapshot: ContentSnapshot = {
  folders: [
    { kind: 'category', id: 'engineering', label: '工程', order: 1 },
    {
      kind: 'project',
      id: 'chip',
      parentId: 'engineering',
      label: '芯片',
      order: 2,
    },
    {
      kind: 'collection',
      id: 'layout',
      parentId: 'chip',
      label: '版图',
      order: 3,
    },
  ],
  articles: [
    {
      locale: 'zh',
      contentId: 'layout-zh',
      translationKey: 'layout-guide',
      title: '版图指南',
      status: 'published',
      project: 'chip',
      collection: 'layout',
    },
    {
      locale: 'en',
      contentId: 'layout-en',
      translationKey: 'layout-guide',
      title: 'Layout guide',
      status: 'draft',
      project: 'chip',
      collection: 'layout',
    },
    {
      locale: 'zh',
      contentId: 'category-note',
      translationKey: 'category-note',
      title: '分类直属文章',
      status: 'draft',
      category: 'engineering',
    },
  ],
};

describe('content tree model', () => {
  it('groups translations into one article node', () => {
    const tree = buildContentTree(snapshot, 'local', null);
    const article = tree.articles.find((entry) => entry.translationKey === 'layout-guide');

    expect(article?.parentKey).toBe('collection:layout');
    expect(article?.versions.map((entry) => entry.locale)).toEqual(['zh', 'en']);
    expect(article?.label).toBe('版图指南');
  });

  it('plans a complete category cascade without deleting shared asset directories', () => {
    const withSharedId: ContentSnapshot = {
      folders: [
        ...snapshot.folders,
        { kind: 'category', id: 'layout-zh', label: '同名但保留的分类' },
      ],
      articles: snapshot.articles,
    };
    const plan = planCascadeDeletion(withSharedId, 'category', 'engineering');

    expect(plan?.folders).toHaveLength(3);
    expect(plan?.articles).toHaveLength(3);
    expect(plan?.paths).toContain('src/content/articles/zh/layout-zh');
    expect(plan?.paths).not.toContain('src/assets/content/covers/layout-zh');
    expect(plan?.paths).toContain('src/assets/content/body/layout-zh');
  });
});
