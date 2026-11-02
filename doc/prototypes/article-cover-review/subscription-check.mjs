import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'subscription-check-'));
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',[
  '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',
  '--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank',
],{stdio:'ignore',windowsHide:true});
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let socket;
try{
  const portFile=path.join(profile,'DevToolsActivePort');
  for(let i=0;i<100&&!fs.existsSync(portFile);i++)await pause(100);
  const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
  const target=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
  socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  const pending=new Map();let sequence=0;
  socket.onmessage=event=>{const message=JSON.parse(event.data);if(!message.id)return;const response=pending.get(message.id);pending.delete(message.id);if(message.error)response.reject(new Error(JSON.stringify(message.error)));else response.resolve(message.result);};
  const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
  const assert=(value,detail)=>{if(!value)throw new Error(JSON.stringify(detail));};
  const url=(process.env.ARTICLE_COVER_PREVIEW_URL||'http://127.0.0.1:4323')+'/daily-ramblings/ramble-happiness-at-fingertip';
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url});
  for(let i=0;i<100;i++){await pause(150);if(await evaluate(`!!document.querySelector('[data-subscribe-form][data-ready]')`))break;}
  const initial=await evaluate(`(()=>{const panel=document.querySelector('.subscribe-panel'),comments=document.querySelector('[data-comments]');return {native:panel.tagName==='DETAILS',closed:!panel.open,hiddenForm:!panel.querySelector('form').checkVisibility(),commentsBefore:!!(comments.compareDocumentPosition(panel)&Node.DOCUMENT_POSITION_FOLLOWING),forms:document.querySelectorAll('[data-subscribe-form]').length};})()`);
  assert(initial.native&&initial.closed&&initial.hiddenForm&&initial.commentsBefore&&initial.forms===1,initial);
  await evaluate(`document.querySelector('.subscribe-toggle').click()`);
  const opened=await evaluate(`document.querySelector('.subscribe-panel').open&&document.querySelector('[data-subscribe-form]').getBoundingClientRect().height>0`);
  assert(opened,'Click expands subscription.');
  await evaluate(`document.querySelector('.subscribe-toggle').focus()`);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});
  await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  assert(await evaluate(`!document.querySelector('.subscribe-panel').open`),'Enter collapses subscription.');
  await evaluate(`document.querySelector('.reader-subscribe').click()`);
  assert(await evaluate(`document.querySelector('.subscribe-panel').open`),'Article shortcut expands subscription.');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  const mobile=await evaluate(`document.documentElement.scrollWidth<=innerWidth`);
  assert(mobile,'Mobile expanded form must not overflow.');
  // Native details continues to work when scripting is disabled.
  await call('Emulation.setScriptExecutionDisabled',{value:true});
  await call('Page.navigate',{url});await pause(600);
  await evaluate(`document.querySelector('.subscribe-toggle').click()`);
  assert(await evaluate(`document.querySelector('.subscribe-panel').open`),'No-JavaScript expansion.');
  console.log('Verified default collapse, click/keyboard expansion, comments-first order, article shortcut, mobile layout and no-JavaScript fallback.');
  await call('Browser.close').catch(()=>{});
}finally{socket?.close();browser.kill();}
