// Trusted, code-owned SVG illustrations for the tools gallery.
const marks: Record<string, string> = {
  fireworks: '#da8670',
  reverie: '#75a998',
  'guess-seconds': '#c3a16a',
  'blind-circle': '#c99879',
  gravity: '#879ec9',
  reaction: '#c98e6b',
  ripples: '#7aa7b9',
  'color-music': '#ac91b9',
  'fading-words': '#9eaaa5',
  'stack-stones': '#b5a685',
  'visual-memory': '#a0a1c7',
  'color-sense': '#8ba885',
  refraction: '#a2b6cc',
  'snow-trails': '#9db5c4',
  constellation: '#acb7d2',
  pomodoro: '#cc8975',
  'smith-chart': '#85a7ba',
};
export const accent = (id: string) => marks[id] ?? '#96adab';
const circle = (x: number, y: number, r: number, extra = '') =>
  `<circle cx="${x}" cy="${y}" r="${r}" ${extra}/>`;
function rays(cx: number, cy: number, count: number, radius: number, color: string) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2,
      r = radius * (0.7 + Math.sin(i * 12.3) * 0.2);
    return `<path d="M${cx + Math.cos(a) * r * 0.55} ${cy + Math.sin(a) * r * 0.55}l${Math.cos(a) * r * 0.36} ${Math.sin(a) * r * 0.36}" stroke="${color}" stroke-width="1.5" opacity="${0.4 + (i % 4) * 0.15}"/>`;
  }).join('');
}
function scene(id: string) {
  switch (id) {
    case 'fireworks':
      return `${rays(177, 82, 38, 66, 'var(--card-accent)')}${rays(93, 110, 24, 34, 'var(--gold)')}<path d="M161 191Q159 139 177 86" stroke="var(--card-accent)" opacity=".5"/><path d="M165 183L162 161M169 166l-2-14" opacity=".45"/>${circle(177, 82, 2, 'fill="var(--text)" stroke="none"')}<g fill="var(--card-accent)" stroke="none">${circle(210, 133, 1.3)}${circle(132, 67, 1)}${circle(228, 83, 1.4)}${circle(163, 28, 1)}</g>`;
    case 'reverie':
      return `<path d="M49 151C78 179 39 78 76 84S98 169 128 133S119 47 161 59S139 147 185 139S211 70 249 104" stroke="var(--card-accent)" stroke-width="2.5" stroke-linecap="round"/>${circle(249, 104, 5, 'fill="var(--card-accent)" stroke="none"')}<path d="M52 183h31m-31-4v8M243 46h10m-5-5v10" opacity=".2"/><text x="49" y="45" class="art-caption">W A S D / LET IT WANDER</text>`;
    case 'guess-seconds':
      return `<text x="150" y="86" text-anchor="middle" class="art-clock ghost">10.00</text><text x="150" y="132" text-anchor="middle" class="art-clock">10.37</text><path d="M78 160h144" opacity=".18"/><path d="M130 160h40" stroke="var(--card-accent)" stroke-width="2"/>${circle(170, 160, 3, 'fill="var(--card-accent)" stroke="none"')}<text x="150" y="185" text-anchor="middle" class="art-caption accent-text">+ 0.37 SECONDS</text>`;
    case 'blind-circle':
      return `${circle(151, 106, 69, 'stroke-dasharray="3 5" opacity=".3"')}<path d="M220 106C222 146 191 178 151 174S80 148 82 106S109 40 152 38S216 66 220 106Z" stroke="var(--card-accent)" stroke-width="1.9"/><path d="M151 96v20m-10-10h20" opacity=".18"/>${circle(220, 106, 3, 'fill="var(--card-accent)" stroke="none"')}<text x="245" y="174" text-anchor="end" class="art-caption">96.8 / 100</text>`;
    case 'gravity':
      return `<g transform="rotate(-24 150 106)"><ellipse cx="150" cy="106" rx="112" ry="48" opacity=".22"/><ellipse cx="150" cy="106" rx="78" ry="76" opacity=".13"/></g><path d="M50 137C88 58 236 41 253 90" stroke="var(--card-accent)" stroke-width="1.6"/>${circle(150, 106, 13, 'stroke="var(--card-accent)" opacity=".6"')}${circle(150, 106, 3, 'fill="var(--card-accent)" stroke="none"')}${circle(252, 90, 5, 'fill="var(--card-accent)" stroke="none"')}${circle(86, 143, 3, 'fill="var(--gold)" stroke="none"')}<path d="M150 84v-9m0 62v-9m-22-22h-9m62 0h-9" opacity=".25"/>`;
    case 'reaction':
      return `${circle(150, 102, 65, 'opacity=".12"')}${circle(150, 102, 47, 'stroke="var(--card-accent)" opacity=".3"')}${circle(150, 102, 31, 'fill="var(--card-accent)" fill-opacity=".08" stroke="var(--card-accent)" stroke-opacity=".6"')}<path d="M150 64v-9m0 94v-9m-38-38h-9m94 0h-9" stroke="var(--card-accent)"/><text x="150" y="108" text-anchor="middle" class="art-label">NOW</text><text x="150" y="190" text-anchor="middle" class="art-caption">207 ms / CATCH THE MOMENT</text>`;
    case 'ripples':
      return `${Array.from({ length: 7 }, (_, i) => `<ellipse cx="145" cy="113" rx="${18 + i * 15}" ry="${7 + i * 7}" stroke="var(--card-accent)" opacity="${0.65 - i * 0.075}"/>`).join('')}<path d="M60 153C95 168 221 176 256 129" opacity=".15"/>${circle(145, 106, 2, 'fill="var(--card-accent)" stroke="none"')}<path d="M214 58c4-9 4-10 4-16 4 9 8 13 6 17-3 5-11 4-10-1Z" stroke="var(--card-accent)" opacity=".55"/>`;
    case 'color-music':
      return `<path d="M43 127C68 126 77 75 99 85S124 145 149 111S181 47 205 74S235 131 259 104" opacity=".2"/>${[
        0, 1, 2, 3, 4,
      ]
        .map((n) => {
          const x = 57 + n * 46,
            y = [127, 85, 111, 74, 104][n]!,
            color = ['#c2a563', '#91ad82', '#76aaa4', '#8b9ec7', '#ae91b7'][n];
          return `${circle(x, y, 10 + n * 3, `stroke="${color}" opacity=".2"`)}${circle(x, y, 4, `fill="${color}" stroke="none"`)}<path d="M${x} 169v${-12 - n * 5}" stroke="${color}" opacity=".45"/>`;
        })
        .join(
          '',
        )}<text x="150" y="194" text-anchor="middle" class="art-caption">8 SECONDS / A LITTLE MELODY</text>`;
    case 'fading-words':
      return `<text x="50" y="111" class="art-words">风经过这里</text><path d="M51 141h67" opacity=".15"/><g fill="var(--card-accent)" stroke="none">${Array.from(
        { length: 38 },
        (_, i) => {
          const x = 170 + i * 2.2 + (i % 4) * 7,
            y = 75 + Math.sin(i * 3.2) * 25 - i * 0.65;
          return `<rect x="${x}" y="${y}" width="${1 + (i % 3)}" height="${1 + (i % 3)}" opacity="${0.8 - i * 0.015}"/>`;
        },
      ).join('')}</g><text x="51" y="176" class="art-caption">KEEP IT / LET IT GO</text>`;
    case 'stack-stones':
      return `<path d="M49 183h202" opacity=".2"/><path d="m109 181-13-19 15-16 48-4 29 13-8 24Z" fill="var(--stone-1)" stroke="none"/><path d="m122 143-16-20 8-14 40-6 17 20-6 15Z" fill="var(--stone-2)" stroke="none"/><path d="m126 102-4-19 16-10 27 9 5 13-21 10Z" fill="var(--stone-3)" stroke="none"/><path d="m137 72-4-13 11-9 15 4 7 12-15 7Z" fill="var(--card-accent)" stroke="none"/><path d="M106 160l64-5m-53-36 41 6m-29-39 30 5" stroke="var(--page)" opacity=".35"/><path d="M206 74v54m-4-7 4 7 4-7" stroke="var(--card-accent)" opacity=".4"/>`;
    case 'visual-memory':
      return `<path d="m78 73 93-18 55 77-102 21-46-80" opacity=".06"/>${(
        [
          [78, 73],
          [171, 55],
          [226, 132],
          [124, 153],
        ] as const
      )
        .map(
          ([x, y], i) =>
            `${circle(x, y, 9, 'stroke="var(--card-accent)" opacity=".45"')}${circle(x + (i % 2 ? 8 : -7), y + 8, 3, 'fill="var(--card-accent)" stroke="none"')}<path d="M${x} ${y}l${i % 2 ? 8 : -7} 8" stroke-dasharray="2 3" opacity=".3"/>`,
        )
        .join(
          '',
        )}<text x="150" y="194" text-anchor="middle" class="art-caption">ONE GLANCE / REMEMBER THE LIGHT</text>`;
    case 'color-sense':
      return `<g transform="translate(82 36)">${Array.from({ length: 9 }, (_, i) => `<rect x="${(i % 3) * 47}" y="${Math.floor(i / 3) * 47}" width="40" height="40" fill="var(--card-accent)" opacity="${i === 4 ? 0.95 : 0.38}" stroke="none"/>`).join('')}</g><path d="m235 150-11 17m0 0 14-1m-14 1 1-14" stroke="var(--card-accent)" opacity=".5"/>`;
    case 'refraction':
      return `<path d="M28 128h87" stroke="var(--text)" stroke-width="1.5"/><path d="m145 44 51 103H94Z" fill="var(--card-accent)" fill-opacity=".06" stroke="var(--card-accent)" opacity=".8"/><path d="m114 128 50-27" opacity=".4"/>${['#c87876', '#cda469', '#bdb56f', '#8eaf87', '#7eaab7', '#9c91b6'].map((c, i) => `<path d="m164 101 102 ${-39 + i * 17}" stroke="${c}" stroke-width="1.4" opacity=".8"/>`).join('')}<text x="45" y="184" class="art-caption">A DIFFERENT WAY TO SEE LIGHT</text>`;
    case 'snow-trails':
      return `<path d="m35 153 37-50 38 27 51-76 64 98 46-32" opacity=".1"/><path d="m104 182 17-27 13-25 17-20 17-33" stroke-dasharray="1 8" stroke-width="4" stroke="var(--card-accent)" opacity=".55"/><path d="m115 187 14-29 15-21 17-24 17-32" stroke-dasharray="1 8" stroke-width="4" stroke="var(--card-accent)" opacity=".35"/><g fill="var(--card-accent)" stroke="none" opacity=".5">${(
        [
          [63, 45],
          [98, 71],
          [221, 44],
          [233, 95],
          [53, 117],
          [194, 172],
          [255, 161],
        ] as const
      )
        .map(([x, y]) => circle(x, y, 1.3))
        .join('')}</g>`;
    case 'constellation':
      return `<g fill="var(--card-accent)" stroke="none">${Array.from({ length: 32 }, (_, i) => circle(35 + ((i * 71) % 239), 24 + ((i * 43) % 160), i % 5 === 0 ? 1.6 : 0.7, `opacity="${0.2 + (i % 4) * 0.15}"`)).join('')}</g><path d="m71 141 43-54 52 21 38-57 33 53-71 4-11 58-84-25" stroke="var(--card-accent)" opacity=".75"/><g fill="var(--text)" stroke="none">${(
        [
          [71, 141],
          [114, 87],
          [166, 108],
          [204, 51],
          [237, 104],
          [155, 166],
        ] as const
      )
        .map(([x, y]) => circle(x, y, 2.4))
        .join('')}</g>`;
    case 'pomodoro':
      return `${circle(150, 105, 66, 'opacity=".15"')}<path d="M150 39a66 66 0 1 1-62 88" stroke="var(--card-accent)" stroke-width="2"/>${Array.from(
        { length: 12 },
        (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return `<path d="M${150 + Math.sin(a) * 76} ${105 + Math.cos(a) * 76}l${Math.sin(a) * 4} ${Math.cos(a) * 4}" opacity=".25"/>`;
        },
      ).join(
        '',
      )}<text x="150" y="111" text-anchor="middle" class="art-time">25:00</text><text x="150" y="132" text-anchor="middle" class="art-caption">STAY WITH ONE THING</text>`;
    case 'smith-chart':
      return `<defs><clipPath id="chart-clip"><circle cx="150" cy="106" r="76"/></clipPath></defs>${circle(150, 106, 76, 'stroke="var(--card-accent)" opacity=".6"')}<g clip-path="url(#chart-clip)" stroke="var(--card-accent)" opacity=".25">${[12, 25, 40, 57].map((n) => circle(226 - n, 106, n)).join('')}${[28, 50, 85, 150].flatMap((n) => [circle(226, 106 - n, n), circle(226, 106 + n, n)]).join('')}<path d="M70 106h160"/></g><path d="m150 106 41-40" stroke="var(--card-accent)" stroke-width="1.5"/>${circle(191, 66, 4, 'fill="var(--card-accent)" stroke="none"')}<text x="243" y="183" text-anchor="end" class="art-caption">Z = 50 + j25 Ω</text>`;
    default:
      return `${circle(150, 105, 57, 'stroke="var(--card-accent)" opacity=".35"')}<path d="M122 105h56m-28-28v56" stroke="var(--card-accent)" stroke-width="1.5"/>`;
  }
}
export function artwork(id: string) {
  const backdrop =
    '<path d="m36 147 117 47 113-58-117-44Z" fill="var(--card-accent)" fill-opacity=".035" stroke="var(--card-accent)" stroke-opacity=".1"/><path d="m36 147v8l117 47 113-58v-8m-113 58v8" opacity=".08"/>';
  return `<svg class="tool-illustration" viewBox="0 0 300 210" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" focusable="false">${backdrop}<g class="illustration-scene">${scene(id)}</g></svg>`;
}
