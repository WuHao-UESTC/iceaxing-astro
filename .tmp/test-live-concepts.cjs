const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const id='concept-integration-check';
const directory=path.resolve('src/content/articles/zh',id),file=path.join(directory,'index.mdoc');
const refId='concept-reference-check',refDirectory=path.resolve('src/content/articles/zh',refId),refFile=path.join(refDirectory,'index.mdoc');
const content='有界输入对应有界输出，这是本次概念验证的原始定义。';
(async()=>{
assert(!fs.existsSync(directory),'fixture path already exists');fs.mkdirSync(directory);fs.writeFileSync(file,`---\ncontentId: ${id}\ntranslationKey: ${id}\nlocale: zh\ntitle: 概念集成验证\nslug: ${id}\nstatus: draft\npublishedAt: 2026-10-30T00:00:00Z\ntags: []\nauthorName: iceaxing\nfeatured: false\norder: 0\nseo: {}\n---\n${content}\n\n继续写作。\n`);
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
assert(!fs.existsSync(refDirectory),'reference fixture already exists');fs.mkdirSync(refDirectory);fs.writeFileSync(refFile,fs.readFileSync(file,'utf8').replaceAll(id,refId).replace('概念集成验证','概念跨笔记验证').replace(content,'第二篇测试笔记。'));
try{
const p=await b.newPage({viewport:{width:1600,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:4321/keystatic/workspace');await p.waitForFunction(()=>!document.querySelector('astro-island[ssr]'));await p.getByRole('combobox',{name:'选择内容分组'}).selectOption('unassigned');await p.getByRole('button',{name:'刷新内容树',exact:true}).click();try{await p.locator('.article-row').filter({hasText:'概念集成验证'}).click({timeout:12000});}catch(e){console.log('workspace error',(await p.locator('body').innerText()).slice(0,2500),'errors',errors);throw e;}
const f=p.frameLocator('iframe');await f.locator('.ProseMirror').waitFor();await f.locator('.concept-float').waitFor();
await f.locator('.ProseMirror p').first().evaluate(el=>{const r=document.createRange();r.selectNodeContents(el);el.closest('.ProseMirror').focus();const s=window.getSelection();s.removeAllRanges();s.addRange(r);});
await f.locator('.concept-float').getByRole('button',{name:'新建',exact:true}).click();
await f.getByLabel('概念名称',{exact:true}).fill('集成验证概念');
await f.locator('.concept-float form').getByRole('button',{name:'保存',exact:true}).click();
await f.locator('.concept-results button').getByText('集成验证概念',{exact:true}).waitFor();
assert((await f.locator('.ProseMirror').innerText()).includes(content));
await f.locator('.ProseMirror p').last().click();await p.keyboard.press('End');
await f.locator('.concept-float').getByRole('button',{name:'插入链接 ↗',exact:true}).click();
const link=f.locator('[data-concept-link]').last();await link.hover();await f.locator('.concept-hover-card:not([hidden])').waitFor();
assert((await f.locator('.concept-hover-card p').textContent()).includes(content));
console.log('layout',await f.locator('.concept-float').evaluate(el=>({rect:el.getBoundingClientRect().toJSON(),background:getComputedStyle(el).backgroundColor,border:getComputedStyle(el).borderWidth})));console.log('buttons',await f.locator('header button').allTextContents());
await p.screenshot({path:'.tmp/concepts-workspace-desktop.png',fullPage:true});
await f.getByRole('button',{name:'关闭概念说明'}).click();
const save=f.locator('header').first().getByRole('button',{name:/^(保存|节省)$/});
await save.click();await p.waitForTimeout(1500);
assert(fs.readFileSync(file,'utf8').includes('conceptStart'),'persisted start');assert(fs.readFileSync(file,'utf8').includes('conceptLink'),'persisted link');
const json=await (await p.request.get('http://localhost:4321/api/keystatic-concepts')).json();const concept=json.concepts.find(c=>c.name==='集成验证概念');assert(concept&&concept.definition.includes(content),'catalog from saved content');
await p.locator('iframe').evaluate(el=>el.contentWindow.location.reload());await f.locator('[data-concept-link]').waitFor();assert((await f.locator('.concept-results').innerText()).includes('集成验证概念'));
await p.locator('.article-row').filter({hasText:'概念跨笔记验证'}).click();await f.locator('.ProseMirror').getByText('第二篇测试笔记。',{exact:true}).waitFor();try{await f.locator('.concept-results').getByRole('button',{name:'集成验证概念',exact:true}).waitFor({timeout:10000});}catch(e){console.log('cross debug',await f.locator('.concept-float').innerText(),await f.locator('[data-ws-canonical-id]').evaluateAll(els=>els.map(e=>({tag:e.tagName,value:e.value,text:e.textContent}))));console.log('cross api',await (await p.request.get('http://localhost:4321/api/keystatic-concepts')).json());await p.screenshot({path:'.tmp/concepts-cross-error.png',fullPage:true});throw e;}
await f.locator('.ProseMirror p').last().click();await p.keyboard.press('End');await f.locator('.concept-results').getByRole('button',{name:'集成验证概念',exact:true}).click();await f.locator('.concept-float').getByRole('button',{name:'插入链接 ↗',exact:true}).click();await f.locator('[data-concept-link]').last().hover();await f.locator('.concept-hover-card:not([hidden])').waitFor();assert((await f.locator('.concept-hover-card p').textContent()).includes(content));
const opened=p.context().waitForEvent('page');await f.getByRole('button',{name:'查看原文 ↗',exact:true}).click();const sourcePage=await opened;sourcePage.on('pageerror',e=>errors.push(e.message));await sourcePage.waitForURL('**/keystatic/workspace?editor=**');const sourceFrame=sourcePage.frameLocator('iframe');await sourceFrame.locator('[data-concept-start]').waitFor();await sourcePage.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.getSelection()?.toString().includes('有界输入对应有界输出'));assert((await f.locator('.ProseMirror').innerText()).includes('第二篇测试笔记。'));assert.equal(await f.locator('[data-concept-link]').count(),1);assert(!fs.readFileSync(refFile,'utf8').includes('conceptLink'),'opening source preserves unsaved reference');await sourcePage.close();
await p.setViewportSize({width:390,height:844});await p.getByRole('button',{name:'收起文件树',exact:true}).click();await f.locator('.ProseMirror').scrollIntoViewIfNeeded();await p.waitForTimeout(200);await f.locator('.concept-float > header > button').click();await p.screenshot({path:'.tmp/concepts-workspace-mobile.png',fullPage:true});
console.log(JSON.stringify({passed:true,errors,conceptId:concept.id,saveReload:true,crossNoteReference:true,sourceInNewWorkspaceTab:true}));assert.deepEqual(errors,[]);
}finally{await b.close();fs.unlinkSync(file);fs.rmdirSync(directory);fs.unlinkSync(refFile);fs.rmdirSync(refDirectory);}
})().catch(e=>{console.error(e);process.exit(1)});
