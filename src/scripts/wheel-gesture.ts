/** Consume a wheel burst once; magnitude and inertia cannot add more turns. */
export function createWheelGesture() {
  const quietGap = 240;
  const minimumIntent = 4;
  let lastEvent = -Infinity;
  let distance = 0;
  let direction = 0;
  let consumed = false;

  const reset = () => {
    lastEvent = -Infinity;
    distance = 0;
    direction = 0;
    consumed = false;
  };

  return {
    reset,
    active(now: number) {
      return consumed && now - lastEvent < quietGap;
    },
    consume(delta: number, now: number, transitioning = false) {
      if (!Number.isFinite(delta) || !delta) return 0;
      if (now - lastEvent >= quietGap && !transitioning) reset();
      lastEvent = now;
      if (consumed || transitioning) {
        consumed = true;
        return 0;
      }
      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) distance = 0;
      direction = nextDirection;
      distance += delta;
      if (Math.abs(distance) < minimumIntent) return 0;
      consumed = true;
      return direction;
    },
  };
}
