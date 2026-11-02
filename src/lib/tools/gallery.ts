import { localizedPath, type Locale } from '../../i18n/config';
import { playIds, playTools } from './play-catalog';

export const galleryCategories = ['all', 'perception', 'create', 'explore', 'practical'] as const;
export type GalleryCategory = (typeof galleryCategories)[number];
type Category = Exclude<GalleryCategory, 'all'>;
export interface GalleryTool {
  id: string;
  title: string;
  description: string;
  href: string;
  category: Category;
  tag: string;
}

const decorations: Partial<Record<string, { category: Category; tag: string }>> = {
  fireworks: { category: 'create', tag: 'CLICK / BLOOM' },
  reverie: { category: 'create', tag: 'MOMENTUM / INK' },
  'guess-seconds': { category: 'perception', tag: 'FEEL / TIME' },
  ripples: { category: 'explore', tag: 'TOUCH / WATER' },
  'blind-circle': { category: 'perception', tag: 'DRAW / REVEAL' },
  gravity: { category: 'explore', tag: 'MASS / ORBIT' },
  reaction: { category: 'perception', tag: 'WAIT / REACT' },
  'color-music': { category: 'create', tag: 'COLOR / SOUND' },
  'stack-stones': { category: 'explore', tag: 'WEIGHT / BALANCE' },
  'visual-memory': { category: 'perception', tag: 'SEE / REMEMBER' },
  'color-sense': { category: 'perception', tag: 'SHADE / NOTICE' },
  refraction: { category: 'explore', tag: 'PRISM / SPECTRUM' },
  'fading-words': { category: 'create', tag: 'WORDS / WIND' },
  'snow-trails': { category: 'explore', tag: 'WALK / SNOW' },
  constellation: { category: 'create', tag: 'STARS / STORIES' },
  pomodoro: { category: 'practical', tag: 'FOCUS / TIMER' },
  'smith-chart': { category: 'practical', tag: 'RF / ENGINEERING' },
};

const builtins = {
  fireworks: {
    zh: { title: '放烟花', description: '点击夜空，让一束烟花在指尖绽放。' },
    en: { title: 'Fireworks', description: 'Touch the night sky and let a firework bloom.' },
    de: {
      title: 'Feuerwerk',
      description: 'Berühre den Nachthimmel und lass ein Feuerwerk erblühen.',
    },
  },
  reverie: {
    zh: { title: '随想', description: '推一把画笔，让惯性留下意外的线条。' },
    en: { title: 'Reverie', description: 'Nudge a pen and let momentum leave unexpected lines.' },
    de: {
      title: 'Gedankenspiel',
      description: 'Gib dem Stift einen Schubs und lass den Schwung zeichnen.',
    },
  },
  'guess-seconds': {
    zh: { title: '猜秒数', description: '藏起时钟，试试自己的时间感。' },
    en: { title: 'Guess the Seconds', description: 'Hide the clock and trust your sense of time.' },
    de: { title: 'Sekunden schätzen', description: 'Verstecke die Uhr und teste dein Zeitgefühl.' },
  },
  pomodoro: {
    zh: { title: '番茄钟', description: '留出一段时间，专注做好一件事。' },
    en: { title: 'Pomodoro Timer', description: 'Make a little time to focus on one thing.' },
    de: {
      title: 'Pomodoro-Timer',
      description: 'Nimm dir Zeit, um dich auf eine Sache zu konzentrieren.',
    },
  },
  'smith-chart': {
    zh: { title: '史密斯圆图', description: '探索阻抗、传输线与匹配的关系。' },
    en: {
      title: 'Smith Chart',
      description: 'Explore impedance, transmission lines, and matching.',
    },
    de: { title: 'Smith-Diagramm', description: 'Erkunde Impedanz, Leitungen und Anpassung.' },
  },
};

export function getGalleryTools(locale: Locale): GalleryTool[] {
  const entries = [
    ...Object.entries(builtins).map(([id, details]) => ({ id, ...details[locale] })),
    ...playIds.map((id) => ({ id, ...playTools[id][locale] })),
  ];
  const order = Object.keys(decorations);
  return entries
    .map((entry) => ({
      ...entry,
      href: localizedPath(locale, `/tools/${entry.id}`),
      ...(decorations[entry.id] ?? { category: 'create' as const, tag: 'PLAY / EXPLORE' }),
    }))
    .sort((a, b) => {
      const left = order.indexOf(a.id),
        right = order.indexOf(b.id);
      return (left < 0 ? order.length : left) - (right < 0 ? order.length : right);
    });
}

export const galleryCopy = {
  zh: {
    title: '在线工具',
    eyebrow: 'SMALL TOOLS / OPEN POSSIBILITIES',
    heading: ['好奇心，', '可以在这里玩一会儿。'],
    description: [
      '从一次点击开始，让时间、声音与引力变得可触摸。',
      '也给专注、探索和偶然，留一点位置。',
    ],
    categories: {
      all: '全部',
      perception: '感知',
      create: '创造',
      explore: '漫游',
      practical: '实用',
    },
    search: '找一个小工具',
    count: '个工具',
    empty: '暂时没找到，换个名字再试试。',
    footer: '给每一种好奇心，留一件小玩具。',
  },
  en: {
    title: 'Tools',
    eyebrow: 'SMALL TOOLS / OPEN POSSIBILITIES',
    heading: ['A little room', 'for your curiosity.'],
    description: [
      'Make time, sound, and gravity tangible with a click.',
      'Leave a little room for focus, discovery, and chance.',
    ],
    categories: {
      all: 'All',
      perception: 'Perception',
      create: 'Create',
      explore: 'Explore',
      practical: 'Practical',
    },
    search: 'Find a little tool',
    count: 'tools',
    empty: 'Nothing here yet. Try another search.',
    footer: 'A little plaything for every kind of curiosity.',
  },
  de: {
    title: 'Werkzeuge',
    eyebrow: 'SMALL TOOLS / OPEN POSSIBILITIES',
    heading: ['Ein kleiner Spielraum', 'für deine Neugier.'],
    description: [
      'Erlebe Zeit, Klang und Gravitation mit einem Klick.',
      'Lass Raum für Konzentration, Entdeckungen und Zufall.',
    ],
    categories: {
      all: 'Alle',
      perception: 'Wahrnehmung',
      create: 'Gestalten',
      explore: 'Entdecken',
      practical: 'Praktisch',
    },
    search: 'Ein Werkzeug finden',
    count: 'Werkzeuge',
    empty: 'Nichts gefunden. Versuche einen anderen Suchbegriff.',
    footer: 'Ein kleines Spielzeug für jede Art von Neugier.',
  },
} as const;
