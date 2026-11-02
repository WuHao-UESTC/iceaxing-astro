import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(path.join(root, 'screenshots'), { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-gallery-review-'));
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
  const pending = new Map(),
    errors = [];
  socket.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
    if (!m.id) return;
    const p = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) p.reject(new Error(JSON.stringify(m.error)));
    else p.resolve(m.result);
  };
  const call = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await call('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  const assert = (ok, label, detail) => {
    if (!ok) throw new Error(label + JSON.stringify({ detail, errors }));
    console.log('PASS', label);
  };
  await call('Runtime.enable');
  await call('Page.enable');
  const metrics = (width, height) =>
    call('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
  const navigate = async (page) => {
    await call('Page.navigate', { url: `http://127.0.0.1:4323/${page}` });
    for (let i = 0; i < 50; i++) {
      await pause(60);
      if (await evaluate(`document.readyState==='complete'`)) break;
    }
    await evaluate(`document.fonts.ready`);
    await pause(100);
  };
  const screenshot = async (name) => {
    const r = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(root, 'screenshots', `${name}.png`), Buffer.from(r.data, 'base64'));
  };
  const open = async (route) => {
    await navigate(route);
    for (let i = 0; i < 50; i++) {
      if (
        await evaluate(
          `!!customElements.get('tools-gallery')&&!!document.querySelector('.tg-card')`,
        )
      )
        break;
      await pause(100);
    }
    await pause(750);
  };
  const state = () =>
    evaluate(`(() => {
    const all=[...document.querySelectorAll('.tg-card')],cards=all.filter(c=>!c.hidden),first=cards[0],hero=document.querySelector('.tg-hero');
    return {total:all.length,visible:cards.length,displayed:Number(document.querySelector('[data-count]').textContent),grid:getComputedStyle(document.querySelector('.tg-grid')).gridTemplateColumns,
      rects:cards.slice(0,5).map(c=>{const r=c.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}}),
      background:first&&getComputedStyle(first).backgroundColor,border:first&&getComputedStyle(first).borderWidth,
      page:getComputedStyle(document.body).backgroundColor,title:getComputedStyle(hero.querySelector('h1')).color,header:getComputedStyle(document.querySelector('.site-header')).color,
      sidebar:!!document.querySelector('.archive-rail'),hero:hero.innerText,theme:document.documentElement.dataset.theme,
      overflow:document.documentElement.scrollWidth>innerWidth,empty:!document.querySelector('.tg-empty').hidden,art:all.filter(c=>!!c.querySelector('svg')).length,
      links:all.map(c=>c.querySelector('a').getAttribute('href')),alternate:[...document.querySelectorAll('link[rel=alternate][hreflang]')].map(a=>a.getAttribute('href'))};
  })()`);
  for (const prefix of ['', 'en/', 'de/']) {
    await metrics(1440, 1100);
    await open(prefix + 'tools');
    await evaluate(
      `if(document.documentElement.dataset.theme==='light')document.querySelector('[data-theme-toggle]').click()`,
    );
    let s = await state();
    assert(
      s.total > 0 && s.visible === s.total && s.art === s.total && s.displayed === s.total,
      'All registered tools rendered: ' + prefix,
      s,
    );
    assert(
      s.grid.split(' ').length === 4 &&
        s.rects[0].y === s.rects[3].y &&
        s.rects[4].y > s.rects[0].y,
      'Desktop four-column layout: ' + prefix,
      s,
    );
    assert(
      !s.sidebar && s.background === 'rgba(0, 0, 0, 0)' && s.border === '0px',
      'No directory or card panels: ' + prefix,
      s,
    );
    assert(
      s.page === 'rgb(13, 18, 17)' && s.title === 'rgb(234, 240, 237)' && s.header === s.title,
      'Original dark palette retained: ' + prefix,
      s,
    );
    assert(
      !/(17|十七|seventeen|siebzehn)/i.test(s.hero),
      'Hero has no fixed tool quantity: ' + prefix,
      s.hero,
    );
    assert(
      new Set(s.links).size === s.total &&
        s.links.every((link) => link.startsWith('/' + prefix + 'tools/')),
      'Unique localized tool destinations: ' + prefix,
      s.links,
    );
    assert(
      s.alternate.some((path) => path.endsWith('/en/tools')) &&
        s.alternate.some((path) => path.endsWith('/de/tools')),
      'Language alternates remain on tools page: ' + prefix,
      s.alternate,
    );
    if (!prefix) await screenshot('live-b-dark-desktop');
    for (const category of ['perception', 'create', 'explore', 'practical']) {
      const expected = await evaluate(
        `document.querySelectorAll('.tg-card[data-category="${category}"]').length`,
      );
      await evaluate(`document.querySelector('[data-filter="${category}"]').click()`);
      s = await state();
      assert(
        s.visible === expected && s.displayed === expected,
        'Filter and count ' + category + ': ' + prefix,
        s,
      );
    }
    await evaluate(
      `(() => {document.querySelector('[data-filter=all]').click();const input=document.querySelector('#tools-gallery-search');input.value='constellation';input.dispatchEvent(new Event('input'));})()`,
    );
    s = await state();
    assert(s.visible === 1, 'Search names and slugs: ' + prefix, s);
    if (prefix === 'de/') {
      await evaluate(
        `(() => {const input=document.querySelector('#tools-gallery-search');input.value='Farbgefuhl';input.dispatchEvent(new Event('input'));})()`,
      );
      assert((await state()).visible === 1, 'German diacritics can be omitted in search');
    }
    await evaluate(
      `(() => {const input=document.querySelector('#tools-gallery-search');input.value='nomatch-0000';input.dispatchEvent(new Event('input'));})()`,
    );
    s = await state();
    assert(s.empty && s.visible === 0 && s.displayed === 0, 'Empty state: ' + prefix, s);
    await evaluate(
      `(() => {const input=document.querySelector('#tools-gallery-search');input.value='';input.dispatchEvent(new Event('input'));document.querySelector('[data-theme-toggle]').click();})()`,
    );
    s = await state();
    assert(
      s.page === 'rgb(245, 247, 246)' && s.title === 'rgb(23, 34, 32)' && !s.overflow,
      'Original light palette retained: ' + prefix,
      s,
    );
    if (!prefix) await screenshot('live-b-light-desktop');
    for (const width of [820, 390, 320]) {
      await metrics(width, 1000);
      await pause(100);
      s = await state();
      const columns = width === 820 ? 2 : 1;
      assert(
        s.grid.split(' ').length === columns && !s.overflow,
        'Responsive ' + width + 'px: ' + prefix,
        s,
      );
      if (!prefix && width === 390) await screenshot('live-b-light-mobile');
    }
  }
  await metrics(1440, 1100);
  await navigate('tools/pomodoro');
  assert(
    await evaluate(
      `!!document.querySelector('.tool-page-pomodoro')&&!document.querySelector('tools-gallery')`,
    ),
    'Individual tool layout is unchanged',
  );
  assert(errors.length === 0, 'No runtime exceptions', errors);
} finally {
  socket?.close();
  browser.kill();
}
