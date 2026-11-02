import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';

// Run against an existing dev server. All edits stay in this disposable browser;
// the save endpoint is blocked as a second safeguard against writing real content.
const base = process.env.KEYSTATIC_EDITOR_TEST_URL || 'http://127.0.0.1:4323';
const article = '/keystatic/collection/articlesZh/item/c4-differential-amp';
const sourceFile = 'src/content/articles/zh/c4-differential-amp/index.mdoc';
const sourceHash = () => createHash('sha256').update(fs.readFileSync(sourceFile)).digest('hex');
const beforeHash = sourceHash();
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'keystatic-editor-check-'));
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
  const blockedWrites = [];
  const errors = [];
  let sequence = 0;
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Fetch.requestPaused') {
      blockedWrites.push(message.params.request.url);
      void call('Fetch.failRequest', {
        requestId: message.params.requestId,
        errorReason: 'BlockedByClient',
      });
    }
    if (message.method === 'Runtime.exceptionThrown')
      errors.push(message.params.exceptionDetails.text);
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
  const inside = (code) =>
    evaluate(
      `(async()=>{const d=document.querySelector('iframe')?.contentDocument||document;const w=d.defaultView;const e=d.querySelector('.ProseMirror');${code}})()`,
    );
  const assert = (value, message) => {
    if (!value) throw new Error(message);
  };
  const waitFor = async (expression, message) => {
    for (let i = 0; i < 200; i++) {
      if (await evaluate(expression)) return;
      await pause(100);
    }
    throw new Error(message);
  };
  const ready = () =>
    waitFor(
      `!!document.querySelector('iframe')?.contentDocument?.querySelector('.ProseMirror [data-editor-math]')`,
      'Keystatic editor did not load.',
    );
  const viewport = async (width) => {
    await call('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: width < 640,
    });
    await pause(180);
  };
  const key = async (name, code, virtual, modifiers = 0, text) => {
    await call('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: name,
      code,
      windowsVirtualKeyCode: virtual,
      nativeVirtualKeyCode: virtual,
      modifiers,
      ...(text ? { text } : {}),
    });
    await call('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: name,
      code,
      windowsVirtualKeyCode: virtual,
      nativeVirtualKeyCode: virtual,
      modifiers,
    });
    await pause(80);
  };
  const openMath = async (kind) => {
    await inside(`d.querySelector('[data-editor-math="${kind}"] [role="button"]').click();`);
    await waitFor(
      `!!(document.querySelector('iframe')?.contentDocument||document).querySelector('[data-editor-math-dialog][open] textarea')`,
      'Formula dialog did not open.',
    );
  };
  const typeFormula = async (expression) => {
    await inside(
      `const input=d.querySelector('[data-editor-math-dialog] textarea');input.focus();input.select();`,
    );
    await call('Input.insertText', { text: expression });
    await pause(80);
    assert(
      await inside(
        `return d.querySelector('[data-editor-math-dialog] textarea').value===${JSON.stringify(expression)};`,
      ),
      'Formula input did not retain its exact source.',
    );
  };
  const model = () => inside(`return JSON.stringify(e.pmViewDesc.node.toJSON());`);
  const expressions = () =>
    inside(
      `const values=[];e.pmViewDesc.node.descendants(node=>{if(node.type.name==='inlineMath'||node.type.name==='math')values.push({kind:node.type.name,expression:node.attrs.props.value.expression});});return values;`,
    );
  const checkPaste = async () => {
    const result = await inside(
      `const input=d.querySelector('[data-editor-math-dialog] textarea'),dialog=input.closest('dialog');const before=JSON.stringify(e.pmViewDesc.node.toJSON());const data=new w.DataTransfer();data.setData('text/plain','\\\\frac{a_i}{b_i}');data.setData('text/html','<p>\\\\frac{a_i}{b_i}</p>');const event=new w.ClipboardEvent('paste',{clipboardData:data,bubbles:true,cancelable:true});input.dispatchEvent(event);return {outside:!input.closest('.ProseMirror')&&dialog.parentElement===d.body,prevented:event.defaultPrevented,unchanged:before===JSON.stringify(e.pmViewDesc.node.toJSON()),focused:d.activeElement===input};`,
    );
    assert(
      result.outside && !result.prevented && result.unchanged && result.focused,
      'Formula paste was intercepted by the document editor: ' + JSON.stringify(result),
    );
  };
  const outlineState = () =>
    inside(
      `const o=d.querySelector('[data-ws-outline]'),host=o?.parentElement,r=o?.getBoundingClientRect(),er=e.getBoundingClientRect();return {mode:host?.dataset.wsOutlineHost,hidden:o?.hidden,open:o?.open,top:r?.top,right:r?.right,left:r?.left,height:r?.height,editorRight:er.right,buttons:[...o.querySelectorAll('button')].map(b=>b.textContent),position:w.getComputedStyle(o).position,hostTop:host.getBoundingClientRect().top,hostRight:host.getBoundingClientRect().right};`,
    );
  await call('Page.enable');
  await call('Page.bringToFront');
  await call('Runtime.enable');
  await call('Fetch.enable', { patterns: [{ urlPattern: '*/api/keystatic/update*' }] });
  await viewport(1600);
  await call('Page.navigate', {
    url: base + '/keystatic/workspace?editor=' + encodeURIComponent(article),
  });
  await ready();
  await pause(200);
  let outline = await outlineState();
  assert(
    outline.mode === 'docked' &&
      !outline.hidden &&
      outline.open &&
      outline.left >= outline.editorRight - 1 &&
      outline.buttons.length === 3,
    'Wide outline is not visible to the right: ' + JSON.stringify(outline),
  );
  const originalModel = await model();
  const originalExpressions = await expressions();
  await openMath('inline');
  await checkPaste();
  const inline = String.raw`x_i^2 + \frac{a_i}{b_i}`;
  await typeFormula(inline);
  assert((await model()) === originalModel, 'Typing a formula changed the document before Apply.');
  assert(
    await inside(`return !d.querySelector('[data-editor-math-dialog] [role="alert"]');`),
    'Valid inline formula failed to preview.',
  );
  await key('Enter', 'Enter', 13, 2);
  assert(
    await inside(`return !d.querySelector('[data-editor-math-dialog]');`),
    'Ctrl+Enter did not apply the formula.',
  );
  assert(
    (await expressions())[0].expression === inline,
    'Applied inline formula was not retained.',
  );
  const appliedModel = await model();
  await openMath('inline');
  await typeFormula('temporary draft');
  await key('Escape', 'Escape', 27);
  assert((await model()) === appliedModel, 'Cancel changed the saved node value.');
  assert(
    await inside(`return d.activeElement?.getAttribute('aria-label')==='编辑行内公式';`),
    'Cancel did not return focus to the formula.',
  );
  await openMath('block');
  await checkPaste();
  const block = String.raw`\begin{aligned}a_i &= b_i \\ c_i &= d_i\end{aligned}`;
  await typeFormula(block);
  await key('Enter', 'Enter', 13, 0, '\r');
  const multiline = await inside(
    `return d.querySelector('[data-editor-math-dialog] textarea').value;`,
  );
  assert(multiline.includes('\n'), 'Enter did not insert a newline in the formula source.');
  assert(
    (await model()) === appliedModel,
    'Block formula input modified ordinary document content.',
  );
  await inside(
    `[...d.querySelectorAll('[data-editor-math-dialog] button')].find(button=>button.textContent==='应用公式').click();`,
  );
  await pause(100);
  assert(
    (await expressions()).find((value) => value.kind === 'math').expression === multiline,
    'Block formula did not preserve line breaks and backslashes.',
  );
  assert(
    (await expressions()).length === originalExpressions.length,
    'Editing a formula inserted or deleted other formulas.',
  );
  await inside(`d.querySelector('[data-ws-body-pane] button[aria-haspopup="true"]').click();`);
  await waitFor(
    `!!document.querySelector('iframe').contentDocument.querySelector('[role="menuitem"]')`,
    'Component menu did not open.',
  );
  await inside(
    `[...d.querySelectorAll('[role="menuitem"]')].find(item=>item.textContent==='块级公式').click();`,
  );
  await waitFor(
    `!!document.querySelector('iframe').contentDocument.querySelector('[data-editor-math-dialog][open]')`,
    'New formula did not open its source editor.',
  );
  assert(
    await inside(
      `return d.querySelector('[data-editor-math-dialog] textarea').value===''&&d.querySelector('[data-editor-math-dialog] button').disabled;`,
    ),
    'An empty formula should begin in edit mode with Apply disabled.',
  );
  await typeFormula(String.raw`\frac{`);
  assert(
    await inside(`return !!d.querySelector('[data-editor-math-dialog] [role="alert"]');`),
    'Invalid source did not show a recoverable preview error.',
  );
  await typeFormula('E=mc^2');
  assert(
    await inside(`return !d.querySelector('[data-editor-math-dialog] [role="alert"]');`),
    'Preview did not recover after correcting LaTeX.',
  );
  await inside(
    `[...d.querySelectorAll('[data-editor-math-dialog] button')].find(button=>button.textContent==='删除公式').click();`,
  );
  await pause(100);
  assert(
    !(await inside(`return !!d.querySelector('[data-editor-math-dialog]');`)) &&
      (await expressions()).length === originalExpressions.length,
    'Deleting a formula did not close and remove only its node.',
  );
  console.log(
    'Formula editing: isolated paste, exact LaTeX, live preview, newline, apply, cancel, and focus passed.',
  );

  await viewport(1280);
  outline = await outlineState();
  assert(
    outline.mode === 'compact' && !outline.hidden && outline.height > 0,
    'Compact outline disappeared.',
  );
  await inside(`d.querySelector('[data-ws-outline-host]').scrollTop=700;`);
  await pause(100);
  outline = await outlineState();
  assert(
    outline.top >= outline.hostTop - 1 && outline.top < outline.hostTop + 5,
    'Outline disclosure scrolled out of view.',
  );
  await inside(
    `const o=d.querySelector('[data-ws-outline]');if(!o.open)o.querySelector('summary').click();`,
  );
  await pause(100);
  await inside(`d.querySelector('[data-ws-outline] button:last-child').click();`);
  await pause(100);
  assert(
    await inside(
      `const h=e.querySelector('h3'),r=h.getBoundingClientRect();return r.top>=65&&r.bottom<w.innerHeight&&h.contains(w.getSelection().anchorNode);`,
    ),
    'Outline jump did not focus and reveal the heading.',
  );
  await evaluate(`document.querySelector('[title^="专注时"]').click()`);
  await pause(180);
  outline = await outlineState();
  assert(!outline.hidden && outline.height > 0, 'Focus mode hid the outline.');
  await openMath('inline');
  await key('Escape', 'Escape', 27);
  assert(
    await inside(`return d.documentElement.dataset.wsFocus==='true';`),
    'Closing a formula unexpectedly exited focus mode.',
  );
  await inside(`e.focus();`);
  await key('Escape', 'Escape', 27);
  assert(
    await inside(`return d.documentElement.dataset.wsFocus==='false';`),
    'Escape did not exit focus mode.',
  );
  await inside(`e.querySelector('h3').textContent='大纲同步测试';`);
  await pause(180);
  assert(
    (await outlineState()).buttons.at(-1) === '大纲同步测试',
    'Renaming a heading did not refresh the outline.',
  );
  await inside(`const h=d.createElement('h2');h.textContent='新增标题';e.append(h);`);
  await pause(180);
  assert(
    (await outlineState()).buttons.length === 4,
    'Adding a heading did not refresh the outline.',
  );
  console.log(
    'Outline: right docking, narrow disclosure, scrolling, jumping, focus mode, and live headings passed.',
  );

  await viewport(390);
  await evaluate(
    `const tree=[...document.querySelectorAll('button')].find(b=>b.textContent==='收起文件树');tree?.click();`,
  );
  await pause(150);
  await evaluate(
    `const properties=document.querySelector('[data-ws-properties-toggle]');if(properties?.getAttribute('aria-expanded')==='true')properties.click();`,
  );
  await pause(150);
  outline = await outlineState();
  assert(
    !outline.hidden && outline.left >= 0 && outline.right <= 390,
    'Mobile outline is outside the viewport.',
  );
  await openMath('block');
  assert(
    await inside(
      `const r=d.querySelector('[data-editor-math-dialog]').getBoundingClientRect();return r.left>=0&&r.right<=w.innerWidth&&r.top>=0&&r.bottom<=w.innerHeight;`,
    ),
    'Mobile formula dialog overflows the viewport.',
  );
  await key('Escape', 'Escape', 27);
  await inside(
    `for(const heading of e.querySelectorAll('h2,h3')){const p=d.createElement('p');p.textContent=heading.textContent;heading.replaceWith(p);}`,
  );
  await pause(180);
  assert(
    await inside(
      `return d.querySelector('[data-ws-outline] nav p')?.textContent==='添加标题后显示大纲';`,
    ),
    'Empty outline does not explain how to populate it.',
  );

  await viewport(1440);
  await call('Page.navigate', { url: base + article });
  await waitFor(
    `!!document.querySelector('.ProseMirror [data-editor-math]')`,
    'Standalone Keystatic editor did not load.',
  );
  await openMath('inline');
  await checkPaste();
  await key('Escape', 'Escape', 27);
  assert(!blockedWrites.length, 'The test attempted to save real content.');
  assert(sourceHash() === beforeHash, 'The source article changed during the test.');
  assert(!errors.length, 'Unexpected browser errors: ' + errors.join('; '));
  console.log('Mobile, standalone editor, empty headings, and read-only source checks passed.');
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
