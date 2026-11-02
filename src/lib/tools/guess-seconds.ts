export type GuessResult = {
  target: number;
  actual: number;
  difference: number;
  errorPercent: number;
};

export function isValidTarget(value: number) {
  return Number.isFinite(value) && value >= 0.1 && value <= 3600;
}

/** Use monotonic timestamps supplied by performance.now(), without a visible ticking timer. */
export class SecondsChallenge {
  private startTime: number | null = null;
  private target = 10;
  attempts = 0;
  readonly bestByTarget = new Map<number, GuessResult>();

  start(target: number, now: number) {
    if (!isValidTarget(target) || !Number.isFinite(now) || this.startTime !== null) return false;
    this.target = target;
    this.startTime = now;
    return true;
  }

  stop(now: number): GuessResult | null {
    if (this.startTime === null || !Number.isFinite(now) || now < this.startTime) return null;
    const actual = (now - this.startTime) / 1000;
    const difference = actual - this.target;
    const result = {
      target: this.target,
      actual,
      difference,
      errorPercent: (Math.abs(difference) / this.target) * 100,
    };
    this.startTime = null;
    this.attempts++;
    const best = this.bestByTarget.get(this.target);
    if (!best || Math.abs(difference) < Math.abs(best.difference))
      this.bestByTarget.set(this.target, result);
    return result;
  }

  interrupt() {
    this.startTime = null;
  }
}
