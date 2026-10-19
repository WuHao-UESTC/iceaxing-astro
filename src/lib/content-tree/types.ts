export type ContentLocale = 'zh' | 'en' | 'de';

export type FolderKind = 'category' | 'project' | 'collection';

export type FolderNode = {
  key: string;
  kind: FolderKind;
  id: string;
  label: string;
  parentKey: string | null;
  order: number;
  editorCollection: 'categories' | 'projects' | 'series';
};

export type ArticleVersion = {
  locale: ContentLocale;
  contentId: string;
  title: string;
  status: string;
  editorCollection: 'articlesZh' | 'articlesEn' | 'articlesDe';
};

export type ArticleNode = {
  key: string;
  kind: 'article';
  translationKey: string;
  label: string;
  parentKey: string | null;
  order: number;
  versions: ArticleVersion[];
  hasInconsistentParent: boolean;
};

export type ContentTreePayload = {
  storageKind: 'local' | 'github';
  branch: string | null;
  folders: FolderNode[];
  articles: ArticleNode[];
  warnings: string[];
};

export type RawFolderEntry = {
  kind: FolderKind;
  id: string;
  parentId?: string | null;
  label: string;
  order?: number;
};

export type RawArticleEntry = {
  locale: ContentLocale;
  contentId: string;
  translationKey: string;
  title: string;
  status: string;
  order?: number;
  category?: string | null;
  project?: string | null;
  collection?: string | null;
};

export type ContentSnapshot = {
  folders: RawFolderEntry[];
  articles: RawArticleEntry[];
};

export type CascadeDeletionPlan = {
  root: { kind: FolderKind; id: string; label: string };
  folders: RawFolderEntry[];
  articles: RawArticleEntry[];
  paths: string[];
};
