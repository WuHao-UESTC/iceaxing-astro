import type { PlayLabels, PlayToolId } from '../../lib/tools/play-catalog';

export type PlayRuntime = ReturnType<typeof createRuntime>;
export function createRuntime(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>('canvas')!;
  const ctx = canvas.getContext('2d')!;
  const stage = host.querySelector<HTMLElement>('.play-stage')!;
  const t = JSON.parse(host.dataset.labels!) as PlayLabels;
  const controller = new AbortController();
  const cleanup: (() => void)[] = [];
  let width = 0,
    height = 0,
    ratio = 1;
  let render = () => {},
    resized = (_oldWidth: number, _oldHeight: number) => {},
    exportRender: (() => void) | undefined;
  const runtime = {
    host,
    canvas,
    ctx,
    stage,
    t,
    signal: controller.signal,
    tool: host.dataset.tool as PlayToolId,
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get dark() {
      return document.documentElement.dataset.theme === 'dark';
    },
    color(name = '--text') {
      return getComputedStyle(host).getPropertyValue(name).trim();
    },
    status(value: string) {
      host.querySelector('[data-status]')!.textContent = value;
    },
    metrics(value: string) {
      host.querySelector('[data-metrics]')!.textContent = value;
    },
    button(action: string) {
      return host.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)!;
    },
    onAction(action: string, fn: () => void) {
      runtime.button(action)?.addEventListener('click', fn, { signal: controller.signal });
    },
    point(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(width, event.clientX - rect.left)),
        y: Math.max(0, Math.min(height, event.clientY - rect.top)),
      };
    },
    clear() {
      ctx.clearRect(0, 0, width, height);
    },
    onRender(fn: () => void) {
      render = fn;
    },
    onResize(fn: (oldWidth: number, oldHeight: number) => void) {
      resized = fn;
    },
    onExport(fn: () => void) {
      exportRender = fn;
    },
    addCleanup(fn: () => void) {
      cleanup.push(fn);
    },
    render() {
      render();
    },
    save() {
      if (exportRender) exportRender();
      else render();
      const image = document.createElement('canvas');
      image.width = canvas.width;
      image.height = canvas.height;
      const out = image.getContext('2d')!;
      out.fillStyle = getComputedStyle(stage).backgroundColor;
      out.fillRect(0, 0, image.width, image.height);
      out.drawImage(canvas, 0, 0);
      render();
      image.toBlob((blob) => {
        if (!blob) {
          runtime.status(t.saveError);
          return;
        }
        const url = URL.createObjectURL(blob),
          link = document.createElement('a');
        link.href = url;
        link.download = `${runtime.tool}-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        runtime.status(t.saved);
      }, 'image/png');
    },
    dispose() {
      controller.abort();
      cleanup.forEach((fn) => fn());
    },
  };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const oldWidth = width,
      oldHeight = height,
      nextRatio = Math.min(devicePixelRatio || 1, 2);
    if (width === rect.width && height === rect.height && ratio === nextRatio) return;
    width = rect.width;
    height = rect.height;
    ratio = nextRatio;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    resized(oldWidth, oldHeight);
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const theme = new MutationObserver(() => render());
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  cleanup.push(
    () => observer.disconnect(),
    () => theme.disconnect(),
  );
  runtime.onAction('save', () => runtime.save());
  return runtime;
}

export function animation(runtime: PlayRuntime, step: (dt: number, time: number) => boolean) {
  let frame = 0,
    last = 0,
    active = false;
  const tick = (time: number) => {
    frame = 0;
    if (!active) return;
    const dt = Math.min((time - last) / 1000, 0.05);
    last = time;
    const keepRunning = step(dt, time);
    if (active && keepRunning) frame = requestAnimationFrame(tick);
    else active = false;
  };
  const stop = () => {
    active = false;
    cancelAnimationFrame(frame);
    frame = 0;
  };
  runtime.addCleanup(stop);
  return {
    start() {
      if (!active) {
        active = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    },
    stop,
  };
}

export function spaceShortcut(runtime: PlayRuntime, fn: () => void) {
  document.addEventListener(
    'keydown',
    (event) => {
      if (
        event.code !== 'Space' ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.isComposing
      )
        return;
      if (document.querySelector('dialog[open]')) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest('input,textarea,select,button,a'))
      )
        return;
      event.preventDefault();
      if (!event.repeat) fn();
    },
    { signal: runtime.signal },
  );
}

export function suspendWhenHidden(runtime: PlayRuntime, fn: () => void) {
  window.addEventListener('blur', fn, { signal: runtime.signal });
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) fn();
    },
    { signal: runtime.signal },
  );
  document.addEventListener('page:leaving', fn, { signal: runtime.signal });
}
