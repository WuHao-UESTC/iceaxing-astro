import type { Locale } from '../../i18n/config';
export const morePlayIds = [
  'stack-stones',
  'visual-memory',
  'color-sense',
  'refraction',
  'snow-trails',
  'constellation',
] as const;
type Detail = { title: string; description: string; hint: string };
export const morePlayTools = {
  'stack-stones': {
    zh: {
      title: '叠石',
      description: '让每一块石头，找到自己的平衡。',
      hint: '拖动左上角的新石头，或移动已有石头；Q / E 或按钮旋转。松手后重力生效，空格暂停。',
    },
    en: {
      title: 'Stacking Stones',
      description: 'Let each stone find its balance.',
      hint: 'Drag the next stone from the upper left, or move existing stones. Q / E or buttons rotate. Release to drop. Space pauses.',
    },
    de: {
      title: 'Steine stapeln',
      description: 'Lass jeden Stein sein Gleichgewicht finden.',
      hint: 'Ziehe den nächsten Stein von links oben oder bewege vorhandene Steine. Q / E dreht, Loslassen lässt ihn fallen. Leertaste pausiert.',
    },
  },
  'visual-memory': {
    zh: {
      title: '记一眼',
      description: '光点消失以后，你还记得它们在哪里吗？',
      hint: '开始后观察光点 2.5 秒；光点隐藏后，点击你记得的位置。次序不限，完成后揭晓。',
    },
    en: {
      title: 'One Glance',
      description: 'When the lights disappear, where do you remember them?',
      hint: 'Watch the points for 2.5 seconds. When hidden, click their remembered positions in any order to reveal your accuracy.',
    },
    de: {
      title: 'Ein Blick',
      description: 'Weißt du noch, wo die Lichter waren?',
      hint: 'Präge dir die Punkte 2,5 Sekunden lang ein. Klicke danach ihre Positionen in beliebiger Reihenfolge an.',
    },
  },
  'color-sense': {
    zh: {
      title: '辨色',
      description: '找出那一块，细微不同的颜色。',
      hint: '点击颜色略有不同的色块。方向键移动选择，回车确认。可选不限时或 30 秒挑战。',
    },
    en: {
      title: 'Color Sense',
      description: 'Find the shade that is just a little different.',
      hint: 'Click the different shade. Arrow keys move the selection; Enter confirms. Choose untimed play or a 30-second challenge.',
    },
    de: {
      title: 'Farbgefühl',
      description: 'Finde den kleinen Unterschied im Farbton.',
      hint: 'Klicke den anderen Farbton an. Pfeiltasten wählen, Eingabe bestätigt. Ohne Zeitlimit oder 30-Sekunden-Herausforderung.',
    },
  },
  refraction: {
    zh: {
      title: '折光',
      description: '移动一块玻璃，改变一道光的旅程。',
      hint: '拖动物体，选中后旋转。棱镜分散白光，镜面反射；挑战模式中，让光照到圆形目标。',
    },
    en: {
      title: 'Refraction',
      description: 'Move a piece of glass. Change the journey of light.',
      hint: 'Drag objects and rotate the selection. Prisms disperse white light; mirrors reflect. In challenge mode, illuminate the target.',
    },
    de: {
      title: 'Lichtbrechung',
      description: 'Bewege Glas und verändere den Weg des Lichts.',
      hint: 'Ziehe und drehe Objekte. Prismen zerlegen weißes Licht, Spiegel reflektieren. Beleuchte im Spielmodus das Ziel.',
    },
  },
  'snow-trails': {
    zh: {
      title: '雪迹',
      description: '走过新雪，留下一段会慢慢消失的路。',
      hint: 'WASD 行走，或点击、拖动指定目的地。降雪调为 0 可保留脚印，空格暂停。',
    },
    en: {
      title: 'Snow Trails',
      description: 'Walk through fresh snow. Leave a path that fades.',
      hint: 'Walk with WASD, or tap and drag to set your destination. Set snowfall to 0 to preserve footprints. Space pauses.',
    },
    de: {
      title: 'Spuren im Schnee',
      description: 'Gehe durch frischen Schnee und hinterlasse vergängliche Spuren.',
      hint: 'WASD zum Gehen oder ein Ziel antippen und ziehen. Schneefall 0 bewahrt die Spuren. Leertaste pausiert.',
    },
  },
  constellation: {
    zh: {
      title: '连成星座',
      description: '在这片星空里，认出属于你的形状。',
      hint: '依次点击星星连线，重复连接可取消。给星座命名，完成卡片并保存；使用同一种子重现星空。',
    },
    en: {
      title: 'Your Constellation',
      description: 'Find a shape of your own in the stars.',
      hint: 'Click stars to connect them; reconnect to remove a line. Name your constellation, finish its card, and save. A seed recreates the sky.',
    },
    de: {
      title: 'Dein Sternbild',
      description: 'Entdecke deine eigene Form am Himmel.',
      hint: 'Verbinde Sterne durch Klicken; erneut verbinden entfernt die Linie. Benenne und speichere die Karte. Der Startwert erzeugt denselben Himmel.',
    },
  },
} satisfies Record<(typeof morePlayIds)[number], Record<Locale, Detail>>;
export const morePlayLabels = {
  nextStone: ['换一块', 'New stone', 'Neuer Stein'],
  rotateLeft: ['左旋', 'Rotate left', 'Links drehen'],
  rotateRight: ['右旋', 'Rotate right', 'Rechts drehen'],
  friction: ['摩擦', 'Friction', 'Reibung'],
  height: ['当前高度', 'Height', 'Höhe'],
  stones: ['石头', 'Stones', 'Steine'],
  stoneReady: [
    '拖动左上角的石头开始',
    'Drag the stone in the upper left to begin',
    'Ziehe den Stein links oben, um zu beginnen',
  ],
  memorize: ['记住这些光点……', 'Remember these lights…', 'Merke dir diese Lichter…'],
  recall: [
    '点击你记得的位置',
    'Click the positions you remember',
    'Klicke die gemerkten Positionen an',
  ],
  points: ['光点', 'Points', 'Punkte'],
  deviation: ['平均位置偏差', 'Mean position error', 'Mittlere Positionsabweichung'],
  quietMode: ['不限时', 'Untimed', 'Ohne Zeitlimit'],
  timedMode: ['30 秒挑战', '30-second challenge', '30-Sekunden-Spiel'],
  correct: ['找到了', 'Found it', 'Gefunden'],
  wrongColor: [
    '这一块相同，再看看',
    'Same shade. Look again.',
    'Gleicher Farbton. Schau noch einmal.',
  ],
  level: ['关卡', 'Level', 'Stufe'],
  timeLeft: ['剩余时间', 'Time left', 'Verbleibende Zeit'],
  finished: ['挑战结束', 'Challenge finished', 'Spiel beendet'],
  freeMode: ['自由模式', 'Free play', 'Freies Spiel'],
  challengeMode: ['照亮目标', 'Light the target', 'Ziel beleuchten'],
  addPrism: ['加棱镜', 'Add prism', 'Prisma hinzufügen'],
  addMirror: ['加镜面', 'Add mirror', 'Spiegel hinzufügen'],
  addLight: ['加光源', 'Add light', 'Licht hinzufügen'],
  deleteObject: ['删除选中', 'Delete selected', 'Auswahl löschen'],
  lightColor: ['光色', 'Light color', 'Lichtfarbe'],
  white: ['白光', 'White', 'Weiß'],
  red: ['红光', 'Red', 'Rot'],
  green: ['绿光', 'Green', 'Grün'],
  blue: ['蓝光', 'Blue', 'Blau'],
  targetHit: ['光已到达目标', 'Target illuminated', 'Ziel beleuchtet'],
  nextLevel: ['下一关', 'Next level', 'Nächste Stufe'],
  wind: ['风向', 'Wind', 'Windrichtung'],
  snowfall: ['降雪', 'Snowfall', 'Schneefall'],
  steps: ['脚印', 'Footprints', 'Fußspuren'],
  name: ['星座名称', 'Constellation name', 'Name des Sternbilds'],
  note: ['一句注释', 'A short note', 'Eine kurze Notiz'],
  seed: ['星空种子', 'Sky seed', 'Himmelsstartwert'],
  applySeed: ['重现星空', 'Restore sky', 'Himmel erzeugen'],
  newSky: ['换一片星空', 'New sky', 'Neuer Himmel'],
  undo: ['撤销连线', 'Undo line', 'Linie rückgängig'],
  finishCard: ['完成卡片', 'Finish card', 'Karte fertigstellen'],
  editCard: ['编辑星图', 'Edit sky', 'Sternbild bearbeiten'],
  untitled: ['未命名的星座', 'An unnamed constellation', 'Ein unbenanntes Sternbild'],
  connections: ['连线', 'Connections', 'Verbindungen'],
  starSelected: [
    '已选中星星，点击另一颗连接',
    'Star selected. Click another to connect.',
    'Stern gewählt. Klicke einen anderen zum Verbinden.',
  ],
  seedRequired: ['请输入星空种子', 'Enter a sky seed', 'Gib einen Startwert ein'],
} satisfies Record<string, readonly [string, string, string]>;
