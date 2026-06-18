# Aarush Karak | Portfolio

Personal portfolio website built with **React 19**, **TypeScript 6**, **Vite 8**, and **Tailwind CSS 3**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Routing | React Router DOM 7 |
| Icons | Lucide React + Bootstrap Icons |
| Linting | ESLint 10 |

## Getting Started

```bash
npm install
npm run dev       # Start dev server
npm run build     # TypeScript check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Project Structure

```
src/
  assets/         # Static assets (images)
  components/     # Reusable UI components
    about/
    contact/
    experience/
    home/
    layout/       # Navbar, Footer, PageTransition
    projects/
    skills/
    ui/           # GlassCard, SectionHeading, Tag, AnimatedCounter
  hooks/          # Custom React hooks
  pages/          # Route pages (Home, About, Experience, Projects, Skills, Contact)
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
