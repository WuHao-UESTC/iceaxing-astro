const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width > 1000 ? 900 : 844 });
    for (const lang of ['zh', 'en', 'de']) {
      await page.goto(`http://127.0.0.1:4321/fixtures/chapter-redesign-check?lang=${lang}`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('[data-life-status]').innerText(), '1 / 3');
      assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(), 4);
      await page.locator('[data-life-direction="1"]').click();
      await page.waitForFunction(() => document.querySelector('[data-life-status]').textContent === '2 / 3');
      assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(), 4);
      await page.locator('[data-life-direction="1"]').click();
      await page.waitForFunction(() => document.querySelector('[data-life-status]').textContent === '3 / 3');
      assert.equal(await page.locator('[data-life-page]:not([inert]) .life-landing').count(), 1);
      assert(await page.locator('[data-life-direction="1"]').isDisabled());
      await page.locator('[data-life-direction="-1"]').click();
      await page.waitForFunction(() => document.querySelector('[data-life-status]').textContent === '2 / 3');
      const problems = await page.evaluate(() => {
        const issues = [];
        for (const panel of document.querySelectorAll('.snowline-panel')) if (panel.scrollWidth > panel.clientWidth) issues.push('panel overflow');
        const cards = [...document.querySelectorAll('[data-life-page]:not([inert]) .life-landing')];
        for (const c of cards) if (c.scrollWidth > c.clientWidth + 1) issues.push('card overflow');
        for (let i = 0; i < cards.length; i++) for (let j = i + 1; j < cards.length; j++) {
          const a = cards[i].getBoundingClientRect(), b = cards[j].getBoundingClientRect();
          if (Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1) issues.push('cards overlap');
        }
        return issues;
      });
      assert.deepEqual(problems, [], `${width}/${lang}`);
      await page.locator('#night-camp').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
      const timeline = page.locator('.station-timeline');
      assert.equal(await page.locator('.station-journal-list li').count(), 20);
      assert(await timeline.evaluate(el => el.scrollHeight > el.clientHeight));
      await timeline.focus();
      const ladderTop = await page.locator('.station-ladder').evaluate(el => el.getBoundingClientRect().top);
      await page.keyboard.press('End');
      await page.waitForTimeout(80);
      assert(await timeline.evaluate(el => el.scrollTop > 0));
      assert.equal(await page.locator('.station-ladder').evaluate(el => el.getBoundingClientRect().top), ladderTop);
      if (lang === 'de' && [390,1440].includes(width)) {
        for (const id of ['night-camp', 'snowfield-traverse']) {
          await page.locator(`#${id}`).evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
          await page.locator(`#${id}`).screenshot({ path: `.tmp/chapter-landscapes/new-populated-${width}-${id}.png` });
        }
      }
    }
  }
  for (const [path, articles, projects] of [['/', '文章', '项目'], ['/en', 'Articles', 'Projects'], ['/de', 'Artikel', 'Projekte']]) {
    await page.goto(`http://127.0.0.1:4321${path}`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.site-header a[href$="/articles"], .site-header a[href$="/projects"]').count(), 0);
    assert.equal(await page.locator('.desktop-navigation .nav-list > li').count(), 8);
    assert((await page.locator('.journey-hero-archives').innerText()).includes(articles));
    assert((await page.locator('.journey-hero-archives').innerText()).includes(projects));
  }
  assert.deepEqual(errors, []);
  console.log('PASS: 15 populated layout cases; 4-per-page pagination; 20-note scrolling; fixed ladder; keyboard; 3-language navigation.');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

