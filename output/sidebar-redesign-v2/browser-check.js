async (page) => {
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 const check=(ok,name)=>{results.push({name,ok});if(!ok)throw Error(name)};
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:900});
  for(const theme of ['light','dark']){
   await page.goto('http://127.0.0.1:4321/blog');
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   await page.locator('[data-expedition-ready]').waitFor(); await page.evaluate(()=>{ const e=document.querySelector('[data-editorial-scroll]'); if(e)e.scrollTop=0; });
   if(width<=768) await page.locator('[data-ridge-expand]').click();
   await page.locator('.ridge-primary-links a').first().waitFor({state:'visible'});
   check(await page.locator('.ridge-primary-links a').count()===4,`primary ${width}/${theme}`);
   await page.locator('.ridge-languages a').last().scrollIntoViewIfNeeded();
   check(await page.locator('.ridge-languages a').last().isVisible(),`languages ${width}/${theme}`);
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`no overflow ${width}/${theme}`);
   const aligned=await page.evaluate(()=>{
    const svg=document.querySelector('.ridge-nav-line');const path=svg.querySelector('path');const b=svg.getBoundingClientRect();
    return [...document.querySelectorAll('.ridge-node')].every(n=>{
     const r=n.getBoundingClientRect(),x=r.left+r.width/2-b.left,y=r.top+r.height/2-b.top;
     let min=Infinity;for(let i=0;i<=1000;i++){const p=path.getPointAtLength(path.getTotalLength()*i/1000);min=Math.min(min,Math.hypot(p.x-x,p.y-y));}return min<1;
    });
   });
   check(aligned,`node alignment ${width}/${theme}`);
   if(width<=768) await page.locator('[data-ridge-expand]').click();
   await page.locator('[data-chapter-next]').click();
   await page.locator('#technical-ridge').waitFor({state:'visible'});
   check(await page.locator('[data-chapter-prev]').isEnabled(),`next ${width}/${theme}`);
   await page.locator('[data-chapter-prev]').click();
   check(await page.locator('[data-chapter-prev]').isDisabled(),`prev ${width}/${theme}`);
   await page.waitForFunction(()=>!document.querySelector('[data-wind-running]')); if(width===1440||width===390) await page.screenshot({path:`output/playwright/sidebar-redesign-v2-${theme}-${width}.png`});
  }
 }
 await page.setViewportSize({width:1440,height:900});
 for(const locale of ['en','de']){
  await page.goto(`http://127.0.0.1:4321/${locale}/blog#night-camp`);
  await page.locator('[data-expedition-ready]').waitFor(); await page.evaluate(()=>{ const e=document.querySelector('[data-editorial-scroll]'); if(e)e.scrollTop=0; });
  check((await page.locator('[data-sidebar-language]').first().getAttribute('href')).endsWith('#night-camp'),`language chapter ${locale}`);
  await page.locator('[data-chapter-next]').click();
  check(await page.locator('[data-chapter-prev]').isDisabled(),`return start ${locale}`);
 }
 await page.goto('http://127.0.0.1:4321/blog');
 await page.locator('[data-expedition-ready]').waitFor(); await page.evaluate(()=>{ const e=document.querySelector('[data-editorial-scroll]'); if(e)e.scrollTop=0; });
 await page.locator('.ridge-search').click();
 await page.locator('[data-search-dialog]').waitFor({state:'visible'}); check(true,'search');
 await page.keyboard.press('Escape');
 await page.locator('[data-chapter-next]').focus();
 check(await page.locator('[data-chapter-next-label]').evaluate(el=>getComputedStyle(el).opacity)==='1','keyboard label');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('[data-chapter-next]').click();
 await page.locator('#technical-ridge').waitFor({state:'visible'});
 check(true,'reduced motion');
 check(errors.length===0,'no runtime errors');
 return {results,errors};
}



