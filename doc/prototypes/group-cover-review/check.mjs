import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'group-cover-review-'));
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
  const pending = new Map();
  let sequence = 0;
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
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
  const directory = path.resolve('doc/prototypes/group-cover-review');
  const navigate = async (name) => {
    await call('Page.navigate', { url: pathToFileURL(path.join(directory, name)).href });
    await pause(100);
    await evaluate(`document.fonts.ready`);
    await evaluate(`Promise.all([...document.images].map(image=>image.decode().catch(()=>{})))`);
  };
  const screenshot = async (name) => {
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(directory, name + '.png'), Buffer.from(shot.data, 'base64'));
  };
  await call('Page.enable');
  let checked = 0;
  for (const plan of ['a', 'b', 'c'])
    for (const group of ['study', 'skill', 'life']) {
      const name = `${plan}-${group}`;
      await call('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 1100,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await navigate(name + '.html');
      for (const level of ['category', 'project', 'collection']) {
        await evaluate(`document.querySelector('[data-select-level="${level}"]').click()`);
        for (const width of [1440, 768, 390]) {
          await call('Emulation.setDeviceMetricsOverride', {
            width,
            height: width === 390 ? 844 : 1100,
            deviceScaleFactor: 1,
            mobile: width === 390,
          });
          for (const theme of ['dark', 'light']) {
            await evaluate(`document.documentElement.dataset.theme='${theme}'`);
            const result = await evaluate(`(()=>{
            const panels=[...document.querySelectorAll('[data-level]')].filter(panel=>!panel.hidden);
            const hero=panels[0].querySelector('.folder-hero'),copy=hero.querySelector('.hero-copy').getBoundingClientRect(),cover=hero.querySelector('.hero-cover').getBoundingClientRect();
            return {active:panels.length,level:panels[0].dataset.level,overflow:document.documentElement.scrollWidth>innerWidth,
              coverSeparate:copy.right<=cover.left+1||cover.right<=copy.left+1||copy.bottom<=cover.top+1||cover.bottom<=copy.top+1,
              images:[...document.images].filter(img=>!img.naturalWidth).map(img=>img.src),
              articleHeights:[...panels[0].querySelectorAll('.article-rows>li')].map(row=>row.getBoundingClientRect().height)};
          })()`);
            assert(
              result.active === 1 &&
                result.level === level &&
                !result.overflow &&
                result.coverSeparate &&
                !result.images.length &&
                new Set(result.articleHeights).size === 1,
              { plan, group, level, width, theme, ...result },
            );
            checked++;
            if (theme === 'dark' && level === 'category' && (width === 1440 || width === 390))
              await screenshot(`${name}-${width}`);
            if (theme === 'dark' && group === 'study' && level === 'collection' && width === 1440)
              await screenshot(`${name}-collection`);
          }
        }
      }
      await evaluate(`document.querySelector('[data-material-toggle]').click()`);
      await evaluate(
        `Promise.all([...document.querySelectorAll('.cover img')].map(img=>img.decode()))`,
      );
      assert(
        await evaluate(
          `[...document.querySelectorAll('.cover:not(.is-empty) img')].every(img=>img.src.endsWith('diagram.jpg')&&getComputedStyle(img).objectFit==='contain')`,
        ),
        { name, diagram: 'Must preserve complete diagrams.' },
      );
      await evaluate(`document.querySelector('[data-empty-toggle]').click()`);
      assert(
        await evaluate(
          `[...document.querySelectorAll('.cover img')].every(img=>getComputedStyle(img).visibility==='hidden')`,
        ),
        { name, empty: 'Placeholder state.' },
      );
      await evaluate(
        `document.querySelector('[data-empty-toggle]').click();document.querySelector('[data-material-toggle]').click()`,
      );
      const jump = await evaluate(
        `(()=>{document.querySelector('[data-select-level="category"]').click();document.querySelector('[data-level="category"] .folder-card').click();return document.querySelector('[data-level="project"]').hidden===false;})()`,
      );
      assert(jump, { name, links: 'Folder entry opens next hierarchy level.' });
      console.log(
        `${name}: all levels, viewport sizes, themes, full diagrams, no-cover and folder navigation passed.`,
      );
    }
  await navigate('index.html');
  for (const width of [1440, 390]) {
    await call('Emulation.setDeviceMetricsOverride', {
      width,
      height: width === 390 ? 844 : 1100,
      deviceScaleFactor: 1,
      mobile: width === 390,
    });
    assert(
      await evaluate(`document.documentElement.scrollWidth<=innerWidth`),
      'Comparison page overflow.',
    );
    await screenshot(`index-${width}`);
  }
  console.log(`Verified ${checked} design/group/level/viewport/theme combinations.`);
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
