import { useEffect, useMemo, useRef, useState } from 'react';

import ToolTabs from './ToolTabs';
import type { Locale } from '../../i18n/config';
import {
  LIMITS,
  POMODORO_STORAGE_KEY,
  skipPomodoro,
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
      idle: '开始计时',
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
      idle: 'Start timer',
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
      idle: 'Timer starten',
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
  const audioRef = useRef<AudioContext | null>(null);
  const consoleRef = useRef<HTMLElement>(null);
  const [task, setTask] = useState('');
  const [immersive, setImmersive] = useState(false);
  const [panel, setPanel] = useState<'rhythm' | 'alerts' | 'today'>('rhythm');
  const [soundMessage, setSoundMessage] = useState('');
  const extras =
    locale === 'zh'
      ? {
          task: '这一程，专注于',
          alerts: '提醒',
          placeholder: '写下此刻最重要的一件事…',
          presets: '选择你的节奏',
          classic: '经典',
          deep: '深度工作',
          light: '轻量起步',
          next: '接下来',
          keys: '空格 开始 / 暂停 · R 重置 · F 沉浸',
          immersive: '沉浸模式',
          exit: '退出沉浸',
          locked: '计时期间保留本组节奏；重置后可修改时长。',
          test: '试听提示音',
        }
      : locale === 'de'
        ? {
            task: 'Mein Fokus',
            alerts: 'Hinweise',
            placeholder: 'Eine wichtige Aufgabe…',
            presets: 'Rhythmus wählen',
            classic: 'Klassisch',
            deep: 'Tiefe Arbeit',
            light: 'Leichter Start',
            next: 'Danach',
            keys: 'Leertaste Start / Pause · R Zurücksetzen · F Fokusansicht',
            immersive: 'Fokusansicht',
            exit: 'Fokusansicht schließen',
            locked: 'Zeiten bleiben während des Satzes fest. Zum Ändern zurücksetzen.',
            test: 'Ton testen',
          }
        : {
            task: 'This session is for',
            alerts: 'Alerts',
            placeholder: 'One thing that matters right now…',
            presets: 'Choose a rhythm',
            classic: 'Classic',
            deep: 'Deep work',
            light: 'Light start',
            next: 'Up next',
            keys: 'Space Start / Pause · R Reset · F Focus view',
            immersive: 'Focus view',
            exit: 'Exit focus view',
            locked: 'Times stay fixed during a set. Reset to change the rhythm.',
            test: 'Test sound',
          };
  const settingsLocked = !['idle', 'finished'].includes(data.session.status);

  function unlockAudio() {
    try {
      audioRef.current ??= new AudioContext();
      void audioRef.current.resume();
    } catch {
      /* Audio is optional. */
    }
  }
  function playSound() {
    try {
      const context = audioRef.current;
      if (!context || context.state !== 'running') return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 660;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.5);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.52);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    } catch {
      /* Audio is optional. */
    }
  }

  useEffect(() => {
    const current = Date.now();
    try {
      setTask(localStorage.getItem('iceaxing-pomodoro-task') ?? '');
      const saved = localStorage.getItem(POMODORO_STORAGE_KEY);
      const restored = saved ? restorePomodoro(JSON.parse(saved), current) : createPomodoroData();
      alertedCompletion.current = restored.session.completionId;
      setData(restored);
    } catch {
      // Unavailable or malformed storage must not prevent initialization.
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
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    if (!ready || data.session.completionId <= alertedCompletion.current) return;
    alertedCompletion.current = data.session.completionId;
    if (data.settings.sound) playSound();
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
      if (event.key === 'Escape') {
        setImmersive(false);
        return;
      }
      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (event.target instanceof HTMLElement &&
          event.target.closest('input, textarea, select, button, a, [contenteditable]'))
      )
        return;
      if (event.code === 'Space') {
        event.preventDefault();
        unlockAudio();
        const current = Date.now();
        setNow(current);
        setData((value) => togglePomodoro(value, current));
      }
      if (event.key.toLowerCase() === 'f') setImmersive((value) => !value);
      if (event.key.toLowerCase() === 'r') setData((value) => resetPomodoro(value, Date.now()));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const remaining = remainingTime(data, now);
  const duration = phaseDuration(data.settings, data.session.phase);
  const progress = duration ? Math.min(1, Math.max(0, 1 - remaining / duration)) : 0;
  const circumference = 2 * Math.PI * 108;
  const phaseLabel = labels.phase[data.session.phase];
  const titleTime = formatTime(remaining);
  useEffect(() => {
    const original = document.title;
    if (data.session.status === 'running' || data.session.status === 'paused') {
      document.title = `${titleTime} · ${phaseLabel} · iceaxing`;
    }
    return () => {
      document.title = original;
    };
  }, [titleTime, phaseLabel, data.session.status]);
  useEffect(() => {
    if (!immersive) return;
    const original = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const hidden = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.site-header, .site-footer, .tool-page-header, .tool-controls',
      ),
    );
    const previousInert = hidden.map((node) => node.inert);
    hidden.forEach((node) => {
      node.inert = true;
    });
    consoleRef.current?.querySelector('button')?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
      hidden.forEach((node, index) => {
        node.inert = previousInert[index] ?? false;
      });
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [immersive]);
  useEffect(
    () => () => {
      void audioRef.current?.close();
    },
    [],
  );
  const route = useMemo(
    () => Array.from({ length: data.settings.cycles }, (_, index) => index + 1),
    [data.settings.cycles],
  );

  function updateSetting(key: keyof PomodoroSettings, value: number | boolean) {
    setData((current) => {
      if (typeof value === 'number' && !['idle', 'finished'].includes(current.session.status))
        return current;
      const settings = {
        ...current.settings,
        [key]: typeof value === 'number' ? Math.round(value) : value,
      };
      const session =
        current.session.status === 'idle'
          ? { ...current.session, remainingMs: phaseDuration(settings, current.session.phase) }
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
    <div
      className="pomodoro-workbench"
      data-immersive={immersive}
      data-status={data.session.status}
      data-ready={ready}
    >
      <section ref={consoleRef} className="pomodoro-console" aria-label="Pomodoro timer">
        <div className="pomodoro-console-top">
          <span className="pomodoro-session-meta">
            {data.session.cycle} / {data.settings.cycles} {labels.cycle}
          </span>
          <button type="button" aria-pressed={immersive} onClick={() => setImmersive(!immersive)}>
            {immersive ? extras.exit : extras.immersive} ↗
          </button>
        </div>
        <label className="pomodoro-task">
          <span>{extras.task}</span>
          <input
            type="text"
            maxLength={160}
            placeholder={extras.placeholder}
            value={task}
            onChange={(event) => {
              setTask(event.target.value);
              try {
                localStorage.setItem('iceaxing-pomodoro-task', event.target.value);
              } catch {
                /* Optional storage. */
              }
            }}
          />
        </label>
        <div className="pomodoro-phase-tabs" role="group" aria-label={labels.settings}>
          {(['focus', 'shortBreak', 'longBreak'] as const).map((phase) => (
            <button
              type="button"
              key={phase}
              disabled={settingsLocked}
              aria-pressed={data.session.phase === phase}
              onClick={() =>
                setData((current) => ({
                  ...current,
                  session: {
                    ...current.session,
                    status: 'idle',
                    phase,
                    remainingMs: phaseDuration(current.settings, phase),
                    endsAt: null,
                    nextPhase: null,
                  },
                }))
              }
            >
              {labels.phase[phase]}
            </button>
          ))}
        </div>
        <div className="pomodoro-clock">
          <svg viewBox="0 0 260 260" aria-hidden="true">
            <g transform="rotate(-90 130 130)">
              <polygon
                className="pomodoro-facet"
                points="130,6 192,22 238,68 254,130 238,192 192,238 130,254 68,238 22,192 6,130 22,68 68,22"
              />
              {Array.from({ length: 60 }, (_, i) => {
                const angle = (i * Math.PI) / 30;
                const inner = i % 5 === 0 ? 114 : 117;
                return (
                  <line
                    key={i}
                    className="pomodoro-tick"
                    x1={130 + inner * Math.cos(angle)}
                    y1={130 + inner * Math.sin(angle)}
                    x2={130 + 120 * Math.cos(angle)}
                    y2={130 + 120 * Math.sin(angle)}
                  />
                );
              })}
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
            </g>
          </svg>
          <div>
            <span>{labels.status[data.session.status]}</span>
            <strong role="timer" aria-live="off">
              {formatTime(remaining)}
            </strong>
            <b>{labels.phase[data.session.phase]}</b>
          </div>
        </div>
        <div className="pomodoro-actions">
          <button
            className="tool-primary"
            type="button"
            onClick={() => {
              unlockAudio();
              const current = Date.now();
              setNow(current);
              setData((value) => togglePomodoro(value, current));
            }}
          >
            {labels.action[data.session.status]}
          </button>
          <button
            type="button"
            onClick={() => {
              const current = Date.now();
              setNow(current);
              setData((value) => skipPomodoro(value, current));
            }}
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
              data-complete={
                cycle < data.session.cycle ||
                (cycle === data.session.cycle && data.session.phase !== 'focus')
              }
            >
              {cycle}
            </li>
          ))}
        </ol>
        <p className="tool-note">{extras.keys}</p>
        <p className="pomodoro-next" aria-live="polite">
          {data.session.nextPhase
            ? `${extras.next} / ${labels.phase[data.session.nextPhase]}`
            : labels.status[data.session.status]}
        </p>
      </section>

      <aside className="tool-controls pomodoro-controls">
        <ToolTabs<'rhythm' | 'alerts' | 'today'>
          label={labels.settings}
          prefix="pomodoro"
          tabs={[
            { id: 'rhythm', label: labels.settings },
            { id: 'alerts', label: extras.alerts },
            { id: 'today', label: labels.today },
          ]}
          active={panel}
          onChange={setPanel}
        />
        <div className="tool-panel-stack">
          <section
            className="tool-card tool-tab-panel"
            role="tabpanel"
            id="pomodoro-panel-rhythm"
            aria-labelledby="pomodoro-tab-rhythm"
            hidden={panel !== 'rhythm'}
            tabIndex={0}
          >
            <h2 className="sr-only">{labels.settings}</h2>
            <div className="pomodoro-presets" role="group" aria-label={extras.presets}>
              {[
                [extras.classic, 25, 5, 15],
                [extras.deep, 50, 10, 30],
                [extras.light, 15, 3, 10],
              ].map(([name, focus, short, long]) => (
                <button
                  type="button"
                  key={name}
                  disabled={settingsLocked}
                  aria-pressed={
                    data.settings.focusMinutes === focus &&
                    data.settings.shortBreakMinutes === short &&
                    data.settings.longBreakMinutes === long
                  }
                  onClick={() =>
                    setData((current) =>
                      resetPomodoro(
                        {
                          ...current,
                          settings: {
                            ...current.settings,
                            focusMinutes: Number(focus),
                            shortBreakMinutes: Number(short),
                            longBreakMinutes: Number(long),
                          },
                        },
                        Date.now(),
                      ),
                    )
                  }
                >
                  {name}
                  <small>
                    {focus} / {short}
                  </small>
                </button>
              ))}
            </div>
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
                    disabled={settingsLocked}
                    step={1}
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
            {settingsLocked && <p className="tool-note">{extras.locked}</p>}
          </section>
          <section
            className="tool-card tool-tab-panel"
            role="tabpanel"
            id="pomodoro-panel-alerts"
            aria-labelledby="pomodoro-tab-alerts"
            hidden={panel !== 'alerts'}
            tabIndex={0}
          >
            <h2>{extras.alerts}</h2>
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
                  onChange={(event) => {
                    unlockAudio();
                    updateSetting('sound', event.target.checked);
                  }}
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
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                window.setTimeout(playSound, 100);
                setSoundMessage(extras.test);
              }}
            >
              {extras.test} ♪
            </button>
            {soundMessage && (
              <span className="sr-only" role="status">
                {soundMessage}
              </span>
            )}
            {permissionMessage && (
              <p className="tool-note" role="status">
                {permissionMessage}
              </p>
            )}
          </section>
          <section
            className="tool-card tool-tab-panel"
            role="tabpanel"
            id="pomodoro-panel-today"
            aria-labelledby="pomodoro-tab-today"
            hidden={panel !== 'today'}
            tabIndex={0}
          >
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
        </div>
      </aside>
    </div>
  );
}
