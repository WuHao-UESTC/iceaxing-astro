import type { WorkspaceGroup } from './content-tree/types';

export function syncWorkspaceTheme(
  document: Document,
  group: WorkspaceGroup,
  mode: 'light' | 'dark',
) {
  document.documentElement.dataset.workspaceGroup = group;
  document.documentElement.dataset.workspaceMode = mode;
  document.documentElement.style.colorScheme = mode;
}
