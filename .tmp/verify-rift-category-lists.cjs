const {chromium}=require('C:/Users/iceaxing/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch(),p=await b.newPage({reducedMotion:'reduce'}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,768,1024,1440]){
  await p.setViewportSize({width,height:width<=768?844:900});
  for(const lang of ['zh','en','de']){
   const response=await p.goto(`http://127.0.0.1:4321/fixtures/entrance-preview?lang=${lang}`,{waitUntil:'networkidle'});
   assert.equal(response.status(),200);
   const size=width<=768?2:4,total=Math.ceil(9/size);
   for(let index=0;index<total;index++){
    const issues=await p.evaluate(()=>{
     const problems=[],cards=[...document.querySelectorAll('[data-life-page]:not([inert]) .life-landing')];
     for(const card of cards){
      const heading=card.querySelector('.life-landing-link'),list=card.querySelector('.life-category-articles'),empty=card.querySelector('.life-category-empty');
      if(list){
       if(list.getBoundingClientRect().top<heading.getBoundingClientRect().bottom+10)problems.push('list above underline');
       if(list.querySelectorAll('li').length!==4)problems.push('missing articles');
       for(const a of list.querySelectorAll('a'))if(new URL(a.href).searchParams.get('category')!==card.dataset.lifeCategory)problems.push('incorrect category');
      }else if(!empty)problems.push('no empty state');
      if(getComputedStyle(card.querySelector('h3')).fontSize!==getComputedStyle(card.querySelector('.life-landing-number')).fontSize)problems.push('number size differs');
      if(card.scrollWidth>card.clientWidth+1)problems.push('overflow');
     }
     for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){
      const a=cards[i].getBoundingClientRect(),b=cards[j].getBoundingClientRect();
      if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)problems.push('overlapping cards');
     }
     const anchors=[...document.querySelectorAll('[data-rift-anchor]')];
     if(anchors.length!==cards.length)problems.push('missing stones');
     anchors.forEach((anchor,i)=>{
      if(Number(anchor.dataset.drop)<5)problems.push('stone not below card: '+anchor.dataset.drop);
      if(getComputedStyle(anchor.querySelector('.life-anchor-stone-body')).fill!==getComputedStyle(cards[i].querySelector('.life-landing-number')).color)problems.push('stone color differs');
      if(anchor.querySelector('.terrain-face'))problems.push('faceted anchor stone');
     });
     if(document.querySelector('.life-rift-details, .life-ice-crack'))problems.push('old ice detail remains');
     return problems;
    });
    assert.deepEqual(issues,[],`${width}/${lang}/${index+1}`);
    if(index<total-1){await p.locator('[data-life-direction="1"]').click();await p.waitForFunction(s=>document.querySelector('[data-life-status]').textContent===s,`${index+2} / ${total}`);}
   }
   await p.locator('[data-life-direction="-1"]').click();
   await p.waitForFunction(s=>document.querySelector('[data-life-status]').textContent===s,`${total-1} / ${total}`);
   const list=p.locator('[data-life-page]:not([inert]) .life-category-articles').first();
   await list.focus();await p.keyboard.press('End');await p.waitForFunction(()=>[...document.querySelectorAll('.life-category-articles')].some(e=>e.scrollTop>0));
   if([390,1440].includes(width)&&lang==='zh')for(const theme of ['light','dark']){
    await list.evaluate(e=>{e.blur();e.scrollTop=0});await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    await p.locator('#snowfield-traverse').screenshot({path:`.tmp/chapter-landscapes/category-lists-${width}-${theme}.png`});
   }
  }
 }
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: 15 viewport/language cases, all pages, category isolation, scrolling lists, rounded stones matching number colors, no overlapping cards.');
})().catch(e=>{console.error(e);process.exit(1)});
