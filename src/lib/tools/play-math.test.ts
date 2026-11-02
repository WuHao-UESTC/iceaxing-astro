import { describe, expect, it } from 'vitest';
import { median, scoreCircle, stepGravity, WaveGrid } from './play-math';
const circle = (r: number, cx = 0, cy = 0, turns = 1) =>
  Array.from({ length: 361 }, (_, i) => ({
    x: cx + r * Math.cos((i / 360) * Math.PI * 2 * turns),
    y: cy + r * Math.sin((i / 360) * Math.PI * 2 * turns),
  }));
describe('play tools geometry and simulation', () => {
  it('fits circles independently of translation and scale', () => {
    const a = scoreCircle(circle(80))!,
      b = scoreCircle(circle(160, 500, 200))!;
    expect(a.score).toBeGreaterThan(99);
    expect(b.score).toBeCloseTo(a.score, 5);
    expect(b.x).toBeCloseTo(500, 1);
    expect(b.radius).toBeCloseTo(160, 1);
  });
  it('rejects tiny circles, lines, short arcs and repeated loops', () => {
    expect(scoreCircle(circle(5))).toBeNull();
    expect(scoreCircle(circle(80, 0, 0, 0.4))).toBeNull();
    expect(scoreCircle(circle(80, 0, 0, 2))).toBeNull();
    expect(scoreCircle(Array.from({ length: 100 }, (_, i) => ({ x: i * 2, y: 0 })))).toBeNull();
  });
  it('scores an ellipse below a circle', () => {
    expect(scoreCircle(circle(80).map((p) => ({ ...p, x: p.x * 1.8 })))!.score).toBeLessThan(85);
  });
  it('exchanges equal mass velocities in a head-on collision', () => {
    const balls = [
      { x: 100, y: 100, vx: 30, vy: 0, radius: 5, hue: 0 },
      { x: 109, y: 100, vx: -30, vy: 0, radius: 5, hue: 0 },
    ];
    stepGravity(balls, [], 1 / 120, 500, 500);
    expect(balls[0]!.vx).toBe(-30);
    expect(balls[1]!.vx).toBe(30);
  });
  it('keeps a particle at a well center finite and reflects boundaries', () => {
    const balls = [
      { x: 50, y: 50, vx: 0, vy: 0, radius: 5, hue: 0 },
      { x: 499, y: 250, vx: 1000, vy: 0, radius: 5, hue: 0 },
    ];
    stepGravity(balls, [{ x: 50, y: 50, strength: 3 }], 1 / 120, 500, 500);
    expect(Number.isFinite(balls[0]!.vx)).toBe(true);
    expect(balls[1]!.x).toBeLessThanOrEqual(495);
    expect(balls[1]!.vx).toBeLessThan(0);
  });
  it('propagates water impulses then damps them back to calm', () => {
    const grid = new WaveGrid(40, 30);
    grid.disturb(0.5, 0.5);
    grid.step();
    expect(grid.current.some((x) => x !== 0)).toBe(true);
    let energy = 0;
    for (let i = 0; i < 1500; i++) energy = grid.step();
    expect(energy).toBeLessThan(0.01);
    grid.clear();
    expect(grid.current.every((x) => x === 0)).toBe(true);
  });
  it('computes medians without changing round order', () => {
    const a = [300, 100, 200, 500, 400];
    expect(median(a)).toBe(300);
    expect(a[0]).toBe(300);
    expect(median([100, 200])).toBe(150);
  });
});
