const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const fixture = 'src/content/collections/workspace-verification-series.yaml';
assert(!fs.existsSync(fixture));
fs.writeFileSync(fixture, 'collectionId: workspace-verification-series\nslug: workspace-verification-series\nproject: 2026-cicc\nlabels:\n  zh:\n    title: 验证合集\n  en:\n    title: Verification\n  de:\n    title: Test\ntags: []\nfeatured: false\norder: 0\ncreatedAt: 2026-10-24T00:00:00.000Z\n');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4321/keystatic/workspace');
    await page.locator('.editor-toolbar').waitFor();
    const editor = page.frameLocator('iframe');
    const navigate = async url => {
      await page.locator('iframe').evaluate((frame, url) => { frame.src = url; }, url);
      await editor.locator('[data-ws-metadata]').waitFor();
      await page.waitForTimeout(300);
    };
    await navigate('/keystatic/collection/articlesZh/item/deep-in-2nd-order-system');
    const toggle = page.locator('[data-ws-properties-toggle]');
    if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
    const title = editor.locator('[data-ws-article-field="title"] input');
    const titleBox = await title.boundingBox();
    const labelBox = await editor.locator('[data-ws-article-field="title"] label').boundingBox();
    assert(Math.abs(titleBox.y + titleBox.height / 2 - labelBox.y - labelBox.height / 2) < 5, 'Title must be inline');
    assert(titleBox.x > labelBox.x, 'Input must be right of caption');
    assert.equal(await title.evaluate(e => getComputedStyle(e).borderBottomWidth), '0px');
    const summary = editor.locator('[data-ws-article-field="excerpt"] textarea');
    assert.equal(await summary.evaluate(e => e.clientHeight), 112);
    await summary.fill(Array.from({length:8}, (_, i)=>`摘要第 ${i+1} 行`).join('\n'));
    await page.waitForTimeout(150);
    assert(await summary.evaluate(e => e.clientHeight) >= 224, 'Summary must grow');
    const publication = await editor.locator('[data-ws-article-form]').evaluate(root => [...root.children].filter(e=>e.dataset.wsArticleField).sort((a,b)=>Number(a.style.order)-Number(b.style.order)).map(e=>e.dataset.wsArticleField));
    assert.deepEqual(publication.slice(publication.indexOf('locale'), publication.indexOf('featured')+1), ['locale','status','published','updated','tags','author','featured']);
    for (const [label, query, key] of [['直属分类','analog','analog-ic'],['所属项目','two-stage','two-stage-ota'],['所属合集','workspace-verification','workspace-verification-series']]) {
      const input = editor.getByRole('combobox', { name: label, exact: true });
      assert((await input.boundingBox()).width > 150);
      await input.fill(query);
      const option=editor.getByRole('option').filter({hasText:key});
      const chosenLabel=(await option.innerText()).split('\n')[0];
      await option.click();
      await title.focus();
      assert.equal(await input.inputValue(), chosenLabel);
    }
    console.log('PASS article title, summary, publication group, category/project/series search and selection');
    await title.scrollIntoViewIfNeeded();
    await page.screenshot({path:'.tmp/article-properties.png',fullPage:true});
    await navigate('/keystatic/collection/articlesZh/create');
    const canonical = editor.locator('[data-ws-canonical-id]');
    await canonical.fill('workspace-test-article');
    await editor.locator('[data-ws-article-field="title"] input').fill('验证文章');
    for (const label of ['稳定内容 ID','文件键','翻译组 ID','URL slug']) {
      assert.equal(await editor.getByRole('textbox',{name:new RegExp('^'+label),includeHidden:true}).inputValue(),'workspace-test-article',label);
    }
    console.log('PASS four linked IDs stay synchronized after React rerender');
    await navigate('/keystatic/collection/projects/item/2026-cicc');
    const category = editor.getByRole('combobox',{name:/^所属分类/});
    assert((await category.boundingBox()).width > 150);
    await category.fill('reading');
    await editor.getByRole('option').filter({hasText:'reading'}).click();
    assert.equal(await category.inputValue(),'阅读');
    await navigate('/keystatic/collection/series/item/workspace-verification-series');
    const project = editor.getByRole('combobox',{name:/^所属项目/});
    assert((await project.boundingBox()).width > 150);
    await project.fill('two-stage');
    await editor.getByRole('option').filter({hasText:'two-stage-ota'}).click();
    assert.equal(await project.inputValue(),'二级运放搭建全流程');
    console.log('PASS project category and series project selectors');
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(()=>fs.unlinkSync(fixture));
