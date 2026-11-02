async (page) => {
  const results=[];
  for(const [id,url] of [
    ['maggie','https://maggieappleton.com/'],
    ['josh','https://www.joshwcomeau.com/'],
    ['ncase','https://ncase.me/'],
    ['lowtech','https://solar.lowtechmagazine.com/'],
    ['poolsuite','https://poolsuite.net/'],
  ]){
    const tab=await page.context().newPage();
    const record={id,url};
    try{
      await tab.setViewportSize({width:1440,height:1000});
      await tab.goto(url,{waitUntil:'domcontentloaded',timeout:25000});
      await tab.waitForTimeout(id==='poolsuite'?10000:2500);
      record.page=await tab.evaluate(()=>({title:document.title,url:location.href,text:document.body.innerText.slice(0,4500),links:[...document.querySelectorAll('a')].slice(0,25).map(a=>({text:a.innerText.slice(0,55),url:a.href})),font:getComputedStyle(document.body).fontFamily,background:getComputedStyle(document.body).backgroundColor}));
      await tab.screenshot({path:`E:/repo_iceaxing-astro/iceaxing-astro/output/playwright/blog-research/${id}-desktop.png`,fullPage:true,animations:'disabled',timeout:12000});
      await tab.setViewportSize({width:390,height:844});await tab.waitForTimeout(500);
      record.mobile=await tab.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth}));
      await tab.screenshot({path:`E:/repo_iceaxing-astro/iceaxing-astro/output/playwright/blog-research/${id}-mobile.png`,fullPage:true,animations:'disabled',timeout:12000});
    }catch(error){record.error=String(error);}
    results.push(record);await tab.close();
  }
  return results;
}
