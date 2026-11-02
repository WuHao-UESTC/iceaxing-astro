import type { ArticleCover } from './article-cover';

export type FolderGroup = 'skill' | 'study' | 'life';
export type FolderTheme = FolderGroup | 'camp';

/** Folder covers are editorial choices; do not silently borrow a child's cover. */
export function resolveFolderCover(
  cover: ArticleCover | undefined,
  group: FolderTheme,
): ArticleCover {
  return cover || `/media/folders/${group}.svg`;
}

export function folderThemeForScene(scene: string): FolderTheme {
  return scene === 'camp'
    ? 'camp'
    : scene === 'study'
      ? 'study'
      : scene === 'field'
        ? 'life'
        : 'skill';
}
