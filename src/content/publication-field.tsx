import { fields } from '@keystatic/core';
import { useEffect, useId, useState } from 'react';
import { loadWorkspaceOptions, workspaceBranch } from '../lib/workspace-content-options';
import type { FolderNode } from '../lib/content-tree/types';

const options = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '定时发布', value: 'scheduled' },
  { label: '已归档', value: 'archived' },
];
function PublicationInput(props: {
  value: string;
  onChange(value: string): void;
  autoFocus: boolean;
  label: string;
}) {
  const id = useId();
  const [folders, setFolders] = useState<FolderNode[]>([]);
  const [parentKey, setParentKey] = useState('');
  const [loadError, setLoadError] = useState(false);
  const collection =
    typeof window === 'undefined'
      ? ''
      : (window.location.pathname.match(/\/collection\/([^/]+)/)?.[1] ?? '');
  const needsParent =
    collection === 'projects' || collection === 'series' || collection.startsWith('articles');
  useEffect(() => {
    if (!needsParent) return;
    let live = true;
    void loadWorkspaceOptions(workspaceBranch(window.location.pathname))
      .then((tree) => {
        if (live) {
          setFolders(tree.folders);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (live) setLoadError(true);
      });
    const refresh = () => {
      const kinds =
        collection === 'projects'
          ? ['categories']
          : collection === 'series'
            ? ['projects']
            : ['series', 'projects', 'categories'];
      for (const kind of kinds) {
        const key = document
          .querySelector(`[data-ws-relationship="${kind}"] [data-ws-relationship-key]`)
          ?.textContent?.trim();
        if (key) {
          setParentKey(`${kind}:${key}`);
          return;
        }
      }
      setParentKey('');
    };
    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    refresh();
    return () => {
      live = false;
      observer.disconnect();
    };
  }, [collection, needsParent]);
  const parent = folders.find((folder) => `${folder.editorCollection}:${folder.id}` === parentKey);
  const blocked = needsParent && (!parent || !parent.isPublic);
  return (
    <div data-ws-publication="true">
      <label id={`${id}-label`} htmlFor={id}>
        {props.label}
      </label>
      <select
        id={id}
        aria-labelledby={`${id}-label`}
        value={props.value}
        autoFocus={props.autoFocus}
        onFocus={() => {
          if (needsParent)
            void loadWorkspaceOptions(workspaceBranch(window.location.pathname), true)
              .then((tree) => {
                setFolders(tree.folders);
                setLoadError(false);
              })
              .catch(() => setLoadError(true));
        }}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={blocked && ['published', 'scheduled'].includes(option.value)}
          >
            {blocked &&
            option.value === props.value &&
            ['published', 'scheduled'].includes(option.value)
              ? '上级未发布'
              : option.label}
          </option>
        ))}
      </select>
      {blocked && (
        <small data-ws-publication-note>
          {loadError
            ? '无法确认上级发布状态，请刷新后重试。'
            : parent
              ? `上级“${parent.blockedBy || parent.label}”尚未公开，当前内容不会公开。`
              : '请先选择已发布的上级，才能发布。'}
        </small>
      )}
    </div>
  );
}
export function publicationField(label = '发布状态', article = false) {
  const base = fields.select({ label, options, defaultValue: article ? 'draft' : 'published' });
  return {
    ...base,
    defaultValue: () =>
      article || (typeof window !== 'undefined' && window.location.pathname.endsWith('/create'))
        ? 'draft'
        : 'published',
    Input: (props: Parameters<typeof base.Input>[0]) => (
      <PublicationInput {...props} label={label} />
    ),
  };
}
