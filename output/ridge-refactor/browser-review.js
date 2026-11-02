async (page) => {
 const base='http://127.0.0.1:4321';const results=[];const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'/blog');await page.waitForSelector('[data-expedition-ready]');await page.waitForTimeout(750);
 const record=async(name,condition)=>{results.push({name,passed:Boolean(await condition)});};
 await record('one chapter visible',(await page.locator('.snowline-panel:not([hidden])').count())===1);
 await record('desktop fits one viewport',await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1&&Math.abs(document.querySelector('.snowline-home').getBoundingClientRect().bottom-innerHeight)<2));
 await page.mouse.move(500,180);await page.evaluate(()=>{sessionStorage.removeItem('iceaxing-editorial:'+location.pathname);});await page.reload();await page.waitForTimeout(3600);
 const automatic=await page.locator('[data-editorial-scroll]').evaluate(e=>e.scrollTop);await record('idle auto scroll',automatic>0);
 await page.locator('[data-editorial-scroll]').hover();const paused=await page.locator('[data-editorial-scroll]').evaluate(e=>e.scrollTop);await page.waitForTimeout(700);await record('hover pauses',Math.abs(await page.locator('[data-editorial-scroll]').evaluate(e=>e.scrollTop)-paused)<2);
 await page.mouse.wheel(0,140);await page.waitForTimeout(400);const manual=await page.locator('[data-editorial-scroll]').evaluate(e=>e.scrollTop);await page.mouse.move(500,180);await page.waitForTimeout(2300);await record('manual remains stopped',Math.abs(await page.locator('[data-editorial-scroll]').evaluate(e=>e.scrollTop)-manual)<2);await record('wheel never turns chapter',await page.locator('#base-camp').isVisible());
 await page.goto(base+'/about');await page.goBack();await page.waitForSelector('[data-expedition-ready]');await record('return restores selection position',Math.abs(await page.locator('[data-editorial-scroll]').evaluate(e=>e.scrollTop)-manual)<3);
 for(const theme of ['light','dark']){await page.evaluate(t=>{localStorage.setItem('iceaxing-theme',t);document.documentElement.dataset.theme=t;},theme);
  for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:width===1440?1000:844});await page.goto(base+'/blog');await page.waitForTimeout(700);await record('no horizontal overflow '+theme+' '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));await page.screenshot({path:'output/playwright/ridge-cover-'+theme+'-'+width+'.png'});}
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/blog');
 for(const id of ['technical-ridge','study-terrace','snowfield-traverse','night-camp']){await page.locator('[data-journey-link="'+id+'"]').click();await page.waitForTimeout(650);await record('chapter '+id,await page.locator('#'+id).isVisible()&&await page.locator('.snowline-panel:not([hidden])').count()===1);await page.screenshot({path:'output/playwright/ridge-'+id+'.png'});}
 await record('last chapter has explicit return',(await page.locator('[data-chapter-next]').innerText()).includes('返回起点'));await page.locator('[data-chapter-next]').click();await page.waitForTimeout(600);await record('return to start',await page.locator('#base-camp').isVisible());
 await page.locator('[data-chapter-next]').click();await page.waitForTimeout(80);await page.locator('[data-chapter-next]').click();await page.waitForTimeout(650);await record('rapid navigation latest target',await page.locator('#study-terrace').isVisible()&&await page.locator('.snowline-panel:not([hidden])').count()===1);
 await page.locator('[data-star-select]').selectOption('razavi-cmos-analog-note');await record('textbook selection',await page.locator('[data-topic="razavi-cmos-analog-note"]').isVisible());await page.getByRole('button',{name:'切换明暗模式'}).click();await record('theme retains textbook',await page.locator('[data-star-select]').inputValue()==='razavi-cmos-analog-note');await page.locator('[data-star-reset]').click();
 await page.keyboard.press('Control+k');await record('search opens',await page.locator('dialog[open]').count()===1);await page.keyboard.press('Escape');
 await page.goBack();await page.waitForTimeout(650);await record('history previous chapter',await page.locator('#technical-ridge').isVisible());
 await page.goto(base+'/?trace=ridge#study-terrace');await page.waitForURL('**/blog?trace=ridge#study-terrace');await record('legacy hash query',await page.locator('#study-terrace').isVisible());
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-chapter-next]').click();await record('reduced motion immediate',await page.locator('#snowfield-traverse').isVisible()&&await page.locator('.snowline-panel:not([hidden])').count()===1);
 for(const locale of ['en','de']){await page.setViewportSize({width:320,height:700});await page.goto(base+'/'+locale+'/blog');await record(locale+' narrow layout',await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));await page.locator('[data-chapter-next]').click();await record(locale+' navigation',await page.locator('#technical-ridge').isVisible());}
 return {results,errors};
}
