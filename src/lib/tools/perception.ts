import type { Point } from './play-math';
export function seededRandom(seed: string) {
  let value = 2166136261;
  for (const char of seed.normalize('NFC')) {
    value ^= char.codePointAt(0)!;
    value = Math.imul(value, 16777619);
  }
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function starField(seed: string, count = 85) {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => ({
    x: 0.06 + random() * 0.88,
    y: 0.07 + random() * 0.86,
    radius: 0.7 + random() * 1.5,
    brightness: 0.3 + random() * 0.7,
  }));
}
export function memoryPoints(count: number, random = Math.random): Point[] {
  const points: Point[] = [];
  for (let attempts = 0; points.length < count && attempts < 3000; attempts++) {
    const p = { x: 0.12 + random() * 0.76, y: 0.15 + random() * 0.7 };
    if (points.every((other) => Math.hypot(p.x - other.x, p.y - other.y) > 0.15)) points.push(p);
  }
  return points;
}
/** Minimum-cost matching makes the result independent of the order of the user's guesses. */
export function scoreMemory(targets: Point[], guesses: Point[]) {
  const n = targets.length;
  if (!n || n > 8 || guesses.length !== n) return null;
  const costs = new Float64Array(1 << n).fill(Infinity),
    choices = new Int8Array(1 << n).fill(-1);
  costs[0] = 0;
  const bits = (mask: number) => {
    let count = 0;
    while (mask) {
      mask &= mask - 1;
      count++;
    }
    return count;
  };
  for (let mask = 0; mask < 1 << n; mask++) {
    const k = bits(mask);
    if (k === n) continue;
    for (let j = 0; j < n; j++)
      if (!(mask & (1 << j))) {
        const next = mask | (1 << j),
          a = guesses[k]!,
          b = targets[j]!;
        const cost = costs[mask]! + Math.hypot(a.x - b.x, a.y - b.y);
        if (cost < costs[next]!) {
          costs[next] = cost;
          choices[next] = j;
        }
      }
  }
  const pairs: number[] = new Array(n);
  let mask = (1 << n) - 1;
  for (let i = n - 1; i >= 0; i--) {
    const target = choices[mask]!;
    pairs[i] = target;
    mask ^= 1 << target;
  }
  const error = costs[(1 << n) - 1]! / n;
  return { error, score: Math.max(0, 100 * (1 - error / 0.22)), pairs };
}
