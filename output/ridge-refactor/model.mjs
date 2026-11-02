import fs from 'node:fs';
const r=p=>fs.readFileSync(p,'utf8').replaceAll('\r\n','\n');const w=(p,s)=>fs.writeFileSync(p,s);
let p='src/content/schema.ts',s=r(p).replaceAll('featured: z.boolean().default(false),','featured: z.boolean().default(false),\n  featuredOrder: z.number().int().min(0).default(1000000),');w(p,s);
p='keystatic.config.ts';s=r(p);s=s.replace("  featured: fields.checkbox({ label: '首页精选', defaultValue: false }),", "  featured: fields.checkbox({ label: '是否精选', defaultValue: false }),\n  featuredOrder: fields.integer({ label: '精选顺序', description: '数值越小越靠前；也可在工作区精选列表中统一调整。', defaultValue: 1000000, validation: { min: 0 } }),");
s=s.replaceAll("label: '首页列表精选'","label: '是否精选'").replaceAll("label: '首页卡片精选'","label: '是否精选'").replace('显示在首页左侧的精选文章列表，仅展示已公开文章，按发布时间从新到旧最多显示 8 篇。','加入首页统一精选，与项目、分类和合集共同按精选顺序展示；仅公开内容出现在前台。').replaceAll('显示在首页右侧的精选入口卡片区。','加入首页统一精选，与文章、项目、分类和合集共同排序。');
s=s.replace(/(featured: fields.checkbox\(\{\n\s+label: '是否精选',[\s\S]*?\n\s+\}\),)(?!\n\s+featuredOrder)/g,"$1\n      featuredOrder: fields.integer({ label: '精选顺序', description: '数值越小越靠前；与工作区精选列表共用。', defaultValue: 1000000, validation: { min: 0 } }),");w(p,s);
for(p of ['src/lib/keystatic-article-form.ts','src/lib/keystatic-folder-form.ts']){s=r(p).replaceAll('首页列表精选','是否精选').replaceAll('首页卡片精选','是否精选');s=s.replace("是否精选: ['featured', 27],","是否精选: ['featured', 27],\n    精选顺序: ['featured-order', 28],");s=s.replace("是否精选: ['featured',", "是否精选: ['featured',");w(p,s);}
p='src/components/home/types.ts';s=r(p).replace("kind?: 'category' | 'project' | 'collection';","kind?: 'article' | 'category' | 'project' | 'collection';\n  featured?: boolean;\n  featuredOrder?: number;");w(p,s);
p='src/components/HomePage.astro';s=r(p).replace("import '../styles/home.css';","import '../styles/home.css';\nimport { compareFeatured } from '../lib/featured';");s=s.replace("featured: '精选文章'","featured: '精选内容'").replace("featured: 'Ausgewählte Notizen'","featured: 'Ausgewählte Inhalte'").replace("featured: 'Selected notes'","featured: 'Selected work'");
s=s.replace('    group: categoryId ? categoryById.get(categoryId)?.data.group : undefined,','    group: categoryId ? categoryById.get(categoryId)?.data.group : undefined,\n    kind: \'article\',\n    featured: entry.data.featured,\n    featuredOrder: entry.data.featuredOrder,\n    coverImage: entry.data.coverImage,');
for(const kind of ['category','project','collection'])s=s.replace(`kind: '${kind}',`,`kind: '${kind}',\n      featured: entry.data.featured,\n      featuredOrder: entry.data.featuredOrder,`);
const a=s.indexOf('const featuredCards =');const b=s.indexOf('const lifeArticles =',a);s=s.slice(0,a)+`const featuredCards: HomeCard[] = [
  ...articleCards,
  ...Object.values(categoryCards).flatMap(items => items?.map(item => item.card) ?? []),
  ...projectCards,
  ...collectionCards,
].filter(card => card.featured && card.href !== '#').sort(compareFeatured);
`+s.slice(b);
s=s.replace('  <JourneyNavigation {labels} />','  <JourneyNavigation {labels} />\n  <div class="journey-deck">\n    <nav class="journey-chapter-controls" aria-label={locale === \'zh\' ? \'章节翻页\' : locale === \'de\' ? \'Kapitel wechseln\' : \'Chapter navigation\'} hidden>\n      <button type="button" data-chapter-prev aria-label={locale === \'zh\' ? \'上一章\' : locale === \'de\' ? \'Vorheriges Kapitel\' : \'Previous chapter\'}>←</button>\n      <span data-chapter-position></span>\n      <button type="button" data-chapter-next><span data-chapter-next-label></span> <span aria-hidden="true">→</span></button>\n    </nav>\n    <div class="snow-wind" data-snow-wind aria-hidden="true">{Array.from({length:28},(_,i)=><i style={`--snow-y:${(i*37)%100}%;--snow-x:${(i*23)%100}%;--snow-delay:${(i%7)*18}ms;--snow-length:${6+i%5*8}px`} />)}</div>');
s=s.replace('      destinations={featuredDestinations}\n','').replace('</main>','  </div>\n</main>');s=s.replace('data-journey data-pagefind-body','data-journey data-locale={locale} data-pagefind-body');w(p,s);
for(p of ['src/pages/blog.astro','src/pages/[locale]/blog.astro'])w(p,r(p).replace('  {jsonLd}','  fullViewport\n  {jsonLd}'));
