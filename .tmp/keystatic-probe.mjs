import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import readline from 'node:readline';
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'keystatic-fix-'));
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore',windowsHide:true});
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const portFile=path.join(profile,'DevToolsActivePort');
for(let i=0;i<100&&!fs.existsSync(portFile);i++)await pause(100);
const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
const target=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const socket=new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
let sequence=0;const pending=new Map();
socket.onmessage=({data})=>{const message=JSON.parse(data);if(!message.id)return;const response=pending.get(message.id);pending.delete(message.id);if(message.error)response.reject(new Error(JSON.stringify(message.error)));else response.resolve(message.result);};
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
await call('Page.enable');await call('Runtime.enable');await call('Page.bringToFront');
await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
await call('Page.navigate',{url:'http://127.0.0.1:4323/keystatic/workspace'});
console.log('READY');
const input=readline.createInterface({input:process.stdin});
for await(const line of input){
 try{
  const command=JSON.parse(line);
  if(command.close){await call('Browser.close');socket.close();browser.kill();break;}
  if(command.shot){const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(command.shot,Buffer.from(shot.data,'base64'));console.log('SAVED '+command.shot);continue;}
  if(command.method){console.log(JSON.stringify(await call(command.method,command.params||{})));continue;}
  const result=await call('Runtime.evaluate',{expression:command.expression,awaitPromise:true,returnByValue:true});
  console.log(JSON.stringify(result.exceptionDetails||result.result.value));
 }catch(error){console.log('ERROR '+error.message);}
}
