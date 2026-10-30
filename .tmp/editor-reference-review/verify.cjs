const {chromium}=require('../welcome-browser-tools/node_modules/playwright-core');
const fs=require('node:fs');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:736,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const fragment=fs.readFileSync('.tmp/editor-reference-review/reference-options.html','utf8');
await page.setContent('<style>body{margin:12px}section[hidden]{display:none}html{color-scheme:light}</style>'+fragment);
await page.locator('[data-insert="concept-definition"]').click();
if(!await page.locator('[data-output="concept"]').textContent().then(t=>t.includes('对于任意有界输入')))throw Error('Concept insert');
await page.locator('[data-output="concept"] button').click();
if(!await page.locator('[data-source="concept"]').isVisible())throw Error('Concept source');
await page.locator('[data-anchor]').click();
await page.screenshot({path:'.tmp/editor-reference-review/concept-desktop.png',fullPage:true});
async function variant(name){await page.locator('[data-variant]').evaluateAll((nodes,name)=>nodes.forEach(n=>n.hidden=n.dataset.variant!==name),name);}
await variant('可复用段落');
await page.locator('[data-save-block]').click();
await page.locator('#rr-block-mode').selectOption('link');
await page.locator('[data-output="block"] button').click();
if(!await page.locator('[data-source="block"]').isVisible())throw Error('Block source');
await page.locator('#rr-block-mode').selectOption('copy');
if(!await page.locator('[contenteditable]').isVisible())throw Error('Copy edit');
await variant('统一引用面板');
await page.locator('[data-filter="block"]').click();
if(await page.locator('.rr-result').count()!==1)throw Error('Filter');
await page.locator('[data-unified-insert="embed"]').click();
if(!(await page.locator('[data-output="unified"]').textContent()).includes('对于任意'))throw Error('Embed');
await page.locator('[data-output="unified"] button').click();
if(!await page.locator('[data-source="unified"]').isVisible())throw Error('Unified source');
await page.locator('#rr-unified-search').fill('无匹配');
if(!await page.locator('.rr-detail').isHidden())throw Error('Empty state');
await page.locator('#rr-unified-search').fill('BIBO');await page.locator('[data-filter="all"]').click();
await page.screenshot({path:'.tmp/editor-reference-review/unified-desktop.png',fullPage:true});
for(const width of [320,390,736]){await page.setViewportSize({width,height:1000});for(const name of ['概念库','可复用段落','统一引用面板']){await variant(name);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);if(overflow)throw Error('Overflow '+name+' '+width);}}
await page.emulateMedia({colorScheme:'dark'});await page.addStyleTag({content:'html{color-scheme:dark}'});await page.screenshot({path:'.tmp/editor-reference-review/unified-dark.png',fullPage:true});
console.log(JSON.stringify({errors,interactions:'concept insert, source, anchor; block save, link, editable copy; unified filter, embed, source, empty results',widths:[320,390,736]}));
await browser.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
