# Web 项目文档导航

本目录按资料用途分类，页面或功能相关的资料在各分类下集中存放。`discussion_record/` 保留原名称，作为讨论、决策与变更记录的入口。

## 目录与归档规则

| 目录 | 内容 | 新文件放置原则 |
| --- | --- | --- |
| [standards/](standards/) | 文档与协作规则 | 长期适用的讨论、记录与维护约定 |
| [visual/](visual/) | 美术、版面与页面设计要求 | 按页面或视觉主题建立子目录 |
| [features/](features/) | 功能、组件与交互说明 | 按功能领域组织，说明操作、行为与约束 |
| [prototypes/](prototypes/) | HTML 样稿、风格探索与评审材料 | 每套样稿保留独立目录，配套图片、样式和脚本一起保存 |
| [engineering/](engineering/) | 工程实施、检查与恢复说明 | 记录实际实现、验证结果及恢复方法 |
| [discussion_record/](discussion_record/) | 讨论、决策与变更记录 | 新议题使用 `YYYY-MM-DD-议题名称.md`；既有记录保留文件名 |
| [archive/](archive/) | 已被替代的方案与历史文档 | 按归档日期保存，并从当前方案链接到旧稿 |

## 页面与视觉设计

- [首页 V8 方案](visual/homepage/homepage-snowline-redesign.md)：当前首页基础视觉方案，包含浅色双色网点刊物与深色复古未来终端方向。
- [欢迎页方案](visual/welcome/welcome-snowline-redesign.md)：雪线起点的构图、入口与视觉要求。
- [生活日常背景方案](visual/life/life-snowline-background-plan.md)：风过雪原的背景、色彩与脚印要求。

首页后续调整另见[首页视觉层次、统一精选与雪风翻页方案](discussion_record/2026-11-02-首页视觉层次、统一精选与雪风翻页方案.md)。基础方案、后续确认记录和实施结果应结合阅读，不能仅凭文件名中的版本号判断最终要求。

## 功能与交互

| 领域 | 文档 |
| --- | --- |
| 编辑器概念 | [使用说明](features/editor/concepts.md)、[概念库设计说明](features/editor/concept-library-design.md) |
| 正文链接 | [WikiLink](features/editor/WIKILINKS.md) |
| 正文图片 | [图片存储与兼容说明](features/editor/IMAGE_STORAGE.md) |
| 内容发布与同步 | [发布状态及 Obsidian 同步](features/editor/OBSIDIAN_SYNC.md) |
| 互动小工具 | [第一组工具](features/play-tools/play-tools-plan.md)、[第二组工具](features/play-tools/play-tools-second-set.md) |
| 学习笔记 | [教材分类与星图方案](features/study/study-constellation-plan.md) |

## HTML 样稿与视觉探索

样稿用于预览与比较，不自动构成正式设计要求。项目目录中的 README、设计说明或评审入口提供具体使用方法。

| 主题 | 入口 |
| --- | --- |
| 十五种美术风格 | [风格图鉴](prototypes/style-atlas/index.html)、[说明](prototypes/style-atlas/README.md) |
| 博客整体方向 | [方案对比](prototypes/blog-directions/index.html)、[说明](prototypes/blog-directions/README.md) |
| 归档列表版面 | [方案对比](prototypes/archive-layout-review/index.html)、[说明](prototypes/archive-layout-review/README.md) |
| 文章封面 | [方案对比](prototypes/article-cover-review/index.html) |
| 分类与合集封面 | [方案对比](prototypes/group-cover-review/index.html) |
| 个人档案 | [评审入口](prototypes/profile-review/index.html)、[版面](prototypes/profile-layout-review.html)、[入口方案](prototypes/profile-entry-options.html)、[入口 V2](prototypes/profile-entry-v2.html) |
| 概念库 | [评审入口](prototypes/concept-library-review/index.html)、[设计说明](features/editor/concept-library-design.md) |
| 学习星图 | [方案对比](prototypes/study-constellation-review/index.html)、[说明](prototypes/study-constellation-review/README.md) |
| 工具画廊 | [方案对比](prototypes/tools-gallery-review/index.html)、[说明](prototypes/tools-gallery-review/README.md) |
| 欢迎页 | [入口样稿](prototypes/welcome-gateway.html) |
| 章节转场 | [方案对比](prototypes/chapter-transition-options.html) |
| 首页精选 | [动效样稿](prototypes/blog-featured-pulse.html) |

HTML 通常可以直接打开；需要本地服务或重新生成的样稿，按对应说明执行。文档中 `node doc/prototypes/...` 一类命令以仓库根目录为工作目录。

## 实施、讨论与历史

- [设计讨论准则](standards/design-discussion-guidelines.md)：设计讨论、总结审阅与正式记录的约定。
- [首页视觉层次、统一精选与雪风翻页方案](discussion_record/2026-11-02-首页视觉层次、统一精选与雪风翻页方案.md)：已确认的后续设计方向及待验证范围。
- [首页横向编排与统一精选实施记录](discussion_record/2026-11-02-首页横向编排与统一精选实施记录.md)：对应实施、检查与恢复记录，保留在原目录。
- [视觉重构工作留痕与功能保留表](discussion_record/snowline-redesign-change-log.md)：重构过程、功能承接与变更范围。
- [雪线 V8 重构实施与恢复记录](engineering/snowline-refactor-implementation.md)：基础重构的实际落地、备份与检查结果。
- [首页 V7 归档](archive/2026-11-02/homepage-snowline-redesign-v7.md)：已被 V8 替代的历史方案。

## 后续维护

1. 根目录只保留总导航，新增资料进入对应分类；没有合适分类时，先判断资料用途，避免建立长期堆积的“其他”目录。
2. 方案开头写明日期与状态，例如待讨论、已确认、已实施或已替代。设计确认、代码实施和线上发布分别说明，保留原有状态，不因本次整理而改变。
3. 功能说明、视觉要求、样稿与实施记录互相链接，避免维护多份重复的正式要求。样稿专用的使用说明和评审说明可留在样稿目录内。
4. 已确认讨论保留历史语义；后续结论明确说明替代范围。被替代的完整方案移入归档，并保留新旧关联。
5. 移动文件时同步更新 Markdown 链接、HTML 资源路径和脚本中的固定路径。截图、素材和生成脚本随样稿整体迁移，不按文件扩展名拆散。

本次整理将原 `design/` 改为 `prototypes/`、`standard/` 改为 `standards/`，并将根目录的方案、功能说明和实施记录分入上述分类；`discussion_record/` 名称及原有记录文件名保持不变。
