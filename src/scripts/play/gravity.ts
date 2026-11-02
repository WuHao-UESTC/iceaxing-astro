import { stepGravity, type Body, type Point, type Well } from '../../lib/tools/play-math';
import { animation, spaceShortcut, suspendWhenHidden, type PlayRuntime } from './runtime';
type Ball = Body & { path: Point[] };
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, host, signal, t } = r;
  let balls: Ball[] = [],
    wells: Well[] = [],
    selected: Well | undefined,
    paused = false,
    accumulator = 0;
  let pointer = -1,
    down: Point | undefined,
    current: Point | undefined,
    moving: Well | undefined;
  const strength = host.querySelector<HTMLInputElement>('[data-strength]')!,
    trails = host.querySelector<HTMLInputElement>('[data-trails]')!;
  const stats = () =>
    r.metrics(`${t.balls} ${balls.length} / 60  ·  ${t.wells} ${wells.length} / 8`);
  const select = (well?: Well) => {
    selected = well;
    strength.disabled = !well;
    r.button('remove').disabled = !well;
    if (well) {
      strength.value = String(well.strength);
      r.status(t.selected);
    } else r.status('');
  };
  const render = () => {
    r.clear();
    for (const b of balls) {
      const color = `hsl(${b.hue} 65% ${r.dark ? 72 : 38}%)`;
      if (trails.checked) {
        for (let group = 0; group < 4; group++) {
          const start = Math.floor((b.path.length * group) / 4),
            end = Math.floor((b.path.length * (group + 1)) / 4);
          ctx.globalAlpha = 0.06 + group * 0.065;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = start; i <= end && i < b.path.length; i++) {
            const p = b.path[i]!;
            if (i === start) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const w of wells) {
      ctx.strokeStyle = r.color(w === selected ? '--tool-coral' : '--muted');
      ctx.fillStyle = r.color('--text');
      ctx.lineWidth = w === selected ? 1.5 : 0.8;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.arc(w.x, w.y, 14 + w.strength * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(w.x, w.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(w.x - 6, w.y);
      ctx.lineTo(w.x + 6, w.y);
      ctx.moveTo(w.x, w.y - 6);
      ctx.lineTo(w.x, w.y + 6);
      ctx.stroke();
    }
    if (down && current && !moving) {
      ctx.strokeStyle = r.color('--tool-coral');
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(down.x, down.y);
      ctx.lineTo(current.x, current.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(down.x, down.y, 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  };
  const loop = animation(r, (dt) => {
    if (paused || !balls.length) return false;
    accumulator += dt;
    while (accumulator >= 1 / 120) {
      stepGravity(balls, wells, 1 / 120, r.width, r.height);
      accumulator -= 1 / 120;
    }
    for (const b of balls) {
      b.path.push({ x: b.x, y: b.y });
      if (b.path.length > 120) b.path.shift();
    }
    render();
    return true;
  });
  const pause = (value: boolean) => {
    paused = value;
    r.button('pause').textContent = paused ? t.resume : t.pause;
    r.button('pause').setAttribute('aria-pressed', String(paused));
    if (paused) loop.stop();
    else if (balls.length) loop.start();
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (!event.isPrimary || pointer !== -1) return;
      event.preventDefault();
      canvas.setPointerCapture(event.pointerId);
      pointer = event.pointerId;
      down = r.point(event);
      current = down;
      moving = wells.find((w) => Math.hypot(w.x - down!.x, w.y - down!.y) < 24);
      select(moving);
      render();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (pointer !== event.pointerId) return;
      current = r.point(event);
      if (moving) {
        moving.x = current.x;
        moving.y = current.y;
      }
      render();
    },
    { signal },
  );
  const cancel = () => {
    pointer = -1;
    down = undefined;
    current = undefined;
    moving = undefined;
    render();
  };
  canvas.addEventListener(
    'pointerup',
    (event) => {
      if (pointer !== event.pointerId || !down) return;
      current = r.point(event);
      if (!moving) {
        const dx = current.x - down.x,
          dy = current.y - down.y;
        if (Math.hypot(dx, dy) < 8) {
          if (wells.length < 8) {
            const well = { ...current, strength: 1 };
            wells.push(well);
            select(well);
          } else r.status(t.limit);
        } else if (balls.length < 60) {
          const length = Math.hypot(dx, dy),
            speed = Math.min(360, length * 2);
          balls.push({
            x: down.x,
            y: down.y,
            vx: (dx / length) * speed,
            vy: (dy / length) * speed,
            radius: 4 + Math.random() * 2,
            hue: Math.random() * 360,
            path: [down],
          });
          if (!paused) loop.start();
        } else r.status(t.limit);
      }
      cancel();
      stats();
    },
    { signal },
  );
  canvas.addEventListener('pointercancel', cancel, { signal });
  canvas.addEventListener('lostpointercapture', cancel, { signal });
  strength.addEventListener(
    'input',
    () => {
      if (selected) selected.strength = Number(strength.value);
      render();
    },
    { signal },
  );
  trails.addEventListener('change', render, { signal });
  r.onAction('remove', () => {
    wells = wells.filter((w) => w !== selected);
    select();
    stats();
    render();
  });
  r.onAction('pause', () => pause(!paused));
  spaceShortcut(r, () => pause(!paused));
  r.onAction('clear', () => {
    loop.stop();
    balls = [];
    wells = [];
    select();
    cancel();
    accumulator = 0;
    pause(false);
    stats();
  });
  suspendWhenHidden(r, () => {
    cancel();
    if (balls.length) {
      pause(true);
      r.status(t.autoPaused);
    }
  });
  r.onResize((w, h) => {
    if (w && h) {
      for (const b of balls) {
        b.x *= r.width / w;
        b.y *= r.height / h;
        b.path = b.path.map((p) => ({ x: (p.x * r.width) / w, y: (p.y * r.height) / h }));
      }
      for (const well of wells) {
        well.x *= r.width / w;
        well.y *= r.height / h;
      }
    }
    cancel();
  });
  r.onRender(render);
  stats();
}
