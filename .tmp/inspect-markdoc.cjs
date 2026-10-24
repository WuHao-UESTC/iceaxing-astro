const M=require('@markdoc/markdoc');const fs=require('node:fs');
const s=fs.readFileSync('src/content/articles/zh/markdoc-fixture/index.mdoc','utf8');
const ast=M.parse(s);
console.log(JSON.stringify(ast,null,2).slice(0,15000));
