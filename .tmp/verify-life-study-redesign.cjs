const { chromium } = require('./welcome-browser-tools/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height] of [[1440,1000],[1440,800],[1024,768],[768,1024],[390,844],[320,844]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:4321/blog', { waitUntil: 'networkidle' });
    await page.locator('astro-dev-toolbar').evaluateAll(elements => elements.forEach(e => e.remove()));
    for (const theme of ['dark', 'light']) {
      await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
      for (const id of ['snowfield-traverse', 'study-terrace']) {
        const panel = page.locator('#'+id);
        await panel.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
        await page.waitForTimeout(200);
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Horizontal overflow');
        if (id === 'snowfield-traverse') {
          const intrusions = await panel.evaluate(panel => {
            const svg = panel.querySelector('.life-library-landscape');
            const polygon = svg.querySelector(innerWidth <= 768 ? '#life-upper-mobile polygon' : '#life-upper-desktop polygon');
            const vertices = [...polygon.points].map(p => [p.x,p.y]);
            const inside = (x,y) => { let hit=false; for(let i=0,j=vertices.length-1;i<vertices.length;j=i++) {const a=vertices[i],b=vertices[j]; if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;} return hit; };
            const inverse = svg.getScreenCTM().inverse();
            let hits=0;
            for(const text of panel.querySelectorAll('.journey-chapter-marker > span, .journey-chapter-marker > div')) {
              const box=text.getBoundingClientRect();
              for(let x=box.left-8;x<=box.right+8;x+=4)for(let y=box.top-8;y<=box.bottom+8;y+=4) {const p=new DOMPoint(x,y).matrixTransform(inverse); if(inside(p.x,p.y)) hits++;}
            }
            return hits;
          });
          if(intrusions) throw Error(`Terrain intrudes on marker at ${width}x${height} ${theme}: ${intrusions}`);
        } else if(await panel.locator(width <= 768 ? '.study-mountains-mobile [data-study-depth]' : '.study-mountains-desktop [data-study-depth]').count() !== 3) throw Error('Missing mountain layers');
        if([1440,390].includes(width) && height!==800) await page.screenshot({path:`.tmp/redesign-${id}-${theme}-${width}.png`});
      }
    }
    console.log(width+'x'+height, 'both themes: marker clear, three mountain layers, no overflow');
  }
  console.log('page errors', errors);
  await browser.close();
  if(errors.length)process.exitCode=1;
})().catch(e => { console.error(e);process.exit(1); });
