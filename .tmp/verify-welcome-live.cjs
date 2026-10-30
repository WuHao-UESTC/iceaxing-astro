const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
const fs = require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:4321/',{waitUntil:'networkidle'});
 await page.locator('.choice').first().waitFor();
 await page.locator('[data-theme-toggle]').click();
 await page.waitForTimeout(800);
 await page.screenshot({path:'.tmp/welcome-live-desktop.png',fullPage:true});
 console.log('desktop',await page.evaluate(()=>({h1:document.querySelector('h1').textContent,links:[...document.querySelectorAll('[data-choice]')].map(a=>a.getAttribute('href')),overflow:document.documentElement.scrollWidth>innerWidth,theme:document.documentElement.dataset.theme})));
 await page.hover('[data-choice=resume]');await page.waitForTimeout(100);console.log('hover',await page.locator('[data-welcome]').getAttribute('data-route'));
 await page.click('[data-choice=resume]');await page.waitForURL('**/profile');console.log('resume',page.url());
 await page.goto('http://localhost:4321/');await page.click('[data-choice=blog]');await page.waitForURL('**/blog');console.log('blog',{url:page.url(),panels:await page.locator('.snowline-panel').count()});
 await page.goto('http://localhost:4321/#study-terrace');await page.waitForURL('**/blog#study-terrace');await page.waitForTimeout(1000);console.log('legacy',await page.evaluate(()=>({url:location.pathname+location.hash,scroll:document.querySelector('[data-journey]').scrollTop})));
 for(const locale of ['en','de']){await page.goto('http://localhost:4321/'+locale);console.log(locale,await page.locator('#welcome-title').textContent(),await page.locator('[data-choice=blog]').getAttribute('href'));}
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.goto('http://localhost:4321/');await page.waitForTimeout(800);console.log('mobile',width,await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,columns:getComputedStyle(document.querySelector('.choices')).gridTemplateColumns,linkRects:[...document.querySelectorAll('[data-choice]')].map(a=>{const r=a.getBoundingClientRect();return{x:r.x,right:r.right,bottom:r.bottom}})})));if(width===390)await page.screenshot({path:'.tmp/welcome-live-mobile.png',fullPage:true});}
 await page.emulateMedia({reducedMotion:'reduce'});console.log('reduced motion',await page.locator('.host').evaluate(el=>getComputedStyle(el).animationName));
 const nojs=await browser.newContext({javaScriptEnabled:false});const plain=await nojs.newPage();await plain.goto('http://localhost:4321/');await plain.click('[data-choice=blog]');console.log('nojs',plain.url());
 console.log('page errors',errors);if(errors.length)process.exitCode=1;
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

