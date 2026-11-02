async (page)=>{
 const base='http://127.0.0.1:4321';const results=[];const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/keystatic/workspace');await page.getByRole('button',{name:'首页精选 · 编排'}).click();await page.locator('[data-featured-key]').first().waitFor();
 const snapshot=await (await page.request.get(base+'/api/keystatic-featured')).json();
 results.push({name:'draft visible in manager',passed:snapshot.items.some(i=>i.featured&&!i.isPublic&&i.warning)});
 const firstKey=await page.locator('[data-featured-key]').first().getAttribute('data-featured-key');
 await page.locator('[data-featured-key]').first().getByRole('button',{name:/下移/}).click();await page.getByRole('button',{name:'保存精选',exact:true}).click();await page.getByRole('status').filter({hasText:'精选已保存'}).waitFor();
 const saved=await(await page.request.get(base+'/api/keystatic-featured')).json();const chosen=saved.items.filter(i=>i.featured);results.push({name:'save shared editorial order',passed:chosen[1].key===firstKey&&chosen.every((i,n)=>i.featuredOrder===(n+1)*10)});
 const headers={'Origin':base,'Content-Type':'application/json'};
 const stale=await page.request.put(base+'/api/keystatic-featured',{headers,data:{revision:snapshot.revision,items:[]}});results.push({name:'reject stale revision',passed:stale.status()===409});
 const foreign=await page.request.put(base+'/api/keystatic-featured',{headers:{...headers,Origin:'https://other.example'},data:{revision:saved.revision,items:[]}});results.push({name:'reject foreign origin',passed:foreign.status()===403});
 for(const [name,items] of [['unknown key',[{key:'article:zh:missing',featured:true,featuredOrder:1}]],['negative rank',[{key:chosen[0].key,featured:true,featuredOrder:-1}]],['duplicate keys',[{key:chosen[0].key,featured:true,featuredOrder:1},{key:chosen[0].key,featured:false,featuredOrder:2}]]]){const response=await page.request.put(base+'/api/keystatic-featured',{headers,data:{revision:saved.revision,items}});results.push({name:'reject '+name,passed:response.status()===400});}
 const unchanged=await(await page.request.get(base+'/api/keystatic-featured')).json();results.push({name:'invalid writes leave content unchanged',passed:unchanged.revision===saved.revision});
 await page.getByLabel('显示未精选内容').check();results.push({name:'all four kinds supported',passed:['article','category','project'].every(kind=>saved.items.some(i=>i.kind===kind))});
 await page.screenshot({path:'output/playwright/ridge-manager-sorted.png'});
 await page.goto(base+'/blog');const frontend=await page.locator('[data-featured-id]').evaluateAll(es=>es.map(e=>e.dataset.featuredId));const expected=chosen.filter(i=>i.isPublic).map(i=>i.kind+':'+i.id);results.push({name:'homepage uses manager order',passed:JSON.stringify(frontend)===JSON.stringify(expected)});
 return {results,errors,savedRevision:saved.revision};
}
