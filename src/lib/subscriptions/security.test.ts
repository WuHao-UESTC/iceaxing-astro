import { describe, expect, it } from 'vitest';

import { createUnsubscribeToken, verifyUnsubscribeToken } from './security';

describe('unsubscribe tokens', () => {
  it('accepts the active or previous rotation secret', () => {
    const token = createUnsubscribeToken('subscriber', 'old-secret', 1_000, 60);
    expect(verifyUnsubscribeToken('subscriber', token, ['new-secret', 'old-secret'], 2_000)).toBe(
      true,
    );
  });

  it('rejects another subscriber and expired tokens', () => {
    const token = createUnsubscribeToken('subscriber', 'secret', 1_000, 1);
    expect(verifyUnsubscribeToken('other', token, ['secret'], 1_500)).toBe(false);
    expect(verifyUnsubscribeToken('subscriber', token, ['secret'], 3_000)).toBe(false);
  });
});
