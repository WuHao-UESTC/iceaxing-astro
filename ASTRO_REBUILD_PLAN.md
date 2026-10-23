# iceaxing.com Astro 重构实施方案

> 状态：实施中（阶段 1–5 已完成）  
> 版本：v1.0  
> 更新日期：2026-10-19  
> 目标目录：`E:\repo_MyBlog\iceaxing_astro`  
> 核心方案：Astro + Keystatic + Markdoc + Git 内容工作流

## 0. 文档用途

本文档是新站从零重构的设计基线，同时也是后续讨论的唯一方案文档。每轮讨论确认的结论应写入“决策记录”，相应章节同步修改，避免聊天结论与实现方案分叉。

本版本已将原方案中的 Sanity Studio、Portable Text、Sanity Preview、Sanity Webhook 和 Sanity 数据查询全部替换为 Keystatic、Markdoc、Git 分支预览与 GitHub Actions 发布流程。

### 已确认的方向

- 新项目从零构建，不要求沿用当前 Next.js/Sanity 的代码组织。
- 使用 Astro，尽可能发挥静态输出、内容集合、按需水合和较少客户端 JavaScript 的优势。
- 使用 Keystatic 管理结构化内容，正文使用 Markdoc，内容文件与网站代码一同进入 Git。
- 保留当前网站的全部用户功能、三语言内容和既有 URL 语义。
- 首页保留现有 Next.js 版本的“雪线旅程”视觉语言和章节叙事，但用 Astro 静态组件与轻量增强重新实现。
- 所有文章使用同一套阅读版式；不再支持按文章选择独立视觉主题。
- 订阅采用真正的 double opt-in；确认前不进入可群发名单。
- 按项目决策跳过阶段 0，直接从阶段 1 开始实施。
- 新项目独立放在 `E:\repo_MyBlog\iceaxing_astro`，旧项目在切换完成前保持可回滚。

### 尚待讨论的关键决策

1. 内容发布采用“内容分支 + Pull Request + 预览部署”，还是允许单人编辑时直接提交 `main`。
2. 图片和 PDF 是否先全部进入 Git；何时启用对象存储或 Git LFS。
3. 中文无前缀、英文 `/en`、德文 `/de` 的现有 URL 策略是否原样保留。
4. 首页除视觉效果外，是否还要完整保留滚动位置恢复、自定义缓动旅行和客户端随机换一批等行为。
5. 列表页和工具页是延续现有视觉语言，还是单独简化。

---

## 1. 结论与可行性

迁移可行，且当前项目非常适合 Astro。文章、分类、项目、合集、日志、关于、友链、个人资料、RSS、站点地图等主体内容天然适合构建期生成；搜索可以使用静态索引；真正需要运行时服务端能力的只有订阅、退订和发布后的邮件通知。

建议采用“静态优先的混合架构”：

- 公共页面全部预渲染成 HTML。
- Keystatic 管理端和订阅接口使用 Astro 服务端路由。
- 搜索使用 Pagefind 构建后索引，不保留数据库搜索 API。
- 只有番茄钟、史密斯圆图、思维导图等复杂交互使用 React island。
- 导航、主题切换、搜索对话框、目录、列表筛选等轻交互优先使用原生脚本或 Astro 自定义元素。
- 内容在 Git 中保存，生产站构建时不依赖外部 CMS 查询。

这套架构能够带来：

- 内容页面默认零水合或极少水合，首屏和长文阅读体验更稳定。
- 内容、Schema、迁移记录和站点代码一起版本化，可审查、可回滚。
- Obsidian、文本编辑器和 Keystatic 可以编辑同一份 Markdown/Markdoc 内容。
- 预览部署天然对应 Git 分支，不再需要 CMS 草稿查询和可视化编辑覆盖层。
- 减少生产时对 Sanity API、缓存失效和 webhook 正确性的依赖。

需要接受的取舍是：Keystatic 不是一个云端内容数据库，也不提供与 Sanity 完全相同的实时协作、细粒度角色系统和视觉编辑。其最佳使用方式是把 GitHub 作为内容协作、审核和发布系统。

---

## 2. 现有功能基线

除决策记录中明确替换的体验外，以下能力必须在新站中保留；迁移验收以用户可见行为为准，而不是以旧代码逐行对应为准。

### 2.1 内容与信息架构

- 中文、英文、德文三语言。
- 首页：站点介绍、格言、特色文章、入口卡片、技能分类、进行中/已完成项目、随笔和生活内容。
- 分类、项目、合集、文章四级内容关系。
- 独立文章可直接属于分类；合集文章必须属于项目。
- 日志列表和日志详情。
- 关于、个人资料、友链。
- 文章封面、标签、作者、摘要、发布日期、更新日期。
- 项目状态和进度。
- 统一的文章阅读主题，以及全站明暗配色切换。

### 2.2 正文能力

- 标题、段落、列表、引用、链接、行内格式。
- 行内公式和块级公式。
- 语法高亮代码块。
- 图片、图注、替代文本和锚点。
- Callout、分栏、折叠块、分隔线、表格、自定义锚点。
- PDF 嵌入。
- Markmap 思维导图。
- 自动文章目录与可调整目录栏。
- Giscus 评论。

### 2.3 工具与交互

- 搜索与分类过滤。
- 响应式导航、语言切换、主题切换、页面过渡。
- 番茄钟。
- 史密斯圆图工具。
- 工具总览。
- 首页保留雪线章节浏览、海拔路线、山脊场景和内容旅程；具体交互用渐进增强重新实现。

### 2.4 平台功能

- RSS、`sitemap.xml`、`robots.txt`、canonical、Open Graph、结构化数据。
- 按分类、项目、合集选择订阅范围。
- 订阅确认邮件、退订和 `List-Unsubscribe`。
- 新文章、新分类、新项目、新合集发布通知。
- Obsidian 内容导入或直接编辑能力。
- 草稿预览、发布审核和生产发布。

### 2.5 现有架构减重审计

从 Astro 的视角，现有项目最需要减掉的不是文章功能，而是围绕这些功能形成的运行时和适配层。当前代码审计得到：23 个客户端组件；Sanity 站点适配约 1,417 行；Sanity Studio 定制约 6,291 行；Obsidian 导入/修复约 1,426 行；Portable Text 渲染约 1,298 行；首页交互约 1,611 行。行数只用于判断维护面，不直接等同于代码质量。

| 现有部分 | 臃肿原因 | Astro 目标 | 处理 |
| --- | --- | --- | --- |
| Sanity 查询、类型、图片、草稿和 Visual Editing | 公共页面依赖远端 CMS、预览上下文与专用适配 | 构建时读取本地 Content Collections | 整层删除 |
| 自定义 Sanity Studio | Schema、内容树、分类管理、slash command、翻译、写作助手、Obsidian 导入均需单独维护 | Keystatic schema + Git/PR；只定制确有必要的字段 | 大部分删除，能力重新映射 |
| Sanity webhook/revalidate | 一个端点同时负责缓存标签、查询、通知、写回 notified，约 461 行且职责过多 | 静态重建 + 部署后 publication job | 拆除缓存逻辑，通知独立化 |
| Portable Text/修复/导入链 | 正文需查询、映射、修复，再由 React renderer 分派大量 block | `.mdoc` 直接版本化，Markdoc 构建期渲染 | 用一次性迁移器替代长期适配层 |
| 全站 `NextIntlClientProvider` | 整棵页面树接入客户端语言上下文，并传递完整 messages | 服务端字典 + 静态 locale 页面 | 删除全局 provider，仅局部交互接收必要文案 |
| 整页首页 React | `home-dashboard.tsx` 约 801 行，另有约 353 行 journey hook，静态内容也进入 hydration 边界 | 首页章节由 `.astro` 静态渲染，旅程控制器为小型原生脚本 | 拆成静态 section + 单一轻量控制器 |
| 搜索 API + Sanity 查询 | 每次搜索都触发服务端函数和 CMS 查询 | Pagefind 随构建生成静态索引 | 删除 `/api/search` |
| subscription-options API | 分类/项目/合集选项实际随发布版本固定 | 构建期生成 JSON manifest | 删除运行时查询端点 |
| 多个轻型 React 客户端组件 | 导航、主题、语言切换、日志过滤、toggle、PDF 等不需要 React 状态系统 | HTML/CSS + 原生 TypeScript/Web Components | 去 React 化 |
| 全局 CSS | 主要样式文件合计超过 5,200 行并全部由 globals 引入，页面边界不清 | token + layout + 按路由/组件样式 | 审计、拆分和删除重复规则；Astro 不会自动解决它 |
| Next ISR/cache tags | 静态博客仍维护 revalidate 时间和缓存失效语义 | 内容合并触发确定性静态构建 | 删除 ISR 心智负担 |

不应盲目减掉的部分：番茄钟、史密斯圆图的状态与数学逻辑属于真实产品复杂度；Markmap 和 Giscus 确实需要浏览器能力；订阅、退订、通知仍需要服务端。它们应被隔离成少数 islands/端点，并降低与文章页面的耦合，而不是为追求“零 JavaScript”重写成难维护的原生代码。

预期迁移完成后，普通文章、分类、项目、合集、日志、关于、友链和个人资料页面都不需要 React runtime；React 主要只出现在番茄钟、史密斯圆图、Markmap 和 Giscus。订阅表单可在原生表单增强与小型 island 之间根据无障碍和验证体验再做选择。

---

## 3. 目标技术架构

### 3.1 推荐技术栈

| 层级 | 方案 | 用途 |
| --- | --- | --- |
| 框架 | Astro（实施时锁定验证过的最新稳定版） | 路由、静态生成、服务端端点、islands |
| 内容后台 | Keystatic + `@keystatic/astro` | 浏览器内容管理界面 `/keystatic` |
| 正文格式 | Markdoc / `.mdoc` | 结构化长文与可控内容组件 |
| 内容校验 | Astro Content Collections + Zod | 构建期类型、引用和路由校验 |
| 样式 | Tailwind CSS 4 + 少量组件 CSS | 设计系统和主题 |
| 重交互 | React islands | 番茄钟、史密斯圆图、Markmap |
| 轻交互 | 原生 TypeScript / Web Components | 导航、主题、筛选、目录等 |
| 搜索 | Pagefind | 构建后静态全文索引 |
| 公式 | KaTeX | 构建时渲染数学公式 |
| 代码高亮 | Astro/Shiki | 构建时高亮，避免浏览器运行高亮器 |
| 评论 | Giscus island | GitHub Discussions 评论 |
| 邮件 | Resend | 订阅、退订与发布通知 |
| 托管 | Vercel + GitHub | 静态站、预览部署、服务端函数 |
| 自动化 | GitHub Actions | 校验、构建、链接检查、发布通知 |

Keystatic 的 Astro 集成会提供管理端路由，并需要 React、Markdoc 集成和支持服务端运行的 Astro adapter。公共页面仍可以逐页 `prerender`。官方参考：[Astro 安装](https://keystatic.com/docs/installation-astro)、[GitHub mode](https://keystatic.com/docs/github-mode)、[Markdoc field](https://keystatic.com/docs/fields/markdoc)。

### 3.2 构建与运行模式

推荐项目级配置使用服务端输出，以承载 `/keystatic` 和 API；所有公开内容页显式预渲染：

```text
Astro server output
├── /keystatic/**              动态：Keystatic 管理端与 GitHub OAuth
├── /api/subscribe             动态：订阅
├── /api/confirm-subscription  动态：确认订阅
├── /api/unsubscribe           动态：退订
├── /api/publication-events    动态或 CI job：发布邮件
└── /**                        静态：全部公开页面、RSS、sitemap
```

这不是把整站变成 SSR；它只是让少数必要端点有运行环境。部署产物中的公共页面仍是预生成 HTML。

### 3.3 请求与数据流

```text
作者
  ├─ Keystatic Web UI
  └─ Obsidian / 编辑器
          │
          ▼
Git 分支中的 .mdoc / YAML / 图片 / PDF
          │
          ├─ Pull Request → Vercel Preview
          └─ 合并 main
                 │
                 ├─ Astro 构建静态页面
                 ├─ Pagefind 生成搜索索引
                 ├─ 部署生产站
                 └─ GitHub Actions 检测新发布内容 → Resend 通知
```

浏览网站不依赖 Keystatic 或 GitHub API；这些系统故障不会影响已经部署的文章阅读。

---

## 4. Keystatic + Markdoc 内容方案

### 4.1 存储模式

本地开发使用 Keystatic `local` 模式；预览和生产管理端使用 `github` 模式。

推荐配置原则：

- GitHub 是唯一事实来源。
- `main` 对应生产内容。
- 内容编辑默认建立 `content/*` 分支。
- PR 自动生成预览地址，合并后才正式发布。
- Keystatic GitHub App 只授予目标仓库所需权限。
- `/keystatic` 添加 `noindex`，不进入 sitemap 和 Pagefind。
- 如只允许指定维护者编辑，再增加 GitHub 身份/组织白名单检查。

生产环境变量预计包括：

```dotenv
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

实际名称以实施时的 Keystatic 官方文档和已锁定版本为准，不把密钥提交到仓库。

### 4.2 推荐目录

```text
iceaxing_astro/
├── content/
│   └── publication-manifest.json       # 已通知事件清单（也可迁至 KV）
├── public/
│   ├── media/files/                    # PDF 和下载文件
│   └── pagefind/                       # 构建产物，不提交或按部署策略处理
├── src/
│   ├── assets/content/                 # 可由 Astro 优化的文章图片
│   ├── components/
│   │   ├── content/                    # Markdoc 内容组件
│   │   ├── islands/                    # React islands
│   │   ├── layout/
│   │   └── ui/
│   ├── content/
│   │   ├── articles/
│   │   │   ├── zh/<slug>/index.mdoc
│   │   │   ├── en/<slug>/index.mdoc
│   │   │   └── de/<slug>/index.mdoc
│   │   ├── logs/<slug>/index.mdoc
│   │   ├── categories/*.yaml
│   │   ├── projects/*.yaml
│   │   ├── collections/*.yaml
│   │   ├── pages/
│   │   │   ├── about/*.mdoc
│   │   │   └── profile/*.mdoc
│   │   ├── friends/*.yaml
│   │   ├── mottos/*.yaml
│   │   └── settings/site.yaml
│   ├── content.config.ts
│   ├── i18n/
│   ├── layouts/
│   ├── lib/
│   │   ├── content/
│   │   ├── routing/
│   │   ├── subscriptions/
│   │   └── publication/
│   ├── pages/
│   ├── styles/
│   └── markdoc.config.mjs
├── scripts/
│   ├── migrate-sanity.ts
│   ├── validate-content.ts
│   ├── build-route-manifest.ts
│   └── detect-publication-events.ts
├── keystatic.config.tsx
├── astro.config.mjs
└── package.json
```

`src/content` 可直接作为 Obsidian vault 根目录。`.obsidian` 中只提交确有价值且不含个人状态的公共设置，其余忽略。Keystatic、Obsidian 和普通编辑器编辑同一份文件，不再保留“Obsidian → CMS 数据库”的长期双源同步。

### 4.3 为什么按语言拆文件

当前 Sanity 文章把 `title/titleEn/titleDe` 和 `body/bodyEn/bodyDe` 放在一个文档中。新方案建议每种语言一份 `.mdoc`，通过不可变的 `translationKey` 关联：

```yaml
---
contentId: post-high-k-gate
translationKey: post-high-k-gate
locale: zh
title: 什么情况下引入高 K 栅介质
slug: high-k-gate
status: published
publishedAt: 2026-10-18T08:00:00.000Z
updatedAt: 2026-10-18T08:00:00.000Z
category: semiconductor
project: integrated-circuits
collection: gate-dielectrics
tags:
  - semiconductor
coverImage: ../../../../assets/content/high-k/cover.webp
---
```

优点：

- 每个文件是完整、可直接预览的文章，适合 Obsidian。
- 翻译可以独立草拟和发布，不需要在一个巨型表单中维护三份正文。
- Git diff 更清晰，降低多人编辑冲突。
- 缺失翻译可以被明确识别，而不是悄悄回退到中文正文。

必须由构建校验保证：`contentId` 唯一、同一 `translationKey + locale` 唯一、引用存在、slug 合法、目标 URL 不冲突。

### 4.4 内容模型

#### Article

- `contentId`：不可变稳定 ID，订阅和迁移不能依赖可修改 slug。
- `translationKey`、`locale`。
- `title`、`slug`、`excerpt`、`body`。
- `status: draft | scheduled | published | archived`。
- `publishedAt`、`updatedAt`。
- `category` 或 `project`；`collection` 可选但要求同时存在 `project`。
- `tags`、`authorName`、`coverImage`、SEO 覆盖字段；不保存文章级 `theme`。

#### Category

- 稳定 ID、三语言标题/简介/描述、slug、标签、排序、图标、封面、创建时间。

#### Project

- 稳定 ID、三语言标题/简介/描述、slug、所属分类、状态、进度、标签、排序、封面、创建时间。

#### Collection

- 稳定 ID、三语言标题/简介/描述、slug、所属项目、标签、排序、封面、创建时间。

#### 其他集合/单例

- Log：日期、标题、slug、摘要、分类、Markdoc 正文。
- About / Profile：按语言的 Markdoc 单例。
- Friend：名称、URL、头像、描述、排序。
- Motto：文本、来源、语言和排序。
- Site Settings：首页介绍、站点元数据、社交链接和全局开关。

Keystatic 的 relationship/select 字段负责编辑器体验，但不能把正确性只交给表单。CI 中必须再次验证跨文件引用和业务规则。

### 4.5 Markdoc 内容组件映射

| 当前 Portable Text 能力 | Markdoc 表达 | 渲染策略 |
| --- | --- | --- |
| 普通富文本 | Markdown/Markdoc 原生节点 | 构建为静态 HTML |
| 行内公式 | `{% math inline=true %}` 或自定义 mark | KaTeX 构建期渲染 |
| 块公式 | `{% math %}` | KaTeX 构建期渲染 |
| 代码块 | fenced code | Shiki 构建期高亮 |
| 图片 | Keystatic image/content component | Astro `<Image />` |
| Callout | wrapper component | 静态语义 HTML |
| Columns | wrapper/repeating component | CSS Grid |
| Toggle | wrapper component | 原生 `<details>` |
| Divider | block component | `<hr>` 变体 |
| Table | Markdown table 或 repeating component | 响应式表格 |
| Anchor | block/inline component | 经过校验的 `id` |
| PDF | file component | `<object>` + 下载回退 |
| Mindmap | fenced/Markdoc component | React `client:visible` |

组件设计原则：

- 默认输出静态 HTML，只有确实需要状态或画布的组件才水合。
- 属性使用白名单 Schema，不允许正文直接注入任意组件或危险 HTML。
- 嵌套组件由 Markdoc wrapper/repeating content component 表达。
- 标题 ID 由统一 slugger 生成，目录与正文共用同一结果。
- 内容组件添加版本字段或迁移脚本，避免未来改 Schema 使旧文章失效。

Keystatic 支持 Markdoc 字段及 block、wrapper、inline、mark、repeating 等内容组件类型，适合映射现有自定义块：[Markdoc 字段](https://keystatic.com/docs/fields/markdoc)、[Content Components](https://keystatic.com/docs/content-components)。

### 4.6 图片与文件

第一阶段建议：

- 封面和正文图片写入 `src/assets/content`，交给 Astro 图片管线生成合适尺寸和格式。
- PDF/可下载文件写入 `public/media/files`，保留稳定 URL。
- 图片必须填写 alt；装饰性图片允许显式标记为空 alt。
- 上传时规范文件名，生成内容哈希，阻止重复大文件。
- CI 设置单文件和仓库总体积告警，例如图片 10 MB、附件 25 MB；阈值最终由实际素材分布决定。

Keystatic 的 image/file 字段可将文件写进仓库；Astro 图片的推荐用法见 [Astro Images recipe](https://keystatic.com/docs/recipes/astro-images) 和 [File field](https://keystatic.com/docs/fields/file)。

如果历史 PDF、原图或后续视频会快速增大仓库，第二阶段把大文件迁移到 R2/S3 类对象存储，Git 中只保存 URL、尺寸、MIME、alt 和校验和。不要一开始同时引入 Git LFS、对象存储和自定义 Keystatic 字段，避免提高迁移风险。

---

## 5. 路由与多语言

### 5.1 URL 兼容

默认保留现有语义：

```text
/{category}
/{category}/{post}
/{category}/{project}
/{category}/{project}/{post}
/{category}/{project}/{collection}
/{category}/{project}/{collection}/{post}
/log
/log/{slug}
/about
/profile
/friends
/tools/**
```

英文和德文增加既有 locale 前缀，中文按当前约定不加前缀；最终以旧站实际 URL 快照为准。

由于项目、合集和文章都可能占用相似路径，不能依赖运行时“逐个尝试查询”。构建前生成统一 Route Manifest：

```ts
type RouteEntry = {
  pathname: string;
  kind: 'category' | 'project' | 'collection' | 'article' | 'page';
  contentId: string;
  locale: 'zh' | 'en' | 'de';
  sourceFile: string;
};
```

构建失败条件包括重复路径、悬空引用、集合不属于指定项目、项目不属于指定分类、未知 locale 和非法 slug。迁移时将旧站 URL 清单与新清单做逐项差异比较；无法保持的 URL必须进入显式 301 映射。

### 5.2 i18n

- 路由层只负责 locale 识别和 URL 生成。
- UI 字典在服务端按语言载入，不在浏览器打包全部语言。
- 内容语言由独立文档决定，不自动把缺失译文当作已发布译文。
- `hreflang` 根据 `translationKey` 生成。
- 每个页面生成正确 `lang`、canonical 和 alternate。
- 语言切换优先跳到同一 `translationKey`；无译文时跳到对应语言的上级页面并给出提示。

---

## 6. 页面与交互实现

### 6.1 默认无框架 JavaScript

以下组件应以 `.astro` + 少量原生脚本实现：

- Header、Footer、面包屑、卡片、文章元信息。
- 主题切换和语言选择。
- 移动导航和通用 Dialog。
- 静态列表的排序/过滤。
- 文章目录高亮、目录栏尺寸记忆。
- 首页只保留必要的菜单、订阅入口和轻量交互，不建立首页专属状态系统。
- 搜索 UI；查询 Pagefind 的静态索引。

### 6.2 雪线风格的静态优先首页

首页应保留现有 Next.js 版本最有辨识度的视觉体验，而不是改成通用博客模板。需要保留的核心包括：四段雪线章节、海拔路线、山脊/雪原/夜营 SVG 场景、编辑式卡片排版、精选文章横带、项目进度、生活路标、营地入口、明暗配色和分段进入动画。

需要替换的是实现方式，而不是视觉方向。推荐采用“完整静态 DOM + CSS 场景 + 小型原生控制器”的渐进增强方案。

```text
HomePage.astro（构建期读取内容，输出完整 HTML）
├── SnowlineHero.astro              基地营、格言、精选文章
├── TechnicalRidge.astro            技术分类、进行中/已完成项目
├── SnowfieldTraverse.astro         生活分类与近期内容
├── NightCamp.astro                 随笔、日志、关于、友链、订阅
├── ChapterLandscape.astro          内联 SVG 山脊场景
├── JourneyNavigation.astro         海拔路线和章节状态
└── home-journey.ts                 小型渐进增强控制器
```

#### 静态渲染边界

- 四个章节、全部卡片、SVG、标题和链接均由 `.astro` 在构建期输出，不等待 JavaScript 才出现。
- Keystatic 内容在构建期聚合；浏览器不接收完整 CMS 数据对象，也不执行内容筛选查询。
- `next/image` 替换为 Astro `<Image />`，首页关键图片生成响应式尺寸，非首屏资源懒加载。
- `next-intl` 客户端 Provider 替换为构建期字典，三种语言各自产生静态 HTML。
- 精选内容、项目和生活文章优先由显式 `featured/order` 字段确定；如需“换一批”，使用已经输出在 HTML 中的候选项，不发起 API 请求。

#### 轻量交互边界

`home-journey.ts` 只负责浏览器增强：

- 使用 `IntersectionObserver` 更新当前章节和海拔导航状态。
- 使用原生锚点、`scrollIntoView()` 和 CSS `scroll-snap` 完成章节跳转。
- 使用 CSS 或 Web Animations API 播放山脊描边和内容 reveal，但不在框架状态中保存每个动画对象。
- 维护 URL hash，使章节可直接访问、可使用浏览器前进后退。
- 精选文章横带优先使用 CSS 横向滚动；小脚本只处理前后按钮和边界禁用状态。
- `prefers-reduced-motion` 下取消平滑滚动、绘线和 reveal，直接显示完整内容。
- JavaScript 失败或禁用时，首页退化为完整的纵向雪线长页，内容和链接仍然可用。

默认不迁移现有 `useHomeJourney` 中复杂的逐帧自定义 travel 动画、精确滚动偏移恢复和 React `activeChapter` 状态。这些行为对视觉辨识度贡献较小，却承担了大量事件监听、ResizeObserver、requestAnimationFrame 和 sessionStorage 复杂度。若后续对比确认确实影响体验，再逐项加回，而不是整体照搬。

#### 样式组织

- 保留现有雪线色彩、留白、字体层级、编号、路线、山形和卡片构图。
- 将 `snowline-home.css` 拆成 `home-shell / landscapes / chapters / cards / motion` 等局部样式，只在首页加载。
- 工具页、文章页样式不进入首页 CSS；首页样式也不进入普通文章关键路径。
- 山景继续使用代码内 SVG，无需引入 Canvas、WebGL 或动画库。
- 动画只改变 `transform`、`opacity` 和 SVG stroke，避免频繁触发布局。

建议性能预算：首页不加载 React runtime；首页增强脚本目标不超过 8 KB gzip；首页专属 CSS 目标不超过 35 KB gzip；首屏之外的图片全部延迟加载。预算是验收门槛，不以牺牲核心视觉层次为代价机械压缩。

#### 可选实施路径

| 路径 | 视觉保真 | 客户端成本 | 风险 | 建议 |
| --- | --- | --- | --- | --- |
| A. Astro 静态重构 + 原生控制器 | 高 | 最低 | 需要重新组织现有 JSX/CSS | 推荐，作为正式实现 |
| B. Astro 静态内容 + 小型 React/Preact 导航岛 | 高 | 中等 | 框架状态与外部静态 DOM 同步较复杂 | 仅在原生控制器难以维护时采用 |
| C. 原 `HomeDashboard` 整体迁为 React island | 最高、最快 | 最高 | 保留整页 hydration 和旧架构负担 | 只适合短期过渡，不作为最终方案 |

验收不要求逐行复刻旧实现，但要求关键 viewport 下的章节构图、色彩、字体、山景、卡片层级和主要动效与旧首页视觉基线一致。阶段 1 中已经建立的传统首页只是技术骨架，不再视为最终首页设计。

### 6.3 React islands

只保留三类明确获益的岛：

- `PomodoroTimer`：`client:load` 或按入口策略加载，状态保存到 localStorage。
- `SmithChartTool`：`client:visible`，图形计算逻辑与视图分离。
- `Mindmap`：文章中出现时 `client:visible`，避免每篇文章都加载 markmap。
- Giscus：滚动接近评论区时 `client:visible`。

每个 island 都要记录加载原因和 hydration directive，防止重构后再次演变成整页 React 应用。

### 6.4 页面过渡

优先使用浏览器原生跨文档 View Transitions 和 CSS 渐进增强。不开启会拦截全部导航的客户端路由器，保证普通链接、浏览器历史、脚本失败和无障碍行为保持原生可靠性。

### 6.5 搜索

Pagefind 在 `astro build` 后索引最终 HTML：

- 索引文章、日志、分类、项目、合集和主要静态页面。
- 通过 `data-pagefind-filter` 提供 locale、category、project、collection、type 过滤。
- 三种语言分别搜索，默认不混合结果。
- 排除 `/keystatic`、工具内部 UI、订阅对话框和重复导航文本。
- 删除旧 `/api/search` 及运行时 Sanity 查询。

Pagefind 的优势是搜索数据随部署版本固定、无需数据库和服务端搜索函数；文章较少时首个索引分片也很小。

### 6.6 统一文章阅读主题

文章只使用一套组件树和排版规则，不在 frontmatter 中提供 `theme`，也不根据文章选择 `default / terminal / serif / manga / minimal` 等模板。全站明暗模式继续存在，但只通过同一组语义设计 token 切换颜色，不改变正文结构。

统一阅读主题的约束：

- 正文主栏控制在约 `68–72ch`，宽屏目录作为辅助栏，移动端回归单栏。
- 标题、正文、引用、链接、图片、表格、公式、代码和所有 Markdoc 组件共享固定排版层级。
- 代码块可使用独立的深色高亮配色，但不因此把整篇文章切换成 Terminal 模板。
- 字体按 UI、正文和等宽代码三种角色管理，不按文章加载不同字体包。
- 封面、标签和内容组件可以形成文章差异，但不允许覆盖布局结构和全局设计 token。
- 旧文章的 `theme` 值只进入迁移审计报告，不写入新内容文件，也不影响 URL 或正文。

这会删除主题 registry、按主题动态选择 renderer、主题专用 wrapper 和未落地主题的 Schema 分支，并显著简化视觉回归测试。

---

## 7. 编辑、预览与发布工作流

### 7.1 推荐工作流

```text
1. 作者进入 /keystatic 并登录 GitHub
2. 从 main 创建或选择 content/<topic> 分支
3. 编辑 .mdoc / YAML / 图片
4. Keystatic 提交到该分支
5. 建立 PR，自动运行内容校验并生成 Vercel Preview
6. 在真实路由检查排版、链接、图片、公式、移动端和译文
7. 合并 main
8. 构建并部署生产站
9. 部署成功后检测发布事件并发送通知
```

直接提交 `main` 可以作为紧急修正流程，但不建议作为默认发布方式。Keystatic GitHub mode 可以操作分支；审核、审批和历史记录由 GitHub PR 承担。

### 7.2 草稿与定时发布

- `draft`：不生成公开路由，只在预览构建中通过环境变量显式包含。
- `scheduled`：`publishedAt` 未到时不进入生产 Route Manifest。
- `published`：时间到且内容校验通过时进入生产构建。
- `archived`：从导航和搜索移除；是否保留 URL 或返回 410 由单独字段决定。

纯 Git 静态站的定时发布不会在时间到达时自动出现，必须配置定时 GitHub Action 或 Vercel Deploy Hook 触发重新构建。CI 每 15 分钟检查是否有到期内容即可；若不需要定时发布，可以第一阶段不实现 scheduled 状态。

### 7.3 发布通知替代 Sanity Webhook

旧流程依靠 Sanity webhook 和 `notified` 字段。新流程改为部署后的发布事件：

1. 构建脚本生成当前公开内容 manifest，记录稳定 ID、类型、发布时间、版本哈希和 URL。
2. 与上一次成功生产部署的 manifest 比较。
3. 找出首次公开的文章、分类、项目和合集。
4. 生产部署成功后运行通知任务，防止邮件先于页面上线。
5. 根据订阅偏好筛选 Resend 联系人。
6. 使用 `contentId + publishedAt/versionHash` 作为幂等键。
7. 成功事件写入持久存储；失败可安全重试，不重复群发。

推荐把幂等记录放在 Vercel KV、Upstash Redis 或小型数据库中。把通知状态回写 Git 会产生自动提交并可能再次触发部署，不作为首选。若坚持零数据库，可将 manifest 存为 GitHub Actions artifact/release asset，但恢复、并发和审计更复杂。

---

## 8. 订阅与邮件

保留 Resend，但重构数据键和安全边界：

- 订阅偏好保存稳定 `contentId`，展示时再映射当前 slug/title。
- API 从构建产物中的 subscription-options manifest 读取合法选项，拒绝任意字符串。
- 订阅、确认、退订端点使用 Zod 校验。
- 限流使用持久 KV，不依赖单实例内存 Map。
- IP 只用于短期风控；日志不得记录完整邮箱、令牌和密钥。
- 退订 token 使用带版本和过期策略的签名，支持密钥轮换。
- 保留 `List-Unsubscribe` 与 one-click 退订头。
- 邮件发送使用队列/批次和幂等键，遵守 Resend 速率限制。

建议升级为真正的 double opt-in：初次提交只创建 pending 记录并发送确认链接；用户点击后才加入可群发名单。当前“发送确认邮件但联系人已直接创建”的行为不应继续命名为双重确认。

---

## 9. 性能、SEO、无障碍与安全

### 9.1 性能预算

- 普通内容页默认不发送 React runtime。
- 初始客户端 JS：文章页目标不高于 35 KB gzip（不含按需 Giscus/Markmap）。
- 图片必须包含尺寸，首屏图合理预加载，其余懒加载。
- 字体本地托管、按语言/字重裁剪，避免一次加载全部字体变体。
- CSS 按布局和组件收敛，避免迁移全部历史全局样式。
- Lighthouse 以移动端为准：Performance、SEO、Best Practices、Accessibility 均设 CI 告警线。

### 9.2 SEO

- 每个内容模型统一生成 title、description、canonical、Open Graph 和 Twitter Card。
- Article、BreadcrumbList、WebSite 等 JSON-LD 从内容模型生成。
- RSS 使用公开文章集合构建，并按既有需求提供主 feed 或分语言 feed。
- Sitemap 排除草稿、归档页、管理端和 API。
- 旧 URL 差异必须由 redirect manifest 覆盖，切换前跑全量链接检查。

### 9.3 无障碍

- 全站键盘可操作，Dialog 正确管理焦点和关闭后焦点恢复。
- 不以颜色作为唯一状态信号。
- 代码块、公式、图表和嵌入 PDF 提供文本或下载回退。
- 尊重 `prefers-reduced-motion`。
- 文章标题层级由构建校验，避免跳级。
- 语言切换、搜索结果数量和计时器状态提供合适的可读标签/aria-live。

### 9.4 安全

- Keystatic OAuth secret、GitHub App secret、Resend key 仅存在于部署环境。
- `/keystatic` 依赖 GitHub 授权；必要时再加部署平台访问保护。
- Markdoc 禁止任意 HTML/脚本，外链统一补充安全属性。
- PDF、图片和上传文件校验扩展名、MIME 与大小。
- 所有写 API 增加 Origin 检查、CSRF 策略、速率限制和结构化校验。
- 发布通知 API 仅接受 CI 的签名请求，或者完全放在 GitHub Action 中执行。

---

## 10. 迁移实施计划

### 阶段 0：冻结基线与盘点（已跳过）

> 2026-10-18 决定跳过本阶段。以下原计划内容不在当前实施范围内；因此后续迁移必须自行承担旧 URL、异常 Portable Text、自定义 block 和资产遗漏较晚才暴露的风险。

- 导出旧站路由、页面截图、SEO 元数据和功能清单。
- 记录所有环境变量与第三方服务，不复制密钥到新仓库。
- 从 Sanity 导出完整数据集和 assets 清单，保留只读快照。
- 统计各 Portable Text block 类型、嵌套深度、图片/PDF 体积和异常数据。
- 固化旧站构建结果，作为视觉和 URL 回归基线。

交付物：功能矩阵、URL 快照、内容统计、迁移输入快照。

### 阶段 1：Astro 基础骨架（已完成，2026-10-18）

- 创建 Astro、TypeScript strict、Tailwind、React、Markdoc、Vercel adapter。
- 建立设计 token、全局布局、三语言路由和错误页。
- 配置 lint、format、typecheck、unit test、build、preview。
- 建立 preview/production 环境与最小 CI。

实施结果：

- 使用 Astro 7.4.0、React 19.3.1、Markdoc integration 2.1.0、Vercel adapter 11.0.15 和 Tailwind CSS 4.3.3，并由 `package-lock.json` 锁定实际依赖树。
- 配置 `output: 'server'`；`/`、`/en`、`/de` 和 `/404` 显式预渲染，`/api/health` 保持动态，验证了后续 Keystatic/API 所需的混合输出边界。
- 建立技术验证用的简洁首页骨架、统一设计 token、共享 Header/Footer、明暗配色、三语言字典和响应式布局；该首页不是最终视觉稿，将由雪线风格首页替换。
- 配置 strict TypeScript、Astro Check、ESLint、Prettier、Vitest 和 GitHub Actions CI。
- Markdoc 已启用且 `allowHTML: false`；React integration 已启用，但阶段 1 的公开页面没有 React island。
- 初始化本地 `main` Git 仓库；Vercel adapter 与环境变量约定已经就绪，远程 GitHub/Vercel 项目尚未连接，也未执行外部部署。
- 完整 `npm run ci` 通过：格式、Lint、Astro 类型检查均无错误/警告/提示，3 项单元测试通过，生产构建成功。
- 生产页面没有外链 JavaScript bundle；只有主题切换所需的内联小脚本。
- `npm audit --omit=dev` 为 0 个漏洞；通过将 Vercel 传递依赖 `path-to-regexp` 精确覆盖到兼容的 6.3.0 修复上游锁定旧补丁版的问题。

验收结论：本地阶段 1 完成，项目可构建为 Vercel 部署产物。实际 Preview/Production 连接需要后续提供或创建远程 GitHub 仓库与 Vercel 项目。

### 阶段 2：Keystatic 与内容 Schema（5–8 人日）

- 配置 local/GitHub storage 和 `/keystatic`。
- 建立 article/category/project/collection/log/page/friend/motto/settings schema。
- 完成三语言独立文件、稳定 ID、relationship 和媒体字段。
- 实现构建期业务校验与 Route Manifest。
- 验证 Keystatic、手工编辑和 Obsidian 修改后的格式一致性。

验收：可以从后台创建一篇包含关系、图片和 Markdoc 正文的文章，在 PR 预览中访问。

实施状态（2026-10-18）：本地实现已完成。已接入 `/keystatic`、local/GitHub storage 开关、三语言内容集合、稳定主键与 relationship、Markdoc 内容组件字段、媒体字段、Astro Content Collections Schema、跨文件业务校验和 Route Manifest；示例文章、日志、页面及层级数据通过完整 CI。GitHub 登录、内容分支和 PR Preview 的在线验收依赖远程仓库与 Vercel 项目，保留到部署接入时完成，不阻塞本地阶段 2 代码交付。

### 阶段 3：内容渲染与页面（9–13 人日）

- 实现基础 Markdoc renderer 和全部自定义内容组件。
- 实现分类、项目、合集、文章、日志、关于、个人资料、友链页面。
- 以 Astro 静态组件重建雪线风格首页，保留四章节、海拔路线、SVG 山景、编辑式卡片与主要动效。
- 实现目录、统一阅读版式、明暗配色、代码、公式、图片、PDF 和评论。
- 实现多语言 SEO、RSS、sitemap、robots。

验收：每类页面和每类 block 都有 fixture 与视觉回归样例。

实施状态（2026-10-19）：本地实现已完成。

- 建立统一的内容查询与路由解析层，17 条公开 Route Manifest 路由均在构建期预渲染；完成分类、项目、合集、文章、日志、关于、个人资料、友链和工具入口页面，中文无前缀，英文、德文保留语言前缀。
- 完成统一文章阅读版式、静态目录与当前章节增强，并为代码、响应式图片、提示块、折叠块、分栏、表格、块级/行内公式、锚点、PDF 和 Mindmap 提供 Markdoc renderer。Mindmap 仅在进入视口时加载 React island；Giscus 仅在配置完整且评论区接近视口时加载第三方脚本，普通内容页默认不加载 React runtime。
- 用 Astro 静态组件重建四章节雪线首页，保留海拔路线、山景、编辑式内容卡片、精选文章/项目/日志入口和明暗配色；章节观察、锚点导航、URL hash、滚动和 reveal 动画由单一原生控制器渐进增强，并尊重 `prefers-reduced-motion`。
- 完成 canonical、Open Graph、Twitter Card、Article JSON-LD、同内容多语言 alternate、语言切换、分语言 RSS、sitemap 与 robots；草稿、管理端、API 和 fixture 不进入 sitemap。
- 建立不公开的 `/fixtures/markdoc` 内容组件回归页；fixture 覆盖全部 Markdoc 自定义块，包含优化后的本地 SVG 图片和内嵌 PDF 回退样例。内容校验、Astro Check、ESLint、Vitest 和生产构建纳入现有 CI。

验收结论：阶段 3 的实现和自动化验收已完成。由于阶段 0 按决定跳过，项目没有冻结的旧首页截图基线；当前环境也没有浏览器截图控制能力，因此跨浏览器像素级截图基线仍需在部署预览或人工浏览器复核时补录，不阻塞阶段 4 开发。

### 阶段 4：交互与工具（6–9 人日）

- 将轻交互改写为原生脚本/组件。
- 用小型原生控制器重建首页章节观察、锚点导航、横带控制和渐进动画，不迁移整页 React hydration。
- 迁移番茄钟、史密斯圆图、Markmap 为隔离 islands。
- 实现 Pagefind 搜索、locale/category 过滤。
- 实现原生页面过渡和 reduced-motion 降级。

验收：脚本禁用时内容和导航仍可用；重交互按需加载。

实施状态（2026-10-19）：本地实现已完成。

- Pagefind 在 Astro 构建完成后索引最终静态 HTML，生成中文、英文和德文三套语言索引；页面提供原生 `<dialog>` 搜索界面，并支持 locale、内容类型和分类过滤。导航、正文、工具交互区和订阅表单从索引中排除，不再保留运行时搜索 API。
- 番茄钟作为 `client:load` React island，仅在番茄钟页面加载；支持自定义专注/休息时长、循环、暂停恢复、跳过、自动开始、本地持久化、绝对时间后台校时、声音、桌面通知、快捷键和每日统计。
- 史密斯圆图作为 `client:visible` React island，仅在圆图接近视口时加载；支持阻抗/导纳与反射系数计算、VSWR、回波/失配损耗、图上拖动、传输线旋转、物理长度、单短截线与 L 网络匹配、标记以及 SVG/CSV 导出。
- Mindmap 升级为 `markmap-lib + markmap-view` 的可缩放交互 SVG，仍维持 `client:visible` 边界，并保留无 JavaScript 时可读的文本大纲。
- 页面过渡采用原生跨文档 View Transitions，不引入拦截导航的客户端路由器；不支持该 API 或开启 `prefers-reduced-motion` 时维持普通页面导航。

验收结论：三个重交互组件都被隔离到对应页面/内容块；首页和普通文章没有 React island。Pagefind 已索引 3 种语言、36 个页面和 10 组过滤索引；工具计算与状态机均有单元测试。浏览器级拖拽、通知权限和视觉截图仍随部署 Preview 做人工复核。

### 阶段 5：订阅与发布流水线（5–8 人日）

- 迁移邮件模板和 Resend 集成。
- 实现订阅、确认、退订、持久限流。
- 构建 subscription options 与 publication manifest。
- 实现部署后差异检测、受众匹配、幂等通知和重试。
- 建立测试环境收件人白名单，防止迁移测试误发邮件。

验收：测试发布只发送一次；失败重试不重复；退订立即生效。

实施状态（2026-10-19）：本地实现已完成，外部服务联调等待部署凭据。

- 实现真正的 double opt-in：订阅端点用 Zod 校验邮箱、locale 和构建生成的稳定订阅键，将 pending 请求写入 Upstash Redis 并设置 48 小时 TTL；只有用户访问一次性确认链接后，才写入 active audience 并同步 Resend contact。
- 订阅和通知状态、受众集合、发送锁与限流全部使用持久 Redis REST 存储；IP 只以 SHA-256 截断指纹进入短期限流键，代码不记录完整邮箱、IP、令牌或密钥。POST 订阅还执行 Origin 检查和 honeypot 校验。
- 退订链接采用 `v1 + subscriberId + expiresAt` 的 HMAC 签名，验证支持当前/上一把密钥以便轮换；GET 与 RFC 8058 one-click POST 都会先从本地 active audience 即时移除，再同步 Resend，第三方短暂失败不会恢复本地订阅。
- 内容校验同时生成 `subscription-options.json` 和 `publication-manifest.json`。后者记录稳定内容 ID、类型、发布时间、版本哈希、多语言标题/URL 和受众键；公开副本随静态资源部署，服务端使用同一构建版本进行差异检测。
- `/api/publications/notify` 只接受常量时间比较通过的 Bearer secret。首次调用仅建立生产基线；后续只处理首次公开内容。发送任务采用 Redis 全局锁、持久单收件人幂等键、可重试小批次和可配置发送间隔，同时把同一幂等键交给 Resend。
- `EMAIL_DELIVERY_MODE` 默认 `disabled`；Preview 只有 `allowlist` 中的地址可以收到邮件，生产必须显式设为 `production`。GitHub Actions 在生产 Deployment 成功后分批调用通知端点，队列未排空时继续调用。

验收结论：单元测试覆盖首次部署不补发历史内容、失败后重试、成功后不重复以及退订立即从 active audience 移除；未配置 Redis/Resend 时端点安全返回不可用且不会降级到实例内存。由于本地没有 Upstash、Resend、生产域名和 GitHub Secrets，真实收信、Resend contact 同步及 Deployment Status 自动触发需要在 Preview/Production 配置完成后做一次白名单联调。

### 阶段 6：Sanity → Markdoc 迁移（7–12 人日）

- 编写一次性导入器，读取 Sanity 导出而非持续查询线上数据。
- 映射所有文档、引用、翻译、slug、日期和标签；旧主题值只写入迁移审计报告。
- Portable Text 逐节点转换为 Markdoc AST/文本，不能用脆弱的正则替换。
- 下载/去重 assets，修正正文引用，保留原 asset/source ID 供审计。
- 对未知 block 输出错误报告和可恢复占位，不静默丢弃内容。
- 运行内容 Schema、Route Manifest、内部链接、图片、附件和渲染测试。
- 人工抽查长文、公式密集文、复杂分栏、PDF、思维导图和多语言文章。

验收指标：

- 文档数、各语言数、图片数、附件数与导出清单一致。
- 旧 URL 100% 得到同 URL 或显式 301。
- 不存在未处理的 Portable Text block。
- 正文纯文本摘要对比无非预期缺失。

### 阶段 7：切换与观察（3–5 人日）

- 内容短暂冻结，执行最终增量迁移。
- 在预览域名完成桌面/移动端、三语言、SEO 和邮件 smoke test。
- 切换域名，监控 404、函数错误、构建时间、Core Web Vitals 和邮件失败。
- 旧站保留可快速回滚的生产部署；Sanity 保持只读一段观察期。
- 稳定后撤销旧 webhook/token，再决定是否归档旧项目。

阶段 0 已跳过，阶段 1–5 已完成。阶段 6–7 的账面剩余估算为 10–17 人日。由于没有执行基线盘点，该区间的不确定性高于通常情况；历史内容质量、复杂嵌套块、迁移资产、旧 URL 对账和生产邮件联调仍会显著影响工期。

---

## 11. 自动化测试与 CI 门禁

每个 PR 至少执行：

```text
安装依赖
  → Astro sync / 类型生成
  → 内容 Schema 校验
  → 引用与 Route Manifest 校验
  → lint + typecheck
  → 单元测试
  → Astro build
  → Pagefind index
  → 内部链接与资源检查
  → 关键页面 E2E
  → 生成 Preview Deployment
```

建议测试层次：

- 单元：URL 生成、语言回退、heading slug、订阅匹配、发布差异与 token。
- 内容 fixture：每种 Markdoc 组件至少一个合法和非法样例。
- 集成：Content Collection → Route Manifest → 页面构建。
- E2E：首页、文章、搜索、语言切换、订阅/退订、番茄钟、史密斯圆图。
- 视觉回归：三种 viewport、明暗两种配色、三种语言的关键页；文章只有一种版式。
- 迁移对账：旧/新文档数、URL、引用、资源和纯文本摘要。

---

## 12. 风险与应对

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| Keystatic 编辑能力不等于 Sanity | 编辑习惯变化 | 先做包含全部 block 的编辑原型，再迁移全量内容 |
| Git 中大量二进制文件 | clone/build 变慢 | 体积审计、阈值告警，必要时迁移对象存储 |
| 多人同时改内容产生冲突 | 发布阻塞 | 一篇文章一个目录、语言拆文件、短生命周期分支 |
| 动态层级路由冲突 | 错页或构建覆盖 | 单一 Route Manifest，冲突即构建失败 |
| Portable Text 转换丢失结构 | 内容损坏 | AST 转换、未知节点失败、自动对账和人工抽查 |
| 静态站定时发布不自动发生 | 内容延迟上线 | 定时 Action/Deploy Hook，或暂不承诺定时发布 |
| 通知任务重复执行 | 用户收到重复邮件 | 部署后触发、持久幂等键、可重入任务 |
| GitHub/Keystatic 暂不可用 | 无法编辑 | 已部署站点不受影响，本地 Git/Obsidian 可继续写作 |
| 全量重构范围过大 | 工期失控 | 按垂直切片交付，先打通一篇复杂文章完整链路 |

---

## 13. 不建议的做法

- 不把所有页面做成 React island，或用 `client:load` 作为默认值。
- 不在生产请求中读取 GitHub 内容 API；生产内容来自构建产物。
- 不同时维护 Sanity 和 Git 两套可写内容源。
- 不把 slug 当永久主键；订阅、翻译和通知使用稳定 ID。
- 不以正则批量替换 Portable Text JSON 为 Markdown。
- 不用“构建成功”替代内容引用、URL 冲突和迁移对账校验。
- 不在部署成功前发送新内容通知。
- 不把管理端、草稿或内部预览页加入搜索和 sitemap。

---

## 14. 完成定义

只有同时满足以下条件，迁移才算完成：

- 当前功能矩阵全部通过，或存在书面批准的替代行为。
- 全部公开内容已迁移，数量和资源对账无未解释差异。
- 旧 URL 全部保持或有正确 301；关键 SEO 元数据无回退。
- 三语言、搜索、RSS、评论、工具、订阅和退订通过 E2E。
- 复杂 Markdoc block 在 Keystatic 中可创建、编辑、预览和构建。
- 普通内容页无不必要 React runtime，性能预算达标。
- 内容分支、PR 预览、生产发布、通知和回滚均演练成功。
- 运行手册、内容编辑指南、故障恢复和密钥轮换说明齐全。
- 旧站和 Sanity 只在观察期结束后下线。

---

## 15. 建议的第一条实施切片

不要先搭完所有页面再验证 CMS。第一条切片应贯通：

1. Keystatic GitHub 登录与内容分支。
2. 一篇同时包含公式、代码、图片、Callout、分栏、PDF、表格、折叠块和思维导图的三语言测试文章。
3. Content Collection 校验、Route Manifest 和实际文章 URL。
4. PR Preview。
5. Pagefind 搜索。
6. 合并后的生产部署与一封测试通知。

这条切片可以最早暴露 Keystatic 编辑体验、Markdoc 表达力、媒体路径、预览流程和通知幂等问题；通过后再批量建设页面与迁移器。

---

## 16. 决策记录

| 日期 | 决策 | 状态 | 说明 |
| --- | --- | --- | --- |
| 2026-10-18 | 从零使用 Astro 重构 | 已确认 | 保留功能，不要求保留旧实现 |
| 2026-10-18 | 用 Keystatic + Markdoc 替代 Sanity | 已确认 | Git 作为内容事实来源 |
| 2026-10-18 | 公共页面静态优先、交互按需 islands | 已确认 | 发挥 Astro 架构优势 |
| 2026-10-18 | 首页改为传统、简洁的博客首页 | 已废止 | 后续讨论确认该方向不符合视觉需求 |
| 2026-10-18 | 保留 Next.js 首页的雪线视觉风格 | 已确认 | 用 Astro 静态组件和轻量控制器重构，不等同于整页 React 搬迁 |
| 2026-10-18 | 首页采用方案 A：Astro 静态组件 + 原生控制器 | 已确认 | 完整 DOM 构建期输出；用 IntersectionObserver、原生滚动、URL hash、CSS/WAAPI 做渐进增强，不加载首页 React runtime |
| 2026-10-18 | 文章只保留统一阅读主题 | 已确认 | 删除文章 theme 字段和多套主题 renderer；保留全站明暗配色 |
| 2026-10-18 | 跳过阶段 0，直接实施阶段 1 | 已确认 | 接受内容、路由和资产问题可能在后续较晚暴露的风险 |
| 2026-10-18 | 阶段 1 基础骨架完成 | 已完成 | 本地 CI、生产构建与 HTTP 冒烟测试通过；尚未连接远程部署 |
| 2026-10-18 | 阶段 2 Keystatic 与内容 Schema 完成 | 已完成 | 本地编辑器、Schema、示例内容、业务校验与 Route Manifest 已接通；在线 GitHub/PR Preview 验收随部署接入完成 |
| 2026-10-19 | 阶段 3 内容渲染与页面完成 | 已完成 | 内容路由、统一阅读页、Markdoc 组件、雪线首页、渐进增强、多语言 SEO、RSS、sitemap、robots 与回归 fixture 已通过本地自动化验收；浏览器截图基线随 Preview 补录 |
| 2026-10-19 | 阶段 4 交互与工具完成 | 已完成 | Pagefind 三语言静态搜索、原生页面过渡、番茄钟、史密斯圆图和 Markmap 隔离 islands 已完成本地构建与测试 |
| 2026-10-19 | 阶段 5 订阅与发布流水线完成 | 已完成（待在线联调） | double opt-in、Redis 持久状态/限流、签名退订、Resend 幂等发送、构建 manifest 和部署后批次任务已实现；外部凭据与真实邮件验收随部署完成 |
| 待定 | 默认采用内容分支 + PR 发布 | 建议 | 需要确认个人写作偏好 |
| 待定 | 图片入 Git，超大附件再迁对象存储 | 建议 | 需要先统计现有素材体积 |
| 2026-10-19 | 订阅采用真正 double opt-in | 已确认 | 确认前只保存 48 小时 pending 记录，不进入可群发名单 |
| 待定 | 列表页和工具页的视觉延续或简化 | 待讨论 | 首页雪线风格与文章统一主题已经确认 |

## 17. 变更记录

| 版本 | 日期 | 变更 |
| --- | --- | --- |
| v1.0 | 2026-10-19 | 完成阶段 4–5：Pagefind 搜索、三个隔离 islands、原生页面过渡、double opt-in、Redis/Resend 发布通知与安全边界；剩余范围收敛到迁移和切换 |
| v0.9 | 2026-10-19 | 完成阶段 3：静态内容页面、统一阅读主题、Markdoc renderer、雪线首页与原生控制器、多语言 SEO/RSS/sitemap/robots、按需 Mindmap/Giscus 和内容 fixture |
| v0.8 | 2026-10-18 | 正式确认首页方案 A（Astro 静态组件 + 原生控制器）；完成阶段 2 的 Keystatic、内容 Schema、业务校验与 Route Manifest 本地实现 |
| v0.7 | 2026-10-18 | 废止传统首页方向；改为保留雪线视觉并采用 Astro 静态组件 + 轻量控制器重构 |
| v0.6 | 2026-10-18 | 记录跳过阶段 0；阶段 1 完成及验证结果；剩余估算调整为 31–50 人日 |
| v0.5 | 2026-10-18 | 确认统一文章阅读主题；移除文章 theme 字段、多模板渲染和相关迁移要求 |
| v0.4 | 2026-10-18 | 确认传统简洁首页；删除雪线旅程迁移要求，补充首页结构并调整工期 |
| v0.3 | 2026-10-18 | 增加现有架构减重审计，明确删除、静态化和保留的边界 |
| v0.2 | 2026-10-18 | 将 Sanity 全面替换为 Keystatic + Markdoc；重写内容、预览、发布通知和迁移方案 |

