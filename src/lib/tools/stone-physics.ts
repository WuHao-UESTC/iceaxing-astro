import type { Point } from './play-math';
export type Stone = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  omega: number;
  vertices: Point[];
  mass: number;
  inertia: number;
  hue: number;
  fixed?: boolean;
};
export function stoneVertices(s: Stone) {
  const c = Math.cos(s.angle),
    n = Math.sin(s.angle);
  return s.vertices.map((p) => ({ x: s.x + p.x * c - p.y * n, y: s.y + p.x * n + p.y * c }));
}
export function makeStone(x: number, y: number, random = Math.random): Stone {
  const w = 58 + random() * 45,
    h = 28 + random() * 22;
  const vertices = [
    { x: -w * 0.5, y: -h * 0.15 },
    { x: -w * 0.3, y: -h * 0.5 },
    { x: w * 0.22, y: -h * 0.48 },
    { x: w * 0.5, y: -h * 0.1 },
    { x: w * 0.4, y: h * 0.35 },
    { x: -w * 0.32, y: h * 0.5 },
  ];
  const mass = (w * h) / 200;
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    angle: (random() - 0.5) * 0.25,
    omega: 0,
    vertices,
    mass,
    inertia: (mass * (w * w + h * h)) / 12,
    hue: random(),
  };
}
function contact(a: Stone, b: Stone) {
  const av = stoneVertices(a),
    bv = stoneVertices(b);
  let depth = Infinity,
    normal = { x: 0, y: 0 };
  for (const polygon of [av, bv])
    for (let i = 0; i < polygon.length; i++) {
      const p = polygon[i]!,
        q = polygon[(i + 1) % polygon.length]!,
        length = Math.hypot(q.x - p.x, q.y - p.y) || 1,
        axis = { x: -(q.y - p.y) / length, y: (q.x - p.x) / length };
      const project = (vertices: Point[]) => vertices.map((v) => v.x * axis.x + v.y * axis.y),
        ap = project(av),
        bp = project(bv),
        overlap =
          Math.min(Math.max(...ap), Math.max(...bp)) - Math.max(Math.min(...ap), Math.min(...bp));
      if (overlap <= 0) return null;
      if (overlap < depth) {
        depth = overlap;
        normal = axis;
      }
    }
  if ((b.x - a.x) * normal.x + (b.y - a.y) * normal.y < 0) normal = { x: -normal.x, y: -normal.y };
  const support = (vertices: Point[], direction: Point) => {
    const projections = vertices.map((p) => p.x * direction.x + p.y * direction.y),
      max = Math.max(...projections);
    const candidates = vertices.filter((_, i) => max - projections[i]! < 1.5);
    return {
      x: candidates.reduce((s, p) => s + p.x, 0) / candidates.length,
      y: candidates.reduce((s, p) => s + p.y, 0) / candidates.length,
    };
  };
  const pa = support(av, normal),
    pb = support(bv, { x: -normal.x, y: -normal.y });
  // Contact uses the overlapping face range, avoiding the center of the very wide floor.
  const tangent = { x: -normal.y, y: normal.x },
    at = av.map((p) => p.x * tangent.x + p.y * tangent.y),
    bt = bv.map((p) => p.x * tangent.x + p.y * tangent.y);
  const along =
    (Math.max(Math.min(...at), Math.min(...bt)) + Math.min(Math.max(...at), Math.max(...bt))) / 2;
  const across = ((pa.x + pb.x) * normal.x + (pa.y + pb.y) * normal.y) / 2;
  return {
    normal,
    depth,
    point: { x: normal.x * across + tangent.x * along, y: normal.y * across + tangent.y * along },
  };
}
export function stepStones(stones: Stone[], dt: number, friction = 0.65, held?: Stone) {
  const floor: Stone = {
    x: 300,
    y: 590,
    vx: 0,
    vy: 0,
    angle: 0,
    omega: 0,
    mass: Infinity,
    inertia: Infinity,
    fixed: true,
    hue: 0,
    vertices: [
      { x: -300, y: -30 },
      { x: 300, y: -30 },
      { x: 300, y: 30 },
      { x: -300, y: 30 },
    ],
  };
  for (const s of stones) {
    if (s === held) continue;
    s.vy += 500 * dt;
    s.vx *= Math.exp(-0.12 * dt);
    s.omega *= Math.exp(-0.7 * dt);
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.angle += s.omega * dt;
    s.x = Math.max(45, Math.min(555, s.x));
  }
  const all = [...stones, floor];
  for (let iteration = 0; iteration < 8; iteration++)
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++) {
        const a = all[i]!,
          b = all[j]!,
          hit = contact(a, b);
        if (!hit) continue;
        const ia = a.fixed || a === held ? 0 : 1 / a.mass,
          ib = b.fixed || b === held ? 0 : 1 / b.mass,
          aa = a.fixed || a === held ? 0 : 1 / a.inertia,
          ab = b.fixed || b === held ? 0 : 1 / b.inertia;
        if (!ia && !ib) continue;
        const n = hit.normal,
          ra = { x: hit.point.x - a.x, y: hit.point.y - a.y },
          rb = { x: hit.point.x - b.x, y: hit.point.y - b.y };
        const rv = {
            x: b.vx - b.omega * rb.y - a.vx + a.omega * ra.y,
            y: b.vy + b.omega * rb.x - a.vy - a.omega * ra.x,
          },
          speed = rv.x * n.x + rv.y * n.y;
        if (speed < 0) {
          const ca = ra.x * n.y - ra.y * n.x,
            cb = rb.x * n.y - rb.y * n.x,
            impulse = (-(1 + 0.02) * speed) / (ia + ib + ca * ca * aa + cb * cb * ab);
          const apply = (x: number, y: number) => {
            a.vx -= x * ia;
            a.vy -= y * ia;
            a.omega -= (ra.x * y - ra.y * x) * aa;
            b.vx += x * ib;
            b.vy += y * ib;
            b.omega += (rb.x * y - rb.y * x) * ab;
          };
          apply(n.x * impulse, n.y * impulse);
          const tangent = { x: -n.y, y: n.x },
            ta = ra.x * tangent.y - ra.y * tangent.x,
            tb = rb.x * tangent.y - rb.y * tangent.x;
          const tangentSpeed =
            (b.vx - b.omega * rb.y - a.vx + a.omega * ra.y) * tangent.x +
            (b.vy + b.omega * rb.x - a.vy - a.omega * ra.x) * tangent.y;
          const jt = Math.max(
            -friction * impulse,
            Math.min(friction * impulse, -tangentSpeed / (ia + ib + ta * ta * aa + tb * tb * ab)),
          );
          apply(tangent.x * jt, tangent.y * jt);
        }
        const correction = (Math.max(0, hit.depth - 0.08) * 0.55) / (ia + ib);
        a.x -= n.x * correction * ia;
        a.y -= n.y * correction * ia;
        b.x += n.x * correction * ib;
        b.y += n.y * correction * ib;
      }
}
