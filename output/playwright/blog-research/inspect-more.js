async (page) => {
  const results = []; const sites = [
    ['lynn', 'https://lynnandtonic.com/'],
    ['henry', 'https://henry.codes/'],
    ['craftz', 'https://www.craftz.dog/'],
    ['poolsuite', 'https://poolsuite.net/'],
  ];
  for (const [id,url] of sites) {
    try {
      await page.setViewportSize({width:1440,height:1000});
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
      await page.waitForTimeout(1800);
      await page.screenshot({path:`E:/repo_iceaxing-astro/iceaxing-astro/output/playwright/blog-research/${id}-desktop.png`,fullPage:true});
      const evidence=await page.evaluate(()=>({
        title:document.title,url:location.href,
        headings:[...document.querySelectorAll('h1,h2,h3')].slice(0,18).map(e=>e.innerText),
        body:{background:getComputedStyle(document.body).backgroundColor,font:getComputedStyle(document.body).fontFamily},
        layouts:[...document.querySelectorAll('main,section,article,ul')].filter(e=>['grid','flex'].includes(getComputedStyle(e).display)).slice(0,12).map(e=>({tag:e.tagName,class:e.className,display:getComputedStyle(e).display,columns:getComputedStyle(e).gridTemplateColumns,gap:getComputedStyle(e).gap})),
        animations:document.getAnimations().slice(0,15).map(a=>({duration:a.effect?.getTiming().duration,iterations:String(a.effect?.getTiming().iterations)})),
        links:[...document.querySelectorAll('a')].slice(0,18).map(a=>({text:a.innerText.slice(0,65),url:a.href})),
      }));
      results.push({id,...evidence});
      await page.setViewportSize({width:390,height:844});
      await page.waitForTimeout(400);
      await page.screenshot({path:`E:/repo_iceaxing-astro/iceaxing-astro/output/playwright/blog-research/${id}-mobile.png`,fullPage:true});
      results.push({id,mobile:await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth}))});
    }catch(error){results.push({id,error:String(error)});}
  }
return results; }
