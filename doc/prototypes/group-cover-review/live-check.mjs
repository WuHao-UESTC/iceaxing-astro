import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'folder-cover-live-'));
const browser = spawn(
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore', windowsHide: true },
);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4323';
let socket;
try {
  const portFile = path.join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !fs.existsSync(portFile); i++) await pause(100);
  const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
  const target = await (
    await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
  ).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  let sequence = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id) return;
    const response = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) response.reject(new Error(JSON.stringify(message.error)));
    else response.resolve(message.result);
  };
  const call = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const result = await call('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const assert = (value, detail) => {
    if (!value) throw new Error(JSON.stringify(detail));
  };
  const navigate = async (pathname) => {
    await call('Page.navigate', { url: base + pathname });
    for (let i = 0; i < 100; i++) {
      await pause(100);
      if (
        await evaluate(
          `location.href===${JSON.stringify(base + pathname)} && document.readyState==='complete' && !!document.querySelector('.archive-page')`,
        )
      )
        break;
    }
    await evaluate(`document.fonts.ready`);
    await evaluate(`Promise.all([...document.images].map(image=>image.decode().catch(()=>{})))`);
    await pause(400);
  };
  const viewport = (width) =>
    call('Emulation.setDeviceMetricsOverride', {
      width,
      height: width === 390 ? 844 : 1100,
      deviceScaleFactor: 1,
      mobile: width === 390,
    });
  const screenshot = async (name) => {
    const result = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(new URL(`${name}.png`, import.meta.url), Buffer.from(result.data, 'base64'));
  };
  const inspect = () =>
    evaluate(`(()=>{
    const hero=document.querySelector('.archive-folder-hero');
    const copy=hero?.querySelector('.archive-heading-copy').getBoundingClientRect();
    const cover=hero?.querySelector('.archive-folder-cover').getBoundingClientRect();
    const rows=[...document.querySelectorAll('.archive-entry-has-cover')];
    const stats=[...document.querySelectorAll('[data-stat-kind]')].map(el=>({kind:el.dataset.statKind,count:Number(el.dataset.statCount)}));
    const chapters=[...document.querySelectorAll('.archive-folder-chapters a')].map(el=>el.href);
    const layout=document.querySelector('.archive-layout').getBoundingClientRect();
    const sections=document.querySelector('.archive-sections').getBoundingClientRect();
    return {
      sidebar:!!document.querySelector('.archive-rail'),
      fullWidth:Math.abs(layout.left-sections.left)<1&&Math.abs(layout.right-sections.right)<1,
      progressBars:document.querySelectorAll('main progress').length,
      hero:!!hero,title:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,
      heroHeight:hero?.getBoundingClientRect().height,heroImages:hero?.querySelectorAll('img').length,
      wash:!!hero?.querySelector('.archive-folder-wash'),
      accent:getComputedStyle(document.querySelector('.archive-page')).getPropertyValue('--archive-accent').trim(),
      violet:getComputedStyle(document.querySelector('.archive-page')).getPropertyValue('--archive-violet').trim(),
      cover:hero?.querySelector('.archive-folder-cover img').getAttribute('src'),
      separate:!hero||copy.right<=cover.left+1||copy.bottom<=cover.top+1,
      fit:hero&&getComputedStyle(hero.querySelector('.archive-folder-cover img')).objectFit,
      broken:[...document.images].filter(image=>!image.naturalWidth).map(image=>image.src),
      heights:rows.map(row=>row.getBoundingClientRect().height),
      numbersSeparate:rows.every(row=>row.querySelector('.archive-number').getBoundingClientRect().right<=row.querySelector('.archive-entry-cover').getBoundingClientRect().left),
      group:document.querySelector('.archive-page')?.className,stats,
      progress:document.querySelector('.archive-folder-progress progress')?.value,
      chapters,chapterOrder:chapters.every((href,i)=>href===rows[i]?.href&&document.querySelectorAll('.archive-folder-chapters a')[i].textContent.trim().endsWith(rows[i]?.querySelector('h3').textContent.trim())),
      cards:[...document.querySelectorAll('.archive-folder-entry')].map(row=>({
        overlap:row.querySelector('.archive-entry-copy').getBoundingClientRect().right>row.querySelector('.archive-folder-entry-cover').getBoundingClientRect().left+1 && row.querySelector('.archive-entry-copy').getBoundingClientRect().top<row.querySelector('.archive-folder-entry-cover').getBoundingClientRect().bottom-1,
      })),
    };
  })()`);
  const validate = (result, context, hasHero = true) => {
    assert(
      result.hero === hasHero &&
        !result.overflow &&
        result.separate &&
        !result.broken.length &&
        result.numbersSeparate &&
        result.heights.every((height) => Math.abs(height - 144) < 1) &&
        result.cards.every((card) => !card.overlap),
      { ...context, ...result },
    );
    if (hasHero) {
      assert(!result.sidebar && result.fullWidth, { ...context, ...result });
      assert(result.fit === 'contain' && !result.wash && result.heroImages === 1, {
        ...context,
        ...result,
      });
      if (context.kind || context.width >= 640)
        assert(result.heroHeight <= (context.width >= 640 ? 380 : 610), { ...context, ...result });
      if (result.group.includes('archive-folder-group-camp'))
        assert(result.accent === result.violet, { ...context, ...result });
    }
  };
  await call('Page.enable');
  let checked = 0;
  for (const group of ['study', 'skill', 'life', 'camp'])
    for (const kind of ['category', 'project', 'collection']) {
      await viewport(1440);
      await navigate(
        `/fixtures/folder-covers?group=${group === 'camp' ? 'life' : group}&kind=${kind}${group === 'camp' ? '&scene=camp' : ''}`,
      );
      for (const width of [1440, 768, 390]) {
        await viewport(width);
        for (const theme of ['dark', 'light']) {
          await evaluate(`document.documentElement.dataset.theme='${theme}'`);
          const result = await inspect();
          validate(result, { group, kind, width, theme });
          assert(result.group.includes('archive-folder-group-' + group), result);
          if (group === 'camp') assert(result.cover === '/media/folders/camp.svg', result);
          assert(kind !== 'project' || result.progress === 65, result);
          assert(result.progressBars === (kind === 'project' ? 1 : 0), result);
          assert(
            kind !== 'collection' || (result.chapters.length === 3 && result.chapterOrder),
            result,
          );
          for (const stat of result.stats)
            assert(stat.count === (stat.kind === 'article' ? 3 : 2), result);
          if (kind === 'category' && (width === 1440 || width === 390))
            await screenshot(`live-${group}-${theme}-${width}`);
          if (kind === 'project' && group === 'study' && width === 1440 && theme === 'dark')
            await screenshot('live-collections');
          checked++;
        }
      }
    }
  for (const pathname of [
    '/analog-ic',
    '/analog-ic/2026-cicc',
    '/razavi-cmos-analog-note',
    '/journey',
    '/daily-ramblings',
    '/en/analog-ic',
    '/de/analog-ic',
    '/articles',
    '/projects',
  ]) {
    await viewport(1440);
    await navigate(pathname);
    for (const width of [1440, 390]) {
      await viewport(width);
      for (const theme of ['dark', 'light']) {
        await evaluate(`document.documentElement.dataset.theme='${theme}'`);
        const result = await inspect();
        validate(
          result,
          { pathname, width, theme },
          !['/articles', '/projects'].includes(pathname),
        );
        if (pathname === '/daily-ramblings') {
          assert(
            result.title === '碎碎念' &&
              result.accent === result.violet &&
              result.group.includes('archive-folder-group-camp'),
            result,
          );
          await screenshot(`live-ramblings-${theme}-${width}`);
        }
        if (pathname === '/analog-ic' && width === 1440 && theme === 'dark')
          await screenshot('live-actual-diagram');
        checked++;
      }
    }
  }
  await navigate('/fixtures/folder-covers?group=study&kind=project&material=diagram');
  validate(await inspect(), { material: 'diagram', width: 390 });
  console.log(
    `Verified ${checked + 1} live group/level/theme/viewport cases, including real routes and diagram cover.`,
  );
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
