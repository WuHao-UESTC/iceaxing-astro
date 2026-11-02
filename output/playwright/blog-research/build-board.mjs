import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const sources=[
 ['maggie','Maggie Appleton','https://maggieappleton.com/','个人博客／数字花园','插画文章卡、纯文字笔记和书架并存。重点参考内容类型的差异，而不是复制同一个卡片容器。'],
 ['maggie-garden','The Garden','https://maggieappleton.com/garden','内容索引内页','主题、内容类型与成长阶段构成索引。参考如何容纳大量内容，以及摘要和元信息的层级。'],
 ['henry','Henry From Online','https://henry.codes/','个人博客／作品集','刊物式大字、黑白分区、点阵插图、三列文章卡与大字项目横行。风格进入整个页面骨架。'],
 ['lowtech','Low-tech Magazine','https://solar.lowtechmagazine.com/','杂志型内容站','双色网点图统一照片；首篇跨栏，后续四列。参考图像处理和版面节奏。'],
 ['ncase','Nicky Case','https://ncase.me/','个人创作站／博客入口','手绘角色、粗轮廓、明亮点色和双列长横幅作品卡。内容按可玩、可读、可看分组。'],
 ['ncase-article','Parable of the Hill Climber','https://blog.ncase.me/parable-of-the-hill-climber/','漫画文章内页','连续手绘分镜把攀登与抽象算法结合。参考图像与知识叙事的关系，不复制角色。'],
 ['craftz','Takuya Matsuyama','https://www.craftz.dog/','个人主页','体素小场景建立记忆点；下方保持清晰的平面文字与普通链接。'],
 ['craftz-works','Takuya · Works','https://www.craftz.dog/works','作品索引内页','体素场景与双列项目缩略图并存；按作品、合作和旧作分组。'],
 ['lynn','Lynn Fisher','https://lynnandtonic.com/','个人网站','当前主页呈现旧书扉页、装饰字、点线目录、罗马数字。主题不依赖大幅现代横幅。'],
 ['josh','Josh W. Comeau','https://www.joshwcomeau.com/','技术博客','云状边界与彩色图形负责气质；阅读区用文字层级、留白和侧栏保持秩序。'],
];
const directions=[
 ['A','等距体素世界','规则方块与微缩模型','场景节点＋平面信息板','营地／工作台／图书室／生活小屋／驿站'],
 ['B','自然博物图鉴','细线标注与水彩标本','大标本牌＋窄目录','扉页／器件剖面／教材目录／观察卡／采集标签'],
 ['C','漫画分镜旅程','粗轮廓与平涂角色','不等大分镜＋气泡短记','开篇／实验室／教材章节／照片格／站牌对话'],
 ['D','双色网点刊物','半色调照片与套印','跨栏头条＋多栏短卡','封面／工程专题／笔记索引／图像报道／短讯'],
 ['E','古典雕版书册','排线雕版与书籍边饰','对开页＋图版卡＋页边注','藏书票／器械图版／分册／游记／信笺'],
];
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Iceaxing · 博客美术风格调研</title><style>
*{box-sizing:border-box}body{margin:0;background:#f2f3ef;color:#22342f;font:15px/1.8 system-ui,'Microsoft YaHei',sans-serif}main{max-width:1380px;margin:auto;padding:55px 40px}h1{font-size:clamp(28px,4vw,50px);line-height:1.3;margin:20px 0}h2{font-size:25px;font-weight:500;margin:55px 0 20px}h3{font-size:19px;margin:15px 0 5px}p{color:#607068}a{color:inherit;text-underline-offset:4px}.eyebrow{font:11px/1.6 monospace;letter-spacing:.12em;color:#6d7b71}.lead{max-width:850px}.notice{border-left:3px solid #8e6945;background:#e9e9df;padding:15px 22px;margin:25px 0;font-size:13px}.chapters{display:flex;flex-wrap:wrap;gap:10px;margin:25px 0}.chapters span{border:1px solid #bccac0;padding:8px 18px;background:#fafbf7;font-size:13px}.sources{display:grid;grid-template-columns:1fr 1fr;gap:28px}.source{background:#fcfcf9;border:1px solid #d4ddd3;min-width:0}.preview{height:360px;overflow:hidden;display:block;background:#e6e9e3;border-bottom:1px solid #d4ddd3}.preview img{display:block;width:100%;height:auto}.copy{padding:25px}.copy p{font-size:13px;min-height:48px}.links{display:flex;gap:22px;font-size:12px;margin-top:20px}table{border-collapse:collapse;width:100%;font-size:13px;background:#fafbf7}td,th{text-align:left;padding:18px 15px;border:1px solid #d4ddd3}th{background:#e3e9df;font-weight:500}td:first-child{font-weight:600}.table-wrap{overflow:auto}.limits{padding:25px;background:#e9ece5;margin-top:35px;font-size:13px}.limits a{margin-right:15px}footer{margin-top:55px;border-top:1px solid #ccd5cb;padding:25px 0;font-size:12px;color:#788276}@media(max-width:700px){main{padding:30px 20px}.sources{grid-template-columns:1fr}.preview{height:300px}.copy{padding:20px}.copy p{min-height:0}td,th{min-width:125px;padding:12px}.links{gap:16px}.notice{font-size:12px}}
</style></head><body><main><span class="eyebrow">ICEAXING / VISUAL RESEARCH / 2026.11.02</span><h1>先找到不同的美术语言，<br>再重新设计同一段旅程。</h1><p class="lead">本页是参考截图索引，不是新样稿。已访问七个主要参考站和三个补充内页，并保存桌面与手机截图。点击截图查看完整原图，点击来源访问原站。</p><div class="notice">保留原有封面与四个内容章节。本轮未修改正式页面；下方五种方向属于调研后的设计推导，不代表原站提供的模板。</div><div class="chapters">${['封面','技术栈','学习笔记','生活日常','沿途随记'].map(x=>`<span>${x}</span>`).join('')}</div><p><a href="REPORT.md">阅读完整调研报告 →</a></p><h2>真实参考与截图</h2><div class="sources">${sources.map(([id,name,url,type,note])=>`<article class="source"><a href="${id}-desktop.png" class="preview" aria-label="查看 ${name} 完整桌面截图"><img src="${id}-desktop.png" alt="${name} 实际网站桌面截图" loading="lazy"></a><div class="copy"><span class="eyebrow">${type}</span><h3>${name}</h3><p>${note}</p><div class="links"><a href="${url}" target="_blank" rel="noopener">原始网站 ↗</a><a href="${id}-desktop.png">桌面原图</a><a href="${id}-mobile.png">手机原图</a></div></div></article>`).join('')}</div><h2>建议的五条美术方向</h2><div class="table-wrap"><table><thead><tr><th>方向</th><th>美术语言</th><th>卡片布局</th><th>五章节落点</th></tr></thead><tbody>${directions.map(([id,title,art,cards,chapters])=>`<tr><td>${id} · ${title}</td><td>${art}</td><td>${cards}</td><td>${chapters}</td></tr>`).join('')}</tbody></table></div><section class="limits"><strong>核验边界</strong><p>部分全页截图含懒加载图片空位；静态截图不能代表完整动画体验。Poolsuite 只取得启动窗口，WINDOWS93 仅显示黑色启动阶段，两者均不作为完整页面证据。Dustin Brett、Cassie Codes 本次连接中断，未纳入结论。</p><a href="poolsuite-desktop.png">Poolsuite 启动画面</a><a href="windows93-desktop.png">WINDOWS93 启动阶段</a><p>后续样稿验收：五版去掉文字后仍能分辨；每版都有完整五章节；不能共用同一种山形、卡片外观与主布局。</p></section><footer>仅用于设计研究与来源对照。参考网站图像版权属于各自作者；不直接移用到正式站点。</footer></main></body></html>`;
fs.writeFileSync(path.join(root,'index.html'),html);
for(const [id] of sources)for(const mode of ['desktop','mobile'])if(!fs.existsSync(path.join(root,`${id}-${mode}.png`)))throw Error(`Missing screenshot ${id}-${mode}`);
console.log('Research board generated; 20 reference screenshots verified.');
