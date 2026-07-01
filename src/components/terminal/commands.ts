import type { NavigateFunction } from 'react-router-dom'
import type { Theme } from '../../themes'

export interface CommandContext {
  args: string[]
  theme: Theme
  themes: Theme[]
  setTheme: (id: string) => void
  navigate: NavigateFunction
}

export interface CommandResult {
  text?: string
  type?: 'output' | 'error' | 'system'
  clear?: boolean
  navigate?: string
  theme?: string
}

type CommandHandler = (ctx: CommandContext) => CommandResult

const banner = `
   █████╗  █████╗ ██████╗ ██╗   ██╗███████╗██╗  ██╗
  ██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔════╝██║  ██║
  ███████║███████║██████╔╝██║   ██║███████╗███████║
  ██╔══██║██╔══██║██╔══██╗██║   ██║╚════██║██╔══██║
  ██║  ██║██║  ██║██║  ██║╚██████╔╝███████║██║  ██║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
`

const asciiArt: Record<string, string> = {
  fullstack: `
    ┌──────────────────────────┐
    │  ╔═══╗ ╔══╗ ╦ ╦ ╔═══╗  │
    │  ║ ╦ ║ ║╔╗║ ║ ║ ║ ╔═╝  │
    │  ║ ║ ║ ║╚╝║ ║ ║ ║ ╚═╗  │
    │  ╚═╝ ╚╝ ╚╝ ╚═╝ ╚═══╝  │
    │   Full-Stack Developer   │
    └──────────────────────────┘
  `,
  spatial: `
    ┌──────────────────────────┐
    │  ╔═╗╔═╗╔═╗ ╦ ╔═╗╦ ╦╔═╗ │
    │  ╠═╣╠═╝╠═╣ ║ ║ ╦║ ║╚═╗ │
    │  ╩ ╩╩  ╩ ╩╚╝╚═╝╚═╝╚═╝ │
    │  Spatial Computing Eng  │
    └──────────────────────────┘
  `,
  ai: `
    ┌──────────────────────────┐
    │   ╔═╗╦  ╔═╗╦           │
    │   ╠═╣║  ║ ╦║           │
    │   ╩ ╩╩═╝╚═╝╩           │
    │   AI & ML Engineer      │
    └──────────────────────────┘
  `,
}

export const commands: Record<string, CommandHandler> = {
  help: () => {
    const lines = ['Available commands:', '']
    const groups: Record<string, string[]> = {
      Navigation: ['about', 'blog', 'contact', 'experience', 'home', 'projects', 'skills'],
      Info: ['banner', 'date', 'help', 'neofetch', 'whoami'],
      Actions: ['clear', 'echo', 'ls', 'repo', 'theme'],
    }
    for (const [group, cmds] of Object.entries(groups)) {
      lines.push(`  ${group}:`)
      for (const c of cmds) {
        const desc = descriptions[c] || ''
        lines.push(`    ${c.padEnd(14)}${desc}`)
      }
      lines.push('')
    }
    return { text: lines.join('\n'), type: 'output' }
  },

  whoami: () => ({
    text: `Aarush Karak
  Full-Stack Developer & Spatial Computing Engineer
  Founder @ The Coder Bros
  https://aarushkarak.vercel.app`,
    type: 'output',
  }),

  clear: () => ({ text: '', clear: true }),

  banner: () => ({ text: banner, type: 'output' }),

  date: () => ({ text: new Date().toString(), type: 'output' }),

  echo: ({ args }) => ({ text: args.join(' ') || '', type: 'output' }),

  home: () => ({ text: 'Navigating to home...', navigate: '/' }),
  about: () => ({ text: 'Navigating to about...', navigate: '/about' }),
  experience: () => ({ text: 'Navigating to experience...', navigate: '/experience' }),
  projects: () => ({ text: 'Navigating to projects...', navigate: '/projects' }),
  skills: () => ({ text: 'Navigating to skills...', navigate: '/skills' }),
  blog: () => ({ text: 'Navigating to blog...', navigate: '/blog' }),
  contact: () => ({ text: 'Navigating to contact...', navigate: '/contact' }),

  ls: ({ args }) => {
    const target = args[0] || '~'
    const dirs: Record<string, string> = {
      '~': 'about/  blog/  contact/  experience/  projects/  skills/',
      '/': 'about/  blog/  contact/  experience/  home/  projects/  skills/',
      about: 'bio  philosophy  resume.pdf',
      blog: posts.join('  '),
      projects: 'helios/  finance-hub/  coder-bros/  fixmate/',
      skills: 'frontend/  backend/  AI/  spatial/  tools/',
    }
    return { text: dirs[target] || `ls: cannot access '${target}': No such directory`, type: 'output' }
  },

  cd: ({ args }) => {
    const target = args[0] || '~'
    const pageMap: Record<string, string> = {
      about: '/about',
      blog: '/blog',
      contact: '/contact',
      experience: '/experience',
      home: '/',
      projects: '/projects',
      skills: '/skills',
    }
    if (pageMap[target]) {
      return { text: `cd: ${target}/ — navigating...`, navigate: pageMap[target] }
    }
    if (target === '..' || target === '~') {
      return { text: '', type: 'output' }
    }
    return { text: `cd: ${target}: No such directory`, type: 'error' }
  },

  neofetch: ({ theme }) => ({
    text: `${banner}
  OS:        PortfolioOS v2.0
  Host:      aarushkarak-website
  Kernel:    React 19 + TypeScript 6
  Uptime:    since 2020
  Shell:     /bin/portfolio
  Theme:     ${theme.label}
  Packages:  Three.js / Framer Motion / Tailwind CSS
  CPU:       Apple M-Series
  GPU:       WebGL 2.0 / WebGPU
  Memory:    6 pages, 3D scenes, particle systems`,
    type: 'output',
  }),

  theme: ({ args, theme, themes, setTheme }) => {
    if (args.length === 0) {
      return { text: `Current theme: ${theme.label}\nAvailable: ${themes.map(t => t.label).join(', ')}\nUsage: theme <name>`, type: 'output' }
    }
    const name = args.join(' ').toLowerCase()
    const found = themes.find(t => t.label.toLowerCase() === name || t.id === name)
    if (found) {
      setTheme(found.id)
      return { text: `Theme set to ${found.label}`, type: 'system' }
    }
    return { text: `Theme '${name}' not found. Available: ${themes.map(t => t.label).join(', ')}`, type: 'error' }
  },

  repo: () => ({
    text: 'Opening GitHub profile...',
    type: 'system',
    navigate: 'https://github.com/3ni8ma',
  }),

  sudo: ({ args }) => {
    if (args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
      return { text: 'Nice try. This is not a real OS.', type: 'system' }
    }
    return { text: `Permission denied. ${args.join(' ')} requires elevated privileges.`, type: 'error' }
  },

  fullstack: () => ({ text: asciiArt.fullstack, type: 'output' }),
  spatial: () => ({ text: asciiArt.spatial, type: 'output' }),
  ai: () => ({ text: asciiArt.ai, type: 'output' }),
}

const descriptions: Record<string, string> = {
  about: 'Navigate to About page',
  banner: 'Display startup banner',
  blog: 'Navigate to Blog',
  cd: 'Navigate to a page (e.g. cd about)',
  clear: 'Clear the terminal',
  contact: 'Navigate to Contact page',
  date: 'Show current date and time',
  echo: 'Print text to terminal',
  experience: 'Navigate to Experience page',
  help: 'Show this help message',
  home: 'Navigate to Home',
  ls: 'List contents of a directory',
  neofetch: 'Display system information',
  projects: 'Navigate to Projects page',
  repo: 'Open GitHub profile',
  skills: 'Navigate to Skills page',
  sudo: 'Elevate privileges (not really)',
  theme: 'Change color theme',
  whoami: 'Display user information',
  fullstack: 'Show full-stack badge',
  spatial: 'Show spatial badge',
  ai: 'Show AI badge',
}

const posts = ['hello-world/', 'building-helios/', 'spatial-computing-future/']
