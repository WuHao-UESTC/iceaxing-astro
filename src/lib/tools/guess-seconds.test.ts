import { describe, expect, it } from 'vitest';
import { isValidTarget, SecondsChallenge } from './guess-seconds';

describe('seconds challenge', () => {
  it('calculates elapsed seconds, signed difference and relative error from timestamps', () => {
    const game = new SecondsChallenge();
    game.start(10, 1000);
    const result = game.stop(11370)!;
    expect(result.actual).toBeCloseTo(10.37);
    expect(result.difference).toBeCloseTo(0.37);
    expect(result.errorPercent).toBeCloseTo(3.7);
    expect(game.stop(12000)).toBeNull();
    expect(game.attempts).toBe(1);
  });
  it('keeps best results separately for each target without rounding before comparison', () => {
    const game = new SecondsChallenge();
    game.start(5, 0);
    game.stop(4996);
    game.start(5, 10000);
    game.stop(14997);
    game.start(10, 20000);
    game.stop(29800);
    expect(game.bestByTarget.get(5)!.difference).toBeCloseTo(-0.003);
    expect(game.bestByTarget.get(10)!.difference).toBeCloseTo(-0.2);
    expect(game.attempts).toBe(3);
  });
  it('discards interrupted attempts and protects a running start timestamp', () => {
    const game = new SecondsChallenge();
    expect(game.start(10, 0)).toBe(true);
    expect(game.start(5, 1000)).toBe(false);
    game.interrupt();
    expect(game.stop(10000)).toBeNull();
    expect(game.attempts).toBe(0);
    expect(game.bestByTarget.size).toBe(0);
    expect(game.start(5, 20000)).toBe(true);
    expect(game.stop(25000)!.difference).toBe(0);
  });
  it('rejects invalid targets and invalid timestamps', () => {
    for (const target of [0, -1, NaN, Infinity, 3601]) expect(isValidTarget(target)).toBe(false);
    const game = new SecondsChallenge();
    expect(game.start(NaN, 0)).toBe(false);
    expect(game.start(1.25, 1000)).toBe(true);
    expect(game.stop(999)).toBeNull();
    expect(game.stop(2250)!.actual).toBe(1.25);
  });
});
