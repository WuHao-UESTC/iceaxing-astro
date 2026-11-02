(() => {
 const data=JSON.parse(document.querySelector('#content-data').textContent);
 const panels=[...document.querySelectorAll('[data-panel]')], reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,feature=data.feature,book=data.books[0]?.id,lifeGroup=0;
 const reader=document.querySelector('#reader'),search=document.querySelector('#search-dialog'),content=document.querySelector('.reader-content');
 const escape=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 function showChapter(n,focus=false){
   n=Math.max(0,Math.min(4,n));const direction=n>=current?1:-1;
   panels.forEach((p,i)=>{p.hidden=i!==n;});
   document.querySelectorAll('[data-nav]').forEach((a,i)=>a.setAttribute('aria-current',i===n?'page':'false'));
   const panel=panels[n];document.body.dataset.chapter=String(n);document.body.style.setProperty('--chapter-direction',direction);
   current=n;document.querySelector('.current-label').textContent=`0${n+1} / 05 · ${data.labels[n]}`;
   document.querySelector('[data-prev]').disabled=n===0;document.querySelector('[data-next]').disabled=n===4;
   if(!reduced.matches){panel.classList.remove('chapter-enter');void panel.offsetWidth;panel.classList.add('chapter-enter');}
   if(focus)panel.querySelector('h1')?.focus({preventScroll:true});
   window.scrollTo({top:0,behavior:'instant'});
   document.querySelector(`[data-nav="${n}"]`).scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
 }
 function navigate(n,focus=true){if(n<0||n>4)return;history.pushState(null,'',`#${data.hashes[n]}`);showChapter(n,focus);}
 document.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();navigate(Number(a.dataset.nav));}));
 document.querySelectorAll('[data-chapter]').forEach(b=>b.addEventListener('click',()=>navigate(Number(b.dataset.chapter))));
 document.querySelector('[data-prev]').addEventListener('click',()=>navigate(current-1));document.querySelector('[data-next]').addEventListener('click',()=>navigate(current+1));
 window.addEventListener('popstate',()=>showChapter(Math.max(0,data.hashes.indexOf(location.hash.slice(1)))));
 window.addEventListener('hashchange',()=>showChapter(Math.max(0,data.hashes.indexOf(location.hash.slice(1)))));
 document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.matches('input,textarea,select')||e.target.closest('.book-shelf,.life-controls'))return;if(e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='PageDown'){e.preventDefault();navigate(current+1);}if(e.key==='PageUp'){e.preventDefault();navigate(current-1);}});
 function renderFeature(){const a=data.articles[feature];document.querySelector('[data-feature-title]').textContent=a.title;document.querySelector('[data-feature-category]').textContent=data.categories.find(c=>c.id===a.category)?.title??'阅读手记';document.querySelector('[data-feature-description]').textContent=a.body.split('\n').find(p=>p.length>35)?.slice(0,78)+'…';}
 document.querySelectorAll('[data-feature]').forEach(b=>b.addEventListener('click',()=>{feature=(feature+Number(b.dataset.feature)+data.articles.length)%data.articles.length;renderFeature();}));
 document.querySelector('[data-feature-open]').addEventListener('click',()=>openArticle(feature));
 let opener;
 function open(dialog){opener=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;}
 document.querySelectorAll('dialog').forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>d.close());d.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
 function openArticle(index){const a=data.articles[index];content.innerHTML=`<span class="eyebrow">PROJECT CONTENT / READING PREVIEW</span><h1>${escape(a.title)}</h1><p class="reader-notice">摘自项目已有内容 · 用于检视当前风格的阅读排版</p>${a.body.split(/\n\s*\n/).slice(0,12).filter(Boolean).map(p=>`<p>${escape(p)}</p>`).join('')}<div class="reader-end">ICEAXING · 保持好奇，继续探索。</div>`;if(!reader.open)open(reader);reader.scrollTop=0;}
 document.querySelectorAll('[data-reader]').forEach(b=>b.addEventListener('click',()=>openArticle(Number(b.dataset.reader))));
 document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.category;const found=data.articles.map((a,i)=>({...a,i})).filter(a=>a.category===id);content.innerHTML=`<span class="eyebrow">STACK INDEX / 技术分类</span><h1>${escape(data.categories.find(c=>c.id===id)?.title)}</h1><p>从分类进入具体文章与工程记录。</p><div class="dialog-list">${(found.length?found:data.articles.map((a,i)=>({...a,i})).slice(0,4)).map(a=>`<button data-open-result="${a.i}">${escape(a.title)} <span>↗</span></button>`).join('')}</div>`;content.querySelectorAll('[data-open-result]').forEach(x=>x.addEventListener('click',()=>openArticle(Number(x.dataset.openResult))));open(reader);}));
 function renderBook(id){book=id;const b=data.books.find(x=>x.id===id);document.querySelector('[data-book-title]').textContent=b.title;document.querySelector('[data-book-description]').textContent=b.description||'把读过的内容和想明白的问题，慢慢整理成路。';document.querySelectorAll('[data-book]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.book===id)));const notes=data.articles.map((a,i)=>({...a,i})).filter(a=>a.category===id);const list=document.querySelector('[data-book-notes]');list.innerHTML=notes.length?notes.slice(0,5).map((a,i)=>`<button data-note-article="${a.i}"><span>0${i+1}</span><h3>${escape(a.title)}</h3><b>↗</b></button>`).join(''):'<p class="empty-note">这本教材的公开笔记正在整理。先保留目录，给新的思考留一个位置。</p>';list.querySelectorAll('[data-note-article]').forEach(x=>x.addEventListener('click',()=>openArticle(Number(x.dataset.noteArticle))));}
 document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>renderBook(b.dataset.book)));
 document.querySelector('[data-book-all]').addEventListener('click',()=>{content.innerHTML=`<span class="eyebrow">VOLUME CONTENTS</span><h1>${escape(data.books.find(b=>b.id===book)?.title)}</h1><p>教材章节与笔记目录</p><div class="dialog-list">${document.querySelector('[data-book-notes]').innerHTML}</div>`;content.querySelectorAll('[data-note-article]').forEach(x=>x.addEventListener('click',()=>openArticle(Number(x.dataset.noteArticle))));open(reader);});
 const lifeCards=[...document.querySelectorAll('[data-life-card]')];
 function renderLife(){const groups=Math.ceil(lifeCards.length/2);lifeGroup=(lifeGroup+groups)%groups;lifeCards.forEach((c,i)=>c.hidden=Math.floor(i/2)!==lifeGroup);document.querySelector('[data-life-count]').textContent=`0${lifeGroup+1} / 0${groups}`;}
 document.querySelectorAll('[data-life-dir]').forEach(b=>b.addEventListener('click',()=>{lifeGroup+=Number(b.dataset.lifeDir);renderLife();}));
 lifeCards.forEach(c=>c.addEventListener('click',()=>{const title=c.dataset.lifeTitle;content.innerHTML=`<span class="eyebrow">EVERYDAY COLLECTION</span><h1>${escape(title)}</h1><p class="reader-notice">生活分类入口与内容编排示意</p><p>记录阅读、远行和寻常日子，是为了在回望时，还能找到当时的感受。</p><div class="collection-illustration">${c.querySelector('.life-picture').innerHTML}</div><p>分类页延续当前美术风格，正式接入时将展示项目中该分类的真实内容。</p>`;open(reader);}));
 const information={about:['关于我','在电路与代码之间探索，也在日常里收集微小的风景。'],profile:['个人档案','经历、方向、项目与长期投入的事。正式接入时连接现有个人档案页面。'],tools:['在线工具','工程计算、专注计时与互动实验。正式接入时连接现有工具展厅。'],friends:['同行友链','一路相遇的人，以及值得再次拜访的站点。']};
 document.querySelectorAll('[data-info]').forEach(b=>b.addEventListener('click',()=>{const [title,text]=information[b.dataset.info];content.innerHTML=`<span class="eyebrow">PEOPLE & PLACES</span><h1>${title}</h1><p>${text}</p><p class="reader-notice">导航窗口示意，正式页面未作变更。</p>`;open(reader);}));
 document.querySelectorAll('[data-note]').forEach(b=>b.addEventListener('click',()=>{content.innerHTML=`<span class="eyebrow">FIELD NOTES / 排版示意</span><h1>沿途的一点念想</h1><p>把想法写下来，便有了可以继续走的路。</p><blockquote>保持好奇，也给正在发生的生活留一点空白。</blockquote><p>短记时间线保留日期、正文、展开入口。这里的内容为设计样稿编排。</p>`;open(reader);}));
 const input=search.querySelector('input'),results=search.querySelector('.search-results');
 function renderSearch(){const q=input.value.trim().toLowerCase();const list=data.articles.map((a,i)=>({...a,i})).filter(a=>(a.title+a.body).toLowerCase().includes(q));results.innerHTML=list.length?list.map(a=>`<button data-search-result="${a.i}">${escape(a.title)} <span>↗</span></button>`).join(''):'<p>没有找到匹配记录，换一个关键词试试。</p>';results.querySelectorAll('[data-search-result]').forEach(x=>x.addEventListener('click',()=>{search.close();openArticle(Number(x.dataset.searchResult));}));}
 input.addEventListener('input',renderSearch);document.querySelector('[data-search]').addEventListener('click',()=>{renderSearch();open(search);input.focus();});
 renderBook(book);renderLife();renderFeature();showChapter(Math.max(0,data.hashes.indexOf(location.hash.slice(1))));
})();
