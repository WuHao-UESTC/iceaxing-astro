const fs = require('node:fs');
const file = 'doc/design/profile-layout-review.html';
let html = fs.readFileSync(file, 'utf8');
function replaceOnce(before, after) {
  if (!html.includes(before)) throw new Error('Missing source: ' + before.slice(0, 100));
  html = html.replace(before, after);
}

// Keep the biography within the identity header, without a visible heading.
const bio = html.match(/            <section class="section bio"[\s\S]*?<\/section>/);
if (!bio) throw new Error('Biography section not found');
replaceOnce(bio[0], '');
replaceOnce('        </header>\n        <details class="mobile-contents">', `          <div class="ruled-intro" aria-label="个人简介">
            <p>我关注技术如何成为可靠、清晰并且值得长期维护的作品。</p>
            <p>这里记录我的学习、实践与探索。希望在理解原理的同时，把想法做成可以使用的东西，并通过写作留下能够复用的经验。</p>
          </div>
        </header>
        <details class="mobile-contents">`);

replaceOnce('<h3>公司 / 机构名称<span class="sample">示例</span></h3>\n                    <p class="degree-line">岗位名称 · 实习 / 全职</p>', '<h3>公司 / 机构名称<span class="inline-meta"> | 岗位名称 · 实习 / 全职</span><span class="sample">示例</span></h3>');
replaceOnce('<h3>竞赛 / 学术奖项名称<span class="sample">示例</span></h3>\n                    <p class="secondary">获奖等级 · 颁发单位</p>', '<h3>竞赛 / 学术奖项名称<span class="inline-meta"> | 获奖等级</span><span class="sample">示例</span></h3>');
replaceOnce('<h3>奖学金 / 荣誉称号<span class="sample">示例</span></h3>\n                    <p class="secondary">颁发单位 · 可选补充说明</p>', '<h3>奖学金 / 荣誉称号<span class="sample">示例 · 等级未填</span></h3>\n                    <p class="secondary">可选补充说明；未填写等级时，不显示分隔符。</p>');

const awards = html.match(/            <section class="section" id="awards"[\s\S]*?<\/section>/);
if (!awards) throw new Error('Awards section not found');
replaceOnce(awards[0], '');
replaceOnce('<div class="sections">', '<div class="sections">\n' + awards[0]);
html = html.replaceAll('奖项与荣誉', '所获荣誉');
// The first section changed; regenerate both outlines from the same sequence.
const outline = [['awards', '所获荣誉'], ['education', '教育背景'], ['research', '重要项目与科研经历'], ['work', '工作经历'], ['completed', '完结项目']];
replaceOnce('本页目录 · 六个板块', '本页目录 · 五个板块');
html = html.replace(/(<nav aria-label="手机端本页目录">)[\s\S]*?(<\/nav>)/, '$1\n' + outline.map(([id, title], index) => `<a href="#${id}">${String(index + 1).padStart(2, '0')} ${title}</a>`).join('\n') + '\n$2');
html = html.replace(/(<ol class="toc">)[\s\S]*?(<\/ol>)/, '$1\n' + outline.map(([id, title], index) => `<li><a href="#${id}"${index === 0 ? ' aria-current="location"' : ''}><span>${String(index + 1).padStart(2, '0')}</span>${title}</a></li>`).join('\n') + '\n$2');
outline.forEach(([id], index) => {
  const pattern = new RegExp('(<section class="section" id="' + id + '"[\\s\\S]*?<span class="section-number">)\\d+(</span>)');
  html = html.replace(pattern, (_, start, end) => start + String(index + 1).padStart(2, '0') + end);
});

const externalProject = `
                <li>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <span class="archive-index">03</span>
                    <div>
                      <h3>站外项目名称<span class="sample">外链示例</span></h3>
                      <p>这里填写项目简介。整行点击后打开指定的外部链接；本示例链接到 GitHub 首页。</p>
                      <span class="archive-meta">站外项目 · 新标签页打开</span>
                    </div>
                    <span class="archive-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>`;
const archive = html.match(/<ul class="archive">[\s\S]*?<\/ul>/);
if (!archive) throw new Error('Archive not found');
replaceOnce(archive[0], archive[0].replace('</ul>', externalProject + '\n              </ul>'));
replaceOnce('个人信息与两个已完结项目取自现有内容。标记“示例”的部分仅用于展示排版。', '个人信息、简介首句与两个站内项目取自现有内容。简介补充文案、任职、荣誉与站外项目为排版示例。');

const start = html.indexOf('      const groups = [');
const end = html.indexOf('      const groupContainer', start);
if (start < 0 || end < 0) throw new Error('Field schema not found');
const groups = [
  ['顶部信息', '左侧身份联系 / 右侧横线简介', [
    ['姓名 / 头像', '文本 / 图片'], ['身份 / 一句话定位', '文本 · 可选'], ['所在地', '文本 · 可选'],
    ['公开邮箱 / QQ', '文本 · 可选'], ['其他联系方式', '可排序列表：名称 + 链接'], ['当前方向', '可排序短文本列表'],
    ['个人简介', '多行纯文本 · 右侧横线本排版'],
  ]],
  ['01 所获荣誉', '可增删、可排序', [
    ['荣誉名称 / 获奖时间', '必填文本 / 年月'], ['获奖等级', '选填 · 名称后以空格 | 空格连接'],
    ['补充说明 / 证书链接', '选填文本 / URL'],
  ]],
  ['02 教育背景', '可增删、可排序', [
    ['学历阶段', '本科 / 硕士 / 博士'], ['院校名称', '必填文本'], ['院系', '选填文本'], ['专业', '必填文本'],
    ['开始 / 结束时间', '年月 / 在读'], ['补充说明', '选填多行纯文本'],
  ]],
  ['03 重要项目与科研经历', '可增删、可排序', [
    ['名称 / 经历类型', '必填文本 / 项目或科研'], ['个人角色 / 团队机构', '文本 / 机构可选'], ['时间范围', '年月 / 进行中'],
    ['概述', '多行文本'], ['个人贡献 / 成果', '可增删的文本列表'], ['相关链接 / 关联站内项目', '选填链接列表 / 项目关联'],
  ]],
  ['04 工作经历', '可增删、可排序', [
    ['公司 / 机构', '必填文本'], ['岗位名称', '必填 · 公司后以空格 | 空格连接'], ['任职类型 / 地点', '选填：全职、实习等 / 文本'],
    ['时间范围', '年月 / 在职'], ['职责与成果', '可增删的文本列表'],
  ]],
  ['05 完结项目', '支持站内与站外项目 · 可排序', [
    ['项目来源', '选择：站内项目 / 自填项目'], ['站内：关联项目', '从已有项目集合中选择，使用其标题、简介与地址'],
    ['自填：项目名称', '必填文本'], ['自填：项目简介', '必填多行文本'], ['自填：项目链接', '必填 URL'],
    ['跳转方式', '整行可点击 · 站外项目新标签页打开'],
  ]],
];
html = html.slice(0, start) + '      const groups = ' + JSON.stringify(groups, null, 2) + ';\n' + html.slice(end);
replaceOnce('完结项目关联现有项目集合，并检查完成状态与公开状态。', '完结项目支持选择站内项目或自填名称、简介与链接；站内关联检查完成与公开状态，每项均可点击跳转。');
html = html.replaceAll('/ V1', '/ V2').replaceAll('· V1', '· V2');
fs.writeFileSync(file, html, 'utf8');
console.log('Updated profile HTML review to V2.');
