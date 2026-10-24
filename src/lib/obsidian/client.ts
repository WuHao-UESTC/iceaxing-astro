import type { ObsidianExport } from './export';
import { exportRoot } from './tree';

export interface VaultHandle extends FileSystemDirectoryHandle {
  queryPermission(options: { mode: 'readwrite' }): Promise<PermissionState>;
  requestPermission(options: { mode: 'readwrite' }): Promise<PermissionState>;
}
export type StoredVault = { handle: VaultHandle; name: string; lastSync?: string };
export type VaultWindow = Window & {
  showDirectoryPicker?: (options: { id: string; mode: 'readwrite' }) => Promise<VaultHandle>;
};
export async function vaultSetting(value?: StoredVault | null): Promise<StoredVault | null> {
  return new Promise((resolve, reject) => {
    const opening = indexedDB.open('iceaxing-obsidian', 1);
    opening.onupgradeneeded = () => opening.result.createObjectStore('settings');
    opening.onerror = () => reject(opening.error);
    opening.onsuccess = () => {
      const db = opening.result;
      const tx = db.transaction('settings', value === undefined ? 'readonly' : 'readwrite');
      const store = tx.objectStore('settings');
      const request =
        value === undefined
          ? store.get('vault')
          : value === null
            ? store.delete('vault')
            : store.put(value, 'vault');
      tx.oncomplete = () => {
        const result = value === undefined ? (request.result ?? null) : value;
        db.close();
        resolve(result as StoredVault | null);
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
      tx.onabort = () => {
        db.close();
        reject(tx.error);
      };
    };
  });
}
export function safeExportPath(file: string) {
  const parts = file.split('/');
  if (
    !file ||
    /[\\:\0]/.test(file) ||
    parts.some(
      (part) => !part || ['.', '..', '__proto__', 'constructor', 'prototype'].includes(part),
    ) ||
    file === '.keystatic-sync.json'
  )
    throw new Error('同步文件路径无效。');
  return parts;
}
async function fileHandle(root: FileSystemDirectoryHandle, file: string, create: boolean) {
  const parts = safeExportPath(file);
  let dir = root;
  for (const part of parts.slice(0, -1)) dir = await dir.getDirectoryHandle(part, { create });
  return dir.getFileHandle(parts.at(-1)!, { create });
}
async function readExisting(root: FileSystemDirectoryHandle, file: string) {
  try {
    return new Uint8Array(
      await (await (await fileHandle(root, file, false)).getFile()).arrayBuffer(),
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === 'NotFoundError') return null;
    throw error;
  }
}
async function write(root: FileSystemDirectoryHandle, file: string, bytes: Uint8Array) {
  const writable = await (await fileHandle(root, file, true)).createWritable();
  try {
    await writable.write(new Uint8Array(bytes));
    await writable.close();
  } catch (error) {
    await writable.abort().catch(() => {});
    throw error;
  }
}
async function hash(bytes: Uint8Array) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new Uint8Array(bytes))))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
type Manifest = {
  owner: 'iceaxing-keystatic-obsidian-v1';
  source: string;
  files: Record<string, string>;
  lastSync: string;
};
const manifestName = '.keystatic-sync.json';
async function saveManifest(root: FileSystemDirectoryHandle, manifest: Manifest) {
  const handle = await root.getFileHandle(manifestName, { create: true });
  const writable = await handle.createWritable();
  try {
    await writable.write(JSON.stringify(manifest, null, 2));
    await writable.close();
  } catch (error) {
    await writable.abort().catch(() => {});
    throw error;
  }
}
export async function syncObsidian(
  vault: FileSystemDirectoryHandle,
  payload: ObsidianExport,
  onProgress: (message: string) => void,
  fetchAsset?: (asset: string) => Promise<Uint8Array>,
) {
  if (payload.version !== 1 || !payload.source) throw new Error('同步数据格式无效。');
  const paths = new Set<string>();
  for (const file of payload.files) {
    safeExportPath(file.path);
    const normalized = file.path.toLowerCase();
    if (paths.has(normalized)) throw new Error('同步包含重复文件名。');
    paths.add(normalized);
  }
  for (const directory of payload.directories ?? []) safeExportPath(directory);
  const root = await vault.getDirectoryHandle(exportRoot, { create: true });
  let manifest: Manifest = {
    owner: 'iceaxing-keystatic-obsidian-v1',
    source: payload.source,
    files: {},
    lastSync: new Date().toISOString(),
  };
  try {
    const stored = JSON.parse(
      await (await (await root.getFileHandle(manifestName)).getFile()).text(),
    ) as Manifest;
    if (
      stored.owner !== manifest.owner ||
      stored.source !== payload.source ||
      !stored.files ||
      typeof stored.files !== 'object' ||
      Array.isArray(stored.files)
    )
      throw new Error('iceaxing-astro 目录的同步记录属于其他来源或已损坏，请更换仓库目录。');
    manifest = stored;
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'NotFoundError')) throw error;
  }
  let changed = 0,
    unchanged = 0;
  const conflicts: string[] = [];
  for (const directory of payload.directories ?? []) {
    let parent = root;
    for (const part of safeExportPath(directory))
      parent = await parent.getDirectoryHandle(part, { create: true });
  }
  const download =
    fetchAsset ??
    (async (asset: string) => {
      const url = new URL('/api/keystatic-obsidian', window.location.origin);
      url.searchParams.set('asset', asset);
      const revision = payload.revision || payload.branch;
      if (revision) url.searchParams.set('branch', revision);
      const parts: Uint8Array[] = [];
      let offset = 0;
      let total: number;
      do {
        url.searchParams.set('offset', String(offset));
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error(`下载附件失败：${asset}`);
        const bytes = new Uint8Array(await response.arrayBuffer());
        total = Number(response.headers.get('X-Asset-Size'));
        if (
          !Number.isSafeInteger(total) ||
          total < 0 ||
          Number(response.headers.get('X-Asset-Offset')) !== offset ||
          (!bytes.length && offset < total)
        )
          throw new Error(`附件响应不完整：${asset}`);
        parts.push(bytes);
        offset += bytes.length;
      } while (offset < total);
      if (offset !== total) throw new Error(`附件大小不一致：${asset}`);
      const result = new Uint8Array(total);
      let position = 0;
      for (const part of parts) {
        result.set(part, position);
        position += part.length;
      }
      return result;
    });
  for (const [index, file] of payload.files.entries()) {
    onProgress(`${file.asset ? '同步附件' : '同步文章'} ${index + 1} / ${payload.files.length}`);
    const bytes = file.asset
      ? await download(file.asset)
      : new TextEncoder().encode(file.text ?? '');
    const desired = await hash(bytes);
    const existing = await readExisting(root, file.path);
    const current = existing ? await hash(existing) : null;
    if (current !== null && !Object.prototype.hasOwnProperty.call(manifest.files, file.path)) {
      conflicts.push(file.path);
      continue;
    }
    if (current === desired) unchanged++;
    else if (current && manifest.files[file.path] !== current) {
      conflicts.push(file.path);
      continue;
    } else {
      await write(root, file.path, bytes);
      changed++;
    }
    manifest.files[file.path] = desired;
    manifest.lastSync = new Date().toISOString();
    await saveManifest(root, manifest);
  }
  return { changed, unchanged, conflicts, lastSync: manifest.lastSync };
}
