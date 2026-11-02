import { median } from '../../lib/tools/play-math';
import { spaceShortcut, suspendWhenHidden, type PlayRuntime } from './runtime';

export default function mount(r: PlayRuntime) {
  const { t, host, canvas, signal } = r;
  const prompt = host.querySelector<HTMLElement>('[data-prompt]')!,
    round = host.querySelector('[data-round]')!;
  let state: 'idle' | 'waiting' | 'go' | 'result' | 'done' = 'idle',
    timer = 0,
    frame = 0,
    started = 0,
    results: number[] = [];
  const cancel = () => {
    clearTimeout(timer);
    cancelAnimationFrame(frame);
  };
  r.addCleanup(cancel);
  const progress = () => {
    round.textContent = `${Math.min(results.length + 1, 5)} / 5`;
    r.metrics(results.map((x, i) => `${i + 1}. ${x.toFixed(0)} ms`).join('  ·  '));
  };
  const start = () => {
    if (state === 'waiting' || state === 'go') return;
    if (state === 'done') results = [];
    state = 'waiting';
    host.dataset.reaction = state;
    prompt.textContent = t.wait;
    r.status(t.wait);
    progress();
    r.button('start').disabled = true;
    timer = window.setTimeout(
      () => {
        frame = requestAnimationFrame(() => {
          if (state !== 'waiting' || document.hidden) return;
          state = 'go';
          host.dataset.reaction = 'go';
          prompt.textContent = t.now;
          started = performance.now();
          r.status(t.now);
        });
      },
      1500 + Math.random() * 3500,
    );
  };
  const respond = () => {
    const now = performance.now();
    if (state === 'waiting') {
      cancel();
      state = 'result';
      host.dataset.reaction = 'idle';
      prompt.textContent = t.early;
      r.status(t.early);
      r.button('start').disabled = false;
      r.button('start').textContent = t.retry;
      return;
    }
    if (state !== 'go') return;
    const elapsed = now - started;
    results.push(elapsed);
    state = results.length === 5 ? 'done' : 'result';
    host.dataset.reaction = 'idle';
    prompt.textContent = `${elapsed.toFixed(0)} ms`;
    r.button('start').disabled = false;
    r.button('start').textContent = t.retry;
    progress();
    if (state === 'done') {
      const summary = `${t.median} ${median(results).toFixed(0)} ms  ·  ${t.fastest} ${Math.min(...results).toFixed(0)} ms`;
      r.status(summary);
    } else r.status(`${t.round} ${results.length} / 5  ·  ${elapsed.toFixed(0)} ms`);
  };
  r.onAction('start', start);
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (event.isPrimary) {
        event.preventDefault();
        respond();
      }
    },
    { signal },
  );
  spaceShortcut(r, () => {
    if (state === 'waiting' || state === 'go') respond();
    else start();
  });
  // Focus stays on the canvas during a trial, so Space cannot click the Start button twice.
  r.button('start').addEventListener('click', () => canvas.focus({ preventScroll: true }), {
    signal,
  });
  suspendWhenHidden(r, () => {
    if (state !== 'waiting' && state !== 'go') return;
    cancel();
    state = 'result';
    host.dataset.reaction = 'idle';
    prompt.textContent = t.interrupted;
    r.status(t.interrupted);
    r.button('start').disabled = false;
    r.button('start').textContent = t.retry;
  });
  r.status(t.start);
  progress();
}
