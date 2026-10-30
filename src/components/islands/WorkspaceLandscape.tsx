import { type CSSProperties } from 'react';
import { ridgeMesh, studyMesh } from '../../data/terrain-scenes';
import { snowRiftMeshes, campCliffMesh, screeMesh } from '../../data/chapter-landscapes';
import type { WorkspaceGroup } from '../../lib/content-tree/types';
import type { TerrainFace } from '../../lib/terrain-mesh';

const snow = snowRiftMeshes();
const cliff = campCliffMesh();
const scree = screeMesh();
const facets = (mesh: TerrainFace[]) =>
  mesh.map(({ points, shade }, index) => (
    <polygon
      key={index}
      points={points.map(([x, y]) => `${x},${y}`).join(' ')}
      style={{ '--facet': `${3 + shade * 4}%` } as CSSProperties}
    />
  ));

/** The same terrain meshes and motifs used by the corresponding home chapters. */
export default function WorkspaceLandscape({
  group,
  className = 'workspace-landscape',
}: {
  group: WorkspaceGroup;
  className?: string;
}) {
  const ridge = group === 'skill';
  return (
    <svg
      className={className}
      data-landscape={group}
      viewBox={ridge ? '0 0 1440 800' : group === 'study' ? '0 0 1440 320' : '0 0 1200 800'}
      preserveAspectRatio={ridge || group === 'unassigned' ? 'xMidYMid slice' : 'none'}
      aria-hidden="true"
      focusable="false"
    >
      {group === 'life' ? (
        <>
          <g>{facets(snow.upper)}</g>
          <g>{facets(snow.lower)}</g>
          <polyline points={snow.lowerBoundary.map((p) => p.join(',')).join(' ')} />
          {[
            [495, 55, 12],
            [600, 95, 7],
            [700, 145, 18],
            [810, 290, 11],
            [950, 450, 10],
          ].map(([x, y, size]) => (
            <g key={x} transform={`translate(${x} ${y}) scale(${size! / 12})`}>
              <path className="workspace-rock" d="M-8 7-2-10 10 5Z" />
              <path className="workspace-rock-light" d="M-8 7-2-10 1 3Z" />
            </g>
          ))}
        </>
      ) : group === 'documents' ? (
        <>
          {facets(scree)}
          {facets(cliff)}
          <g className="workspace-stars">
            {Array.from({ length: 32 }, (_, i) => (
              <circle
                key={i}
                cx={390 + ((i * 197 + 31) % 780)}
                cy={26 + ((i * 113 + 17) % 590)}
                r={i % 7 === 0 ? 2 : 0.9}
              />
            ))}
          </g>
          <g className="workspace-tent" transform="translate(235 720) scale(.85)">
            <path d="M0 25 28-20 65-9 85 30 38 36Z" />
            <path d="M0 25 28-20 38 36Z" />
            <path d="M12 27 27-4 31 31Z" />
            <path className="workspace-tent-rope" d="M28-20-18 33M65-9 99 34" />
          </g>
        </>
      ) : group === 'study' ? (
        facets(studyMesh)
      ) : ridge ? (
        <>
          {facets(ridgeMesh)}
          <path className="workspace-route" d="M347 752 480 664 555 557 699 427 851 292 1082 168" />
          {[
            [555, 557],
            [699, 427],
            [851, 292],
            [1082, 168],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="5" />
          ))}
        </>
      ) : (
        <>
          <path className="workspace-route" d="M90 720 350 615 490 440 800 335 1100 120" />
          <circle cx="490" cy="440" r="9" />
          <circle cx="800" cy="335" r="6" />
        </>
      )}
    </svg>
  );
}
