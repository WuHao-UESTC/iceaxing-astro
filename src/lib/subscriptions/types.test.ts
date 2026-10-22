import { describe, expect, it } from 'vitest';

import { matchesSubscription } from './types';

describe('subscriptions after textbook category migration', () => {
  const textbook = ['category:razavi-cmos-analog-note'];

  it('preserves a subscription to the former textbook project', () => {
    expect(matchesSubscription(['project:razavi-cmos-analog-note'], textbook)).toBe(true);
  });

  it('preserves the former parent category subscription', () => {
    expect(matchesSubscription(['category:analog-ic'], textbook)).toBe(true);
    expect(matchesSubscription(['category:uestc-note'], textbook)).toBe(false);
  });

  it('does not subscribe textbook readers to sibling books or practice projects', () => {
    expect(matchesSubscription(['project:razavi-rf-microelectronics-note'], textbook)).toBe(false);
    expect(
      matchesSubscription(
        ['category:razavi-cmos-analog-note'],
        ['category:analog-ic', 'project:two-stage-ota'],
      ),
    ).toBe(false);
  });

  it('continues to match new categories and whole-site subscriptions', () => {
    expect(matchesSubscription(['category:razavi-cmos-analog-note'], textbook)).toBe(true);
    expect(matchesSubscription([], textbook)).toBe(true);
  });
});
