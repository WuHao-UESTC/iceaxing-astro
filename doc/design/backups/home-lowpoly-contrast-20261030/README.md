# Home low-poly contrast adjustment

`home.css` preserves the complete working stylesheet immediately before the
2026-10-30 contrast adjustment. It includes the first outline experiment and all
earlier uncommitted stylesheet changes. The earlier backup without outlines is
still in `../home-lowpoly-outline-20261030/`.

Restore this version from the repository root in PowerShell:

```powershell
Copy-Item -LiteralPath 'doc/design/backups/home-lowpoly-contrast-20261030/home.css' -Destination 'src/styles/home.css'
```

This restores the entire stylesheet. To undo only this adjustment after later
edits, remove `--terrain-outline` from `.terrain-face` and restore:

```css
fill: var(--terrain-color);
stroke: color-mix(in srgb, var(--scene-accent) 30%, var(--terrain-color));
```

The adjustment mixes triangle fills with 6% black and outlines with 8% white,
preserving the chapter colors and 0.8px outline width in both themes.
