# iceaxing.com — Astro rebuild

iceaxing.com 的静态优先 Astro 重构项目。

## 当前状态

阶段 1–5 已完成：除既有的 Astro/Keystatic 内容系统和雪线视觉页面外，三语言 Pagefind 搜索、番茄钟、史密斯圆图、交互式 Markmap、原生页面过渡、double opt-in 订阅及幂等发布通知流水线均已接通。剩余阶段是旧 Sanity 内容迁移与生产切换。

## 环境要求

- Node.js 22.22.0 或更高版本（CI 使用 Node.js 24.18.0）
- npm 9.6.5 或更高版本

## 常用命令

```bash
npm install
npm run dev
npm run content:validate
npm run search:index
npm run check
npm run ci
npm run build
npm run preview
```

开发服务器默认运行在 `http://localhost:4321`。树形内容工作区位于 `http://localhost:4321/keystatic/workspace`，原生 Keystatic 总览仍位于 `http://localhost:4321/keystatic`。

树形工作区按 `category → project → collection` 展示逻辑文件夹，文章按 `translationKey` 合并为一个节点。分类和项目允许直属文章；项目与合集可以通过修改父级关系移动。文件夹的级联删除会在确认后由服务端重新计算所有后代，本地模式删除精确仓库路径，GitHub 模式在当前分支生成单个删除提交。

内容组件回归页位于 `http://localhost:4321/fixtures/markdoc`。该页面带 `noindex` 且从 sitemap 排除，只用于检查图片、代码、提示块、分栏、折叠、公式、表格、锚点、PDF 和 Mindmap。

## 内容结构

```text
src/content/
├── articles/{zh,en,de}/<stable-id>/index.mdoc
├── logs/{zh,en,de}/<stable-id>/index.mdoc
├── pages/{zh,en,de}/<stable-id>/index.mdoc
├── categories/*.yaml
├── projects/*.yaml
├── collections/*.yaml
├── friends/*.yaml
├── mottos/*.yaml
└── settings/site.yaml
```

目录或文件键是不可变的稳定 ID；公开 URL 使用单独的 `slug`。Keystatic relationship 只保存稳定键。`npm run content:validate` 会检查跨文件引用、层级归属、翻译键、语言目录、稳定 ID 和公开路由冲突，并生成 `src/generated/route-manifest.json`。

## Keystatic 存储模式

默认使用 local mode，适合本地直接编辑仓库文件。部署 GitHub mode 时设置：

```dotenv
PUBLIC_KEYSTATIC_STORAGE_KIND=github
PUBLIC_KEYSTATIC_GITHUB_OWNER=your-owner
PUBLIC_KEYSTATIC_GITHUB_REPO=your-repository
```

GitHub OAuth/App 凭据属于部署阶段的私密环境变量，不得使用 `PUBLIC_` 前缀。

Keystatic 编辑器增强由 `scripts/patch-keystatic-editor.mjs` 在 `postinstall` 阶段应用，包括表格尺寸选择和 `$…$` / `$$…$$` 公式输入规则。由于 Keystatic 暂无对应的公开扩展接口，`@keystatic/core` 固定为 `0.6.9`；升级前需要同步检查并更新补丁脚本。

## 搜索和工具

- `npm run build` 会在 Astro 构建后运行 Pagefind，对最终 HTML 建立三语言索引。
- `/tools/pomodoro` 使用 `client:load`，进度仅保存在访问者的 `localStorage`。
- `/tools/smith-chart` 和文章 Mindmap 使用 `client:visible`，不会进入首页或普通文章的 JavaScript 路径。
- 搜索使用构建产物 `/pagefind/`；开发模式尚未执行完整构建时会显示“索引不可用”。

## 订阅和发布通知

复制 `.env.example` 并配置 Upstash Redis、Resend、邮件模式和两个服务端 secret。关键约束：

- `EMAIL_DELIVERY_MODE=disabled`：默认值，不发送任何邮件。
- `EMAIL_DELIVERY_MODE=allowlist`：只允许 `EMAIL_TEST_ALLOWLIST` 中的测试地址。
- `EMAIL_DELIVERY_MODE=production`：允许向已确认订阅者发送邮件，只应在生产环境设置。
- `SUBSCRIPTION_TOKEN_SECRET_PREVIOUS` 只在轮换期保留，用于验证旧退订链接。
- 首次调用发布通知端点只建立 manifest 基线，不会补发全部历史内容。

GitHub 仓库需要设置 `PRODUCTION_SITE_URL` 和 `PUBLICATION_NOTIFY_SECRET` 两个 Actions Secrets，生产环境则需要同值的 `PUBLICATION_NOTIFY_SECRET`。成功部署后，`notify-publications.yml` 会分批调用受保护端点直至队列排空。

## 架构边界

- 公共内容默认构建为静态 HTML。
- 原始 HTML 在 Markdoc 中禁用。
- 中文 URL 不加语言前缀；英文和德文分别使用 `/en`、`/de`。
- 普通内容页默认不加载 React runtime；只有实际包含 Mindmap 的页面才在组件接近视口时加载对应 island，Giscus 也延迟到评论区接近视口时加载。
- 首页输出完整静态 DOM，浏览器增强由小型原生控制器负责，不加载首页 React runtime。
- 语言切换优先跳转到同一 `translationKey` 的译文；缺少译文时退回目标语言首页。
- 订阅、确认、退订、限流和发布幂等状态只写入持久 Redis，不使用实例内存回退。

完整实施方案见 [ASTRO_REBUILD_PLAN.md](./ASTRO_REBUILD_PLAN.md)。
