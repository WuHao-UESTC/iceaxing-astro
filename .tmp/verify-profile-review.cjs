const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
  });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(path.resolve('doc/design/profile-layout-review.html')).href);
  await page.evaluate(() => document.fonts.ready);
  const checks = [];
  for (const width of [1440, 1024, 768, 760, 390, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        sections: [...document.querySelectorAll('.section h2')].map(el => el.textContent),
        avatarLoaded: document.querySelector('.portrait img').naturalWidth > 0,
      }));
      if (metrics.overflow || !metrics.avatarLoaded || metrics.sections.length !== 5 || metrics.sections[0] !== '所获荣誉') errors.push({ width, theme, metrics });
      if ([1440, 390].includes(width)) await page.screenshot({ path: `.tmp/profile-review-${theme}-${width}.png`, fullPage: true });
      checks.push({ width, theme, overflow: metrics.overflow });
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; window.scrollTo(0, 0); });
  const layout = await page.evaluate(() => {
    const note = document.querySelector('.ruled-intro');
    const noteStyle = getComputedStyle(note);
    const identity = document.querySelector('.identity-main');
    const workTitle = document.querySelector('#work h3');
    const workMeta = workTitle.querySelector('.inline-meta');
    const awardTitle = document.querySelector('#awards h3');
    const awardMeta = awardTitle.querySelector('.inline-meta');
    const styleMatches = (a, b) => ['fontFamily', 'fontSize', 'fontWeight'].every(key => getComputedStyle(a)[key] === getComputedStyle(b)[key]);
    return {
      headerBiography: !!note.closest('.identity'),
      biographyOnRight: note.getBoundingClientRect().left > identity.getBoundingClientRect().right,
      noBiographySection: !document.querySelector('.sections #bio'),
      transparentNote: noteStyle.backgroundColor === 'rgba(0, 0, 0, 0)',
      ruledNote: noteStyle.backgroundImage.includes('repeating-linear-gradient'),
      workFontMatches: styleMatches(workTitle, workMeta),
      awardFontMatches: styleMatches(awardTitle, awardMeta),
      noIssuerField: !document.getElementById('field-groups').textContent.includes('颁发单位'),
      clickableProjects: [...document.querySelectorAll('.archive li')].every(item => item.querySelector('a[href]')),
      externalProject: !!document.querySelector('.archive a[href="https://github.com/"][target="_blank"]'),
    };
  });
  if (Object.values(layout).some(value => !value)) errors.push({ layout });
  await page.check('#degrees-toggle');
  if (await page.locator('.optional-degree:visible').count() !== 2) errors.push('Optional degrees did not appear');
  await page.uncheck('#degrees-toggle');
  if (await page.locator('.optional-degree:visible').count() !== 0) errors.push('Optional degrees did not hide');
  await page.click('#theme-toggle');
  if (await page.locator('html').getAttribute('data-theme') !== 'dark') errors.push('Theme button did not toggle');
  await page.click('#theme-toggle');
  await page.click('#cms-open');
  if (!(await page.locator('#cms-dialog').isVisible()) || await page.locator('.field-group').count() !== 6) errors.push('CMS preview did not open');
  await page.locator('.field-group').nth(2).locator('summary').click();
  await page.screenshot({ path: '.tmp/profile-review-fields.png' });
  await page.keyboard.press('Escape');
  if (await page.locator('#cms-dialog').isVisible()) errors.push('Escape did not close dialog');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click('#cms-open');
  await page.check('#degrees-toggle-mobile');
  await page.click('#cms-close');
  if (await page.locator('.optional-degree:visible').count() !== 2) errors.push('Mobile degree preview failed');
  await page.locator('.mobile-contents summary').click();
  await page.locator('.mobile-contents a[href="#research"]').click();
  const navigation = await page.evaluate(() => ({
    top: document.getElementById('research').getBoundingClientRect().top,
    closed: !document.querySelector('.mobile-contents').open,
    active: document.querySelector('.toc a[aria-current="location"]')?.hash,
  }));
  if (!navigation.closed || navigation.top < 54 || navigation.top > 100) errors.push({ navigation });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('#awards').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.context().route('https://github.com/', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>External navigation check</title>' }));
  const popupPromise = page.waitForEvent('popup');
  await page.locator('.archive a[href="https://github.com/"]').click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  if (popup.url() !== 'https://github.com/') errors.push('External project click did not navigate');
  await popup.close();
  console.log(JSON.stringify({ checks, layout, navigation, errors }, null, 2));
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
