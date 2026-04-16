# OptiCube Website

Official static website for OptiCube Games and the LUCKROT promotional pages.

## Overview

This repository contains a small multi-page marketing site built with plain HTML, CSS, and JavaScript.

It currently includes:

- a minimal company landing page
- a dedicated LUCKROT game page
- a LUCKROT press kit page with trailer, factsheet, screenshots, and visual library
- a placeholder page for future game announcements
- shared header and footer partials loaded at runtime

There is no build step and no framework. The site is meant to be deployed as static files.

## Site Showcase

<video src="images/website_record/screencast.mov" controls muted playsinline preload="metadata" width="100%">
  Your browser does not support embedded video playback. Download the showcase here:
  <a href="images/website_record/screencast.mov">screencast.mov</a>
</video>

## Live Routes

- `/` - OptiCube landing page
- `/luckrot/` - LUCKROT game page
- `/luckrot/press-kit/` - LUCKROT press kit
- `/future-games/` - future projects page

Production domain: [opticubestudio.com](https://opticubestudio.com)

## Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```text
.
├── index.html
├── future-games/
│   └── index.html
├── luckrot/
│   ├── index.html
│   └── press-kit/
│       └── index.html
├── partials/
│   ├── footer.html
│   └── header.html
├── data/
│   └── media-library.json
├── images/
├── styles.css
├── script.js
├── 404.html
├── CNAME
└── LICENSE
```

## How It Works

`script.js` handles the small amount of shared behavior across the site:

- loading `partials/header.html` and `partials/footer.html`
- mobile navigation interactions
- current year rendering in the footer
- media library loading from `data/media-library.json`
- lightbox behavior for the press kit gallery
- screenshot carousel behavior on the press kit page

If `data/media-library.json` fails to load, the script falls back to built-in default media entries.

## Content Map

Use this as the main editing guide:

- `index.html` - company landing page
- `luckrot/index.html` - LUCKROT overview, trailer embed, Steam CTA, release metadata
- `luckrot/press-kit/index.html` - factsheet, description, trailer, screenshots, media download link
- `future-games/index.html` - future releases placeholder page
- `partials/header.html` - global navigation
- `partials/footer.html` - global footer and social links
- `styles.css` - shared styling and responsive rules for all pages
- `script.js` - shared runtime behavior
- `data/media-library.json` - image entries shown in the press kit visual library

## Media Library Format

The press kit visual library expects this JSON shape:

```json
{
  "characters": [{ "src": "images/characters/Fodder_Body.png", "label": "Fodder" }],
  "weapons": [{ "src": "images/weapons/AK_Screen2.png", "label": "AK" }],
  "bots": [{ "src": "images/bots/BombBot.png", "label": "Bomb Bot" }]
}
```

Each item must include:

- `src` - path to the asset relative to the site root
- `label` - display name shown in the gallery

## Deployment Notes

- The site is static and can be hosted on GitHub Pages or any static host.
- `CNAME` is included for custom domain mapping.
- Root pages use `<base href="./">` and nested pages use relative `<base>` values, so page assets resolve correctly from subdirectories.

## License

MIT. See [LICENSE](LICENSE).
