import { animation, suspendWhenHidden, type PlayRuntime } from './runtime';
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, host, t, signal } = r,
    mode = host.querySelector<HTMLSelectElement>('[data-playmode]')!;
  let active = false,
    locked = false,
    level = 1,
    correct = 0,
    best = 0,
    target = 0,
    side = 3,
    selection = 0,
    hue = 0,
    light = 50,
    started = 0,
    timer = 0,
    lastMetrics = 0;
  const geometry = () => {
    const size = Math.min(r.width - 32, r.height - 32, 540),
      x = (r.width - size) / 2,
      y = (r.height - size) / 2,
      gap = Math.max(4, size * 0.018),
      cell = (size - gap * (side - 1)) / side;
    return { x, y, size, gap, cell };
  };
  const render = () => {
    r.clear();
    if (!active) return;
    const g = geometry(),
      difference = Math.max(1.2, 13 * Math.pow(0.84, level - 1));
    for (let i = 0; i < side * side; i++) {
      const x = g.x + (i % side) * (g.cell + g.gap),
        y = g.y + Math.floor(i / side) * (g.cell + g.gap);
      ctx.fillStyle = `hsl(${hue} 48% ${light + (i === target ? difference : 0)}%)`;
      ctx.fillRect(x, y, g.cell, g.cell);
      if (i === selection && document.activeElement === canvas) {
        ctx.strokeStyle = r.color('--text');
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 3, y + 3, g.cell - 6, g.cell - 6);
      }
    }
  };
  const stats = () => {
    const remaining = Math.max(0, 30 - (performance.now() - started) / 1000);
    r.metrics(
      `${t.level} ${level}  ·  ${t.score} ${correct}  ·  ${t.best} ${best}${mode.value === 'timed' ? `  ·  ${t.timeLeft} ${remaining.toFixed(1)} s` : ''}`,
    );
  };
  const next = () => {
    side = Math.min(7, 3 + Math.floor((level - 1) / 3));
    target = Math.floor(Math.random() * side * side);
    selection = 0;
    hue = Math.random() * 360;
    light = 38 + Math.random() * 15;
    locked = false;
    host.dataset.level = String(level);
    render();
    stats();
  };
  const loop = animation(r, (_dt, now) => {
    if (!active || mode.value !== 'timed') return false;
    if (now - started >= 30000) {
      active = false;
      locked = true;
      r.status(`${t.finished} · ${t.score} ${correct}`);
      stats();
      return false;
    }
    if (now - lastMetrics > 100) {
      stats();
      lastMetrics = now;
    }
    return true;
  });
  const start = () => {
    clearTimeout(timer);
    loop.stop();
    active = true;
    locked = false;
    level = 1;
    correct = 0;
    started = performance.now();
    r.button('start').textContent = t.retry;
    r.status(mode.value === 'timed' ? t.timedMode : t.quietMode);
    next();
    if (mode.value === 'timed') loop.start();
  };
  const choose = (index: number) => {
    if (!active || locked) return;
    if (mode.value === 'timed' && performance.now() - started >= 30000) return;
    if (index === target) {
      correct++;
      best = Math.max(best, correct);
      r.status(t.correct);
      locked = true;
      stats();
      timer = window.setTimeout(() => {
        if (!active) return;
        level++;
        next();
      }, 450);
    } else r.status(t.wrongColor);
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (!active || !event.isPrimary) return;
      event.preventDefault();
      const p = r.point(event),
        g = geometry(),
        col = Math.floor((p.x - g.x) / (g.cell + g.gap)),
        row = Math.floor((p.y - g.y) / (g.cell + g.gap));
      if (col < 0 || row < 0 || col >= side || row >= side) return;
      if ((p.x - g.x) % (g.cell + g.gap) > g.cell || (p.y - g.y) % (g.cell + g.gap) > g.cell)
        return;
      choose(row * side + col);
    },
    { signal },
  );
  canvas.addEventListener(
    'keydown',
    (event) => {
      if (!active) return;
      const key = event.key;
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' '].includes(key)) return;
      event.preventDefault();
      if (event.repeat && (key === 'Enter' || key === ' ')) return;
      if (key === 'ArrowLeft') selection = (selection - 1 + side * side) % (side * side);
      if (key === 'ArrowRight') selection = (selection + 1) % (side * side);
      if (key === 'ArrowUp') selection = (selection - side + side * side) % (side * side);
      if (key === 'ArrowDown') selection = (selection + side) % (side * side);
      if (key === 'Enter' || key === ' ') choose(selection);
      render();
    },
    { signal },
  );
  canvas.addEventListener('focus', render, { signal });
  canvas.addEventListener('blur', render, { signal });
  const reset = () => {
    active = false;
    clearTimeout(timer);
    loop.stop();
    r.clear();
    r.status(t.start);
    r.metrics(`${t.best} ${best}`);
    r.button('start').textContent = t.start;
  };
  mode.addEventListener('change', reset, { signal });
  r.onAction('start', start);
  r.onAction('clear', reset);
  r.onRender(render);
  r.addCleanup(() => clearTimeout(timer));
  suspendWhenHidden(r, () => {
    if (active && mode.value === 'timed') {
      reset();
      r.status(t.interrupted);
    }
  });
  reset();
}
