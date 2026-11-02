async(page)=>{
 const root='E:/repo_iceaxing-astro/iceaxing-astro/doc/design/style-atlas';
 const names=['05-engraving','06-deco','11-stainedglass','14-ukiyoe','15-terminal'];
 const ids=['base-camp','technical-ridge','study-terrace','snowfield-traverse','night-camp'];
 const results=[],errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const assert=(ok,message)=>{if(!ok)throw Error(message);};
 for(const name of names){
  const record={name,checks:[]};
  try{
   await page.setViewportSize({width:1440,height:1000});
   await page.goto('file:///'+root+'/'+name+'.html',{waitUntil:'load'});
   await page.waitForTimeout(100);
   assert(await page.locator('[data-panel]').count()===5,'five chapters');
   assert(await page.locator('.book-card').count()>=5,'textbook selection');
   for(let n=0;n<5;n++){
    await page.locator(`[data-nav="${n}"]`).click();
    await page.waitForTimeout(80);
    assert(await page.locator(`[data-panel="${n}"]`).isVisible(),`chapter ${n} visible`);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`desktop overflow ${n}`);
    await page.screenshot({path:`${root}/screenshots/${name.slice(0,2)}-${n===0?'cover':ids[n]}-desktop.png`,fullPage:true,animations:'disabled',timeout:15000});
   }
   record.checks.push('five desktop chapters');
   await page.locator('[data-nav="2"]').click();
   const before=await page.locator('[data-book-title]').textContent();
   await page.locator('[data-book]').nth(1).click();
   assert((await page.locator('[data-book-title]').textContent())!==before,'textbook switches');
   await page.locator('[data-book-all]').click();assert(await page.locator('#reader').evaluate(d=>d.open),'book directory opens');await page.locator('#reader [data-close]').click();
   await page.locator('[data-nav="3"]').click();const count=await page.locator('[data-life-count]').textContent();await page.locator('[data-life-dir="1"]').click();assert((await page.locator('[data-life-count]').textContent())!==count,'life groups switch');await page.locator('[data-life-card]:visible').first().click();assert(await page.locator('#reader').evaluate(d=>d.open),'life opens');await page.locator('#reader [data-close]').click();
   await page.locator('[data-nav="4"]').click();await page.locator('[data-note="0"]').click();assert(await page.locator('#reader').evaluate(d=>d.open),'timeline opens');await page.locator('#reader [data-close]').click();
   await page.locator('[data-search]').click();await page.locator('input').fill('二阶');assert(await page.locator('[data-search-result]').count()>0,'search matches');await page.locator('[data-search-result]').first().click();assert(await page.locator('#reader').evaluate(d=>d.open),'reading opens');await page.screenshot({path:`${root}/screenshots/${name.slice(0,2)}-reader-desktop.png`,animations:'disabled'});await page.locator('#reader [data-close]').click();
   record.checks.push('books, life groups, timeline, search, reading');
   await page.setViewportSize({width:390,height:844});
   for(let n=0;n<5;n++){
    await page.locator(`[data-nav="${n}"]`).click();await page.waitForTimeout(70);
    const dimensions=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert(dimensions.scroll<=390,`mobile overflow ${n} ${JSON.stringify(dimensions)}`);
    await page.screenshot({path:`${root}/screenshots/${name.slice(0,2)}-${n===0?'cover':ids[n]}-mobile.png`,fullPage:true,animations:'disabled'});
   }
   record.checks.push('five mobile chapters');
   await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-nav="0"]').click();assert(await page.locator('[data-panel="0"]').evaluate(el=>getComputedStyle(el).animationName)==='none','reduced motion');await page.emulateMedia({reducedMotion:'no-preference'});
   record.checks.push('reduced motion');record.ok=true;
  }catch(e){record.error=String(e);record.ok=false;}
  results.push(record);
 }
 return {results,errors};
}


