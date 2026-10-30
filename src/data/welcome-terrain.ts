type Point = readonly [number, number];
type Facet = { points: string; tone: 'shadow' | 'stone' | 'light' };
type Depth = 'distant' | 'middle' | 'near';

// Triangulate a ridge against a shared base below the SVG viewport. Every layer
// spans the canvas, so its foothills meet and continue past the bottom edge.
function ridge(depth: Depth, crest: Point[], base: Point[]): { depth: Depth; faces: Facet[] } {
  const faces: Facet[] = [];
  const tones = ['shadow', 'stone', 'light', 'stone'] as const;
  let top = 0;
  let bottom = 0;
  while (top < crest.length - 1 || bottom < base.length - 1) {
    const currentTop = crest[top];
    const currentBase = base[bottom];
    const nextTop = crest[top + 1];
    const nextBase = base[bottom + 1];
    if (!currentTop || !currentBase) break;
    let next: Point;
    if (nextTop && (!nextBase || nextTop[0] <= nextBase[0])) {
      next = nextTop;
      top++;
    } else if (nextBase) {
      next = nextBase;
      bottom++;
    } else {
      break;
    }
    const vertices = [currentTop, currentBase, next];
    faces.push({
      points: vertices.map((point) => point.join(',')).join(' '),
      tone: tones[faces.length % tones.length] ?? 'stone',
    });
  }
  return { depth, faces };
}

const desktopBase: Point[] = [
  [0, 650],
  [250, 650],
  [540, 650],
  [740, 650],
  [980, 650],
  [1220, 650],
  [1440, 650],
];
export const welcomeDesktopLayers = [
  ridge(
    'distant',
    [
      [0, 280],
      [130, 180],
      [240, 270],
      [350, 100],
      [480, 260],
      [620, 390],
      [760, 420],
      [930, 230],
      [1060, 60],
      [1180, 210],
      [1320, 150],
      [1440, 270],
    ],
    desktopBase,
  ),
  ridge(
    'middle',
    [
      [0, 350],
      [170, 220],
      [280, 350],
      [420, 250],
      [570, 460],
      [710, 500],
      [850, 430],
      [1030, 200],
      [1170, 330],
      [1300, 240],
      [1440, 380],
    ],
    desktopBase,
  ),
  ridge(
    'near',
    [
      [0, 500],
      [150, 400],
      [310, 510],
      [470, 460],
      [620, 550],
      [740, 565],
      [900, 485],
      [1060, 480],
      [1220, 390],
      [1440, 480],
    ],
    desktopBase,
  ),
];

const mobileBase: Point[] = [
  [0, 650],
  [480, 650],
  [610, 650],
  [720, 650],
  [850, 650],
  [980, 650],
  [1440, 650],
];
export const welcomeMobileLayers = [
  ridge(
    'distant',
    [
      [0, 280],
      [450, 310],
      [520, 90],
      [590, 250],
      [650, 420],
      [720, 470],
      [800, 400],
      [880, 180],
      [930, 45],
      [990, 300],
      [1440, 290],
    ],
    mobileBase,
  ),
  ridge(
    'middle',
    [
      [0, 400],
      [450, 420],
      [510, 280],
      [570, 365],
      [650, 490],
      [720, 530],
      [810, 460],
      [900, 270],
      [970, 390],
      [1440, 410],
    ],
    mobileBase,
  ),
  ridge(
    'near',
    [
      [0, 540],
      [460, 520],
      [545, 465],
      [640, 550],
      [720, 580],
      [800, 545],
      [890, 460],
      [990, 520],
      [1440, 530],
    ],
    mobileBase,
  ),
];
