import { createTerrainMesh, type TerrainFace, type TerrainPoint } from '../lib/terrain-mesh';

import { createTerrainSurface } from '../lib/terrain-mesh';
import { lifeUpperTerrain } from './life-upper-terrain';

// Build both banks from complete facets with matching proportions and lighting.
export function snowRiftMeshes(compact = false): {
  upper: TerrainFace[];
  lower: TerrainFace[];
  lowerBoundary: [number, number][];
} {
  const noise = (seed: number) => {
    const value = Math.sin(seed * 127.1) * 43758.5453;
    return value - Math.floor(value);
  };
  const lowerCount = compact ? 8 : 14;
  const scene = lifeUpperTerrain[compact ? 1 : 0]!;
  const upper = createTerrainSurface(
    scene.triangles.map(([a, b, c]) => [scene.points[a]!, scene.points[b]!, scene.points[c]!]),
  );
  const lowerRows = [0, 0.33, 0.67, 1].map((depth, row) =>
    Array.from({ length: lowerCount }, (_, column): TerrainPoint => {
      const end = column === 0 || column === lowerCount - 1;
      const t = (column + (end ? 0 : (noise(column + 41) - 0.5) * 0.6)) / (lowerCount - 1);
      const tooth = end ? 0 : (noise(column * 17 + 5) - 0.5) * (compact ? 38 : 74);
      const edgeY = compact
        ? 515 + 35 * t + 280 * Math.pow(Math.max(0, (t - 0.8) / 0.2), 1.3)
        : 385 + 445 * t;
      const interior = row > 0 && row < 3;
      return [
        -70 + 1300 * t + (interior ? ((column * 23 + row * 29) % 25) - 12 : 0),
        (edgeY + tooth) * (1 - depth) +
          1000 * depth +
          (interior ? ((column * 13 + row * 17) % 9) - 4 : 0),
        (1 - depth) * 100 + ((column * 19 + row * 37) % 50),
      ];
    }),
  );
  return {
    upper,
    lower: createTerrainMesh(lowerRows),
    lowerBoundary: lowerRows[0]!.map(([x, y]) => [x, y]),
  };
}

export function campCliffMesh(): TerrainFace[] {
  const rows: TerrainPoint[][] = [
    [
      [-100, -60, 0],
      [20, -70, 20],
      [210, -40, 28],
      [365, -30, 14],
    ],
    [
      [-100, 115, 0],
      [20, 90, 16],
      [190, 125, 12],
      [340, 100, 0],
    ],
    [
      [-100, 325, 0],
      [5, 310, 40],
      [155, 345, 5],
      [285, 330, 10],
    ],
    [
      [-100, 530, 0],
      [-10, 510, 10],
      [112, 540, 38],
      [230, 540, 0],
    ],
    [
      [-100, 720, 0],
      [-10, 710, 0],
      [93, 725, 0],
      [180, 715, 0],
    ],
  ];
  return createTerrainMesh(rows).map((face, index) => ({
    ...face,
    material: 'stone',
    shade: index < 6 ? face.shade : Math.min(5, face.shade + 1),
  }));
}

export function screeMesh(): TerrainFace[] {
  // A shallow, irregular shelf of small facets, confined to the foot of the scene.
  const rows: TerrainPoint[][] = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 18 }, (_, column): TerrainPoint => [
      -100 + column * 83 + (row % 2 ? 24 : 0),
      682 + row * 44 + ((column * 17 + row * 11) % 25) - 12,
      row === 0 ? 0 : 6 + ((column * 13 + row * 19) % 26),
    ]),
  );
  return createTerrainMesh(rows).map((face) => ({
    ...face,
    shade: face.shade,
    material: 'stone',
  }));
}
