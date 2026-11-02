import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const directory = 'doc/prototypes/article-cover-review';
fs.mkdirSync(`${directory}/assets`, { recursive: true });
const escape = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;');
const variants = [
  {
    id: 'a',
    title: '文字优先',
    subtitle: '右侧缩略图 × 标题下横幅',
    description:
      '保留现有纵向文章目录，用小幅封面建立识别。正文标题与图片分开，适合学习笔记和长文章。',
    fit: '与现有页面最接近 · 推荐优先考虑',
    rhythm: '文字主导 / 封面辅助',
    shape: '列表 3:2 · 阅读页 16:7',
  },
  {
    id: 'b',
    title: '图文书架',
    subtitle: '封面卡片 × 分栏开篇',
    description:
      '把文章组织成可浏览的图文书架。阅读页开篇左右分栏，标题、摘要和封面相互呼应，正文仍保持原有宽度。',
    fit: '适合作品、项目和内容较丰富的文章',
    rhythm: '图片与文字并重',
    shape: '卡片 16:10 · 开篇 4:3',
  },
  {
    id: 'c',
    title: '山脊开篇',
    subtitle: '横向封面 × 渐变玻璃标题',
    description:
      '封面成为文章的视觉入口。以克制的渐变玻璃叠加标题，延续个人档案卡片的语言，正文区域保持清晰、安静。',
    fit: '适合随笔、旅行和专题长文',
    rhythm: '封面主导 / 正文收敛',
    shape: '列表 16:7 · 开篇 21:9',
  },
];
const sourceIds = [
  'c4-differential-amp',
  'bibo-stability',
  'ramble-happiness-at-fingertip',
  'electrical-wire',
];
const articles = sourceIds.map((id, index) => {
  const content = fs.readFileSync(`src/content/articles/zh/${id}/index.mdoc`, 'utf8');
  const data = YAML.parse(content.split('---')[1]);
  return {
    id,
    title: data.title,
    excerpt:
      data.excerpt ||
      [
        '从电路结构出发，整理关键概念、分析方法与学习过程中的思考。',
        '从输入与输出的关系出发，梳理系统稳定性的判定。',
        '',
        '数字电路学习笔记：互连、寄生效应与延迟分析。',
      ][index],
    date: new Date(data.publishedAt).toLocaleDateString('zh-CN').replaceAll('/', '.'),
    category: ['模拟电路', '信号与系统', '生活随笔', '数字电路'][index],
    tags: data.tags?.slice(0, 3) || [],
    image: ['assets/analog.svg', 'assets/signal.svg', 'assets/landscape.svg', ''][index],
    group: index === 2 ? 'life' : 'technical',
  };
});

const svg = (kind) => {
  const palette =
    kind === 'analog'
      ? ['#172d35', '#244653', '#406675', '#71949e']
      : kind === 'signal'
        ? ['#172f2b', '#285047', '#4b7567', '#8eaf94']
        : ['#262c38', '#465465', '#9d8984', '#d3b7a0'];
  const symbol =
    kind === 'analog'
      ? '<path d="M440 152h80m0-70 130 70-130 70ZM650 152h90M700 152V58H570v50M465 112v30m-15-15h30M450 188h30"/><path d="M330 252h105l20-30 30 60 30-60 30 60 20-30h165" opacity=".45"/>'
      : kind === 'signal'
        ? '<path d="M330 194h450M350 85v185" opacity=".45"/><path d="M350 194c25-130 50 130 75 0s50 130 75 0 50 130 75 0 50 130 75 0 50 130 75 0"/>'
        : '<circle cx="632" cy="115" r="32" fill="#ebcdb1" stroke="none" opacity=".7"/><path d="m400 270 90-140 95 135 65-92 94 97" stroke-opacity=".4"/>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450"><rect width="900" height="450" fill="${palette[0]}"/><g stroke="${palette[3]}" stroke-opacity=".22" stroke-width="1"><path fill="${palette[1]}" d="M0 450 180 132 330 380 520 205 680 450Z"/><path fill="${palette[2]}" fill-opacity=".5" d="m180 132 50 318 100-70Zm340 73 35 245 125 0Z"/><path fill="${palette[1]}" d="m600 450 170-178 130 110v68Z"/><path fill="${palette[2]}" fill-opacity=".45" d="m770 272 40 178h90Z"/><path fill="none" d="M0 450 230 450 330 380 555 450 770 272M180 132 230 450"/></g><g fill="none" stroke="${palette[3]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${symbol}</g><text x="58" y="77" fill="${palette[3]}" font-family="Consolas,monospace" font-size="12" letter-spacing="3">ICEAXING / FIELD NOTES</text><path d="M58 139h45" stroke="${palette[3]}"/><text x="58" y="397" fill="${palette[3]}" font-family="Consolas,monospace" font-size="10" letter-spacing="2">${kind.toUpperCase()} / COVER CONCEPT</text></svg>`;
};
for (const kind of ['analog', 'signal', 'landscape'])
  fs.writeFileSync(`${directory}/assets/${kind}.svg`, svg(kind));
fs.copyFileSync(
  'src/assets/content/covers/analog-ic/coverImage.jpg',
  `${directory}/assets/diagram.jpg`,
);

const image = (article, reader = false) =>
  article.image
    ? `<figure class="cover ${reader ? 'reader-cover' : ''}"><img src="${article.image}" data-cover-original="${article.image}" alt="${escape(article.title)}的样稿封面" ${reader ? 'fetchpriority="high"' : 'loading="lazy"'} width="900" height="450"><span class="cover-label">${reader ? 'COVER / 文章封面' : escape(article.category)}</span></figure>`
    : `<div class="cover cover-empty"><span class="empty-facet" aria-hidden="true">◇</span><span>无封面 · 保留文字条目</span></div>`;
const metadata = (article) =>
  `<div class="metadata"><span>${escape(article.date)}</span><span>${escape(article.category)}</span><span>iceaxing</span></div>`;
const titleBlock = (article, tag = 'h2') =>
  `<div class="entry-copy">${metadata(article)}<${tag}>${escape(article.title)}</${tag}><p class="excerpt">${escape(article.excerpt)}</p><div class="entry-bottom"><span>${article.tags.length ? article.tags.map((t) => '#' + escape(t)).join('　') : '#学习记录'}</span><span class="read-arrow" aria-hidden="true">↗</span></div></div>`;
const shell = (variant, mode, body) =>
  `<!doctype html><html lang="zh-CN" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${variant.title} · 文章封面样稿</title><link rel="stylesheet" href="styles.css"><script id="review-articles" type="application/json">${JSON.stringify(articles).replaceAll('<', '\\u003c')}</script><script src="preview.js" defer></script></head><body class="concept-${variant.id} ${mode}-page"><div class="review-bar"><a href="index.html" class="review-home">封面设计样稿 ↗</a><nav aria-label="方案选择">${variants.map((v) => `<a href="${v.id}-${mode}.html" ${variant.id === v.id ? 'aria-current="page"' : ''}>${v.id.toUpperCase()} ${v.title}</a>`).join('')}</nav><button type="button" data-theme-toggle>切换明暗</button></div><header class="site-header"><a class="wordmark" href="${variant.id}-list.html">iceaxing.</a><nav aria-label="样稿页面"><a href="${variant.id}-list.html" ${mode === 'list' ? 'aria-current="page"' : ''}>文章条目</a><a href="${variant.id}-article.html" ${mode === 'article' ? 'aria-current="page"' : ''}>阅读页面</a></nav><span class="site-note">雪线之上 / FIELD NOTES</span></header><div class="concept-note"><span>${variant.id.toUpperCase()} / ${variant.title}</span><p>${variant.subtitle}</p><button type="button" data-diagram-toggle aria-pressed="false">测试图表封面</button></div>${body}<footer class="site-footer"><span>© iceaxing · 本地设计样稿</span><a href="index.html">返回方案比较 ↑</a></footer></body></html>`;
for (const variant of variants) {
  const entries = articles
    .map(
      (article, index) =>
        `<article class="entry ${!article.image ? 'no-cover' : ''}" data-category="${article.group}"><a href="${variant.id}-article.html?article=${article.id}"><span class="entry-number">0${index + 1}</span>${image(article)}${titleBlock(article)}</a></article>`,
    )
    .join('');
  const listing = `<main class="listing"><div class="page-heading"><div><span class="eyebrow">ARCHIVE / ARTICLES</span><h1>文章</h1><p>让零散的理解，在记录中连成山脊。</p></div><span class="archive-count">${String(articles.length).padStart(2, '0')}<small>篇样例文章</small></span></div><div class="archive-layout"><aside class="archive-nav"><span class="eyebrow">阅读路径</span><button class="active" data-filter="all">全部文章 <span>04</span></button><button data-filter="technical">技术笔记 <span>03</span></button><button data-filter="life">生活随笔 <span>01</span></button><p>${variant.description}</p></aside><div class="entries">${entries}</div></div><p class="sample-note">封面为样稿示意，未写入文章内容。最后一项演示未上传封面的情况；点击任一条目可查看对应阅读页。</p></main>`;
  fs.writeFileSync(`${directory}/${variant.id}-list.html`, shell(variant, 'list', listing));

  const article = articles[0];
  const reader = `<main class="reader"><nav class="breadcrumbs" aria-label="当前位置"><a href="${variant.id}-list.html">文章</a><span>/</span><span data-article-category>${article.category}</span></nav><header class="reader-heading">${image(article, true)}<div class="reader-title"><span class="eyebrow" data-article-category>${article.category} / FIELD NOTES</span><h1 data-article-title>${article.title}</h1><p class="reader-deck" data-article-excerpt>${escape(article.excerpt)}</p><div class="metadata"><span>吴昊 / iceaxing</span><span data-article-date>${article.date}</span><span>约 8 分钟</span></div></div></header><div class="reading-layout"><article class="article-body"><p class="reading-intro">${escape(article.excerpt)}</p><p class="sample-inline-note">以下正文仅用于观察封面与阅读区域的衔接，不替代原文。</p><h2 id="overview">从问题开始</h2><p>学习一项新的知识时，我更愿意先找到它想解决的问题，再沿着问题理解结构与方法。记录的意义，是将这些曾经模糊的关系整理成可以重新走过的路径。</p><p>封面负责建立第一印象。进入正文之后，视觉应当安静下来，让概念、推导和图表成为阅读的中心。图片的存在，不应该增加寻找标题与正文的成本。</p><blockquote>从具体的问题出发，慢慢建立自己的理解。</blockquote><h2 id="structure">建立结构与直觉</h2><p>对于技术笔记，插图往往包含重要信息。正文中的电路图与公式应完整展示；文章封面则可以作为索引，帮助读者快速识别主题。</p><figure class="body-diagram"><img src="assets/diagram.jpg" alt="现有分类中的模拟电路性能权衡示意图" width="603" height="362" loading="lazy"><figcaption>复用项目现有图表，检查复杂图像的展示效果。</figcaption></figure><h2 id="notes">记录与回看</h2><p>好的笔记并非一次写完。它会随着实践不断修订，也会在回看时带来新的线索。</p><div class="reader-end"><span>✳ 阅读至此</span><a href="${variant.id}-list.html">返回文章条目 ←</a></div></article><aside class="toc"><span class="eyebrow">文章目录</span><a href="#overview">01 从问题开始</a><a href="#structure">02 建立结构与直觉</a><a href="#notes">03 记录与回看</a><div class="cover-guidance"><span>本版取舍</span><p>${variant.description}</p><small>${variant.shape}</small></div></aside></div></main>`;
  fs.writeFileSync(`${directory}/${variant.id}-article.html`, shell(variant, 'article', reader));
}

const index = `<!doctype html><html lang="zh-CN" data-theme="dark"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>文章封面 · 三版设计提案</title><link rel="stylesheet" href="styles.css"><script src="preview.js" defer></script><body class="comparison"><header class="site-header"><span class="wordmark">iceaxing.</span><span>DESIGN REVIEW / 文章封面</span><button data-theme-toggle>切换明暗</button></header><main><span class="eyebrow">COVER STUDIES / 01—03</span><h1>一张封面，三种阅读入口。</h1><p class="comparison-intro">保留原有字体、透明底色和低多边形语言，探索文章条目与阅读页的封面位置、信息层次和图片比例。每版均包含可互相跳转的列表页与阅读页。</p><div class="proposal-grid">${variants.map((v, i) => `<article class="proposal"><a href="${v.id}-list.html" class="proposal-preview"><img src="assets/${['analog', 'signal', 'landscape'][i]}.svg" alt="${v.title}封面方向" width="900" height="450"><span>${v.id.toUpperCase()}</span></a><div class="proposal-body"><span class="eyebrow">${v.rhythm}</span><h2>${v.title}</h2><p class="proposal-subtitle">${v.subtitle}</p><p>${v.description}</p><div class="proposal-fit">${v.fit}</div><div class="proposal-links"><a href="${v.id}-list.html">查看文章条目 ↗</a><a href="${v.id}-article.html">查看阅读页 ↗</a></div></div></article>`).join('')}</div><section class="recommendations"><h2>建议优先考虑 A，或组合 A 的列表与 B 的开篇。</h2><p>A 更适合目前以学习笔记为主的内容，封面不会压过文章标题。B 可以作为项目文章的展示方式；C 的图片表达更强，适合有高质量封面的随笔或专题。</p><div class="recommendation-grid"><div><h3>一张图，两个展示位置</h3><p>列表缩略图与阅读页共用封面，预留焦点位置设置；技术图表使用完整显示，照片按比例裁切。</p></div><div><h3>封面可选，不强制补齐</h3><p>A、B 无图时回归文字条目；C 无图时使用克制的低多边形占位。阅读页无图时直接保留标题开篇。</p></div><div><h3>保持阅读与加载稳定</h3><p>预留图片比例避免布局跳动，列表图片延迟加载，开篇图片优先加载。明暗模式分别处理文字与遮罩。</p></div></div></section><p class="sample-note">这是本地 HTML 样稿，不修改正式页面或 Keystatic 配置。样稿中的正文为排版演示；封面为矢量示意，技术图表取自项目现有资源。</p></main></body></html>`;
fs.writeFileSync(`${directory}/index.html`, index);
fs.writeFileSync(`${directory}/articles.json`, JSON.stringify(articles));
console.log(`Created comparison and six HTML samples in ${path.resolve(directory)}`);
