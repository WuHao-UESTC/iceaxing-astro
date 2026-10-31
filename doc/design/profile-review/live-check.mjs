import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-live-edge-'));
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
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const assert = (condition, detail) => { if (!condition) throw new Error(JSON.stringify(detail)); };
  const screenshot = async name => {
    await pause(400);
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`doc/design/profile-review/${name}.png`, Buffer.from(shot.data, 'base64'));
  };
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  const base = process.env.PROFILE_PREVIEW_URL || 'http://127.0.0.1:4322';
  await call('Page.navigate', { url: `${base}/profile` });
  for(let i=0;i<80;i++) {
    await pause(250);
    if(await evaluate(`!!document.querySelector('profile-award-gallery[data-ready]')`)) break;
  }
  const desktop = await evaluate(`(() => {
    const cards=[...document.querySelectorAll('.profile-certificate-grid > li:not([hidden])')];
    return {
      visibleAwards:cards.length,
      awardPositions:cards.map(c=>c.getBoundingClientRect().top),
      badgeBlur:getComputedStyle(document.querySelector('.profile-certificate-badge')).backdropFilter,
      captionAlign:getComputedStyle(document.querySelector('figcaption')).textAlign,
      columns:getComputedStyle(document.querySelector('.profile-project-archive')).gridTemplateColumns,
      background:getComputedStyle(document.querySelector('.profile-research-item')).backgroundColor,
      accent:getComputedStyle(document.querySelector('.profile-page')).getPropertyValue('--people-accent'),
      headings:[...document.querySelectorAll('.profile-section h2')].map(h=>h.textContent),
      overflow:document.documentElement.scrollWidth>innerWidth
    };
  })()`);
  assert(desktop.visibleAwards===3 && new Set(desktop.awardPositions).size===1 && desktop.captionAlign==='center' && !desktop.overflow, desktop);
  console.log('Desktop', JSON.stringify(desktop));
  console.log('Initial image states',JSON.stringify(await evaluate(`(()=>[...document.querySelectorAll('[data-profile-image], [data-person-avatar]')].map(img=>({src:img.getAttribute('src'),complete:img.complete,naturalWidth:img.naturalWidth,hidden:img.hidden,loading:img.loading})))()`)));
  console.log('Certificate diagnostics', JSON.stringify(await evaluate(`(async () => {
    const images=[...document.querySelectorAll('.profile-certificate-media img')];
    await Promise.all(images.map(img=>img.decode().catch(()=>{})));
    return images.map(img=>({src:img.src,complete:img.complete,width:img.naturalWidth,hidden:img.hidden,
      style:{display:getComputedStyle(img).display,visibility:getComputedStyle(img).visibility,opacity:getComputedStyle(img).opacity},
      box:JSON.stringify(img.getBoundingClientRect()),parent:JSON.stringify(img.parentElement.getBoundingClientRect())}));
  })()`)));
  const postcardLayout = await evaluate(`(() => [...document.querySelectorAll('.profile-research-item')].map(card => {
    const aside = card.querySelector('.profile-postcard-aside').getBoundingClientRect();
    const body = card.querySelector('.profile-postcard-content').getBoundingClientRect();
    return {bodyToRight:body.left >= aside.right, sameRow:Math.abs(body.top-aside.top)<2, bodyWidth:body.width};
  }))()`);
  assert(postcardLayout.every(card=>card.bodyToRight&&card.sameRow&&card.bodyWidth>300), postcardLayout);
  console.log('Postcard columns', JSON.stringify(postcardLayout));
  const interaction = await evaluate(`(() => {
    document.querySelector('[data-gallery-next]').click();
    const next=[...document.querySelectorAll('.profile-certificate-grid > li:not([hidden])')].length;
    const grid=document.querySelector('.profile-certificate-grid');
    grid.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));
    const previous=[...grid.children].filter(c=>!c.hidden).length;
    return {next,previous};
  })()`);
  assert(interaction.next===2&&interaction.previous===3, interaction);
  console.log('Gallery', JSON.stringify(interaction));
  const postmarks = await evaluate(`(() => {
    const stamps=[...document.querySelectorAll('profile-postmark')];
    return {
      variants:stamps.map(s=>s.dataset.variant),
      designCount:stamps[0].querySelectorAll('[data-postmark-variant]').length,
      oneVisible:stamps.every(s=>[...s.querySelectorAll('[data-postmark-variant]')].filter(g=>getComputedStyle(g).display!=='none').length===1)
    };
  })()`);
  assert(postmarks.designCount===10 && postmarks.oneVisible && new Set(postmarks.variants).size===postmarks.variants.length, postmarks);
  console.log('Randomized postmarks', JSON.stringify(postmarks));
  await screenshot('profile-live-desktop');
  await evaluate(`document.querySelector('#profile-research').scrollIntoView({behavior:'instant'})`);
  await screenshot('profile-live-postcards');
  await evaluate(`document.querySelector('#profile-completed').scrollIntoView({behavior:'instant'})`);
  await pause(300);
  const archive = await evaluate(`(() => {
    const cards=[...document.querySelectorAll('.profile-project-archive a')];
    return {count:cards.length,valid:cards.every(card=>{
      const image=card.querySelector('.profile-archive-background img');
      const bg=card.querySelector('.profile-archive-background');
      return image.complete && image.naturalWidth>0 && getComputedStyle(bg).filter==='none' && getComputedStyle(card,'::before').backdropFilter==='blur(3px)';
    })};
  })()`);
  assert(archive.valid && archive.count===6, archive);
  console.log('Frosted project cards', JSON.stringify(archive));
  await screenshot('profile-live-completed');
  for (const theme of ['light', 'dark']) {
    await evaluate(`document.documentElement.dataset.theme='${theme}'`);
    const glass = await evaluate(`(() => {
      const card=document.querySelector('.profile-project-archive a');
      return { overlay:getComputedStyle(card,'::before').backgroundImage, color:getComputedStyle(card).color };
    })()`);
    assert(glass.overlay.includes(theme==='light' ? '255, 255, 255' : '0, 0, 0'), glass);
    console.log('Project card theme', theme, JSON.stringify(glass));
    await screenshot('profile-live-completed-'+theme);
    await evaluate(`(async () => {
      const backgrounds=[...document.querySelectorAll('.profile-archive-background')].slice(0,2);
      for (const [index, bg] of backgrounds.entries()) {
        const image=bg.querySelector('img');
        image.dataset.originalSrc=image.src;
        image.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320"><rect width="480" height="320" fill="'+(index===0?'white':'black')+'"/></svg>');
        await image.decode();
      }
    })()`);
    const tonalBounds=await evaluate(`(() => {
      const card=document.querySelector('.profile-project-archive a');
      const opacity=Number(getComputedStyle(card.querySelector('.profile-archive-background')).opacity);
      const surface=Number(getComputedStyle(card).backgroundColor.match(/\\d+/)[0]);
      const overlay=getComputedStyle(card,'::before').backgroundImage;
      const alpha=Number(overlay.match(/rgba\\([^)]*, ([0-9.]+)\\)/)[1]);
      const tint=document.documentElement.dataset.theme==='dark'?0:255;
      const min=surface*(1-opacity)*(1-alpha)+tint*alpha;
      const max=(255*opacity+surface*(1-opacity))*(1-alpha)+tint*alpha;
      return {min,max};
    })()`);
    assert(theme==='dark' ? tonalBounds.max<70 : tonalBounds.min>165, tonalBounds);
    console.log('Pure black/white photo bounds',theme,JSON.stringify(tonalBounds));
    await screenshot('profile-live-extremes-'+theme);
    await evaluate(`document.querySelectorAll('[data-original-src]').forEach(img=>{img.src=img.dataset.originalSrc;delete img.dataset.originalSrc;})`);
  }
  // Exercise uploaded-photo rendering and the real error fallback without changing content files.
  const imageChecks = await evaluate(`(async () => {
    const visual=document.querySelector('.profile-postcard-visual');
    let image=visual.querySelector('img');
    if(!image){image=document.createElement('img');image.setAttribute('data-profile-image','');visual.append(image);}
    image.src=document.querySelector('[data-person-avatar]').src;
    await new Promise(r=>{image.onload=r;image.onerror=r;});
    const photo=getComputedStyle(visual.querySelector('svg')).visibility==='hidden';
    const {initPeopleImages}=await import('/src/scripts/people-images.ts');
    initPeopleImages();
    image.src='/missing-profile-image-check.png';
    await new Promise(r=>setTimeout(r,500));
    const fallback=image.hidden&&getComputedStyle(visual.querySelector('svg')).visibility!=='hidden';
    image.remove();
    return {photo,fallback};
  })()`);
  assert(imageChecks.photo&&imageChecks.fallback, imageChecks);
  console.log('Images', JSON.stringify(imageChecks));
  const imageLifecycle = await evaluate(`(async () => {
    const {initPeopleImages}=await import('/src/scripts/people-images.ts');
    const visual=document.querySelector('.profile-postcard-visual');
    let postcardImage=visual.querySelector('img');
    const inserted=!postcardImage;
    if(inserted){postcardImage=document.createElement('img');postcardImage.setAttribute('data-profile-image','');postcardImage.src=document.querySelector('[data-person-avatar]').src;visual.append(postcardImage);}
    await postcardImage.decode();
    initPeopleImages();
    const slots=[document.querySelector('[data-person-avatar]'),document.querySelector('.profile-certificate-media img'),postcardImage,document.querySelector('.profile-archive-background img')];
    const results=[];
    for(const image of slots){
      const original=image.src;
      const loading=image.loading;
      image.loading='eager';
      image.src='/missing-image-lifecycle-check.png';
      await image.decode().catch(()=>{});
      await new Promise(r=>setTimeout(r,100));
      const failed=image.hidden;
      image.src=original;
      await image.decode();
      await new Promise(r=>setTimeout(r,100));
      results.push({failed,recovered:!image.hidden&&image.naturalWidth>0});
      image.loading=loading;
    }
    if(inserted)postcardImage.remove();
    return results;
  })()`);
  assert(imageLifecycle.every(result=>result.failed&&result.recovered),imageLifecycle);
  console.log('Avatar / certificate / postcard / archive failure and recovery',JSON.stringify(imageLifecycle));
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
  await pause(350);
  const mobile = await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})`);
  assert(mobile.width===mobile.scrollWidth, mobile);
  console.log('Mobile', JSON.stringify(mobile));
  for (const width of [1024, 768, 640, 390]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: width <= 640 });
    const layout = await evaluate(`(() => {
      const cards = [...document.querySelectorAll('.profile-research-item')];
      return { width: innerWidth, overflow:document.documentElement.scrollWidth > innerWidth,
        valid:cards.every(card => {
          const aside=card.querySelector('.profile-postcard-aside').getBoundingClientRect();
          const body=card.querySelector('.profile-postcard-content').getBoundingClientRect();
          const stamp=card.querySelector('profile-postmark').getBoundingClientRect();
          const frame=card.getBoundingClientRect();
          const positioned=Math.abs(stamp.top-frame.top)<2 && Math.abs(stamp.right-frame.right)<2;
          return positioned && (innerWidth <= 640 ? body.top >= aside.bottom : body.left >= aside.right && Math.abs(body.top-aside.top)<2);
        })};
    })()`);
    assert(layout.valid && !layout.overflow, layout);
    console.log('Responsive postcard layout', JSON.stringify(layout));
  }
  await evaluate(`document.documentElement.dataset.theme='light'`);
  await screenshot('profile-live-mobile');
  await evaluate(`document.documentElement.dataset.theme='dark'`);
  await screenshot('profile-live-dark');
  // Without JavaScript, all awards should remain visible.
  await call('Emulation.setScriptExecutionDisabled', { value: true });
  await call('Page.navigate', { url: `${base}/profile` });
  await pause(800);
  const noJS = await evaluate(`document.querySelectorAll('.profile-certificate-grid > li:not([hidden])').length`);
  assert(noJS===5, {noJS});
  console.log('No JavaScript: all five honors remain accessible.');
  await call('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
}
