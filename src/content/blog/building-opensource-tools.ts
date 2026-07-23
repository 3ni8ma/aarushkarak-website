import type { BlogPost } from '../blog'

export const buildingOpensourceTools: BlogPost = {
  slug: 'building-opensource-tools',
  title: 'Building Open-Source Developer Tools as a Student',
  date: '2026-07-10',
  excerpt: 'How I built and published React hooks, a Tailwind CSS plugin, and a Vite plugin — and why every student developer should ship open-source.',
  tags: ['Open Source', 'React', 'Tailwind CSS', 'Vite'],
  image: '/images/bg/home.jpg',
  content: `
## Why Build Tools?

When I started building open-source tools, I asked myself: "Who am I to publish a library? I'm still learning." But that thinking backward. The best way to learn deeply is to build something others can use.

Over the past year, I've published:

- **react-hooks** — A collection of production-ready React hooks
- **tailwind-plugin** — A Tailwind CSS plugin for glassmorphism, text gradients, and glow
- **vite-plugin** — Auto-generates sitemap.xml and robots.txt on build

Here's what I learned from each.

## react-hooks: Start with What You Use

Every React project needs the same hooks — debounce, localStorage sync, media queries, intersection observer. I extracted the ones I kept rewriting across projects and packaged them.

### Key takeaway

Ship the hooks you already use in your projects. You've already battle-tested them.

## tailwind-plugin: Scratch Your Own Itch

I kept repeating the same CSS for glass effects and text gradients. Tailwind Config is extensible for a reason.

\`\`\`typescript
// The plugin adds utilities like:
// class="glass" -> backdrop-filter: blur(20px)
// class="text-gradient" -> background-clip: text
plugin(function({ addUtilities }) {
  addUtilities({
    '.glass': {
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)',
    },
    '.text-gradient': {
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    },
  })
})
\`\`\`

### Key takeaway

If you repeat a CSS pattern more than 3 times, it deserves to be a plugin.

## vite-plugin: Solve a Real Problem

I noticed my portfolio site was missing from Google search results. No sitemap meant search engines couldn't find my pages. So I automated it.

### Key takeaway

The best projects solve a problem you actually have. Users can tell the difference.

## Lessons for Student Developers

1. **Start small** — A single-purpose utility is fine
2. **Good documentation > fancy features** — Clear READMEs get more stars
3. **Version 1.0.0 is a milestone, not a finish line** — Ship early, iterate
4. **npm publish is free** — There's no barrier to entry
5. **Open-source contributions compound** — Each tool teaches you something for the next

## What's Next

I'm working on expanding the hooks collection and adding more utilities to the Tailwind plugin. If you have suggestions, I'd love to hear them.

Check them out on [GitHub](https://github.com/3ni8ma).
`
}
