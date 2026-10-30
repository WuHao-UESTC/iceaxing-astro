# Life and study layout correction

This directory preserves the six complete source files immediately before the
2026-10-30 correction. The `.bak` suffix keeps backup sources out of Astro and
TypeScript checks. The earlier `life-study-landscapes-20261030` directory also
retains the original single-mountain drawing and its before screenshots.

Restore this backup from the repository root in PowerShell:

```powershell
$backupRoot = 'doc/design/backups/life-study-layout-correction-20261030'
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

Restoration replaces the entire files; review later edits first.

The correction restores the study landscape's original crest, SVG placement,
horizontal reflection, and original terrain palette. Only interior/foot vertices
are redistributed; there is one continuous mountain, with no layered ridges.

The life landscape restores the original upper-bank silhouette. A triangle near
04 is reshaped so that its edges skirt the number and caption while retaining
its terrain fill. No background patch or large cutout is used. Both banks are
redrawn with larger facets, preserving the diagonal rift and category layout.
