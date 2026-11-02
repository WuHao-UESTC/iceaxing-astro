import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {styles} from './catalog.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const shots=path.join(root,'screenshots');
const chapters=['cover','technical-ridge','study-terrace','snowfield-traverse','night-camp'];
const labels=['01 COVER','02 TECHNOLOGY','03 STUDY NOTES','04 EVERYDAY LIFE','05 ALONG THE WAY'];
const escaped=x=>x.replaceAll('&','&amp;').replaceAll('<','&lt;');
const label=(text,width,height=40,bg='#f4f3eb',color='#304238')=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="M0 0H${width}V${height}H0Z" fill="${bg}"/><text x="18" y="${height*.63}" font-family="Arial,sans-serif" font-size="13" fill="${color}">${escaped(text)}</text></svg>`);
const covers=[];
for(let i=0;i<styles.length;i++){
 const s=styles[i];const composites=[{input:label(`${s.id} / ${s.key.toUpperCase()}  —  FIVE CHAPTERS`,2400,55,s.colors[0],s.colors[1]),left:0,top:0}];
 for(let c=0;c<5;c++){
  const desk=path.join(shots,`${s.id}-${chapters[c]}-desktop.png`),mobile=path.join(shots,`${s.id}-${chapters[c]}-mobile.png`);
  if(!fs.existsSync(desk)||!fs.existsSync(mobile))throw Error(`Missing ${s.id} chapter ${c}`);
  composites.push({input:await sharp(desk).resize(460,330,{fit:'contain',background:s.colors[0]}).png().toBuffer(),left:c*480+10,top:100});
  composites.push({input:label(labels[c],480,35,s.colors[0],s.colors[1]),left:c*480,top:60});
  composites.push({input:await sharp(mobile).resize(460,590,{fit:'contain',background:s.colors[0]}).png().toBuffer(),left:c*480+10,top:480});
 }
 composites.push({input:label('DESKTOP / 1440px    +    MOBILE / 390px    |    ACTUAL HTML SCREENSHOTS',2400,35,s.colors[0],s.colors[1]),left:0,top:438});
 await sharp({create:{width:2400,height:1090,channels:4,background:s.colors[0]}}).composite(composites).png().toFile(path.join(shots,`${s.id}-chapters.png`));
 const x=(i%3)*480,y=Math.floor(i/3)*370;
 covers.push({input:await sharp(path.join(shots,`${s.id}-cover-desktop.png`)).resize(470,325,{fit:'contain',background:s.colors[0]}).png().toBuffer(),left:x+5,top:y+40});
 covers.push({input:label(`${s.id} / ${s.key.toUpperCase()}`,480,40,s.colors[0],s.colors[1]),left:x,top:y});
}
await sharp({create:{width:1440,height:1850,channels:4,background:'#eceee5'}}).composite(covers).png().toFile(path.join(root,'all-15-styles.png'));
const sourceRows=styles.map(s=>`<tr><td>${s.id} · ${s.name}</td><td>${s.refs.map((url,i)=>`<a href="${url}" target="_blank" rel="noopener">${new URL(url).hostname}${s.refs.length>1?' / '+(i+1):''} ↗</a>`).join('<br>')}</td><td>${s.art}</td><td>${s.layout}</td></tr>`).join('');
fs.mkdirSync(path.join(root,'research'),{recursive:true});
fs.writeFileSync(path.join(root,'research','index.html'),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>三轮研究与来源 — Iceaxing</title><style>body{margin:0;background:#f1f2eb;color:#304238;font:14px/1.9 system-ui,'Microsoft YaHei',sans-serif}main{max-width:1200px;padding:45px 25px;margin:auto}a{color:inherit;text-underline-offset:4px}h1{font-weight:400;font-size:35px}.reports{display:flex;flex-wrap:wrap;gap:20px;margin:30px 0}.reports a{border:1px solid #bdcbb5;padding:13px 20px;text-decoration:none}table{border-collapse:collapse;width:100%;background:#fbfcf6}td,th{text-align:left;border:1px solid #cfdbca;padding:15px}th{font-weight:500;background:#e1e8da}td{font-size:12px}p{color:#78846e;max-width:900px}.table-wrap{overflow:auto}footer{margin-top:35px;border-top:1px solid #bdcbb5;padding-top:20px;font-size:12px}@media(max-width:700px){td,th{min-width:160px}h1{font-size:28px}}</style></head><body><main><a href="../index.html">← 返回十五版样稿</a><h1>先研究，再制作；共三轮。</h1><p>同一套五章节逻辑，十五种不同的美术表达。参考网站包括个人博客、设计师作品、馆藏与游戏；下表说明来源与转化关系，不把艺术／游戏来源误称为博客。</p><div class="reports"><a href="../../../../output/playwright/blog-research/index.html">第一轮 · 博客参考截图</a><a href="../../../../output/playwright/blog-research/REPORT.md">第一轮 · 调研报告</a><a href="round-2.md">第二轮 · 调研报告</a><a href="round-3.md">第三轮 · 调研报告</a></div><div class="table-wrap"><table><thead><tr><th>样稿</th><th>一手来源</th><th>美术转化</th><th>卡片转化</th></tr></thead><tbody>${sourceRows}</tbody></table></div><footer>部分网站触发验证或图片加载受限，详见各轮报告。样稿中的插画均为原创 SVG，没有直接挪用参考站的品牌插画、角色或照片。</footer></main></body></html>`);
console.log(`Packaged ${styles.length} chapter contact sheets and all-style overview. Verified 150 chapter screenshots.`);
