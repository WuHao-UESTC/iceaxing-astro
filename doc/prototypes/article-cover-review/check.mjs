import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'article-cover-review-'));
const browser = spawn(
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${browserProfile}`,
    'about:blank',
  ],
  { stdio: 'ignore', windowsHide: true },
);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
try {
  const portFile = path.join(browserProfile, 'DevToolsActivePort');
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
  const directory = path.resolve('doc/prototypes/article-cover-review');
  const navigate = async (name) => {
    await call('Page.navigate', {
      url:
        pathToFileURL(path.join(directory, name.split('?')[0])).href +
        (name.includes('?') ? '?' + name.split('?')[1] : ''),
    });
    await pause(180);
    await evaluate(`document.fonts.ready`);
    await evaluate(`Promise.all([...document.images].map(image=>image.decode().catch(()=>{})))`);
  };
  const screenshot = async (name) => {
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(directory, name + '.png'), Buffer.from(shot.data, 'base64'));
  };
  await call('Page.enable');
  const pages = ['index', 'a-list', 'a-article', 'b-list', 'b-article', 'c-list', 'c-article'];
  let checked = 0;
  for (const page of pages) {
    await call('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await navigate(page + '.html');
    for (const width of [1440, 768, 390]) {
      await call('Emulation.setDeviceMetricsOverride', {
        width,
        height: width === 390 ? 844 : 1100,
        deviceScaleFactor: 1,
        mobile: width === 390,
      });
      for (const theme of ['dark', 'light']) {
        await evaluate(`document.documentElement.dataset.theme='${theme}'`);
        const result = await evaluate(
          `({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(image=>!image.naturalWidth).map(image=>image.src)})`,
        );
        if (result.scrollWidth > result.width)
          result.overflow = await evaluate(
            `[...document.body.querySelectorAll('*')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right})).slice(0,12)`,
          );
        assert(result.scrollWidth <= result.width && !result.broken.length, {
          page,
          theme,
          ...result,
        });
        checked++;
        if (theme === 'dark' && (width === 1440 || width === 390))
          await screenshot(`${page}-${width}`);
      }
    }
    if (page.endsWith('list')) {
      const filter = await evaluate(`(()=>{
        document.querySelector('[data-filter="life"]').click();const life=[...document.querySelectorAll('.entry')].filter(e=>!e.hidden).length;
        document.querySelector('[data-filter="technical"]').click();const technical=[...document.querySelectorAll('.entry')].filter(e=>!e.hidden).length;
        document.querySelector('[data-filter="all"]').click();return {life,technical};
      })()`);
      assert(filter.life === 1 && filter.technical === 3, { page, filter });
    }
    if (page !== 'index') {
      await evaluate(`document.querySelector('[data-diagram-toggle]').click()`);
      await evaluate(
        `Promise.all([...document.querySelectorAll('.cover img')].map(img=>img.decode()))`,
      );
      const fit = await evaluate(
        `[...document.querySelectorAll('.cover img')].every(img=>img.src.endsWith('diagram.jpg')&&getComputedStyle(img).objectFit==='contain')`,
      );
      assert(fit, { page, diagramContain: fit });
    }
  }
  for (const variant of ['a', 'b', 'c']) {
    await navigate(`${variant}-article.html?article=electrical-wire`);
    const empty = await evaluate(
      `({title:document.querySelector('h1').textContent,coverHidden:document.querySelector('.reader-cover').hidden,overflow:document.documentElement.scrollWidth>innerWidth})`,
    );
    assert(empty.title === 'C4-导线' && empty.coverHidden && !empty.overflow, {
      variant,
      ...empty,
    });
    await navigate(`${variant}-article.html?article=ramble-happiness-at-fingertip`);
    assert(
      await evaluate(`document.querySelector('h1').textContent==='指缝间漏出来的幸福'`),
      'List-to-reader article selection.',
    );
  }
  console.log(
    `Verified ${checked} page/theme/viewport combinations, all images, category filters, diagram fit, article links and missing-cover layouts.`,
  );
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
