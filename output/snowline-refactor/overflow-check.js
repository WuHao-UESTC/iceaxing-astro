async (page) => {
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:320,height:844});
 await page.goto('http://127.0.0.1:4322/blog');
 await page.evaluate(()=>{document.documentElement.dataset.theme='light';});
 return await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0 && (r.right>321 || r.left< -1) && !e.closest('[hidden],svg,.study-star-map,.life-landings,astro-dev-toolbar');}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent?.slice(0,50),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})).slice(0,20));
}
