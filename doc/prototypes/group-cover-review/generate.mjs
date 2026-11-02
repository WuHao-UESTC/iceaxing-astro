import fs from 'node:fs';
import YAML from 'yaml';

const directory = 'doc/prototypes/group-cover-review';
fs.mkdirSync(`${directory}/assets`, { recursive: true });
const escape = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;');
const category = (id) =>
  YAML.parse(fs.readFileSync(`src/content/categories/${id}.yaml`, 'utf8')).labels.zh;
const analog = category('analog-ic'),
  study = category('razavi-cmos-analog-note'),
  life = category('journey');
const groups = {
  study: {
    title: '学习笔记',
    en: 'KNOWLEDGE ATLAS',
    marker: '03 / 4700m',
    theme: '教材星图 · 绿色 · 求知路线',
    category: study.title,
    description: study.description.trim(),
    project: '差动放大器专题实验',
    collection: '差动放大器 · 阅读路线',
    quote: '把读过的书、推过的公式与想明白的问题，慢慢整理成路。',
    projects: ['差动放大器专题实验', '模拟电路直觉训练'],
    collections: ['差动放大器 · 阅读路线', '从器件到电路'],
    articles: ['C4-差动放大器', '期末复习串讲——结论与直觉', '共模与差模 · 章节示意'],
    illustrated: true,
  },
  skill: {
    title: '技术栈',
    en: 'TECHNICAL RIDGE',
    marker: '02 / 4200m',
    theme: '工程目录 · 冰蓝色 · 山脊',
    category: analog.title,
    description: analog.description.trim(),
    project: '2026年集创赛作品合集',
    collection: '模拟前端 · 设计记录',
    quote: '从原理出发，把想法一步步做成现实。',
    projects: ['2026年集创赛作品合集', '二级运放搭建全流程'],
    collections: ['模拟前端 · 设计记录', '调试与验证手记'],
    articles: [
      '全差分放大器 · 章节示意',
      '可编程增益放大器 · 章节示意',
      '比较器与电容阵列 · 章节示意',
    ],
    illustrated: false,
  },
  life: {
    title: '生活日常',
    en: 'SNOW MOUNTAIN RIFT',
    marker: '04 / 5100m',
    theme: '悬浮入口 · 金色 · 雪山裂谷',
    category: life.title,
    description: '在行走与停留之间，收集沿途的风景与日常。',
    project: '川西行走计划',
    collection: '山路与日常',
    quote: '在阅读、远行与寻常日子里，收集世界的细节。',
    projects: ['川西行走计划', '日常观察与拾遗'],
    collections: ['山路与日常', '沿途的光'],
    articles: ['出发之前 · 章节示意', '沿着山脊慢慢走 · 章节示意', '回到日常 · 章节示意'],
    illustrated: true,
  },
};
const plans = [
  {
    id: 'a',
    title: '地景嵌片',
    sub: '封面是地景中的一块切面',
    description:
      '保留透明标题区与目录骨架，把封面嵌入星图、山脊或裂谷。封面有辨识度，页面仍然轻盈。',
    best: '技术栈优先考虑；也适合作为全站统一基础。',
  },
  {
    id: 'b',
    title: '坐标图册',
    sub: '把封面当作书、档案与路标',
    description:
      '以完整封面为主体，加入坐标、细线、书脊与层级标记。信息与封面并列，适合教材、图表和竖版封面。',
    best: '学习笔记优先考虑，教材封面能完整保留。',
  },
  {
    id: 'c',
    title: '裂面长卷',
    sub: '让封面的颜色延伸成一片风景',
    description:
      '封面作为淡化的环境纹理，前景保留清晰原图。标题通过渐变层融入地景，兼顾氛围和图像可辨认性。',
    best: '生活日常优先考虑；照片与专题更有展开感。',
  },
];
const levels = { category: '分类', project: '项目', collection: '合集' };

const terrain = `<svg class="scene-terrain" viewBox="0 0 1000 340" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width=".7" stroke-opacity=".35"><path fill="currentColor" fill-opacity=".07" d="M0 300 120 75 250 270 390 150 530 310 650 45 785 270 910 115 1000 290v50H0Z"/><path fill="currentColor" fill-opacity=".1" d="m120 75 40 247 90-52Zm270 75 35 178 105-18ZM650 45l40 280 95-55Zm260 70 20 217 70-42Z"/><path d="m0 300 160 22 230-172 35 178 225-283 40 280 220-210 20 217"/></g></svg>`;
const stars = `<svg class="scene-stars" viewBox="0 0 1000 340" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-opacity=".32" stroke-width=".8"><path d="m40 90 130 35 90-76 122 82 153-74 100 81 139-52 151 105M170 125l93 111 119-105 155 113 98-106 113 127 177-74"/></g><g fill="currentColor"><circle cx="40" cy="90" r="2"/><circle cx="170" cy="125" r="4"/><circle cx="260" cy="49" r="2"/><circle cx="382" cy="131" r="3"/><circle cx="535" cy="57" r="3"/><circle cx="635" cy="138" r="4"/><circle cx="774" cy="86" r="2"/><circle cx="925" cy="191" r="3"/><circle cx="263" cy="236" r="2"/><circle cx="537" cy="244" r="2"/><circle cx="748" cy="265" r="2"/></g></svg>`;
const circuit = `<svg class="scene-circuit" viewBox="0 0 1000 340" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width=".8" aria-hidden="true"><path d="M100 35v60h150v60h180m0-50 90 50-90 50Zm90 50h210v-60h160M250 155v110h330v-60h150v110M100 280v-80h90"/><g fill="currentColor"><circle cx="100" cy="35" r="3"/><circle cx="100" cy="280" r="3"/><circle cx="250" cy="95" r="3"/><circle cx="730" cy="95" r="3"/><circle cx="890" cy="95" r="3"/></g></svg>`;
const rift = `<svg class="scene-rift" viewBox="0 0 1000 340" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-opacity=".4" stroke-width=".7"><path fill="currentColor" fill-opacity=".1" d="M30 20 180 5 140 95 75 135 5 90Zm290 45 100-40 90 65-55 55-115-30Zm350-30 105-20 65 75-115 30-65-40ZM180 265l125-60 85 85-60 45-145-15Zm390 30 95-120 95 65-35 75-120 25Zm280-90 95-30 55 75-80 50-70-40Z"/><path d="m75 135 65-40 40-90m160 110 80-90 35 120m205-65 115-65-50 105M180 265l150 70-25-130m265 90 95-120 60 140"/></g></svg>`;
const scene = (group) => terrain + (group === 'study' ? stars : group === 'skill' ? circuit : rift);
const stat = (n, label) =>
  `<div class="stat"><svg viewBox="0 0 100 90" aria-hidden="true"><path d="m7 80 33-74 13 48 25-24 16 52-41-12-13-64-9 57Z" fill="currentColor" opacity=".13"/><path d="m7 80 33-74 13 48 25-24 16 52" fill="none" stroke="currentColor" stroke-width=".7" opacity=".4"/></svg><strong>${n}</strong><span>${label}</span></div>`;
const cover = (group, className = '') =>
  `<figure class="cover ${className}"><span class="cover-placeholder" aria-hidden="true">◇</span><img src="assets/${group}.svg" data-original="assets/${group}.svg" alt="${groups[group].title}封面设计示意" width="900" height="600"><span class="cover-coordinate" aria-hidden="true">${groups[group].marker}</span></figure>`;
const data = (group, level) => {
  const g = groups[group];
  return {
    title: level === 'category' ? g.category : level === 'project' ? g.project : g.collection,
    description:
      level === 'category'
        ? g.description
        : level === 'project'
          ? '把一个具体问题拆解、实现，再留下可回看的过程。'
          : '沿着清晰的阅读次序，把分散的文章连接成一条路线。',
    caption:
      level === 'category' ? '寻找一个方向' : level === 'project' ? '展开一项实践' : '沿着章节阅读',
    label:
      level === 'category'
        ? 'CATEGORY / 主题索引'
        : level === 'project'
          ? 'PROJECT / 项目手册'
          : 'COLLECTION / 阅读目录',
  };
};
const stats = (level) =>
  level === 'category'
    ? stat('02', '项目') + stat('03', '文章')
    : level === 'project'
      ? stat('02', '合集') + stat('03', '文章')
      : stat('03', '章节');
const feature = (group, level, plan) => {
  const g = groups[group],
    d = data(group, level);
  return `<header class="folder-hero level-${level}">${plan.id === 'c' ? `<div class="hero-wash" aria-hidden="true">${cover(group)}</div>` : ''}<div class="hero-scene">${scene(group)}</div><div class="hero-copy"><span class="eyebrow">${d.label}</span><h1>${escape(d.title)}</h1><p class="hero-description">${escape(d.description)}</p><div class="hero-trail"><span class="trail-dot"></span><span>${d.caption}</span><span class="trail-line"></span><span>${g.marker}</span></div></div><div class="hero-cover">${cover(group)}<span class="cover-pin" aria-hidden="true">+</span><span class="cover-address">${g.en}<br>${level.toUpperCase()} / FIELD NOTES</span></div><div class="hero-stats">${stats(level)}</div>${level === 'project' ? '<div class="hero-progress"><span>项目进展</span><div><i></i></div><strong>100%</strong><small>示意进度</small></div>' : ''}${level === 'collection' ? '<div class="hero-chapter-strip"><span>01 起点</span><i></i><span>02 推进</span><i></i><span>03 回看</span></div>' : ''}<span class="hero-caption">${plan.title} / ${g.theme}</span></header>`;
};
const childCard = (group, level, title, index) =>
  `<a href="#" class="folder-card" data-jump="${level}"><div class="folder-card-cover">${cover(group)}</div><div class="folder-card-copy"><span class="eyebrow">${String(index + 1).padStart(2, '0')} / ${level === 'project' ? 'PROJECT' : 'COLLECTION'}</span><h3>${escape(title)}</h3><p>${level === 'project' ? '从想法到验证，留下过程与结果。' : '把相关的记录，整理成可循的阅读路线。'}</p><span class="card-foot">${level === 'project' ? '展开项目' : '进入合集'} <i>↗</i></span></div></a>`;
const articleRows = (group) =>
  `<ol class="article-rows">${groups[group].articles.map((title, i) => `<li><span class="row-number">0${i + 1}</span><div class="article-cover">${cover(group)}</div><div class="article-copy"><span class="metadata">2026.10.${21 + i}　/　阅读记录</span><h3>${escape(title)}</h3><p>在具体问题中建立理解，保留思考、推导和实践的过程。</p></div><span class="article-arrow" aria-hidden="true">↗</span></li>`).join('')}</ol>`;
const content = (group, level) => {
  const g = groups[group];
  const folders =
    level === 'category'
      ? `<section class="directory-section" id="${level}-projects"><div class="section-heading"><h2>项目</h2><span>02 / PROJECTS</span></div><div class="folder-cards projects">${g.projects.map((title, i) => childCard(group, 'project', title, i)).join('')}</div></section>`
      : level === 'project'
        ? `<section class="directory-section" id="${level}-collections"><div class="section-heading"><h2>合集</h2><span>02 / COLLECTIONS</span></div><div class="folder-cards collections">${g.collections.map((title, i) => childCard(group, 'collection', title, i)).join('')}</div></section>`
        : '';
  return `<div class="directory-layout"><aside class="page-rail"><span class="eyebrow">本页目录</span>${level === 'project' ? '<div class="rail-progress"><span>已完成 <strong>100%</strong></span><progress value="100" max="100">100%</progress></div>' : ''}${level !== 'collection' ? `<a href="#${level}-${level === 'category' ? 'projects' : 'collections'}"><span>${level === 'category' ? '项目' : '合集'}</span><span>02</span></a>` : ''}<a href="#${level}-articles"><span>${level === 'collection' ? '阅读章节' : '独立文章'}</span><span>03</span></a>${level === 'collection' ? '<a class="start-reading" href="#collection-articles">从第一篇开始 ↘</a>' : ''}<p>${g.quote}</p><span class="rail-levels">分类 → 项目 → 合集</span></aside><div class="directory-sections">${folders}<section class="directory-section" id="${level}-articles"><div class="section-heading"><h2>${level === 'collection' ? '阅读章节' : '独立文章'}</h2><span>03 / ${level === 'collection' ? 'CHAPTERS' : 'ARTICLES'}</span></div>${articleRows(group)}</section></div></div>`;
};
const planWireframe = (id) =>
  `<svg viewBox="0 0 330 150" fill="none" aria-hidden="true"><rect x="10" y="10" width="310" height="130" rx="1" stroke="currentColor" opacity=".25"/>${id === 'a' ? '<path d="M28 45h105m-105 14h76m-76 20h127m-127 12h100" stroke="currentColor" opacity=".5"/><path d="m195 30 98 9-13 70-95-7Z" fill="currentColor" opacity=".12"/><path d="m180 118 30-46 38 43 34-65 22 69" stroke="currentColor" opacity=".5"/>' : id === 'b' ? '<path d="M33 28h83v90H33Z" fill="currentColor" opacity=".14"/><path d="M27 22h95v102H27Zm5 17h-12m12 69h-12M147 45h121m-121 16h86m-86 25h139m-139 14h99" stroke="currentColor" opacity=".5"/>' : '<path d="M25 26h280v95H25Z" fill="currentColor" opacity=".1"/><path d="m25 116 65-67 50 63 54-40 63 48m-216-20h133m-133-15h91M241 40h48v60h-48Z" stroke="currentColor" opacity=".5"/>'}</svg>`;

for (const [key, g] of Object.entries(groups)) {
  const palette =
    key === 'study'
      ? ['#e4e9df', '#24685c', '#55796b', '#bbc9aa']
      : key === 'skill'
        ? ['#152c36', '#2c5362', '#527989', '#85b6c6']
        : ['#242a33', '#4a5969', '#a48773', '#e0bd89'];
  const ornament =
    key === 'study'
      ? '<path fill="none" d="m145 160 185-55 120 150 185-110 120 210M330 105l-30 240 150-90 95 185 210-85" stroke="#24685c" stroke-opacity=".35"/><g fill="#24685c"><circle cx="145" cy="160" r="4"/><circle cx="330" cy="105" r="6"/><circle cx="450" cy="255" r="5"/><circle cx="635" cy="145" r="4"/><circle cx="755" cy="355" r="5"/></g>'
      : key === 'skill'
        ? '<g stroke="#9bc5d1" stroke-width="2" fill="none"><path d="M180 250h120m0-80 145 80-145 80ZM445 250h180v-95H375v52M530 250v185H210V250M180 210v30m-15-15h30"/><path d="M560 80h160v80h80M120 430h80" stroke-opacity=".4"/></g>'
        : '<circle cx="700" cy="130" r="42" fill="#f1d5a9" opacity=".75"/><path d="m0 440 210-260 210 260 150-120 230 175H0Z" fill="#75818a" opacity=".6"/>';
  fs.writeFileSync(
    `${directory}/assets/${key}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="${palette[0]}"/>${ornament}<g stroke="${palette[3]}" stroke-opacity=".25"><path fill="${palette[1]}" d="M0 600 180 320 380 550 550 350 770 600Z"/><path fill="${palette[2]}" d="m180 320 55 280 145-50Zm370 30 32 250h188Z"/><path fill="${palette[1]}" d="m650 600 125-240 125 170v70Z"/></g><text x="65" y="64" fill="${key === 'study' ? '#24685c' : palette[3]}" font-family="Consolas,monospace" font-size="13" letter-spacing="3">${g.en}</text><path d="M65 86h45" stroke="${palette[3]}"/></svg>`,
  );
}
fs.copyFileSync(
  'src/assets/content/covers/analog-ic/coverImage.jpg',
  `${directory}/assets/diagram.jpg`,
);

for (const plan of plans)
  for (const [group, g] of Object.entries(groups)) {
    const html = `<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${plan.title} · ${g.title}封面样稿</title><link rel="stylesheet" href="styles.css"><script src="preview.js" defer></script></head><body class="plan-${plan.id} group-${group}" data-group="${group}" data-plan="${plan.id}"><div class="review-bar"><a href="index.html">封面提案总览 ↗</a><nav aria-label="设计方案">${plans.map((p) => `<a href="${p.id}-${group}.html" data-plan-link ${p.id === plan.id ? 'aria-current="page"' : ''}>${p.id.toUpperCase()} ${p.title}</a>`).join('')}</nav><button data-theme-toggle>切换明暗</button></div><header class="site-header"><a class="wordmark" href="index.html">iceaxing.</a><nav aria-label="内容分组">${Object.entries(
      groups,
    )
      .map(
        ([key, value]) =>
          `<a href="${plan.id}-${key}.html" data-plan-link ${key === group ? 'aria-current="page"' : ''}>${value.title}</a>`,
      )
      .join(
        '',
      )}</nav><span class="site-note">雪线之上 / FIELD NOTES</span></header><div class="review-intro"><span>${plan.id.toUpperCase()} / ${plan.title}</span><p>${plan.sub}</p><div class="material-controls"><button data-material-toggle aria-pressed="false">测试图表封面</button><button data-empty-toggle aria-pressed="false">测试无封面</button></div></div><div class="level-navigation"><nav aria-label="页面层级">${Object.entries(
      levels,
    )
      .map(
        ([key, title]) =>
          `<button data-select-level="${key}" aria-pressed="${key === 'category'}"><span>${title}</span><small>${key.toUpperCase()}</small></button>`,
      )
      .join(
        '',
      )}</nav><p>页面结构与部分内容为设计示意 · 合集尚未配置</p></div><main id="page">${Object.keys(
      levels,
    )
      .map(
        (level) =>
          `<section class="level-page" data-level="${level}" aria-label="${levels[level]}页面样稿"><nav class="breadcrumbs" aria-label="当前位置"><span>${g.title}</span><span>/</span><button data-jump="category">${escape(g.category)}</button>${level !== 'category' ? `<span>/</span><button data-jump="project">${escape(g.project)}</button>` : ''}${level === 'collection' ? `<span>/</span><span>${escape(g.collection)}</span>` : ''}</nav>${feature(group, level, plan)}${content(group, level)}</section>`,
      )
      .join(
        '',
      )}<div class="design-note"><span class="eyebrow">DESIGN NOTES</span><p>${plan.description}</p><small>${g.theme}。分类保留聚合与统计，项目保留进度与合集入口，合集保留章节顺序。所有文章条目沿用当前紧凑的左图布局。</small></div></main><footer class="site-footer"><span>本地 HTML 样稿 · 未修改正式页面</span><a href="index.html">返回方案比较 ↑</a></footer></body></html>`;
    fs.writeFileSync(`${directory}/${plan.id}-${group}.html`, html);
  }

const index = `<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>分类、项目与合集 · 封面设计提案</title><link rel="stylesheet" href="styles.css"><script src="preview.js" defer></script></head><body class="overview"><header class="site-header"><span class="wordmark">iceaxing.</span><span class="site-note">FOLDER COVERS / DESIGN REVIEW</span><button data-theme-toggle>切换明暗</button></header><main><span class="eyebrow">THREE GROUPS / THREE APPROACHES</span><h1>封面，成为地景的一部分。</h1><p class="overview-intro">学习笔记的星图、技术栈的山脊、生活日常的裂谷：让分类、项目和合集的封面延续各自首页的视觉，而不是统一套用文章大图。三套方案均包含三个内容分组，以及三个页面层级。</p><div class="group-principles">${Object.entries(
  groups,
)
  .map(
    ([key, g]) =>
      `<div class="group-${key}"><span>${g.marker}</span><h2>${g.title}</h2><p>${g.theme}</p></div>`,
  )
  .join('')}</div><div class="proposal-grid">${plans
  .map(
    (plan) =>
      `<article class="proposal"><div class="proposal-art">${planWireframe(plan.id)}<span>${plan.id.toUpperCase()}</span></div><span class="eyebrow">${plan.sub}</span><h2>${plan.title}</h2><p>${plan.description}</p><div class="proposal-fit">${plan.best}</div><div class="proposal-links">${Object.entries(
        groups,
      )
        .map(
          ([key, g]) =>
            `<a href="${plan.id}-${key}.html" class="group-${key}">${g.title}<span>打开样稿 ↗</span></a>`,
        )
        .join('')}</div></article>`,
  )
  .join(
    '',
  )}</div><section class="recommendations"><h2>可以统一骨架，也可以按组选择。</h2><p>更统一的选择是以 A 为基础，三组只改变地景与强调色。如果希望各组更有性格，建议学习笔记选 B、技术栈选 A、生活日常选 C，同时保持相同的面包屑、目录与统计规则。</p><div class="comparison-table"><table><thead><tr><th>页面</th><th>封面的职责</th><th>保留的信息</th></tr></thead><tbody><tr><td>分类</td><td>建立主题识别</td><td>简介、项目与独立文章统计、下级入口</td></tr><tr><td>项目</td><td>呈现实践对象</td><td>进度、状态、合集入口与独立文章</td></tr><tr><td>合集</td><td>成为阅读路线的扉页</td><td>章节顺序、开始阅读入口、文章条目</td></tr></tbody></table></div><p class="sample-note">每个样稿顶部可以切换分类 / 项目 / 合集，并测试图表封面、无封面和明暗模式。当前站点没有合集内容，学习与生活组的项目也使用结构示例；图像为本地矢量示意，测试图表取自已有分类封面。正式内容和配置未改动。</p></section></main><footer class="site-footer"><span>© iceaxing · 本地设计提案</span><span>3 套方案 × 3 个分组 × 3 个层级</span></footer></body></html>`;
fs.writeFileSync(`${directory}/index.html`, index);
console.log('Generated comparison + 9 HTML pages, covering 27 group/level/design combinations.');
