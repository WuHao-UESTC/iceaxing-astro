(() => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-go]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer = null, automatic = false, touchStart = null;
  const play = carousel.querySelector('.play');
  function go(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, n) => {
      slide.classList.toggle('active', n === current);
      slide.setAttribute('aria-hidden', String(n !== current));
      slide.inert = n !== current;
    });
    dots.forEach((dot, n) => dot.setAttribute('aria-pressed', String(n === current)));
    carousel.querySelector('.slide-count').textContent = `0${current + 1} / 03`;
    const orbit = carousel.querySelector('.orbit');
    if (orbit) orbit.style.transform = `rotate(${current * 65}deg)`;
  }
  function schedule() {
    clearInterval(timer); timer = null;
    if (automatic && !reduced.matches && !document.hidden && !document.querySelector('dialog[open]')) {
      timer = setInterval(() => go(current + 1), 6500);
    }
  }
  function stopForInteraction() { automatic = false; updatePlay(); }
  function updatePlay() {
    play.setAttribute('aria-pressed', String(automatic));
    play.setAttribute('aria-label', automatic ? '暂停自动轮播' : '开启自动轮播');
    play.textContent = automatic ? 'Ⅱ' : '▷';
    schedule();
  }
  dots.forEach(dot => dot.addEventListener('click', () => { stopForInteraction(); go(Number(dot.dataset.go)); }));
  carousel.querySelectorAll('[data-dir]').forEach(button => button.addEventListener('click', () => { stopForInteraction(); go(current + Number(button.dataset.dir)); }));
  play.addEventListener('click', () => { automatic = !automatic; updatePlay(); });
  // Pause during focus and hover; manual navigation always returns control to the reader.
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', schedule);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { automatic = false; play.disabled = reduced.matches; updatePlay(); });
  if (reduced.matches) { play.disabled = true; play.title = '已遵循系统的减少动态效果设置'; }
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); stopForInteraction(); go(current + (event.key === 'ArrowRight' ? 1 : -1)); }
  });
  carousel.addEventListener('touchstart', event => { touchStart = {x:event.touches[0].clientX,y:event.touches[0].clientY}; }, {passive:true});
  carousel.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x, dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) { stopForInteraction(); go(current + (dx < 0 ? 1 : -1)); }
    touchStart = null;
  }, {passive:true});
  const articles = [
    {title:'深入二阶系统：从极点看见响应',label:'学习笔记',desc:'把阻尼、谐振与瞬态响应放进同一张图里，重新理解二阶系统。',body:'理解一个系统，可以从它如何回应一次扰动开始。输入改变的那一刻，系统的储能元件决定了响应不会瞬间完成；极点的位置，则描述了这个过程将以怎样的速度与形态展开。',sub:'从时间域，走向复平面',quote:'公式的意义，在于让我们预测下一次实验会看到什么。'},
    {title:'CMOS 反相器，一切从这里开始',label:'电路与系统',desc:'从电压传输特性出发，梳理噪声容限、功耗与传播延迟的关系。',body:'把一只 PMOS 与一只 NMOS 连接在一起，我们就得到了数字电路中最基本的逻辑单元。输入为低电平时，上拉网络导通；输入为高电平时，下拉网络接管。',sub:'从静态特性到动态过程',quote:'简单的电路，也是理解复杂系统的入口。'},
    {title:'无源滤波器设计的第一步',label:'工程实践',desc:'在公式和电路之间搭一座桥：从传递函数，到真实元件的选择。',body:'设计滤波器之前，先写下我们希望保留什么，又希望抑制什么。通带、阻带和过渡区域构成设计的边界，而元件损耗与端接条件让理想的计算回到现实。',sub:'先建立清晰的设计约束',quote:'设计的第一步，是把问题问得足够具体。'},
    {title:'指尖的幸福，与日常的小事',label:'生活随笔',desc:'偶尔停下来，把注意力还给眼前。一杯热茶，一段路，一点微小的满足。',body:'有时，一天里最值得记下来的事情很小。是杯壁传来的温度，是晚风吹过窗边的声音，也是一个终于想明白的问题带来的轻松。',sub:'给日常留一点空白',quote:'那些不起眼的时刻，常常构成生活真正的质地。'},
  ];
  const reader = document.querySelector('#reader');
  const search = document.querySelector('#search-dialog');
  const content = document.querySelector('#reader-content');
  let opener;
  function openDialog(dialog) { opener = document.activeElement; clearInterval(timer); dialog.showModal(); document.body.classList.add('modal-open'); }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if (event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); schedule(); });
  });
  function article(index) {
    const a=articles[index];
    content.className='reader-content';
    content.innerHTML=`<p class="reader-demo">${a.label} / 文章排版演示 · 以下为示意文案</p><h1>${a.title}</h1><p class="deck">${a.desc}</p><p>${a.body}</p><h2>${a.sub}</h2><p>${index===3?'我们习惯把注意力留给重要的事情，却常常忘记，生活的重量也藏在这些细小的片段里。写下它们，是为了在以后回望时，仍能想起当时的感受。':'把图形、直觉与推导放在一起，往往比单独记住结论更有帮助。先观察变化的方向，再用计算验证判断，最后回到实际电路中检验适用条件。'}</p><blockquote>${a.quote}</blockquote><div class="reader-figure">${document.querySelectorAll('.entry-art')[index].innerHTML}</div><p class="quiet">图 / 样稿视觉示意</p><h2>沿着这个问题，继续探索</h2><p>保持对细节的耐心，也保留对整体的好奇。把观察整理下来，下一次出发时，就有了一条可以回望的路。</p><button data-next-article>继续阅读：${articles[(index+1)%4].title} ↗</button>`;
    content.querySelector('[data-next-article]').addEventListener('click', () => article((index+1)%4));
    if (!reader.open) openDialog(reader);
    reader.scrollTop=0;
  }
  document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click',()=>article(Number(button.dataset.article))));
  function filter(category) {
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
    document.querySelectorAll('.entry').forEach(entry=>entry.hidden=category!=='all'&&entry.dataset.category!==category);
  }
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter)));
  document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{filter(button.dataset.topic);document.querySelector('#journal').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});}));
  document.querySelectorAll('[data-about]').forEach(button=>button.addEventListener('click',()=>{
    content.className='reader-content';content.innerHTML='<p class="reader-demo">ABOUT / 个人介绍排版示意</p><h1>在电路与代码之间，<br>保持一点好奇。</h1><p class="deck">你好，我是 Iceaxing。这里记录技术、项目与生活，也保存学习过程中那些逐渐清晰的想法。</p><h2>这个博客里有什么</h2><p>电路与系统的学习笔记，工程实践中的推导与验证，以及技术之外的一点日常。</p><blockquote>从原理出发，慢慢把想法做成现实。</blockquote><p>这是一份设计样稿。正式版本可以在这里衔接已有个人档案、项目经历与联系方式。</p>';openDialog(reader);
  }));
  document.querySelectorAll('[data-trail]').forEach(button=>button.addEventListener('click',()=>{
    content.className='reader-content';content.innerHTML='<p class="reader-demo">READING TRAIL / 专题编排示意</p><h1>从这里，读懂滤波器。</h1><p class="deck">先建立直觉，再理解模型，最后走进实际设计。</p><ol><li>基础电路：阻抗、储能与频率响应。</li><li>二阶系统：极点、阻尼与谐振。</li><li>无源滤波器：从指标到电路。</li><li>射频设计：把非理想因素放回模型。</li></ol><button data-start-trail>从二阶系统开始阅读 ↗</button>';content.querySelector('[data-start-trail]').addEventListener('click',()=>article(0));openDialog(reader);
  }));
  const input=search.querySelector('input');
  function results() {
    const q=input.value.trim().toLowerCase();
    const found=articles.map((a,i)=>({...a,i})).filter(a=>(a.title+a.desc+a.label).toLowerCase().includes(q));
    const list=search.querySelector('.search-results');list.replaceChildren();
    found.forEach(a=>{const button=document.createElement('button');button.textContent=a.title;const small=document.createElement('small');small.textContent=a.label+' · 阅读排版演示';button.append(small);button.addEventListener('click',()=>{search.close();article(a.i);});list.append(button);});
    if(!found.length){const p=document.createElement('p');p.textContent='暂时没有匹配的记录，试试其他关键词。';list.append(p);}
  }
  input.addEventListener('input',results);
  document.querySelector('[data-search]').addEventListener('click',()=>{results();openDialog(search);input.focus();});
})();
