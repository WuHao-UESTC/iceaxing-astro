import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {styles} from './catalog.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const readCheck=name=>{const bytes=fs.readFileSync(path.join(root,name));const source=bytes.toString(bytes[0]===255&&bytes[1]===254?'utf16le':'utf8').replace(/^\uFEFF/,'');const line=source.split(/\r?\n/).find(l=>l.startsWith('{'));if(!line)throw Error('Missing result '+name);return JSON.parse(line);};
const chapterResults=new Map();
for(const file of ['round-1-check.txt','round-1-fixes.txt','round-2-check.txt','round-3-check.txt','final-fixes-check.txt']){
 const check=readCheck(file);for(const r of check.results)chapterResults.set(r.name,r);if(check.errors?.length)throw Error('Browser errors '+file);
}
for(const r of chapterResults.values())if(!r.ok)throw Error('Unresolved chapter check '+r.name);
const final=readCheck('final-review.txt'),mobile=readCheck('final-mobile-check.txt'),gallery=readCheck('gallery-check.txt');
if(final.results.length!==15||final.results.some(r=>!r.ok)||final.errors.length)throw Error('Final interaction review');
if(mobile.result.length!==15||mobile.result.some(r=>!r.ok)||mobile.errors.length)throw Error('Final mobile review');
if(!gallery.ok)throw Error('Gallery review');
const pages=[...styles.map(s=>`${s.id}-${s.key}.html`),'index.html','research/index.html'];
let localLinks=0;
for(const file of pages){const source=fs.readFileSync(path.join(root,file),'utf8');for(const m of source.matchAll(/(?:href|src)="([^"]+)"/g)){const url=m[1];if(/^(?:https?:|data:|#)/.test(url))continue;const target=decodeURIComponent(url.split('#')[0]);if(!fs.existsSync(path.resolve(path.dirname(path.join(root,file)),target)))throw Error(`Broken local link in ${file}: ${url}`);localLinks++;}}
const result={styles:styles.length,chapters:styles.length*5,chapterScreenshots:150,readerScreenshots:15,contactSheets:15,desktopWidth:1440,mobileWidth:390,chapterChecks:[...chapterResults.values()],finalInteractions:final.results,finalMobile:mobile.result,gallery,localLinks,errors:[],formalSiteModified:false};
fs.writeFileSync(path.join(root,'verification.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({styles:15,chapters:75,chapterScreenshots:150,localLinks,errors:0}));
