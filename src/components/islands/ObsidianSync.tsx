import { useEffect, useState } from 'react';
import {
  syncObsidian,
  vaultSetting,
  type StoredVault,
  type VaultWindow,
} from '../../lib/obsidian/client';
import type { ObsidianExport } from '../../lib/obsidian/export';

export default function ObsidianSync({ branch }: { branch: string | null | undefined }) {
  const [vault, setVault] = useState<StoredVault | null>(null);
  const [supported, setSupported] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [details, setDetails] = useState<string[]>([]);
  useEffect(() => {
    setSupported(window.isSecureContext && !!(window as VaultWindow).showDirectoryPicker);
    void vaultSetting()
      .then(setVault)
      .catch(() => setError('浏览器未能读取记住的目录，请重新选择。'));
  }, []);
  const choose = async () => {
    try {
      const handle = await (window as VaultWindow).showDirectoryPicker!({
        id: 'iceaxing-obsidian-vault',
        mode: 'readwrite',
      });
      const record = { handle, name: handle.name };
      setVault(record);
      setError('');
      setMessage('已选择仓库，可同步全部文章。');
      setDetails([]);
      try {
        await vaultSetting(record);
      } catch {
        setMessage('目录本次可用，但浏览器未能记住它；下次需重新选择。');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setError(error instanceof Error ? error.message : '选择目录失败。');
    }
  };
  const sync = async () => {
    if (!vault) return;
    setBusy(true);
    setError('');
    setDetails([]);
    try {
      const permission = await vault.handle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted')
        throw new Error('未获得仓库写入权限，请点击同步后允许目录访问，或重新选择目录。');
      setMessage('正在读取全部已保存文章…');
      const url = new URL('/api/keystatic-obsidian', window.location.origin);
      if (branch) url.searchParams.set('branch', branch);
      const response = await fetch(url, { cache: 'no-store' });
      const payload = (await response.json()) as ObsidianExport & { error?: string };
      if (!response.ok) throw new Error(payload.error || '读取文章失败。');
      const performSync = () => syncObsidian(vault.handle, payload, setMessage);
      const result = navigator.locks
        ? await navigator.locks.request('iceaxing-obsidian-sync', { ifAvailable: true }, (lock) => {
            if (!lock) throw new Error('另一个工作区页面正在同步，请稍后重试。');
            return performSync();
          })
        : await performSync();
      const record = { ...vault, lastSync: result.lastSync };
      setVault(record);
      await vaultSetting(record).catch(() => {});
      setMessage(
        `同步完成：${payload.articleCount} 篇文章，更新 ${result.changed} 个文件，${result.unchanged} 个无需更新${result.conflicts.length ? `；保留 ${result.conflicts.length} 个本地修改` : '。'}`,
      );
      setDetails([...result.conflicts.map((file) => `保留本地修改：${file}`), ...payload.warnings]);
    } catch (error) {
      setError(error instanceof Error ? error.message : '同步失败，请重试。');
      setMessage('');
    } finally {
      setBusy(false);
    }
  };
  return (
    <details className="workspace-obsidian-sync">
      <summary>
        Obsidian 同步 <span aria-hidden="true">↗</span>
      </summary>
      <p>将全部语言的已保存文章和本地附件同步到所选目录的 iceaxing-astro 文件夹。</p>
      <p>文章按“语言 / 分组 / 分类 / 项目 / 合集”组织，以文章标题命名。</p>
      {supported ? (
        <>
          {vault && (
            <div className="obsidian-vault-name">
              <span>当前仓库</span>
              <strong>{vault.name}</strong>
              <small>此浏览器已记住所选目录</small>
            </div>
          )}
          <div className="obsidian-sync-actions">
            <button type="button" disabled={busy} onClick={() => void choose()}>
              {vault ? '更换仓库' : '选择仓库根目录'}
            </button>
            <button
              type="button"
              disabled={busy || !vault}
              onClick={() => void sync()}
              aria-busy={busy}
            >
              {busy ? '正在同步…' : '同步全部文章'}
            </button>
          </div>
          {vault?.lastSync && (
            <small>上次同步：{new Date(vault.lastSync).toLocaleString('zh-CN')}</small>
          )}
          <p>未保存的编辑不会同步；本地修改会保留，不会自动删除笔记。</p>
        </>
      ) : (
        <p>请使用桌面版 Chrome 或 Edge，在 HTTPS 或 localhost 页面选择仓库目录。</p>
      )}
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      {details.length > 0 && (
        <details className="obsidian-sync-report">
          <summary>查看同步说明（{details.length}）</summary>
          <ul>
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </details>
      )}
    </details>
  );
}
