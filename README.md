# OptiCube Website

Official static website for **OptiCube Games** and the **LUCKROT** project.

## Live Website

- Main website: [https://opticubestudio.com](https://opticubestudio.com)
- LUCKROT page: [https://opticubestudio.com/luckrot.html](https://opticubestudio.com/luckrot.html)
- LUCKROT Press Kit page: [https://opticubestudio.com/presskit.html](https://opticubestudio.com/presskit.html)

## What This Project Includes

- Company landing page
- LUCKROT game page
- LUCKROT Press Kit with factsheet, description, trailer, screenshots, and media library
- Shared header/footer loaded from partials
- Responsive layout for desktop, tablet, and mobile

## Planned Next Pages

- `Future Games` page
  - The `Future Games` button already exists in the header and will be connected to a dedicated page.
- `MEDIA DOWNLOAD` page
  - The `MEDIA DOWNLOAD` button exists on the Press Kit and is currently disabled.
  - It will be connected to a page where press/media assets can be downloaded.

## Screenshots

### Home / Branding

![OptiCube Branding](images/opticube_games/LOGO_5.png)

### LUCKROT Header

![LUCKROT Header](images/branding/LibraryLogo_new.png)

### Gameplay Screenshot

![LUCKROT Screenshot](images/screenshots/Screenshot_1.png)

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

## Local Run

From the repository root:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## Project Structure

```text
.
├── index.html
├── luckrot.html
├── presskit.html
├── styles.css
├── script.js
├── data/
│   └── media-library.json
├── partials/
│   ├── header.html
│   └── footer.html
└── images/
```

## Editing Guide

- Edit `index.html` for company homepage content.
- Edit `luckrot.html` for game page content and links.
- Edit `presskit.html` for LUCKROT press kit content.
- Edit `styles.css` for styling and responsive behavior.
- Edit `script.js` for interactions and partial loading logic.
- Edit `data/media-library.json` for Visual Library items on the LUCKROT Press Kit page.

## License

MIT. See `LICENSE`.
