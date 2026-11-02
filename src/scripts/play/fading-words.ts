import { animation, suspendWhenHidden, type PlayRuntime } from './runtime';
type Particle = { x: number; y: number; vx: number; vy: number; size: number };
export default function mount(r: PlayRuntime) {
  const { ctx, host, t, signal } = r;
  const input = host.querySelector<HTMLTextAreaElement>('[data-words]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let timer = 0,
    composing = false,
    kept = false,
    drifting = false,
    text = '',
    particles: Particle[] = [],
    age = 0;
  const cancel = () => clearTimeout(timer);
  r.addCleanup(cancel);
  const lines = () => {
    const style = getComputedStyle(input),
      size = parseFloat(style.fontSize),
      padding = parseFloat(style.paddingLeft),
      lineHeight = parseFloat(style.lineHeight);
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const maxWidth = r.width - padding * 2;
    const output: string[] = [];
    for (const paragraph of text.split('\n')) {
      let line = '';
      for (const char of paragraph) {
        if (line && ctx.measureText(line + char).width > maxWidth) {
          output.push(line);
          line = char;
        } else line += char;
      }
      output.push(line);
    }
    return { output, size, padding, lineHeight };
  };
  const drawText = () => {
    r.clear();
    const { output, padding, lineHeight, size } = lines();
    ctx.fillStyle = r.color('--text');
    ctx.textBaseline = 'alphabetic';
    output.forEach((line, i) => ctx.fillText(line, padding, padding + size + i * lineHeight));
  };
  const render = () => {
    if (!drifting) {
      text = input.value;
      drawText();
      return;
    }
    if (reduced.matches) {
      drawText();
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.globalAlpha = Math.max(0, 1 - age / 1.5);
      ctx.fillRect(0, 0, r.width, r.height);
      ctx.restore();
      return;
    }
    r.clear();
    ctx.fillStyle = r.color('--text');
    ctx.globalAlpha = Math.max(0, 1 - age / 4);
    for (const p of particles) ctx.fillRect(p.x, p.y, p.size, p.size);
    ctx.globalAlpha = 1;
  };
  const loop = animation(r, (dt) => {
    if (!drifting) return false;
    age += dt;
    if (!reduced.matches)
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx += Math.sin(p.y * 0.02 + age) * 4 * dt;
        p.vy -= 5 * dt;
      }
    render();
    if (age >= (reduced.matches ? 1.5 : 4)) {
      drifting = false;
      text = '';
      input.value = '';
      input.hidden = false;
      particles = [];
      r.button('edit').hidden = true;
      r.status(t.quiet);
      r.clear();
      return false;
    }
    return true;
  });
  const release = () => {
    if (composing || !input.value.trim() || drifting) return;
    cancel();
    text = input.value;
    age = 0;
    drawText();
    particles = [];
    if (!reduced.matches) {
      const image = r.ctx.getImageData(0, 0, r.canvas.width, r.canvas.height),
        ratio = r.canvas.width / r.width;
      const step = Math.max(2, Math.round(ratio * 2));
      for (let y = 0; y < image.height; y += step)
        for (let x = 0; x < image.width; x += step) {
          if (image.data[(y * image.width + x) * 4 + 3]! > 100 && particles.length < 12000)
            particles.push({
              x: x / ratio,
              y: y / ratio,
              vx: 10 + Math.random() * 30,
              vy: -8 - Math.random() * 20,
              size: Math.max(1, (step / ratio) * 0.7),
            });
        }
    }
    drifting = true;
    input.hidden = true;
    r.button('edit').hidden = false;
    r.status(t.drifting);
    loop.start();
  };
  const schedule = () => {
    cancel();
    if (composing || kept || !input.value.trim() || drifting) return;
    timer = window.setTimeout(() => {
      r.status(t.prompt);
      timer = window.setTimeout(release, 2000);
    }, 3000);
  };
  const edit = () => {
    cancel();
    loop.stop();
    drifting = false;
    particles = [];
    input.hidden = false;
    input.value = text;
    r.button('edit').hidden = true;
    r.clear();
    input.focus({ preventScroll: true });
    r.status(kept ? t.kept : t.quiet);
    schedule();
  };
  input.addEventListener(
    'input',
    () => {
      text = input.value;
      r.clear();
      r.status(kept ? t.kept : t.quiet);
      schedule();
    },
    { signal },
  );
  input.addEventListener(
    'compositionstart',
    () => {
      composing = true;
      cancel();
    },
    { signal },
  );
  input.addEventListener(
    'compositionend',
    () => {
      composing = false;
      text = input.value;
      schedule();
    },
    { signal },
  );
  r.onAction('release', release);
  r.onAction('edit', edit);
  r.onAction('keep', () => {
    kept = !kept;
    r.button('keep').setAttribute('aria-pressed', String(kept));
    cancel();
    if (drifting) edit();
    r.status(kept ? t.kept : t.quiet);
    if (!kept) schedule();
  });
  r.onAction('clear', () => {
    cancel();
    loop.stop();
    drifting = false;
    composing = false;
    kept = false;
    text = '';
    input.value = '';
    input.hidden = false;
    particles = [];
    r.button('edit').hidden = true;
    r.button('keep').setAttribute('aria-pressed', 'false');
    r.clear();
    r.status(t.quiet);
  });
  suspendWhenHidden(r, () => {
    cancel();
    if (drifting) {
      loop.stop();
      r.status(t.autoPaused);
    }
  });
  // Returning to editing is always explicit after a background suspension.
  r.onResize((w, h) => {
    if (w && h && drifting)
      for (const p of particles) {
        p.x *= r.width / w;
        p.y *= r.height / h;
      }
  });
  r.onRender(() => {
    if (drifting) render();
    else r.clear();
  });
  // Export the text itself, rather than the editable textarea UI.
  r.onExport(() => {
    if (drifting) render();
    else {
      text = input.value;
      drawText();
    }
  });
  r.status(t.quiet);
}
