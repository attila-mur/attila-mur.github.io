# Portfolio Site — attila-mur.github.io

## Tech Stack
- **Pure HTML/CSS/JS** — no frameworks, no build tools, no dependencies
- Deployed via **GitHub Pages** (push to `main` to deploy)
- Google Fonts: Space Grotesk + JetBrains Mono

## Project Structure
```
index.html          — main portfolio page
style.css           — all styles (~1000 lines), CSS variables, dark/light themes
stream.js           — JS features: WikiStream, ThemeManager, MobileNav, ScrollAnimations
cvs/                — CV in markdown, HTML, and PDF formats
projects/           — standalone mini-projects (word-cards, data-stream, dynamic-background, ride-clean, seafloor)
```

## Key Details
- **No build step** — files are served as-is
- **No package.json** — zero npm dependencies
- Dark theme is default; light theme via `data-theme` attribute
- Theme preference persisted in localStorage
- Background uses live Wikipedia API stream (3 animated columns)
- CSS uses variables, glassmorphism, clamp() for fluid typography
- Responsive breakpoints: 768px (tablet), 900px (desktop)

## Conventions
- Keep it dependency-free — vanilla HTML/CSS/JS only
- Mobile-first responsive design
- Semantic HTML with ARIA labels
- Mini-projects go in `projects/` as self-contained directories
- Save important context to this file for future conversations
