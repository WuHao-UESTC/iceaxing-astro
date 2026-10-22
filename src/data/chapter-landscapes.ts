import { createTerrainMesh, type TerrainFace, type TerrainPoint } from '../lib/terrain-mesh';

// Build facets in screen-like proportions, then cut the bank out of that surface.
export function snowRiftMeshes(compact = false): {
  upper: TerrainFace[];
  lower: TerrainFace[];
  upperBoundary: [number, number][];
  lowerBoundary: [number, number][];
} {
  const noise = (seed: number) => {
    const value = Math.sin(seed * 127.1) * 43758.5453;
    return value - Math.floor(value);
  };
  const lowerCount = compact ? 17 : 28;
  const upperBoundary: [number, number][] = Array.from({ length: 18 }, (_, index) => {
    const y = -60 + index * 45;
    const tooth = index === 0 || index === 17 ? 0 : (noise(index * 11 + 3) - 0.5) * 55;
    return [600 + y * 0.9375 + tooth, y];
  });
  upperBoundary.push([1450, 780], [1450, -80]);
  const upperRows = Array.from({ length: compact ? 15 : 12 }, (_, row) =>
    Array.from({ length: compact ? 8 : 13 }, (_, column): TerrainPoint => {
      return [
        470 +
          column * (compact ? 140 : 80) +
          (noise(column * 17 + row * 31 + 5) - 0.5) * (compact ? 65 : 35),
        -80 + row * (compact ? 60 : 80) + (noise(column * 37 + row * 13 + 9) - 0.5) * 28,
        15 + noise(column * 19 + row * 43 + 2) * 90,
      ];
    }),
  );
  const lowerRows = [0, 0.2, 0.4, 0.6, 0.8, 1].map((depth, row) =>
    Array.from({ length: lowerCount }, (_, column): TerrainPoint => {
      const end = column === 0 || column === lowerCount - 1;
      const t = (column + (end ? 0 : (noise(column + 41) - 0.5) * 0.6)) / (lowerCount - 1);
      const tooth = end ? 0 : (noise(column * 17 + 5) - 0.5) * (compact ? 38 : 74);
      const edgeY = compact
        ? 515 + 35 * t + 280 * Math.pow(Math.max(0, (t - 0.8) / 0.2), 1.3)
        : 385 + 445 * t;
      const interior = row > 0 && row < 5;
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
    upper: createTerrainMesh(upperRows),
    lower: createTerrainMesh(lowerRows),
    upperBoundary,
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
