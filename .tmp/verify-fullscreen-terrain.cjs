const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['zh', 'en', 'de']) {
      await page.goto(`http://127.0.0.1:4321/fixtures/terrain-preview?lang=${lang}`, { waitUntil: 'networkidle' });
      const size = width <= 768 ? 2 : 4;
      const total = Math.ceil(9 / size);
      assert.equal(await page.locator('[data-life-status]').innerText(), `1 / ${total}`);
      assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(), size);
      for (let index = 1; index < total; index++) {
        await page.locator('[data-life-direction="1"]').click();
        await page.waitForFunction(value => document.querySelector('[data-life-status]').textContent === value, `${index + 1} / ${total}`);
      }
      assert(await page.locator('[data-life-direction="1"]').isDisabled());
      assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(), 1);
      const issues = await page.evaluate(() => {
        const problems = [];
        for (const panel of document.querySelectorAll('.snowline-panel')) {
          if (panel.scrollWidth > panel.clientWidth + 1) problems.push('horizontal overflow');
          const scene = panel.querySelector('.journey-landscape').getBoundingClientRect();
          const box = panel.getBoundingClientRect();
          if (Math.abs(scene.width - box.width) > 1 || Math.abs(scene.height - box.height) > 1) problems.push('background not fullscreen');
        }
        for (const a of document.querySelectorAll('.life-landing, .station-stop')) {
          if (getComputedStyle(a).backgroundColor !== 'rgba(0, 0, 0, 0)') problems.push('opaque entrance');
          if (a.scrollWidth > a.clientWidth + 1) problems.push('entrance overflow');
        }
        return problems;
      });
      assert.deepEqual(issues, [], `${width}/${lang}`);
      const recent = page.locator('.life-recent-list');
      assert.equal(await recent.locator('li').count(), 20);
      assert(await recent.evaluate(e => e.scrollHeight > e.clientHeight));
      await recent.focus(); await page.keyboard.press('End');
      await page.waitForFunction(() => document.querySelector('.life-recent-list').scrollTop > 0);
      await page.locator('#night-camp').evaluate(e => e.scrollIntoView({ behavior: 'instant' }));
      const ladder = await page.locator('.station-ladder').boundingBox();
      const panel = await page.locator('#night-camp').boundingBox();
      assert(Math.abs(ladder.y - panel.y) < 1, 'ladder reaches screen top');
      const list = page.locator('.station-timeline');
      assert(await list.evaluate(e => e.scrollHeight > e.clientHeight));
      await list.focus(); await page.keyboard.press('End');
      await page.waitForFunction(() => document.querySelector('.station-timeline').scrollTop > 0);
      assert.deepEqual(await page.locator('.station-ladder').boundingBox(), ladder);
      if ([390, 1440].includes(width) && lang === 'zh') {
        for (const theme of ['light', 'dark']) {
          await page.evaluate(t => document.documentElement.dataset.theme = t, theme);
          for (const id of ['snowfield-traverse', 'night-camp']) {
            await page.locator(`#${id}`).evaluate(e => e.scrollIntoView({ behavior: 'instant' }));
            await page.locator(`#${id}`).screenshot({path: `.tmp/chapter-landscapes/fullscreen-${width}-${theme}-${id}.png`});
          }
        }
      }
    }
  }
  await page.setViewportSize({width: 1440, height: 900});
  await page.goto('http://127.0.0.1:4321/fixtures/terrain-preview', {waitUntil: 'networkidle'});
  await page.setViewportSize({width: 390, height: 844});
  await page.waitForFunction(() => document.querySelector('[data-life-status]').textContent === '1 / 5');
  await page.setViewportSize({width: 1440, height: 900});
  await page.waitForFunction(() => document.querySelector('[data-life-status]').textContent === '1 / 3');
  assert.deepEqual(errors, []);
  console.log('PASS: 15 viewport/language cases, fullscreen backgrounds, transparent entrances, 4/2 pagination, both scrolling lists, fixed ladder, resize regrouping.');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
