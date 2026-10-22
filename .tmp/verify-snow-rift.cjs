const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width > 768 ? 900 : 844 });
    for (const lang of ['zh', 'en', 'de']) {
      const response = await page.goto(`http://127.0.0.1:4321/fixtures/rift-preview?lang=${lang}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const count = width <= 768 ? 2 : 4;
      const pages = Math.ceil(9 / count);
      for (let index = 0; index < pages; index++) {
        assert.equal(await page.locator('[data-life-status]').innerText(), `${index + 1} / ${pages}`);
        assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(), Math.min(count, 9 - index * count));
        const issues = await page.evaluate(() => {
          const problems = [];
          const panel = document.querySelector('.snowline-life');
          if (panel.scrollWidth > panel.clientWidth + 1) problems.push('horizontal overflow');
          const cards = [...document.querySelectorAll('[data-life-page]:not([inert]) .life-landing')];
          for (const card of cards) {
            if (card.scrollWidth > card.clientWidth + 1) problems.push('card overflow');
            if (getComputedStyle(card).backgroundColor !== 'rgba(0, 0, 0, 0)') problems.push('opaque card');
          }
          for (let a = 0; a < cards.length; a++) for (let b = a + 1; b < cards.length; b++) {
            const x = cards[a].getBoundingClientRect(), y = cards[b].getBoundingClientRect();
            if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 1 && Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 1) problems.push('overlapping categories');
          }
          const svg = panel.querySelector('svg');
          const banks = [...svg.querySelectorAll(matchMedia('(max-width: 48rem)').matches ? '.life-rift-mobile polygon' : '.life-rift-desktop polygon')];
          const inside = (x, y, polygon) => {
            const point = svg.createSVGPoint(); point.x = x; point.y = y;
            const local = point.matrixTransform(svg.getScreenCTM().inverse());
            return polygon.isPointInFill(local);
          };
          for (const card of cards) {
            const box = card.getBoundingClientRect();
            for (const [x, y] of [[box.left + 2, box.top + 2], [box.right - 2, box.top + 2], [box.left + 2, box.bottom - 2], [box.right - 2, box.bottom - 2]]) {
              if (banks.some(polygon => inside(x, y, polygon))) { problems.push('category touches snow bank'); break; }
            }
          }
          return problems;
        });
        assert.deepEqual(issues, [], `${width}/${lang}/page${index + 1}`);
        if (index < pages - 1) {
          await page.locator('[data-life-direction="1"]').click();
          await page.waitForFunction(text => document.querySelector('[data-life-status]').textContent === text, `${index + 2} / ${pages}`);
        }
      }
      const list = page.locator('.life-recent-list');
      assert.equal(await list.locator('li').count(), 20);
      assert(await list.evaluate(e => e.scrollHeight > e.clientHeight));
      await list.focus(); await page.keyboard.press('End');
      await page.waitForFunction(() => document.querySelector('.life-recent-list').scrollTop > 0);
      assert(await page.locator('[data-life-direction="1"]').isDisabled());
      if ([390, 1440].includes(width) && lang === 'zh') {
        await page.locator('[data-life-direction="-1"]').click();
        await page.waitForFunction(text => document.querySelector('[data-life-status]').textContent === text, `${pages - 1} / ${pages}`);
        await list.evaluate(e => { e.scrollTop = 0; e.blur(); });
        for (const theme of ['light', 'dark']) {
          await page.evaluate(t => document.documentElement.dataset.theme = t, theme);
          await page.locator('#snowfield-traverse').screenshot({ path: `.tmp/chapter-landscapes/rift-checked-${width}-${theme}.png` });
        }
      }
    }
  }
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: 15 viewport/language cases, all pagination states, transparent entrances inside rift, no overlapping categories, 20-article keyboard scrolling.');
})().catch(e => { console.error(e); process.exit(1); });
