const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height] of [[1440, 1000], [1024, 768], [768, 1024], [390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:4321/blog', { waitUntil: 'networkidle' });
    await page.locator('astro-dev-toolbar').evaluateAll(elements => elements.forEach(e => e.remove()));
    for (const theme of ['dark', 'light']) {
      await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
      const panel = page.locator('#snowfield-traverse');
      await panel.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await page.waitForTimeout(200);
      const result = await panel.evaluate(panel => {
        const marker = panel.querySelector('.journey-chapter-marker');
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          mask: getComputedStyle(marker).backgroundColor,
          background: getComputedStyle(panel).backgroundColor,
          paperFacets: [...panel.querySelectorAll('.life-marker-facet')].map(face => ({ fill: getComputedStyle(face).fill, stroke: getComputedStyle(face).stroke, opacity: getComputedStyle(face).strokeOpacity })),
          clips: panel.querySelectorAll('.life-rift-upper[clip-path]').length,
          upperFaces: panel.querySelectorAll((innerWidth <= 768 ? '.life-rift-mobile' : '.life-rift-desktop') + ' .life-rift-upper .terrain-face').length,
        };
      });
      if (result.overflow || result.mask !== 'rgba(0, 0, 0, 0)' || result.clips || !result.paperFacets.length || result.paperFacets.some(face => face.fill !== result.background || face.stroke === 'none' || +face.opacity === 0)) throw Error(JSON.stringify(result));
      if ([1440, 390].includes(width)) await page.screenshot({ path: `.tmp/life-background-${theme}-${width}.png` });
      console.log(width, height, theme, JSON.stringify(result));
    }
  }
  await browser.close();
  if (errors.length) throw Error(errors.join('\n'));
})().catch(error => { console.error(error); process.exit(1); });
