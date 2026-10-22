const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('.tmp/chapter-landscapes', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  for (const [width, height] of [[320, 740], [390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    for (const lang of ['zh', 'en', 'de']) {
      await page.goto(`http://127.0.0.1:4321/fixtures/chapter-rebuild-check?lang=${lang}`, { waitUntil: 'networkidle' });
      for (const [id, selector, expected] of [['snowfield-traverse', '.life-landing', 6], ['night-camp', '.station-stop', 5]]) {
        const panel = page.locator(`#${id}`);
        await panel.evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
        const result = await panel.evaluate((el, { selector, expected }) => {
          const failures = [];
          if (el.scrollWidth > el.clientWidth) failures.push('panel overflow');
          const links = [...el.querySelectorAll(selector)];
          if (links.length !== expected) failures.push('missing entrances');
          const overlap = (a,b) => Math.min(a.right,b.right) - Math.max(a.left,b.left) > 1 && Math.min(a.bottom,b.bottom) - Math.max(a.top,b.top) > 1;
          const boxes = links.map(a => a.getBoundingClientRect());
          for (let i=0; i<boxes.length; i++) {
            if (links[i].scrollWidth > links[i].clientWidth + 2) failures.push('card overflow');
            for (let j=i+1; j<boxes.length; j++) if (overlap(boxes[i],boxes[j])) failures.push('overlapping cards');
          }
          if (overlap(el.querySelector('.journey-chapter-marker').getBoundingClientRect(), el.querySelector('.journey-chapter-heading').getBoundingClientRect())) failures.push('heading overlaps chapter marker');
          const list = el.querySelector('.life-recent-list, .station-journal-more');
          if (!list || list.children.length !== (selector === '.life-landing' ? 3 : 2)) failures.push('incorrect recent content');
          return failures;
        }, { selector, expected });
        failures.push(...result.map(f => `${width}/${lang}/${id}: ${f}`));
        const first = panel.locator(selector).first();
        await first.focus();
        if (!(await first.evaluate(el => el === document.activeElement))) failures.push('keyboard focus failed');
        if ((width === 1440 && lang === 'de') || (width === 390 && lang === 'en')) await panel.screenshot({ path: `.tmp/chapter-landscapes/populated-${width}-${lang}-${id}.png` });
      }
    }
  }
  await page.goto('http://127.0.0.1:4321/fixtures/chapter-rebuild-check?empty', { waitUntil: 'networkidle' });
  if (await page.locator('.life-landing, .station-stop, .station-feature').count()) failures.push('empty state has fake links');
  if (await page.locator('.life-recent-empty, .station-rest').count() !== 2) failures.push('missing empty states');
  console.log(JSON.stringify({ cases: 30, failures }));
  await browser.close();
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exit(1); });
