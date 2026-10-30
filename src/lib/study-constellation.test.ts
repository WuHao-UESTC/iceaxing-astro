import { describe, expect, it } from 'vitest';
import {
  backgroundStars,
  constellationEdges,
  starPosition,
  constellationStarCount,
} from './study-constellation';

describe('constellation network', () => {
  it('does not illuminate connections between dark stars on a path between lit stars', () => {
    const nodes = [
      { id: 'lit-left', x: 0, y: 0, lit: true },
      { id: 'dark-left', x: 1, y: 0, lit: false },
      { id: 'dark-right', x: 2, y: 0, lit: false },
      { id: 'lit-right', x: 3, y: 0, lit: true },
    ];
    const edges = constellationEdges(nodes);
    const darkConnection = edges.find(
      ({ from, to }) => from.id === 'dark-left' && to.id === 'dark-right',
    );
    expect(darkConnection).toBeDefined();
    expect(darkConnection!.lit).toBe(false);
    expect(edges.filter(({ lit }) => lit).every(({ from, to }) => from.lit || to.lit)).toBe(true);
  });

  it('lights the direct connections of a single lit star without spreading through dark stars', () => {
    const nodes = [
      { id: 'textbook', x: 0, y: 0, lit: true },
      { id: 'background-a', x: 1, y: 0, lit: false },
      { id: 'background-b', x: 1, y: 1, lit: false },
      { id: 'background-c', x: 0, y: 1, lit: false },
    ];
    const edges = constellationEdges(nodes);
    const direct = edges.filter(({ from, to }) => from.id === 'textbook' || to.id === 'textbook');
    expect(direct.length).toBeGreaterThan(0);
    expect(direct.every(({ lit }) => lit)).toBe(true);
    expect(
      constellationEdges(nodes.map((node) => ({ ...node, lit: false }))).every(({ lit }) => !lit),
    ).toBe(true);
  });
  it('has no crossing connections across the entire mixed-brightness network', () => {
    const ids = [
      'filter-design-in-digital-world-note',
      'liuenke-semiconductance-note',
      'oppenheim-signal-and-system-note',
      'quirk-semiconductor-manufacturing-technology-note',
      'rabaey-digital-ic-note',
      'razavi-cmos-analog-note',
      'razavi-rf-microelectronics-note',
    ];
    const nodes = [
      ...ids.map((id) => ({ id, ...starPosition(id), lit: true })),
      ...backgroundStars
        .slice(0, constellationStarCount - ids.length)
        .map((star, i) => ({ ...star, id: `dim-${i}`, lit: false })),
    ];
    const edges = constellationEdges(nodes);
    const side = (a: (typeof nodes)[number], b: typeof a, c: typeof a) =>
      (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    for (let i = 0; i < edges.length; i++) {
      for (const other of edges.slice(i + 1)) {
        const edge = edges[i]!;
        const crosses =
          side(edge.from, edge.to, other.from) * side(edge.from, edge.to, other.to) < 0 &&
          side(other.from, other.to, edge.from) * side(other.from, other.to, edge.to) < 0;
        expect(crosses).toBe(false);
      }
    }
    expect(edges.some((edge) => edge.lit)).toBe(true);
    expect(edges.some((edge) => !edge.lit)).toBe(true);
    expect(nodes).toHaveLength(40);
  });
  it('connects every star, including isolated stars, without duplicate or self edges', () => {
    const nodes = backgroundStars.map((star, index) => ({
      ...star,
      id: String(index),
      lit: index < 7,
    }));
    const edges = constellationEdges(nodes);
    const visited = new Set([nodes[0]!.id]);
    for (let pass = 0; pass < nodes.length; pass++) {
      for (const { from, to } of edges) {
        if (visited.has(from.id)) visited.add(to.id);
        if (visited.has(to.id)) visited.add(from.id);
        expect(from.id).not.toBe(to.id);
      }
    }
    expect(visited.size).toBe(nodes.length);
    expect(new Set(edges.map(({ from, to }) => [from.id, to.id].sort().join(':'))).size).toBe(
      edges.length,
    );
    expect(edges).toHaveLength(nodes.length - 1);
  });

  it('keeps textbook stars connected without requiring a path through background stars', () => {
    const nodes = [
      ...[
        'filter-design-in-digital-world-note',
        'razavi-cmos-analog-note',
        'rabaey-digital-ic-note',
      ].map((id) => ({ id, ...starPosition(id), lit: true })),
      ...backgroundStars.map((star, index) => ({ ...star, id: `dark-${index}`, lit: false })),
    ];
    const direct = constellationEdges(nodes).filter(({ from, to }) => from.lit && to.lit);
    expect(direct).toHaveLength(2);
    expect(new Set(direct.flatMap(({ from, to }) => [from.id, to.id])).size).toBe(3);
    expect(constellationEdges(nodes.map((node) => ({ ...node, lit: true })))).toHaveLength(
      nodes.length - 1,
    );
  });

  it('keeps future categories within open sky, away from headings and the mountain ridge', () => {
    for (let index = 0; index < 100; index++) {
      const { x, y } = starPosition(`future-textbook-${index}`);
      expect(x).toBeGreaterThanOrEqual(10);
      expect(x).toBeLessThan(89);
      expect(y).toBeLessThan(84 - x * 0.26);
      if (x < 48) expect(y).toBeGreaterThanOrEqual(36);
      if (x > 82) expect(y).toBeGreaterThanOrEqual(25);
    }
  });
});
