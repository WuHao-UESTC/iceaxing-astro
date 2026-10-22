const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [320,390,768,1024,1440]) {
    await page.setViewportSize({width,height:900});
    for (const lang of ['zh','en','de']) {
      const response = await page.goto(`http://127.0.0.1:4321/fixtures/entrance-preview?lang=${lang}`,{waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      const size = width <= 768 ? 2 : 4;
      const total = Math.ceil(9/size);
      for (let index=0; index<total; index++) {
        assert.equal(await page.locator('[data-life-status]').innerText(),`${index+1} / ${total}`);
        assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(),Math.min(size,9-index*size));
        const issues = await page.evaluate(() => {
          const problems=[];
          const cards=[...document.querySelectorAll('[data-life-page]:not([inert]) .life-landing')];
          for (const card of cards) {
            const style=getComputedStyle(card);
            if (style.backgroundColor!=='rgba(0, 0, 0, 0)' || style.borderTopWidth!=='0px') problems.push('not transparent/borderless');
            const number=card.querySelector('.life-landing-number').getBoundingClientRect(),title=card.querySelector('h3').getBoundingClientRect();
            if(number.right>title.left || Math.abs(number.top-title.top)>35) problems.push('number not beside title');
            if(getComputedStyle(card.querySelector('.life-landing-number')).fontSize!==getComputedStyle(card.querySelector('h3')).fontSize) problems.push('number size differs');
            if(card.scrollWidth>card.clientWidth+1) problems.push('overflow');
          }
          for(let i=0;i<cards.length;i++) for(let j=i+1;j<cards.length;j++){
            const a=cards[i].getBoundingClientRect(),b=cards[j].getBoundingClientRect();
            if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)problems.push('overlap');
          }
          const controls=document.querySelector('.life-page-controls').getBoundingClientRect(),inner=document.querySelector('.journey-life-inner').getBoundingClientRect();
          const anchors=[...document.querySelectorAll('[data-rift-anchor]')];
          if(anchors.length!==cards.length)problems.push('missing anchor');
          for(const anchor of anchors)if(Number(anchor.dataset.drop)<8)problems.push('connector not downward: '+anchor.dataset.drop);
          if(Math.abs(controls.right-inner.right)>1 || controls.bottom<inner.top+inner.height*.85)problems.push('controls not lower right');
          return problems;
        });
        assert.deepEqual(issues,[],`${width}/${lang}/${index+1}`);
        const first = page.locator('[data-life-page]:not([inert]) .life-landing').first();
        await first.focus();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        await page.waitForFunction(()=>{
          const icon=document.querySelector('[data-life-page]:not([inert]) .life-landing:focus-visible .life-shard-direction');
          return icon && getComputedStyle(icon).opacity==='1';
        });
        if(index<total-1){
          await page.locator('[data-life-direction="1"]').click();
          await page.waitForFunction(s=>document.querySelector('[data-life-status]').textContent===s,`${index+2} / ${total}`);
        }
      }
      assert(await page.locator('[data-life-direction="1"]').isDisabled());
      await page.locator('[data-life-direction="-1"]').click();
      await page.waitForFunction(s=>document.querySelector('[data-life-status]').textContent===s,`${total-1} / ${total}`);
      if([390,1440].includes(width)&&lang==='zh'){
        for(const theme of ['light','dark']){
          await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
          await page.locator('#snowfield-traverse').screenshot({path:`.tmp/chapter-landscapes/entrances-${width}-${theme}.png`});
        }
      }
    }
  }
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log('PASS: 15 viewport/language cases, all pagination states (maximum 4), numbering, transparent surfaces, lower-right controls, keyboard focus.');
})().catch(e=>{console.error(e);process.exit(1)});
