import { animation, spaceShortcut, suspendWhenHidden, type PlayRuntime } from './runtime';
type Footprint = { x: number; y: number; angle: number; age: number; side: number };
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, host, t, signal } = r,
    wind = host.querySelector<HTMLInputElement>('[data-wind]')!,
    snow = host.querySelector<HTMLInputElement>('[data-snowfall]')!;
  let x = 0.5,
    y = 0.5,
    angle = 0,
    paused = false,
    target: { x: number; y: number } | undefined,
    pointer = -1,
    prints: Footprint[] = [],
    distance = 0,
    side = 1;
  const keys = new Set<string>();
  const flakes = Array.from({ length: 110 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: 0.6 + Math.random() * 1.5,
    speed: 15 + Math.random() * 35,
  }));
  const render = (person = true) => {
    r.clear();
    const gradient = ctx.createLinearGradient(0, 0, r.width, r.height);
    gradient.addColorStop(0, r.dark ? '#142029' : '#edf3f6');
    gradient.addColorStop(1, r.dark ? '#202d36' : '#fcfdfd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, r.width, r.height);
    for (const foot of prints) {
      ctx.save();
      ctx.translate(foot.x * r.width, foot.y * r.height);
      ctx.rotate(foot.angle);
      ctx.globalAlpha = Math.max(0, 0.45 * (1 - foot.age));
      ctx.fillStyle = r.dark ? '#92afc1' : '#78909f';
      ctx.beginPath();
      ctx.ellipse(0, foot.side * 4, 4, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = Number(snow.value) * 0.8;
    ctx.fillStyle = r.dark ? '#d9e8f0' : '#a3b7c5';
    for (const f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x * r.width, f.y * r.height, f.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (person) {
      ctx.fillStyle = r.dark ? '#dde7e9' : '#344e5b';
      ctx.beginPath();
      ctx.arc(x * r.width, y * r.height, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath();
      ctx.moveTo(x * r.width, y * r.height);
      ctx.lineTo(x * r.width + Math.cos(angle) * 8, y * r.height + Math.sin(angle) * 8);
      ctx.stroke();
    }
  };
  const metrics = () =>
    r.metrics(
      `${t.steps} ${prints.length}  ·  ${t.wind} ${Number(wind.value).toFixed(1)}  ·  ${t.snowfall} ${Math.round(Number(snow.value) * 100)}%`,
    );
  const loop = animation(r, (dt) => {
    if (paused) return false;
    if (!r.width || !r.height) return true;
    let dx = Number(keys.has('d')) - Number(keys.has('a')),
      dy = Number(keys.has('s')) - Number(keys.has('w'));
    if ((dx || dy) && target) target = undefined;
    if (!dx && !dy && target) {
      dx = (target.x - x) * r.width;
      dy = (target.y - y) * r.height;
      if (Math.hypot(dx, dy) < 3) {
        target = undefined;
        dx = dy = 0;
      }
    }
    const length = Math.hypot(dx, dy);
    if (length) {
      angle = Math.atan2(dy, dx);
      const move = Math.min(120 * dt, target ? length : Infinity),
        oldX = x,
        oldY = y;
      x = Math.max(0.025, Math.min(0.975, x + ((dx / length) * move) / r.width));
      y = Math.max(0.035, Math.min(0.965, y + ((dy / length) * move) / r.height));
      distance += Math.hypot((x - oldX) * r.width, (y - oldY) * r.height);
      if (distance >= 12) {
        distance %= 12;
        prints.push({ x, y, angle, age: 0, side });
        side *= -1;
        if (prints.length > 3500) prints.shift();
      }
    }
    const rate = Number(snow.value),
      breeze = Number(wind.value);
    for (const foot of prints) foot.age += dt * rate * (0.025 + Math.abs(breeze) * 0.012);
    prints = prints.filter((p) => p.age < 1);
    for (const f of flakes) {
      f.x = (f.x + (breeze * f.speed * dt) / r.width + 1) % 1;
      f.y = (f.y + (f.speed * (0.3 + rate) * dt) / r.height) % 1;
    }
    render();
    metrics();
    return true;
  });
  const pause = (value: boolean) => {
    paused = value;
    r.button('pause').textContent = value ? t.resume : t.pause;
    r.button('pause').setAttribute('aria-pressed', String(value));
    if (value) {
      loop.stop();
      keys.clear();
      target = undefined;
    } else loop.start();
  };
  const setTarget = (event: PointerEvent) => {
    const p = r.point(event);
    target = { x: p.x / r.width, y: p.y / r.height };
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (!event.isPrimary || paused) return;
      event.preventDefault();
      pointer = event.pointerId;
      canvas.setPointerCapture(pointer);
      setTarget(event);
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerId === pointer && !paused) setTarget(event);
    },
    { signal },
  );
  const release = () => {
    pointer = -1;
  };
  canvas.addEventListener('pointerup', release, { signal });
  canvas.addEventListener(
    'pointercancel',
    () => {
      release();
      target = undefined;
    },
    { signal },
  );
  canvas.addEventListener('lostpointercapture', release, { signal });
  const key = (event: KeyboardEvent) =>
    /^Key[WASD]$/.test(event.code) ? event.code.slice(3).toLowerCase() : '';
  document.addEventListener(
    'keydown',
    (event) => {
      const k = key(event);
      if (
        !k ||
        paused ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.isComposing ||
        document.querySelector('dialog[open]')
      )
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest('input,textarea,select'))
      )
        return;
      event.preventDefault();
      keys.add(k);
    },
    { signal },
  );
  document.addEventListener('keyup', (event) => keys.delete(key(event)), { signal });
  r.onAction('pause', () => pause(!paused));
  spaceShortcut(r, () => pause(!paused));
  r.onAction('clear', () => {
    prints = [];
    target = undefined;
    keys.clear();
    x = y = 0.5;
    distance = 0;
    render();
    metrics();
  });
  wind.addEventListener('input', metrics, { signal });
  snow.addEventListener(
    'input',
    () => {
      render();
      metrics();
    },
    { signal },
  );
  suspendWhenHidden(r, () => {
    release();
    pause(true);
    r.status(t.autoPaused);
  });
  r.onRender(render);
  r.onExport(() => render(false));
  metrics();
  loop.start();
}
