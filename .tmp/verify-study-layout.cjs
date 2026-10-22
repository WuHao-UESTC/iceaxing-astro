const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['', 'en', 'de']) {
      await page.goto('http://127.0.0.1:4321/' + lang, { waitUntil: 'networkidle' });
      if (width > 768) {
        await page.locator('#study-terrace').evaluate(e => e.scrollIntoView({ behavior: 'instant' }));
        const stars = page.locator('[data-star]');
        for (let i = 0; i < await stars.count(); i++) {
          const star = stars.nth(i);
          await star.locator('.study-star-core').hover();
          assert(await star.evaluate(s => s.matches(':hover')), `Star core blocked: ${width}/${lang}/${i}`);
          assert.equal(await star.locator('.study-star-tooltip').evaluate(e => getComputedStyle(e).opacity), '1');
        }
      }
      await page.locator('[data-star]').first().click();
      const problems = await page.locator('[data-constellation]').evaluate(root => {
        const problems = [];
        const summary = root.querySelector('[data-topic]:not([hidden])');
        const title = summary.querySelector('h3').getBoundingClientRect();
        const link = summary.querySelector('a').getBoundingClientRect();
        const reset = root.querySelector('[data-star-reset]').getBoundingClientRect();
        const stats = root.querySelector('.study-atlas-toolbar > p').getBoundingClientRect();
        const map = root.querySelector('.study-star-map').getBoundingClientRect();
        if (link.left < title.right - 1) problems.push('title and category link overlap');
        if (reset.left < stats.right - 1) problems.push('status and reset overlap');
        if (Math.abs(reset.right - map.right) > 1) problems.push('reset not aligned to map');
        if (Math.abs((reset.top + reset.height / 2) - (stats.top + stats.height / 2)) > 1) problems.push('reset not inline');
        if (summary.scrollWidth > summary.clientWidth + 1) problems.push('summary overflows');
        const panel = root.querySelector('[data-topic]:not([hidden])');
        if (panel.getAttribute('aria-labelledby') !== summary.querySelector('h3').id) problems.push('heading relationship broken');
        const list = panel.querySelector('.study-article-list'), sample = list.querySelector('a');
        if (sample) {
          list.replaceChildren(...Array.from({ length: 16 }, () => sample.cloneNode(true)));
          list.scrollTop = 500;
          if (!list.scrollTop) problems.push('list does not scroll');
        }
        return problems;
      });
      assert.deepEqual(problems, [], `${width}/${lang}`);
      const nextId = await page.locator('[data-star]').nth(1).getAttribute('data-star');
      await page.locator('[data-star-select]').selectOption(nextId);
      assert.equal(await page.locator('[data-topic]:not([hidden])').getAttribute('data-topic'), nextId);
      await page.locator('[data-star-reset]').click();
      assert.equal(await page.locator('[data-star-detail]').isVisible(), false);
      await page.locator('[data-star]').first().focus();
      await page.keyboard.press('Enter');
      assert(await page.locator('[data-topic]:not([hidden]) h3').evaluate(e => e === document.activeElement));
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('[data-star-detail]').isVisible(), false);
    }
  }
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('PASS: 15 viewport/language cases; all desktop star cores hover, toolbar alignment, summaries, list scrolling, selection, keyboard and reset.');
})().catch(e => { console.error(e); process.exit(1); });
