const {chromium}=require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
for(const [id,selector,delta]of[
 ['base-camp','.journey-featured-track',600],['technical-ridge','#technical-category-list',600],['technical-ridge','#technical-project-list',600],
 ['technical-ridge','.journey-chapter-heading',600],['study-terrace','.study-article-list',600],['night-camp','.station-timeline',-600]]){
if(id==='study-terrace')await p.locator('[data-star]').first().click();
await p.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));
const target=selector==='.study-article-list'?p.locator('[data-topic]:not([hidden]) '+selector):p.locator('#'+id).locator(selector);
const state=await target.evaluate(e=>{e.scrollTop=100000;const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+Math.min(r.height/2,100),h:e.clientHeight,sh:e.scrollHeight,overscroll:getComputedStyle(e).overscrollBehaviorY};});
await p.mouse.move(state.x,state.y);const before=await p.locator('[data-journey]').evaluate(e=>e.scrollTop);await p.mouse.wheel(0,delta);await p.waitForTimeout(700);const after=await p.locator('[data-journey]').evaluate(e=>e.scrollTop);console.log(id,selector,JSON.stringify({...state,before,after,moved:after-before}));
}await b.close();})().catch(e=>{console.error(e);process.exit(1)});
