const {chromium} = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async()=>{
  const browser = await chromium.launch({headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4321/fixtures/workspace-preview');
    await page.getByRole('button',{name:'切换深色'}).waitFor();
    await page.waitForFunction(()=>!document.querySelector('astro-island').hasAttribute('ssr'));
    for(const id of ['skill','study','life','documents','unassigned']) {
      await page.getByLabel('选择内容 group').selectOption(id);
      await page.waitForFunction(id=>document.querySelector('.wp').dataset.group===id,id);
      assert.equal(await page.locator('.wp').getAttribute('data-group'),id);
      assert(await page.locator('.wp-palette[aria-pressed=true]').count()===1);
      assert.equal(await page.locator('.wp-workbench').evaluate(e=>getComputedStyle(e).getPropertyValue('--wp-accent').trim()),await page.locator('.wp-palette[aria-pressed=true]').evaluate(e=>getComputedStyle(e).getPropertyValue('--wp-accent').trim()));
      await page.screenshot({path:`.tmp/workspace-design-${id}.png`,fullPage:true});
    }
    await page.getByLabel('选择内容 group').selectOption('study');
    await page.getByLabel('文稿标题').fill('在自己的风景里，慢慢写作');
    assert.equal(await page.locator('.wp-paper > h2').innerText(),'在自己的风景里，慢慢写作');
    await page.locator('.wp-save-area').getByRole('button').click();
    assert.equal(await page.locator('.wp-save-note').innerText(),'本次预览已暂存');
    await page.getByRole('button',{name:'新建内容',exact:true}).click();
    await page.getByRole('dialog').waitFor();
    await page.getByRole('button',{name:'关闭新建预览'}).click();
    for(const type of ['category','project','article']) await page.getByLabel('属性布局示例').selectOption(type);
    await page.getByRole('button',{name:'切换深色'}).click();
    await page.screenshot({path:'.tmp/workspace-design-dark.png',fullPage:true});
    for(const width of [1440,1024,768,390,320]) {
      await page.setViewportSize({width,height:1000});
      await page.reload();
      await page.getByRole('button',{name:'切换深色'}).waitFor();
      await page.waitForFunction(()=>!document.querySelector('astro-island').hasAttribute('ssr'));
      await page.waitForTimeout(250);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Page overflow ${width}`);
      if(width<=850) {
        assert.equal(await page.locator('.wp-workbench').getAttribute('data-tree'),'false');
        await page.getByRole('button',{name:'展开属性'}).click();
        assert(await page.getByLabel('文稿标题').isVisible());
        await page.getByRole('button',{name:'收起属性'}).click();
        await page.getByRole('button',{name:'展开目录'}).click();
        await page.getByLabel('选择内容 group').selectOption('life');
        await page.getByRole('button',{name:'收起目录'}).click();
      }
      await page.screenshot({path:`.tmp/workspace-design-${width}.png`,fullPage:true});
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: five group palettes, title edit, preview save, modal, three forms, dark mode, and 320–1440px layouts');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
