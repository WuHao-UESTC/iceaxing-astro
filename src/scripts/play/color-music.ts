import { animation, suspendWhenHidden, type PlayRuntime } from './runtime';
type Note = { x: number; y: number; time: number; pitch: number; hue: number };
type Light = Note & { born: number };
export default function mount(r: PlayRuntime) {
  const { canvas, ctx, host, signal, t } = r;
  const volume = host.querySelector<HTMLInputElement>('[data-volume]')!,
    progress = host.querySelector<HTMLProgressElement>('[data-progress]')!;
  let audio: AudioContext | undefined,
    master: GainNode | undefined,
    muted = false,
    audioFailed = false;
  const voices = new Set<OscillatorNode>();
  let mode: 'idle' | 'record' | 'loop' = 'idle',
    notes: Note[] = [],
    lights: Light[] = [],
    pending: { at: number; note: Note }[] = [];
  let recordStart = 0,
    loopStart = 0,
    audioStart = 0,
    cycle = 0,
    index = 0,
    pointer = -1,
    lastNote = 0;
  const scale = [0, 2, 4, 7, 9];
  const setVolume = () => {
    if (master && audio)
      master.gain.setTargetAtTime(
        muted ? 0 : Number(volume.value) * 0.25,
        audio.currentTime,
        0.025,
      );
  };
  const enableAudio = () => {
    if (audioFailed) return;
    try {
      if (!audio) {
        audio = new AudioContext();
        master = audio.createGain();
        master.connect(audio.destination);
        setVolume();
      }
      if (audio.state !== 'running')
        void audio.resume().catch(() => {
          audioFailed = true;
          r.status(t.audioError);
        });
    } catch {
      audioFailed = true;
      r.status(t.audioError);
    }
  };
  const tone = (note: Note, when?: number) => {
    if (!audio || !master || audioFailed || voices.size >= 16) return;
    const at = Math.max(audio.currentTime, when ?? audio.currentTime);
    const oscillator = audio.createOscillator(),
      gain = audio.createGain(),
      filter = audio.createBiquadFilter();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 220 * Math.pow(2, note.pitch / 12);
    filter.type = 'lowpass';
    filter.frequency.value = 500 + (1 - note.y) * 5500;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.22, at + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.8);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    voices.add(oscillator);
    oscillator.onended = () => {
      voices.delete(oscillator);
      oscillator.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
    oscillator.start(at);
    oscillator.stop(at + 0.82);
  };
  const silence = () => {
    for (const voice of voices) {
      try {
        voice.stop();
      } catch {
        /* Already ended. */
      }
    }
    voices.clear();
    pending = [];
  };
  const render = () => {
    r.clear();
    const now = performance.now();
    for (const note of lights) {
      const age = (now - note.born) / 1000;
      if (age < 0 || age > 2.2) continue;
      const x = note.x * r.width,
        y = note.y * r.height,
        radius = 12 + age * 48;
      ctx.globalAlpha = Math.pow(1 - age / 2.2, 2);
      ctx.fillStyle = `hsl(${note.hue} 75% ${r.dark ? 66 : 43}%)`;
      ctx.beginPath();
      ctx.arc(x, y, 5 + age * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.globalAlpha *= 0.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };
  const playLoop = () => {
    if (!notes.length) {
      r.status(t.emptyLoop);
      return;
    }
    silence();
    mode = 'loop';
    loopStart = performance.now();
    audioStart = audio?.currentTime ?? 0;
    cycle = 0;
    index = 0;
    progress.hidden = true;
    r.button('record').textContent = t.record;
    r.button('loop').textContent = t.stop;
    r.status(t.loop);
    loop.start();
  };
  const loop = animation(r, (_dt, now) => {
    if (mode === 'record') {
      const elapsed = (now - recordStart) / 1000;
      progress.value = Math.min(8, elapsed);
      if (elapsed >= 8) {
        mode = 'idle';
        progress.hidden = true;
        r.button('record').textContent = t.record;
        if (notes.length) playLoop();
        else r.status(t.emptyLoop);
      }
    }
    if (mode === 'loop') {
      // Schedule slightly ahead on the audio clock; light events use the matching page timestamp.
      let scheduled = 0;
      while (notes.length && scheduled < 100) {
        const note = notes[index]!,
          at = loopStart + cycle * 8000 + note.time * 1000;
        if (at > now + 120) break;
        if (at >= now - 250) {
          tone(note, audioStart + cycle * 8 + note.time);
          pending.push({ at, note });
        }
        index++;
        if (index >= notes.length) {
          index = 0;
          cycle++;
        }
        scheduled++;
      }
      while (pending.length && pending[0]!.at <= now) {
        const next = pending.shift()!;
        lights.push({ ...next.note, born: next.at });
      }
    }
    lights = lights.filter((light) => now - light.born < 2200);
    render();
    return mode !== 'idle' || lights.length > 0;
  });
  const playPoint = (x: number, y: number) => {
    const now = performance.now(),
      bucket = Math.min(14, Math.floor(x * 15));
    const note: Note = {
      x,
      y,
      time: (now - recordStart) / 1000,
      pitch: scale[bucket % 5]! + Math.floor(bucket / 5) * 12,
      hue: x * 300,
    };
    if (mode === 'record' && note.time >= 0 && note.time < 8 && notes.length < 160)
      notes.push(note);
    tone(note);
    lights.push({ ...note, born: now });
    if (lights.length > 200) lights.shift();
    loop.start();
  };
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      if (!event.isPrimary || pointer !== -1) return;
      event.preventDefault();
      enableAudio();
      canvas.setPointerCapture(event.pointerId);
      pointer = event.pointerId;
      const p = r.point(event);
      playPoint(p.x / r.width, p.y / r.height);
      lastNote = performance.now();
    },
    { signal },
  );
  canvas.addEventListener(
    'pointermove',
    (event) => {
      if (pointer !== event.pointerId || performance.now() - lastNote < 90) return;
      const p = r.point(event);
      playPoint(p.x / r.width, p.y / r.height);
      lastNote = performance.now();
    },
    { signal },
  );
  const release = () => {
    pointer = -1;
  };
  canvas.addEventListener('pointerup', release, { signal });
  canvas.addEventListener('pointercancel', release, { signal });
  canvas.addEventListener('lostpointercapture', release, { signal });
  r.onAction('record', () => {
    enableAudio();
    silence();
    notes = [];
    mode = 'record';
    recordStart = performance.now();
    progress.value = 0;
    progress.hidden = false;
    r.button('record').textContent = t.recording;
    r.button('loop').textContent = t.play;
    r.status(t.recording);
    loop.start();
  });
  r.onAction('loop', () => {
    enableAudio();
    if (mode === 'loop') {
      mode = 'idle';
      silence();
      r.button('loop').textContent = t.play;
      r.status('');
    } else if (mode !== 'record') playLoop();
  });
  volume.addEventListener('input', setVolume, { signal });
  r.onAction('mute', () => {
    muted = !muted;
    setVolume();
    r.button('mute').textContent = muted ? t.unmute : t.mute;
    r.button('mute').setAttribute('aria-pressed', String(muted));
  });
  r.onAction('clear', () => {
    mode = 'idle';
    notes = [];
    lights = [];
    silence();
    loop.stop();
    progress.hidden = true;
    r.button('record').textContent = t.record;
    r.button('loop').textContent = t.play;
    r.status('');
    render();
  });
  suspendWhenHidden(r, () => {
    release();
    if (mode === 'record' || mode === 'loop') r.status(t.autoPaused);
    mode = 'idle';
    silence();
    loop.stop();
    progress.hidden = true;
    r.button('record').textContent = t.record;
    r.button('loop').textContent = t.play;
    if (audio) void audio.suspend().catch(() => {});
  });
  r.addCleanup(() => {
    silence();
    if (audio) void audio.close().catch(() => {});
  });
  r.onRender(render);
}
