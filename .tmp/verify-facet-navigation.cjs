const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try {
  const p=await b.newPage({viewport:{width:1440,height:900}});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:4321/blog#study-terrace',{waitUntil:'networkidle'});await p.waitForTimeout(950);
  assert.equal(await p.locator('.snowline-panel.is-active').getAttribute('id'),'study-terrace');
  await p.keyboard.press('PageUp');await p.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
  assert.equal(await p.locator('.snowline-panel.is-active').getAttribute('id'),'technical-ridge');
  await p.locator('.desktop-navigation a[href$="#snowfield-traverse"]').click();await p.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
  assert.equal(await p.locator('.snowline-panel.is-active').getAttribute('id'),'snowfield-traverse');
  await p.goBack();await p.waitForTimeout(1000);
  assert.equal(await p.locator('.snowline-panel.is-active').getAttribute('id'),'technical-ridge');
  console.log('Deep link, keyboard, header links and browser history OK');
  await p.locator('[data-journey-link="study-terrace"]').evaluate(e=>e.click());
  await p.waitForFunction(()=>document.getAnimations().some(a=>a.effect?.pseudoElement));
  await p.locator('.desktop-navigation a[href="/profile"]').click({noWaitAfter:true});
  await p.waitForURL('**/profile');await p.waitForTimeout(900);
  assert.equal(await p.locator('main').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await p.locator('.journey-facet-seam').count(),0);
  await p.goBack();await p.waitForTimeout(1100);
  assert.equal(await p.locator('[data-chapter-transition]').count(),0);
  assert.equal(await p.locator('main').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.deepEqual(errors,[]);
  console.log('Cross-page fade during chapter animation and return OK');
  for(const locale of ['en','de']) {
   await p.goto('http://127.0.0.1:4321/'+locale+'/blog',{waitUntil:'networkidle'});await p.waitForTimeout(850);
   await p.locator('[data-journey-link="night-camp"]').click();await p.waitForFunction(()=>!document.querySelector('[data-chapter-transition]'));
   assert.equal(await p.locator('.snowline-panel.is-active').getAttribute('id'),'night-camp');
  }
  console.log('English and German chapter navigation OK');
  const context=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const m=await context.newPage();await m.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});await m.waitForTimeout(900);
  const session=await context.newCDPSession(m);
  const swipe=async()=>{
   await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:650}]});
   for(let y=630;y>=240;y-=30){await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y}]});await m.waitForTimeout(16)}
   await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await m.waitForTimeout(1100);
  };
  const tall=await m.locator('[data-journey]').evaluate(e=>({height:e.clientHeight,hero:document.getElementById('base-camp').offsetHeight}));
  if(tall.hero>tall.height+1){await swipe();assert(await m.locator('[data-journey]').evaluate(e=>e.scrollTop)>0);}
  await m.evaluate(()=>{const h=document.querySelector('[data-journey]'),p=document.getElementById('base-camp');h.scrollTo({top:p.offsetHeight-h.clientHeight,behavior:'instant'})});await m.waitForTimeout(100);
  await swipe();
  assert.equal(await m.locator('.snowline-panel.is-active').getAttribute('id'),'technical-ridge');
  await m.screenshot({path:'.tmp/facet-mobile-final.png'});
  console.log('Real touch gesture: tall chapter reading and edge transition OK');
  const plain=await b.newContext({javaScriptEnabled:false});const j=await plain.newPage();await j.goto('http://127.0.0.1:4321/blog');await j.locator('[data-journey-link="study-terrace"]').click();assert(j.url().endsWith('#study-terrace'));assert.equal(await j.locator('main').evaluate(e=>getComputedStyle(e).opacity),'1');
  console.log('No-JavaScript anchors remain available');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exit(1)});
