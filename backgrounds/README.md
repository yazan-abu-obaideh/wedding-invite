# Adding Background Images

Drop your background images in this folder, then reference them in `css/styles.css`.

## Quick Start

1. Add your image to this folder (e.g., `our-photo.jpg`)
2. Open `css/styles.css`
3. Find the theme you want to customize (e.g., `[data-theme="design1"]`)
4. Add these lines inside the selector:

```css
[data-theme="design1"] {
  /* ... existing styles ... */

  /* ADD THESE LINES */
  --bg-image: url('../backgrounds/our-photo.jpg');
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay; /* or: soft-light, multiply, screen */
}
```

## Per-Theme Backgrounds

Each theme supports its own background image independently:

| Theme | Best Blend Mode |
|-------|----------------|
| Classic Gold | `overlay` or `soft-light` |
| Garden Romance | `soft-light` |
| Modern Minimal | `overlay` |
| Celestial Night | `screen` |
| Bohemian Dream | `multiply` |
| Editorial Chic | `overlay` |
| Watercolor Whispers | `soft-light` |
| Rustic Charm | `multiply` |
| Art Deco Luxe | `screen` |
| Sunset Glow | `soft-light` or `overlay` |

## Recommended Image Sizes

- **Hero/Full screen**: 1920x1280px
- **Tiled/Pattern**: 500x500px (set `background-repeat: repeat`)

## Serving via GitHub Pages

Just push the repo to GitHub and enable Pages from the root. The site works with hash-based routing — no server configuration needed:

```
https://<username>.github.io/<repo-name>/#design1
```
