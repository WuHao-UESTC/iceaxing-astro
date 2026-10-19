import { describe, expect, it } from 'vitest';

import {
  completePomodoroPhase,
  createPomodoroData,
  resetPomodoro,
  togglePomodoro,
} from './pomodoro';

describe('pomodoro state', () => {
  it('starts, pauses, and resumes against absolute time', () => {
    const started = togglePomodoro(createPomodoroData(), 1_000);
    expect(started.session.status).toBe('running');
    expect(started.session.endsAt).toBe(1_501_000);
    const paused = togglePomodoro(started, 61_000);
    expect(paused.session.status).toBe('paused');
    expect(paused.session.remainingMs).toBe(1_440_000);
    expect(togglePomodoro(paused, 100_000).session.endsAt).toBe(1_540_000);
  });

  it('counts focus sessions and advances through the route', () => {
    const started = togglePomodoro(createPomodoroData(), 0);
    const completed = completePomodoroPhase(started, 1_500_000);
    expect(completed.daily.completedFocus).toBe(1);
    expect(completed.daily.focusMinutes).toBe(25);
    expect(completed.session.nextPhase).toBe('shortBreak');
  });

  it('does not count a manually skipped focus phase', () => {
    const started = togglePomodoro(createPomodoroData(), 0);
    const skipped = completePomodoroPhase(started, 60_000, false);
    expect(skipped.daily.completedFocus).toBe(0);
    expect(skipped.daily.focusMinutes).toBe(0);
    expect(skipped.session.nextPhase).toBe('shortBreak');
  });

  it('resets without discarding daily totals', () => {
    const data = createPomodoroData();
    data.daily = { date: '1970-01-01', completedFocus: 2, focusMinutes: 50 };
    expect(resetPomodoro(data, 1_000).daily.completedFocus).toBe(2);
  });
});
