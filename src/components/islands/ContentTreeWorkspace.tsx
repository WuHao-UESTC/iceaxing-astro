import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { selectContentGroup } from '../../lib/content-tree/model';
import type {
  ArticleNode,
  ContentLocale,
  ContentTreePayload,
  FolderKind,
  FolderNode,
  WorkspaceGroup,
} from '../../lib/content-tree/types';

type UtilityFolder = {
  kind: 'utility';
  key: string;
  label: string;
  parentKey: null;
  order: number;
  editorCollection: 'logs' | 'pages';
};
type TreeItem = FolderNode | ArticleNode | UtilityFolder;
const workspaceGroups: { value: WorkspaceGroup; label: string }[] = [
  { value: 'skill', label: '技术栈' },
  { value: 'life', label: '生活日常' },
  { value: 'study', label: '学习笔记' },
  { value: 'documents', label: '日志与页面' },
  { value: 'unassigned', label: '未归属内容' },
];
const utilityFolders: UtilityFolder[] = [
  {
    kind: 'utility',
    key: 'utility:logs',
    label: '日志',
    parentKey: null,
    order: 0,
    editorCollection: 'logs',
  },
  {
    kind: 'utility',
    key: 'utility:pages',
    label: '页面',
    parentKey: null,
    order: 1,
    editorCollection: 'pages',
  },
];
type CreateArticleTarget = Pick<FolderNode, 'kind' | 'id' | 'label' | 'parentKey'> & {
  translationKey?: string;
  missingLocales?: ContentLocale[];
};

type PendingEditorSave = {
  url: string;
  expiresAt: number;
};

const localeLabels: Record<ContentLocale, string> = {
  zh: '中文',
  en: 'English',
  de: 'Deutsch',
};

const folderLabels: Record<FolderKind, string> = {
  category: '分类',
  project: '项目',
  collection: '合集',
};

const childFolderLabels: Partial<Record<FolderKind, string>> = {
  category: '项目',
  project: '合集',
};

function editorBase(payload: ContentTreePayload | null) {
  if (payload?.storageKind === 'github' && payload.branch) {
    return `/keystatic/branch/${encodeURIComponent(payload.branch)}`;
  }
  return '/keystatic';
}

function collectionUrl(base: string, collection: string, slug?: string) {
  const root = `${base}/collection/${encodeURIComponent(collection)}`;
  return slug ? `${root}/item/${encodeURIComponent(slug)}` : root;
}

function queryUrl(url: string, params: Record<string, string | null | undefined>) {
  const result = new URL(url, window.location.origin);
  for (const [key, value] of Object.entries(params)) {
    if (value) result.searchParams.set(key, value);
  }
  return `${result.pathname}${result.search}`;
}

function FolderIcon({ open }: { open: boolean }) {
  return <span aria-hidden="true">{open ? '▾' : '▸'}</span>;
}

function ItemMenu({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <details className="tree-item-menu" onClick={(event) => event.stopPropagation()}>
      <summary aria-label={label}>•••</summary>
      <div className="tree-item-menu-popover">{children}</div>
    </details>
  );
}

export default function ContentTreeWorkspace() {
  const [tree, setTree] = useState<ContentTreePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<WorkspaceGroup>('skill');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedLocale, setSelectedLocale] = useState<ContentLocale>('zh');
  const [editorUrl, setEditorUrl] = useState('/keystatic');
  const [deleteTarget, setDeleteTarget] = useState<FolderNode | null>(null);
  const [createArticleTarget, setCreateArticleTarget] = useState<CreateArticleTarget | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showNativeNavigation, setShowNativeNavigation] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingEditorSaveRef = useRef<PendingEditorSave | null>(null);

  const navigateEditor = useCallback((url: string) => {
    pendingEditorSaveRef.current = null;
    setEditorUrl(url);
  }, []);

  const restoreEditorAfterSave = useCallback(() => {
    const pendingSave = pendingEditorSaveRef.current;
    const frameWindow = iframeRef.current?.contentWindow;
    if (!pendingSave || !frameWindow) return false;
    if (Date.now() >= pendingSave.expiresAt) {
      pendingEditorSaveRef.current = null;
      return false;
    }
    const pathname = frameWindow.location.pathname;
    if (`${pathname}${frameWindow.location.search}` === pendingSave.url) return false;
    if (/^\/keystatic(?:\/branch\/[^/]+)?\/?$/.test(pathname)) {
      frameWindow.location.replace(pendingSave.url);
      return true;
    }
    pendingEditorSaveRef.current = null;
    return false;
  }, []);

  const refreshTree = useCallback(async (branch?: string | null) => {
    setLoading(true);
    setError('');
    try {
      const url = new URL('/api/keystatic-tree', window.location.origin);
      if (branch) url.searchParams.set('branch', branch);
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      const result = (await response.json()) as ContentTreePayload & { error?: string };
      if (!response.ok) throw new Error(result.error || '无法读取内容树。');
      setTree(result);
      setEditorUrl((current) =>
        current === '/keystatic' && result.storageKind === 'github' ? editorBase(result) : current,
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '无法读取内容树。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshTree();
  }, [refreshTree]);

  useEffect(() => {
    const onFocus = () => void refreshTree(tree?.branch);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refreshTree, tree?.branch]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const frame = iframeRef.current;
      if (!frame) return;
      try {
        if (restoreEditorAfterSave()) return;
        const frameWindow = frame.contentWindow;
        const pathname = frameWindow?.location.pathname ?? '';
        const match = pathname.match(/^\/keystatic\/branch\/([^/]+)/);
        const branch = match?.[1] ? decodeURIComponent(match[1]) : null;
        if (branch && branch !== tree?.branch) void refreshTree(branch);
      } catch {
        // The editor is expected to be same-origin. Ignore transient navigation states.
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [refreshTree, restoreEditorAfterSave, tree?.branch]);

  const groupContent = useMemo(
    () => (tree ? selectContentGroup(tree, group) : { folders: [], articles: [] }),
    [tree, group],
  );
  const groupItems = useMemo<TreeItem[]>(
    () => [
      ...(group === 'documents' ? utilityFolders : groupContent.folders),
      ...groupContent.articles,
    ],
    [group, groupContent],
  );

  const itemsByParent = useMemo(() => {
    const map = new Map<string | null, TreeItem[]>();
    for (const item of groupItems) {
      const siblings = map.get(item.parentKey) ?? [];
      siblings.push(item);
      map.set(item.parentKey, siblings);
    }
    for (const siblings of map.values()) {
      siblings.sort((a, b) => {
        if (a.kind === 'article' && b.kind !== 'article') return 1;
        if (a.kind !== 'article' && b.kind === 'article') return -1;
        return a.order - b.order || a.label.localeCompare(b.label, 'zh-CN');
      });
    }
    return map;
  }, [groupItems]);

  const selectedArticle = useMemo(
    () =>
      [...(tree?.articles ?? []), ...(tree?.documents ?? [])].find(
        (article) => article.key === selectedKey,
      ) ?? null,
    [selectedKey, tree],
  );

  const visibleKeys = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery || !tree) return null;
    const allItems = new Map<string, TreeItem>(groupItems.map((item) => [item.key, item]));
    const result = new Set<string>();
    for (const item of allItems.values()) {
      const matches =
        item.label.toLocaleLowerCase().includes(normalizedQuery) ||
        ('id' in item && item.id.toLocaleLowerCase().includes(normalizedQuery)) ||
        ('translationKey' in item &&
          (item.translationKey.toLocaleLowerCase().includes(normalizedQuery) ||
            item.versions.some((version) =>
              version.title.toLocaleLowerCase().includes(normalizedQuery),
            )));
      if (!matches) continue;
      result.add(item.key);
      let parentKey = item.parentKey;
      while (parentKey) {
        result.add(parentKey);
        parentKey = allItems.get(parentKey)?.parentKey ?? null;
      }
    }
    return result;
  }, [query, tree, groupItems]);

  const openFolder = (folder: FolderNode) => {
    if (!tree) return;
    setSelectedKey(folder.key);
    navigateEditor(collectionUrl(editorBase(tree), folder.editorCollection, folder.id));
  };

  const openArticle = (article: ArticleNode, requestedLocale?: ContentLocale) => {
    if (!tree) return;
    const version =
      article.versions.find((entry) => entry.locale === requestedLocale) ??
      article.versions.find((entry) => entry.locale === 'zh') ??
      article.versions[0];
    if (!version) return;
    setSelectedKey(article.key);
    setSelectedLocale(version.locale);
    navigateEditor(collectionUrl(editorBase(tree), version.editorCollection, version.contentId));
  };

  const toggleFolder = (key: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const createFolder = (folder?: FolderNode) => {
    if (!tree) return;
    const base = editorBase(tree);
    if (!folder) {
      navigateEditor(
        queryUrl(`${base}/collection/categories/create`, {
          treeGroup: group === 'skill' || group === 'life' || group === 'study' ? group : null,
        }),
      );
      return;
    }
    if (folder.kind === 'category') {
      navigateEditor(queryUrl(`${base}/collection/projects/create`, { treeCategory: folder.id }));
    } else if (folder.kind === 'project') {
      navigateEditor(queryUrl(`${base}/collection/series/create`, { treeProject: folder.id }));
    }
  };

  const createArticle = (target: CreateArticleTarget, locale: ContentLocale) => {
    if (!tree) return;
    const parentProject =
      target.kind === 'collection'
        ? tree.folders.find((folder) => folder.key === target.parentKey)?.id
        : target.kind === 'project'
          ? target.id
          : null;
    const collection = `articles${locale === 'zh' ? 'Zh' : locale === 'en' ? 'En' : 'De'}`;
    navigateEditor(
      queryUrl(`${editorBase(tree)}/collection/${collection}/create`, {
        treeCategory: target.kind === 'category' ? target.id : null,
        treeProject: parentProject,
        treeCollection: target.kind === 'collection' ? target.id : null,
        treeTranslationKey: target.translationKey,
      }),
    );
    setCreateArticleTarget(null);
  };

  const addTranslation = (article: ArticleNode) => {
    if (!tree || !article.parentKey) return;
    const parent = tree.folders.find((folder) => folder.key === article.parentKey);
    if (!parent) return;
    const existing = new Set(article.versions.map((version) => version.locale));
    setCreateArticleTarget({
      ...parent,
      translationKey: article.translationKey,
      missingLocales: (Object.keys(localeLabels) as ContentLocale[]).filter(
        (locale) => !existing.has(locale),
      ),
    });
  };

  const deleteSummary = useMemo(() => {
    if (!deleteTarget || !tree) return null;
    const folderKeys = new Set([deleteTarget.key]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const folder of tree.folders) {
        if (folder.parentKey && folderKeys.has(folder.parentKey) && !folderKeys.has(folder.key)) {
          folderKeys.add(folder.key);
          changed = true;
        }
      }
    }
    const articles = tree.articles.filter(
      (article) => article.parentKey && folderKeys.has(article.parentKey),
    );
    return {
      folders: folderKeys.size,
      articles: articles.length,
      versions: articles.reduce((sum, article) => sum + article.versions.length, 0),
    };
  }, [deleteTarget, tree]);

  const confirmDelete = async () => {
    if (!deleteTarget || !tree) return;
    setDeleting(true);
    setError('');
    try {
      const response = await fetch('/api/keystatic-tree', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: deleteTarget.kind,
          id: deleteTarget.id,
          confirmation: deleteTarget.id,
          branch: tree.branch,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        deleted?: { folders: number; articleVersions: number };
      };
      if (!response.ok) throw new Error(result.error || '级联删除失败。');
      setNotice(
        `已删除 ${result.deleted?.folders ?? 0} 个文件夹和 ${result.deleted?.articleVersions ?? 0} 个文章语言版本。`,
      );
      setDeleteTarget(null);
      setSelectedKey(null);
      navigateEditor(editorBase(tree));
      iframeRef.current?.contentWindow?.location.reload();
      await refreshTree(tree.branch);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '级联删除失败。');
    } finally {
      setDeleting(false);
    }
  };

  const renderItems = (parentKey: string | null, depth = 0): React.ReactNode => {
    const children = itemsByParent.get(parentKey) ?? [];

    return children.map((item) => {
      if (visibleKeys && !visibleKeys.has(item.key)) return null;
      if (item.kind === 'article') {
        const missingLocales = (Object.keys(localeLabels) as ContentLocale[]).filter(
          (locale) => !item.versions.some((version) => version.locale === locale),
        );
        return (
          <div
            className={`tree-row article-row ${selectedKey === item.key ? 'is-selected' : ''}`}
            key={item.key}
            style={{ '--tree-depth': depth } as React.CSSProperties}
            onClick={() => openArticle(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') openArticle(item);
            }}
          >
            <span className="tree-row-icon" aria-hidden="true">
              ◇
            </span>
            <span className="tree-row-label">
              <span>{item.label}</span>
              <small>{item.translationKey}</small>
            </span>
            <span className="locale-badges" aria-label="可用语言">
              {item.versions.map((version) => (
                <span key={version.locale}>{version.locale.toUpperCase()}</span>
              ))}
            </span>
            {missingLocales.length > 0 && group !== 'documents' && (
              <ItemMenu label={`管理文章 ${item.label}`}>
                <button type="button" onClick={() => addTranslation(item)}>
                  添加翻译
                </button>
              </ItemMenu>
            )}
          </div>
        );
      }

      const isOpen = expanded.has(item.key) || Boolean(visibleKeys);
      if (item.kind === 'utility') {
        return (
          <div className="tree-folder" key={item.key}>
            <div
              className="tree-row folder-row"
              style={{ '--tree-depth': depth } as React.CSSProperties}
            >
              <button
                className="tree-toggle"
                type="button"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? '收起' : '展开'} ${item.label}`}
                onClick={() => toggleFolder(item.key)}
              >
                <FolderIcon open={isOpen} />
              </button>
              <button
                className="tree-folder-select"
                type="button"
                onClick={() => toggleFolder(item.key)}
              >
                <span className="tree-row-icon" aria-hidden="true">
                  ▰
                </span>
                <span className="tree-row-label">
                  <span>{item.label}</span>
                </span>
              </button>
              <ItemMenu label={`管理${item.label}`}>
                {(Object.keys(localeLabels) as ContentLocale[]).map((locale) => (
                  <button
                    type="button"
                    key={locale}
                    onClick={() => {
                      if (!tree) return;
                      const suffix = locale === 'zh' ? 'Zh' : locale === 'en' ? 'En' : 'De';
                      navigateEditor(
                        `${editorBase(tree)}/collection/${item.editorCollection}${suffix}/create`,
                      );
                    }}
                  >
                    新建{item.label} · {localeLabels[locale]}
                  </button>
                ))}
              </ItemMenu>
            </div>
            {isOpen && <div>{renderItems(item.key, depth + 1)}</div>}
          </div>
        );
      }
      return (
        <div className="tree-folder" key={item.key}>
          <div
            className={`tree-row folder-row ${selectedKey === item.key ? 'is-selected' : ''}`}
            style={{ '--tree-depth': depth } as React.CSSProperties}
          >
            <button
              className="tree-toggle"
              type="button"
              aria-label={isOpen ? `收起 ${item.label}` : `展开 ${item.label}`}
              aria-expanded={isOpen}
              onClick={() => toggleFolder(item.key)}
            >
              <FolderIcon open={isOpen} />
            </button>
            <button className="tree-folder-select" type="button" onClick={() => openFolder(item)}>
              <span className="tree-row-icon" aria-hidden="true">
                ▰
              </span>
              <span className="tree-row-label">
                <span>{item.label}</span>
                <small>
                  {folderLabels[item.kind]} · {item.id}
                </small>
              </span>
            </button>
            <ItemMenu label={`管理文件夹 ${item.label}`}>
              <button type="button" onClick={() => openFolder(item)}>
                修改属性
              </button>
              {item.kind !== 'collection' && (
                <button type="button" onClick={() => createFolder(item)}>
                  新建{childFolderLabels[item.kind]}
                </button>
              )}
              <button type="button" onClick={() => setCreateArticleTarget(item)}>
                新建文章
              </button>
              <button className="danger-action" type="button" onClick={() => setDeleteTarget(item)}>
                级联删除
              </button>
            </ItemMenu>
          </div>
          {isOpen && <div>{renderItems(item.key, depth + 1)}</div>}
        </div>
      );
    });
  };

  const switchArticleLocale = (locale: ContentLocale) => {
    if (selectedArticle) openArticle(selectedArticle, locale);
  };

  const applyEditorChrome = useCallback((show: boolean) => {
    const document = iframeRef.current?.contentDocument;
    if (!document) return;
    const styleId = 'iceaxing-tree-workspace-chrome';
    const existing = document.getElementById(styleId);
    if (show) {
      existing?.remove();
      return;
    }
    if (existing) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      [data-split-pane="primary"]:not([data-split-pane] [data-split-pane="primary"]),
      [data-split-view-resize-handle]:not([data-split-pane] [data-split-view-resize-handle]) {
        display: none !important;
      }
      [data-split-pane="secondary"]:not([data-split-pane] [data-split-pane="secondary"]) {
        min-width: 0 !important;
      }
    `;
    document.head.append(style);
  }, []);

  useEffect(() => {
    applyEditorChrome(showNativeNavigation);
  }, [applyEditorChrome, showNativeNavigation]);

  const handleEditorLoad = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    try {
      const pathname = frame.contentWindow?.location.pathname ?? '';
      const match = pathname.match(/^\/keystatic\/branch\/([^/]+)/);
      const activeBranch = match?.[1] ? decodeURIComponent(match[1]) : tree?.branch;
      const document = frame.contentDocument;
      if (document && document.documentElement.dataset.treeWorkspaceBound !== 'true') {
        document.documentElement.dataset.treeWorkspaceBound = 'true';
        const onSubmit = (event: SubmitEvent) => {
          const form = event.target;
          const frameWindow = frame.contentWindow;
          if (
            form === document.getElementById('item-edit-form') &&
            frameWindow &&
            /\/collection\/[^/]+\/item\/[^/]+\/?$/.test(frameWindow.location.pathname)
          ) {
            pendingEditorSaveRef.current = {
              url: `${frameWindow.location.pathname}${frameWindow.location.search}`,
              expiresAt: Date.now() + 30_000,
            };
            for (const delay of [0, 100, 300, 700, 1500, 3000, 7000]) {
              window.setTimeout(restoreEditorAfterSave, delay);
            }
          }
          window.setTimeout(() => void refreshTree(activeBranch), 1600);
        };
        document.addEventListener('submit', onSubmit, { capture: true });
      }
      applyEditorChrome(showNativeNavigation);
      void refreshTree(activeBranch);
    } catch {
      // Ignore transient same-origin navigation states while Keystatic redirects.
    }
  };

  const openUtilityCollection = (value: string) => {
    if (!value || !tree) return;
    if (value === 'dashboard') navigateEditor(editorBase(tree));
    else if (value === 'settings') navigateEditor(`${editorBase(tree)}/singleton/siteSettings`);
    else navigateEditor(collectionUrl(editorBase(tree), value));
  };

  return (
    <main className="content-tree-workspace">
      <aside className="content-tree-sidebar">
        <header className="workspace-brand">
          <a href="/" target="_blank" rel="noreferrer" aria-label="打开网站首页">
            ICEAXING
          </a>
          <div className="workspace-brand-copy">
            <div className="workspace-brand-title">
              <strong>内容工作区</strong>
              <select
                aria-label="选择内容分组"
                value={group}
                onChange={(event) => {
                  setGroup(event.target.value as WorkspaceGroup);
                  setQuery('');
                  setExpanded(new Set());
                }}
              >
                {workspaceGroups.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <span>
              {tree?.storageKind === 'github' ? `GitHub · ${tree.branch ?? '连接中'}` : '本地文件'}
            </span>
          </div>
        </header>

        <div className="tree-toolbar">
          <label>
            <span className="sr-only">搜索内容树</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索文件夹或文章"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setExpanded(new Set());
              setQuery('');
              void refreshTree(tree?.branch);
            }}
            aria-label="刷新内容树"
          >
            ↻
          </button>
          {group !== 'documents' && (
            <button
              type="button"
              className="primary-icon-button"
              onClick={() => createFolder()}
              aria-label="新建分类"
            >
              ＋
            </button>
          )}
        </div>

        {error && <div className="workspace-alert is-error">{error}</div>}
        {notice && (
          <button
            className="workspace-alert is-success"
            type="button"
            onClick={() => setNotice('')}
          >
            {notice}
          </button>
        )}
        {tree?.warnings.map((warning) => (
          <div className="workspace-alert is-warning" key={warning}>
            {warning}
          </div>
        ))}

        <div className="tree-heading">
          <span>{workspaceGroups.find((option) => option.value === group)?.label}</span>
          <small>
            {tree
              ? `${group === 'documents' ? utilityFolders.length : groupContent.folders.length} 个文件夹 · ${groupContent.articles.length} 篇内容`
              : ''}
          </small>
        </div>
        <nav className="content-tree" aria-label="分组内容树">
          {loading && !tree ? <div className="tree-empty">正在读取内容树…</div> : renderItems(null)}
          {!loading && tree && !itemsByParent.get(null)?.length && (
            <div className="tree-empty">当前分组还没有内容。</div>
          )}
          {!loading && tree && visibleKeys?.size === 0 && (
            <div className="tree-empty">当前分组没有匹配的内容。</div>
          )}
        </nav>

        <footer className="workspace-sidebar-footer">
          <label htmlFor="utility-navigation">其他内容</label>
          <select
            id="utility-navigation"
            defaultValue=""
            onChange={(event) => {
              openUtilityCollection(event.target.value);
              event.target.value = '';
            }}
          >
            <option value="" disabled>
              选择原有管理入口…
            </option>
            <option value="dashboard">Keystatic 总览</option>
            <optgroup label="日志">
              <option value="logsZh">日志 · 中文</option>
              <option value="logsEn">日志 · English</option>
              <option value="logsDe">日志 · Deutsch</option>
            </optgroup>
            <optgroup label="页面">
              <option value="pagesZh">页面 · 中文</option>
              <option value="pagesEn">页面 · English</option>
              <option value="pagesDe">页面 · Deutsch</option>
            </optgroup>
            <optgroup label="站点数据">
              <option value="friends">友链</option>
              <option value="mottos">格言</option>
              <option value="settings">站点设置</option>
            </optgroup>
          </select>
        </footer>
      </aside>

      <section className="content-editor-pane">
        <header className="editor-toolbar">
          <div>
            <strong>{selectedArticle?.label ?? 'Keystatic 编辑器'}</strong>
            <span>
              {selectedArticle ? selectedArticle.translationKey : '选择左侧节点以编辑内容或属性'}
            </span>
          </div>
          {selectedArticle && (
            <div className="language-switcher" aria-label="文章语言版本">
              {(Object.keys(localeLabels) as ContentLocale[]).map((locale) => {
                const exists = selectedArticle.versions.some(
                  (version) => version.locale === locale,
                );
                return (
                  <button
                    type="button"
                    key={locale}
                    disabled={!exists}
                    className={selectedLocale === locale ? 'is-active' : ''}
                    onClick={() => switchArticleLocale(locale)}
                    title={exists ? localeLabels[locale] : `${localeLabels[locale]}版本尚未创建`}
                  >
                    {locale.toUpperCase()}
                  </button>
                );
              })}
            </div>
          )}
          <button
            className="native-navigation-toggle"
            type="button"
            onClick={() => setShowNativeNavigation((current) => !current)}
          >
            {showNativeNavigation ? '隐藏原生导航' : '原生导航'}
          </button>
          <a href={editorUrl} target="_blank" rel="noreferrer">
            在新窗口打开
          </a>
        </header>
        <iframe
          ref={iframeRef}
          src={editorUrl}
          title="Keystatic 内容编辑器"
          onLoad={handleEditorLoad}
        />
      </section>

      {createArticleTarget && (
        <div className="workspace-modal-backdrop" role="presentation">
          <section
            className="workspace-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-article-title"
          >
            <span className="modal-eyebrow">
              {createArticleTarget.translationKey ? '添加翻译' : '新建文章'}
            </span>
            <h2 id="create-article-title">选择文章语言</h2>
            <p>
              文章将创建在“{createArticleTarget.label}
              ”下，父级关系会自动填入，保存前仍可在属性面板中调整。
            </p>
            <div className="locale-choice-grid">
              {(
                createArticleTarget.missingLocales ?? (Object.keys(localeLabels) as ContentLocale[])
              ).map((locale) => (
                <button
                  type="button"
                  key={locale}
                  onClick={() => createArticle(createArticleTarget, locale)}
                >
                  <strong>{localeLabels[locale]}</strong>
                  <span>{locale.toUpperCase()}</span>
                </button>
              ))}
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setCreateArticleTarget(null)}
            >
              取消
            </button>
          </section>
        </div>
      )}

      {deleteTarget && deleteSummary && (
        <div className="workspace-modal-backdrop" role="presentation">
          <section
            className="workspace-modal danger-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-folder-title"
          >
            <span className="modal-eyebrow">不可撤销操作</span>
            <h2 id="delete-folder-title">级联删除“{deleteTarget.label}”？</h2>
            <p>确认后会从当前{tree?.storageKind === 'github' ? '分支' : '工作区'}删除：</p>
            <dl className="delete-impact">
              <div>
                <dt>文件夹</dt>
                <dd>{deleteSummary.folders}</dd>
              </div>
              <div>
                <dt>逻辑文章</dt>
                <dd>{deleteSummary.articles}</dd>
              </div>
              <div>
                <dt>语言版本</dt>
                <dd>{deleteSummary.versions}</dd>
              </div>
            </dl>
            <p className="danger-note">
              服务端会在执行前重新计算后代，避免遗漏刚刚发生的内容变化。
            </p>
            <div className="modal-actions">
              <button
                className="secondary-button"
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
              >
                取消
              </button>
              <button
                className="danger-button"
                type="button"
                disabled={deleting}
                onClick={() => void confirmDelete()}
              >
                {deleting ? '正在删除…' : '确认级联删除'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
