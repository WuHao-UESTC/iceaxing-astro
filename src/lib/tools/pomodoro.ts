export type PomodoroPhase = 'focus' | 'shortBreak' | 'longBreak';
export type PomodoroStatus = 'idle' | 'running' | 'paused' | 'phaseComplete' | 'finished';

export interface PomodoroSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cycles: number;
  autoStart: boolean;
  sound: boolean;
  notifications: boolean;
}

export interface PomodoroData {
  version: 1;
  settings: PomodoroSettings;
  session: {
    status: PomodoroStatus;
    phase: PomodoroPhase;
    cycle: number;
    endsAt: number | null;
    remainingMs: number;
    nextPhase: PomodoroPhase | null;
    completionId: number;
  };
  daily: { date: string; completedFocus: number; focusMinutes: number };
}

export const POMODORO_STORAGE_KEY = 'iceaxing-tools-pomodoro-v1';
export const LIMITS = {
  focusMinutes: { min: 1, max: 120 },
  shortBreakMinutes: { min: 1, max: 30 },
  longBreakMinutes: { min: 1, max: 60 },
  cycles: { min: 1, max: 12 },
} as const;

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cycles: 4,
  autoStart: false,
  sound: true,
  notifications: false,
};

export function localDateKey(now: number) {
  const date = new Date(now);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function phaseDuration(settings: PomodoroSettings, phase: PomodoroPhase) {
  if (phase === 'focus') return settings.focusMinutes * 60_000;
  if (phase === 'shortBreak') return settings.shortBreakMinutes * 60_000;
  return settings.longBreakMinutes * 60_000;
}

export function createPomodoroData(): PomodoroData {
  return {
    version: 1,
    settings: { ...DEFAULT_SETTINGS },
    session: {
      status: 'idle',
      phase: 'focus',
      cycle: 1,
      endsAt: null,
      remainingMs: phaseDuration(DEFAULT_SETTINGS, 'focus'),
      nextPhase: null,
      completionId: 0,
    },
    daily: { date: '', completedFocus: 0, focusMinutes: 0 },
  };
}

function today(data: PomodoroData, now: number): PomodoroData['daily'] {
  const date = localDateKey(now);
  return data.daily.date === date ? data.daily : { date, completedFocus: 0, focusMinutes: 0 };
}

export function remainingTime(data: PomodoroData, now: number) {
  return data.session.status === 'running' && data.session.endsAt
    ? Math.max(0, data.session.endsAt - now)
    : Math.max(0, data.session.remainingMs);
}

export function completePomodoroPhase(
  data: PomodoroData,
  now: number,
  countFocus = true,
): PomodoroData {
  const daily = today(data, now);
  const nextDaily =
    data.session.phase === 'focus' && countFocus
      ? {
          ...daily,
          completedFocus: daily.completedFocus + 1,
          focusMinutes: daily.focusMinutes + data.settings.focusMinutes,
        }
      : daily;
  const nextPhase: PomodoroPhase | null =
    data.session.phase === 'focus'
      ? data.session.cycle >= data.settings.cycles
        ? 'longBreak'
        : 'shortBreak'
      : data.session.phase === 'shortBreak'
        ? 'focus'
        : null;
  if (!nextPhase) {
    return {
      ...data,
      daily: nextDaily,
      session: {
        ...data.session,
        status: 'finished',
        endsAt: null,
        remainingMs: 0,
        nextPhase: null,
        completionId: data.session.completionId + 1,
      },
    };
  }
  const completed: PomodoroData = {
    ...data,
    daily: nextDaily,
    session: {
      ...data.session,
      status: 'phaseComplete',
      endsAt: null,
      remainingMs: 0,
      nextPhase,
      completionId: data.session.completionId + 1,
    },
  };
  return data.settings.autoStart ? startNextPomodoroPhase(completed, now) : completed;
}

export function startNextPomodoroPhase(data: PomodoroData, now: number) {
  const phase = data.session.nextPhase;
  if (!phase) return data;
  const cycle =
    data.session.phase === 'shortBreak' && phase === 'focus'
      ? data.session.cycle + 1
      : data.session.cycle;
  const duration = phaseDuration(data.settings, phase);
  return {
    ...data,
    session: {
      ...data.session,
      phase,
      cycle,
      status: 'running' as const,
      endsAt: now + duration,
      remainingMs: duration,
      nextPhase: null,
    },
  };
}

export function togglePomodoro(data: PomodoroData, now: number): PomodoroData {
  if (data.session.status === 'running') {
    return {
      ...data,
      session: {
        ...data.session,
        status: 'paused',
        remainingMs: remainingTime(data, now),
        endsAt: null,
      },
    };
  }
  if (data.session.status === 'paused') {
    return {
      ...data,
      session: { ...data.session, status: 'running', endsAt: now + data.session.remainingMs },
    };
  }
  if (data.session.status === 'phaseComplete') return startNextPomodoroPhase(data, now);
  const duration = phaseDuration(data.settings, 'focus');
  return {
    ...data,
    daily: today(data, now),
    session: {
      ...data.session,
      status: 'running',
      phase: 'focus',
      cycle: 1,
      endsAt: now + duration,
      remainingMs: duration,
      nextPhase: null,
    },
  };
}

export function tickPomodoro(data: PomodoroData, now: number) {
  if (data.session.status === 'running' && data.session.endsAt && data.session.endsAt <= now) {
    return completePomodoroPhase(data, now);
  }
  return data.daily.date === localDateKey(now) ? data : { ...data, daily: today(data, now) };
}

export function resetPomodoro(data: PomodoroData, now: number): PomodoroData {
  return {
    ...data,
    daily: today(data, now),
    session: {
      ...data.session,
      status: 'idle',
      phase: 'focus',
      cycle: 1,
      endsAt: null,
      remainingMs: phaseDuration(data.settings, 'focus'),
      nextPhase: null,
    },
  };
}

export function restorePomodoro(value: unknown, now: number): PomodoroData {
  const fallback = createPomodoroData();
  if (!value || typeof value !== 'object' || (value as { version?: unknown }).version !== 1)
    return fallback;
  const saved = value as Partial<PomodoroData>;
  const input = saved.settings ?? fallback.settings;
  const clamp = (key: keyof typeof LIMITS, value: unknown) => {
    const limits = LIMITS[key];
    const number =
      typeof value === 'number' && Number.isFinite(value)
        ? Math.round(value)
        : fallback.settings[key];
    return Math.min(limits.max, Math.max(limits.min, number));
  };
  const settings: PomodoroSettings = {
    focusMinutes: clamp('focusMinutes', input.focusMinutes),
    shortBreakMinutes: clamp('shortBreakMinutes', input.shortBreakMinutes),
    longBreakMinutes: clamp('longBreakMinutes', input.longBreakMinutes),
    cycles: clamp('cycles', input.cycles),
    autoStart: input.autoStart === true,
    sound: input.sound !== false,
    notifications: input.notifications === true,
  };
  const session = saved.session;
  const statuses: PomodoroStatus[] = ['idle', 'running', 'paused', 'phaseComplete', 'finished'];
  const phases: PomodoroPhase[] = ['focus', 'shortBreak', 'longBreak'];
  const phase = phases.includes(session?.phase as PomodoroPhase)
    ? (session?.phase as PomodoroPhase)
    : 'focus';
  const endsAt =
    typeof session?.endsAt === 'number' && Number.isFinite(session.endsAt) ? session.endsAt : null;
  const savedStatus = statuses.includes(session?.status as PomodoroStatus)
    ? (session?.status as PomodoroStatus)
    : 'idle';
  const status = savedStatus === 'running' && endsAt === null ? 'paused' : savedStatus;
  const daily = saved.daily;
  const restored: PomodoroData = {
    version: 1,
    settings,
    session: {
      status,
      phase,
      cycle: Math.min(
        settings.cycles,
        Math.max(
          1,
          typeof session?.cycle === 'number' && Number.isFinite(session.cycle)
            ? Math.round(session.cycle)
            : 1,
        ),
      ),
      endsAt,
      remainingMs:
        typeof session?.remainingMs === 'number' && Number.isFinite(session.remainingMs)
          ? Math.max(0, session.remainingMs)
          : phaseDuration(settings, phase),
      nextPhase: phases.includes(session?.nextPhase as PomodoroPhase)
        ? (session?.nextPhase as PomodoroPhase)
        : null,
      completionId:
        typeof session?.completionId === 'number' && Number.isFinite(session.completionId)
          ? Math.max(0, Math.round(session.completionId))
          : 0,
    },
    daily: {
      date: typeof daily?.date === 'string' ? daily.date : '',
      completedFocus:
        typeof daily?.completedFocus === 'number' && Number.isFinite(daily.completedFocus)
          ? Math.max(0, Math.round(daily.completedFocus))
          : 0,
      focusMinutes:
        typeof daily?.focusMinutes === 'number' && Number.isFinite(daily.focusMinutes)
          ? Math.max(0, Math.round(daily.focusMinutes))
          : 0,
    },
  };
  return tickPomodoro(restored, now);
}
