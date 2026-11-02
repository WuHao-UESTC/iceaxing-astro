export type MotionKind = 'spin' | 'surge' | 'zigzag' | 'wander';
export type PenKind = 'fountain' | 'pencil' | 'marker' | 'highlighter';
export type MotionEffect = { kind: MotionKind; age: number; phase: number; direction: number };
export type Pen = { kind: PenKind; color: string; width: number };
export type BrushState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  started: boolean;
  effects: MotionEffect[];
};
export type Direction = { x: number; y: number };

export const motionKinds: MotionKind[] = ['spin', 'surge', 'zigzag', 'wander'];
export const penKinds: PenKind[] = ['fountain', 'pencil', 'marker', 'highlighter'];
export const MAX_SPEED = 360;
export const EFFECT_DURATION = 2;
export const INSET = 14;

export function createBrush(width: number, height: number): BrushState {
  return { x: width / 2, y: height / 2, vx: 0, vy: 0, started: false, effects: [] };
}

export function addMotion(state: BrushState, random = Math.random): MotionKind {
  const kind = motionKinds[Math.min(3, Math.floor(random() * motionKinds.length))]!;
  state.effects.push({
    kind,
    age: 0,
    phase: random() * Math.PI * 2,
    direction: random() < 0.5 ? -1 : 1,
  });
  if (!state.started) {
    const angle = random() * Math.PI * 2;
    state.vx = Math.cos(angle) * 90;
    state.vy = Math.sin(angle) * 90;
    state.started = true;
  }
  return kind;
}

export function randomPen(random = Math.random): Pen {
  const kind = penKinds[Math.min(3, Math.floor(random() * penKinds.length))]!;
  const colors =
    kind === 'highlighter'
      ? ['#efc900', '#f17a9c', '#54bbaf', '#a1c744', '#ac83da']
      : ['#243d50', '#b45142', '#357665', '#486ea0', '#9c6d30', '#845b92', '#30312f'];
  const ranges: Record<PenKind, [number, number]> = {
    fountain: [1, 5],
    pencil: [1, 4],
    marker: [5, 15],
    highlighter: [12, 26],
  };
  const [min, max] = ranges[kind];
  return {
    kind,
    color: colors[Math.min(colors.length - 1, Math.floor(random() * colors.length))]!,
    width: min + random() * (max - min),
  };
}

/** Fixed simulation steps keep steering and temporary effects independent of frame rate. */
export function stepBrush(
  state: BrushState,
  input: Direction,
  dt: number,
  width: number,
  height: number,
) {
  const inputLength = Math.hypot(input.x, input.y);
  if (inputLength) state.started = true;
  if (!state.started) return;
  let ax = inputLength ? (input.x / inputLength) * 115 : 0;
  let ay = inputLength ? (input.y / inputLength) * 115 : 0;
  for (const effect of state.effects) {
    const activeTime = Math.max(0, Math.min(dt, EFFECT_DURATION - effect.age));
    const weight = activeTime / dt;
    const heading = Math.atan2(state.vy, state.vx);
    if (effect.kind === 'spin') {
      const angle = effect.direction * 2.7 * activeTime;
      const cos = Math.cos(angle),
        sin = Math.sin(angle);
      const oldVx = state.vx;
      state.vx = oldVx * cos - state.vy * sin;
      state.vy = oldVx * sin + state.vy * cos;
    } else if (effect.kind === 'surge') {
      ax += Math.cos(heading) * 250 * weight;
      ay += Math.sin(heading) * 250 * weight;
    } else if (effect.kind === 'zigzag') {
      const side = Math.sin(effect.age * 13 + effect.phase) >= 0 ? 1 : -1;
      ax += Math.cos(heading + Math.PI / 2) * side * 420 * weight;
      ay += Math.sin(heading + Math.PI / 2) * side * 420 * weight;
    } else {
      ax += (Math.sin(effect.age * 5.3 + effect.phase) + Math.cos(effect.age * 8.7)) * 170 * weight;
      ay += (Math.cos(effect.age * 4.1 + effect.phase) + Math.sin(effect.age * 7.3)) * 170 * weight;
    }
    effect.age += dt;
  }
  state.effects = state.effects.filter((effect) => effect.age < EFFECT_DURATION - 1e-8);
  const drag = Math.exp(-0.065 * dt);
  state.vx = (state.vx + ax * dt) * drag;
  state.vy = (state.vy + ay * dt) * drag;
  const speed = Math.hypot(state.vx, state.vy);
  if (speed > MAX_SPEED) {
    state.vx *= MAX_SPEED / speed;
    state.vy *= MAX_SPEED / speed;
  }
  state.x += state.vx * dt;
  state.y += state.vy * dt;
  const minX = Math.min(INSET, width / 2),
    minY = Math.min(INSET, height / 2);
  const maxX = width - minX,
    maxY = height - minY;
  if (state.x < minX) {
    state.x = minX;
    state.vx = Math.abs(state.vx) * 0.97;
  }
  if (state.x > maxX) {
    state.x = maxX;
    state.vx = -Math.abs(state.vx) * 0.97;
  }
  if (state.y < minY) {
    state.y = minY;
    state.vy = Math.abs(state.vy) * 0.97;
  }
  if (state.y > maxY) {
    state.y = maxY;
    state.vy = -Math.abs(state.vy) * 0.97;
  }
}
