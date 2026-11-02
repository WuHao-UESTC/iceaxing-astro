import fs from 'node:fs';
const p='src/styles/global.css';let s=fs.readFileSync(p,'utf8');
s=s.replace("@import './content.css';","@import './content.css';\n@import './expedition.css';");
const replacements={ '#f5f7f6':'#f3e9ce','#ffffff':'#f8f0dc','#e9efed':'#eadfc4','#172220':'#243b68','#687471':'#56617a','#d9e1de':'#b5ad9c','#2e7168':'#ad382e','#19574f':'#8d2d25','#dfece8':'#efddc4','#238578':'#ad382e','#0d1211':'#151c1c','#151c1a':'#101a19','#202b28':'#202a26','#eaf0ed':'#e0c79a','#9eaca7':'#b1a58c','#33413d':'#756449','#8ec9bc':'#dca66b','#b7e0d7':'#f0c994','#1f3933':'#302c22','#8de0cf':'#e5b575'};
// Limit palette replacement to the design tokens; do not alter unrelated content styles.
const end=s.indexOf('*,');let tokens=s.slice(0,end);for(const [a,b]of Object.entries(replacements))tokens=tokens.replaceAll(a,b);s=tokens+s.slice(end);fs.writeFileSync(p,s);
