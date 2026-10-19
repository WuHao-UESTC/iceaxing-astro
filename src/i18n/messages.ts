import type { Locale } from './config';

export interface Messages {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    technology: string;
    life: string;
    articles: string;
    projects: string;
    tools: string;
    about: string;
    profile: string;
    friends: string;
    menu: string;
    primary: string;
    search: string;
  };
  home: {
    eyebrow: string;
    heading: string;
    introduction: string;
    subscribe: string;
    featured: string;
    latest: string;
    categories: string;
    ongoingProjects: string;
    usefulLinks: string;
    empty: string;
    phase: string;
  };
  common: {
    switchTheme: string;
    language: string;
  };
}

const messages: Record<Locale, Messages> = {
  zh: {
    meta: {
      title: 'iceaxing',
      description: '关于技术、生活与沿途思考的个人博客。',
    },
    nav: {
      home: '首页',
      technology: '技术栈',
      life: '生活日常',
      articles: '文章',
      projects: '项目',
      tools: '工具',
      about: '关于',
      profile: '个人档案',
      friends: '友链',
      menu: '打开导航菜单',
      primary: '主导航',
      search: '搜索',
    },
    home: {
      eyebrow: '技术 · 生活 · 思考',
      heading: '写下值得反复阅读的东西。',
      introduction: '一个简洁、长久且专注于内容的个人博客。',
      subscribe: '订阅更新',
      featured: '精选文章',
      latest: '最新文章',
      categories: '分类',
      ongoingProjects: '进行中的项目',
      usefulLinks: '更多入口',
      empty: '内容将在迁移阶段接入。',
      phase: 'Astro 基础骨架已经就绪',
    },
    common: { switchTheme: '切换明暗模式', language: '语言' },
  },
  en: {
    meta: {
      title: 'iceaxing',
      description: 'A personal blog about technology, life, and thoughts along the way.',
    },
    nav: {
      home: 'Home',
      technology: 'Technology',
      life: 'Daily life',
      articles: 'Articles',
      projects: 'Projects',
      tools: 'Tools',
      about: 'About',
      profile: 'Profile',
      friends: 'Friends',
      menu: 'Open navigation menu',
      primary: 'Primary navigation',
      search: 'Search',
    },
    home: {
      eyebrow: 'Technology · Life · Notes',
      heading: 'Writing worth returning to.',
      introduction: 'A simple, durable personal blog designed around its content.',
      subscribe: 'Subscribe',
      featured: 'Featured',
      latest: 'Latest articles',
      categories: 'Categories',
      ongoingProjects: 'Ongoing projects',
      usefulLinks: 'More',
      empty: 'Content will be connected during migration.',
      phase: 'The Astro foundation is ready',
    },
    common: { switchTheme: 'Switch color mode', language: 'Language' },
  },
  de: {
    meta: {
      title: 'iceaxing',
      description: 'Ein persönlicher Blog über Technik, Leben und Gedanken unterwegs.',
    },
    nav: {
      home: 'Start',
      technology: 'Technik',
      life: 'Alltag',
      articles: 'Artikel',
      projects: 'Projekte',
      tools: 'Werkzeuge',
      about: 'Über',
      profile: 'Profil',
      friends: 'Freunde',
      menu: 'Navigationsmenü öffnen',
      primary: 'Hauptnavigation',
      search: 'Suchen',
    },
    home: {
      eyebrow: 'Technik · Leben · Notizen',
      heading: 'Texte, zu denen man zurückkehrt.',
      introduction: 'Ein einfacher, beständiger persönlicher Blog mit Fokus auf Inhalte.',
      subscribe: 'Abonnieren',
      featured: 'Ausgewählt',
      latest: 'Neueste Artikel',
      categories: 'Kategorien',
      ongoingProjects: 'Laufende Projekte',
      usefulLinks: 'Mehr',
      empty: 'Die Inhalte werden während der Migration angebunden.',
      phase: 'Das Astro-Grundgerüst ist bereit',
    },
    common: { switchTheme: 'Farbschema wechseln', language: 'Sprache' },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
