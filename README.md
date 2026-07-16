<p align="center">
  <img src="public/favicon.svg" width="80" alt="logo" />
</p>

<h1 align="center">Aarush Karak — Portfolio</h1>

<p align="center">
  <strong>3D spatial portfolio built with React 19 + Three.js + TypeScript 6</strong>
</p>

<p align="center">
  <a href="https://aarushkarak.vercel.app">Live Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss" />
</p>

---

A dark cinematic portfolio with **interactive 3D scenes** powered by React Three Fiber — featuring floating geometries, particle constellations, a scroll-driven timeline, and 6 color themes.

## Demo

[→ aarushkarak.vercel.app](https://aarushkarak.vercel.app)

## Features

- **6 immersive 3D scenes** — Hero, About, Experience, Skills, Projects, Contact — each with unique Three.js backgrounds
- **Scroll-driven 3D timeline** — Experience page with animated nodes on a curved spatial path
- **Particle constellations** — Skills scene with reactive Three.js particle system
- **5 color themes** — Magma, Forest, Ocean, Sunset, Midnight — dynamically switchable
- **3D tilt cards** — Project cards with mouse-driven perspective transforms
- **Custom cursor with particle trail** — Reads theme colors dynamically
- **Smooth page transitions** — Spatial scale+rotate animations between pages
- **Lenis smooth scroll** — Butter-smooth scrolling throughout
- **Fully responsive** — Works across desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| 3D Engine | React Three Fiber 9 + Drei 10 + Three.js 0.185 |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion + Lenis |
| Post-processing | @react-three/postprocessing |
| Routing | React Router DOM 7 |

## Getting Started

```bash
git clone https://github.com/3ni8ma/aarushkarak-website.git
cd aarushkarak-website
npm install
npm run dev
```

## Project Structure

```
src/
  assets/         # Static assets (images)
  components/     # Reusable UI components
    about/        # AboutScene (floating 3D geometries)
    contact/      # ContactScene (reactive particle field)
    experience/   # ExperienceScene (3D scroll timeline)
    home/         # HeroScene (R3F geometries + particles)
    layout/       # Navbar, Footer, PageTransition
    projects/     # ProjectsSection (3D tilt cards)
    skills/       # SkillsScene (particle constellation)
    ui/           # GlassCard, SectionHeading, Tag, AnimatedCounter
  hooks/          # Custom React hooks (useThemeColors, etc.)
  pages/          # Route pages
  App.tsx         # Root component with routes
  main.tsx        # Entry point
  index.css       # Global styles + Tailwind directives
public/           # Static files (images, favicon, resume.pdf)
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Type-check and build for production
- `npm run lint` — Lint all source files
- `npm run preview` — Preview production build locally

## License

MIT

<!-- ach: 2026-06-26 15:59:52 -->

<!-- ach: 2026-07-10 12:00:16 -->

<!-- ach: 2026-07-10 19:30:17 -->

<!-- ach: 2026-07-10 22:00:59 -->

<!-- ach: 2026-07-11 00:32:21 -->

<!-- ach: 2026-07-11 13:01:20 -->

<!-- ach: 2026-07-12 21:30:22 -->

<!-- ach: 2026-07-13 00:01:23 -->

<!-- ach: 2026-07-13 12:31:23 -->

<!-- ach: 2026-07-14 01:01:05 -->

<!-- ach: 2026-07-14 16:01:53 -->

<!-- ach: 2026-07-14 21:00:26 -->

<!-- ach: 2026-07-15 02:01:34 -->

<!-- ach: 2026-07-15 17:00:34 -->

<!-- ach: 2026-07-16 00:32:05 -->
