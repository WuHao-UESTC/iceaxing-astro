# Life upper-bank mesh repair

This backup preserves `src/data/chapter-landscapes.ts` and
`src/lib/terrain-mesh.ts` before the 2026-10-30 upper-bank repair. `before.png`
records the previous desktop appearance. Source backups use `.bak` so they are
not picked up by Astro or TypeScript checks.

Restore from the repository root in PowerShell:

```powershell
$backupRoot = 'doc/design/backups/life-upper-mesh-repair-20261030'
foreach ($file in @('src/data/chapter-landscapes.ts', 'src/lib/terrain-mesh.ts')) {
  Copy-Item -LiteralPath (Join-Path $backupRoot ($file + '.bak')) -Destination $file
}
```

Restoration replaces the whole files; review later edits before restoring.

The repair replaces the stretched upper grid with an explicitly triangulated
marker region and staggered lower vertices. It removes the horizontal seam and
the narrow fan of facets. The accepted palette, rift contour, lower bank,
category placement, and study chapter are retained. The area behind 04 keeps
its terrain fill, with triangle edges routed outside the number and caption.
