async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 const base='http://127.0.0.1:4322';
 await page.goto(base+'/blog#study-terrace');
 await page.locator('[data-star-select]').selectOption('razavi-cmos-analog-note');
 await page.locator('[data-journey-link="study-terrace"]').click();
 await page.waitForFunction(()=>Math.abs(document.querySelector('#study-terrace').getBoundingClientRect().top-128)<20);
 await page.waitForTimeout(750);
 await page.screenshot({path:'output/playwright/snowline-study-mobile-selected-final.png'});
 results.push({check:'textbook selection',passed:await page.locator('[data-topic="razavi-cmos-analog-note"]').isVisible()});
 await page.locator('[data-star-reset]').click();
 results.push({check:'textbook reset',passed:!(await page.locator('[data-star-detail]').isVisible())});
 for(const theme of ['light','dark']) {
  await page.evaluate(t=>{localStorage.setItem('iceaxing-theme',t);document.documentElement.dataset.theme=t;},theme);
  for(const width of [1440,390,320]) {
   await page.setViewportSize({width,height:width===1440?1000:844});
   for(const route of ['/','/blog']) {
    await page.goto(base+route);
    await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-page-enter-pending'));
    const dimensions=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,theme:document.documentElement.dataset.theme}));
    results.push({check:route+' '+theme+' '+width,passed:dimensions.scroll<=dimensions.width+1 && dimensions.theme===theme,...dimensions});
    await page.screenshot({path:'output/playwright/snowline-'+(route==='/'?'welcome':'home')+'-'+theme+'-'+width+'.png',fullPage:width===1440&&route==='/blog'});
   }
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'/blog');
 for(const section of ['technical-ridge','study-terrace','snowfield-traverse','night-camp']) {
  await page.locator('[data-journey-link="'+section+'"]').click();
  await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top-128)<20,section);
  await page.screenshot({path:'output/playwright/snowline-'+section+'-dark-desktop.png'});
  results.push({check:'chapter '+section,passed:await page.locator('[data-journey-link="'+section+'"]').getAttribute('aria-current')==='location'});
 }
 await page.locator('[data-journey-link="study-terrace"]').click();
 await page.locator('[data-star-select]').selectOption('razavi-cmos-analog-note');
 await page.screenshot({path:'output/playwright/snowline-study-selected-dark-desktop.png'});
 results.push({check:'desktop textbook',passed:await page.locator('[data-topic="razavi-cmos-analog-note"]').isVisible()});
 await page.locator('[data-star-reset]').click();
 await page.keyboard.press('Control+k');
 results.push({check:'search shortcut',passed:await page.locator('dialog[open]').isVisible()});
 await page.keyboard.press('Escape');
 results.push({check:'search escape',passed:await page.locator('dialog[open]').count()===0});
 await page.goto(base+'/?ref=legacy#study-terrace');
 await page.waitForURL('**/blog?ref=legacy#study-terrace');
 results.push({check:'legacy hash query',passed:true});
 for(const route of ['/en','/de','/en/blog','/de/blog','/articles','/projects','/profile','/friends','/about','/tools','/tools/pomodoro','/tools/smith-chart','/daily-ramblings','/oppenheim-signal-and-system-note/dimension-of-s']) {
  const response=await page.goto(base+route);
  results.push({check:'route '+route,passed:response.status()===200,status:response.status()});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(base+'/blog#study-terrace');
 await page.locator('[data-star-select]').selectOption('razavi-cmos-analog-note');
 results.push({check:'reduced motion selection',passed:await page.locator('[data-topic="razavi-cmos-analog-note"]').isVisible()});
 results.push({check:'reduced motion animation',passed:await page.evaluate(()=>document.querySelector('.expedition-trail').getAnimations().length===0)});
 return {results,errors};
}

