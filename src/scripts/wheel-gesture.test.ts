import { describe, expect, it } from 'vitest';
import { createWheelGesture } from './wheel-gesture';

describe('single-page wheel gestures', () => {
  it('turns exactly one page for a small notch or an arbitrarily large delta', () => {
    for (const delta of [4, 10, 120, 12000, -4, -12000]) {
      expect(createWheelGesture().consume(delta, 0)).toBe(Math.sign(delta));
    }
  });

  it('consumes the entire inertia tail, even after the animation has finished', () => {
    const gesture = createWheelGesture();
    expect(gesture.consume(120, 0)).toBe(1);
    for (let now = 50; now <= 2000; now += 50) {
      expect(gesture.consume(now < 1000 ? 200 : 5, now, now < 900)).toBe(0);
    }
    expect(gesture.consume(120, 2300)).toBe(1);
  });

  it('does not queue a new turn or reverse direction during an animation', () => {
    const gesture = createWheelGesture();
    expect(gesture.consume(120, 0)).toBe(1);
    expect(gesture.consume(-12000, 500, true)).toBe(0);
    expect(gesture.consume(-1, 950)).toBe(0);
    expect(gesture.consume(-120, 1250)).toBe(-1);
  });

  it('ignores input during a transition started by another navigation control', () => {
    const gesture = createWheelGesture();
    expect(gesture.consume(12000, 500, true)).toBe(0);
    expect(gesture.consume(20, 600)).toBe(0);
    expect(gesture.consume(20, 900)).toBe(1);
  });

  it('accumulates tiny trackpad deltas without losing or duplicating a gesture', () => {
    const gesture = createWheelGesture();
    expect(gesture.consume(1, 0)).toBe(0);
    expect(gesture.consume(1, 20)).toBe(0);
    expect(gesture.consume(2, 40)).toBe(1);
    expect(gesture.consume(200, 60)).toBe(0);
    gesture.reset();
    expect(gesture.consume(-4, 70)).toBe(-1);
  });
});
