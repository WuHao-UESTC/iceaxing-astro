const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('http://localhost:4321/');await page.locator('astro-dev-toolbar').evaluate(el=>el.remove()).catch(()=>{});
 await page.screenshot({path:'.tmp/welcome-live-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'.tmp/welcome-live-desktop.png',fullPage:true});
 await page.locator('[data-theme-toggle]').click();await page.screenshot({path:'.tmp/welcome-live-light.png',fullPage:true});
 const theme=await page.evaluate(()=>document.documentElement.dataset.theme);
 await page.click('[data-choice=blog]');await page.waitForURL('**/blog*');
 if((await page.evaluate(()=>document.documentElement.dataset.theme))!==theme)throw Error('Theme did not persist');
 await page.locator('.language-menu summary').click();await page.locator('.language-options a[lang=en]').click();
 await page.waitForURL('**/en/blog*');console.log('Blog language switch: /en/blog');
 await page.goto('http://localhost:4321/');await page.locator('[data-choice=blog]').focus();await page.waitForTimeout(100);if(await page.locator('[data-welcome]').getAttribute('data-route')!=='blog')throw Error('Keyboard focus route');
 for(const locale of ['en','de']){await page.setViewportSize({width:320,height:844});await page.goto('http://localhost:4321/'+locale);for(const a of await page.locator('[data-choice]').all()){const box=await a.boundingBox();if(!box||box.x<0||box.x+box.width>320)throw Error('Clipped '+locale)}await page.click('[data-choice=resume]');await page.waitForURL('**/'+locale+'/profile');console.log(locale,'mobile resume: OK');}
 console.log('Theme persistence, keyboard route, locale links: OK');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
