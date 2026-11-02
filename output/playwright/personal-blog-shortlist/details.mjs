import fs from 'node:fs/promises';
const rows=JSON.parse(await fs.readFile(new URL('./repos.json',import.meta.url),'utf8'));
const chosen=['cosZone/astro-koharu','L33Z22L11/blog-v3','MaggieAppleton/maggieappleton.com-V3','Innei/Shiro','antfu/antfu.me','ncase/blog','taniarascia/taniarascia.com','josh-collinsworth/joco-sveltekit','shuding/shud.in','saicaca/fuwari','xaoxuu/hexo-theme-stellar','jktrn/astro-erudite'];
const results=[];
for(let start=0;start<chosen.length;start+=3)await Promise.allSettled(chosen.slice(start,start+3).map(async name=>{const r={repo:name};try{const req=await fetch(`https://api.github.com/repos/${name}/readme`,{headers:{'User-Agent':'Iceaxing-design-research'},signal:AbortSignal.timeout(15000)});if(!req.ok){r.status=req.status;return;}const d=await req.json();r.readme=Buffer.from(d.content,'base64').toString('utf8').replace(/data:image\/[^)\s]+/g,'[embedded image]').slice(0,10000);}catch(e){r.error=String(e);}finally{results.push(r);}}));
await fs.writeFile(new URL('./readmes.json',import.meta.url),JSON.stringify(results,null,2));
for(const r of results)console.log(JSON.stringify({repo:r.repo,status:r.status,error:r.error,excerpt:r.readme?.slice(0,2800)}));
