import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8'); const write=(p,s)=>fs.writeFileSync(p,s);
let p='src/components/WelcomePage.astro',s=read(p);
const front=s.slice(0,s.indexOf('<main')).replace("import { welcomeDesktopLayers, welcomeMobileLayers } from '../data/welcome-terrain';", "import ExpeditionMountain from './home/ExpeditionMountain.astro';\nimport '../styles/welcome.css';");
const header=s.slice(s.indexOf('    <header class="welcome-header"'),s.indexOf('    <section class="welcome-copy"'));
const content=s.slice(s.indexOf('    <section class="welcome-copy"'),s.indexOf('    <footer class="welcome-footer"'));
const footer=s.slice(s.indexOf('    <footer class="welcome-footer"'),s.indexOf('  </div>\n  <svg'));
write(p,front+`<main class="welcome" id="main-content" data-welcome data-route="" data-pagefind-body data-no-page-motion tabindex="-1">
 <div class="welcome-shell">
 ${header}
 <div class="welcome-stage">
 ${content}
 <aside class="welcome-illustration"><ExpeditionMountain id="welcome-mountain" /></aside>
 </div>
 ${footer}
 </div>
</main>
<script>
 const welcome = document.querySelector<HTMLElement>('[data-welcome]');
 if (welcome) {
   const update = () => {
     const focused = document.activeElement?.closest<HTMLElement>('[data-choice]');
     const hovered = welcome.querySelector<HTMLElement>('[data-choice]:hover');
     welcome.dataset.route = (focused ?? hovered)?.dataset.choice ?? '';
   };
   welcome.querySelectorAll('[data-choice]').forEach(link => {
     ['pointerenter','pointerleave','focus','blur'].forEach(event => link.addEventListener(event, () => requestAnimationFrame(update)));
   });
 }
</script>
`);
p='src/i18n/welcome.ts';s=read(p).replace('很高兴，在这里遇见你。','很高兴，在雪线之上遇见你。').replace('技术、阅读与不期而遇的想法。','技术、学习、日常与沿途随记。').replace('Glad our paths crossed.','Glad our paths crossed, above the snowline.').replace('Schön, dass du hier bist.','Schön, dir über der Schneegrenze zu begegnen.');write(p,s);
p='src/components/HomePage.astro';s=read(p).replace("import '../styles/chapter-transition.css';\n",'').replace("import ChapterLandscape from './home/ChapterLandscape.astro';\n",'').replace(/    <ChapterLandscape scene="(?:cover|ridge)" \/>\r?\n/g,'');write(p,s);
for(const [file,component,stylesheet] of [['StudyTerrace','StudyLandscape',null],['SnowfieldTraverse','LifeLibraryLandscape','life-library'],['NightCamp','WaystationLandscape','waystation-notes']]){
 p=`src/components/home/${file}.astro`;s=read(p).replace(new RegExp(`import ${component} from '[^']+';\\r?\\n`),'').replace(`<${component} />`,'');
 if(stylesheet)s=s.replace(`import '../../styles/${stylesheet}.css';`,'');
 s=s.replace('<div class="station-ladder" aria-hidden="true"></div>','');
 if(file==='StudyTerrace')s=s.replace('<span>4700m</span>','<span>ATLAS / 03</span>').replace('data-star-switch hidden','data-star-switch');
 if(file==='SnowfieldTraverse')s=s.replace('SNOW MOUNTAIN RIFT','SNOWFIELD JOURNAL').replace(/<svg\s+class="life-tethers"[\s\S]*?<\/svg>/,'').replace(/<svg\s+class="life-shard"[\s\S]*?<\/svg>/g,'<span class="life-landing-arrow" aria-hidden="true">↗</span>');
 write(p,s);
}
p='src/components/home/JourneyNavigation.astro';s=read(p).replace('<b>{chapter.altitude}</b>','<b>{String(index + 1).padStart(2, \'0\')}</b>');write(p,s);
p='src/components/home/ChapterMarker.astro';s=read(p).replace('const { number, altitude, label }','const { number, label }').replace('<strong>{altitude}</strong>','<strong>EXPEDITION / {number}</strong>');write(p,s);
p='src/components/home/SnowlineHero.astro';s=read(p).replace("import ChapterMarker", "import ExpeditionMountain from './ExpeditionMountain.astro';\nimport ChapterMarker");
s=s.replace('  <div class="journey-hero-stage">',`  <div class="expedition-masthead"><span>ABOVE THE SNOWLINE</span><strong>ICEAXING<span>.</span></strong><span>{locale === 'zh' ? '雪线之上 · 个人远征记录' : locale === 'de' ? 'ÜBER DER SCHNEEGRENZE' : 'A PERSONAL EXPEDITION'}</span></div>
  <div class="journey-hero-stage">`);
s=s.replace('{labels.heroTitle}',"{locale === 'zh' ? '循着好奇，向雪线之上。' : locale === 'de' ? 'Der Neugier folgen. Weiter hinauf.' : 'Follow curiosity. Above the snowline.'}");
s=s.replace('      <div class="journey-hero-links"',`      <a class="expedition-primary" href="#technical-ridge">{locale === 'zh' ? '开始探索' : locale === 'de' ? 'Entdecken' : 'Start exploring'} <span aria-hidden="true">↗</span></a>
      <div class="journey-hero-links"`);
s=s.replace('class="journey-featured-track"','class="journey-featured-track" data-featured-track');
s=s.replace('<strong>{card.title}</strong>\n              <i', '<small>{card.meta}</small><strong>{card.title}</strong><p>{card.description}</p>\n              <i');
s=s.replace('        </div>\n      </section>',`        </div>
        {featured.length > 1 && <div class="edition-controls" data-featured-controls hidden><button type="button" data-featured-direction="-1" aria-controls="hero-featured-list" aria-label={locale === 'zh' ? '上一篇精选' : locale === 'de' ? 'Vorheriger Artikel' : 'Previous article'}>←</button><span data-featured-status aria-live="polite"></span><button type="button" data-featured-direction="1" aria-controls="hero-featured-list" aria-label={locale === 'zh' ? '下一篇精选' : locale === 'de' ? 'Nächster Artikel' : 'Next article'}>→</button></div>}
      </section>`);
s=s.replace('    </div>\n  </div>\n\n  {destinations','    </div>\n    <div class="journey-hero-art"><ExpeditionMountain id="home-mountain" /></div>\n  </div>\n\n  {destinations');write(p,s);
// Keep established list and category pagination, remove the old terrain tether dependency.
p='src/scripts/home-journey.ts';s=read(p);const controls=s.slice(s.indexOf('  const scrollLists ='),s.indexOf('  function activate('));
write(p,`const chapterIds = ['base-camp', 'technical-ridge', 'study-terrace', 'snowfield-traverse', 'night-camp'];
export function initHomeJourney() {
 const home = document.querySelector<HTMLElement>('[data-journey]');
 if (!home) return;
 const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
 const panels = chapterIds.map(id=>document.getElementById(id)).filter((p): p is HTMLElement=>Boolean(p));
 const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-journey-link]')];
 const activate = (panel: HTMLElement) => {
   panels.forEach(p=>p.classList.toggle('is-active',p===panel));
   links.forEach(link=>{
     const active=link.dataset.journeyLink===panel.id;
     link.parentElement?.classList.toggle('is-active',active);
     if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
   });
 };
 const seen=new WeakSet<Element>();
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if(!entry.isIntersecting || seen.has(entry.target)) return;
     seen.add(entry.target);
     if(!reducedMotion.matches && entry.target.id!=='base-camp') {
       entry.target.querySelectorAll<HTMLElement>('.journey-chapter-heading, .journey-section-label, .station-stops').forEach((el,i)=>{
         const animation=el.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,delay:i*50,easing:'ease-out'});
         reducedMotion.addEventListener('change',()=>animation.cancel(),{once:true});
       });
     }
   });
 },{threshold:.12});
 panels.forEach(p=>observer.observe(p));
 let pending=false;
 const sync=()=>{
   pending=false;
   const line= Math.min(innerHeight*.35,260);
   const active=panels.filter(p=>p.getBoundingClientRect().top<=line).at(-1) ?? panels[0];
   if(active) activate(active);
 };
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(sync);}},{passive:true});
 const navigate=()=>{
   let id: string;
   try { id=decodeURIComponent(location.hash.slice(1)); } catch { return; }
   const target=document.getElementById(id);
   if(target && home.contains(target)) {target.scrollIntoView({behavior:'instant'});sync();}
 };
 window.addEventListener('hashchange',navigate);
 window.addEventListener('popstate',navigate);
 document.addEventListener('click',event=>{
   const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
   if(!link || event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target!=='_self')) return;
   const url=new URL(link.href,location.href);
   if(url.origin!==location.origin || url.pathname!==location.pathname || url.search!==location.search || !url.hash) return;
   let id: string; try{id=decodeURIComponent(url.hash.slice(1));}catch{return;}
   const target=document.getElementById(id); if(!target || !home.contains(target)) return;
   event.preventDefault(); history.pushState(null,'',url.hash);
   target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});
   const heading=target.matches('h1,h2')?target:target.querySelector<HTMLElement>('h1,h2');
   heading?.focus({preventScroll:true});
 });
 ${controls}
 // Manual, accessible selected-article pagination; all links remain available without JS.
 const track=home.querySelector<HTMLElement>('[data-featured-track]');
 const featured=[...home.querySelectorAll<HTMLElement>('.journey-featured-card')];
 const controls=home.querySelector<HTMLElement>('[data-featured-controls]');
 let current=0;
 const updateFeatured=()=>{
   featured.forEach((item,i)=>{item.hidden=i!==current;});
   const status=home.querySelector<HTMLElement>('[data-featured-status]');
   if(status) status.textContent=String(current+1).padStart(2,'0')+' / '+String(featured.length).padStart(2,'0');
   controls?.querySelectorAll<HTMLButtonElement>('[data-featured-direction]').forEach(button=>{
     button.disabled=Number(button.dataset.featuredDirection)<0?current===0:current===featured.length-1;
   });
 };
 if(track && featured.length>1){
   if(controls) controls.hidden=false;
   updateFeatured();
   controls?.querySelectorAll<HTMLButtonElement>('[data-featured-direction]').forEach(button=>button.addEventListener('click',()=>{
     current=Math.max(0,Math.min(featured.length-1,current+Number(button.dataset.featuredDirection)));
     updateFeatured();
     if(!reducedMotion.matches) featured[current]?.animate([{opacity:0,transform:'translateX(10px)'},{opacity:1,transform:'translateX(0)'}],{duration:200});
   }));
 }
 home.querySelectorAll<HTMLElement>('[data-life-carousel]').forEach(carousel=>{
   const track=carousel.querySelector<HTMLElement>('.life-landings');
   const landings=[...carousel.querySelectorAll<HTMLElement>('.life-landing')];
   const controls=carousel.querySelector<HTMLElement>('[data-life-controls]');
   const compact=matchMedia('(max-width:48rem)');
   let pages: HTMLElement[]=[]; let page=0;
   if(!track) return;
   const update=()=>{
     page=Math.max(0,Math.min(pages.length-1,Math.round(track.scrollLeft/Math.max(1,track.clientWidth))));
     pages.forEach((p,i)=>{p.inert=i!==page;});
     const status=carousel.querySelector<HTMLElement>('[data-life-status]');if(status)status.textContent=(page+1)+' / '+pages.length;
     controls?.querySelectorAll<HTMLButtonElement>('[data-life-direction]').forEach(button=>{button.disabled=Number(button.dataset.lifeDirection)<0?page===0:page===pages.length-1;});
   };
   const regroup=()=>{
     const first=page*(pages[0]?.children.length || 4);const size=compact.matches?2:4;
     pages=[];track.replaceChildren();
     for(let i=0;i<landings.length;i+=size){const p=document.createElement('div');p.className='life-landing-page';p.dataset.lifePage='';p.append(...landings.slice(i,i+size));track.append(p);pages.push(p);}
     page=Math.min(Math.floor(first/size),Math.max(0,pages.length-1));
     if(controls)controls.hidden=pages.length<2;
     track.scrollTo({left:page*track.clientWidth,behavior:'instant'});update();
   };
   regroup();compact.addEventListener('change',regroup);
   controls?.querySelectorAll<HTMLButtonElement>('[data-life-direction]').forEach(button=>button.addEventListener('click',()=>{
     const next=Math.max(0,Math.min(pages.length-1,page+Number(button.dataset.lifeDirection)));
     track.scrollTo({left:next*track.clientWidth,behavior:reducedMotion.matches?'instant':'smooth'});
   }));
   track.addEventListener('scroll',update,{passive:true});
   new ResizeObserver(()=>{track.scrollTo({left:page*track.clientWidth,behavior:'instant'});update();}).observe(track);
 });
 sync(); if(location.hash)requestAnimationFrame(navigate);
}
`);
// Keep the textbook index available in overview and preserve document scroll.
p='src/scripts/study-constellation.ts';s=read(p).replace('switcher.hidden = true;','switcher.hidden = false;').replace('const top = journey?.scrollTop;','const top = window.scrollY;').replace("if (!journey || top === undefined) return;\n        journey.scrollTo({ top, behavior: 'instant' });\n        requestAnimationFrame(() => journey.scrollTo({ top, behavior: 'instant' }));", "window.scrollTo({ top, behavior: 'instant' });\n        requestAnimationFrame(() => window.scrollTo({ top, behavior: 'instant' }));").replace("      const journey = root.closest<HTMLElement>('[data-journey]');\n",'').replace('`${compact ? stage.clientHeight : root.clientHeight}px`','`${stage.clientHeight}px`');write(p,s);
// Natural page scrolling and footer on both localized home routes.
for(p of ['src/pages/blog.astro','src/pages/[locale]/blog.astro'])write(p,read(p).replace(/  fullViewport\r?\n/,''));
// Bounded entrance, ordinary document navigation without an exit delay.
p='src/scripts/page-motion.ts';s=read(p).replace("    link.hasAttribute('download') ||", "    document.querySelector('[data-journey], [data-welcome]') ||\n    link.hasAttribute('download') ||");write(p,s);
p='src/scripts/motion.ts';s=read(p).replace("'0 16px'","'0 8px'").replace('landscape ? 560 : 460','landscape ? 400 : 300').replace('entering ? 300 : 144','entering ? 200 : 144');write(p,s);
console.log('Components and behavior updated');
