import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { artwork, accent } from './art.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const tools = [
  ['fireworks', '放烟花', '点击夜空，让一束烟花在指尖绽放。', '创造', 'CLICK / BLOOM'],
  ['reverie', '随想', '推一把画笔，让惯性留下意外的线条。', '创造', 'MOMENTUM / INK'],
  ['guess-seconds', '猜秒数', '藏起时钟，试试自己的时间感。', '感知', 'FEEL / TIME'],
  ['ripples', '余波', '划过水面，看涟漪相遇、叠加与消散。', '漫游', 'TOUCH / WATER'],
  ['blind-circle', '盲画圆', '看不见笔迹的时候，你能画多圆？', '感知', 'DRAW / REVEAL'],
  ['gravity', '引力', '发射一颗小球，让引力续写它的轨道。', '漫游', 'MASS / ORBIT'],
  ['reaction', '一瞬', '等待一道光，接住那个瞬间。', '感知', 'WAIT / REACT'],
  ['color-music', '听见颜色', '点亮几颗音符，录下一段八秒旋律。', '创造', 'COLOR / SOUND'],
  ['stack-stones', '叠石', '一块一块，找到摇摇欲坠的平衡。', '漫游', 'WEIGHT / BALANCE'],
  ['visual-memory', '记一眼', '光点消失以后，你还记得它们吗？', '感知', 'SEE / REMEMBER'],
  ['color-sense', '辨色', '找出色块之间，那一点细微的不同。', '感知', 'SHADE / NOTICE'],
  ['refraction', '折光', '移动一块玻璃，改变光的旅程。', '漫游', 'PRISM / SPECTRUM'],
  ['fading-words', '消失的字', '写下一句话，留下，或者让它飘走。', '创造', 'WORDS / WIND'],
  ['snow-trails', '雪迹', '走过新雪，留下一段慢慢淡去的路。', '漫游', 'WALK / SNOW'],
  ['constellation', '连成星座', '挑几颗星，认出属于自己的形状。', '创造', 'STARS / STORIES'],
  ['pomodoro', '番茄钟', '留出一段时间，专注做好一件事。', '实用', 'FOCUS / TIMER'],
  ['smith-chart', '史密斯圆图', '探索阻抗、传输线与匹配的关系。', '实用', 'RF / ENGINEERING'],
].map(([id, title, description, category, tag]) => ({ id, title, description, category, tag }));
const designs = {
  a: {
    name: '线描画廊',
    eyebrow: 'TOOLS / A LITTLE ROOM TO PLAY',
    heading: '做点有用的。<br>也做点无用的。',
    description:
      '算一道题，专注片刻。或者只是点一束烟花，<br class="desktop-break">给偶然和好奇心留一点位置。',
    number: '01',
    fit: '留白最多、最克制。用线描预览建立识别，优先让名称和简介清晰、轻松地被浏览。',
    detail: '连续四列 · 居中插画 · 轻量文字',
    subtitle: '工具，也可以是一种小小的休息。',
  },
  b: {
    name: '微缩游乐场',
    eyebrow: 'SMALL TOOLS, OPEN POSSIBILITIES',
    heading: '好奇心，<br>可以在这里玩一会儿。',
    description:
      '十七个小装置，十七种与世界打交道的方式。<br class="desktop-break">从一次点击开始，让时间、声音与引力变得可触摸。',
    number: '02',
    fit: '更有玩具感与亲近感。插画像悬浮在桌面的微缩装置，色彩更鲜明，工具更像可拿起来玩的物件。',
    detail: '连续四列 · 微缩场景 · 暖色点缀',
    subtitle: '给每一种好奇心，留一件小玩具。',
  },
  c: {
    name: '地景图册',
    eyebrow: 'FIELD NOTES / DIGITAL INSTRUMENTS',
    heading: '一点探索，<br>一些意想不到。',
    description:
      '沿着感知、创造和漫游的线索，<br class="desktop-break">在这些小小的数字地景里，找到下一次出发。',
    number: '03',
    fit: '最接近现有网站的山地视觉。几何切面托起工具预览，编号与简短标记让页面更像一本探索图册。',
    detail: '连续四列 · 几何地景 · 编号索引',
    subtitle: '在日常之外，展开一张小小的地图。',
  },
};
function header() {
  return `<header class="site-header"><div class="header-inner"><a class="wordmark" href="http://127.0.0.1:4323/">iceaxing<span>.</span></a><nav aria-label="网站导航"><a href="http://127.0.0.1:4323/skill">技术栈</a><a href="http://127.0.0.1:4323/study">学习笔记</a><a href="http://127.0.0.1:4323/life">生活日常</a><a href="http://127.0.0.1:4323/log">碎碎念</a><a class="current" href="http://127.0.0.1:4323/tools" aria-current="page">工具</a><a href="http://127.0.0.1:4323/about">关于</a></nav><div class="header-controls"><button type="button" data-theme-toggle aria-label="切换深浅色模式"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20 14a8 8 0 0 1-10-10A8 8 0 1 0 20 14Z"/></svg></button><a href="index.html" class="review-home">方案对比 ↗</a></div></div></header>`;
}
function dock(active) {
  return `<nav class="review-dock" aria-label="样稿切换"><a href="index.html" class="dock-label">布局审阅</a>${Object.entries(
    designs,
  )
    .map(
      ([key, d]) =>
        `<a href="${key}.html" ${active === key ? 'aria-current="page"' : ''}>${key.toUpperCase()}<span>${d.name}</span></a>`,
    )
    .join('')}<button type="button" data-theme-toggle aria-label="切换深浅色模式">◐</button></nav>`;
}
function document(title, body, variant = 'overview') {
  return `<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><title>${title} · 在线工具布局样稿</title><link rel="stylesheet" href="styles.css"><script src="preview.js" defer></script></head><body class="design-${variant}">${header()}${body}${dock(variant)}</body></html>`;
}
function card(tool, index, variant) {
  return `<article class="tool-card" data-category="${tool.category}" data-title="${tool.title}" style="--card-accent:${accent(tool.id)}"><a class="tool-link" href="http://127.0.0.1:4323/tools/${tool.id}" target="_blank" rel="noopener"><figure class="tool-art"><span class="art-index">${String(index + 1).padStart(2, '0')}</span>${artwork(tool.id, variant)}<span class="art-open" aria-hidden="true">↗</span></figure><div class="tool-copy"><div class="card-overline"><span>${tool.category}</span><span>${tool.tag}</span></div><h2>${tool.title}<span aria-hidden="true">↗</span></h2><p>${tool.description}</p></div></a></article>`;
}
for (const [key, d] of Object.entries(designs)) {
  const heroArt = `<div class="hero-art" style="--card-accent:var(--accent)">${artwork(key === 'a' ? 'gravity' : key === 'b' ? 'stack-stones' : 'constellation', key)}<span>${key === 'a' ? 'SOMETHING USEFUL. SOMETHING UNEXPECTED.' : key === 'b' ? 'A SMALL PLAYGROUND / 17 OBJECTS' : 'EXPLORE AT YOUR OWN PACE / EST. 2026'}</span></div>`;
  const body = `<main class="gallery-page"><header class="gallery-hero"><div class="hero-copy"><p class="eyebrow">${d.eyebrow}</p><h1>${d.heading}</h1><p class="hero-description">${d.description}</p></div>${heroArt}</header><section class="gallery" aria-label="在线工具"><div class="gallery-toolbar"><div class="filters" role="group" aria-label="工具分类">${['全部', '感知', '创造', '漫游', '实用'].map((cat, i) => `<button type="button" data-filter="${cat}" aria-pressed="${i === 0}">${cat}${i === 0 ? '<sup>17</sup>' : ''}</button>`).join('')}</div><label class="search-label"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input type="search" placeholder="找一个小工具" aria-label="搜索工具" /></label><span class="result-count" role="status" aria-live="polite"><b data-count>17</b> 个工具</span></div><div class="tools-grid">${tools.map((tool, index) => card(tool, index, key)).join('')}</div><p class="empty-state" hidden>暂时没找到，换个名字再试试。</p></section><footer class="gallery-footer"><span>${d.subtitle}</span><span>ICEAXING / TOOLS & CURIOSITIES</span></footer></main>`;
  fs.writeFileSync(
    path.join(root, `${key}.html`),
    document(`${key.toUpperCase()} ${d.name}`, body, key),
  );
}
const overview = `<main class="overview-page"><header class="overview-heading"><p class="eyebrow">TOOLS GALLERY / DESIGN REVIEW</p><h1>把工具，摊开来看。</h1><p>去掉侧边目录，让每件工具有一幅自己的小画。<br>三种视觉方向，同样的四列、透明、无边框。</p></header><div class="proposal-grid">${Object.entries(
  designs,
)
  .map(
    ([key, d]) =>
      `<article class="proposal"><a class="proposal-preview" href="${key}.html"><img src="screenshots/${key}-desktop.png" alt="${d.name}桌面页面预览" width="1440" height="1100" /><span class="proposal-letter">${key.toUpperCase()}</span></a><p class="eyebrow">${d.detail}</p><h2><a href="${key}.html">${d.name}<span>↗</span></a></h2><p>${d.fit}</p><div class="proposal-links"><a href="${key}.html">查看完整 HTML ↗</a><a href="screenshots/${key}-mobile.png">手机预览 ↗</a></div></article>`,
  )
  .join(
    '',
  )}</div><section class="review-notes"><h2>先选气质，再定细节。</h2><p>更克制选 A，更有玩心选 B，更贴近现有地景选 C。三版都包含全部 17 个工具，顶部分类与搜索可以直接试用，卡片可打开已有工具。右下方可随时切换方案与深浅色。</p><div><span>桌面 / 四列</span><span>平板 / 两列</span><span>手机 / 一列</span></div><p class="fine-print">本地 HTML 设计样稿，尚未替换正式在线工具页面。</p></section></main>`;
fs.writeFileSync(path.join(root, 'index.html'), document('三版方案对比', overview));
console.log('Generated index.html + a.html + b.html + c.html with 17 tools each.');
