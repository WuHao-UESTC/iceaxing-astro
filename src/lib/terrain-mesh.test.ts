import { describe, expect, it } from 'vitest';
import {
  createTerrainMesh,
  inlayTerrain,
  type TerrainFace,
  type TerrainPoint,
} from './terrain-mesh';
import {
  coverRows,
  ridgeRows,
  studyRows,
  lifeWideRows,
  lifeTallRows,
  waystationWideRows,
  waystationTallRows,
  waystationMesh,
  snowfieldMesh,
} from '../data/terrain-scenes';

function area(points: TerrainPoint[]) {
  return (
    points.reduce((sum, point, i) => {
      const next = points[(i + 1) % points.length]!;
      return sum + point[0] * next[1] - point[1] * next[0];
    }, 0) / 2
  );
}

function overlap(a: TerrainFace, b: TerrainFace) {
  for (const triangle of [a, b]) {
    for (let i = 0; i < 3; i++) {
      const point = triangle.points[i]!;
      const next = triangle.points[(i + 1) % 3]!;
      const length = Math.hypot(next[0] - point[0], next[1] - point[1]);
      const axis = [(next[1] - point[1]) / length, (point[0] - next[0]) / length];
      const project = (face: TerrainFace) =>
        face.points.map((p) => p[0] * axis[0]! + p[1] * axis[1]!);
      const u = project(a);
      const v = project(b);
      if (Math.max(...u) <= Math.min(...v) + 1e-6 || Math.max(...v) <= Math.min(...u) + 1e-6)
        return false;
    }
  }
  return true;
}

function expectPartition(mesh: TerrainFace[], expectedArea: number) {
  expect(mesh.every((face) => area(face.points) > 0)).toBe(true);
  expect(mesh.reduce((sum, face) => sum + area(face.points), 0)).toBeCloseTo(expectedArea, 2);
  for (let i = 0; i < mesh.length; i++) {
    for (let j = i + 1; j < mesh.length; j++) {
      expect(overlap(mesh[i]!, mesh[j]!), `Faces ${i} and ${j} overlap`).toBe(false);
    }
  }
}

function expectDistinctNeighbors(mesh: TerrainFace[]) {
  const edges = new Map<string, TerrainFace>();
  for (const face of mesh) {
    for (let i = 0; i < face.points.length; i++) {
      const key = [face.points[i]!, face.points[(i + 1) % face.points.length]!]
        .map((point) => `${point[0].toFixed(5)},${point[1].toFixed(5)}`)
        .sort()
        .join('/');
      const neighbor = edges.get(key);
      if (neighbor && neighbor.facet !== face.facet && neighbor.material === face.material) {
        expect(face.shade, `Facets ${face.facet} and ${neighbor.facet} merge`).not.toBe(
          neighbor.shade,
        );
      }
      edges.set(key, face);
    }
  }
}

describe('single-surface low-poly terrain', () => {
  const scenes = {
    coverRows,
    ridgeRows,
    studyRows,
    lifeWideRows,
    lifeTallRows,
    waystationWideRows,
    waystationTallRows,
  };
  for (const [name, rows] of Object.entries(scenes)) {
    it(`${name} covers its silhouette exactly once`, () => {
      const outline = [
        ...rows[0]!,
        ...rows.slice(1, -1).map((row) => row.at(-1)!),
        ...[...rows.at(-1)!].reverse(),
        ...rows
          .slice(1, -1)
          .reverse()
          .map((row) => row[0]!),
      ];
      expectPartition(createTerrainMesh(rows), area(outline));
      expectDistinctNeighbors(createTerrainMesh(rows));
    });
  }

  it('keeps coplanar triangles distinct when their lighting rounds to the same shade', () => {
    const mesh = createTerrainMesh([
      [
        [0, 0, 0],
        [100, 0, 0],
      ],
      [
        [0, 100, 0],
        [100, 100, 0],
      ],
    ]);
    expect(mesh[0]!.shade).not.toBe(mesh[1]!.shade);
  });

  it('cuts a feature across existing triangles without adding covered faces', () => {
    const mesh = createTerrainMesh([
      [
        [0, 0, 0],
        [100, 0, 0],
      ],
      [
        [0, 100, 0],
        [100, 100, 0],
      ],
    ]);
    const result = inlayTerrain(
      mesh,
      [
        [25, 20],
        [80, 30],
        [60, 85],
        [15, 65],
      ],
      'stone',
      3,
    );
    expectPartition(result, 10000);
    expect(
      result
        .filter((face) => face.material === 'stone')
        .reduce((sum, face) => sum + area(face.points), 0),
    ).toBeCloseTo(2725, 2);
  });

  for (const tall of [false, true]) {
    it(`integrates the ${tall ? 'mobile' : 'desktop'} road, post and stones without overlaps`, () => {
      const original = createTerrainMesh(tall ? waystationTallRows : waystationWideRows);
      expectPartition(
        waystationMesh(tall),
        original.reduce((sum, face) => sum + area(face.points), 0),
      );
      expectDistinctNeighbors(waystationMesh(tall));
    });
  }

  it('cuts paired footprints into the snow instead of covering it', () => {
    const original = createTerrainMesh(lifeWideRows);
    expectPartition(
      snowfieldMesh(false, [
        [718, 611, 49, 0.78],
        [978, 452, 67, 0.53],
      ]),
      original.reduce((sum, face) => sum + area(face.points), 0),
    );
    expectDistinctNeighbors(
      snowfieldMesh(false, [
        [718, 611, 49, 0.78],
        [978, 452, 67, 0.53],
      ]),
    );
  });
});
