import {
  opticVertices,
  traceLight,
  pointSegmentDistance,
  type OpticObject,
  type OpticColor,
} from '../../lib/tools/optics';
import { type PlayRuntime } from './runtime';
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, host, t, signal } = r,
    mode = host.querySelector<HTMLSelectElement>('[data-playmode]')!,
    color = host.querySelector<HTMLSelectElement>('[data-light-color]')!;
  let objects: OpticObject[] = [],
    selected: OpticObject | undefined,
    pointer = -1,
    offset = { x: 0, y: 0 },
    level = 1,
    hit = false;
  const view = () => {
    const scale = Math.min(r.width / 1000, r.height / 600);
    return { scale, x: (r.width - scale * 1000) / 2, y: (r.height - scale * 600) / 2 };
  };
  const target = () => ({ x: 850, y: [170, 440, 100, 510, 300][(level - 1) % 5]! });
  const render = (exporting = false) => {
    r.clear();
    const v = view();
    ctx.save();
    ctx.translate(v.x, v.y);
    ctx.scale(v.scale, v.scale);
    const rays = traceLight(objects, 1000, 600);
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.65;
    for (const segment of rays) {
      ctx.strokeStyle = segment.color === 'white' ? r.color('--text') : segment.color;
      ctx.beginPath();
      ctx.moveTo(segment.a.x, segment.a.y);
      ctx.lineTo(segment.b.x, segment.b.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (mode.value === 'challenge') {
      const goal = target();
      hit = rays.some((ray) => pointSegmentDistance(goal, ray.a, ray.b) < 18);
      ctx.strokeStyle = r.color(hit ? '--tool-coral' : '--muted');
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 5, 0, Math.PI * 2);
      ctx.stroke();
      r.button('next-level').disabled = !hit;
      r.status(hit ? t.targetHit : `${t.level} ${level}`);
    }
    for (const object of objects) {
      ctx.strokeStyle =
        object === selected && !exporting ? r.color('--tool-coral') : r.color('--muted');
      ctx.lineWidth = object === selected && !exporting ? 2 : 1;
      if (object.kind === 'light') {
        ctx.save();
        ctx.translate(object.x, object.y);
        ctx.rotate(object.angle);
        ctx.fillStyle = r.color('--text');
        ctx.fillRect(-12, -7, 24, 14);
        ctx.beginPath();
        ctx.moveTo(12, -11);
        ctx.lineTo(26, 0);
        ctx.lineTo(12, 11);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      } else {
        const vertices = opticVertices(object);
        ctx.beginPath();
        vertices.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        if (object.kind === 'prism') {
          ctx.closePath();
          ctx.fillStyle = r.dark ? '#92cdda18' : '#4387a018';
          ctx.fill();
        }
        ctx.stroke();
      }
    }
    ctx.restore();
    r.metrics(`${t.level} ${mode.value === 'challenge' ? level : '—'}  ·  ${objects.length} / 12`);
  };
  const reset = () => {
    objects = [
      { kind: 'light', x: 75, y: 300, angle: 0, size: 18, color: 'white' },
      { kind: 'prism', x: 430, y: 300, angle: 0, size: 95, color: 'white' },
      { kind: 'mirror', x: 700, y: 370, angle: -0.5, size: 65, color: 'white' },
    ];
    selected = objects[0];
    color.value = 'white';
    r.button('next-level').hidden = mode.value !== 'challenge';
    hit = false;
    r.status('');
    render();
  };
  const point = (event: PointerEvent) => {
    const p = r.point(event),
      v = view();
    return { x: (p.x - v.x) / v.scale, y: (p.y - v.y) / v.scale };
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (pointer !== -1 || !event.isPrimary) return;
      event.preventDefault();
      canvas.focus({ preventScroll: true });
      const p = point(event);
      selected = [...objects].reverse().find((o) => {
        if (o.kind === 'light')
          return Math.hypot(p.x - o.x, p.y - o.y) < Math.max(30, 18 / view().scale);
        const vertices = opticVertices(o);
        return o.kind === 'mirror'
          ? pointSegmentDistance(p, vertices[0]!, vertices[1]!) < Math.max(18, 16 / view().scale)
          : Math.hypot(p.x - o.x, p.y - o.y) < o.size;
      });
      if (selected) {
        pointer = event.pointerId;
        offset = { x: selected.x - p.x, y: selected.y - p.y };
        color.value = selected.color;
        canvas.setPointerCapture(event.pointerId);
      }
      render();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerId !== pointer || !selected) return;
      const p = point(event);
      selected.x = Math.max(30, Math.min(970, p.x + offset.x));
      selected.y = Math.max(30, Math.min(570, p.y + offset.y));
      render();
    },
    { signal },
  );
  const release = () => {
    pointer = -1;
  };
  canvas.addEventListener('pointerup', release, { signal });
  canvas.addEventListener('pointercancel', release, { signal });
  canvas.addEventListener('lostpointercapture', release, { signal });
  const rotate = (direction: number) => {
    if (selected) {
      selected.angle += (direction * Math.PI) / 18;
      render();
    }
  };
  r.onAction('rotate-left', () => rotate(-1));
  r.onAction('rotate-right', () => rotate(1));
  canvas.addEventListener(
    'keydown',
    (event) => {
      if (['KeyQ', 'KeyE', 'Delete', 'Backspace'].includes(event.code)) {
        event.preventDefault();
        if (event.code === 'KeyQ' || event.code === 'KeyE') rotate(event.code === 'KeyQ' ? -1 : 1);
        else remove();
      }
    },
    { signal },
  );
  const add = (kind: OpticObject['kind']) => {
    if (
      objects.length >= 12 ||
      (kind === 'light' && objects.filter((o) => o.kind === 'light').length >= 3)
    ) {
      r.status(t.limit);
      return;
    }
    selected = {
      kind,
      x: 450 + Math.random() * 150,
      y: 200 + Math.random() * 200,
      angle: 0,
      size: kind === 'mirror' ? 65 : kind === 'prism' ? 75 : 18,
      color: 'white',
    };
    objects.push(selected);
    render();
  };
  const remove = () => {
    if (!selected) return;
    if (selected.kind === 'light' && objects.filter((o) => o.kind === 'light').length === 1) return;
    objects = objects.filter((o) => o !== selected);
    selected = undefined;
    render();
  };
  r.onAction('add-prism', () => add('prism'));
  r.onAction('add-mirror', () => add('mirror'));
  r.onAction('add-light', () => add('light'));
  r.onAction('delete-object', remove);
  color.addEventListener(
    'change',
    () => {
      if (selected?.kind === 'light') selected.color = color.value as OpticColor;
      render();
    },
    { signal },
  );
  mode.addEventListener(
    'change',
    () => {
      level = 1;
      reset();
    },
    { signal },
  );
  r.onAction('next-level', () => {
    if (hit) {
      level++;
      render();
    }
  });
  r.onAction('clear', reset);
  r.onRender(render);
  r.onExport(() => render(true));
  reset();
}
