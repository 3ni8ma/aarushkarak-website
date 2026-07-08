import type { BlogPost } from '../blog'

export const helloWorld: BlogPost = {
  slug: 'hello-world',
  title: 'Hello, World!',
  date: '2026-06-28',
  excerpt: 'Welcome to my blog. A place where I share thoughts on software engineering, spatial computing, AI, and everything in between.',
  tags: ['Personal', 'Meta'],
  image: '',
  content: `
## Welcome

Hey there! Welcome to my little corner of the internet where I write about things I'm building, learning, and thinking about.

I'm Aarush — a full-stack developer, spatial computing engineer, and founder of The Coder Bros. I spend most of my time building browser-based AI systems, 3D interfaces, and open-source tools.

### What to expect

This blog is where I'll be sharing:

- **Technical deep dives** — How I built HELIOS, my 3D gesture-controlled AI operating system
- **Project breakdowns** — Architecture decisions, trade-offs, and lessons learned
- **Thoughts on tech** — Spatial computing, AI, WebGL, and the future of the browser
- **Tutorials** — Step-by-step guides on Three.js, MediaPipe, React, and more

### Why start a blog?

I've been building software for over 6 years now, and I've learned most of what I know from reading other developers' blogs and documentation. This is my way of giving back to that community.

Plus, writing forces you to understand things at a deeper level. If you can't explain it, you don't really know it.

### Get in touch

If something here resonates with you, [reach out](/contact). I'm always happy to chat about projects, ideas, or just geek out about tech.

Thanks for reading!
`
}
