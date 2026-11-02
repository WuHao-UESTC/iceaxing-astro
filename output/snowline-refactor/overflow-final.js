async (page) => {
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:320,height:844});
 await page.goto('http://127.0.0.1:4323/blog');await page.evaluate(()=>{localStorage.setItem('iceaxing-theme','light');});await page.reload();await page.waitForTimeout(1000);
 return await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,items:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0 && r.right>321 && !e.closest('[hidden],svg');}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent?.trim().slice(0,40),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,overflow:getComputedStyle(e).overflow,parent:e.parentElement.className})).slice(0,35)}));
}
