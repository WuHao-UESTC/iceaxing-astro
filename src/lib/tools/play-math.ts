export type Point = { x: number; y: number };
const clamp = (x: number, min = 0, max = 1) => Math.min(max, Math.max(min, x));

/** Resample by distance so a slow or uneven pointer does not bias the circle fit. */
export function scoreCircle(raw: Point[]) {
  if (raw.length < 12) return null;
  const distances = [0];
  for (let i = 1; i < raw.length; i++)
    distances.push(
      distances[i - 1]! + Math.hypot(raw[i]!.x - raw[i - 1]!.x, raw[i]!.y - raw[i - 1]!.y),
    );
  const length = distances.at(-1)!;
  if (length < 100) return null;
  const points: Point[] = [];
  let segment = 1;
  for (let i = 0; i <= 255; i++) {
    const target = (length * i) / 255;
    while (segment < raw.length - 1 && distances[segment]! < target) segment++;
    const a = raw[segment - 1]!,
      b = raw[segment]!;
    const t =
      (target - distances[segment - 1]!) / (distances[segment]! - distances[segment - 1]! || 1);
    points.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  }
  const mx = points.reduce((s, p) => s + p.x, 0) / points.length;
  const my = points.reduce((s, p) => s + p.y, 0) / points.length;
  let uu = 0,
    uv = 0,
    vv = 0,
    ur = 0,
    vr = 0;
  for (const p of points) {
    const u = p.x - mx,
      v = p.y - my;
    uu += u * u;
    uv += u * v;
    vv += v * v;
    ur += (u * (u * u + v * v)) / 2;
    vr += (v * (u * u + v * v)) / 2;
  }
  const det = uu * vv - uv * uv;
  if (Math.abs(det) < 1e-5) return null;
  const x = mx + (ur * vv - vr * uv) / det,
    y = my + (vr * uu - ur * uv) / det;
  const radii = points.map((p) => Math.hypot(p.x - x, p.y - y));
  const radius = radii.reduce((s, r) => s + r, 0) / radii.length;
  if (radius < 16 || length / radius > Math.PI * 3.3) return null;
  const angles = points
    .map((p) => (Math.atan2(p.y - y, p.x - x) + Math.PI * 2) % (Math.PI * 2))
    .sort((a, b) => a - b);
  let gap = angles[0]! + Math.PI * 2 - angles.at(-1)!;
  for (let i = 1; i < angles.length; i++) gap = Math.max(gap, angles[i]! - angles[i - 1]!);
  const coverage = clamp(1 - gap / (Math.PI * 2)) * 100;
  if (coverage < 72 || radius > length / 4) return null;
  const rms = Math.sqrt(radii.reduce((s, r) => s + (r - radius) ** 2, 0) / radii.length);
  const roundness = clamp(1 - (rms / radius) * 3) * 100;
  const closure =
    clamp(1 - Math.hypot(raw[0]!.x - raw.at(-1)!.x, raw[0]!.y - raw.at(-1)!.y) / (radius * 0.8)) *
    100;
  return {
    x,
    y,
    radius,
    roundness,
    closure,
    coverage,
    score: roundness * 0.6 + closure * 0.25 + coverage * 0.15,
  };
}

export type Body = Point & { vx: number; vy: number; radius: number; hue: number };
export type Well = Point & { strength: number };
export function stepGravity(
  balls: Body[],
  wells: Well[],
  dt: number,
  width: number,
  height: number,
) {
  for (const ball of balls) {
    for (const well of wells) {
      const dx = well.x - ball.x,
        dy = well.y - ball.y;
      const force = (1800000 * well.strength) / Math.pow(dx * dx + dy * dy + 26 * 26, 1.5);
      ball.vx += dx * force * dt;
      ball.vy += dy * force * dt;
    }
    const speed = Math.hypot(ball.vx, ball.vy);
    if (speed > 480) {
      ball.vx *= 480 / speed;
      ball.vy *= 480 / speed;
    }
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
  }
  for (let i = 0; i < balls.length; i++)
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i]!,
        b = balls[j]!,
        dx = b.x - a.x,
        dy = b.y - a.y,
        dist = Math.hypot(dx, dy),
        sum = a.radius + b.radius;
      if (dist >= sum) continue;
      const nx = dist > 0.001 ? dx / dist : 1,
        ny = dist > 0.001 ? dy / dist : 0;
      const overlap = (sum - dist) / 2;
      a.x -= nx * overlap;
      a.y -= ny * overlap;
      b.x += nx * overlap;
      b.y += ny * overlap;
      const relative = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (relative < 0) {
        a.vx += relative * nx;
        a.vy += relative * ny;
        b.vx -= relative * nx;
        b.vy -= relative * ny;
      }
    }
  for (const b of balls) {
    const r = Math.min(b.radius, width / 2, height / 2);
    if (b.x < r) {
      b.x = r;
      b.vx = Math.abs(b.vx);
    }
    if (b.x > width - r) {
      b.x = width - r;
      b.vx = -Math.abs(b.vx);
    }
    if (b.y < r) {
      b.y = r;
      b.vy = Math.abs(b.vy);
    }
    if (b.y > height - r) {
      b.y = height - r;
      b.vy = -Math.abs(b.vy);
    }
  }
}

export class WaveGrid {
  current: Float32Array;
  private previous: Float32Array;
  constructor(
    readonly width: number,
    readonly height: number,
  ) {
    this.current = new Float32Array(width * height);
    this.previous = new Float32Array(width * height);
  }
  disturb(x: number, y: number, amount = 12) {
    const cx = Math.round(x * (this.width - 1)),
      cy = Math.round(y * (this.height - 1));
    for (let dy = -2; dy <= 2; dy++)
      for (let dx = -2; dx <= 2; dx++) {
        const px = cx + dx,
          py = cy + dy;
        if (px > 0 && px < this.width - 1 && py > 0 && py < this.height - 1)
          this.current[py * this.width + px] = clamp(
            this.current[py * this.width + px]! + amount * Math.exp(-(dx * dx + dy * dy) / 2),
            -80,
            80,
          );
      }
  }
  step() {
    let energy = 0;
    const w = this.width;
    for (let y = 1; y < this.height - 1; y++)
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const value =
          ((this.current[i - 1]! +
            this.current[i + 1]! +
            this.current[i - w]! +
            this.current[i + w]!) *
            0.5 -
            this.previous[i]!) *
          0.975;
        this.previous[i] = value;
        energy = Math.max(energy, Math.abs(value));
      }
    [this.current, this.previous] = [this.previous, this.current];
    return energy;
  }
  clear() {
    this.current.fill(0);
    this.previous.fill(0);
  }
}

export function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
}
