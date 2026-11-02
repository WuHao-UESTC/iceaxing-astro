async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.emulateMedia({reducedMotion:'reduce'});
 const results=[];
 for(const route of ['/tools/pomodoro','/tools/smith-chart']) {
  const response=await page.goto('http://127.0.0.1:4323'+route);await page.waitForTimeout(1000);
  results.push({route,status:response.status(),islands:await page.locator('astro-island[ssr]').count(),buttons:await page.locator('main button').count()});
 }
 return {results,errors};
}
