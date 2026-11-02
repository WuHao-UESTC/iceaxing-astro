import { useCallback, useEffect, useRef, useState } from 'react';
import { compareFeatured } from '../../lib/featured';
import type { FeaturedItem, FeaturedPayload } from '../../lib/featured-types';
import '../../styles/featured-manager.css';
interface Props {
  branch: string | null;
  active: boolean;
  onEdit: (collection: string, slug: string) => void;
}
const kindLabel = { article: '文章', project: '项目', category: '分类', collection: '合集' };
const statusLabel: Record<string, string> = {
  draft: '草稿',
  published: '已发布',
  scheduled: '定时发布',
  archived: '已归档',
};
export default function FeaturedManager({ branch, active, onEdit }: Props) {
  const [payload, setPayload] = useState<FeaturedPayload | null>(null);
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const drag = useRef<string | null>(null);
  const dirtyRef = useRef(false);
  dirtyRef.current = dirty;
  const loadGeneration = useRef(0);
  const loadedBranch = useRef(branch);
  const currentBranch = useRef(branch);
  currentBranch.current = branch;
  const read = useCallback(async () => {
    const generation = ++loadGeneration.current;
    setBusy(true);
    setError('');
    try {
      const url = new URL('/api/keystatic-featured', window.location.origin);
      if (branch) url.searchParams.set('branch', branch);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (generation !== loadGeneration.current) return;
      setPayload(data);
      setItems(data.items);
      setDirty(false);
      setMessage('已加载最新精选。');
    } catch (e) {
      if (generation === loadGeneration.current)
        setError(e instanceof Error ? e.message : '加载失败');
    } finally {
      if (generation === loadGeneration.current) setBusy(false);
    }
  }, [branch]);
  useEffect(() => {
    const branchChanged = loadedBranch.current !== branch;
    loadedBranch.current = branch;
    if (branchChanged || (active && !dirtyRef.current)) void read();
    return () => {
      loadGeneration.current++;
    };
  }, [active, read, branch]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const update = (next: FeaturedItem[]) => {
    setItems(next);
    setDirty(true);
    setMessage('顺序尚未保存。');
    setError('');
  };
  const selected = items.filter((item) => item.featured).sort(compareFeatured);
  function move(key: string, targetKey: string) {
    const list = [...selected];
    const from = list.findIndex((i) => i.key === key);
    const to = list.findIndex((i) => i.key === targetKey);
    if (from < 0 || to < 0 || from === to) return;
    list.splice(to, 0, ...list.splice(from, 1));
    const order = new Map(list.map((item, index) => [item.key, (index + 1) * 10]));
    update(
      items.map((item) =>
        order.has(item.key) ? { ...item, featuredOrder: order.get(item.key)! } : item,
      ),
    );
  }
  function toggle(key: string) {
    const max = Math.max(0, ...selected.map((i) => i.featuredOrder));
    update(
      items.map((item) =>
        item.key === key
          ? {
              ...item,
              featured: !item.featured,
              featuredOrder: item.featured ? item.featuredOrder : max + 10,
            }
          : item,
      ),
    );
  }
  async function save() {
    if (!payload || busy) return;
    const savingBranch = branch;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/keystatic-featured', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          revision: payload.revision,
          branch: payload.branch,
          items: items.map(({ key, featured, featuredOrder }) => ({
            key,
            featured,
            featuredOrder,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (currentBranch.current !== savingBranch) return;
      setPayload(data);
      setItems(data.items);
      setDirty(false);
      setMessage('精选已保存。首页与详情表单共用此顺序；线上页面在下一次构建后更新。');
    } catch (e) {
      if (currentBranch.current === savingBranch)
        setError(e instanceof Error ? e.message : '保存失败');
    } finally {
      if (currentBranch.current === savingBranch) setBusy(false);
    }
  }
  const displayed = (
    showAll ? [...selected, ...items.filter((i) => !i.featured)] : selected
  ).filter((item) =>
    `${item.title} ${item.id} ${kindLabel[item.kind]} ${item.locale}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="featured-manager" data-featured-manager>
      <header>
        <p>EDITORIAL / CURATION</p>
        <h1>首页精选</h1>
        <p>文章、项目、分类与合集统一编排。拖动条目或使用上下按钮调整精选顺序。</p>
      </header>
      <div className="featured-manager-toolbar">
        <label>
          查找内容
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="标题、类型或语言"
          />
        </label>
        <label className="featured-show-all">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(event) => setShowAll(event.target.checked)}
          />
          显示未精选内容
        </label>
        <span>
          {selected.length} 项精选{dirty ? ' · 未保存' : ''}
        </span>
        <button type="button" disabled={busy || !dirty} onClick={() => void save()}>
          {busy ? '处理中…' : '保存精选'}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            if (!dirty || window.confirm('重新加载会放弃当前未保存的精选调整，是否继续？'))
              void read();
          }}
        >
          重新加载
        </button>
      </div>
      {error && (
        <p role="alert" className="featured-manager-error">
          {error}
        </p>
      )}
      <p role="status" className="featured-manager-status">
        {message}
      </p>
      <ol className="featured-manager-list" aria-label="统一精选列表">
        {displayed.map((item) => {
          const rank = selected.findIndex((i) => i.key === item.key);
          return (
            <li
              key={item.key}
              data-featured-key={item.key}
              draggable={item.featured && !busy && !query}
              onDragStart={(event) => {
                drag.current = item.key;
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', item.key);
              }}
              onDragOver={(event) => {
                if (item.featured) event.preventDefault();
              }}
              onDrop={(event) => {
                event.preventDefault();
                if (drag.current && item.featured) move(drag.current, item.key);
                drag.current = null;
              }}
              onDragEnd={() => {
                drag.current = null;
              }}
            >
              <div className="featured-manager-rank">
                {item.featured ? String(rank + 1).padStart(2, '0') : '—'}
              </div>
              <div className="featured-manager-copy">
                <strong>{item.title}</strong>
                <p>
                  {kindLabel[item.kind]} ·{' '}
                  {item.locale === 'all' ? '多语言' : item.locale.toUpperCase()} ·{' '}
                  {statusLabel[item.status] ?? item.status} · 排序 {item.featuredOrder}
                </p>
                {item.warning && <p className="featured-manager-warning">{item.warning}</p>}
              </div>
              <div className="featured-manager-actions">
                <label>
                  <input
                    type="checkbox"
                    checked={item.featured}
                    disabled={busy}
                    onChange={() => toggle(item.key)}
                    aria-label={`精选：${item.title}`}
                  />
                  精选
                </label>
                <button
                  type="button"
                  disabled={busy || !item.featured || rank <= 0 || Boolean(query)}
                  aria-label={`上移：${item.title}`}
                  onClick={() => move(item.key, selected[rank - 1]?.key ?? item.key)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={
                    busy || !item.featured || rank === selected.length - 1 || Boolean(query)
                  }
                  aria-label={`下移：${item.title}`}
                  onClick={() => move(item.key, selected[rank + 1]?.key ?? item.key)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  disabled={dirty || busy}
                  title={dirty ? '请先保存或重新加载精选调整' : '编辑内容详情'}
                  onClick={() => onEdit(item.collection, item.slug)}
                >
                  编辑
                </button>
                {item.preview && item.isPublic ? (
                  <a href={item.preview} target="_blank" rel="noreferrer">
                    预览 ↗
                  </a>
                ) : (
                  <span>未公开</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {!busy && !displayed.length && (
        <p className="featured-manager-empty">
          {showAll ? '没有匹配的内容。' : '暂无匹配精选，可打开“显示未精选内容”添加。'}
        </p>
      )}
    </div>
  );
}
