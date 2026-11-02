# 在线工具列表布局样稿

本目录为独立 HTML 样稿，不替换正式 Astro 页面。全部卡片透明、无边框，上方工具特点预览，下方名称与简介。

- A `a.html`：线描画廊，留白与精细线稿。
- B `b.html`：微缩游乐场，悬浮微缩场景与暖色强调。
- C `c.html`：地景图册，几何切面与编号。
- `index.html`：比较入口，附桌面和手机预览。

三版均覆盖 17 个已有工具。桌面四列、平板两列、手机一列，支持明暗切换、分类和搜索。
插画为本地 SVG，无外部图片、字体或构建依赖；卡片打开已有本地工具页面。

直接打开 HTML，或运行：

```powershell
node doc/prototypes/tools-gallery-review/serve.mjs
```

浏览 `http://127.0.0.1:4326/`。使用 `node doc/prototypes/tools-gallery-review/generate.mjs` 重新生成 HTML。

## 正式采用 B 版

已将 B 版的微缩插画、透明无边框卡片和四列布局接入 `/tools`、`/en/tools`、`/de/tools`。
标题、背景和站点导航沿用原站主题色，没有采用样稿 B 的全页暖色覆盖。
标题介绍不再写固定工具数量；分类计数从当前工具列表计算。

正式组件为 `src/components/tools/ToolsGallery.astro`，工具目录从 `playIds` / `playTools`
及已有实用工具读取。新注册工具会进入列表，缺少专用插画或分类时提供默认展示。
原 HTML 样稿保留为设计档案，正式页面不加载样稿脚本和方案切换栏。

`live-check.mjs` 已验证三语页面的四列／两列／一列、320px 无横向溢出、
原站明暗配色、动态分类和计数、搜索与空状态、德语变音符搜索、语言切换路径、
标题无固定数量文案，以及单个工具页面不受影响。正式页面截图以 `live-b-` 开头。
