const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=path.resolve('doc/design/study-constellation-review');
 const rect=async()=>page.evaluate(()=>{const r=s=>{const b=document.querySelector(s).getBoundingClientRect();return [b.x,b.y,b.width,b.height].map(x=>Math.round(x*100)/100)};return {root:r('.journey-study-inner'),map:r('.study-star-map'),world:r('.study-star-world'),stage:r('.study-atlas-stage')}});
 for(const [width,height]of [[1440,1000],[390,844]]){
  await page.setViewportSize({width,height});let baseline;
  for(const key of ['current','a','b','c','d']){
   await page.goto(pathToFileURL(path.join(base,key+'.html')).href,{waitUntil:'load'});await page.waitForTimeout(100);
   const lit=await page.locator('.study-star').evaluateAll(stars=>stars.filter(e=>getComputedStyle(e).display!=='none').length);
   if(lit!==40)throw Error('Expected 40 lit stars: '+key+' '+lit);
   const metrics=await rect();if(!baseline)baseline=metrics;else if(JSON.stringify(metrics)!==JSON.stringify(baseline))throw Error('Size mismatch '+key+' '+width+': '+JSON.stringify({metrics,baseline}));
   for(const theme of ['dark','light']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    await page.waitForTimeout(250);
    if(key!=='current')await page.screenshot({path:path.join(base,`preview-${key}-${theme}-${width}.png`),fullPage:width<700});
   }
   await page.locator('[data-star]').first().click();await page.waitForTimeout(260);
   if(!await page.locator('[data-atlas]').evaluate(e=>e.classList.contains('is-focused')))throw Error('Click failed '+key);
   if(!await page.locator('[data-star-detail]').isVisible())throw Error('Details missing '+key);
   await page.keyboard.press('Escape');
   await page.waitForTimeout(300);
   if(await page.locator('[data-atlas]').evaluate(e=>e.classList.contains('is-focused')))throw Error('Reset failed '+key);
   if(JSON.stringify(await rect())!==JSON.stringify(baseline))throw Error('Reset geometry changed '+key+' '+JSON.stringify({actual:await rect(),baseline}));
   await page.evaluate(()=>window.setAllLit(false));
   if(await page.locator('.preview-star').evaluateAll(stars=>stars.some(e=>getComputedStyle(e).display!=='none')))throw Error('Partial state failed');
   if(JSON.stringify(await rect())!==JSON.stringify(baseline))throw Error('Lighting changed geometry');
   await page.evaluate(()=>window.setAllLit(true));
   console.log(width,key,'bounds preserved; click and Esc work',JSON.stringify(metrics.map));
  }
 }
 await page.setViewportSize({width:1440,height:1250});await page.goto(pathToFileURL(path.join(base,'index.html')).href);await page.waitForTimeout(300);
 await page.screenshot({path:path.join(base,'comparison.png'),fullPage:true});
 for(const key of ['B','C','D','current','A']){await page.locator(`[data-option="${key}"]`).click();await page.waitForTimeout(150);if(!page.frames().some(f=>f.url().endsWith(key.toLowerCase()+'.html')))throw Error('Tab failed '+key)}
 await page.locator('#theme').click();await page.locator('#device').click();await page.waitForTimeout(200);
 await page.locator('#lighting').click();
 if(await page.locator('#lighting').getAttribute('aria-pressed')!=='false')throw Error('Lighting control failed');
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Review overflow');
 await browser.close();if(errors.length)throw Error([...new Set(errors)].join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
