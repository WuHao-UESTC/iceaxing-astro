const fs = require('node:fs');
const ts = require('../node_modules/typescript');
const data = JSON.parse(fs.readFileSync('.tmp/study-review-source.json','utf8'));
const dir = 'doc/design/study-constellation-review';
fs.mkdirSync(dir,{recursive:true});
const native = ts.transpileModule(fs.readFileSync('src/scripts/study-constellation.ts','utf8').replace('export function','function'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
const common = `
html{scroll-behavior:auto} .journey-enhanced [data-reveal]{opacity:1!important;transform:none!important}
.study-star-map{--chart-line:color-mix(in srgb,var(--study-green) 42%,transparent)}
.study-star-core>span{animation:none;box-shadow:none;opacity:1}
.study-star-caption{max-width:13rem;font-size:.75rem;gap:.45rem;line-height:1.65;pointer-events:none}
.study-star-caption>span:last-child{text-wrap:balance}
.study-star-number{font-size:.5rem;letter-spacing:.04em;opacity:.8}
.study-star[data-star="hayt-engineering-electromagnetics-note"] .study-star-caption{top:auto;bottom:calc(100% + .12rem)}
.concept-network{fill:none;stroke:var(--study-green);stroke-width:.85;stroke-opacity:.28;stroke-linecap:round}
.concept-network>*{vector-effect:non-scaling-stroke;transition:stroke-opacity .25s,stroke-width .25s}
.concept-network .is-near-selected,.concept-network .is-hovered{stroke-opacity:.9;stroke-width:1.3}
.concept-guides{fill:none;stroke:var(--study-green);stroke-width:.6;stroke-opacity:.1;pointer-events:none}
.concept-guides>*{vector-effect:non-scaling-stroke}
.study-dim-stars circle{opacity:.22}
.study-star:hover .study-star-core,.study-star.is-selected .study-star-core{color:var(--study-green)}
.study-star.is-selected .study-star-caption{color:var(--study-green)}
.study-star:focus-visible{outline-width:1px;outline-offset:3px;border-radius:50%}
@media(max-width:48rem){.study-star-caption{font-size:.66rem;max-width:6.4rem;line-height:1.55}.study-star-tooltip{display:none}}
`;
const styles = {
 A:`.study-star-core{position:relative}.study-star-core>span{width:5px;height:5px;background:var(--atlas-star)}
 .study-star-core:after{content:'';position:absolute;width:15px;height:15px;border:1px solid color-mix(in srgb,var(--study-green) 36%,transparent);border-radius:50%;transition:transform .2s}
 .study-star:is(:hover,.is-selected) .study-star-core:after{transform:scale(1.35);border-color:var(--study-green)}
 .concept-network .secondary{stroke-opacity:.12;stroke-dasharray:2 7}.study-dim-stars circle{opacity:.18}`,
 B:`.study-star-core{position:relative}.study-star-core>span{width:6px;height:6px;border-radius:0;transform:rotate(45deg);background:var(--study-green)}
 .study-star-core:before,.study-star-core:after{content:'';position:absolute;background:var(--study-green);opacity:.4}
 .study-star-core:before{width:22px;height:1px}.study-star-core:after{width:1px;height:22px}
 .study-star-caption{font-family:var(--font-ui);font-size:.7rem;letter-spacing:.02em}
 .concept-network{stroke-opacity:.3;stroke-width:.75}.concept-network .secondary{stroke-dasharray:3 6;stroke-opacity:.2}
 .study-dim-stars circle{opacity:.17}.concept-guides .ticks{stroke-opacity:.25}
 @media(max-width:48rem){.study-star-caption{font-size:.63rem}}`,
 C:`.study-star-core{position:relative}.study-star-core>span{width:5px;height:5px;background:var(--atlas-star);box-shadow:0 0 8px color-mix(in srgb,var(--study-green) 55%,transparent)}
 .study-star-core:before{content:'';position:absolute;width:32px;height:32px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--study-green) 13%,transparent),transparent 70%)}
 .study-star-core:after{content:'';position:absolute;width:13px;height:13px;background:var(--atlas-star);clip-path:polygon(50% 0,57% 41%,100% 50%,57% 59%,50% 100%,43% 59%,0 50%,43% 41%);opacity:.85}
 .concept-network{stroke-width:1;stroke-opacity:.24}.concept-network .secondary{stroke-opacity:.08}
 .study-star-caption{letter-spacing:.025em}.study-dim-stars circle{opacity:.24}
 .study-star:is(:hover,.is-selected) .study-star-core:before{width:48px;height:48px}`,
 D:`.study-star-core{position:relative}.study-star-core>span{width:4px;height:4px;border-radius:0;background:var(--study-green)}
 .study-star-core:before{content:'';position:absolute;width:14px;height:14px;border:1px solid color-mix(in srgb,var(--study-green) 40%,transparent);transform:rotate(45deg)}
 .study-star-caption{left:calc(100% - .1rem);top:50%;transform:translateY(-50%);text-align:left;align-items:start;max-width:12rem;gap:.55rem;padding:0 0 .35rem;border-bottom:1px solid color-mix(in srgb,var(--study-green) 22%,transparent)}
 .study-star[data-star="razavi-cmos-analog-note"] .study-star-caption,.study-star[data-star="quirk-semiconductor-manufacturing-technology-note"] .study-star-caption{left:auto;right:calc(100% - .1rem);text-align:right;flex-direction:row-reverse}
 .study-star[data-star="hayt-engineering-electromagnetics-note"] .study-star-caption{top:50%;bottom:auto}
 .concept-network{stroke-dasharray:1 5;stroke-opacity:.27;stroke-width:.9}.study-dim-stars circle{opacity:.15}
 @media(max-width:48rem){.study-star-caption,.study-star[data-star] .study-star-caption{top:calc(100% + .1rem);bottom:auto;left:50%;right:auto;transform:translateX(-50%);text-align:center;flex-direction:row;border:0;max-width:6.4rem}.study-star[data-star="hayt-engineering-electromagnetics-note"] .study-star-caption{top:auto;bottom:100%}}`
};
function installAllLit(key){
 const ns='http://www.w3.org/2000/svg',world=document.querySelector('[data-star-world]'),sky=world.querySelector('svg');
 const stars=[...world.querySelectorAll('[data-star]')];
 const nodes=stars.map(e=>({id:e.dataset.star,x:+e.dataset.starX*10,y:+e.dataset.starY*5,element:e}));
 const dim=sky.querySelector('.study-dim-stars');
 [...dim.querySelectorAll('circle')].forEach((circle,index)=>{
  const x=+circle.getAttribute('cx'),y=+circle.getAttribute('cy'),id='preview-'+index;
  const element=document.createElement('span');element.className='study-star preview-star';
  element.style.cssText=`left:${x/10}%;top:${y/5}%`;
  element.setAttribute('role','img');element.setAttribute('aria-label',`示例亮星 ${index+9}`);element.title=`示例亮星 ${index+9} · 仅展示点亮样式`;
  element.innerHTML='<span class="study-star-core" aria-hidden="true"><span></span></span>';
  world.append(element);nodes.push({id,x,y,element});
 });
 const group=document.createElementNS(ns,'g');group.classList.add('concept-network','all-lit-network');sky.prepend(group);
 const pairs=[];nodes.forEach((a,i)=>nodes.slice(i+1).forEach(b=>pairs.push({a,b,d:Math.hypot(a.x-b.x,(a.y-b.y)*1.75)})));
 pairs.sort((a,b)=>a.d-b.d);
 const parent=new Map(nodes.map(n=>[n.id,n.id])),find=id=>{while(parent.get(id)!==id)id=parent.get(id);return id};
 const degree=new Map(nodes.map(n=>[n.id,0]));
 const edges=[];
 pairs.forEach(pair=>{const a=find(pair.a.id),b=find(pair.b.id);if(a===b)return;parent.set(a,b);edges.push(pair);degree.set(pair.a.id,degree.get(pair.a.id)+1);degree.set(pair.b.id,degree.get(pair.b.id)+1)});
 if(key==='B')for(const pair of pairs){if(edges.includes(pair)||degree.get(pair.a.id)>=3||degree.get(pair.b.id)>=3||pair.d>230)continue;edges.push(pair);degree.set(pair.a.id,degree.get(pair.a.id)+1);degree.set(pair.b.id,degree.get(pair.b.id)+1);if(edges.length>=49)break;}
 for(const {a,b}of edges){
  const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),gap=Math.min(.16,6/len),x1=a.x+dx*gap,y1=a.y+dy*gap,x2=b.x-dx*gap,y2=b.y-dy*gap;
  const line=document.createElementNS(ns,key==='C'?'path':'line');
  if(key==='C'){const bend=Math.min(8,len*.1);line.setAttribute('d',`M${x1} ${y1}Q${(x1+x2)/2-dy/len*bend} ${(y1+y2)/2+dx/len*bend} ${x2} ${y2}`)}
  else for(const [k,v]of Object.entries({x1,y1,x2,y2}))line.setAttribute(k,v);
  line.dataset.starEdgeFrom=a.id;line.dataset.starEdgeTo=b.id;group.append(line);
 }
 nodes.forEach(node=>{
  const highlight=on=>group.querySelectorAll('[data-star-edge-from]').forEach(edge=>edge.classList.toggle('is-hovered',on&&(edge.dataset.starEdgeFrom===node.id||edge.dataset.starEdgeTo===node.id)));
  node.element.addEventListener('pointerenter',()=>highlight(true));node.element.addEventListener('pointerleave',()=>highlight(false));
 });
 const status=document.querySelector('.study-atlas-toolbar>p'),original=status.innerHTML;
 window.setAllLit=enabled=>{
  document.body.classList.toggle('all-lit',enabled);
  status.innerHTML=enabled?'<span class="study-status-dot" aria-hidden="true"></span>40 <span>颗已点亮</span><span class="study-atlas-divider">/</span><span>全亮预览</span>':original;
 };
 window.addEventListener('message',event=>{if(event.data.type==='lighting')window.setAllLit(event.data.allLit)});
 window.setAllLit(true);
}
const litCSS=`.preview-star,.all-lit-network{display:none}.all-lit .preview-star{display:grid}.all-lit .all-lit-network{display:block}.all-lit .study-dim-stars,.all-lit .concept-network:not(.all-lit-network),.all-lit .study-star-network{display:none}.all-lit-network{fill:none;stroke:var(--study-green);stroke-opacity:.32;stroke-width:.8;stroke-linecap:round}.all-lit-network>*{vector-effect:non-scaling-stroke}.all-lit-network .is-hovered{stroke-opacity:.9;stroke-width:1.2}.preview-star .study-star-core>span{animation:none;opacity:1}.preview-star{cursor:default}`;
function decorate(key){
 const ns='http://www.w3.org/2000/svg';
 const world=document.querySelector('[data-star-world]');
 const sky=world.querySelector('svg');
 const original=[...sky.querySelectorAll('.study-star-network line')].map(e=>({x1:+e.getAttribute('x1'),y1:+e.getAttribute('y1'),x2:+e.getAttribute('x2'),y2:+e.getAttribute('y2')}));
 sky.querySelector('.study-star-network').remove();
 const stars=[...world.querySelectorAll('[data-star]')];
 const points=stars.map(e=>({x:+e.dataset.starX*10,y:+e.dataset.starY*5,id:e.dataset.star}));
 const group=document.createElementNS(ns,'g');group.setAttribute('class','concept-network');sky.prepend(group);
 const guides=document.createElementNS(ns,'g');guides.setAttribute('class','concept-guides');sky.prepend(guides);
 const append=(parent,tag,attrs)=>{const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e};
 const pairs=key==='D'?[[0,2],[2,3],[3,4],[4,5],[5,1],[1,6],[6,7]]:[[0,2],[2,3],[3,4],[4,5],[5,1],[1,6],[6,7]];
 for(const [i,j]of pairs){
  const a=points[i],b=points[j],dx=b.x-a.x,dy=b.y-a.y;
  const gap=key==='B'?.035:.055;
  const x1=a.x+dx*gap,y1=a.y+dy*gap,x2=b.x-dx*gap,y2=b.y-dy*gap;
  const attrs={'data-star-edge-from':a.id,'data-star-edge-to':b.id};
  if(key==='C')append(group,'path',{...attrs,d:`M${x1} ${y1} C${x1+dx*.48} ${y1-dy*.12-12},${x2-dx*.4} ${y2+dy*.1+14},${x2} ${y2}`});
  else if(key==='D')append(group,'path',{...attrs,d:`M${x1} ${y1}L${x1+dx*.52} ${y1+dy*.36}L${x2} ${y2}`});
  else append(group,'line',{...attrs,x1,y1,x2,y2});
 }
 if(key==='B'){
  for(const [i,j]of [[2,5],[2,6],[0,6],[5,6],[1,7]]){const a=points[i],b=points[j];append(group,'line',{'data-star-edge-from':a.id,'data-star-edge-to':b.id,x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'secondary'});}
  for(const y of [155,305])append(guides,'path',{d:`M110 ${y}H930`, 'stroke-dasharray':'1 8'});
  append(guides,'path',{d:'M660 36V350M510 65C610 10 850 23 927 129M495 97C625 18 902 85 939 212'});
  for(let i=0;i<8;i++)append(guides,'path',{class:'ticks',d:`M${545+i*45} 45v${i%2?3:6}`});
 }else if(key==='A'){
  original.filter((e,i)=>i%9===2&&Math.hypot(e.x2-e.x1,e.y2-e.y1)<150).slice(0,8).forEach(e=>append(group,'line',{...e,class:'secondary'}));
 }else if(key==='C'){
  original.filter((e,i)=>i%12===0).slice(0,6).forEach(e=>append(group,'path',{class:'secondary',d:`M${e.x1} ${e.y1}Q${(e.x1+e.x2)/2+10} ${(e.y1+e.y2)/2-9} ${e.x2} ${e.y2}`}));
 }else{
  for(const p of points)append(guides,'path',{d:`M${p.x-9} ${p.y+9}v5h5`});
 }
 stars.forEach(star=>{
  const highlight=on=>group.querySelectorAll('[data-star-edge-from]').forEach(edge=>edge.classList.toggle('is-hovered',on&&(edge.dataset.starEdgeFrom===star.dataset.star||edge.dataset.starEdgeTo===star.dataset.star)));
  star.addEventListener('pointerenter',()=>highlight(true));star.addEventListener('pointerleave',()=>highlight(false));
 });
}
const options=[
 ['A','疏朗星座','细实线 · 环形星点 · 清晰留白','连线只保留一条主星座与少量暗线，阅读更安静。'],
 ['B','测绘图谱','坐标辅助线 · 菱形星点 · 技术感','以克制的测量刻度和虚实线，呼应知识地图与山地测绘。'],
 ['C','柔光星轨','轻曲线 · 四芒星 · 柔和光晕','用连续的轻弧线连接教材，让星群更流动、更有夜空感。'],
 ['D','书页星标','点状连线 · 旁注标签 · 编辑感','像书页边的知识批注，标题更突出，图形退到背景。'],
];
const mobileFix=`@media(max-width:48rem){.study-star[data-star="hayt-engineering-electromagnetics-note"] .study-star-caption{top:auto;bottom:calc(100% + .3rem);left:auto;right:calc(100% - .2rem);transform:none;text-align:right}}`;
const metricScript=`function report(){const root=document.querySelector('[data-constellation]');const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};parent.postMessage({type:'metrics',variant:document.body.dataset.variant,root:rect(root),map:rect(root.querySelector('.study-star-map')),world:rect(root.querySelector('.study-star-world')),stage:rect(root.querySelector('.study-atlas-stage'))},'*')} new ResizeObserver(()=>requestAnimationFrame(report)).observe(document.querySelector('[data-constellation]'));setTimeout(report,300);`;
for(const key of ['current',...options.map(o=>o[0])]){
 const option=options.find(o=>o[0]===key);
 const html=`<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${option?option[0]+' '+option[1]:'当前样式'} · 学习笔记星图</title><style>${data.css}\n${key==='current'?'':common+styles[key]}${litCSS}</style></head><body class="${data.bodyClass}" data-variant="${key}">${data.header}${data.html}<script>document.querySelectorAll('script[type="module"],astro-dev-toolbar').forEach(e=>e.remove());${key==='current'?'':`(${decorate.toString()})('${key}');`}\n(${installAllLit.toString()})('${key}');\n${native}\ninitStudyConstellation();\ndocument.addEventListener('click',e=>{if(e.target.closest('a')&&!e.target.closest('[data-star]'))e.preventDefault()});\nwindow.addEventListener('message',e=>{if(e.data.type==='theme')document.documentElement.dataset.theme=e.data.theme;if(e.data.type==='reset')document.querySelector('[data-star-reset]').click()});\n${metricScript}</script></body></html>`;
 fs.writeFileSync(`${dir}/${key.toLowerCase()}.html`,key==='current'?html:html.replace('</style>',mobileFix+'</style>'));
}
const index=`<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>学习笔记 · 星图样式提案</title><style>
*{box-sizing:border-box}body{margin:0;background:#101715;color:#eaf0ed;font-family:Inter,'Microsoft YaHei',sans-serif}button{font:inherit;cursor:pointer}header{padding:26px 36px 22px;border-bottom:1px solid #2a3732}header small{color:#8ec9bc;letter-spacing:.18em;font-size:10px}h1{font-family:Georgia,'SimSun',serif;font-size:30px;font-weight:400;margin:10px 0}header p{margin:0;color:#a0afa8;font-size:12px;line-height:1.8}.toolbar{display:flex;gap:20px;justify-content:space-between;align-items:center;padding:18px 36px}.tabs,.controls{display:flex;gap:6px;flex-wrap:wrap}button{color:#a0afa8;background:transparent;border:1px solid #33413b;padding:10px 14px;border-radius:5px;font-size:12px}button[aria-pressed=true]{color:#102019;background:#b9d7ca;border-color:#b9d7ca}button:hover{border-color:#8ec9bc}.caption{padding:0 36px 18px;display:flex;justify-content:space-between;align-items:baseline;gap:16px}.caption strong{font-size:14px;font-weight:500}.caption p{font-size:12px;color:#a0afa8;margin:5px 0 0}.caption output{font-size:10px;color:#8ec9bc;font-family:monospace;white-space:nowrap}.viewport{margin:0 auto 24px;position:relative;overflow:hidden;background:#0d1211;box-shadow:0 0 0 1px #33413b}iframe{position:absolute;top:0;left:0;border:0;transform-origin:0 0;background:#0d1211}footer{padding:0 36px 28px;color:#86978f;font-size:11px;line-height:1.8}a{color:#b9d7ca}button:focus-visible{outline:2px solid #8ec9bc;outline-offset:3px}@media(max-width:700px){header{padding:22px 18px}.toolbar{padding:16px 18px;align-items:start;flex-direction:column;gap:12px}.caption{padding:0 18px 18px;flex-direction:column;gap:6px}h1{font-size:25px}button{padding:9px 10px}.controls button{font-size:11px}footer{padding:0 18px 24px}}
</style></head><body><header><small>STUDY / CONSTELLATION EXPLORATIONS</small><h1>学习笔记，四种观星方式。</h1><p>默认展示 40 颗星全部点亮，可切回原状态；保持星点坐标与画布大小，比较四种星图样式。</p></header><div class="toolbar"><nav class="tabs" aria-label="选择方案">${options.map(o=>`<button data-option="${o[0]}" aria-pressed="${o[0]==='A'}">${o[0]} · ${o[1]}</button>`).join('')}<button data-option="current" aria-pressed="false">当前样式</button></nav><div class="controls"><button id="lighting" aria-pressed="true">40 颗全部点亮</button><button id="theme">切换浅色</button><button id="device">手机 390 × 844</button><button id="reset">还原星图</button></div></div><div class="caption"><div><strong id="style-name"></strong><p id="style-description"></p></div><output id="dimensions">正在测量画布…</output></div><div class="viewport"><iframe title="星图方案预览" src="a.html"></iframe></div><footer>全亮预览含 8 个真实教材入口与 32 个示例亮星，示例亮星不代表新增教材。可悬停查看教材，点击教材星展开笔记；按 Esc 或“返回完整星图”复位。预览按比例缩放，内部仍使用原页面的实际像素尺寸。<br>正式页面尚未修改。选定 A / B / C / D 后，再将样式应用到页面。 · <a id="standalone" href="a.html" target="_blank">单独打开当前方案 ↗</a></footer><script>
const options=${JSON.stringify(options)},frame=document.querySelector('iframe'),viewport=document.querySelector('.viewport');let selected='A',theme='dark',mobile=false,allLit=true;function size(){const w=mobile?390:1440,h=mobile?844:1000,scale=Math.min(1,(innerWidth-36)/w);frame.style.width=w+'px';frame.style.height=h+'px';frame.style.transform='scale('+scale+')';viewport.style.width=w*scale+'px';viewport.style.height=h*scale+'px'}function caption(){const o=options.find(o=>o[0]===selected);document.querySelector('#style-name').textContent=o?o[0]+' / '+o[2]:'原页面 / 当前星图';document.querySelector('#style-description').textContent=o?o[3]:'保留原始节点和完整背景连线，作为对照。';document.querySelector('#standalone').href=selected.toLowerCase()+'.html'}document.querySelectorAll('[data-option]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.option;document.querySelectorAll('[data-option]').forEach(x=>x.setAttribute('aria-pressed',x===b));frame.src=selected.toLowerCase()+'.html';caption()}));frame.addEventListener('load',()=>{frame.contentWindow.postMessage({type:'theme',theme},'*');frame.contentWindow.postMessage({type:'lighting',allLit},'*')});document.querySelector('#lighting').onclick=()=>{allLit=!allLit;frame.contentWindow.postMessage({type:'lighting',allLit},'*');document.querySelector('#lighting').textContent=allLit?'40 颗全部点亮':'仅点亮 8 颗教材星';document.querySelector('#lighting').setAttribute('aria-pressed',allLit)};document.querySelector('#theme').onclick=()=>{theme=theme==='dark'?'light':'dark';frame.contentWindow.postMessage({type:'theme',theme},'*');document.querySelector('#theme').textContent=theme==='dark'?'切换浅色':'切换深色'};document.querySelector('#device').onclick=()=>{mobile=!mobile;size();document.querySelector('#device').textContent=mobile?'桌面 1440 × 1000':'手机 390 × 844'};document.querySelector('#reset').onclick=()=>frame.contentWindow.postMessage({type:'reset'},'*');window.addEventListener('resize',size);window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||e.data.type!=='metrics')return;const d=e.data;document.querySelector('#dimensions').textContent='星图区域 '+Math.round(d.map.width)+' × '+Math.round(d.map.height)+' px · 原尺寸'});size();caption();
</script></body></html>`;
fs.writeFileSync(`${dir}/index.html`,index);
fs.writeFileSync(`${dir}/README.md`, `# 学习笔记星图样式样稿\n\n打开 index.html 比较四个方案。所有样稿均可离线打开。\n\n- A：疏朗星座\n- B：测绘图谱\n- C：柔光星轨\n- D：书页星标\n- current.html：原页面样式对照\n\n画布、章节尺寸、星点坐标与教材数据沿用当前页面；只修改样稿中的星点、连线和标签样式。桌面预览为 1440 × 1000，手机预览为 390 × 844。支持深浅色、悬停与点击展开教材笔记。正式源码未修改。\n`);
fs.appendFileSync(`${dir}/README.md`, '\n默认展示 40 颗星全部点亮，可切回仅点亮 8 颗教材星。额外 32 颗亮星为样式预览，不代表新增教材。全亮状态的背景星使用与教材星相同的标记，并显示完整的疏朗连接。\n');
console.log('Created comparison page + four standalone concepts + current baseline in '+dir);
