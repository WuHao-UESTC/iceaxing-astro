import { describe, expect, it } from 'vitest';

import { buildContentTree, planCascadeDeletion, selectContentGroup } from './model';
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
  it('filters complete descendant trees by the category group and preserves unassigned content', () => {
    const tree = buildContentTree(
      {
        folders: [
          ...snapshot.folders.map((folder) => ({ ...folder, group: 'study' as const })),
          { kind: 'category', id: 'daily', label: '日常', group: 'life' },
          { kind: 'category', id: 'coding', label: '编程' },
          { kind: 'project', id: 'orphan', label: '未归属项目', parentId: 'missing' },
        ],
        articles: [
          ...snapshot.articles,
          {
            locale: 'zh',
            contentId: 'orphan',
            translationKey: 'orphan',
            title: '未归属文章',
            status: 'draft',
          },
        ],
      },
      'local',
      null,
    );
    expect(selectContentGroup(tree, 'study').folders.map((folder) => folder.id)).toEqual([
      'engineering',
      'chip',
      'layout',
    ]);
    expect(selectContentGroup(tree, 'study').articles).toHaveLength(2);
    expect(selectContentGroup(tree, 'life').folders.map((folder) => folder.id)).toEqual(['daily']);
    expect(selectContentGroup(tree, 'life').articles).toEqual([]);
    expect(selectContentGroup(tree, 'skill').folders.map((folder) => folder.id)).toEqual([
      'coding',
    ]);
    expect(selectContentGroup(tree, 'unassigned').folders.map((folder) => folder.id)).toEqual([
      'orphan',
    ]);
    expect(
      selectContentGroup(tree, 'unassigned').articles.map((article) => article.translationKey),
    ).toEqual(['orphan']);
  });

  it('keeps logs and pages separate even when translation keys match, with the correct editor collections', () => {
    const withDocuments: ContentSnapshot = {
      ...snapshot,
      documents: [
        {
          ...snapshot.articles[0]!,
          category: null,
          project: null,
          collection: null,
          contentType: 'logs',
        },
        {
          ...snapshot.articles[1]!,
          category: null,
          project: null,
          collection: null,
          contentType: 'logs',
        },
        {
          ...snapshot.articles[0]!,
          category: null,
          project: null,
          collection: null,
          contentType: 'pages',
        },
      ],
    };
    const tree = buildContentTree(withDocuments, 'github', 'main');
    const documents = selectContentGroup(tree, 'documents').articles;
    expect(documents.map((document) => document.key)).toEqual([
      'logs:layout-guide',
      'pages:layout-guide',
    ]);
    expect(documents.map((document) => document.parentKey)).toEqual([
      'utility:logs',
      'utility:pages',
    ]);
    expect(documents[0]?.versions.map((version) => version.editorCollection)).toEqual([
      'logsZh',
      'logsEn',
    ]);
    expect(documents[1]?.versions[0]?.editorCollection).toBe('pagesZh');
    expect(planCascadeDeletion(withDocuments, 'category', 'engineering')?.articles).toHaveLength(3);
  });

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
