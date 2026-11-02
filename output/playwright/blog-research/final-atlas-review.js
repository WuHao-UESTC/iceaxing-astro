async(page)=>{
 const root='file:///E:/repo_iceaxing-astro/iceaxing-astro/doc/design/style-atlas/';
 const names=['01-voxel','02-specimen','03-comic','04-riso','05-engraving','06-deco','07-bauhaus','08-swiss','09-cyanotype','10-papercut','11-stainedglass','12-clay','13-pixel','14-ukiyoe','15-terminal'];
 const results=[],errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 for(const name of names){
  const r={name};try{
   await page.setViewportSize({width:1440,height:1000});await page.goto(root+name+'.html');await page.waitForTimeout(100);
   await page.locator('.primary').click({timeout:6000});if(!await page.locator('[data-panel="1"]').isVisible())throw Error('primary action');
   await page.keyboard.press('PageDown');if(!await page.locator('[data-panel="2"]').isVisible())throw Error('keyboard next');
   await page.goBack();if(!await page.locator('[data-panel="1"]').isVisible())throw Error('browser back');
   await page.locator('[data-nav="0"]').click();const before=await page.locator('[data-feature-title]').textContent();await page.locator('[data-feature="1"]').click();if(await page.locator('[data-feature-title]').textContent()===before)throw Error('featured change');
   await page.locator('[data-feature-open]').click({timeout:6000});if(!await page.locator('#reader').evaluate(d=>d.open))throw Error('featured reading');await page.locator('#reader [data-close]').click();
   await page.setViewportSize({width:390,height:844});await page.locator('.primary').click({timeout:6000});if(!await page.locator('[data-panel="1"]').isVisible())throw Error('mobile action');
   await page.goto(root+name+'.html#study-terrace');if(!await page.locator('[data-panel="2"]').isVisible())throw Error('direct chapter link');
   r.ok=true;r.checks='desktop/mobile primary actions, featured switch/read, keyboard chapter, browser back, direct chapter URL';
  }catch(e){r.ok=false;r.error=String(e);}results.push(r);
 }
 return {results,errors};
}
