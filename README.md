# OptiCube Web Presence

Official static web presence for **OptiCube Games** with a dedicated product page and full **LUCKROT Press Kit**.

This repository is designed for direct deployment on static hosting and for fast editorial updates without a build pipeline.

## Scope

The project currently includes three production-facing pages:

- `index.html` - company landing entry point
- `luckrot.html` - primary marketing page for LUCKROT
- `press-kit.html` - press and media resource page for LUCKROT

## Product Link

- Steam page: [LUCKROT on Steam](https://store.steampowered.com/app/3823650/LUCKROT/)

## Core Capabilities

- Shared header and footer via partial injection (`partials/header.html`, `partials/footer.html`)
- Dedicated LUCKROT landing with autoplay gameplay video and featured metadata
- Press kit with structured sections: `FACTSHEET`, `DESCRIPTION`, `TRAILER`, `SCREENSHOTS`, and `VISUAL LIBRARY`
- Tabbed visual library views for `Characters`, `Weapons`, and `Bots`
- Unified lightbox behavior for both visual library assets and press-kit screenshots
- Responsive layout for desktop and mobile
- Footer social links (Steam, Instagram, TikTok, X)

## Technical Profile

- Stack: plain HTML, CSS, vanilla JavaScript
- Build system: none
- Package manager: none
- Runtime requirement: any static HTTP server (required for `fetch` partial loading)

## Local Development

Run from the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

Alternative:

```bash
npx serve .
```

## Repository Structure

```text
.
├── index.html
├── luckrot.html
├── press-kit.html
├── styles.css
├── script.js
├── partials/
│   ├── header.html
│   └── footer.html
└── images/
```

## Content Editing Guide

- Edit `luckrot.html` for product-page copy, metadata, and call-to-action links.
- Edit `press-kit.html` for factsheet data, long-form description, trailer embed, screenshots, and visual library section content.
- Edit `styles.css` for layout, typography, spacing, and visual theme adjustments.
- Edit `script.js` for interaction logic (partial loading, tabs, lightbox, and scroll behavior).
- Edit `partials/header.html` and `partials/footer.html` for global header/footer updates.

## Deployment Notes

- Deploy as a static site (Netlify, Vercel static output, GitHub Pages, S3/CloudFront, Nginx, etc.)
- Do not open pages directly via `file://` for QA, because partial loading depends on HTTP
- Preserve relative file structure when publishing

## GitHub Pages Quick Publish

This repository includes a ready-to-use GitHub Actions workflow at:

- `.github/workflows/deploy-pages.yml`

To publish a real public website URL:

1. Push this repository to GitHub and ensure the default branch is `main`.
2. Open repository settings: `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push any commit to `main` (or run the workflow manually from the `Actions` tab).
5. Wait for the `Deploy static site to GitHub Pages` workflow to finish.
6. Open your live URL:
   - `https://<your-github-username>.github.io/<repository-name>/`

Optional custom domain:

1. In `Settings -> Pages`, set `Custom domain`.
2. Point your domain DNS to GitHub Pages according to GitHub docs.

## Quality Expectations

- Keep all public-facing copy in English
- Preserve semantic HTML and accessible labels for media and controls
- Validate responsive behavior after any layout change
- Verify lightbox behavior after changes to gallery markup

## License

MIT License. See `LICENSE`.
