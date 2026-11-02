import fs from 'node:fs';const r=p=>fs.readFileSync(p,'utf8').replaceAll('\r\n','\n'),w=(p,s)=>fs.writeFileSync(p,s);
let p='src/layouts/BaseLayout.astro',s=r(p).replace('  standalone?: boolean;','  standalone?: boolean;\n  sidebarNavigation?: boolean;').replace('  standalone = false,','  standalone = false,\n  sidebarNavigation = false,').replace('{!standalone && <SiteHeader','{!standalone && !sidebarNavigation && <SiteHeader');w(p,s);
for(p of ['src/pages/blog.astro','src/pages/[locale]/blog.astro'])w(p,r(p).replace('  fullViewport\n','  fullViewport\n  sidebarNavigation\n'));
p='src/components/HomePage.astro';w(p,r(p).replace('<JourneyNavigation {labels} />','<JourneyNavigation {labels} {locale} />'));
p='src/components/home/JourneyNavigation.astro';s=r(p).replace("import type { HomeLabels } from './types';","import type { HomeLabels } from './types';\nimport { localizedPath, type Locale } from '../../i18n/config';\nimport { getMessages } from '../../i18n/messages';\nimport ThemeToggle from '../ThemeToggle.astro';").replace('  labels: HomeLabels;','  labels: HomeLabels;\n  locale: Locale;').replace('const { labels } = Astro.props;','const { labels, locale } = Astro.props;\nconst messages = getMessages(locale);\nconst globalLinks = [\n { label: messages.nav.articles, path: \'/articles\' },\n { label: messages.nav.projects, path: \'/projects\' },\n { label: messages.nav.ramblings, path: \'/daily-ramblings\' },\n { label: messages.nav.tools, path: \'/tools\' },\n { label: messages.nav.about, path: \'/about\' },\n { label: messages.nav.profile, path: \'/profile\' },\n { label: messages.nav.friends, path: \'/friends\' },\n { label: \'RSS\', path: \'/rss.xml\' },\n];');s=s.replace('<nav class="journey-navigation" aria-label={labels.route} data-journey-nav>','<nav class="journey-navigation" aria-label={messages.nav.primary} data-journey-nav data-pagefind-ignore>');s=s.replace('<div class="ridge-nav-heading" aria-hidden="true">\n    <span>ICEAXING</span>','<div class="ridge-nav-heading">\n    <a class="ridge-brand" href={localizedPath(locale, \'/blog\')} aria-label={`${messages.meta.title} — ${messages.nav.home}`}>ICEAXING<span aria-hidden="true">.</span></a>');s=s.replace('  <ol>','  <ol aria-label={labels.route}>');const a=s.indexOf('  <small class="ridge-nav-foot"');s=s.slice(0,a)+`  <div class="ridge-utilities">
    <div class="ridge-global-links">
      {globalLinks.map(link=><a href={localizedPath(locale,link.path)}>{link.label}<span aria-hidden="true">↗</span></a>)}
    </div>
    <div class="ridge-tools">
      <button class="ridge-search" type="button" data-search-open aria-label={messages.nav.search} aria-haspopup="dialog" aria-keyshortcuts="Control+k Meta+k /" title={messages.nav.search+' (Ctrl / ⌘ K)'}><span aria-hidden="true">⌕</span><span>{messages.nav.search}</span></button>
      <ThemeToggle label={messages.common.switchTheme} />
    </div>
    <div class="ridge-languages" role="group" aria-label={messages.common.language}>
      {(['zh','en','de'] as const).map(language=><a href={localizedPath(language,'/blog')} data-sidebar-language lang={language==='zh'?'zh-CN':language} aria-current={locale===language?'page':undefined}>{language.toUpperCase()}</a>)}
    </div>
  </div>
</nav>
`;w(p,s);
p='src/styles/ridge-editorial.css';w(p,r(p).replace('--journey-height: calc(100dvh - 4rem);','--journey-height: 100dvh;'));
p='src/scripts/home-journey.ts';s=r(p).replace("    if (prev) prev.disabled = active === 0;", "    home.querySelectorAll<HTMLAnchorElement>('[data-sidebar-language]').forEach(link=>{link.hash=panels[active]?.id??'';});\n    if (prev) prev.disabled = active === 0;");w(p,s);
