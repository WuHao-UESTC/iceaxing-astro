const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const errors=[];
 const page=await browser.newPage({reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 for(const [width,height]of [[1440,1000],[1440,800],[1366,768],[1024,768],[768,1024],[390,844],[320,640]]){
  await page.setViewportSize({width,height});await page.goto(`http://127.0.0.1:4321/blog?size=${width}-${height}#study-terrace`,{waitUntil:'networkidle'});
  await page.locator('astro-dev-toolbar').evaluateAll(es=>es.forEach(e=>e.remove()));
  const panel=page.locator('#study-terrace');
  for(const state of ['overview','focused','reset']){
   if(state==='focused')await panel.locator('[data-star]').first().click();
   if(state==='reset')await panel.locator('[data-star-reset]').click();
   await page.waitForTimeout(150);
   const sizes=await panel.evaluate(p=>{const home=p.closest('[data-journey]'),inner=p.querySelector('.journey-study-inner'),atlas=p.querySelector('.study-atlas'),footer=p.querySelector('.study-atlas-footer'),stage=p.querySelector('.study-atlas-stage');return {viewport:home.clientHeight,panel:p.clientHeight,panelScroll:p.scrollHeight,inner:inner.clientHeight,innerScroll:inner.scrollHeight,stage:stage.clientHeight,atlas:atlas.clientHeight,footerBottom:footer.getBoundingClientRect().bottom,chapterBottom:p.getBoundingClientRect().bottom,world:p.querySelector('.study-star-world').clientHeight,map:p.querySelector('.study-star-map').clientHeight,detail:p.querySelector('.study-detail').clientHeight}});
   assert(Math.abs(sizes.viewport-sizes.panel)<=1,`Chapter exceeds screen ${width}/${state}: ${JSON.stringify(sizes)}`);
   assert(sizes.innerScroll<=sizes.inner+1,`Inner overflow ${width}/${state}: ${JSON.stringify(sizes)}`);
   assert(sizes.footerBottom<=sizes.chapterBottom+1,`Footer clipped ${width}/${state}`);
   assert(sizes.stage>0,`No room for chart ${width}/${state}`);
   if(width<=768&&state!=='focused')assert(Math.abs(sizes.world-sizes.map)<=1,`Wrong mobile canvas ${width}/${state}`);
   if(state==='focused')assert(sizes.detail>0,'No details');
   if([1366,390,320].includes(width)&&state!=='reset')await page.screenshot({path:`.tmp/fixed-study-${width}-${state}.png`});
  }
  console.log(`${width}x${height}: overview, details and reset fit exactly one screen`);
 }
 await page.close();
 for(const reducedMotion of ['reduce','no-preference']){
  const p=await browser.newPage({viewport:{width:1440,height:900},reducedMotion});p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});
  const home=p.locator('[data-journey]');
  const settle=async()=>{await p.waitForFunction(()=>!document.querySelector('[data-journey]').hasAttribute('data-chapter-transition'));await p.waitForTimeout(300)};
  const jump=async id=>{await p.locator(`[data-journey-link="${id}"]`).click();await settle()};
  const active=()=>home.evaluate(e=>e.querySelector('.snowline-panel.is-active').id);
  await p.mouse.move(720,380);
  await p.mouse.wheel(0,12000);await settle();assert.equal(await active(),'technical-ridge','Large event skipped chapters');
  await p.mouse.wheel(0,10);await settle();assert.equal(await active(),'study-terrace','New small gesture did not advance one chapter');
  await p.mouse.wheel(0,-12000);await settle();assert.equal(await active(),'technical-ridge','Large reverse event skipped chapters');
  await jump('base-camp');await p.mouse.move(720,380);
  for(let i=0;i<28;i++){await p.mouse.wheel(0,i<20?600:5);await p.waitForTimeout(45)}
  await settle();assert.equal(await active(),'technical-ridge','Inertia after animation triggered another turn');
  await p.mouse.wheel(0,120);await settle();assert.equal(await active(),'study-terrace','Gesture did not rearm');
  for(const deltaMode of [0,1,2]){
   await jump('base-camp');await home.evaluate((el,mode)=>el.dispatchEvent(new WheelEvent('wheel',{deltaY:10000,deltaMode:mode,bubbles:true,cancelable:true})),deltaMode);await settle();
   assert.equal(await active(),'technical-ridge','Delta mode skipped chapters '+deltaMode);
  }
  await jump('study-terrace');await p.locator('#study-terrace [data-star]').first().click();await p.waitForTimeout(200);
  const list=p.locator('.study-topic-panel:not([hidden]) .study-article-list');
  await list.evaluate(el=>{el.style.height='120px';el.style.maxHeight='120px';el.innerHTML=Array.from({length:30},(_,i)=>`<div style="height:50px">Note ${i}</div>`).join('');el.scrollTop=100});
  const box=await list.boundingBox();await p.mouse.move(box.x+box.width/2,box.y+Math.min(box.height/2,40));await p.mouse.wheel(0,90);await settle();
  assert.equal(await active(),'study-terrace','Wheel escaped nested list');assert(await list.evaluate(e=>e.scrollTop)>100,'Nested list did not scroll');
  await list.evaluate(e=>e.scrollTop=e.scrollHeight);await p.mouse.wheel(0,12000);await settle();assert.equal(await active(),'snowfield-traverse','List boundary did not turn one chapter');
  console.log(reducedMotion+': huge/small deltas, reverse, long inertia, pixel/line/page modes and nested list boundaries OK');await p.close();
 }
 await browser.close();if(errors.length)throw Error(errors.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
