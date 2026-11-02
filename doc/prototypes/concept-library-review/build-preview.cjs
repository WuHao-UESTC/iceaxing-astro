const fs = require('node:fs');
const path = require('node:path');
const fragment = fs.readFileSync(path.join(__dirname, 'concept-library.html'), 'utf8');
const prefix = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>浮动概念查找 · 精简审阅样稿</title>
<style>
:root{color-scheme:light dark;background:light-dark(#f5f7f6,#101716)}
body{margin:0;padding:20px 12px;max-width:1140px;margin-inline:auto}
@media(max-width:640px){body{padding:8px}}
</style>
</head>
<body>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), prefix + fragment + '\n</body>\n</html>\n');
console.log('Standalone preview generated.');
