import { describe, expect, it } from 'vitest';
import { folderIsPublic, publicationIsPublic } from './publication';
import { buildContentTree } from './content-tree/model';
describe('folder publication hierarchy', () => {
  it('preserves legacy visibility and only releases scheduled entries after their date', () => {
    expect(folderIsPublic({})).toBe(true);
    expect(publicationIsPublic('draft')).toBe(false);
    expect(publicationIsPublic('archived')).toBe(false);
    expect(publicationIsPublic('scheduled', '2026-01-01', Date.parse('2025-12-31'))).toBe(false);
    expect(publicationIsPublic('scheduled', '2026-01-01', Date.parse('2026-01-02'))).toBe(true);
  });
  it('requires every ancestor to be public, without forcing a draft child to publish', () => {
    const folders = [
      { kind: 'category' as const, id: 'cat', label: '分类', publicationStatus: 'draft' },
      {
        kind: 'project' as const,
        id: 'project',
        label: '项目',
        parentId: 'cat',
        publicationStatus: 'published',
      },
      {
        kind: 'collection' as const,
        id: 'series',
        label: '合集',
        parentId: 'project',
        publicationStatus: 'published',
      },
    ];
    let tree = buildContentTree({ folders, articles: [] }, 'local', null);
    expect(tree.folders.map((folder) => folder.isPublic)).toEqual([false, false, false]);
    expect(tree.folders[2]?.blockedBy).toBe('分类');
    folders[0]!.publicationStatus = 'published';
    folders[2]!.publicationStatus = 'draft';
    tree = buildContentTree({ folders, articles: [] }, 'local', null);
    expect(tree.folders.map((folder) => folder.isPublic)).toEqual([true, true, false]);
  });
});
