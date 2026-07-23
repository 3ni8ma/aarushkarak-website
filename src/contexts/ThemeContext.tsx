import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { themes, type Theme } from '../themes'

export type ColorMode = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (id: string) => void
  themes: Theme[]
  mode: ColorMode
  toggleMode: () => void
  setMode: (m: ColorMode) => void
  revealStarted: boolean
  setRevealStarted: (v: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const THEME_KEY = 'aarush-theme'
const MODE_KEY = 'aarush-mode'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return themes[0]
  const stored = localStorage.getItem(THEME_KEY)
  if (stored) {
    const found = themes.find(t => t.id === stored)
    if (found) return found
  }
  return themes[0]
}

function getInitialMode(): ColorMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(MODE_KEY) as ColorMode | null
  if (stored === 'dark' || stored === 'light') return stored
  return 'dark'
}

const lightVars: Record<string, string> = {
  '--bg-primary': '#FFFFFF',
  '--bg-card': '#F5F5F5',
  '--bg-card-hover': '#EBEBEB',
  '--text-primary': '#111111',
  '--text-muted': '#888888',
  '--border-subtle': '#E5E5E5',
  '--border-hover': '#CCCCCC',
  '--glass-bg': 'rgba(255,255,255,0.8)',
  '--glass-border': 'rgba(0,0,0,0.08)',
  '--glass-shadow': '0 2px 8px rgba(0,0,0,0.04)',
  '--scrollbar-track': '#F0F0F0',
  '--nav-bg': 'rgba(255,255,255,0.8)',
  '--nav-border': 'rgba(0,0,0,0.06)',
  '--selection-bg': 'rgba(194,164,255,0.3)',
  '--grain-opacity': '0.008',
}

const darkVars: Record<string, string> = {
  '--bg-primary': '#0b080c',
  '--bg-card': 'rgba(255,255,255,0.04)',
  '--bg-card-hover': 'rgba(255,255,255,0.07)',
  '--text-primary': '#EAE5EC',
  '--text-muted': '#ADACAC',
  '--border-subtle': 'rgba(255,255,255,0.06)',
  '--border-hover': 'rgba(255,255,255,0.12)',
  '--glass-bg': 'rgba(255,255,255,0.04)',
  '--glass-border': 'rgba(255,255,255,0.06)',
  '--glass-shadow': '0 2px 8px rgba(0,0,0,0.2)',
  '--scrollbar-track': 'rgba(255,255,255,0.02)',
  '--nav-bg': 'rgba(11,8,12,0.85)',
  '--nav-border': 'rgba(255,255,255,0.04)',
  '--selection-bg': 'rgba(194,164,255,0.35)',
  '--grain-opacity': '0.03',
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
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [mode, setModeState] = useState<ColorMode>(getInitialMode)
  const [revealStarted, setRevealStarted] = useState(false)

  const setTheme = useCallback((id: string) => {
    const t = themes.find(th => th.id === id)
    if (t) {
      setThemeState(t)
      localStorage.setItem(THEME_KEY, id)
    }
  }, [])

  const setMode = useCallback((m: ColorMode) => {
    setModeState(m)
    localStorage.setItem(MODE_KEY, m)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }, [mode, setMode])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme.id)
    const { primary, secondary, accent } = theme.colors
    root.style.setProperty('--color-primary', primary)
    root.style.setProperty('--color-secondary', secondary)
    root.style.setProperty('--color-accent', accent)
  }, [theme])

  useEffect(() => {
    applyModeVars(mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, mode, toggleMode, setMode, revealStarted, setRevealStarted }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
