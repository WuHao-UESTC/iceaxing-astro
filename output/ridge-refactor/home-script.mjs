import fs from 'node:fs';
const p='src/scripts/home-journey.ts';let old=fs.readFileSync(p,'utf8').replaceAll('\r\n','\n');const start=old.indexOf('  const scrollLists =');const end=old.indexOf('  // Manual, accessible');const scroll=old.slice(start,end);const life=old.slice(old.indexOf("  home.querySelectorAll<HTMLElement>('[data-life-carousel]')"),old.lastIndexOf('  sync();'));
const top=`import { createSnowWind } from './snow-wind';
const chapterIds=['base-camp','technical-ridge','study-terrace','snowfield-traverse','night-camp'];
export function initHomeJourney() {
 const home=document.querySelector<HTMLElement>('[data-journey]');if(!home)return;
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const panels=chapterIds.map(id=>document.getElementById(id)).filter((p):p is HTMLElement=>Boolean(p));
 const links=[...home.querySelectorAll<HTMLAnchorElement>('[data-journey-link]')];
 const nav=home.querySelector<HTMLElement>('[data-journey-nav]');
 const controls=home.querySelector<HTMLElement>('.journey-chapter-controls');
 const prev=home.querySelector<HTMLButtonElement>('[data-chapter-prev]');
 const next=home.querySelector<HTMLButtonElement>('[data-chapter-next]');
 const position=home.querySelector<HTMLElement>('[data-chapter-position]');
 const nextLabel=home.querySelector<HTMLElement>('[data-chapter-next-label]');
 const currentLabel=home.querySelector<HTMLElement>('[data-ridge-current]');
 const expand=home.querySelector<HTMLButtonElement>('[data-ridge-expand]');
 const locale=home.dataset.locale ?? 'zh';
 const names=links.map(a=>a.querySelector('.ridge-node-label')?.textContent ?? '');
 const returnLabel=locale==='zh'?'返回起点':locale==='de'?'Zum Ausgangspunkt':'Back to the start';
 const wind=createSnowWind(home,reducedMotion);
 let active=0;
 function updateNavigation(){
  links.forEach((link,i)=>{link.parentElement?.classList.toggle('is-active',i===active);if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  nav?.style.setProperty('--ridge-progress',String(active/(panels.length-1)));
  if(prev)prev.disabled=active===0;
  if(position)position.textContent=String(active+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
  if(nextLabel)nextLabel.textContent=active===panels.length-1?returnLabel:names[active+1];
  if(currentLabel)currentLabel.textContent=names[active];
 }
 function closeNav(){nav?.removeAttribute('data-expanded');expand?.setAttribute('aria-expanded','false');}
 function go(index:number,animate=true,focus=true){
  if(index<0||index>=panels.length)return;
  const from=panels[active];const to=panels[index];const direction=index>=active?1:-1;const changed=index!==active;active=index;
  updateNavigation();closeNav();
  wind.show(from,to,panels,direction,animate&&changed);
  if(focus)to.querySelector<HTMLElement>('h1,h2')?.focus({preventScroll:true});
  home.dispatchEvent(new CustomEvent('journey:chapter',{detail:{id:to.id}}));
 }
 function openHash(animate=false,focus=false){
  let id:string;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  const target=document.getElementById(id);const panel=target?.closest<HTMLElement>('.snowline-panel');
  const index=panel?panels.indexOf(panel):0;if(index<0)return;go(index,animate,focus);
  if(target&&target!==panel)requestAnimationFrame(()=>target.scrollIntoView({block:'nearest',behavior:'instant'}));
 }
 function select(index:number){history.pushState(history.state,'','#'+panels[index].id);go(index);}
 prev?.addEventListener('click',()=>select(Math.max(0,active-1)));
 next?.addEventListener('click',()=>select(active===panels.length-1?0:active+1));
 expand?.addEventListener('click',()=>{const open=!nav?.hasAttribute('data-expanded');nav?.toggleAttribute('data-expanded',open);expand.setAttribute('aria-expanded',String(open));});
 nav?.addEventListener('keydown',event=>{if(event.key==='Escape'){closeNav();expand?.focus();}});
 document.addEventListener('click',event=>{
  const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
  if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const url=new URL(link.href,location.href);if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;
  let id:string;try{id=decodeURIComponent(url.hash.slice(1));}catch{return;}
  const target=document.getElementById(id);if(!target||!home.contains(target))return;
  event.preventDefault();history.pushState(history.state,'',url.hash);openHash(true,true);
 });
 window.addEventListener('hashchange',()=>openHash(true));window.addEventListener('popstate',()=>openHash(false));
 home.dataset.expeditionReady='true';if(controls)controls.hidden=false;openHash(false);
 ${scroll}
 ${life}
 const editorial=home.querySelector<HTMLElement>('[data-editorial-scroll]');
 if(editorial){
  const key='iceaxing-editorial:'+location.pathname;let manual=false;let hover=false;let focus=false;let frame=0;let last=0;let startAt=performance.now()+2200;
  const save=()=>{try{sessionStorage.setItem(key,JSON.stringify({top:editorial.scrollTop,manual}));}catch{/* optional */}};
  const restore=()=>{try{const saved=JSON.parse(sessionStorage.getItem(key)??'null');if(saved&&Number.isFinite(saved.top)){editorial.scrollTop=saved.top;manual=Boolean(saved.manual);}}catch{/* optional */}};
  restore();window.addEventListener('pageshow',restore);window.addEventListener('pagehide',save);document.addEventListener('page:leaving-start',save);
  const stopManual=()=>{manual=true;save();};
  editorial.addEventListener('wheel',stopManual,{passive:true});editorial.addEventListener('touchstart',stopManual,{passive:true});editorial.addEventListener('pointerdown',stopManual);
  editorial.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))stopManual();});
  editorial.addEventListener('pointerenter',()=>{hover=true;});editorial.addEventListener('pointerleave',()=>{hover=false;startAt=performance.now()+1800;});
  editorial.addEventListener('focusin',()=>{focus=true;});editorial.addEventListener('focusout',()=>{queueMicrotask(()=>{focus=editorial.contains(document.activeElement);startAt=performance.now()+1800;});});
  editorial.addEventListener('scroll',save,{passive:true});
  const desktop=matchMedia('(min-width:49rem) and (hover:hover) and (pointer:fine)');
  const canPlay=()=>!manual&&!hover&&!focus&&!reducedMotion.matches&&desktop.matches&&!document.hidden&&active===0&&editorial.scrollHeight>editorial.clientHeight+2&&editorial.scrollTop+editorial.clientHeight<editorial.scrollHeight-1;
  let accumulated=0;
  const tick=(time:number)=>{frame=0;const delta=last?Math.min(time-last,80):0;last=time;
   if(canPlay()){if(time>startAt){accumulated+=delta*.009;if(accumulated>=1){const step=Math.floor(accumulated);editorial.scrollTop+=step;accumulated-=step;}}frame=requestAnimationFrame(tick);}
  };
  const resume=()=>{if(!frame&&canPlay()){last=0;frame=requestAnimationFrame(tick);}};
  editorial.addEventListener('pointerleave',resume);editorial.addEventListener('focusout',()=>queueMicrotask(resume));home.addEventListener('journey:chapter',resume);document.addEventListener('visibilitychange',resume);desktop.addEventListener('change',resume);reducedMotion.addEventListener('change',resume);new ResizeObserver(resume).observe(editorial);resume();
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});window.addEventListener('pageshow',resume);
 }
}
`;
fs.writeFileSync(p,top);
