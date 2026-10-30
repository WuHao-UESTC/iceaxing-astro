const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});let cases=0;
for(const reducedMotion of ['reduce','no-preference']){
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion});
 await page.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});
 const home=page.locator('[data-journey]');
 assert.equal(await home.evaluate(e=>getComputedStyle(e).scrollSnapType),'none');
 for(const delta of [10,30,80,120,240]){
  await page.locator('#base-camp').evaluate(e=>e.scrollIntoView({behavior:'instant'}));
  await page.mouse.move(720,430);await page.mouse.wheel(0,delta);await page.waitForTimeout(500);
  assert(await home.evaluate(e=>e.scrollTop)>0,`Small wheel gesture lost: ${delta}/${reducedMotion}`);cases++;
 }
 const targets=[['base-camp','.journey-featured-track'],['technical-ridge','#technical-category-list'],['technical-ridge','#technical-project-list'],['study-terrace','.study-article-list'],['night-camp','.station-timeline']];
 await page.locator('[data-star]').first().click();
 // Include currently empty life categories/recent lists and a populated, fixed-size category list.
 await page.locator('#snowfield-traverse').evaluate(panel=>{
  const empty=panel.querySelector('.life-category-empty');if(empty){const ul=document.createElement('ul');ul.className='life-category-articles';ul.innerHTML='<li><a href="#">A note</a></li>';empty.replaceWith(ul);}
  const recent=panel.querySelector('.life-recent-empty');if(recent){const ol=document.createElement('ol');ol.className='life-recent-list';ol.innerHTML='<li><a href="#">Recent note</a></li>';recent.replaceWith(ol);}
 });
 targets.push(['snowfield-traverse','.life-category-articles'],['snowfield-traverse','.life-recent-list']);
 for(const [id,selector]of targets){
  const target=selector==='.study-article-list'?page.locator('[data-topic]:not([hidden]) '+selector):page.locator('#'+id).locator(selector).first();
  await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));
  let box=await target.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+Math.min(60,box.height/2));
  let before=await home.evaluate(e=>e.scrollTop);await page.mouse.wheel(0,id==='night-camp'?-120:120);await page.waitForTimeout(500);
  assert(Math.abs(await home.evaluate(e=>e.scrollTop)-before)>0,`Non-overflowing list blocked wheel: ${id}`);cases++;
  // A genuinely long list must consume its own wheel gestures before chaining.
  await target.evaluate(e=>{e.style.maxHeight='180px';e.style.overflowY='auto';e.innerHTML=Array.from({length:30},(_,i)=>`<div style="height:70px">Row ${i}</div>`).join('');});
  await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));
  await target.evaluate(e=>e.scrollTop=150);
  box=await target.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+Math.min(60,box.height/2));
  before=await home.evaluate(e=>e.scrollTop);const listBefore=await target.evaluate(e=>e.scrollTop);
  await page.mouse.wheel(0,80);await page.waitForTimeout(500);
  assert(await target.evaluate(e=>e.scrollTop)>listBefore,`Internal scrolling broken: ${id}`);
  assert(Math.abs(await home.evaluate(e=>e.scrollTop)-before)<2,`Parent moved before list reached edge: ${id}`);cases++;
  // At the upper boundary, scrolling up must leave the list and move the chapter.
  if(id!=='base-camp'){
   await target.evaluate(e=>e.scrollTop=0);await page.waitForTimeout(250);
   before=await home.evaluate(e=>e.scrollTop);await page.mouse.wheel(0,-120);await page.waitForTimeout(500);
   assert(await home.evaluate(e=>e.scrollTop)<before,`Upper list boundary blocked: ${id}`);cases++;
  }
  if(id!=='night-camp'){
   await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));
   await target.evaluate(e=>e.scrollTop=e.scrollHeight);await page.waitForTimeout(250);
   box=await target.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+Math.min(60,box.height/2));
   before=await home.evaluate(e=>e.scrollTop);await page.mouse.wheel(0,120);await page.waitForTimeout(500);
   assert(await home.evaluate(e=>e.scrollTop)>before,`Lower list boundary blocked: ${id}`);cases++;
  }
 }
 await page.locator('#technical-ridge').evaluate(e=>e.scrollIntoView({behavior:'instant'}));
 for(let i=0;i<3;i++){
  await page.locator('[data-search-open]').click();await page.keyboard.press('Escape');
  assert(!await page.locator('html').evaluate(e=>e.classList.contains('search-is-open')));
 }
 await page.mouse.move(720,230);const before=await home.evaluate(e=>e.scrollTop);await page.mouse.wheel(0,80);await page.waitForTimeout(500);
 assert(await home.evaluate(e=>e.scrollTop)>before,'Wheel blocked after closing search');cases++;
 await page.locator('[data-journey-link="technical-ridge"]').click();
 await page.waitForFunction(()=>Math.abs(document.querySelector('#technical-ridge').getBoundingClientRect().top-document.querySelector('[data-journey]').getBoundingClientRect().top)<2);
 cases++;await page.close();
}
const touch=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await touch.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});
assert.notEqual(await touch.locator('[data-journey]').evaluate(e=>getComputedStyle(e).scrollSnapType),'none');
await browser.close();console.log(`PASS: ${cases} real wheel scenarios; small gestures, non-overflowing and long lists, both boundaries, search close, chapter navigation; touch snapping retained.`);
})().catch(error=>{console.error(error);process.exit(1)});
