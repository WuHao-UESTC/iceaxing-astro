import { describe, expect, it } from 'vitest';

import {
  complex,
  gammaToImpedance,
  impedanceToGamma,
  smithMetrics,
  transformImpedance,
  admittance,
  add,
  applyLMatch,
  lNetworkMatches,
  singleStubMatches,
  parseTouchstone,
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

  it('preserves exact open/short endpoints and infinite standing wave ratios', () => {
    expect(impedanceToGamma(complex(Infinity), 50)).toEqual(complex(1));
    expect(gammaToImpedance(complex(1), 50)).toEqual(complex(Infinity));
    expect(smithMetrics(complex(0), 50).vswr).toBe(Infinity);
    expect(smithMetrics(complex(0, 30), 50).magnitude).toBeCloseTo(1);
    expect(transformImpedance(complex(0), 50, 0.25).re).toBe(Infinity);
  });

  it.each([
    [10, 20],
    [50, -80],
    [75, 25],
    [100, 0],
    [200, -130],
    [25, 150],
  ])('matches every L-network solution for %s + j%s ohms', (r, x) => {
    const load = complex(r, x);
    const solutions = lNetworkMatches(load, 50);
    expect(solutions.length).toBeGreaterThanOrEqual(2);
    for (const solution of solutions) {
      const result = applyLMatch(load, solution);
      expect(result.re).toBeCloseTo(50, 8);
      expect(result.im).toBeCloseTo(0, 8);
    }
  });

  it.each([
    [10, 20],
    [50, -80],
    [75, 25],
    [100, 0],
  ])('matches both open and short shunt stubs for %s + j%s ohms', (r, x) => {
    const load = complex(r, x);
    const solutions = singleStubMatches(load, 50);
    expect(solutions).toHaveLength(2);
    for (const solution of solutions) {
      const y = admittance(transformImpedance(load, 50, solution.distance));
      const openB = Math.tan(2 * Math.PI * solution.openStub) / 50;
      const shortB = -1 / Math.tan(2 * Math.PI * solution.shortStub) / 50;
      for (const b of [openB, shortB]) {
        const result = admittance(add(y, complex(0, b)));
        expect(result.re).toBeCloseTo(50, 7);
        expect(result.im).toBeCloseTo(0, 7);
      }
    }
  });

  it('does not propose a passive match for a purely reactive load', () => {
    expect(lNetworkMatches(complex(0, 20), 50)).toEqual([]);
    expect(singleStubMatches(complex(0, 20), 50)).toEqual([]);
  });

  it('imports equivalent RI, MA and DB one-port measurements', () => {
    const ri = parseTouchstone('! example\n# MHz S RI R 75\n100 0 .5 ! point');
    const ma = parseTouchstone('# GHz S MA R 75\n.1 .5 90');
    const db = parseTouchstone('# Hz S DB R 75\n1D8 -6.020599913279624 90');
    for (const result of [ri, ma, db]) {
      expect(result.z0).toBe(75);
      expect(result.points[0]?.frequency).toBe(1e8);
      expect(result.points[0]?.gamma.re).toBeCloseTo(0);
      expect(result.points[0]?.gamma.im).toBeCloseTo(0.5);
    }
  });

  it.each([
    '# MHz S RI R 0\n100 0 0',
    '# GHz Y RI R 50\n1 0 0',
    '# GHz S RI R 50\n1 2 0',
    '# GHz S RI R 50\n1 0',
    '# GHz S RI R 50\n0 0 0',
  ])('rejects invalid Touchstone input', (contents) => {
    expect(() => parseTouchstone(contents)).toThrow();
  });
});
