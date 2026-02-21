# LUCKROT One-Page Showcase

Single-page marketing website for **LUCKROT** by OptiCube.

Steam page: [LUCKROT on Steam](https://store.steampowered.com/app/3823650/LUCKROT/)

## Preview

![LUCKROT Main Visual](images/branding/photo_2026-02-21%2021.09.34.jpeg)

## What is on the page

- Hero + featured game block focused on one title
- Header and footer loaded from separate partial files
- Full "About This Game" section
- Character and weapon gallery with tab switcher
- Lightbox image viewer (open image in full screen)
- System requirements and mature content warning
- Footer with Steam, Instagram, TikTok, and X links

## Run locally

Use a local HTTP server so partial loading works:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Project structure

- `index.html` - page layout and content
- `styles.css` - theme, layout, responsive rules
- `script.js` - partial loading, tabs, gallery rendering, lightbox, UI interactions
- `partials/header.html` - header markup
- `partials/footer.html` - footer markup
- `images/` - local visual assets

## License

MIT. See `LICENSE`.
