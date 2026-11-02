import {
  addMotion,
  createBrush,
  EFFECT_DURATION,
  MAX_SPEED,
  randomPen,
  stepBrush,
  type BrushState,
  type Pen,
} from '../lib/tools/reverie';

class ReverieCanvas extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    const canvas = this.querySelector<HTMLCanvasElement>('canvas');
    const context = canvas?.getContext('2d');
    const brush = this.querySelector<HTMLElement>('.reverie-brush');
    if (!canvas || !context || !brush) return;
    const copy = JSON.parse(this.dataset.copy ?? '{}') as Record<string, string>;
    const pauseButton = this.querySelector<HTMLButtonElement>('[data-action="pause"]')!;
    const penLabel = this.querySelector<HTMLElement>('[data-pen-label]')!;
    const stateLabel = this.querySelector<HTMLElement>('[data-state]')!;
    const effectLabel = this.querySelector<HTMLElement>('.reverie-effects')!;
    const announcement = this.querySelector<HTMLElement>('[data-announcement]')!;
    const keys = new Set<string>();
    const touches = new Map<number, string>();
    const controller = new AbortController();
    const { signal } = controller;
    let width = 0,
      height = 0,
      ratio = 1;
    let state: BrushState = createBrush(0, 0);
    let pen: Pen = { kind: 'fountain', color: '#243d50', width: 2.4 };
    let paused = false,
      frame = 0,
      lastTime = 0,
      accumulated = 0,
      lastStatus = 0;
    const STEP = 1 / 120;

    const refreshStatus = () => {
      stateLabel.textContent = paused
        ? copy.paused!
        : state.started
          ? copy.running!
          : copy.waiting!;
      pauseButton.textContent = paused ? copy.resume! : copy.pause!;
      pauseButton.setAttribute('aria-pressed', String(paused));
      const groups = new Map<string, { count: number; remaining: number }>();
      for (const effect of state.effects) {
        const group = groups.get(effect.kind) ?? { count: 0, remaining: 0 };
        group.count++;
        group.remaining = Math.max(group.remaining, EFFECT_DURATION - effect.age);
        groups.set(effect.kind, group);
      }
      effectLabel.textContent = [...groups]
        .map(
          ([kind, group]) =>
            `${copy[kind]}${group.count > 1 ? ` ×${group.count}` : ''} ${group.remaining.toFixed(1)}s`,
        )
        .join(' · ');
    };
    const positionBrush = () => {
      brush.style.left = `${state.x}px`;
      brush.style.top = `${state.y}px`;
    };
    const showPen = () => {
      this.style.setProperty('--pen-color', pen.color);
      this.dataset.pen = pen.kind;
      penLabel.textContent = `${copy[pen.kind]} · ${pen.width.toFixed(1)} px`;
    };
    const paint = (x: number, y: number) => {
      const distance = Math.hypot(state.x - x, state.y - y);
      if (distance < 0.015) return;
      const speed = Math.hypot(state.vx, state.vy) / MAX_SPEED;
      context.save();
      context.strokeStyle = pen.color;
      context.fillStyle = pen.color;
      context.lineJoin = 'round';
      context.lineCap = pen.kind === 'highlighter' ? 'butt' : 'round';
      context.lineWidth = pen.width;
      if (pen.kind === 'fountain') context.lineWidth *= 0.4 + (1 - speed) * 1.15;
      if (pen.kind === 'marker') context.globalAlpha = 0.88;
      if (pen.kind === 'highlighter') context.globalAlpha = 0.24;
      if (pen.kind === 'pencil') {
        context.globalAlpha = 0.22;
        context.lineWidth *= 0.65;
      }
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(state.x, state.y);
      context.stroke();
      if (pen.kind === 'pencil') {
        // Small graphite flecks give the pencil a different texture from solid ink.
        const count = Math.ceil(distance * 1.5);
        for (let i = 0; i < count; i++) {
          const progress = Math.random();
          context.globalAlpha = 0.08 + Math.random() * 0.28;
          context.fillRect(
            x + (state.x - x) * progress + (Math.random() - 0.5) * pen.width,
            y + (state.y - y) * progress + (Math.random() - 0.5) * pen.width,
            0.4 + Math.random() * 0.6,
            0.4 + Math.random() * 0.6,
          );
        }
      }
      context.restore();
    };
    const tick = (time: number) => {
      frame = 0;
      if (paused || document.hidden) return;
      accumulated += Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const held = new Set([...keys, ...touches.values()]);
      const input = {
        x: Number(held.has('d')) - Number(held.has('a')),
        y: Number(held.has('s')) - Number(held.has('w')),
      };
      while (accumulated >= STEP) {
        const x = state.x,
          y = state.y;
        stepBrush(state, input, STEP, width, height);
        paint(x, y);
        accumulated -= STEP;
      }
      positionBrush();
      if (time - lastStatus > 100) {
        refreshStatus();
        lastStatus = time;
      }
      if (state.started) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame || paused || document.hidden || !width || !height) return;
      if (keys.size || touches.size) state.started = true;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const releaseControls = () => {
      keys.clear();
      touches.clear();
      this.querySelectorAll('[data-held]').forEach((button) => button.removeAttribute('data-held'));
    };
    const setPaused = (value: boolean) => {
      paused = value;
      cancelAnimationFrame(frame);
      frame = 0;
      accumulated = 0;
      releaseControls();
      refreshStatus();
      if (!paused && state.started) start();
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const nextRatio = Math.min(window.devicePixelRatio || 1, 2);
      if (width === bounds.width && height === bounds.height && ratio === nextRatio) return;
      const snapshot = document.createElement('canvas');
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      snapshot.getContext('2d')?.drawImage(canvas, 0, 0);
      const oldWidth = width,
        oldHeight = height;
      width = bounds.width;
      height = bounds.height;
      ratio = nextRatio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (oldWidth && oldHeight) {
        const scale = Math.min(width / oldWidth, height / oldHeight);
        const offsetX = (width - oldWidth * scale) / 2,
          offsetY = (height - oldHeight * scale) / 2;
        context.drawImage(snapshot, offsetX, offsetY, oldWidth * scale, oldHeight * scale);
        state.x = offsetX + state.x * scale;
        state.y = offsetY + state.y * scale;
        state.vx *= scale;
        state.vy *= scale;
      } else state = createBrush(width, height);
      positionBrush();
    };
    const randomMotion = () => {
      const kind = addMotion(state);
      announcement.textContent = `${copy[kind]} · 2s`;
      refreshStatus();
      start();
    };
    const changePen = () => {
      pen = randomPen();
      showPen();
      announcement.textContent = penLabel.textContent;
    };
    const clear = () => {
      setPaused(true);
      context.clearRect(0, 0, width, height);
      state = createBrush(width, height);
      paused = false;
      positionBrush();
      refreshStatus();
    };
    const save = () => {
      const image = document.createElement('canvas');
      image.width = canvas.width;
      image.height = canvas.height;
      const ink = image.getContext('2d');
      if (!ink) return;
      ink.fillStyle = getComputedStyle(canvas.parentElement!).backgroundColor;
      ink.fillRect(0, 0, image.width, image.height);
      // Match the displayed theme, including the existing strokes' ink treatment.
      ink.filter = getComputedStyle(canvas).filter;
      ink.drawImage(canvas, 0, 0);
      image.toBlob((blob) => {
        if (!blob) {
          announcement.textContent = copy.failed!;
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reverie-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        announcement.textContent = copy.saved!;
      }, 'image/png');
    };
    this.addEventListener(
      'click',
      (event) => {
        const button = (event.target as Element).closest<HTMLButtonElement>('[data-action]');
        if (!button) return;
        switch (button.dataset.action) {
          case 'motion':
            randomMotion();
            break;
          case 'pen':
            changePen();
            break;
          case 'pause':
            setPaused(!paused);
            break;
          case 'clear':
            clear();
            break;
          case 'save':
            save();
            break;
        }
      },
      { signal },
    );
    const isTyping = (event: KeyboardEvent) => {
      const target = event.target;
      return (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing ||
        (target instanceof HTMLElement &&
          (target.isContentEditable ||
            !!target.closest('input, textarea, select, dialog[open]'))) ||
        !!document.querySelector('dialog[open]')
      );
    };
    const keyFor = (event: KeyboardEvent) =>
      /^Key[WASDUI]$/.test(event.code)
        ? event.code.slice(3).toLowerCase()
        : event.key.toLowerCase();
    document.addEventListener(
      'keydown',
      (event) => {
        if (isTyping(event)) return;
        const key = keyFor(event);
        if ('wasd'.includes(key) && key.length === 1) {
          event.preventDefault();
          if (!paused) {
            keys.add(key);
            start();
          }
        } else if ((key === 'u' || key === 'i') && !event.repeat) {
          event.preventDefault();
          if (key === 'u') randomMotion();
          else changePen();
        } else if (
          event.code === 'Space' &&
          !(event.target instanceof Element && event.target.closest('button, a')) &&
          !event.repeat
        ) {
          event.preventDefault();
          setPaused(!paused);
        }
      },
      { signal },
    );
    document.addEventListener('keyup', (event) => keys.delete(keyFor(event)), { signal });
    this.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach((button) => {
      button.addEventListener(
        'pointerdown',
        (event) => {
          if (paused) return;
          event.preventDefault();
          button.setPointerCapture(event.pointerId);
          touches.set(event.pointerId, button.dataset.direction!);
          button.setAttribute('data-held', '');
          start();
        },
        { signal },
      );
      const release = (event: PointerEvent) => {
        touches.delete(event.pointerId);
        if (![...touches.values()].includes(button.dataset.direction!))
          button.removeAttribute('data-held');
      };
      button.addEventListener('pointerup', release, { signal });
      button.addEventListener('pointercancel', release, { signal });
      button.addEventListener('lostpointercapture', release, { signal });
      // Keyboard and assistive technology can activate the same directional controls.
      button.addEventListener(
        'click',
        (event) => {
          if (event.detail || paused) return;
          const direction = button.dataset.direction!;
          state.started = true;
          state.vx += direction === 'a' ? -45 : direction === 'd' ? 45 : 0;
          state.vy += direction === 'w' ? -45 : direction === 's' ? 45 : 0;
          start();
        },
        { signal },
      );
    });
    const suspend = () => {
      releaseControls();
      if (state.started) setPaused(true);
    };
    window.addEventListener('blur', suspend, { signal });
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) suspend();
      },
      { signal },
    );
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    showPen();
    refreshStatus();
    this.cleanup = () => {
      cancelAnimationFrame(frame);
      controller.abort();
      observer.disconnect();
    };
  }

  disconnectedCallback() {
    this.cleanup?.();
  }
}

if (!customElements.get('reverie-canvas')) customElements.define('reverie-canvas', ReverieCanvas);
