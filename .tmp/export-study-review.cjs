const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
const fs = require('node:fs');
(async () => {
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});
 await page.locator('#study-terrace').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));
 await page.waitForTimeout(250);
 const data=await page.evaluate(()=>{
  const panel=document.querySelector('#study-terrace');
  const home=panel.closest('[data-journey]').cloneNode(true);
  [...home.children].forEach(child=>{if(child.id!=='study-terrace')child.remove()});
  home.querySelectorAll('script,astro-dev-toolbar').forEach(e=>e.remove());
  const css=[...document.styleSheets].map(sheet=>{try{return [...sheet.cssRules].map(rule=>rule.cssText).join('\n')}catch{return ''}}).join('\n');
  const rect=selector=>{const r=panel.querySelector(selector).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
  return {css,html:home.outerHTML,header:document.querySelector('.site-header').outerHTML,stars:[...panel.querySelectorAll('[data-star]')].map(e=>({id:e.dataset.star,x:+e.dataset.starX,y:+e.dataset.starY,title:e.querySelector('.study-star-caption').textContent.trim()})),metrics:{root:rect('.journey-study-inner'),map:rect('.study-star-map'),world:rect('.study-star-world'),stage:rect('.study-atlas-stage')},bodyClass:document.body.className};
 });
 fs.writeFileSync('.tmp/study-review-source.json',JSON.stringify(data));
 console.log(JSON.stringify({stars:data.stars,metrics:data.metrics,cssLength:data.css.length,htmlLength:data.html.length},null,2));
 await page.screenshot({path:'.tmp/study-current-desktop.png'});
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
