import { describe, expect, it } from 'vitest';

import {
  completePomodoroPhase,
  createPomodoroData,
  resetPomodoro,
  togglePomodoro,
  tickPomodoro,
  skipPomodoro,
  restorePomodoro,
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

  it('catches up auto-start phases using original deadlines after background throttling', () => {
    const data = createPomodoroData();
    data.settings.autoStart = true;
    const started = togglePomodoro(data, 1_000);
    const restored = tickPomodoro(started, 61 * 60_000 + 1_000);
    expect(restored.daily.completedFocus).toBe(2);
    expect(restored.session.phase).toBe('focus');
    expect(restored.session.cycle).toBe(3);
    expect(restored.session.endsAt).toBe(85 * 60_000 + 1_000);
  });

  it('restores an entire elapsed set without creating more than one set', () => {
    const data = createPomodoroData();
    data.settings.autoStart = true;
    const started = togglePomodoro(data, 1_000);
    const restored = restorePomodoro(JSON.parse(JSON.stringify(started)), 150 * 60_000);
    expect(restored.session.status).toBe('finished');
    expect(restored.daily.completedFocus).toBe(4);
    expect(restored.daily.focusMinutes).toBe(100);
  });

  it('skips a completed phase without double-counting its focus time', () => {
    const completed = tickPomodoro(togglePomodoro(createPomodoroData(), 1_000), 1_501_000);
    const next = skipPomodoro(completed, 1_502_000);
    expect(next.session.phase).toBe('shortBreak');
    expect(next.session.status).toBe('running');
    expect(next.daily.completedFocus).toBe(1);
    expect(completePomodoroPhase(completed, 1_502_000).daily.completedFocus).toBe(1);
  });

  it('starts a selected break and skips it to the next focus phase', () => {
    const data = createPomodoroData();
    data.session.phase = 'shortBreak';
    const started = togglePomodoro(data, 1_000);
    expect(started.session.endsAt).toBe(301_000);
    expect(skipPomodoro(started, 2_000).session.phase).toBe('focus');
    expect(skipPomodoro(started, 2_000).daily.completedFocus).toBe(0);
  });
});
