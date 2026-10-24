export type ContentLocale = 'zh' | 'en' | 'de';

export type FolderKind = 'category' | 'project' | 'collection';
export type CategoryGroup = 'skill' | 'life' | 'study';
export type WorkspaceGroup = CategoryGroup | 'documents' | 'unassigned';

export type FolderNode = {
  key: string;
  kind: FolderKind;
  id: string;
  label: string;
  parentKey: string | null;
  order: number;
  editorCollection: 'categories' | 'projects' | 'series';
  group?: CategoryGroup;
  publicationStatus?: string;
  publishedAt?: string;
  isPublic?: boolean;
  blockedBy?: string;
};

export type ArticleVersion = {
  locale: ContentLocale;
  contentId: string;
  title: string;
  status: string;
  editorCollection:
    | 'articlesZh'
    | 'articlesEn'
    | 'articlesDe'
    | 'logsZh'
    | 'logsEn'
    | 'logsDe'
    | 'pagesZh'
    | 'pagesEn'
    | 'pagesDe';
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
  documents: ArticleNode[];
  warnings: string[];
};

export type RawFolderEntry = {
  kind: FolderKind;
  id: string;
  parentId?: string | null;
  label: string;
  order?: number;
  group?: CategoryGroup;
  publicationStatus?: string;
  publishedAt?: string;
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
  documents?: (RawArticleEntry & { contentType: 'logs' | 'pages' })[];
};

export type CascadeDeletionPlan = {
  root: { kind: FolderKind; id: string; label: string };
  folders: RawFolderEntry[];
  articles: RawArticleEntry[];
  paths: string[];
};
