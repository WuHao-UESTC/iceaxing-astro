import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
const directory=path.resolve('doc/prototypes/article-cover-review');
const browserProfile=fs.mkdtempSync(path.join(os.tmpdir(),'article-cover-live-'));
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',[
  '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',
  '--remote-debugging-port=0',`--user-data-dir=${browserProfile}`,'about:blank',
],{stdio:'ignore',windowsHide:true});
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let socket;
try{
  const portFile=path.join(browserProfile,'DevToolsActivePort');
  for(let i=0;i<100&&!fs.existsSync(portFile);i++)await pause(100);
  const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
  const target=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
  socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  const pending=new Map();let sequence=0;
  socket.onmessage=event=>{
    const message=JSON.parse(event.data);if(!message.id)return;
    const response=pending.get(message.id);pending.delete(message.id);
    if(message.error)response.reject(new Error(JSON.stringify(message.error)));else response.resolve(message.result);
  };
  const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{
    const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;
  };
  const assert=(value,detail)=>{if(!value)throw new Error(JSON.stringify(detail));};
  const base=process.env.ARTICLE_COVER_PREVIEW_URL||'http://127.0.0.1:4323';
  await call('Page.enable');
  const cases=[
    {path:'/articles',type:'list',count:9,name:'articles'},
    {path:'/razavi-cmos-analog-note',type:'list',count:2,name:'category'},
    {path:'/razavi-cmos-analog-note/c4-differential-amp',type:'hero',name:'circuit'},
    {path:'/daily-ramblings/ramble-happiness-at-fingertip',type:'hero',name:'essay'},
    {path:'/rabaey-digital-ic-note/electrical-wire',type:'text',name:'no-cover'},
  ];
  for(const test of cases){
    await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:base+test.path});
    for(let i=0;i<100;i++){
      await pause(200);
      if(await evaluate(`document.readyState==='complete'&&!!document.querySelector('main h1')`))break;
    }
    await evaluate(`document.fonts.ready`);
    await evaluate(`Promise.all([...document.querySelectorAll('.archive-entry-cover img,.reader-hero-image')].map(image=>image.decode().catch(()=>{})))`);
    await pause(650);
    for(const width of [1440,768,390]){
      await call('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1100,deviceScaleFactor:1,mobile:width===390});
      for(const theme of ['dark','light']){
        await evaluate(`document.documentElement.dataset.theme='${theme}'`);
        const result=await evaluate(`(() => {
          const hero=document.querySelector('.reader-header-with-cover');
          const covers=[...document.querySelectorAll('.archive-entry-cover img')];
          const imgs=[...document.querySelectorAll('.archive-entry-cover img,.reader-hero-image')];
          return {count:covers.length,hero:!!hero,broken:imgs.filter(image=>!image.complete||!image.naturalWidth).map(image=>image.src),
            overflow:document.documentElement.scrollWidth>innerWidth,
            heroHeight:hero?.getBoundingClientRect().height,
            titleColor:hero?getComputedStyle(hero.querySelector('h1')).color:null,
            thumbnailsLeft:covers.every(image=>image.getBoundingClientRect().right<=image.closest('a').querySelector('h3').getBoundingClientRect().left),
            numbersSeparate:covers.every(image=>image.closest('a').querySelector('.archive-number').getBoundingClientRect().right<=image.getBoundingClientRect().left),
            rowHeights:covers.map(image=>image.closest('a').getBoundingClientRect().height),
            imageHeights:covers.map(image=>image.getBoundingClientRect().height),
            placeholders:covers.filter(image=>image.getAttribute('src').includes('cover-placeholder.svg')).length,
            subscription:document.querySelectorAll('[data-subscribe-form]').length};
        })()`);
        assert(!result.broken.length&&!result.overflow,{test,width,theme,...result});
        if(test.type==='list')assert(result.count===test.count&&result.thumbnailsLeft&&result.numbersSeparate&&new Set(result.rowHeights).size===1&&new Set(result.imageHeights).size===1&&result.subscription===0,{test,width,theme,...result});
        if(test.name==='articles')assert(result.placeholders===3,{test,width,theme,...result});
        if(test.type==='hero')assert(result.hero&&result.heroHeight>=350&&result.subscription===1,{test,width,theme,...result});
        if(test.type==='text')assert(!result.hero&&result.subscription===1,{test,width,theme,...result});
        if((width===1440||width===390)&&theme==='dark'){
          const shot=await call('Page.captureScreenshot',{format:'png'});
          fs.writeFileSync(path.join(directory,`live-${test.name}-${width}.png`),Buffer.from(shot.data,'base64'));
        }
      }
    }
    console.log(test.path+': responsive layouts, light/dark themes, image loading and subscription placement passed.');
  }
  await call('Browser.close').catch(()=>{});
}finally{socket?.close();browser.kill();}
