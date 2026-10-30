# Life and study landscape redesign

This backup preserves the six complete source files before the 2026-10-30
landscape redesign, including existing working changes. Files use a `.bak`
suffix so Astro and TypeScript do not treat backup components as application
source. The previously accepted welcome-level terrain brightness is retained.

Before screenshots: `life-before.png` and `study-before.png`.

To restore from the repository root using PowerShell:

```powershell
$backupRoot = 'doc/design/backups/life-study-landscapes-20261030'
$files = @(
  'src/data/chapter-landscapes.ts',
  'src/data/terrain-scenes.ts',
  'src/components/home/LifeLibraryLandscape.astro',
  'src/components/home/StudyLandscape.astro',
  'src/styles/life-library.css',
  'src/styles/study-constellation.css'
)
foreach ($file in $files) {
  Copy-Item -LiteralPath (Join-Path $backupRoot ($file + '.bak')) -Destination $file
}
```

Restoration replaces those entire files. Review later edits before running it.

The life landscape keeps the diagonal rift, category positions, and anchors,
with coarser triangles on both banks. Its upper bank turns below the 04 marker
to leave open sky behind the number and caption. The study landscape keeps its
bottom placement and adds three overlapping ridgelines with evenly spaced
facets and distinct distant/middle/near tonal bands. The content and navigation
layouts are unchanged.
