import fs from 'node:fs';
import YAML from 'yaml';

const directory = 'doc/prototypes/archive-layout-review';
fs.mkdirSync(`${directory}/assets`, { recursive: true });
for (const group of ['skill', 'study', 'life', 'camp'])
  fs.copyFileSync(`public/media/folders/${group}.svg`, `${directory}/assets/${group}.svg`);
for (const name of ['analog.svg', 'signal.svg', 'landscape.svg', 'diagram.jpg'])
  fs.copyFileSync(`doc/prototypes/article-cover-review/assets/${name}`, `${directory}/assets/${name}`);
fs.writeFileSync(
  `${directory}/base.css`,
  ['src/styles/listing.css', 'src/styles/folder-covers.css']
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n'),
);
const category = (id) =>
  YAML.parse(fs.readFileSync(`src/content/categories/${id}.yaml`, 'utf8')).labels.zh;
const article = (id) =>
  YAML.parse(fs.readFileSync(`src/content/articles/zh/${id}/index.mdoc`, 'utf8').split('---')[1]);
const project = (id) => YAML.parse(fs.readFileSync(`src/content/projects/${id}.yaml`, 'utf8'));
const plans = [
  {
    id: 'a',
    title: '通栏书页',
    subtitle: '取消侧栏，让内容完整展开',
    description:
      '直接去掉左侧目录，用完整页宽呈现项目、合集与文章。分组标题仍然清晰，条目之间保留呼吸感。',
    fit: '内容较少、以浏览为主；改动最少。',
    cost: '沿用现有数据与排序，无新增后台字段。',
    recommendation: '首选：目前条目量最适合这一版。',
    wire: 'wide',
  },
  {
    id: 'b',
    title: '横向切换',
    subtitle: '目录变成可操作的内容标签',
    description:
      '取消侧栏，把内容类型放到顶部横向标签中。标签用于筛选，滚动后仍能切换；只有一种类型时自动简化。',
    fit: '项目、合集、文章混合出现的分类与项目页面。',
    cost: '增加前端筛选，无新增后台字段。',
    recommendation: '次选：内容增加后仍然容易浏览。',
    wire: 'tabs',
  },
  {
    id: 'c',
    title: '阅读起点',
    subtitle: '先给一个入口，再展开目录',
    description:
      '取消侧栏，把现有排序中的第一个项目、合集或章节提到开篇，其余内容继续向下展开。第一步更明确。',
    fit: '教材笔记、连续专题与有固定阅读顺序的合集。',
    cost: '默认沿用现有首项；以后可再决定是否需要手选起点。',
    recommendation: '适合希望读者从头读起的专题。',
    wire: 'lead',
  },
  {
    id: 'd',
    title: '沿途路径',
    subtitle: '把日期与章节顺序融进条目',
    description:
      '取消独立侧栏，用一条纤细的路径串联分组和条目。日期、项目状态或章节次序成为沿途节点。',
    fit: '长期项目、旅行手记、逐步推进的章节目录。',
    cost: '使用已有日期、状态和排序，不新增里程碑数据。',
    recommendation: '叙事感最强，条目很多时会比 A 更有节奏。',
    wire: 'trail',
  },
  {
    id: 'e',
    title: '筛选工作台',
    subtitle: '保留侧栏，但让它真正处理内容',
    description:
      '将目录换成搜索、内容类型和主题筛选。结果数量即时变化；手机端收成可展开的筛选区域。',
    fit: '二十条以上，或标签与内容类型较多的分类。',
    cost: '使用现有标题、摘要、标签与状态，无新增后台字段。',
    recommendation: '为内容较多的页面准备，不建议现在全站统一采用。',
    wire: 'filters',
  },
];
const demoArticle = (title, index, tags, image) => ({
  title,
  description: '整理沿途的思考、方法与实践，保留以后可以回看的过程。',
  date: `2026-10-${String(27 - index * 3).padStart(2, '0')}`,
  tags,
  image,
  kind: 'article',
  demo: true,
});
const demoFolder = (title, index, group) => ({
  title,
  description: '把分散的记录整理为一个专题，沿着清晰的顺序展开。',
  date: `2026-10-${String(20 - index * 4).padStart(2, '0')}`,
  tags: ['专题'],
  image: `assets/${group}.svg`,
  status: index ? 'active' : 'completed',
  progress: index ? 65 : 100,
  demo: true,
});
const realArticle = (id, tags, image) => {
  const data = article(id);
  return {
    title: data.title,
    description: data.excerpt || '学习过程中的思考、推导与要点记录。',
    date: new Date(data.publishedAt).toISOString().slice(0, 10),
    tags,
    image,
    kind: 'article',
    demo: false,
  };
};
const groups = {};
for (const [key, id, name, caption, projects, collections, titles, tags] of [
  [
    'study',
    'razavi-cmos-analog-note',
    '学习笔记',
    'KNOWLEDGE ATLAS',
    ['差动放大器专题实践', '模拟电路直觉训练'],
    ['差动放大器 · 阅读路线', '从器件到电路'],
    ['共模与差模的直觉', '从结论回到电路'],
    ['模拟电路', '学习方法'],
  ],
  [
    'skill',
    'analog-ic',
    '技术栈',
    'TECHNICAL RIDGE',
    ['2026年集创赛作品合集', '二级运放搭建全流程'],
    ['模拟前端 · 设计记录', '调试与验证手记'],
    ['全差分放大器设计记录', '可编程增益放大器调试', '跨阻放大器的噪声分析', '比较器与电容阵列'],
    ['电路设计', '调试记录'],
  ],
  [
    'life',
    'journey',
    '生活日常',
    'SNOW MOUNTAIN RIFT',
    ['川西行走计划', '日常观察与拾遗'],
    ['山路与日常', '沿途的光'],
    ['出发之前', '沿着山脊慢慢走', '回到日常', '山风吹过的下午'],
    ['旅行', '日常'],
  ],
  [
    'camp',
    'daily-ramblings',
    '碎碎念',
    'TRAIL WAYSTATION',
    ['沿途随记整理', '一些慢下来的日子'],
    ['短暂停靠', '生活的细枝末节'],
    ['短暂停靠，再继续出发', '给平常的一天留个注脚', '晚风中的一些念头'],
    ['随记', '日常'],
  ],
]) {
  const source = category(id);
  groups[key] = {
    key,
    name,
    caption,
    category: source.title,
    description: (source.description || '在行走与停留之间，收集沿途的风景与日常。').trim(),
    project: projects[0],
    collection: collections[0],
    projectDescription: '从一个具体问题出发，记录分析、实现与验证的过程。',
    collectionDescription: '沿着既定章节次序，把分散的文章连接成一条阅读路线。',
    hero: key === 'skill' ? 'assets/diagram.jpg' : `assets/${key}.svg`,
    projects: projects.map((title, index) => ({
      ...demoFolder(title, index, key),
      kind: 'project',
    })),
    collections: collections.map((title, index) => ({
      ...demoFolder(title, index, key),
      kind: 'collection',
    })),
    articles: titles.map((title, index) =>
      demoArticle(title, index, [tags[index % 2]], `assets/${key}.svg`),
    ),
  };
}
groups.study.articles.unshift(
  realArticle('c4-differential-amp', ['模拟电路'], 'assets/analog.svg'),
  realArticle('razavi-analogic-review', ['学习方法'], 'assets/signal.svg'),
);
groups.camp.articles.unshift(
  realArticle('ramble-happiness-at-fingertip', ['随记'], 'assets/camp.svg'),
);
groups.skill.projects = ['2026-cicc', 'two-stage-ota'].map((id) => {
  const data = project(id);
  return {
    title: data.labels.zh.title,
    description: data.labels.zh.description,
    date: new Date(data.createdAt).toISOString().slice(0, 10),
    tags: data.tags,
    kind: 'project',
    image: 'assets/skill.svg',
    status: data.status,
    progress: data.progress,
    demo: false,
  };
});
fs.writeFileSync(
  `${directory}/data.js`,
  `window.ARCHIVE_LAYOUT_REVIEW = ${JSON.stringify({ plans, groups }, null, 2)};\n`,
);

const head = (title) =>
  `<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title} · 页面布局样稿</title><link rel="stylesheet" href="base.css"><link rel="stylesheet" href="styles.css"><script src="data.js" defer></script><script src="preview.js" defer></script></head>`;
const planLinks = (active) =>
  plans
    .map(
      (plan) =>
        `<a href="${plan.id}.html" data-plan-link${active === plan.id ? ' aria-current="page"' : ''}>${plan.id.toUpperCase()} ${plan.title}</a>`,
    )
    .join('');
const themeButton =
  '<button type="button" data-theme-toggle aria-label="切换明暗主题">浅色模式 <span aria-hidden="true">◐</span></button>';
const footer =
  '<footer class="review-footer shell"><span>本地 HTML 设计样稿 · 正式页面尚未改动</span><a href="index.html">回到方案比较 ↑</a></footer>';
for (const plan of plans)
  fs.writeFileSync(
    `${directory}/${plan.id}.html`,
    `${head(plan.title)}<body data-plan="${plan.id}" class="variant-${plan.id}"><div class="review-top shell"><a href="index.html">← 五版比较</a><nav aria-label="设计方案">${planLinks(plan.id)}</nav>${themeButton}</div><header class="sample-site-header shell"><a href="index.html" class="wordmark">iceaxing.</a><span>学习笔记 / 技术栈 / 生活日常</span><span class="sample-tag">LAYOUT STUDIES / ${plan.id.toUpperCase()}</span></header><section class="review-intro shell" aria-label="方案说明"><div><p class="review-eyebrow">${plan.id.toUpperCase()} / ${plan.title}</p><h2>${plan.subtitle}</h2><p>${plan.description}</p><small>${plan.cost}</small></div><div class="review-controls"><label>栏目<select data-group><option value="study">学习笔记 · 绿色</option><option value="skill">技术栈 · 冰蓝色</option><option value="life">生活日常 · 金色</option><option value="camp">碎碎念 · 紫色</option></select></label><label>内容量<select data-density><option value="normal">常规内容</option><option value="dense">较多条目</option><option value="sparse">仅一篇文章</option><option value="empty">暂无内容</option></select></label><nav class="level-switch" aria-label="页面层级"><button data-level="category">分类</button><button data-level="project">项目</button><button data-level="collection">合集</button></nav></div></section><p class="sample-notice shell">标题与部分内容取自现有项目；合集、扩展条目与专题归属用于布局演示，均未写入正式数据。</p><div id="sample-root"></div><dialog id="entry-preview" aria-labelledby="entry-preview-title"><button type="button" class="dialog-close" data-close-preview aria-label="关闭预览">×</button><p class="review-eyebrow">条目预览 / 仅用于样稿</p><h2 id="entry-preview-title"></h2><p data-preview-description></p><p class="preview-source"></p></dialog>${footer}</body></html>`,
  );
fs.writeFileSync(
  `${directory}/index.html`,
  `${head('侧栏去留 · 五版比较')}<body data-plan="index"><div class="review-top shell"><a class="wordmark" href="index.html">iceaxing.</a><span>ARCHIVE LAYOUT / 05 STUDIES</span>${themeButton}</div><main class="review-index shell"><p class="review-eyebrow">目录之外 / 分类 · 项目 · 合集</p><h1>把空间还给内容。</h1><p class="index-intro">左侧目录只有一两个入口时，确实不值得长期占用一列。这里准备了四种取消侧栏的方式，以及一种将侧栏改为真正筛选工具的方式。</p><div class="index-recommendation"><span>建议先看 A，再比较 B</span><p>A 最直接，也最适合现在的内容量；B 为混合内容增加切换能力。C 偏重阅读起点，D 偏重沿途的叙事，E 留给内容明显增多之后。</p></div><div class="plan-grid">${plans.map((plan) => `<a class="plan-card" href="${plan.id}.html"><div class="wireframe wire-${plan.wire}" aria-hidden="true"><div class="wire-hero"><i></i><b></b></div><div class="wire-body"><span class="wire-side"></span><div class="wire-main"><i></i><i></i><i></i></div></div></div><p class="review-eyebrow">${plan.id.toUpperCase()} / ${plan.title}</p><h2>${plan.subtitle}</h2><p>${plan.description}</p><small>${plan.fit}</small><span class="plan-open">打开交互样稿 <i aria-hidden="true">↗</i></span></a>`).join('')}</div><div class="comparison-wrap"><table><caption>五版差别</caption><thead><tr><th>方案</th><th>原侧栏的位置</th><th>新增价值</th><th>适用情况</th></tr></thead><tbody><tr><th>A 通栏书页</th><td>完全取消</td><td>更宽、更直接的浏览空间</td><td>少量至中等条目</td></tr><tr><th>B 横向切换</th><td>顶部标签</td><td>按内容类型筛选，可随滚动操作</td><td>分类与项目的混合内容</td></tr><tr><th>C 阅读起点</th><td>完全取消</td><td>明确第一步，不重复展示首项</td><td>教材与连续专题</td></tr><tr><th>D 沿途路径</th><td>融入条目边缘</td><td>日期、状态与章节节点形成节奏</td><td>项目记录与有顺序的合集</td></tr><tr><th>E 筛选工作台</th><td>改为筛选工具</td><td>标题搜索、类型和主题筛选</td><td>条目较多的目录</td></tr></tbody></table></div><p class="index-footnote">每版可切换 4 种栏目配色、3 种页面层级、4 种内容量和浅深色。标题区沿用当前透明背景、大封面和紧凑高度；文章条目仍使用固定高度。合集始终保留既定章节顺序。</p></main>${footer}</body></html>`,
);
console.log(`Generated five archive layout proposals and comparison page in ${directory}.`);
