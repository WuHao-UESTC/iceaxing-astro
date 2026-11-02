import { describe, expect, it } from 'vitest';
import { seededRandom, starField, scoreMemory, memoryPoints } from './perception';
import { reflect, refract, traceLight, type OpticObject } from './optics';
import { makeStone, stepStones, stoneVertices } from './stone-physics';
describe('second play collection', () => {
  it('recreates the same sky for a seed and changes it for another seed', () => {
    expect(starField('snow')).toEqual(starField('snow'));
    expect(starField('snow')).not.toEqual(starField('wind'));
    expect(starField('snow').every((p) => p.x > 0 && p.x < 1 && p.y > 0 && p.y < 1)).toBe(true);
  });
  it('matches recalled points in any order without greedy assignment errors', () => {
    const points = [
      { x: 0.1, y: 0.1 },
      { x: 0.8, y: 0.8 },
      { x: 0.4, y: 0.2 },
    ];
    expect(scoreMemory(points, [points[2]!, points[0]!, points[1]!])!.score).toBe(100);
    expect(scoreMemory(points, [])).toBeNull();
  });
  it('generates spaced memory points with a bounded retry loop', () => {
    const points = memoryPoints(8, seededRandom('points'));
    expect(points).toHaveLength(8);
    for (let i = 0; i < 8; i++)
      for (let j = i + 1; j < 8; j++)
        expect(
          Math.hypot(points[i]!.x - points[j]!.x, points[i]!.y - points[j]!.y),
        ).toBeGreaterThan(0.15);
  });
  it('reflects a ray against a vertical mirror', () => {
    expect(reflect({ x: 1, y: 0 }, { x: -1, y: 0 })).toEqual({ x: -1, y: 0 });
  });
  it('obeys Snell refraction and handles total internal reflection', () => {
    const direction = { x: Math.sin(Math.PI / 4), y: Math.cos(Math.PI / 4) };
    const result = refract(direction, { x: 0, y: -1 }, 1 / 1.5)!;
    expect(result.x).toBeCloseTo(direction.x / 1.5);
    expect(
      refract({ x: Math.sin(Math.PI / 3), y: Math.cos(Math.PI / 3) }, { x: 0, y: -1 }, 1.5),
    ).toBeNull();
  });
  it('disperses white light through a prism with finite bounded paths', () => {
    const objects: OpticObject[] = [
      { kind: 'light', x: 75, y: 300, angle: 0, size: 18, color: 'white' },
      { kind: 'prism', x: 430, y: 300, angle: 0, size: 95, color: 'white' },
    ];
    const rays = traceLight(objects, 1000, 600);
    expect(new Set(rays.filter((r) => r.color !== 'white').map((r) => r.color)).size).toBe(7);
    expect(rays.length).toBeLessThanOrEqual(98);
    expect(rays.every((r) => Number.isFinite(r.b.x) && Number.isFinite(r.b.y))).toBe(true);
  });
  it('settles a stone on the floor without falling through it', () => {
    const stone = makeStone(300, 150, seededRandom('stone'));
    for (let i = 0; i < 720; i++) stepStones([stone], 1 / 120);
    const bottom = Math.max(...stoneVertices(stone).map((p) => p.y));
    expect(bottom).toBeLessThan(561);
    expect(bottom).toBeGreaterThan(550);
    expect(Number.isFinite(stone.angle)).toBe(true);
    expect(Math.abs(stone.vy)).toBeLessThan(20);
  });
  it('keeps a held stone stationary and gives larger stones more mass', () => {
    const small = makeStone(300, 100, () => 0),
      large = makeStone(300, 300, () => 0.9);
    expect(large.mass).toBeGreaterThan(small.mass);
    stepStones([small], 1 / 120, 0.6, small);
    expect(small.y).toBe(100);
    expect(small.vy).toBe(0);
  });
});
