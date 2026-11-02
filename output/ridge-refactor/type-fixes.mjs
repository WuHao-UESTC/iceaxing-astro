import fs from 'node:fs';const r=p=>fs.readFileSync(p,'utf8');const w=(p,s)=>fs.writeFileSync(p,s);
let p='src/lib/featured-server.ts',s=r(p);const a=s.indexOf('   const repo=githubRepo();const response=');const b=s.indexOf('   const result=await response.json()',a);
s=s.slice(0,a)+`   const repo=githubRepo();
   const input={
    branch:{repositoryNameWithOwner:repo.owner+'/'+repo.name,branchName:payload.branch},
    expectedHeadOid:head,
    message:{headline:'Update homepage editorial selection'},
    fileChanges:{additions:changes.map(c=>({path:pathPrefix()+c.source.path,contents:Buffer.from(c.raw).toString('base64')}))},
   };
   const response=await fetch('https://api.github.com/graphql',{
    method:'POST',headers:{Authorization:'Bearer '+options.token,'Content-Type':'application/json'},
    body:JSON.stringify({query:'mutation SaveFeatured($input: CreateCommitOnBranchInput!) { createCommitOnBranch(input:$input) { ref { target { oid } } } }',variables:{input}}),
   });
`+s.slice(b);w(p,s);
p='src/scripts/home-journey.ts';s=r(p).replace(" const home=document.querySelector<HTMLElement>('[data-journey]');if(!home)return;"," const element=document.querySelector<HTMLElement>('[data-journey]');if(!element)return;const home:HTMLElement=element;").replace('const to=panels[index];const direction','const to=panels[index];if(!from||!to)return;const direction').replace('names[active+1];','(names[active+1]??\'\');').replace('currentLabel.textContent=names[active];',"currentLabel.textContent=names[active]??'';").replace("function select(index:number){history.pushState(history.state,'','#'+panels[index].id);go(index);}","function select(index:number){const panel=panels[index];if(!panel)return;history.pushState(history.state,'','#'+panel.id);go(index);}");w(p,s);
p='src/components/islands/FeaturedManager.tsx';s=r(p).replace('selected[rank-1].key',"selected[rank-1]?.key??item.key").replace('selected[rank+1].key',"selected[rank+1]?.key??item.key");w(p,s);
p='src/components/home/FeaturedDestinations.astro';s=r(p).replace("    category: '分类',","    article: '文章',\n    category: '分类',").replace("    category: 'Category',","    article: 'Article',\n    category: 'Category',").replace("    category: 'Kategorie',","    article: 'Artikel',\n    category: 'Kategorie',");w(p,s);
p='src/lib/keystatic-folder-form.ts';s=r(p).replace("['排序', 'order'],","['排序', 'order'],\n        ['精选顺序', 'featuredOrder'],").replace("    featured: 'settings',","    featured: 'settings',\n    featuredOrder: 'settings',");w(p,s);
