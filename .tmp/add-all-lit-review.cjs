// Extend the generated standalone mockups and comparison UI without touching the site.
const fs = require('node:fs');
const file='.tmp/generate-study-concepts.cjs';
let source=fs.readFileSync(file,'utf8');
source=source.replace("${key==='current'?'':common+styles[key]}</style>","${key==='current'?'':common+styles[key]}${litCSS}</style>");
source=source.replace("\\n${native}\\ninitStudyConstellation();", "\\n(${installAllLit.toString()})('${key}');\\n${native}\\ninitStudyConstellation();");
source=source.replace('<button id="theme">','<button id="lighting" aria-pressed="true">40 颗全部点亮</button><button id="theme">');
source=source.replace("let selected='A',theme='dark',mobile=false;", "let selected='A',theme='dark',mobile=false,allLit=true;");
source=source.replace("frame.addEventListener('load',()=>frame.contentWindow.postMessage({type:'theme',theme},'*'));", "frame.addEventListener('load',()=>{frame.contentWindow.postMessage({type:'theme',theme},'*');frame.contentWindow.postMessage({type:'lighting',allLit},'*')});document.querySelector('#lighting').onclick=()=>{allLit=!allLit;frame.contentWindow.postMessage({type:'lighting',allLit},'*');document.querySelector('#lighting').textContent=allLit?'40 颗全部点亮':'仅点亮 8 颗教材星';document.querySelector('#lighting').setAttribute('aria-pressed',allLit)};");
source=source.replace('同一组教材、同一组坐标、同一块画布。只比较星点、连线与标签的视觉表达。','默认展示 40 颗星全部点亮，可切回原状态；保持星点坐标与画布大小，比较四种星图样式。');
source=source.replace('可悬停查看教材，点击星点展开笔记；','全亮预览含 8 个真实教材入口与 32 个示例亮星，示例亮星不代表新增教材。可悬停查看教材，点击教材星展开笔记；');
fs.writeFileSync(file,source);
