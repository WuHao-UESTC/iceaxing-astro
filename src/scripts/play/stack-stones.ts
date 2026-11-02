import { makeStone, stepStones, stoneVertices, type Stone } from '../../lib/tools/stone-physics';
import type { Point } from '../../lib/tools/play-math';
import { animation, spaceShortcut, suspendWhenHidden, type PlayRuntime } from './runtime';
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, host, t, signal } = r;
  let stones: Stone[] = [],
    next = makeStone(100, 85),
    held: Stone | undefined,
    selected: Stone | undefined,
    pointer = -1,
    offset = { x: 0, y: 0 },
    paused = false,
    best = 0,
    rest = 0,
    accumulator = 0;
  const friction = host.querySelector<HTMLInputElement>('[data-friction]')!;
  const view = () => {
    const scale = Math.min(r.width / 600, r.height / 600);
    return { scale, x: (r.width - 600 * scale) / 2, y: (r.height - 600 * scale) / 2 };
  };
  const point = (event: PointerEvent) => {
    const p = r.point(event),
      v = view();
    return { x: (p.x - v.x) / v.scale, y: (p.y - v.y) / v.scale };
  };
  const inside = (p: Point, s: Stone) => {
    const vertices = stoneVertices(s);
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const a = vertices[i]!,
        b = vertices[j]!;
      if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x)
        inside = !inside;
    }
    return inside;
  };
  const stats = () => {
    const resting = stones.filter((s) => {
      if (s === held || Math.hypot(s.vx, s.vy) >= 8 || Math.abs(s.omega) >= 0.2) return false;
      const vertices = stoneVertices(s),
        bottom = Math.max(...vertices.map((p) => p.y));
      if (bottom >= 558) return true;
      const left = Math.min(...vertices.map((p) => p.x)),
        right = Math.max(...vertices.map((p) => p.x));
      return stones.some((other) => {
        if (other === s || other === held || other.y <= s.y) return false;
        const support = stoneVertices(other),
          top = Math.min(...support.map((p) => p.y));
        return (
          bottom >= top - 3 &&
          bottom <= top + 8 &&
          Math.min(right, Math.max(...support.map((p) => p.x))) -
            Math.max(left, Math.min(...support.map((p) => p.x))) >
            5
        );
      });
    });
    const height = resting.length
      ? Math.max(0, 560 - Math.min(...resting.flatMap((s) => stoneVertices(s).map((p) => p.y))))
      : 0;
    best = Math.max(best, height);
    r.metrics(
      `${t.stones} ${stones.length} / 20  ·  ${t.height} ${height.toFixed(0)}  ·  ${t.best} ${best.toFixed(0)}`,
    );
  };
  const render = (exporting = false) => {
    r.clear();
    const v = view();
    ctx.save();
    ctx.translate(v.x, v.y);
    ctx.scale(v.scale, v.scale);
    ctx.strokeStyle = r.color('--line');
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 560);
    ctx.lineTo(580, 560);
    ctx.stroke();
    const draw = (stone: Stone, preview = false) => {
      const vertices = stoneVertices(stone);
      ctx.beginPath();
      vertices.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fillStyle = `hsl(${25 + stone.hue * 35} ${8 + stone.hue * 10}% ${r.dark ? 42 + stone.hue * 16 : 60 + stone.hue * 20}%)`;
      ctx.fill();
      ctx.strokeStyle =
        stone === selected && !exporting ? r.color('--tool-coral') : r.color('--surface');
      ctx.lineWidth = stone === selected && !exporting ? 2 : 1;
      ctx.stroke();
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = r.dark ? '#fff' : '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(vertices[0]!.x + 5, vertices[0]!.y);
      ctx.lineTo(stone.x + 10, stone.y - 3);
      ctx.stroke();
      ctx.globalAlpha = 1;
      if (preview) {
        ctx.fillStyle = r.color('--muted');
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('+', stone.x, stone.y + 45);
      }
    };
    for (const stone of stones) draw(stone);
    if (!exporting && stones.length < 20) draw(next, true);
    ctx.restore();
  };
  const loop = animation(r, (dt) => {
    if (paused) return false;
    accumulator += dt;
    while (accumulator >= 1 / 120) {
      stepStones(stones, 1 / 120, Number(friction.value), held);
      accumulator -= 1 / 120;
    }
    const moving =
      held || stones.some((s) => Math.hypot(s.vx, s.vy) > 6 || Math.abs(s.omega) > 0.15);
    rest = moving ? 0 : rest + dt;
    render();
    stats();
    return rest < 1.2;
  });
  const wake = () => {
    rest = 0;
    if (!paused) loop.start();
  };
  const release = () => {
    pointer = -1;
    held = undefined;
    wake();
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (!event.isPrimary || pointer !== -1) return;
      event.preventDefault();
      canvas.focus({ preventScroll: true });
      const p = point(event);
      let stone = [...stones].reverse().find((s) => inside(p, s));
      if (!stone && inside(p, next)) {
        if (stones.length >= 20) {
          r.status(t.limit);
          return;
        }
        stone = next;
        stones.push(stone);
        next = makeStone(100, 85);
      }
      if (!stone) {
        selected = undefined;
        render();
        return;
      }
      selected = stone;
      held = stone;
      pointer = event.pointerId;
      offset = { x: stone.x - p.x, y: stone.y - p.y };
      stone.vx = 0;
      stone.vy = 0;
      stone.omega = 0;
      canvas.setPointerCapture(event.pointerId);
      wake();
      render();
      stats();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (pointer !== event.pointerId || !held) return;
      const p = point(event);
      held.x = Math.max(45, Math.min(555, p.x + offset.x));
      held.y = Math.max(30, Math.min(530, p.y + offset.y));
      render();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointerup',
    (event) => {
      if (pointer === event.pointerId) release();
    },
    { signal },
  );
  canvas.addEventListener('pointercancel', release, { signal });
  canvas.addEventListener(
    'lostpointercapture',
    () => {
      if (held) release();
    },
    { signal },
  );
  const rotate = (direction: number) => {
    const stone = selected ?? next;
    stone.angle += (direction * Math.PI) / 18;
    stone.omega = 0;
    wake();
    render();
  };
  r.onAction('rotate-left', () => rotate(-1));
  r.onAction('rotate-right', () => rotate(1));
  canvas.addEventListener(
    'keydown',
    (event) => {
      if (event.code === 'KeyQ' || event.code === 'KeyE') {
        event.preventDefault();
        rotate(event.code === 'KeyQ' ? -1 : 1);
      }
    },
    { signal },
  );
  const pause = (value: boolean) => {
    paused = value;
    r.button('pause').textContent = paused ? t.resume : t.pause;
    r.button('pause').setAttribute('aria-pressed', String(paused));
    if (paused) loop.stop();
    else wake();
  };
  r.onAction('pause', () => pause(!paused));
  spaceShortcut(r, () => pause(!paused));
  r.onAction('next-stone', () => {
    next = makeStone(100, 85);
    render();
  });
  friction.addEventListener('input', wake, { signal });
  r.onAction('clear', () => {
    loop.stop();
    held = undefined;
    selected = undefined;
    pointer = -1;
    stones = [];
    next = makeStone(100, 85);
    accumulator = 0;
    pause(false);
    render();
    stats();
    r.status(t.stoneReady);
  });
  suspendWhenHidden(r, () => {
    held = undefined;
    pointer = -1;
    pause(true);
    r.status(t.autoPaused);
  });
  r.onRender(render);
  r.onExport(() => render(true));
  r.status(t.stoneReady);
  stats();
}
