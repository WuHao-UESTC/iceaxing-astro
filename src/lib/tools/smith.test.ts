import { describe, expect, it } from 'vitest';

import {
  complex,
  gammaToImpedance,
  impedanceToGamma,
  smithMetrics,
  transformImpedance,
} from './smith';

describe('Smith chart math', () => {
  it('maps a matched load to the chart center', () => {
    expect(impedanceToGamma(complex(50), 50)).toEqual({ re: 0, im: 0 });
    expect(smithMetrics(complex(50), 50).vswr).toBe(1);
  });

  it('round-trips impedance and reflection coefficient', () => {
    const load = complex(75, -20);
    const restored = gammaToImpedance(impedanceToGamma(load, 50), 50);
    expect(restored.re).toBeCloseTo(load.re, 10);
    expect(restored.im).toBeCloseTo(load.im, 10);
  });

  it('returns to the same point after half a wavelength', () => {
    const load = complex(35, 40);
    const transformed = transformImpedance(load, 50, 0.5);
    expect(transformed.re).toBeCloseTo(load.re, 8);
    expect(transformed.im).toBeCloseTo(load.im, 8);
  });
});
