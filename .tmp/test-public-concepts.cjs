const {chromium}=require('./welcome-browser-tools/node_modules/playwright-core');
const fs=require('node:fs');const path=require('node:path');const {execFileSync}=require('node:child_process');const assert=require('node:assert/strict');
const root=path.resolve('src/content/articles/zh');
const ids=['concept-read-check','concept-private-check'];
const paths=ids.map(id=>path.join(root,id));
const secret='PRIVATE-CONCEPT-DEFINITION-NEVER-PUBLISH';
const note=(id,status,text)=>`---\ncontentId: ${id}\ntranslationKey: ${id}\nlocale: zh\ntitle: 概念阅读验证\nslug: ${id}\nstatus: ${status}\npublishedAt: 2026-10-30T00:00:00Z\ntags: []\nauthorName: iceaxing\nfeatured: false\norder: 0\nseo: {}\ncategory: analog-ic\n---\n${text}\n`;
(async()=>{
paths.forEach(p=>assert(!fs.existsSync(p),'fixture already exists'));
paths.forEach(p=>fs.mkdirSync(p));
fs.writeFileSync(path.join(paths[0],'index.mdoc'),note(ids[0],'published','{% conceptStart id="c-read-check" name="可读概念" /%}保持原有 **格式** 的定义。{% conceptEnd id="c-read-check" /%}\n\n引用 {% conceptLink target="c-read-check" name="可读概念" /%} 与 {% conceptLink target="c-private-check" name="未公开概念" /%}。'));
fs.writeFileSync(path.join(paths[1],'index.mdoc'),note(ids[1],'draft',`{% conceptStart id="c-private-check" name="未公开概念" /%}${secret}{% conceptEnd id="c-private-check" /%}`));
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try{
execFileSync(process.execPath,['--import','tsx','scripts/validate-content.ts'],{stdio:'pipe'});
const routes=JSON.parse(fs.readFileSync('src/generated/route-manifest.json','utf8'));const route=routes.find(r=>r.contentId===ids[0]);assert(route,'public route');
const p=await b.newPage({viewport:{width:1200,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
const response=await p.goto((process.env.CONCEPT_TEST_ORIGIN||'http://localhost:4321')+route.pathname);console.log('public status',response.status());try{await p.locator('[data-concept-link="c-read-check"]').waitFor({timeout:10000});}catch(e){console.log('public body',(await p.locator('body').innerText()).slice(0,3500),'errors',errors);await p.screenshot({path:'.tmp/concepts-public-error.png',fullPage:true});throw e;}
assert(!(await p.content()).includes(secret),'private definition not rendered');
assert.equal(await p.locator('[data-concept-start="c-read-check"]').count(),1);assert.equal(await p.locator('[data-concept-end="c-read-check"]').count(),1);
assert.equal(await p.locator('.wikilink-unresolved').filter({hasText:'未公开概念'}).count(),1);
const link=p.locator('[data-concept-link="c-read-check"]');await link.hover();await p.locator('.concept-hover-card:not([hidden])').waitFor();assert.equal(await p.locator('.concept-hover-card p').textContent(),'保持原有 格式 的定义。');
await p.getByRole('button',{name:'查看原文 ↗',exact:true}).click();await p.waitForFunction(()=>CSS.highlights.has('concept-source'));assert.equal(await p.evaluate(()=>[...CSS.highlights.get('concept-source')][0].toString()),'保持原有 格式 的定义。');
await p.screenshot({path:'.tmp/concepts-reading-desktop.png',fullPage:true});
await p.setViewportSize({width:390,height:844});await link.click();const rect=await p.locator('.concept-hover-card').boundingBox();assert(rect.x>=0&&rect.x+rect.width<=390);await p.screenshot({path:'.tmp/concepts-reading-mobile.png',fullPage:true});assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,publicRender:true,privateSourceHidden:true,exactTextHighlight:true,errors}));
}finally{await b.close();for(const dir of paths){fs.unlinkSync(path.join(dir,'index.mdoc'));fs.rmdirSync(dir);}execFileSync(process.execPath,['--import','tsx','scripts/validate-content.ts'],{stdio:'pipe'});}
})().catch(e=>{console.error(e);process.exit(1)});
