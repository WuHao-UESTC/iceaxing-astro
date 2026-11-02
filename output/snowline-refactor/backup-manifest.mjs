import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const base='E:/repo_iceaxing-astro/backups/snowline-pre-refactor-20261102-162824';const rows=[];
function scan(dir=''){for(const e of fs.readdirSync(path.join(base,'workspace',dir),{withFileTypes:true})){const rel=path.join(dir,e.name);if(e.isDirectory())scan(rel);else{const b=fs.readFileSync(path.join(base,'workspace',rel));rows.push({path:rel,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')});}}}
scan();fs.writeFileSync(path.join(base,'manifest.json'),JSON.stringify(rows,null,2));console.log(JSON.stringify({files:rows.length,bytes:rows.reduce((n,r)=>n+r.bytes,0),manifest:path.join(base,'manifest.json')}));
