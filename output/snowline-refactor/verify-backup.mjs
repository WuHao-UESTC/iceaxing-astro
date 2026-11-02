import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const backup='E:/repo_iceaxing-astro/backups/snowline-pre-refactor-20261102-162824';
const excluded=new Set(['.git','node_modules','dist','.astro','.vercel','.tmp','output','.playwright-cli']);
const manifest=[];
function verify(dir='') { for(const e of fs.readdirSync(dir||'.',{withFileTypes:true})) { if(excluded.has(e.name)) continue; const rel=path.join(dir,e.name); if(e.isDirectory()) verify(rel); else if(e.isFile()) { const original=fs.readFileSync(rel); const copy=fs.readFileSync(path.join(backup,'workspace',rel)); const hash=crypto.createHash('sha256').update(original).digest('hex'); if(!original.equals(copy)) throw new Error('Backup differs: '+rel); manifest.push({path:rel,bytes:original.length,sha256:hash}); } } }
verify(); fs.writeFileSync(path.join(backup,'manifest.json'),JSON.stringify(manifest,null,2));
console.log('Verified backup files:',manifest.length);
