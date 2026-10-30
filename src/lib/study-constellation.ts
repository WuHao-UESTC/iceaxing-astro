export const constellationStarCount = 40;

// Original textbook IDs retain their positions even when display order changes.
const textbookSlots: Record<string, number> = {
  'filter-design-in-digital-world-note': 0,
  'liuenke-semiconductance-note': 1,
  'oppenheim-signal-and-system-note': 2,
  'quirk-semiconductor-manufacturing-technology-note': 3,
  'rabaey-digital-ic-note': 4,
  'razavi-cmos-analog-note': 5,
  'razavi-rf-microelectronics-note': 6,
};

export function starPosition(id: string): { x: number; y: number } {
  const anchors = [
    { x: 17, y: 43 },
    { x: 44, y: 31 },
    { x: 66, y: 13 },
    { x: 86, y: 29 },
    { x: 67, y: 49 },
    { x: 40, y: 61 },
    { x: 14, y: 73 },
  ];
  const slot = textbookSlots[id];
  if (slot !== undefined) return anchors[slot]!;
  let hash = 2166136261;
  for (const character of id) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  const x = 10 + (hash % 7900) / 100;
  const minY = x < 48 ? 36 : x > 82 ? 25 : 10;
  return { x, y: minY + (((hash >>> 8) % 1000) / 1000) * (83 - x * 0.26 - minY) };
}

export const backgroundStars = (() => {
  const occupied = Object.keys(textbookSlots).map(starPosition);
  return Array.from({ length: constellationStarCount }, (_, index) => {
    const candidates = Array.from({ length: 80 }, (_, candidate) => {
      const seed = index * 83 + candidate;
      const x = 5 + ((seed * 37.17 + 9) % 90);
      const minY = x < 48 ? 35 : x > 82 ? 25 : 8;
      return { x, y: minY + ((seed * 0.61803398875) % 1) * (83 - x * 0.26 - minY) };
    });
    candidates.sort(
      (a, b) =>
        Math.min(...occupied.map((p) => Math.hypot(b.x - p.x, b.y - p.y))) -
        Math.min(...occupied.map((p) => Math.hypot(a.x - p.x, a.y - p.y))),
    );
    const point = candidates[0]!;
    occupied.push(point);
    return { ...point, radius: index % 5 === 0 ? 1.7 : 1 };
  });
})();

interface StarNode {
  id: string;
  x: number;
  y: number;
  lit: boolean;
}

// A sparse, non-crossing constellation: connect textbooks first, then attach
// the unlit stars without adding the old mesh of secondary triangles.
export function constellationEdges(nodes: StarNode[]) {
  const pairs = nodes.flatMap((from, i) =>
    nodes
      .slice(i + 1)
      .map((to) => ({ from, to, distance: Math.hypot(from.x - to.x, (from.y - to.y) * 0.875) })),
  );
  pairs.sort((a, b) => a.distance - b.distance || a.from.id.localeCompare(b.from.id));
  const parent = new Map(nodes.map((node) => [node.id, node.id]));
  const find = (id: string): string => {
    const next = parent.get(id)!;
    if (next === id) return id;
    const root = find(next);
    parent.set(id, root);
    return root;
  };
  const edges: typeof pairs = [];
  const side = (a: StarNode, b: StarNode, c: StarNode) =>
    (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const connect = (candidate: (typeof pairs)[number]) => {
    const { from, to } = candidate;
    const a = find(from.id),
      b = find(to.id);
    if (a === b) return;
    const crossing = edges.some((edge) => {
      if ([edge.from.id, edge.to.id].some((id) => id === from.id || id === to.id)) return false;
      return (
        side(from, to, edge.from) * side(from, to, edge.to) < 0 &&
        side(edge.from, edge.to, from) * side(edge.from, edge.to, to) < 0
      );
    });
    if (crossing) return;
    parent.set(a, b);
    edges.push(candidate);
  };
  pairs.filter(({ from, to }) => from.lit && to.lit).forEach(connect);
  pairs.forEach(connect);
  return edges.map((edge) => ({ ...edge, lit: edge.from.lit || edge.to.lit }));
}
