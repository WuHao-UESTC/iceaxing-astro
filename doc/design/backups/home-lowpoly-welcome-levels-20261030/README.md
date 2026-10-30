# Match welcome page brightness

`home.css` preserves the complete working stylesheet before matching the welcome
page's dark terrain levels on 2026-10-30. Earlier backups remain in their own
directories.

To roll back from the repository root in PowerShell:

```powershell
Copy-Item -LiteralPath 'doc/design/backups/home-lowpoly-welcome-levels-20261030/home.css' -Destination 'src/styles/home.css'
```

This restores the whole stylesheet, including its existing uncommitted changes.
If later edits need to be preserved, remove only the dark terrain calibration
block added between `.terrain-material-track` and `.journey-landscape path`.

The dark terrain uses the welcome page's facet OKLCH lightness and chroma with
the home chapter hues. The outline uses the lightness/chroma of welcome gold
`#c6ac75`, with opacity 0.16, 0.3, or 0.46 across the six shades. Width remains
0.8px. Landscape opacity is normalized to 1 so mobile/desktop opacity does not
dim these calibrated colors again. The light theme keeps its previous styling.
