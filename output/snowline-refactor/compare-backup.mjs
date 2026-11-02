import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const base='E:/repo_iceaxing-astro/backups/snowline-pre-refactor-20261102-162824';
const manifest=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'),'utf8'));
const modified=[],missing=[];
for(const entry of manifest){if(!fs.existsSync(entry.path)){missing.push(entry.path);continue;}const hash=crypto.createHash('sha256').update(fs.readFileSync(entry.path)).digest('hex');if(hash!==entry.sha256)modified.push(entry.path);}
fs.writeFileSync('output/snowline-refactor/changed-from-backup.json',JSON.stringify({backup:base,modified,missing},null,2));console.log(JSON.stringify({modified,missing}));
