import { WaveGrid } from '../../lib/tools/play-math';
import { animation, spaceShortcut, suspendWhenHidden, type PlayRuntime } from './runtime';
export default function mount(r: PlayRuntime) {
  const { canvas, ctx, signal, t } = r;
  let grid = new WaveGrid(100, 70),
    paused = false,
    pointer = -1,
    held: { x: number; y: number } | undefined,
    accumulator = 0,
    disturbTime = 0;
  const surface = document.createElement('canvas'),
    out = surface.getContext('2d')!;
  const intensity = r.host.querySelector<HTMLSelectElement>('[data-intensity]')!;
  const render = () => {
    const image = out.createImageData(grid.width, grid.height);
    const base = getComputedStyle(r.stage)
      .backgroundColor.match(/[\d.]+/g)!
      .map(Number);
    for (let y = 0; y < grid.height; y++)
      for (let x = 0; x < grid.width; x++) {
        const i = y * grid.width + x,
          p = i * 4;
        const dx =
          grid.current[y * grid.width + Math.max(0, x - 1)]! -
          grid.current[y * grid.width + Math.min(grid.width - 1, x + 1)]!;
        const dy =
          grid.current[Math.max(0, y - 1) * grid.width + x]! -
          grid.current[Math.min(grid.height - 1, y + 1) * grid.width + x]!;
        const light = (dx + dy * 0.7) * (intensity.value === 'vivid' ? 20 : 9);
        const depth = Math.abs(grid.current[i]!) * (intensity.value === 'vivid' ? 1 : 0.5);
        for (let c = 0; c < 3; c++)
          image.data[p + c] = Math.max(
            0,
            Math.min(
              255,
              base[c]! +
                light * (c === 0 ? 0.65 : 1) +
                (r.dark ? depth * (c === 0 ? 0.1 : 0.7) : -depth * (c === 0 ? 2 : 0.8)),
            ),
          );
        image.data[p + 3] = 255;
      }
    out.putImageData(image, 0, 0);
    r.clear();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(surface, 0, 0, r.width, r.height);
  };
  const impulse = (point: { x: number; y: number }, power = 1) =>
    grid.disturb(
      point.x / r.width,
      point.y / r.height,
      (intensity.value === 'vivid' ? 18 : 10) * power,
    );
  const loop = animation(r, (dt, time) => {
    if (paused) return false;
    if (held && time - disturbTime > 110) {
      impulse(held, 0.55);
      disturbTime = time;
    }
    accumulator += dt;
    let energy = 1;
    while (accumulator >= 1 / 60) {
      energy = grid.step();
      accumulator -= 1 / 60;
    }
    render();
    if (!held && energy < 0.015) {
      grid.clear();
      render();
      return false;
    }
    return true;
  });
  const pause = (value: boolean) => {
    paused = value;
    r.button('pause').textContent = value ? t.resume : t.pause;
    if (value) {
      loop.stop();
      held = undefined;
      pointer = -1;
    } else loop.start();
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (paused || !event.isPrimary) return;
      event.preventDefault();
      canvas.setPointerCapture(event.pointerId);
      pointer = event.pointerId;
      held = r.point(event);
      impulse(held);
      disturbTime = performance.now();
      loop.start();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerId !== pointer || !held || paused) return;
      held = r.point(event);
      if (performance.now() - disturbTime > 25) {
        impulse(held, 0.45);
        disturbTime = performance.now();
      }
    },
    { signal },
  );
  const release = () => {
    held = undefined;
    pointer = -1;
  };
  canvas.addEventListener('pointerup', release, { signal });
  canvas.addEventListener('pointercancel', release, { signal });
  canvas.addEventListener('lostpointercapture', release, { signal });
  r.onAction('pause', () => pause(!paused));
  spaceShortcut(r, () => pause(!paused));
  r.onAction('clear', () => {
    release();
    loop.stop();
    grid.clear();
    render();
  });
  intensity.addEventListener('change', render, { signal });
  suspendWhenHidden(r, () => {
    release();
    pause(true);
    r.status(t.autoPaused);
  });
  r.onResize(() => {
    const w = Math.max(40, Math.min(190, Math.round(r.width / 5))),
      h = Math.max(30, Math.min(140, Math.round(r.height / 5)));
    grid = new WaveGrid(w, h);
    surface.width = w;
    surface.height = h;
    release();
  });
  surface.width = grid.width;
  surface.height = grid.height;
  r.onRender(render);
}
