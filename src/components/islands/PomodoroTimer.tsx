import { useEffect, useMemo, useRef, useState } from 'react';

import type { Locale } from '../../i18n/config';
import {
  LIMITS,
  POMODORO_STORAGE_KEY,
  completePomodoroPhase,
  createPomodoroData,
  phaseDuration,
  remainingTime,
  resetPomodoro,
  restorePomodoro,
  tickPomodoro,
  togglePomodoro,
  type PomodoroSettings,
} from '../../lib/tools/pomodoro';

interface Props {
  locale: Locale;
}

const copy = {
  zh: {
    phase: { focus: '专注', shortBreak: '短休息', longBreak: '长休息' },
    status: {
      idle: '准备开始',
      running: '正在计时',
      paused: '已暂停',
      phaseComplete: '阶段完成',
      finished: '本组完成',
    },
    action: {
      idle: '开始专注',
      running: '暂停',
      paused: '继续',
      phaseComplete: '下一阶段',
      finished: '再来一组',
    },
    reset: '重置',
    skip: '跳过',
    settings: '节奏设置',
    today: '今日轨迹',
    focus: '专注时长',
    short: '短休息',
    long: '长休息',
    cycles: '循环',
    auto: '自动开始下一阶段',
    sound: '完成提示音',
    notify: '桌面通知',
    completed: '完成轮数',
    minutes: '专注分钟',
    cycle: '轮',
    permission: '浏览器没有授予通知权限。',
  },
  en: {
    phase: { focus: 'Focus', shortBreak: 'Short break', longBreak: 'Long break' },
    status: {
      idle: 'Ready',
      running: 'Running',
      paused: 'Paused',
      phaseComplete: 'Phase complete',
      finished: 'Set complete',
    },
    action: {
      idle: 'Start focus',
      running: 'Pause',
      paused: 'Resume',
      phaseComplete: 'Next phase',
      finished: 'New set',
    },
    reset: 'Reset',
    skip: 'Skip',
    settings: 'Rhythm settings',
    today: 'Today',
    focus: 'Focus',
    short: 'Short break',
    long: 'Long break',
    cycles: 'Cycles',
    auto: 'Auto-start next phase',
    sound: 'Completion sound',
    notify: 'Desktop notifications',
    completed: 'Focus cycles',
    minutes: 'Focus minutes',
    cycle: 'cycle',
    permission: 'Notification permission was not granted.',
  },
  de: {
    phase: { focus: 'Fokus', shortBreak: 'Kurze Pause', longBreak: 'Lange Pause' },
    status: {
      idle: 'Bereit',
      running: 'Läuft',
      paused: 'Pausiert',
      phaseComplete: 'Phase beendet',
      finished: 'Satz beendet',
    },
    action: {
      idle: 'Fokus starten',
      running: 'Pausieren',
      paused: 'Fortsetzen',
      phaseComplete: 'Nächste Phase',
      finished: 'Neuer Satz',
    },
    reset: 'Zurücksetzen',
    skip: 'Überspringen',
    settings: 'Rhythmus',
    today: 'Heute',
    focus: 'Fokus',
    short: 'Kurze Pause',
    long: 'Lange Pause',
    cycles: 'Zyklen',
    auto: 'Nächste Phase automatisch',
    sound: 'Hinweiston',
    notify: 'Desktop-Benachrichtigung',
    completed: 'Fokuszyklen',
    minutes: 'Fokusminuten',
    cycle: 'Zyklus',
    permission: 'Benachrichtigungen wurden nicht erlaubt.',
  },
} as const;

function formatTime(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function PomodoroTimer({ locale }: Props) {
  const labels = copy[locale];
  const [data, setData] = useState(createPomodoroData);
  const [now, setNow] = useState(0);
  const [ready, setReady] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState('');
  const alertedCompletion = useRef(0);

  useEffect(() => {
    const current = Date.now();
    try {
      const saved = localStorage.getItem(POMODORO_STORAGE_KEY);
      const restored = saved ? restorePomodoro(JSON.parse(saved), current) : createPomodoroData();
      alertedCompletion.current = restored.session.completionId;
      setData(restored);
    } catch {
      localStorage.removeItem(POMODORO_STORAGE_KEY);
    }
    setNow(current);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // The timer keeps working when storage is unavailable or full.
    }
  }, [data, ready]);

  useEffect(() => {
    const update = () => {
      const current = Date.now();
      setNow(current);
      setData((value) => tickPomodoro(value, current));
    };
    const interval = window.setInterval(update, 250);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', update);
    };
  }, []);

  useEffect(() => {
    if (!ready || data.session.completionId <= alertedCompletion.current) return;
    alertedCompletion.current = data.session.completionId;
    if (data.settings.sound) {
      try {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = 660;
        gain.gain.setValueAtTime(0.0001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.32);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.34);
      } catch {
        // Sound is a progressive enhancement.
      }
    }
    if (
      data.settings.notifications &&
      document.visibilityState !== 'visible' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      new Notification(labels.status.phaseComplete, { body: labels.phase[data.session.phase] });
    }
  }, [
    data.session.completionId,
    data.session.phase,
    data.settings.notifications,
    data.settings.sound,
    labels,
    ready,
  ]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.code === 'Space') {
        event.preventDefault();
        const current = Date.now();
        setNow(current);
        setData((value) => togglePomodoro(value, current));
      }
      if (event.key.toLowerCase() === 'r') setData((value) => resetPomodoro(value, Date.now()));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const remaining = remainingTime(data, now);
  const duration = phaseDuration(data.settings, data.session.phase);
  const progress = duration ? Math.min(1, Math.max(0, 1 - remaining / duration)) : 0;
  const circumference = 2 * Math.PI * 108;
  const route = useMemo(
    () => Array.from({ length: data.settings.cycles }, (_, index) => index + 1),
    [data.settings.cycles],
  );

  function updateSetting(key: keyof PomodoroSettings, value: number | boolean) {
    setData((current) => {
      const settings = { ...current.settings, [key]: value };
      const session =
        current.session.status === 'idle'
          ? { ...current.session, remainingMs: phaseDuration(settings, 'focus') }
          : current.session;
      return { ...current, settings, session };
    });
  }

  async function toggleNotifications(checked: boolean) {
    if (checked && !('Notification' in window)) {
      setPermissionMessage(labels.permission);
      return;
    }
    if (checked && Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setPermissionMessage(labels.permission);
        return;
      }
    }
    updateSetting('notifications', checked);
    setPermissionMessage('');
  }

  return (
    <div className="pomodoro-workbench" data-status={data.session.status} data-ready={ready}>
      <section className="pomodoro-console" aria-label="Pomodoro timer">
        <div className="pomodoro-clock">
          <svg viewBox="0 0 260 260" aria-hidden="true">
            <circle className="pomodoro-track" cx="130" cy="130" r="108" />
            <circle
              className="pomodoro-progress"
              cx="130"
              cy="130"
              r="108"
              pathLength={circumference}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
          </svg>
          <div>
            <span>{labels.status[data.session.status]}</span>
            <strong aria-live="polite">{formatTime(remaining)}</strong>
            <b>{labels.phase[data.session.phase]}</b>
          </div>
        </div>
        <p>
          {data.session.cycle} / {data.settings.cycles} {labels.cycle}
        </p>
        <div className="pomodoro-actions">
          <button
            className="tool-primary"
            type="button"
            onClick={() => {
              const current = Date.now();
              setNow(current);
              setData((value) => togglePomodoro(value, current));
            }}
          >
            {labels.action[data.session.status]}
          </button>
          <button
            type="button"
            onClick={() => setData((value) => completePomodoroPhase(value, Date.now(), false))}
            disabled={data.session.status === 'idle' || data.session.status === 'finished'}
          >
            {labels.skip}
          </button>
          <button
            type="button"
            onClick={() => setData((value) => resetPomodoro(value, Date.now()))}
          >
            {labels.reset}
          </button>
        </div>
        <ol className="pomodoro-route" aria-label="Cycle progress">
          {route.map((cycle) => (
            <li
              key={cycle}
              data-current={cycle === data.session.cycle}
              data-complete={cycle < data.session.cycle}
            >
              {cycle}
            </li>
          ))}
        </ol>
      </section>

      <aside className="tool-controls">
        <section className="tool-card">
          <p className="tool-index">01 / SETTINGS</p>
          <h2>{labels.settings}</h2>
          <div className="pomodoro-settings-grid">
            {(
              [
                ['focusMinutes', labels.focus],
                ['shortBreakMinutes', labels.short],
                ['longBreakMinutes', labels.long],
                ['cycles', labels.cycles],
              ] as const
            ).map(([key, label]) => (
              <label key={key}>
                <span>{label}</span>
                <input
                  type="number"
                  min={LIMITS[key].min}
                  max={LIMITS[key].max}
                  value={data.settings[key]}
                  onChange={(event) =>
                    updateSetting(
                      key,
                      Math.min(
                        LIMITS[key].max,
                        Math.max(LIMITS[key].min, Number(event.target.value)),
                      ),
                    )
                  }
                />
              </label>
            ))}
          </div>
          <div className="tool-toggles">
            <label>
              <input
                type="checkbox"
                checked={data.settings.autoStart}
                onChange={(event) => updateSetting('autoStart', event.target.checked)}
              />
              {labels.auto}
            </label>
            <label>
              <input
                type="checkbox"
                checked={data.settings.sound}
                onChange={(event) => updateSetting('sound', event.target.checked)}
              />
              {labels.sound}
            </label>
            <label>
              <input
                type="checkbox"
                checked={data.settings.notifications}
                onChange={(event) => void toggleNotifications(event.target.checked)}
              />
              {labels.notify}
            </label>
          </div>
          {permissionMessage && (
            <p className="tool-note" role="status">
              {permissionMessage}
            </p>
          )}
        </section>
        <section className="tool-card">
          <p className="tool-index">02 / TODAY</p>
          <h2>{labels.today}</h2>
          <dl className="tool-stats">
            <div>
              <dt>{labels.completed}</dt>
              <dd>{data.daily.completedFocus}</dd>
            </div>
            <div>
              <dt>{labels.minutes}</dt>
              <dd>{data.daily.focusMinutes}</dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>
  );
}
