import { memoryPoints, scoreMemory } from '../../lib/tools/perception';
import type { Point } from '../../lib/tools/play-math';
import { suspendWhenHidden, type PlayRuntime } from './runtime';
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, t, host, signal } = r;
  let phase: 'ready' | 'preview' | 'recall' | 'result' = 'ready',
    targets: Point[] = [],
    guesses: Point[] = [],
    result: ReturnType<typeof scoreMemory> = null,
    timer = 0,
    rounds = 0,
    best = 0;
  const dot = (point: Point, radius: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x * r.width, point.y * r.height, radius, 0, Math.PI * 2);
    ctx.fill();
  };
  const render = () => {
    r.clear();
    if (phase === 'preview' || phase === 'result')
      for (const p of targets) {
        ctx.globalAlpha = phase === 'preview' ? 1 : 0.55;
        dot(p, 7, r.color('--tool-coral'));
      }
    ctx.globalAlpha = 1;
    if (phase === 'recall' || phase === 'result')
      for (let i = 0; i < guesses.length; i++) {
        const p = guesses[i]!;
        dot(p, 4, r.color('--text'));
        if (result) {
          const q = targets[result.pairs[i]!]!;
          ctx.strokeStyle = r.color('--muted');
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(p.x * r.width, p.y * r.height);
          ctx.lineTo(q.x * r.width, q.y * r.height);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
  };
  const metrics = () =>
    r.metrics(
      `${t.round} ${rounds + 1}  ·  ${t.points} ${targets.length || 3}  ·  ${t.best} ${best ? best.toFixed(1) : '—'}`,
    );
  const start = () => {
    clearTimeout(timer);
    targets = memoryPoints(Math.min(8, 3 + Math.floor(rounds / 2)));
    guesses = [];
    result = null;
    phase = 'preview';
    host.dataset.memory = phase;
    r.status(t.memorize);
    r.button('start').disabled = true;
    metrics();
    render();
    timer = window.setTimeout(() => {
      phase = 'recall';
      host.dataset.memory = phase;
      r.status(`${t.recall} 0 / ${targets.length}`);
      render();
    }, 2500);
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (phase !== 'recall' || !event.isPrimary) return;
      event.preventDefault();
      const p = r.point(event);
      guesses.push({ x: p.x / r.width, y: p.y / r.height });
      r.status(`${t.recall} ${guesses.length} / ${targets.length}`);
      if (guesses.length === targets.length) {
        phase = 'result';
        host.dataset.memory = phase;
        result = scoreMemory(targets, guesses);
        rounds++;
        best = Math.max(best, result?.score ?? 0);
        r.button('start').disabled = false;
        r.button('start').textContent = t.retry;
        r.status(`${t.score} ${result!.score.toFixed(1)} / 100`);
        const errorPx =
          result!.pairs.reduce(
            (sum, target, i) =>
              sum +
              Math.hypot(
                (guesses[i]!.x - targets[target]!.x) * r.width,
                (guesses[i]!.y - targets[target]!.y) * r.height,
              ),
            0,
          ) / targets.length;
        r.metrics(
          `${t.deviation} ${errorPx.toFixed(1)} px  ·  ${t.attempts} ${rounds}  ·  ${t.best} ${best.toFixed(1)}`,
        );
      }
      render();
    },
    { signal },
  );
  const reset = () => {
    clearTimeout(timer);
    phase = 'ready';
    host.dataset.memory = phase;
    targets = [];
    guesses = [];
    result = null;
    r.button('start').disabled = false;
    r.button('start').textContent = t.start;
    r.status(t.start);
    metrics();
    render();
  };
  suspendWhenHidden(r, () => {
    if (phase === 'preview' || phase === 'recall') {
      reset();
      r.status(t.interrupted);
    }
  });
  r.onAction('start', start);
  r.onAction('clear', reset);
  r.onRender(render);
  r.addCleanup(() => clearTimeout(timer));
  reset();
}
