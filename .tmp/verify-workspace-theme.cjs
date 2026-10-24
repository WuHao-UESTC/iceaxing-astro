const {chromium}=require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.addInitScript(()=>localStorage.setItem('iceaxing-theme','light'));
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4321/keystatic/workspace');
  await page.waitForFunction(()=>!document.querySelector('astro-island').hasAttribute('ssr'));
  await page.locator('iframe').evaluate(f=>f.src='/keystatic/collection/articlesZh/item/deep-in-2nd-order-system');
  const frame=page.frameLocator('iframe');
  await frame.locator('[data-ws-article-form]').waitFor();
  const props=page.locator('[data-ws-properties-toggle]');
  if(await props.getAttribute('aria-expanded')==='false')await props.click();
  const title=frame.locator('[data-ws-article-field=title] input');
  await title.fill('配色联动中的未保存标题');
  await frame.locator('.ProseMirror').evaluate(e=>{e.dataset.themeTest='preserved';});
  for(const mode of ['light','dark']) {
   if(await page.locator('html').getAttribute('data-workspace-mode')!==mode)await page.getByRole('button',{name:'切换深色',exact:true}).click();
   for(const group of ['skill','study','life','documents','unassigned']) {
    await page.getByLabel('选择内容分组').selectOption(group);
    await page.waitForFunction(g=>document.querySelector('iframe').contentDocument.documentElement.dataset.workspaceGroup===g,group);
    const shell=await page.locator('html').evaluate(e=>getComputedStyle(e).getPropertyValue('--ws-accent').trim());
    const editor=await frame.locator('html').evaluate(e=>getComputedStyle(e).getPropertyValue('--ws-accent').trim());
    assert.equal(shell,editor);
    assert.equal(await title.inputValue(),'配色联动中的未保存标题');
    assert.equal(await frame.locator('.ProseMirror').getAttribute('data-theme-test'),'preserved');
    assert.equal(await page.locator('.workspace-landscape').getAttribute('data-landscape'),group);
    if(group==='life')assert(await page.locator('.workspace-landscape clipPath').count()===1);
    if(group==='documents')assert(await page.locator('.workspace-tent').count()===1);
    await page.screenshot({path:`.tmp/workspace-live-${group}-${mode}.png`,fullPage:true});
   }
  }
  await page.setViewportSize({width:390,height:850});
  await frame.locator('[data-ws-compact-form][data-ws-article-form]').waitFor();
  assert.equal(await title.inputValue(),'配色联动中的未保存标题');
  await props.click();
  assert(await frame.locator('[data-ws-compact-body]').isVisible());
  assert.equal(await title.isVisible(),false);
  await props.click();
  assert(await title.isVisible());
  await page.getByRole('button',{name:'收起文件树',exact:true}).click();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'.tmp/workspace-live-mobile.png',fullPage:true});
  console.log('UI',await frame.locator('body').evaluate(e=>({background:getComputedStyle(e).backgroundColor,ink:getComputedStyle(e).color})));
  assert.deepEqual(errors,[]);
  console.log('PASS five groups in both modes, shared palettes, original scene geometry, unsaved state and editor DOM preserved, mobile overflow');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
