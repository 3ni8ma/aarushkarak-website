import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { themes, type Theme } from '../themes'

export type ColorMode = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  mode: ColorMode
  toggleMode: () => void
  setMode: (m: ColorMode) => void
  revealStarted: boolean
  setRevealStarted: (v: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const MODE_KEY = 'aarush-mode'

function getInitialMode(): ColorMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(MODE_KEY) as ColorMode | null
  if (stored === 'dark' || stored === 'light') return stored
  return 'dark'
}

const lightVars: Record<string, string> = {
  '--bg-primary': '#f5f0eb',
  '--bg-card': 'rgba(255,255,255,0.8)',
  '--bg-card-hover': 'rgba(255,255,255,0.92)',
  '--text-primary': '#1a1a2e',
  '--text-muted': '#6b7280',
  '--text-secondary': '#4b5563',
  '--border-subtle': 'rgba(0,0,0,0.08)',
  '--border-hover': 'rgba(0,0,0,0.15)',
  '--scrollbar-track': '#e8e4df',
  '--nav-bg': 'rgba(245,240,235,0.85)',
  '--nav-border': 'rgba(0,0,0,0.05)',
  '--footer-border': 'rgba(0,0,0,0.06)',
  '--selection-bg': 'rgba(74,144,217,0.25)',
}

const darkVars: Record<string, string> = {
  '--bg-primary': '#090909',
  '--bg-card': 'rgba(255,255,255,0.04)',
  '--bg-card-hover': 'rgba(255,255,255,0.07)',
  '--text-primary': '#eae5ec',
  '--text-muted': '#8a8a8a',
  '--text-secondary': '#a0a0a0',
  '--border-subtle': 'rgba(255,255,255,0.06)',
  '--border-hover': 'rgba(255,255,255,0.12)',
  '--scrollbar-track': '#090909',
  '--nav-bg': 'rgba(9,9,9,0.85)',
  '--nav-border': 'rgba(255,255,255,0.04)',
  '--footer-border': 'rgba(255,255,255,0.05)',
  '--selection-bg': 'rgba(74,144,217,0.4)',
}

function applyModeVars(mode: ColorMode) {
  const root = document.documentElement
  const vars = mode === 'light' ? lightVars : darkVars
  for (const [key, val] of Object.entries(vars)) {
    root.style.setProperty(key, val)
  }
  root.setAttribute('data-mode', mode)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>(getInitialMode)
  const [revealStarted, setRevealStarted] = useState(false)

  const setMode = useCallback((m: ColorMode) => {
    setModeState(m)
    localStorage.setItem(MODE_KEY, m)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  useEffect(() => {
    const root = document.documentElement
    const t = themes[0]
    root.setAttribute('data-theme', t.id)
    const { primary, secondary, accent } = t.colors
    root.style.setProperty('--color-primary', primary)
    root.style.setProperty('--color-secondary', secondary)
    root.style.setProperty('--color-accent', accent)
  }, [])

  useEffect(() => {
    applyModeVars(mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ theme: themes[0], mode, toggleMode, setMode, revealStarted, setRevealStarted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
