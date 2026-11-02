import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-gallery-edge-'));
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${browserProfile}`, 'about:blank',
], { stdio: 'ignore', windowsHide: true });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  const portFile = path.join(browserProfile, 'DevToolsActivePort');
  for(let i=0;i<100&&!fs.existsSync(portFile);i++)await pause(100);
  const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
  const target=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
  socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  let sequence=0;
  const pending=new Map();
  socket.onmessage=event=>{
    const message=JSON.parse(event.data);
    if(!message.id)return;
    const response=pending.get(message.id);pending.delete(message.id);
    if(message.error)response.reject(new Error(JSON.stringify(message.error)));
    else response.resolve(message.result);
  };
  const call=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));
  });
  const evaluate=async expression=>{
    const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const assert=(value,detail)=>{if(!value)throw new Error(JSON.stringify(detail));};
  const state=()=>evaluate(`(() => {
    const gallery=document.querySelector('profile-award-gallery');
    const rail=gallery.querySelector('.profile-certificate-grid');
    const cards=[...rail.querySelectorAll('li:not([data-gallery-spacer])')];
    const active=cards.filter(card=>!card.inert);
    return {ready:gallery.dataset.ready,busy:gallery.dataset.animating==='true',
      position:rail.scrollLeft,width:rail.clientWidth,height:rail.clientHeight,
      active:active.length,perPage:rail.style.getPropertyValue('--gallery-per-page'),
      imageHeights:active.map(card=>card.querySelector('.profile-certificate-media').getBoundingClientRect().height),
      captionHeights:cards.map(card=>card.querySelector('figcaption').getBoundingClientRect().height),
      titleColors:active.map(card=>getComputedStyle(card.querySelector('h3')).color),
      counter:gallery.querySelector('.profile-gallery-counter').textContent.replace(/\\s+/g,' ').trim(),
      previous:gallery.querySelector('[data-gallery-previous]').disabled,next:gallery.querySelector('[data-gallery-next]').disabled,
      educationTop:document.querySelector('#profile-education').getBoundingClientRect().top,
      overflow:document.documentElement.scrollWidth>innerWidth};
  })()`);
  const screenshot=async name=>{
    await pause(200);const shot=await call('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(`doc/prototypes/profile-review/${name}.png`,Buffer.from(shot.data,'base64'));
  };
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:(process.env.PROFILE_PREVIEW_URL||'http://127.0.0.1:4322')+'/profile'});
  for(let i=0;i<100;i++){
    await pause(200);
    if(await evaluate(`!!document.querySelector('profile-award-gallery[data-ready]')`))break;
  }
  await evaluate(`document.fonts.ready`);await pause(1000);
  const initial=await state();
  assert(initial.active===3&&initial.previous&&!initial.next&&!initial.overflow&&new Set(initial.captionHeights).size===1&&initial.titleColors.every(c=>c==='rgb(255, 255, 255)'),initial);
  console.log('Desktop uniform exhibits',JSON.stringify(initial));
  const titleOverlay=await evaluate(`(() => [...document.querySelectorAll('.profile-certificate')].map(figure=>{
    const image=figure.querySelector('.profile-certificate-media').getBoundingClientRect();
    const caption=figure.querySelector('figcaption');const box=caption.getBoundingClientRect();
    return {inside:box.top>=image.top&&Math.abs(box.bottom-image.bottom)<1,glass:getComputedStyle(caption,'::before').backdropFilter};
  }))()`);
  assert(titleOverlay.every(title=>title.inside&&title.glass==='blur(9px)'),titleOverlay);
  await screenshot('gallery-refactor-desktop');
  await evaluate(`document.querySelector('[data-gallery-next]').click()`);
  await pause(120);
  const middle=await state();
  assert(middle.busy&&middle.position>0&&middle.position<middle.width+20,middle);
  await evaluate(`document.querySelector('[data-gallery-next]').click()`);
  await pause(420);
  const second=await state();
  assert(!second.busy&&second.active===2&&second.next&&!second.previous&&second.height===initial.height&&Math.abs(second.educationTop-initial.educationTop)<1,second);
  console.log('Animated transition with fixed height',JSON.stringify({middle:middle.position,end:second.position,height:second.height,counter:second.counter}));
  await evaluate(`document.querySelector('.profile-certificate-grid').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}))`);
  await pause(50);assert((await state()).position===second.position,'End must not wrap.');
  await evaluate(`document.querySelector('[data-gallery-previous]').click()`);await pause(430);
  const previewState=()=>evaluate(`(() => {
    const dialog=document.querySelector('.profile-certificate-lightbox');const image=dialog.querySelector('img');
    const box=dialog.querySelector('.profile-lightbox-target').getBoundingClientRect();
    return {open:dialog.open,loaded:image.naturalWidth>0,width:box.width,height:box.height,
      centerX:box.left+box.width/2,centerY:box.top+box.height/2,
      viewportX:innerWidth/2,viewportY:innerHeight/2,
      locked:document.documentElement.style.overflow==='hidden',border:getComputedStyle(dialog).borderTopWidth,
      noChrome:dialog.textContent.trim()===''&&!dialog.querySelector('a,h3,[data-lightbox-close]')};
  })()`);
  await evaluate(`document.querySelector('[data-certificate-open]').click()`);
  await pause(65);
  const opening=await previewState();
  await pause(440);
  const enlarged=await previewState();
  assert(enlarged.open&&enlarged.loaded&&enlarged.height>opening.height&&enlarged.locked&&enlarged.noChrome&&enlarged.border==='0px'&&Math.abs(enlarged.centerX-enlarged.viewportX)<1&&Math.abs(enlarged.centerY-enlarged.viewportY)<1,{opening,enlarged});
  await screenshot('gallery-certificate-enlarged');
  await evaluate(`document.querySelector('.profile-lightbox-target').click()`);
  await pause(90);
  const closing=await previewState();
  assert(closing.open&&closing.height<enlarged.height,closing);
  await pause(350);
  const returned=await evaluate(`({closed:!document.querySelector('.profile-certificate-lightbox').open,visible:getComputedStyle(document.querySelector('[data-certificate-open] img')).visibility==='visible',focus:document.activeElement.hasAttribute('data-certificate-open'),unlocked:document.documentElement.style.overflow!=='hidden'})`);
  assert(returned.closed&&returned.visible&&returned.focus&&returned.unlocked,returned);
  console.log('Shared-image expand and return animation',JSON.stringify({opening:opening.height,enlarged:enlarged.height,closing:closing.height,returned}));
  await evaluate(`document.querySelector('[data-certificate-open]').click()`);await pause(460);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await pause(420);
  const restored=await evaluate(`({closed:!document.querySelector('dialog').open,focus:document.activeElement.hasAttribute('data-certificate-open'),scrollUnlocked:document.documentElement.style.overflow!=='hidden'})`);
  assert(restored.closed&&restored.focus&&restored.scrollUnlocked,restored);
  console.log('Certificate lightbox and Escape focus restoration',JSON.stringify({enlarged,restored}));
  await evaluate(`document.querySelector('[data-certificate-open]').click()`);
  await pause(100);
  await call('Input.dispatchMouseEvent',{type:'mousePressed',x:2,y:2,button:'left',clickCount:1});
  await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:2,y:2,button:'left',clickCount:1});
  await pause(420);
  assert(await evaluate(`!document.querySelector('.profile-certificate-lightbox').open`),'Backdrop closes lightbox.');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await pause(350);
  const mobile=await state();
  assert(mobile.active===1&&mobile.perPage==='1'&&!mobile.overflow&&new Set(mobile.captionHeights).size===1,mobile);
  await screenshot('gallery-refactor-mobile');
  await evaluate(`document.querySelector('[data-gallery-next]').click()`);await pause(430);
  const mobileSecond=await state();
  assert(mobileSecond.active===1&&mobileSecond.position>0&&mobileSecond.height===mobile.height,mobileSecond);
  // Native scrolling (including touch swipes) updates the same page state.
  await evaluate(`(()=>{const rail=document.querySelector('.profile-certificate-grid');rail.scrollLeft=2*(rail.clientWidth+parseFloat(getComputedStyle(rail).columnGap));})()`);
  await pause(250);
  const swiped=await state();assert(swiped.counter.startsWith('3 / 5'),swiped);
  console.log('Mobile single-certificate scrolling',JSON.stringify({mobile,mobileSecond:mobileSecond.position,swiped:swiped.counter}));
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await evaluate(`document.querySelector('[data-gallery-next]').click()`);
  const reduced=await state();assert(!reduced.busy&&reduced.counter.startsWith('4 / 5'),reduced);
  console.log('Reduced motion: immediate transition.');
  await evaluate(`document.querySelector('.profile-certificate-grid > li[aria-hidden="false"] [data-certificate-open]').click()`);
  await pause(100);
  const reducedPreview=await previewState();
  assert(reducedPreview.open&&reducedPreview.noChrome&&Math.abs(reducedPreview.centerX-reducedPreview.viewportX)<1,reducedPreview);
  await evaluate(`document.querySelector('.profile-lightbox-target').click()`);
  await pause(50);
  assert(!(await previewState()).open,'Reduced motion preview returns immediately.');
  await call('Emulation.setScriptExecutionDisabled',{value:true});
  await call('Page.navigate',{url:(process.env.PROFILE_PREVIEW_URL||'http://127.0.0.1:4322')+'/profile'});
  await pause(700);
  const fallback=await evaluate(`({cards:document.querySelectorAll('.profile-certificate-grid > li').length,links:document.querySelectorAll('[data-certificate-open][href]').length})`);
  assert(fallback.cards===5&&fallback.links===4,fallback);
  console.log('No JavaScript: all awards and original image links remain available.');
  await call('Browser.close').catch(()=>{});
}finally{socket?.close();browser.kill();}
