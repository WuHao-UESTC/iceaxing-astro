import { describe, expect, it } from 'vitest';
import { addMotion, createBrush, EFFECT_DURATION, MAX_SPEED, stepBrush } from './reverie';

const idle = { x: 0, y: 0 };
describe('reverie motion', () => {
  it('waits for input, then coasts and takes time to reverse', () => {
    const state = createBrush(2000, 2000);
    stepBrush(state, idle, 1, 2000, 2000);
    expect(state.x).toBe(1000);
    for (let i = 0; i < 120; i++) stepBrush(state, { x: 1, y: 0 }, 1 / 120, 2000, 2000);
    const speed = state.vx;
    stepBrush(state, idle, 1 / 120, 2000, 2000);
    expect(state.vx).toBeGreaterThan(speed * 0.99);
    stepBrush(state, { x: -1, y: 0 }, 1 / 120, 2000, 2000);
    expect(state.vx).toBeGreaterThan(0);
  });
  it('reflects both velocity axes at a corner and keeps the tip inside', () => {
    const state = { ...createBrush(100, 100), x: 85, y: 85, vx: 200, vy: 200, started: true };
    stepBrush(state, idle, 1 / 120, 100, 100);
    expect(state.x).toBeLessThanOrEqual(86);
    expect(state.y).toBeLessThanOrEqual(86);
    expect(state.vx).toBeLessThan(0);
    expect(state.vy).toBeLessThan(0);
  });
  it('stacks effects with separate two-second lifetimes while allowing steering', () => {
    const state = createBrush(4000, 4000);
    addMotion(state, () => 0.3);
    for (let i = 0; i < 120; i++) stepBrush(state, idle, 1 / 120, 4000, 4000);
    addMotion(state, () => 0.1);
    expect(state.effects).toHaveLength(2);
    const other = { ...state, effects: state.effects.map((effect) => ({ ...effect })) };
    stepBrush(state, { x: 0, y: 1 }, 1 / 120, 4000, 4000);
    stepBrush(other, idle, 1 / 120, 4000, 4000);
    expect(state.vy).not.toBe(other.vy);
    for (let i = 1; i < 120; i++) stepBrush(state, idle, 1 / 120, 4000, 4000);
    expect(state.effects).toHaveLength(1);
    for (let i = 0; i < EFFECT_DURATION * 120; i++) stepBrush(state, idle, 1 / 120, 4000, 4000);
    expect(state.effects).toHaveLength(0);
  });
  it('caps speed even with many acceleration effects', () => {
    const state = createBrush(4000, 4000);
    for (let i = 0; i < 30; i++) addMotion(state, () => 0.3);
    for (let i = 0; i < 120; i++) stepBrush(state, { x: 1, y: 1 }, 1 / 120, 4000, 4000);
    expect(Math.hypot(state.vx, state.vy)).toBeLessThanOrEqual(MAX_SPEED + 1e-8);
  });
});
