<div align="center">

# `<AM />`

### attila-mur.github.io

A minimal, dependency-free portfolio site built with vanilla HTML, CSS & JavaScript.

[![GitHub Pages](https://img.shields.io/badge/Live-attila--mur.github.io-00d4aa?style=flat-square&logo=github)](https://attila-mur.github.io)

</div>

---

## Features

- **Dark / Light theme** — toggleable with system preference detection, persisted in localStorage
- **Live background** — ambient Wikipedia stream rendered in animated columns
- **Glassmorphism UI** — frosted glass cards with subtle depth and blur effects
- **Responsive** — mobile-first layout with fluid typography via `clamp()`
- **Zero dependencies** — no frameworks, no build step, no npm

## Tech

| Layer | Details |
|-------|---------|
| **Markup** | Semantic HTML5 with ARIA labels |
| **Styles** | CSS variables, Grid, Flexbox, `backdrop-filter` |
| **Scripts** | ES6+ classes — WikiStream, ThemeManager, MobileNav, ScrollAnimations |
| **Fonts** | Space Grotesk + JetBrains Mono (Google Fonts) |
| **Hosting** | GitHub Pages — push to `main` to deploy |

## Structure

```
.
├── index.html        # Main portfolio page
├── style.css         # All styles (~1000 lines)
├── stream.js         # Interactive features
├── cvs/              # CV in Markdown, HTML & PDF
└── projects/         # Standalone mini-projects
    ├── word-cards/       # Language flashcard app
    ├── data-stream/      # Wikipedia stream demo
    ├── dynamic-background/
    ├── ride-clean/
    └── seafloor/
```

## Pet Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [**Language Learner**](https://language-learner-v2.onrender.com/) | Flashcard-style vocabulary app | Go, Docker |
| [**Bloom Scroller**](https://bloom-scroller.onrender.com) | Full-screen plant photo viewer via iNaturalist | React, Vite |

## Run Locally

No build step needed — just serve the files:

```bash
# python
python3 -m http.server 8000

# node
npx serve .
```

Then open `http://localhost:8000`.

## License

MIT

