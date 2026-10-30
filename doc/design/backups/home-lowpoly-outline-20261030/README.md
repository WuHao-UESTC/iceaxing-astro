# Home low-poly outline experiment

`home.css` is the complete working copy of `src/styles/home.css` immediately before
the outline experiment on 2026-10-30, including existing uncommitted changes.

Original SHA256: `9F97B9F7AF29DF108F9FA6DAF7845C4219ED59990A04422D4F8A9B543B0EAEAD`

To restore from the repository root in PowerShell:

```powershell
Copy-Item -LiteralPath 'doc/design/backups/home-lowpoly-outline-20261030/home.css' -Destination 'src/styles/home.css'
```

This restores the whole stylesheet. If later edits have been made, undo only the
experiment in `.terrain-face`: restore the stroke to `var(--terrain-color)`, the
stroke width to `1`, and remove `stroke-linecap: round`.

The experiment uses a 0.8px non-scaling outline, mixing each chapter's accent
color at 30% with the original triangle fill. It applies to all home chapters,
both themes, and both desktop and mobile landscapes.
