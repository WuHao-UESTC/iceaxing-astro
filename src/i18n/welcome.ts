import type { Locale } from './config';

export const welcomeMessages = {
  zh: {
    greeting: '你好，我是',
    welcome: '欢迎来访',
    title: '很高兴，在这里遇见你。',
    introduction: ['一边是我的经历，一边是沿途的记录。', '选一条感兴趣的路，我们慢慢认识。'],
    start: '从这里出发',
    resume: '看看我的个人简历',
    resumeDescription: ['认识我，以及我正在做的事。', '经历、方向与项目，一起展开。'],
    blog: '逛逛我的博客',
    blogDescription: ['翻翻笔记，也看看生活。', '技术、阅读与不期而遇的想法。'],
    invitation: '不必赶路，随意逛逛。',
    baseCamp: 'BASE CAMP / 旅程的起点',
    curiosity: '慢慢探索，保持好奇。',
  },
  en: {
    greeting: 'Hello, I’m',
    welcome: 'Welcome',
    title: 'Glad our paths crossed.',
    introduction: [
      'My story on one path. Notes from the journey on the other.',
      'Choose a way in. Let’s get to know each other.',
    ],
    start: 'CHOOSE YOUR PATH',
    resume: 'Get to know me',
    resumeDescription: [
      'Meet the person behind this site.',
      'My background, interests, and projects.',
    ],
    blog: 'Explore my blog',
    blogDescription: [
      'A little technology. A little everyday life.',
      'Notes, reading, and unexpected ideas.',
    ],
    invitation: 'Take your time. Follow your curiosity.',
    baseCamp: 'BASE CAMP / THE JOURNEY BEGINS',
    curiosity: 'Keep exploring. Stay curious.',
  },
  de: {
    greeting: 'Hallo, ich bin',
    welcome: 'Willkommen',
    title: 'Schön, dass du hier bist.',
    introduction: [
      'Hier mein Werdegang. Dort meine Notizen von unterwegs.',
      'Wähle einen Weg. Lernen wir uns kennen.',
    ],
    start: 'WÄHLE DEINEN WEG',
    resume: 'Lerne mich kennen',
    resumeDescription: [
      'Der Mensch hinter dieser Website.',
      'Mein Werdegang, meine Interessen und Projekte.',
    ],
    blog: 'Entdecke meinen Blog',
    blogDescription: [
      'Technik und kleine Entdeckungen im Alltag.',
      'Notizen, Bücher und neue Gedanken.',
    ],
    invitation: 'Lass dir Zeit. Folge deiner Neugier.',
    baseCamp: 'BASISLAGER / DIE REISE BEGINNT',
    curiosity: 'Weiter entdecken. Neugierig bleiben.',
  },
} satisfies Record<
  Locale,
  {
    greeting: string;
    welcome: string;
    title: string;
    introduction: string[];
    start: string;
    resume: string;
    resumeDescription: string[];
    blog: string;
    blogDescription: string[];
    invitation: string;
    baseCamp: string;
    curiosity: string;
  }
>;
