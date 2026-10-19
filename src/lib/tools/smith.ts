export interface Complex {
  re: number;
  im: number;
}

export const complex = (re: number, im = 0): Complex => ({ re, im });
export const add = (a: Complex, b: Complex) => complex(a.re + b.re, a.im + b.im);
export const subtract = (a: Complex, b: Complex) => complex(a.re - b.re, a.im - b.im);
export const multiply = (a: Complex, b: Complex) =>
  complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
export function divide(a: Complex, b: Complex) {
  const denominator = b.re * b.re + b.im * b.im;
  if (denominator < 1e-15) return complex(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
  return complex(
    (a.re * b.re + a.im * b.im) / denominator,
    (a.im * b.re - a.re * b.im) / denominator,
  );
}
export const magnitude = (value: Complex) => Math.hypot(value.re, value.im);

export function impedanceToGamma(impedance: Complex, z0: number) {
  const normalized = complex(impedance.re / z0, impedance.im / z0);
  return divide(subtract(normalized, complex(1)), add(normalized, complex(1)));
}

export function gammaToImpedance(gamma: Complex, z0: number) {
  const normalized = divide(add(complex(1), gamma), subtract(complex(1), gamma));
  return complex(normalized.re * z0, normalized.im * z0);
}

export function rotateGamma(gamma: Complex, wavelengths: number, towardGenerator = true) {
  const angle = (towardGenerator ? -1 : 1) * 4 * Math.PI * wavelengths;
  return multiply(gamma, complex(Math.cos(angle), Math.sin(angle)));
}

export function transformImpedance(
  load: Complex,
  z0: number,
  wavelengths: number,
  towardGenerator = true,
) {
  return gammaToImpedance(
    rotateGamma(impedanceToGamma(load, z0), wavelengths, towardGenerator),
    z0,
  );
}

export function smithMetrics(impedance: Complex, z0: number) {
  const gamma = impedanceToGamma(impedance, z0);
  const reflection = Math.min(0.999999999, magnitude(gamma));
  return {
    gamma,
    magnitude: reflection,
    phaseDegrees: (Math.atan2(gamma.im, gamma.re) * 180) / Math.PI,
    vswr: (1 + reflection) / Math.max(1e-12, 1 - reflection),
    returnLossDb: reflection === 0 ? Number.POSITIVE_INFINITY : -20 * Math.log10(reflection),
    mismatchLossDb: -10 * Math.log10(Math.max(1e-12, 1 - reflection * reflection)),
  };
}

export function gammaPoint(gamma: Complex, size = 520) {
  const radius = size * 0.42;
  const center = size / 2;
  return { x: center + gamma.re * radius, y: center - gamma.im * radius, radius, center };
}

export function pointToImpedance(x: number, y: number, size: number, z0: number) {
  const radius = size * 0.42;
  const center = size / 2;
  let gamma = complex((x - center) / radius, (center - y) / radius);
  const length = magnitude(gamma);
  if (length >= 0.995) gamma = complex((gamma.re / length) * 0.995, (gamma.im / length) * 0.995);
  return gammaToImpedance(gamma, z0);
}

export function admittance(impedance: Complex) {
  return divide(complex(1), impedance);
}

export function singleStubMatches(load: Complex, z0: number) {
  const candidates: Array<{
    distance: number;
    susceptance: number;
    openStub: number;
    shortStub: number;
  }> = [];
  let previous: { distance: number; value: number } | undefined;
  for (let index = 0; index <= 4000; index += 1) {
    const distance = index / 8000;
    const normalized = transformImpedance(load, z0, distance);
    const y = divide(complex(1), complex(normalized.re / z0, normalized.im / z0));
    const value = y.re - 1;
    if (previous && value * previous.value <= 0) {
      const root = (distance + previous.distance) / 2;
      const atRoot = transformImpedance(load, z0, root);
      const rootY = divide(complex(1), complex(atRoot.re / z0, atRoot.im / z0));
      const target = -rootY.im;
      const normalizeLength = (angle: number) => {
        const wavelengths = angle / (2 * Math.PI);
        return ((wavelengths % 0.5) + 0.5) % 0.5;
      };
      const openStub = normalizeLength(Math.atan(target));
      const shortStub = Math.abs(target) < 1e-12 ? 0.25 : normalizeLength(Math.atan(-1 / target));
      if (!candidates.some((candidate) => Math.abs(candidate.distance - root) < 0.002)) {
        candidates.push({ distance: root, susceptance: target, openStub, shortStub });
      }
    }
    previous = { distance, value };
  }
  return candidates.slice(0, 2);
}

export function lNetworkMatches(load: Complex, z0: number) {
  if (load.re <= 0 || z0 <= 0) return [];
  if (load.re < z0) {
    const q = Math.sqrt(z0 / load.re - 1);
    return [1, -1].map((sign) => ({
      topology: 'seriesFirst' as const,
      seriesReactance: sign * q * load.re - load.im,
      shuntSusceptance: (-sign * q) / z0,
    }));
  }
  const q = Math.sqrt(load.re / z0 - 1);
  return [1, -1].map((sign) => ({
    topology: 'shuntFirst' as const,
    seriesReactance: sign * q * z0 - load.im,
    shuntSusceptance: (-sign * q) / load.re,
  }));
}
