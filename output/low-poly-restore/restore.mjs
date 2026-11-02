import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const backup = 'E:/repo_iceaxing-astro/backups/snowline-pre-refactor-20261102-162824';
const root = process.cwd();
const save = path.join(root, 'output/low-poly-restore/before-' + new Date().toISOString().replace(/[:.]/g, '-'));
const original = JSON.parse(fs.readFileSync(path.join(backup, 'manifest.json'), 'utf8'));
const recorded = JSON.parse(fs.readFileSync('output/snowline-refactor/changed-from-backup.json', 'utf8'));
const files = [...new Set([...recorded.modified.filter(p => p.startsWith('src')), 'src/components/home/types.ts', 'src/layouts/BaseLayout.astro'])];
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
// Validate every original before changing the workspace.
for (const file of files) {
  const entry = original.find(e => e.path.replaceAll('\\', '/') === file.replaceAll('\\', '/'));
  if (!entry || sha(path.join(backup, 'workspace', file)) !== entry.sha256) throw new Error('Invalid backup: ' + file);
}
fs.mkdirSync(save, { recursive: true });
const manifest = [];
for (const file of files) {
  const destination = path.join(save, file + '.bak');
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(file, destination);
  manifest.push({ file, savedAs: file + '.bak', before: sha(file), restored: sha(path.join(backup, 'workspace', file)) });
}
fs.writeFileSync(path.join(save, 'manifest.json'), JSON.stringify({ backup, files: manifest }, null, 2));
for (const file of files) fs.copyFileSync(path.join(backup, 'workspace', file), file);
for (const entry of manifest) if (sha(entry.file) !== entry.restored) throw new Error('Restore mismatch: ' + entry.file);
console.log(JSON.stringify({ restored: files.length, savedCurrentVersion: save, files }, null, 2));
