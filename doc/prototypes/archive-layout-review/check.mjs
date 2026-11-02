import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const directory = path.resolve('doc/prototypes/archive-layout-review');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'archive-layout-review-'));
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
  const viewport = (width) =>
    call('Emulation.setDeviceMetricsOverride', {
      width,
      height: width < 640 ? 900 : 1100,
      deviceScaleFactor: 1,
      mobile: width < 640,
    });
  const navigate = async (name, query = '') => {
    await call('Page.navigate', {
      url: pathToFileURL(path.join(directory, name + '.html')).href + query,
    });
    for (let i = 0; i < 100; i++) {
      await pause(70);
      if (
        await evaluate(
          `document.readyState==='complete'&&!!document.querySelector(${JSON.stringify(name === 'index' ? '.plan-grid' : '.archive-page')})`,
        )
      )
        break;
    }
    await evaluate(`document.fonts.ready`);
    await images();
  };
  const images = () =>
    evaluate(`Promise.all([...document.images].map(image=>image.decode().catch(()=>{})))`);
  const screenshot = async (name) => {
    const result = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(directory, name + '.png'), Buffer.from(result.data, 'base64'));
  };
  const inspect = () =>
    evaluate(`(()=>{
    const cards=[...document.querySelectorAll('[data-card]')];
    const hero=document.querySelector('.archive-folder-hero');
    const copy=hero.querySelector('.archive-heading-copy').getBoundingClientRect(),cover=hero.querySelector('.archive-folder-cover').getBoundingClientRect();
    return {overflow:document.documentElement.scrollWidth>innerWidth,heroSeparate:copy.right<=cover.left+1||copy.bottom<=cover.top+1,
      broken:[...document.images].filter(image=>!image.naturalWidth).map(image=>image.src),cards:cards.map(card=>card.dataset.card),
      articleHeights:[...document.querySelectorAll('.archive-entry-has-cover')].map(row=>row.getBoundingClientRect().height),
      numbersSeparate:[...document.querySelectorAll('.archive-entry-has-cover')].every(row=>row.querySelector('.archive-number').getBoundingClientRect().right<=row.querySelector('.archive-entry-cover').getBoundingClientRect().left),
      sidebar:!!document.querySelector('.filter-rail'),oldSidebar:!!document.querySelector('.archive-rail'),
      empty:!!document.querySelector('.review-empty'),
      headings:[...document.querySelectorAll('.archive-group h2')].map(heading=>heading.textContent),
    };
  })()`);
  const validate = (result, context) =>
    assert(
      !result.overflow &&
        result.heroSeparate &&
        !result.broken.length &&
        !result.oldSidebar &&
        result.sidebar === (context.plan === 'e') &&
        new Set(result.cards).size === result.cards.length &&
        result.articleHeights.every((height) => Math.abs(height - 144) < 1) &&
        result.numbersSeparate,
      { ...context, ...result },
    );
  await call('Page.enable');
  await call('Page.bringToFront');
  let checked = 0;
  for (const plan of ['a', 'b', 'c', 'd', 'e'])
    for (const group of ['study', 'skill', 'life', 'camp'])
      for (const level of ['category', 'project', 'collection']) {
        await viewport(1440);
        await navigate(plan, `?group=${group}&level=${level}`);
        for (const width of [1440, 768, 390, 320]) {
          await viewport(width);
          for (const theme of ['dark', 'light']) {
            await evaluate(`document.documentElement.dataset.theme='${theme}'`);
            const result = await inspect();
            validate(result, { plan, group, level, width, theme });
            assert(result.cards.length === (level === 'collection' ? 4 : 6), {
              plan,
              group,
              level,
              ...result,
            });
            if (level === 'collection')
              assert(
                result.cards.every((id, index) => id === 'entry-' + index),
                { plan, group, level, ...result },
              );
            if (
              group === 'study' &&
              level === 'category' &&
              (width === 1440 || width === 390) &&
              theme === 'dark'
            )
              await screenshot(`${plan}-${width}`);
            if (group === 'camp' && level === 'category' && width === 1440 && theme === 'light')
              await screenshot(`${plan}-purple-light`);
            checked++;
          }
        }
      }
  for (const plan of ['a', 'b', 'c', 'd', 'e']) {
    await viewport(1440);
    await navigate(plan);
    for (const density of ['dense', 'sparse', 'empty']) {
      await evaluate(
        `(()=>{const control=document.querySelector('[data-density]');control.value='${density}';control.dispatchEvent(new Event('change',{bubbles:true}));})()`,
      );
      await images();
      for (const width of [1440, 390]) {
        await viewport(width);
        const result = await inspect();
        validate(result, { plan, density, width });
        assert(
          density === 'empty'
            ? result.empty && !result.cards.length
            : density === 'sparse'
              ? result.cards.length === 1
              : result.cards.length === 20,
          { plan, density, width, ...result },
        );
        checked++;
      }
    }
    if (['b', 'e'].includes(plan)) {
      await viewport(1440);
      await navigate(plan);
      if (plan === 'b') {
        await evaluate(`document.querySelector('[data-type="article"]').click()`);
        assert(
          await evaluate(
            `document.querySelectorAll('[data-card]').length===4&&document.querySelector('[data-type="article"]').getAttribute('aria-pressed')==='true'`,
          ),
          'Type filter failed.',
        );
        await evaluate(`document.querySelector('[data-type="all"]').click()`);
        await evaluate(
          `window.scrollTo(0,document.querySelector('.content-switch').getBoundingClientRect().top+scrollY+150)`,
        );
        await pause(200);
        assert(
          await evaluate(
            `Math.abs(document.querySelector('.content-switch').getBoundingClientRect().top)<2`,
          ),
          'Type switch is not sticky.',
        );
      } else {
        await evaluate(
          `(()=>{const input=document.querySelector('#entry-query');input.value='差动';input.dispatchEvent(new Event('input',{bubbles:true}));})()`,
        );
        assert(
          await evaluate(`document.querySelectorAll('[data-card]').length===2`),
          'Search did not match title and summary.',
        );
        await evaluate(
          `(()=>{const input=document.querySelector('#entry-query');input.value='不存在的标题XYZ';input.dispatchEvent(new Event('input',{bubbles:true}));})()`,
        );
        assert(
          await evaluate(
            `!!document.querySelector('.review-empty')&&document.querySelectorAll('[data-card]').length===0`,
          ),
          'Search empty state failed.',
        );
        await evaluate(`document.querySelector('[data-reset-filters]').click()`);
        assert(
          await evaluate(
            `document.querySelectorAll('[data-card]').length===6&&document.querySelector('#entry-query').value===''`,
          ),
          'Reset filters failed.',
        );
        await evaluate(`document.querySelector('[name="tag"]').click()`);
        assert(
          await evaluate(
            `document.querySelectorAll('[data-card]').length<6&&document.querySelectorAll('[data-card]').length>0`,
          ),
          'Tag filter failed.',
        );
        await viewport(390);
        assert(
          await evaluate(`!document.querySelector('.filter-panel').open`),
          'Mobile filters should start collapsed.',
        );
        await evaluate(`document.querySelector('.filter-panel summary').click()`);
        assert(
          await evaluate(`document.querySelector('.filter-panel').open`),
          'Mobile filter disclosure failed.',
        );
      }
    }
    await viewport(1440);
    await navigate(plan);
    await evaluate(`document.querySelector('.entry-link').click()`);
    assert(await evaluate(`document.querySelector('dialog').open`), 'Entry preview failed.');
    await call('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Escape',
      code: 'Escape',
      windowsVirtualKeyCode: 27,
      nativeVirtualKeyCode: 27,
    });
    await call('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Escape',
      code: 'Escape',
      windowsVirtualKeyCode: 27,
      nativeVirtualKeyCode: 27,
    });
    await pause(100);
    assert(
      await evaluate(`!document.querySelector('dialog').open`),
      'Escape did not close preview.',
    );
    await evaluate(`document.querySelector('[data-level="collection"]').click()`);
    assert(
      await evaluate(
        `document.querySelector('.archive-collection')&&new URLSearchParams(location.search).get('level')==='collection'`,
      ),
      'Level switch failed.',
    );
    await evaluate(
      `document.querySelector('[data-group]').value='camp';document.querySelector('[data-group]').dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-theme-toggle]').click()`,
    );
    assert(
      await evaluate(
        `document.querySelector('.archive-folder-group-camp')&&document.documentElement.dataset.theme==='light'&&document.querySelector('[data-plan-link]').href.includes('group=camp')`,
      ),
      'Group/theme/link state failed.',
    );
  }
  await navigate('index');
  for (const width of [1440, 390, 320]) {
    await viewport(width);
    assert(
      await evaluate(
        `document.documentElement.scrollWidth<=innerWidth&&document.querySelectorAll('.plan-card').length===5`,
      ),
      'Comparison page overflow.',
    );
    if (width !== 320) await screenshot('index-' + width);
  }
  console.log(
    `Verified ${checked} plan/group/level/theme/viewport/content cases, plus type filtering, search, tags, reset, mobile disclosure, dialogs, and controls.`,
  );
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
