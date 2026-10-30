const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
const fs=require('node:fs');
const record=process.argv.includes('--record');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage();await page.emulateMedia({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const baseline=record?{}:JSON.parse(fs.readFileSync('.tmp/study-a-baseline.json','utf8'));
 for(const [width,height]of [[1440,1000],[1440,800],[1024,768],[768,1024],[390,844],[320,844]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});
  const panel=page.locator('#study-terrace');await panel.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));await page.waitForTimeout(150);
  await page.locator('astro-dev-toolbar').evaluateAll(es=>es.forEach(e=>e.remove()));
  const metrics=await panel.evaluate(p=>{const rect=s=>{const r=p.querySelector(s).getBoundingClientRect();return [r.x,r.y,r.width,r.height].map(n=>Math.round(n*100)/100)};return {root:rect('.journey-study-inner'),map:rect('.study-star-map'),world:rect('.study-star-world'),stage:rect('.study-atlas-stage')}});
  const key=`${width}x${height}`;
  if(record){baseline[key]=metrics;continue}
  if(JSON.stringify(metrics)!==JSON.stringify(baseline[key]))throw Error('Changed dimensions '+key+' '+JSON.stringify({metrics,before:baseline[key]}));
  for(const theme of ['dark','light']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);await page.waitForTimeout(220);
   const stars=panel.locator('[data-star]'),count=await stars.count();
   if(count!==8)throw Error('Lighting count changed');
   const lines=panel.locator('.study-star-network line');if(await lines.count()!==39)throw Error('Unexpected network density');
   if([1440,390].includes(width)&&height!==800)await page.screenshot({path:`.tmp/study-a-${theme}-${width}.png`});
   for(let index=0;index<count;index++){
    const star=stars.nth(index),id=await star.getAttribute('data-star');await star.click();await page.waitForTimeout(100);
    if(await star.getAttribute('aria-expanded')!=='true'||!await panel.locator(`[data-topic="${id}"]`).isVisible())throw Error('Wrong detail '+id);
    if(!await panel.locator('.study-star-network .is-near-selected').count())throw Error('Missing selected edges');
    await panel.locator('[data-star-select]').selectOption(await stars.nth((index+1)%count).getAttribute('data-star'));
    await panel.locator('[data-star-reset]').click();await page.waitForTimeout(100);
    if(await panel.locator('[data-atlas]').evaluate(e=>e.classList.contains('is-focused')))throw Error('Reset failed');
   }
   await stars.first().focus();await page.keyboard.press('Enter');await page.waitForTimeout(100);await page.keyboard.press('Escape');await page.waitForTimeout(100);
   if(await panel.locator('[data-atlas]').evaluate(e=>e.classList.contains('is-focused')))throw Error('Keyboard reset failed');
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
  }
  console.log(key,'unchanged bounds; both themes; all 8 details, switching and keyboard OK');
 }
 if(record){fs.writeFileSync('.tmp/study-a-baseline.json',JSON.stringify(baseline));console.log('Recorded bounds at 6 viewport sizes')}
 await browser.close();if(errors.length)throw Error(errors.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
