import type { Point } from './play-math';
export type OpticColor = 'white' | 'red' | 'green' | 'blue';
export type OpticObject = Point & {
  kind: 'light' | 'mirror' | 'prism';
  angle: number;
  size: number;
  color: OpticColor;
};
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;
export function unit(v: Point): Point {
  const length = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / length, y: v.y / length };
}
export function reflect(direction: Point, normal: Point): Point {
  const d = dot(direction, normal);
  return unit({ x: direction.x - 2 * d * normal.x, y: direction.y - 2 * d * normal.y });
}
export function refract(direction: Point, normal: Point, ratio: number): Point | null {
  const cos = -dot(direction, normal),
    k = 1 - ratio * ratio * (1 - cos * cos);
  if (k < 0) return null;
  return unit({
    x: ratio * direction.x + (ratio * cos - Math.sqrt(k)) * normal.x,
    y: ratio * direction.y + (ratio * cos - Math.sqrt(k)) * normal.y,
  });
}
export function opticVertices(object: OpticObject): Point[] {
  const s = object.size;
  const local =
    object.kind === 'mirror'
      ? [
          { x: 0, y: -s },
          { x: 0, y: s },
        ]
      : [
          { x: 0, y: -s },
          { x: s * 0.866, y: s * 0.5 },
          { x: -s * 0.866, y: s * 0.5 },
        ];
  return local.map((p) => ({
    x: object.x + p.x * Math.cos(object.angle) - p.y * Math.sin(object.angle),
    y: object.y + p.x * Math.sin(object.angle) + p.y * Math.cos(object.angle),
  }));
}
function inside(point: Point, polygon: Point[]) {
  let sign = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i]!,
      b = polygon[(i + 1) % polygon.length]!,
      cross = (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x);
    if (Math.abs(cross) < 1e-7) continue;
    const next = Math.sign(cross);
    if (sign && sign !== next) return false;
    sign = next;
  }
  return true;
}
function intersect(origin: Point, direction: Point, a: Point, b: Point) {
  const ex = b.x - a.x,
    ey = b.y - a.y,
    cross = direction.x * ey - direction.y * ex;
  if (Math.abs(cross) < 1e-8) return null;
  const dx = a.x - origin.x,
    dy = a.y - origin.y,
    t = (dx * ey - dy * ex) / cross,
    u = (dx * direction.y - dy * direction.x) / cross;
  if (t < 0.01 || u < 0 || u > 1) return null;
  let normal = unit({ x: -ey, y: ex });
  if (dot(direction, normal) > 0) normal = { x: -normal.x, y: -normal.y };
  return { t, point: { x: origin.x + direction.x * t, y: origin.y + direction.y * t }, normal };
}
export type RaySegment = { a: Point; b: Point; color: string };
export function traceLight(objects: OpticObject[], width: number, height: number): RaySegment[] {
  const segments: RaySegment[] = [],
    colors = ['#ef6e6e', '#efab56', '#d9c858', '#6bbb82', '#64afda', '#8c8bd5', '#b787d2'];
  const edges = [
    [
      { x: 0, y: 0 },
      { x: width, y: 0 },
    ],
    [
      { x: width, y: 0 },
      { x: width, y: height },
    ],
    [
      { x: width, y: height },
      { x: 0, y: height },
    ],
    [
      { x: 0, y: height },
      { x: 0, y: 0 },
    ],
  ] as [Point, Point][];
  for (const source of objects.filter((o) => o.kind === 'light')) {
    const wavelengths =
      source.color === 'white'
        ? [0, 1, 2, 3, 4, 5, 6]
        : [source.color === 'red' ? 0 : source.color === 'green' ? 3 : 4];
    for (const wavelength of wavelengths) {
      let origin = { x: source.x, y: source.y },
        direction = { x: Math.cos(source.angle), y: Math.sin(source.angle) },
        dispersed = source.color !== 'white';
      for (let bounce = 0; bounce < 14; bounce++) {
        let nearest: ReturnType<typeof intersect> = null,
          object: OpticObject | undefined;
        for (const [a, b] of edges) {
          const hit = intersect(origin, direction, a, b);
          if (hit && (!nearest || hit.t < nearest.t)) {
            nearest = hit;
            object = undefined;
          }
        }
        for (const candidate of objects) {
          if (candidate.kind === 'light') continue;
          const vertices = opticVertices(candidate),
            count = candidate.kind === 'mirror' ? 1 : 3;
          for (let i = 0; i < count; i++) {
            const hit = intersect(
              origin,
              direction,
              vertices[i]!,
              vertices[(i + 1) % vertices.length]!,
            );
            if (hit && (!nearest || hit.t < nearest.t)) {
              nearest = hit;
              object = candidate;
            }
          }
        }
        if (!nearest) break;
        segments.push({
          a: origin,
          b: nearest.point,
          color: dispersed ? colors[wavelength]! : 'white',
        });
        if (!object) break;
        if (object.kind === 'mirror') direction = reflect(direction, nearest.normal);
        else {
          const exiting = inside(origin, opticVertices(object)),
            index = 1.505 + wavelength * 0.009;
          const next = refract(direction, nearest.normal, exiting ? index : 1 / index);
          direction = next ?? reflect(direction, nearest.normal);
          dispersed = true;
        }
        origin = {
          x: nearest.point.x + direction.x * 0.04,
          y: nearest.point.y + direction.y * 0.04,
        };
      }
    }
  }
  return segments;
}
export function pointSegmentDistance(p: Point, a: Point, b: Point) {
  const dx = b.x - a.x,
    dy = b.y - a.y,
    t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p.x - a.x - dx * t, p.y - a.y - dy * t);
}
