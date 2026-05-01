# Indomie Nigeria — Official Website

Premium, fully interactive website for Indomie Nigeria. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Live Site
Deployed on Vercel: [indomie.vercel.app](https://indomie.vercel.app)

## Stack
- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JS** — no dependencies except GSAP
- **GSAP 3** — scroll animations, entrance/outro transitions
- **Font Awesome 6** — icons
- **Vercel** — static hosting with CDN

## Features
- Fullscreen video hero with autoplay slideshow
- Cinematic page entrance (red curtain reveal) + page-leave transition
- Custom cursor using the Indomie logo
- Product showcase with 5 flavour tabs
- Recipe section with modal popups
- Fullscreen video slider (3 brand films)
- Fun Club + ICA sections
- Awards gallery
- Animated footer with newsletter
- Dark / light mode
- GSAP scroll animations throughout
- Fully responsive (320px → 4K)

## Project Structure
```
indomie/
├── index.html          # Main page
├── logo.png            # Brand logo
├── vercel.json         # Vercel deployment config
├── css/
│   └── style.css       # All styles
├── js/
│   ├── main.js         # Core interactions
│   ├── intro.js        # Entrance & outro animations
│   └── animations.js   # GSAP scroll animations
├── video/
│   ├── Show Some Love With Indomie_1080p.mp4
│   ├── Show Some Love this Ramadan with Indomie_1080p.mp4
│   └── indomie-brand-story_720p.mp4
└── assets/
    └── images/
```

## Deploy to Vercel
This repo is configured for automatic Vercel deployment.

1. Push to `main` branch on GitHub
2. Vercel auto-deploys on every push
3. Videos are served with `Accept-Ranges: bytes` for proper streaming

## Local Development
No build step needed — just open `index.html` in a browser, or use any static server:

```bash
# Python
python -m http.server 3000

# Node
npx serve .
```

---
© 2024 Dufil Prima Foods Plc. All rights reserved.
