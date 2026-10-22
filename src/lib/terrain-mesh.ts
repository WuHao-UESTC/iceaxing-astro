export type TerrainPoint = [number, number, number];
export type TerrainMaterial = 'snow' | 'trail' | 'stone' | 'marker' | 'track';
export interface TerrainFace {
  points: TerrainPoint[];
  shade: number;
  material: TerrainMaterial;
  facet: number;
}

const cross = (a: TerrainPoint, b: TerrainPoint, c: TerrainPoint) =>
  (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

function face(points: TerrainPoint[], material: TerrainMaterial = 'snow'): TerrainFace {
  const [a, b, c] = points as [TerrainPoint, TerrainPoint, TerrainPoint];
  const u = b.map((value, i) => value - a[i]!);
  const v = c.map((value, i) => value - a[i]!);
  const normal: [number, number, number] = [
    u[1]! * v[2]! - u[2]! * v[1]!,
    u[2]! * v[0]! - u[0]! * v[2]!,
    cross(a, b, c),
  ];
  const length = Math.hypot(...normal);
  const direction = Math.sign(normal[2]);
  const light = (direction * (-0.58 * normal[0]! - 0.58 * normal[1]! + 0.57 * normal[2]!)) / length;
  return {
    points,
    material,
    facet: -1,
    shade: Math.max(0, Math.min(5, Math.round((1 - light) * 5))),
  };
}

/** Keep the lighting direction while separating adjoining, quantized shade values. */
export function separateTerrainShades(mesh: TerrainFace[]): TerrainFace[] {
  const neighbors = mesh.map(() => new Set<number>());
  const edges = new Map<string, number>();
  const key = (point: TerrainPoint) => `${point[0].toFixed(6)},${point[1].toFixed(6)}`;
  mesh.forEach(({ points }, index) => {
    for (let i = 0; i < points.length; i++) {
      const edge = [key(points[i]!), key(points[(i + 1) % points.length]!)].sort().join('/');
      const neighbor = edges.get(edge);
      if (neighbor === undefined) edges.set(edge, index);
      else {
        neighbors[index]!.add(neighbor);
        neighbors[neighbor]!.add(index);
      }
    }
  });
  const shades = mesh.map(() => -1);
  // Preserve the lighting of the largest facets first, then adjust the smaller ones.
  const order = mesh
    .map((_, index) => index)
    .sort((a, b) => {
      const size = (index: number) =>
        Math.abs(cross(...(mesh[index]!.points as [TerrainPoint, TerrainPoint, TerrainPoint])));
      return size(b) - size(a) || a - b;
    });
  for (const index of order) {
    const used = [...neighbors[index]!]
      .map((neighbor) => shades[neighbor]!)
      .filter((shade) => shade >= 0);
    const candidates = [0, 1, 2, 3, 4, 5].filter((shade) => !used.includes(shade));
    candidates.sort((a, b) => {
      const cost = (shade: number) =>
        Math.abs(shade - mesh[index]!.shade) * 3 -
        Math.min(2, ...used.map((other) => Math.abs(other - shade)));
      return cost(a) - cost(b) || a - b;
    });
    shades[index] = candidates[0]!;
  }
  return mesh.map((face, index) => ({ ...face, shade: shades[index]! }));
}

/** A single tessellated surface; each strip ends exactly where the next starts. */
export function createTerrainMesh(rows: TerrainPoint[][]): TerrainFace[] {
  const faces: TerrainFace[] = [];
  for (let row = 0; row < rows.length - 1; row++) {
    const upper = rows[row]!;
    const lower = rows[row + 1]!;
    if (upper.length !== lower.length) throw new Error('Terrain rows must share a vertex count');
    for (let col = 0; col < upper.length - 1; col++) {
      const a = upper[col]!;
      const b = upper[col + 1]!;
      const c = lower[col]!;
      const d = lower[col + 1]!;
      let triangles =
        (row + col) % 2
          ? [
              [a, b, d],
              [a, d, c],
            ]
          : [
              [a, b, c],
              [b, d, c],
            ];
      if (
        triangles.some(
          (points) => cross(...(points as [TerrainPoint, TerrainPoint, TerrainPoint])) < -0.001,
        )
      ) {
        triangles =
          (row + col) % 2
            ? [
                [a, b, c],
                [b, d, c],
              ]
            : [
                [a, b, d],
                [a, d, c],
              ];
      }
      if (
        triangles.some(
          (points) => cross(...(points as [TerrainPoint, TerrainPoint, TerrainPoint])) < -0.001,
        )
      ) {
        throw new Error(`Folded terrain cell at row ${row}, column ${col}`);
      }
      for (const triangle of triangles) {
        if (Math.abs(cross(...(triangle as [TerrainPoint, TerrainPoint, TerrainPoint]))) > 0.001)
          faces.push({ ...face(triangle), facet: faces.length });
      }
    }
  }
  return separateTerrainShades(faces);
}

function clip(
  points: TerrainPoint[],
  a: TerrainPoint,
  b: TerrainPoint,
  inside: boolean,
): TerrainPoint[] {
  const output: TerrainPoint[] = [];
  for (let i = 0; i < points.length; i++) {
    const start = points[i]!;
    const end = points[(i + 1) % points.length]!;
    const s = cross(a, b, start);
    const e = cross(a, b, end);
    const startIn = inside ? s >= 0 : s <= 0;
    const endIn = inside ? e >= 0 : e <= 0;
    if (startIn) output.push(start);
    if (startIn !== endIn) {
      const t = s / (s - e);
      output.push(start.map((value, axis) => value + t * (end[axis]! - value)) as TerrainPoint);
    }
  }
  return output;
}

function triangulate(points: TerrainPoint[], source: TerrainFace): TerrainFace[] {
  return points.slice(1, -1).flatMap((point, i) => {
    const triangle = [points[0]!, point, points[i + 2]!];
    return Math.abs(cross(...(triangle as [TerrainPoint, TerrainPoint, TerrainPoint]))) > 0.001
      ? [{ ...source, points: triangle }]
      : [];
  });
}

/** Cut a convex feature into the surface, replacing its area rather than covering it. */
export function inlayTerrain(
  mesh: TerrainFace[],
  polygon: [number, number][],
  material: TerrainMaterial,
  shade: number,
): TerrainFace[] {
  const boundary = polygon.map(([x, y]) => [x, y, 0] as TerrainPoint);
  const area = boundary.reduce((sum, point, i) => {
    const next = boundary[(i + 1) % boundary.length]!;
    return sum + point[0] * next[1] - point[1] * next[0];
  }, 0);
  if (area < 0) boundary.reverse();
  const facet = Math.max(...mesh.map((face) => face.facet)) + 1;
  return mesh.flatMap((original) => {
    let intersection = original.points;
    for (let i = 0; i < boundary.length && intersection.length >= 3; i++) {
      intersection = clip(intersection, boundary[i]!, boundary[(i + 1) % boundary.length]!, true);
    }
    if (!triangulate(intersection, original).length) return [original];
    let remainder = original.points;
    const result: TerrainFace[] = [];
    for (let i = 0; i < boundary.length && remainder.length >= 3; i++) {
      const a = boundary[i]!;
      const b = boundary[(i + 1) % boundary.length]!;
      result.push(...triangulate(clip(remainder, a, b, false), original));
      remainder = clip(remainder, a, b, true);
    }
    result.push(...triangulate(remainder, { ...original, material, shade, facet }));
    return result;
  });
}
