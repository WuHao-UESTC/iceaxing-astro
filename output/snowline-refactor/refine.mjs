import fs from 'node:fs';
const r=p=>fs.readFileSync(p,'utf8');const w=(p,s)=>fs.writeFileSync(p,s);
let p='src/components/WelcomePage.astro';w(p,r(p).replace('{copy.title}',"{locale === 'zh' ? <>很高兴，<br />在雪线之上遇见你。</> : copy.title}"));
p='src/components/home/SnowlineHero.astro';w(p,r(p).replace("{locale === 'zh' ? '循着好奇，向雪线之上。'", "{locale === 'zh' ? <>循着好奇，<br />向雪线之上。</>"));
// Unify the semantic accent families rather than override tool result colors or media.
for(p of ['src/styles/reading.css','src/styles/listing.css','src/styles/people.css']){
 let s=r(p);s=s.replace(/(--(?:reader|archive)-(?:blue|gold|coral|violet|study)|--people-accent): #[0-9a-fA-F]{6};/g,'$1: var(--expedition-red);');w(p,s);
}
p='src/components/tools/ToolPage.astro';let s=r(p).replace(/^import TerrainFacets .*\r?\n/m,'').replace(/^import \{ coverMesh \} .*\r?\n/m,'');s=s.replace('<TerrainFacets faces={coverMesh} />',`<g fill="none" stroke="var(--expedition-red)" stroke-width="1">
 {Array.from({length:16},(_,i)=><path d={\`M0 \${500+i*19}Q220 \${340+i*19} 390 \${430+i*16}T760 \${320+i*16}T1440 \${380+i*16}\`} />)}
 </g>`);w(p,s);
p='src/components/content/FolderLandscape.astro';s=r(p);const front=s.slice(0,s.indexOf('<svg'));w(p,front+`<svg class={\`archive-folder-landscape landscape-\${group}\`} viewBox="0 0 1000 340" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
 <g stroke="currentColor" stroke-width=".8" opacity=".35">
 {Array.from({length:12},(_,i)=><path d={\`M-40 \${255+i*13}C100 \${225+i*13} 142 \${90+i*13} 275 \${167+i*13}S438 \${270+i*8} 548 \${113+i*13}S730 \${150+i*13} 1040 \${210+i*13}\`} />)}
 </g>
 <circle cx="828" cy="79" r="45" stroke="currentColor" opacity=".4" />
 <path d="M56 290C196 250 251 281 369 245S525 206 614 234S790 275 951 224" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 7" />
 <g fill="currentColor">{[[196,267],[369,245],[614,234],[790,252]].map(([x,y])=><rect x={x} y={y} width="5" height="5" />)}</g>
</svg>\n`);
