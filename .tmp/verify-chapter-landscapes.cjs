const { chromium } = require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const fs = require('node:fs');

(async () => {
  fs.mkdirSync('.tmp/chapter-landscapes', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '* { scroll-behavior: auto !important; animation: none !important; transition: none !important; } [data-reveal] { opacity: 1 !important; transform: none !important; }' });
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width, height });
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
      for (const id of ['snowfield-traverse', 'night-camp']) {
        await page.locator(`#${id}`).evaluate(el => el.scrollIntoView());
        await page.waitForTimeout(250);
        await page.screenshot({ path: `.tmp/chapter-landscapes/${device}-${theme}-${id}.png` });
        console.log(JSON.stringify(await page.locator(`#${id}`).evaluate(el => ({ id: el.id, width: el.clientWidth, contentWidth: el.scrollWidth, height: el.clientHeight, visibleLandscapes: [...el.querySelectorAll('.journey-landscape')].filter(svg => getComputedStyle(svg).display !== 'none').length }))));
      }
    }
  }
  console.log(JSON.stringify({ errors }));
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exit(1); });
