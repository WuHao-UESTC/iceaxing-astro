import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-review-edge-'));
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${browserProfile}`, 'about:blank',
], { stdio: 'ignore', windowsHide: true });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  const portFile = path.join(browserProfile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !fs.existsSync(portFile); i++) await pause(100);
  const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  const pending = new Map();
  let seq = 0;
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const response = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) response.reject(new Error(JSON.stringify(message.error)));
    else response.resolve(message.result);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await call('Page.navigate', { url: pathToFileURL(path.resolve('doc/design/profile-review/revised-v2.html')).href });
  await pause(1200);
  const desktop = await evaluate(`(() => {
    const visiblePage = document.querySelector('.gallery-page:not([hidden])');
    const cards = [...visiblePage.children];
    const dimensions = cards.map(card => {
      const image = card.querySelector('.certificate').getBoundingClientRect();
      const caption = card.querySelector('.award').getBoundingClientRect();
      return {top:image.top,left:image.left,width:image.width,height:image.height,captionBelow:caption.top >= image.bottom};
    });
    return {title:document.title, headings:[...document.querySelectorAll('h2')].map(h=>h.textContent),
      biographySVG:!!document.querySelector('.bio svg'),biographyBackground:getComputedStyle(document.querySelector('.bio')).backgroundImage,
      dimensions,postcards:document.querySelectorAll('.postcard-sketch').length,
      completedCards:document.querySelectorAll('.more > a').length,
      brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
      overflow:document.documentElement.scrollWidth>innerWidth};
  })()`);
  if (desktop.biographySVG || desktop.overflow || desktop.brokenImages.length || desktop.dimensions.length !== 3 || desktop.dimensions.some(d=>!d.captionBelow)) throw new Error(JSON.stringify(desktop));
  console.log('Desktop:', JSON.stringify(desktop));
  const interaction = await evaluate(`(() => {
    document.querySelector('.next').click();
    const next=document.querySelector('.counter').textContent;
    document.querySelector('.gallery').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));
    const previous=document.querySelector('.counter').textContent;
    document.querySelector('#theme').click();
    const dark=document.documentElement.classList.contains('dark');
    document.querySelector('#theme').click();
    return {next,previous,dark};
  })()`);
  if(interaction.next !== '2 / 2' || interaction.previous !== '1 / 2' || !interaction.dark) throw new Error(JSON.stringify(interaction));
  console.log('Interactions:', JSON.stringify(interaction));
  const screenshot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('doc/design/profile-review/revised-v2-desktop.png', Buffer.from(screenshot.data, 'base64'));
  await evaluate(`document.querySelector('#research').scrollIntoView()`);
  await pause(700);
  const research = await call('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('doc/design/profile-review/revised-v2-postcards.png', Buffer.from(research.data, 'base64'));
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('window.scrollTo(0,0)');
  await pause(300);
  const mobile = await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,galleryScroll:document.querySelector('.slides').scrollWidth,galleryWidth:document.querySelector('.slides').clientWidth})`);
  if (mobile.scrollWidth > mobile.width) throw new Error(JSON.stringify(mobile));
  console.log('Mobile:', JSON.stringify(mobile));
  const phone = await call('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('doc/design/profile-review/revised-v2-mobile.png', Buffer.from(phone.data, 'base64'));
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
