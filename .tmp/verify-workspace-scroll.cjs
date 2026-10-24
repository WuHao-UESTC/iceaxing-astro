const {chromium}=require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge'});try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let choices=0;await page.exposeFunction('scrollTestChoose',()=>{choices++;});
 await page.addInitScript(()=>{window.showDirectoryPicker=async()=>{await window.scrollTestChoose();throw new DOMException('cancelled','AbortError');};});
 for(const [width,height] of [[1440,900],[1440,700],[1024,600],[1024,480],[390,650],[390,400]]){
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:4321/keystatic/workspace');
  await page.waitForFunction(()=>!document.querySelector('astro-island').hasAttribute('ssr'));
  await page.locator('.folder-row').first().waitFor();
  const sidebar=page.locator('.content-tree-sidebar');
  if(!await sidebar.isVisible())await page.getByRole('button',{name:'展开文件树',exact:true}).click();
  const nav=page.locator('.content-tree');
  await nav.evaluate(e=>{for(let i=0;i<50;i++){const row=document.createElement('div');row.className='scroll-test-row';row.style.height='40px';row.textContent=`滚动验证条目 ${i}`;e.append(row);}});
  const before=await nav.evaluate(e=>({top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight}));
  assert(before.height>=96);assert(before.total>before.height);
  await nav.hover();await page.mouse.wheel(0,600);
  await page.waitForFunction(()=>document.querySelector('.content-tree').scrollTop>0);
  await page.locator('.workspace-obsidian-sync > summary').click();
  const choose=page.getByRole('button',{name:'选择仓库根目录',exact:true});
  await choose.scrollIntoViewIfNeeded();
  const bounds=await choose.boundingBox();assert(bounds&&bounds.y>=0&&bounds.y+bounds.height<=height+1,`Directory picker clipped at ${width}x${height}`);
  const count=choices;await choose.click();assert.equal(choices,count+1,'Directory picker button must receive the click');
  const footer=page.locator('.workspace-sidebar-footer');
  await page.locator('#utility-navigation').scrollIntoViewIfNeeded();
  const utility=await page.locator('#utility-navigation').boundingBox();assert(utility.y+utility.height<=height+1);
  const sideBox=await sidebar.boundingBox();assert(sideBox.y+sideBox.height<=height+1,'Sidebar must fit viewport');
  console.log(`PASS ${width}x${height}: tree wheel scroll, footer access, directory picker click, other-content selector`);
  if(height===700)await page.screenshot({path:'.tmp/workspace-scroll-700.png',fullPage:true});
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
