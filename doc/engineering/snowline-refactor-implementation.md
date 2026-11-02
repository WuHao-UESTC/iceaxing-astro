# 雪线 V8 重构实施与恢复记录

日期：2026-11-02。范围：欢迎页、五章博客首页、全站主题基础与现有内容页的视觉衔接。已在本地实施，未发布线上。

## 备份

开始修改前，将工作区复制到：

`E:\repo_iceaxing-astro\backups\snowline-pre-refactor-20261102-162824`

- `workspace/`：973 个文件，共 84,926,010 字节，包含源码、内容、媒体、设计资料、未跟踪文件及原有配置。
- `HEAD.txt`、`git-status.txt`、`working-tree.patch`、`staged.patch`：记录本轮开始时的 Git 基线，包括用户未提交的工作。
- `manifest.json`：备份每个文件的字节数与 SHA-256。
- 排除可再生成目录：`.git`、`node_modules`、`dist`、`.astro`、`.vercel`、`.tmp`、`output`、`.playwright-cli`。Git 历史仍保留在原仓库，备份不是另一个完整 Git 仓库。

这是本地完整工作文件快照，不只是对 HEAD 的补丁；能恢复当时尚未提交或未跟踪的文件。不要对该备份直接执行开发、格式化或生成任务。

恢复建议：先另存当前工作，再对照 `output/snowline-refactor/changed-from-backup.json`，从备份的 `workspace/` 恢复相应文件。新增的三个代码文件为 `src/components/home/ExpeditionMountain.astro`、`src/styles/expedition.css`、`src/styles/welcome.css`；恢复旧版时先移出并留存它们。按需恢复本轮变更即可，不使用 `git reset --hard` 或 `git clean`，以免丢失用户原有未提交内容。备份不会自动覆盖恢复之后产生的新工作。

## 实现

- 欢迎页：重新组织左文右图与手机单列，保留作者、简历 / 博客双入口、中英德、主题持久化和旧锚点兼容；新增真实中文资料头像作为其它语言的头像回退，消除旧的无效 `.jpg` 地址。
- 首页：保留封面及技术栈、学习笔记、生活日常、沿途随记；移除强制滚轮 / 触摸翻章，使用自然页面滚动、吸顶章节目录、真实锚点与浏览器历史。
- 图形：共享原创 SVG 连续山脊、网点岩壁、雪线与行进路径；白天为暖纸蓝红双色，夜间为暗绿黑琥珀测绘终端。生产页面不再调用旧折面山体。
- 内容：精选支持多篇时手动翻阅，单篇直接展示；推荐目的地预览与正式链接保留；技术分类、项目状态与进度保留，并显示百分比；教材星图、选中聚焦、文章与返回全景保留，文字选择器在全景下也可用；生活分类分组、近期内容、随记与站内目的地保留。
- 全站衔接：重设全局主题变量；阅读、归档和个人页统一强调色；归档背景、工具页背景、推荐预览缺省图改成连续等高线。既有真实照片、内容封面和工具的必要结果色保留。
- 动画：首屏短淡入、8px 位移、路线描线、插画局部一次扫描；交互反馈短促，无强制离场延时；减少动态效果时直接显示状态。
- 结构：将欢迎页约千行旧地形和内联样式拆为共享图形及独立样式；首页不再引入旧章节转场和地形依赖。历史组件与样稿仍留存供 fixtures / 历史参考使用，不删除用户内容。

## 验证

- `npm run check`：0 errors、0 warnings；13 条提示主要来自既有样稿 / 工具文件。
- `npm run build`：通过；Pagefind 构建 3 种语言、85 个页面、10 个过滤器。
- 最终 CSS 调整后另跑 `npm run build:only`，结果见 `output/snowline-refactor/build-final-assets.log`。
- 本轮修改的 Astro / TypeScript 文件定向 ESLint 通过；只格式化本轮涉及文件，没有全仓格式化。
- 单测以 `--maxWorkers=2 --testTimeout=20000` 重跑：224 / 225 通过。唯一失败为现有 `razavi-analogic-review/index.mdoc` 的公式 `V_{T H} ， V_{n 1}` 含中文逗号，触发 KaTeX 严格模式。该正文与备份的 SHA-256 一致，未修改作者文章。
- Playwright 浏览器检查覆盖双主题 1440 / 390 / 320px、章节导航、教材选择与返回、搜索打开 / 关闭、旧锚点与参数、三语言及主要内容 / 工具路由、低动态模式。过程中修复 320px 浅色页头溢出与手机教材详情空白；最终结果见下方记录。
- 生产构建的番茄钟与史密斯圆图均完成 React 客户端加载，无页面运行时异常。开发模式曾出现 `_jsxDEV` 错误，当时同时存在两个开发服务；生产构建复核未复现，未通过修改工具业务代码掩盖该问题。
- 评论、订阅等外部服务流程未发送真实提交；本地评论接口出现 503，需按现有服务配置在目标环境复核。后台编辑、媒体与同步业务代码未重构。

## 文件与查看方式

- 当前方案：[首页](../visual/homepage/homepage-snowline-redesign.md)、[欢迎页](../visual/welcome/welcome-snowline-redesign.md)。
- 功能基线：[工作留痕与功能表](../discussion_record/snowline-redesign-change-log.md)。
- 浏览器截图：`output/playwright/snowline-*.png`，包含两种模式的桌面、390 / 320px 欢迎页与首页，以及四个章节和教材选择状态。
- 浏览器记录：`output/snowline-refactor/production-review-results.txt`、`production-tools-results.txt`。
- 构建与静态检查：`output/snowline-refactor/build-final.log`、`build-final-assets.log`、`lint-final.log`。
- 备份对照：`output/snowline-refactor/changed-from-backup.json`。

本地构建预览使用 `http://127.0.0.1:4323/` 与 `/blog`，该预览只提供构建后的公开页面与静态资源，不提供后端 API。生产部署仍使用项目既有 Astro / Vercel 流程；本轮没有部署。

最终浏览器记录：生产预览的 38 项检查全部通过，页面运行时异常为 0；双主题 1440 / 390 / 320px 全部无横向溢出。结构化结果保存在 `output/snowline-refactor/verification-summary.json`。最终构建及搜索索引生成成功。

补充交互复核：另外 14 项检查全部通过，包括生活分组前后切换、切换主题保留教材选择、星图内 Escape 返回全景、手机菜单开关、生产搜索真实结果、番茄钟开始 / 暂停 / 重置，以及中英德入口在 320px 下的布局。合计 52 项浏览器检查通过，结果见 `output/snowline-refactor/interaction-results.txt`。Escape 返回星图的验证在教材索引焦点内进行，保持原有局部快捷键作用域。
