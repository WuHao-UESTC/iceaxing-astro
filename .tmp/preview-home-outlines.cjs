const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:4321/blog', { waitUntil: 'networkidle' });
    await page.locator('.terrain-face').first().waitFor({ state: 'attached' });
    await page.locator('astro-dev-toolbar').evaluateAll(elements => elements.forEach(element => element.remove()));
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
      const panels = page.locator('.snowline-panel');
      for (let i = 0; i < await panels.count(); i++) {
        const panel = panels.nth(i);
        await panel.evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'start' }));
        await page.waitForTimeout(180);
        const styles = await panel.locator('.terrain-face').evaluateAll(faces => faces.map(face => {
          const style = getComputedStyle(face);
          return { fill: style.fill, stroke: style.stroke, width: style.strokeWidth, effect: style.vectorEffect };
        }));
        if (!styles.length || styles.some(style => style.stroke === style.fill || style.width !== '0.8px' || style.effect !== 'non-scaling-stroke')) throw Error('Missing outline: ' + device + theme + i);
        if ((device === 'desktop' && theme === 'dark') || i === 0) await page.screenshot({ path: `.tmp/home-outline-${device}-${theme}-${i}.png` });
      }
      console.log(device, theme, 'all 5 chapter outlines OK; horizontal overflow:', await page.evaluate(() => document.documentElement.scrollWidth > innerWidth));
    }
  }
  console.log('Page errors:', errors);
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exit(1); });
