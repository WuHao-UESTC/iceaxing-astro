async (page) => {
 const results=[];
 for(const [width,height,locale] of [[1440,900,''],[1440,720,'de/'],[390,844,''],[320,568,'en/']]){
  await page.setViewportSize({width,height});
  await page.goto(`http://127.0.0.1:4321/${locale}blog`);
  await page.locator('[data-expedition-ready]').waitFor();
  await page.evaluate(()=>document.documentElement.dataset.theme='light');
  if(width<769) await page.locator('[data-ridge-expand]').click();
  const measurements=await page.evaluate(()=>{
   const route=document.querySelector('.ridge-route').getBoundingClientRect();
   const path=document.querySelector('.ridge-nav-line path');
   const end=path.getPointAtLength(path.getTotalLength());
   const nodes=[...document.querySelectorAll('.ridge-node')].map(e=>e.getBoundingClientRect());
   const labels=[...document.querySelectorAll('.ridge-node-label')].map(e=>e.getBoundingClientRect());
   const languages=[...document.querySelectorAll('.ridge-languages a')].map(e=>{
    const box=e.getBoundingClientRect(); const r=document.createRange();r.selectNodeContents(e);const t=r.getBoundingClientRect();
    return {x:Math.abs((box.left+box.right-t.left-t.right)/2),y:Math.abs((box.top+box.bottom-t.top-t.bottom)/2)};
   });
   const aux=[...document.querySelectorAll('.ridge-global-links a')].map(e=>e.getBoundingClientRect());
   return {fullRoute:Math.abs(end.y-route.height)<1, spread:nodes[4].top-nodes[0].top>route.height*.7,
    alternate:labels.every((r,i)=>i%2?r.left>nodes[i].right:r.right<nodes[i].left),
    centered:languages.every(d=>d.x<1&&d.y<3),sameRow:aux.every(b=>Math.abs(b.top-aux[0].top)<1),
    languageAbove:document.querySelector('.ridge-languages').getBoundingClientRect().bottom<=aux[0].top,
    languages};
  });
  results.push({width,height,locale,...measurements});
  if(Object.entries(measurements).some(([key,value])=>key!=='languages'&&value!==true)) throw Error(JSON.stringify(results));
  await page.screenshot({path:`output/playwright/sidebar-redesign-v2-detail-${width}-${height}.png`});
 }
 return results;
}
