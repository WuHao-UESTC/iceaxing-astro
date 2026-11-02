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
    await call('Page.navigate', { url: `http://127.0.0.1:4326/${page}` });
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
  const state = () =>
    evaluate(
      `(() => {const cards=[...document.querySelectorAll('.tool-card')].filter(c=>!c.hidden);const c=cards[0];return {count:cards.length,grid:getComputedStyle(document.querySelector('.tools-grid')).gridTemplateColumns,rects:cards.slice(0,5).map(c=>{const r=c.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}}),background:c&&getComputedStyle(c).backgroundColor,border:c&&getComputedStyle(c).borderWidth,aside:!!document.querySelector('aside'),theme:document.documentElement.dataset.theme,overflow:document.documentElement.scrollWidth>innerWidth,shown:document.querySelector('[data-count]').textContent,empty:!document.querySelector('.empty-state').hidden,art:document.querySelectorAll('.tool-card svg').length}})()`,
    );
  for (const design of ['a', 'b', 'c']) {
    await metrics(1440, 1100);
    await navigate(`${design}.html`);
    await evaluate(
      `if(document.documentElement.dataset.theme==='light')document.querySelector('[data-theme-toggle]').click()`,
    );
    let s = await state();
    assert(
      s.count === 17 &&
        s.art === 17 &&
        s.rects[0].y === s.rects[3].y &&
        s.rects[4].y > s.rects[0].y &&
        s.grid.split(' ').length === 4,
      `${design}: desktop four-column gallery of all tools`,
      s,
    );
    assert(
      !s.aside && s.background === 'rgba(0, 0, 0, 0)' && s.border === '0px',
      `${design}: no sidebar; transparent borderless cards`,
      s,
    );
    await screenshot(`${design}-desktop`);
    await evaluate(`document.querySelector('[data-filter="感知"]').click()`);
    s = await state();
    assert(s.count === 5 && s.shown === '5', `${design}: category filter works`, s);
    await evaluate(
      `(() => {document.querySelector('[data-filter="全部"]').click();const i=document.querySelector('input[type=search]');i.value='星座';i.dispatchEvent(new Event('input'));})()`,
    );
    s = await state();
    assert(s.count === 1 && s.shown === '1', `${design}: search works`, s);
    await evaluate(
      `(() => {const i=document.querySelector('input[type=search]');i.value='不存在的工具';i.dispatchEvent(new Event('input'));})()`,
    );
    s = await state();
    assert(s.count === 0 && s.empty, `${design}: empty search state works`, s);
    await evaluate(
      `(() => {const i=document.querySelector('input[type=search]');i.value='';i.dispatchEvent(new Event('input'));document.querySelector('[data-theme-toggle]').click();})()`,
    );
    s = await state();
    assert(s.theme === 'light' && !s.overflow, `${design}: theme switch works`, s);
    await screenshot(`${design}-light`);
    await metrics(820, 1100);
    s = await state();
    assert(s.grid.split(' ').length === 2 && !s.overflow, `${design}: tablet has two columns`, s);
    await metrics(390, 1000);
    await pause(80);
    s = await state();
    assert(s.grid.split(' ').length === 1 && !s.overflow, `${design}: mobile has one column`, s);
    await screenshot(`${design}-mobile`);
    await metrics(320, 800);
    s = await state();
    assert(!s.overflow, `${design}: no overflow on 320px screen`, s);
    const links = await evaluate(`[...document.querySelectorAll('.tool-link')].map(a=>a.href)`);
    assert(new Set(links).size === 17, `${design}: every card has its own tool link`);
  }
  await metrics(1440, 1100);
  await navigate('index.html');
  assert(
    await evaluate(
      `document.querySelectorAll('.proposal').length===3&&[...document.images].every(i=>i.complete&&i.naturalWidth>0)`,
    ),
    'Comparison page shows all three actual screenshot previews',
  );
  await screenshot('index-desktop');
  await metrics(390, 1000);
  await pause(50);
  assert(
    await evaluate(`document.documentElement.scrollWidth<=innerWidth`),
    'Comparison page fits mobile',
  );
  await screenshot('index-mobile');
  assert(errors.length === 0, 'No browser runtime errors', errors);
  console.log('Saved desktop, light, mobile and comparison screenshots.');
} finally {
  socket?.close();
  browser.kill();
}
