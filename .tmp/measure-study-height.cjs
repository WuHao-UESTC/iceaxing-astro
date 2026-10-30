const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const p=await b.newPage();await p.emulateMedia({reducedMotion:'reduce'});
for(const [width,height]of [[1440,1000],[1440,900],[1440,800],[1366,768],[1024,768],[768,1024],[390,844],[320,640]]){
 await p.setViewportSize({width,height});await p.goto(`http://127.0.0.1:4321/blog?measure=${width}-${height}#study-terrace`,{waitUntil:'networkidle'});
 for(const state of ['overview','focused']){
  if(state==='focused')await p.locator('#study-terrace [data-star]').first().click();await p.waitForTimeout(100);
  console.log(width,height,state,JSON.stringify(await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s),r=e.getBoundingClientRect(),c=getComputedStyle(e);return {height:r.height,scrollHeight:e.scrollHeight,top:r.top,bottom:r.bottom,padding:c.padding,gap:c.gap,minHeight:c.minHeight}};return Object.fromEntries(['[data-journey]','#study-terrace','.journey-study-inner','.study-heading-band','.study-atlas','.study-atlas-toolbar','.study-atlas-stage','.study-star-map','.study-star-world','.study-atlas-footer','.study-detail'].map(s=>[s,q(s)]))})));
 }
}await b.close()})().catch(e=>{console.error(e);process.exit(1)});
