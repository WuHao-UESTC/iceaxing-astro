import type { Locale } from '../../i18n/config';
import { morePlayIds, morePlayTools, morePlayLabels } from './play-more-catalog';

export const playIds = [
  'blind-circle',
  'gravity',
  'reaction',
  'ripples',
  'color-music',
  'fading-words',
  ...morePlayIds,
] as const;
export type PlayToolId = (typeof playIds)[number];
export function isPlayTool(value: string): value is PlayToolId {
  return playIds.includes(value as PlayToolId);
}
type Detail = { title: string; description: string; hint: string };
export const playTools: Record<PlayToolId, Record<Locale, Detail>> = {
  ...morePlayTools,
  'blind-circle': {
    zh: {
      title: '盲画圆',
      description: '看不见笔迹的时候，你能画出多圆的圆？',
      hint: '点击开始，按住画布一笔画圆，松手揭晓。',
    },
    en: {
      title: 'Blind Circle',
      description: 'How round can you draw when the line is hidden?',
      hint: 'Start, then draw one circle while holding the canvas. Release to reveal.',
    },
    de: {
      title: 'Blind einen Kreis zeichnen',
      description: 'Wie rund zeichnest du ohne sichtbare Linie?',
      hint: 'Starte und zeichne einen Kreis auf der Fläche. Loslassen enthüllt die Linie.',
    },
  },
  gravity: {
    zh: {
      title: '引力',
      description: '给一颗小球方向，让引力续写它的轨道。',
      hint: '空白处轻点放置引力点，拖动发射小球；拖动引力点移动，轻点选中。空格暂停。',
    },
    en: {
      title: 'Gravity',
      description: 'Give a ball direction. Let gravity write its orbit.',
      hint: 'Tap empty space for a gravity well; drag to launch a ball. Drag wells to move, tap to select. Space pauses.',
    },
    de: {
      title: 'Gravitation',
      description: 'Gib einer Kugel Richtung und beobachte ihre Bahn.',
      hint: 'Freie Fläche antippen: Gravitationspunkt. Ziehen: Kugel starten. Punkte ziehen oder antippen. Leertaste pausiert.',
    },
  },
  reaction: {
    zh: {
      title: '一瞬',
      description: '等待一道光，接住那个瞬间。',
      hint: '点击开始，等到“现在！”出现后点击画面或按空格。完成五轮看中位成绩。',
    },
    en: {
      title: 'An Instant',
      description: 'Wait for the light. Catch the moment.',
      hint: 'Start, wait for “Now!”, then click the canvas or press Space. Complete five rounds for your median.',
    },
    de: {
      title: 'Ein Augenblick',
      description: 'Warte auf das Licht. Fange den Moment ein.',
      hint: 'Starte, warte auf „Jetzt!“, klicke dann oder drücke die Leertaste. Fünf Runden ergeben deinen Median.',
    },
  },
  ripples: {
    zh: {
      title: '余波',
      description: '指尖经过，水面记得。',
      hint: '点击泛起涟漪，按住持续扰动，拖动划过水面。',
    },
    en: {
      title: 'Ripples',
      description: 'Your touch passes. The water remembers.',
      hint: 'Tap for a ripple, hold to disturb the surface, or drag through the water.',
    },
    de: {
      title: 'Nachklang im Wasser',
      description: 'Die Berührung vergeht. Das Wasser erinnert sich.',
      hint: 'Tippen erzeugt Wellen, Halten bewegt das Wasser, Ziehen streicht darüber.',
    },
  },
  'color-music': {
    zh: {
      title: '听见颜色',
      description: '点一束光，听见一段旋律。',
      hint: '左右决定音高，上下决定明亮程度。拖动演奏，录下 8 秒，让颜色循环歌唱。',
    },
    en: {
      title: 'Hear the Colors',
      description: 'Touch a light. Hear a melody.',
      hint: 'Horizontal position sets pitch; vertical position sets brightness. Drag to play, record eight seconds, and loop.',
    },
    de: {
      title: 'Farben hören',
      description: 'Berühre ein Licht. Höre eine Melodie.',
      hint: 'Horizontal: Tonhöhe. Vertikal: Klanghelligkeit. Ziehe zum Spielen oder nimm acht Sekunden als Schleife auf.',
    },
  },
  'fading-words': {
    zh: {
      title: '消失的字',
      description: '写下来，留下，或者让它飘走。',
      hint: '停笔 3 秒后提示，再等 2 秒文字开始飘散。组词时不计时，文字只留在本页。',
    },
    en: {
      title: 'Fading Words',
      description: 'Write it. Keep it. Or let it drift away.',
      hint: 'After three quiet seconds a prompt appears; two seconds later the words drift away. Text stays in this page only.',
    },
    de: {
      title: 'Verwehende Worte',
      description: 'Schreibe. Bewahre. Oder lass los.',
      hint: 'Nach drei Sekunden erscheint ein Hinweis, zwei Sekunden später verwehen die Worte. Text bleibt nur auf dieser Seite.',
    },
  },
};

const labels = {
  ...morePlayLabels,
  start: ['开始', 'Start', 'Start'],
  retry: ['再来一次', 'Try again', 'Noch einmal'],
  pause: ['暂停', 'Pause', 'Pause'],
  resume: ['继续', 'Resume', 'Weiter'],
  clear: ['清空', 'Clear', 'Leeren'],
  save: ['保存图片', 'Save image', 'Bild speichern'],
  saved: ['图片已保存', 'Image saved', 'Bild gespeichert'],
  saveError: ['图片保存失败，请重试', 'Could not save. Try again.', 'Speichern fehlgeschlagen.'],
  readyCircle: ['准备好后点击开始', 'Press Start when ready', 'Drücke Start, wenn du bereit bist'],
  draw: ['按住画布，一笔画圆', 'Hold and draw one circle', 'Halte und zeichne einen Kreis'],
  drawing: [
    '笔迹藏起来了，松手揭晓',
    'Your line is hidden. Release to reveal.',
    'Die Linie ist verborgen. Loslassen enthüllt sie.',
  ],
  invalidCircle: [
    '请画一个完整、足够大的圆，再试一次',
    'Draw a complete, larger circle and try again',
    'Bitte zeichne einen vollständigen, größeren Kreis',
  ],
  score: ['综合得分', 'Score', 'Gesamtwert'],
  roundness: ['圆润', 'Roundness', 'Rundheit'],
  closure: ['闭合', 'Closure', 'Schluss'],
  coverage: ['完整', 'Coverage', 'Vollständigkeit'],
  attempts: ['尝试次数', 'Attempts', 'Versuche'],
  best: ['本页最佳', 'Page best', 'Seitenbestwert'],
  trails: ['轨迹', 'Trails', 'Spuren'],
  strength: ['引力强度', 'Gravity strength', 'Gravitationsstärke'],
  remove: ['删除选中点', 'Delete selected well', 'Ausgewählten Punkt löschen'],
  selected: ['已选中引力点', 'Gravity well selected', 'Gravitationspunkt ausgewählt'],
  balls: ['小球', 'Balls', 'Kugeln'],
  wells: ['引力点', 'Wells', 'Gravitationspunkte'],
  limit: ['已达到数量上限', 'Object limit reached', 'Objektlimit erreicht'],
  wait: ['等待光出现……', 'Wait for the light…', 'Warte auf das Licht…'],
  now: ['现在！', 'Now!', 'Jetzt!'],
  early: ['抢跑了，本轮重来', 'Too soon! Retry this round.', 'Zu früh! Wiederhole diese Runde.'],
  interrupted: [
    '当前轮已中断，请重新开始',
    'Round interrupted. Please restart.',
    'Runde unterbrochen. Bitte neu starten.',
  ],
  round: ['轮次', 'Round', 'Runde'],
  median: ['中位成绩', 'Median', 'Median'],
  fastest: ['最快', 'Fastest', 'Schnellster Wert'],
  gentle: ['轻柔', 'Gentle', 'Sanft'],
  vivid: ['清晰', 'Vivid', 'Deutlich'],
  calm: ['恢复平静', 'Calm water', 'Wasser beruhigen'],
  record: ['录制 8 秒', 'Record 8 seconds', '8 Sekunden aufnehmen'],
  recording: ['录制中', 'Recording', 'Aufnahme'],
  stop: ['停止循环', 'Stop loop', 'Schleife stoppen'],
  play: ['播放循环', 'Play loop', 'Schleife abspielen'],
  loop: ['循环播放中', 'Looping', 'Schleife läuft'],
  volume: ['音量', 'Volume', 'Lautstärke'],
  mute: ['静音', 'Mute', 'Stumm'],
  unmute: ['取消静音', 'Unmute', 'Ton an'],
  audioError: [
    '浏览器无法启用声音，光点仍可使用',
    'Audio unavailable. You can still paint lights.',
    'Audio nicht verfügbar. Lichtpunkte funktionieren weiterhin.',
  ],
  emptyLoop: ['先录下一段旋律吧', 'Record a melody first', 'Nimm zuerst eine Melodie auf'],
  placeholder: [
    '写一句话，或者一段心事……',
    'A sentence, a thought, something to let go…',
    'Ein Satz, ein Gedanke, etwas zum Loslassen…',
  ],
  keep: ['留下', 'Keep', 'Bewahren'],
  release: ['放走', 'Let go', 'Loslassen'],
  edit: ['继续写', 'Keep writing', 'Weiterschreiben'],
  prompt: [
    '继续写，或让它飘走。',
    'Keep writing, or let it drift away.',
    'Schreibe weiter oder lass die Worte verwehen.',
  ],
  kept: ['这句话留下了', 'These words will stay', 'Diese Worte bleiben'],
  drifting: ['让它慢慢飘走……', 'Let it drift away…', 'Lass es langsam verwehen…'],
  quiet: ['从一张空白开始', 'Begin with a blank page', 'Beginne mit einem leeren Blatt'],
  autoPaused: [
    '已暂停，点击继续',
    'Paused. Resume when ready.',
    'Pausiert. Bei Bedarf fortsetzen.',
  ],
} satisfies Record<string, readonly [string, string, string]>;
export type PlayLabels = Record<keyof typeof labels, string>;
export function playLabels(locale: Locale): PlayLabels {
  const index = locale === 'zh' ? 0 : locale === 'en' ? 1 : 2;
  return Object.fromEntries(
    Object.entries(labels).map(([key, value]) => [key, value[index]]),
  ) as PlayLabels;
}
