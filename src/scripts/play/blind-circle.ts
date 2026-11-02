import { scoreCircle, type Point } from '../../lib/tools/play-math';
import type { PlayRuntime } from './runtime';

export default function mount(r: PlayRuntime) {
  const { canvas, ctx, t, signal } = r;
  let armed = false,
    drawing = false,
    pointer = -1,
    points: Point[] = [],
    result: ReturnType<typeof scoreCircle> = null,
    attempts = 0,
    best = 0;
  const render = () => {
    r.clear();
    if (drawing || !points.length) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = r.color('--text');
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();
    if (result) {
      ctx.strokeStyle = r.color('--tool-coral');
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 6]);
      ctx.beginPath();
      ctx.arc(result.x, result.y, result.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };
  const stats = () =>
    r.metrics(`${t.attempts} ${attempts}  ·  ${t.best} ${best ? best.toFixed(1) : '—'}`);
  const reset = () => {
    armed = true;
    drawing = false;
    pointer = -1;
    points = [];
    result = null;
    r.status(t.draw);
    r.button('start').textContent = t.retry;
    render();
    stats();
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (!armed || drawing) return;
      event.preventDefault();
      canvas.setPointerCapture(event.pointerId);
      pointer = event.pointerId;
      drawing = true;
      points = [r.point(event)];
      r.status(t.drawing);
      render();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (drawing && event.pointerId === pointer) {
        const samples = event.getCoalescedEvents?.();
        for (const sample of samples?.length ? samples : [event]) points.push(r.point(sample));
      }
    },
    { signal },
  );
  canvas.addEventListener(
    'pointerup',
    (event) => {
      if (!drawing || event.pointerId !== pointer) return;
      points.push(r.point(event));
      drawing = false;
      armed = false;
      result = scoreCircle(points);
      if (result) {
        attempts++;
        best = Math.max(best, result.score);
        r.status(`${t.score} ${result.score.toFixed(1)} / 100`);
        r.metrics(
          `${t.roundness} ${result.roundness.toFixed(1)}%  ·  ${t.closure} ${result.closure.toFixed(1)}%  ·  ${t.coverage} ${result.coverage.toFixed(1)}%\n${t.attempts} ${attempts}  ·  ${t.best} ${best.toFixed(1)}`,
        );
      } else {
        r.status(t.invalidCircle);
        stats();
      }
      render();
    },
    { signal },
  );
  const cancel = () => {
    if (drawing) {
      drawing = false;
      points = [];
      armed = true;
      r.status(t.draw);
      render();
    }
  };
  canvas.addEventListener('pointercancel', cancel, { signal });
  canvas.addEventListener('lostpointercapture', cancel, { signal });
  r.onAction('start', reset);
  r.onAction('clear', reset);
  r.onRender(render);
  r.onResize((w, h) => {
    if (w && h) {
      const scale = Math.min(r.width / w, r.height / h);
      const ox = (r.width - w * scale) / 2,
        oy = (r.height - h * scale) / 2;
      points = points.map((p) => ({ x: p.x * scale + ox, y: p.y * scale + oy }));
      if (result)
        result = {
          ...result,
          x: result.x * scale + ox,
          y: result.y * scale + oy,
          radius: result.radius * scale,
        };
      cancel();
    }
  });
  r.status(t.readyCircle);
  stats();
}
