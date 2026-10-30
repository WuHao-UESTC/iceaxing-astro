const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const [width,height] of [[1440,1000],[1440,800],[1920,1080],[1024,768],[768,1024],[390,844],[320,844]]){
  await page.setViewportSize({width,height}); await page.goto('http://127.0.0.1:4321/blog',{waitUntil:'networkidle'});
  await page.locator('astro-dev-toolbar').evaluateAll(es=>es.forEach(e=>e.remove()));
  for(const theme of ['dark','light']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   for(const id of ['snowfield-traverse','study-terrace']){
    const panel=page.locator('#'+id); await panel.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));await page.waitForTimeout(150);
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Horizontal overflow');
    if(id==='snowfield-traverse'){
     const hits=await panel.evaluate(panel=>{
      const svg=panel.querySelector('.life-library-landscape'), compact=innerWidth<=768;
      const group=svg.querySelector(compact?'.life-rift-mobile .life-rift-upper':'.life-rift-desktop .life-rift-upper');
      const clip=[...svg.querySelector(compact?'#life-upper-mobile polygon':'#life-upper-desktop polygon').points];
      const inside=(x,y)=>{let hit=false;for(let i=0,j=clip.length-1;i<clip.length;j=i++){const a=clip[i],b=clip[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};
      const matrix=svg.getScreenCTM();const boxes=[...panel.querySelectorAll('.journey-chapter-marker > span,.journey-chapter-marker > div')].map(e=>e.getBoundingClientRect());const hits=new Set();
      for(const face of group.querySelectorAll('.terrain-face')){const ps=[...face.points];for(let i=0;i<ps.length;i++){const a=ps[i],b=ps[(i+1)%ps.length];const steps=Math.ceil(Math.hypot((b.x-a.x)*matrix.a,(b.y-a.y)*matrix.d));for(let j=0;j<=steps;j++){const t=j/steps,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;if(!inside(x,y))continue;const p=new DOMPoint(x,y).matrixTransform(matrix);if(boxes.some(r=>p.x>r.left-6&&p.x<r.right+6&&p.y>r.top-6&&p.y<r.bottom+6))hits.add(face.dataset.facet);}}}
      return [...hits];
     });
     if(hits.length)throw Error(`Marker line intersections ${width}x${height} ${theme}: ${hits}`);
    }else{
     if(await panel.locator('[data-study-depth]').count())throw Error('Unexpected multiple ridges');
     const minY=await panel.locator('.study-mountain-lines .terrain-face').evaluateAll(fs=>Math.min(...fs.flatMap(f=>[...f.points].map(p=>p.y))));
     if(minY!==58)throw Error('Study silhouette changed');
    }
    if([1440,390].includes(width)&&height!==800)await page.screenshot({path:`.tmp/corrected-${id}-${theme}-${width}.png`});
   }
  }
  console.log(`${width}x${height}: both themes OK; no lines behind 04; original study silhouette`);
 }
 await browser.close(); if(errors.length)throw Error(errors.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
