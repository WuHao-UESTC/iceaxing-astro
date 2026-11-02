import { starField } from '../../lib/tools/perception';
import type { PlayRuntime } from './runtime';
export default function mount(r: PlayRuntime) {
  const { ctx, canvas, host, t, signal } = r;
  const name = host.querySelector<HTMLInputElement>('[data-star-name]')!,
    note = host.querySelector<HTMLInputElement>('[data-star-note]')!,
    seed = host.querySelector<HTMLInputElement>('[data-seed]')!;
  let stars = starField(''),
    edges: [number, number][] = [],
    history: { edge: [number, number]; removed: boolean }[] = [],
    selected = -1,
    card = false,
    currentSeed = '';
  const randomSeed = () => crypto.getRandomValues(new Uint32Array(2)).join('-');
  const starHeight = () => r.height * (card ? 0.63 : 0.86);
  const lines = (text: string, maxWidth: number, maxLines: number) => {
    const output: string[] = [];
    let line = '';
    for (const char of text) {
      if (line && ctx.measureText(line + char).width > maxWidth) {
        output.push(line);
        line = char;
      } else line += char;
    }
    if (line) output.push(line);
    if (output.length > maxLines) {
      output.length = maxLines;
      let last = output[maxLines - 1]!;
      while (last && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
      output[maxLines - 1] = last + '…';
    }
    return output;
  };
  const render = (exporting = false) => {
    r.clear();
    const gradient = ctx.createLinearGradient(0, 0, r.width, r.height);
    gradient.addColorStop(0, r.dark ? '#101923' : '#f0f4f8');
    gradient.addColorStop(1, r.dark ? '#1c2836' : '#fbfcfd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, r.width, r.height);
    const height = starHeight(),
      linked = new Set(edges.flat());
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = r.dark ? '#b9d2e3' : '#5d7b91';
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(stars[a]!.x * r.width, stars[a]!.y * height);
      ctx.lineTo(stars[b]!.x * r.width, stars[b]!.y * height);
      ctx.stroke();
    }
    stars.forEach((star, i) => {
      const connected = linked.has(i);
      ctx.globalAlpha = connected ? 1 : star.brightness * (card ? 0.5 : 1);
      ctx.fillStyle = r.dark ? '#e7edf5' : '#4e6a80';
      ctx.beginPath();
      ctx.arc(star.x * r.width, star.y * height, star.radius + (connected ? 1 : 0), 0, Math.PI * 2);
      ctx.fill();
      if (i === selected && !card && !exporting) {
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = r.color('--tool-coral');
        ctx.beginPath();
        ctx.arc(star.x * r.width, star.y * height, 8, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    if (card) {
      const padding = Math.min(32, r.width * 0.08);
      let y = r.height * 0.7;
      ctx.textAlign = 'center';
      ctx.fillStyle = r.dark ? '#e7edf5' : '#30485a';
      ctx.font = `${Math.max(14, Math.min(26, r.width * 0.055))}px ${getComputedStyle(host).fontFamily}`;
      for (const line of lines(name.value.trim() || t.untitled, r.width - padding * 2, 2)) {
        ctx.fillText(line, r.width / 2, y);
        y += 28;
      }
      ctx.font = '12px sans-serif';
      ctx.globalAlpha = 0.75;
      for (const line of lines(note.value.trim(), r.width - padding * 2, 3)) {
        ctx.fillText(line, r.width / 2, y + 6);
        y += 18;
      }
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillText(
        new Date().toLocaleDateString(host.dataset.locale),
        r.width / 2,
        Math.min(r.height - 35, y + 25),
      );
      ctx.fillText(`SEED / ${currentSeed}`, r.width / 2, r.height - 16, r.width - padding * 2);
      ctx.globalAlpha = 1;
      ctx.textAlign = 'start';
    }
    r.metrics(`${t.connections} ${edges.length}  ·  ${t.seed} ${currentSeed}`);
  };
  const setCard = (value: boolean) => {
    card = value;
    r.button('finish-card').textContent = card ? t.editCard : t.finishCard;
    host.dataset.card = String(card);
    render();
  };
  const restore = (value: string) => {
    value = value.trim().slice(0, 64);
    if (!value) {
      r.status(t.seedRequired);
      return;
    }
    seed.value = value;
    currentSeed = value;
    stars = starField(value);
    edges = [];
    history = [];
    selected = -1;
    setCard(false);
    const url = new URL(location.href);
    url.searchParams.set('seed', value);
    historyReplace(url);
    r.status('');
    render();
  };
  const historyReplace = (url: URL) => window.history.replaceState(window.history.state, '', url);
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (card || !event.isPrimary) return;
      event.preventDefault();
      const p = r.point(event),
        height = starHeight();
      let index = -1,
        distance = 22;
      stars.forEach((star, i) => {
        const d = Math.hypot(star.x * r.width - p.x, star.y * height - p.y);
        if (d < distance) {
          index = i;
          distance = d;
        }
      });
      if (index < 0) return;
      if (selected === index) {
        selected = -1;
        render();
        return;
      }
      if (selected !== -1) {
        const a = Math.min(selected, index),
          b = Math.max(selected, index),
          existing = edges.findIndex((edge) => edge[0] === a && edge[1] === b),
          edge: [number, number] = [a, b];
        if (existing >= 0) {
          edges.splice(existing, 1);
          history.push({ edge, removed: true });
        } else {
          edges.push(edge);
          history.push({ edge, removed: false });
        }
      }
      selected = index;
      r.status(t.starSelected);
      render();
    },
    { signal },
  );
  r.onAction('undo', () => {
    const last = history.pop();
    if (last) {
      if (last.removed) edges.push(last.edge);
      else edges = edges.filter((edge) => edge[0] !== last.edge[0] || edge[1] !== last.edge[1]);
    }
    selected = -1;
    render();
  });
  r.onAction('apply-seed', () => restore(seed.value));
  r.onAction('new-sky', () => restore(randomSeed()));
  r.onAction('finish-card', () => setCard(!card));
  r.onAction('clear', () => {
    edges = [];
    history = [];
    selected = -1;
    setCard(false);
    r.status('');
  });
  seed.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        restore(seed.value);
      }
    },
    { signal },
  );
  name.addEventListener('input', () => render(), { signal });
  note.addEventListener('input', () => render(), { signal });
  r.onRender(render);
  r.onExport(() => render(true));
  restore(new URL(location.href).searchParams.get('seed') || randomSeed());
}
