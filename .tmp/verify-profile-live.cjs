const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
const fs = require('node:fs');
const yaml = require('yaml');
const origin = 'http://127.0.0.1:4323';
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  const results = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [url, full] of [['/profile', false], ['/fixtures/profile-refactor-review', true], ['/en/profile', false], ['/de/profile', false]]) {
    const response = await page.goto(origin + url, { waitUntil: 'networkidle' });
    if (response.status() !== 200) throw new Error(url + ': HTTP ' + response.status());
    await page.locator('.profile-page').waitFor();
    await page.locator('astro-dev-toolbar').evaluateAll(elements => elements.forEach(el => el.remove()));
    const widths = url.startsWith('/en') || url.startsWith('/de') ? [1440, 390] : [1440, 1024, 900, 768, 640, 390, 375, 320];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
        const metrics = await page.evaluate(() => {
          const note = document.querySelector('.profile-biography');
          const sections = [...document.querySelectorAll('.profile-section')];
          const entries = [...document.querySelectorAll('.profile-honors > li, .profile-research-item, .profile-project-archive > li')];
          const heading = document.querySelector('.profile-identity-main').getBoundingClientRect();
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            sections: sections.map(section => section.querySelector('h2').textContent),
            outline: [...document.querySelectorAll('.reader-toc a')].map(link => link.textContent),
            biographyInHeader: !!note?.closest('header'),
            notebookTransparent: getComputedStyle(note).backgroundColor === 'rgba(0, 0, 0, 0)',
            biographyRight: note.getBoundingClientRect().left >= heading.right,
            noInnerDividers: entries.every(el => ['borderTopWidth', 'borderBottomWidth'].every(key => getComputedStyle(el)[key] === '0px')),
            sectionDividers: sections.every(el => getComputedStyle(el).borderBottomWidth === '1px'),
            workFont: [...document.querySelectorAll('.profile-inline-meta')].every(meta => ['fontFamily','fontSize','fontWeight'].every(key => getComputedStyle(meta)[key] === getComputedStyle(meta.parentElement)[key])),
            projects: [...document.querySelectorAll('.profile-project-archive a')].map(link => ({ href: link.getAttribute('href'), target: link.target })),
          };
        });
        if (metrics.overflow || !metrics.biographyInHeader || !metrics.notebookTransparent || !metrics.noInnerDividers || !metrics.sectionDividers || !metrics.workFont || metrics.outline.join() !== metrics.sections.join() || (width === 1440 && !metrics.biographyRight) || (full && metrics.sections.length !== 5)) errors.push({url,width,theme,metrics});
        if (!full && url === '/profile' && metrics.sections.some(title => ['所获荣誉','工作经历'].includes(title))) errors.push('Empty sections are visible');
        if ([1440,390].includes(width) && (full || url === '/profile')) await page.screenshot({ path: `.tmp/profile-live-${full?'all-sections':'actual'}-${theme}-${width}.png`, fullPage: true });
        results.push({ url,width,theme,overflow:metrics.overflow });
      }
    }
    if (full) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('.reader-toc summary').click();
      await page.locator('.reader-toc a[href="#profile-work"]').click();
      await page.waitForTimeout(300);
      const nav = await page.evaluate(() => ({ top: document.getElementById('profile-work').getBoundingClientRect().top, closed: !document.querySelector('.reader-toc').open }));
      if (!nav.closed) errors.push({nav});
      await context.route('https://example.org/project', route => route.fulfill({ body: 'External project navigation check' }));
      const popupPromise = page.waitForEvent('popup');
      await page.locator('.profile-project-archive a[href="https://example.org/project"]').click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      if (popup.url() !== 'https://example.org/project') errors.push('External navigation failed');
      await popup.close();
    }
  }
  // Audit migration once; future edits to biography are intentionally unrestricted.
  for (const language of ['zh','en','de']) {
    const original = fs.readFileSync(`doc/design/backups/profile-before-refactor/profile-${language}.mdoc`, 'utf8');
    const current = fs.readFileSync(`src/content/pages/${language}/profile-${language}/index.mdoc`, 'utf8');
    const data = yaml.parse(current.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]).profile;
    const body = original.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    if (data.biography !== body.split(/^## /m)[0].trim() || JSON.stringify(data.directions) !== JSON.stringify([...body.matchAll(/^- (.+)$/gm)].map(match=>match[1].trim()))) errors.push('Migration changed source text: '+language);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin+'/keystatic/collection/pagesZh/item/profile-zh', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '.tmp/profile-keystatic-initial.png', fullPage: true });
  console.log('CMS_INITIAL', JSON.stringify({ url:page.url(), text:(await page.locator('body').innerText()).slice(0,10000), fields:await page.locator('input,textarea').evaluateAll(els=>els.map(el=>({label:el.getAttribute('aria-labelledby'),value:el.value}))) }));
  console.log('PROFILE_RESULTS', JSON.stringify({ checked:results.length, results, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
