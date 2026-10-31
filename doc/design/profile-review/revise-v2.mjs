import fs from 'node:fs';
import YAML from 'yaml';
import './revise.mjs';

let html = fs.readFileSync('doc/design/profile-review/revised.html', 'utf8');
const profile = YAML.parse(
  fs.readFileSync('src/content/pages/zh/profile-zh/index.mdoc', 'utf8').split('---')[1],
).profile;
const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

html = html.replace('href="revision.css">', 'href="revision.css"><link rel="stylesheet" href="revision-v2.css">');
html = html.replaceAll('个人档案 · 修订样稿', '个人档案 · 第二轮修订样稿');
html = html.replace(/(<div class="bio">)<svg[\s\S]*?<\/svg>/, '$1');

// Each gallery page contains three certificates; an absent image remains an honest placeholder.
const pages = [];
for (let start = 0; start < profile.honors.length; start += 3) {
  const awards = profile.honors.slice(start, start + 3);
  pages.push(`<div class="gallery-page" ${start ? 'hidden' : ''}>${awards.map((award, offset) => `<article class="certificate-card"><div class="certificate"><span class="facet" aria-hidden="true">◇</span><span>证书图片待补充</span><small>320 × 220 px · 等比完整展示</small></div><div class="award"><span class="meta">${escape(award.period)} · ${escape(award.level)}</span><h3>${escape(award.title)}</h3><span class="certificate-index" aria-hidden="true">${String(start + offset + 1).padStart(2, '0')}</span></div></article>`).join('')}</div>`);
}
html = html.replace(/<div class="slides">[\s\S]*?<\/section>/, `<div class="slides">${pages.join('')}</div></div></section>`);
html = html.replace('aria-label="上一项"', 'aria-label="上一页证书"').replace('aria-label="下一项"', 'aria-label="下一页证书"');

// Research-specific, code-native illustrations make each postcard distinct without new colors.
const drawings = [
  '<path d="M18 45h30m-18-14v28m18-36 45 22-45 22Z M93 45h28m-15 0V18H60v11 M26 85h80"/><text x="17" y="20">+</text><text x="17" y="78">−</text>',
  '<path d="M12 48h18l7-19 12 40 12-40 12 40 8-21h30 M20 17h90v65H20Z M91 17v65"/>',
  '<path d="M26 17h77v74H26Z M40 32h49M40 45h38M40 58h49M40 71h27 M13 82h15m74-49h17v49h-17"/>',
  '<path d="M9 60h18l8-32 13 52 13-60 12 50 12-30 10 20h28 M13 93h108M16 15v78"/>',
  '<path d="M63 48 20 15m43 33L12 48m51 0L20 82m43-34 43-33M63 48h51M63 48l43 34"/><circle cx="63" cy="48" r="12"/><circle cx="63" cy="48" r="32"/>',
  '<rect x="33" y="20" width="63" height="63"/><path d="M46 8v12m18-12v12M82 8v12M46 83v12m18-12v12m18-12v12M21 34h12M21 52h12M21 70h12m63-36h12M96 52h12M96 70h12 M48 36h33v30H48Z"/>',
];
let postcardIndex = 0;
html = html.replace(/<article class="project"><span class="serial">([^<]+)<\/span>/g, (_, serial) => {
  const index = postcardIndex++;
  return `<article class="project postcard"><div class="postcard-aside" aria-hidden="true"><span class="serial">${serial}</span><svg class="postcard-sketch" viewBox="0 0 130 105" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${drawings[index % drawings.length]}</svg><span class="postcard-address">ICEAXING<br>RESEARCH ARCHIVE</span><span class="postcard-rule"></span><span class="postcard-rule short"></span></div><div class="postcard-stamp" aria-hidden="true"><svg viewBox="0 0 50 45" fill="none" stroke="currentColor" stroke-width=".9"><path d="M4 35 18 9 30 29 38 17 47 35Z M18 9 21 35 30 29M4 35h43"/></svg><span>FIELD NOTES</span></div><span class="postmark" aria-hidden="true">ARCHIVE · ${String(index + 1).padStart(2, '0')}</span>`;
});
// Resolve the existing internal projects from their actual YAML records.
for (const item of profile.completedProjects.filter(item => item.discriminant === 'internal')) {
  const project = YAML.parse(fs.readFileSync(`src/content/projects/${item.value.project}.yaml`, 'utf8'));
  html = html.replace(`<h3>${escape(item.value.project)} ↗</h3><p>查看相关项目与科研经历</p>`, `<h3>${escape(project.labels.zh.title)} ↗</h3><p>${escape(project.labels.zh.description)}</p>`);
}

html = html.replace(/<script>const slides=[\s\S]*?<\/script>/, `<script>
const pages = [...document.querySelectorAll('.gallery-page')];
let currentPage = 0;
function showPage(index) {
  currentPage = (index + pages.length) % pages.length;
  pages.forEach((page, i) => page.hidden = i !== currentPage);
  document.querySelector('.counter').textContent = (currentPage + 1) + ' / ' + pages.length;
}
document.querySelector('.previous').onclick = () => showPage(currentPage - 1);
document.querySelector('.next').onclick = () => showPage(currentPage + 1);
document.querySelector('.gallery').onkeydown = event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPage(currentPage + (event.key === 'ArrowRight' ? 1 : -1));
  }
};
showPage(0);
</script>`);
fs.writeFileSync('doc/design/profile-review/revised-v2.html', html);
fs.writeFileSync('doc/design/profile-review/index.html', html);
console.log('Generated revised-v2.html: ruled biography, three-column certificate gallery, illustrated postcards.');
