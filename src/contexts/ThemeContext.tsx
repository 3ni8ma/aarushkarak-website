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
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(MODE_KEY) as ColorMode | null
  if (stored === 'dark' || stored === 'light') return stored
  return 'light'
}

const lightVars: Record<string, string> = {
  '--bg-primary': '#FFFFFF',
  '--bg-card': '#F5F5F4',
  '--bg-card-hover': '#EEEEEC',
  '--text-primary': '#000000',
  '--text-muted': '#888888',
  '--border-subtle': '#E5E5E3',
  '--border-hover': '#D0D0CD',
  '--glass-bg': 'rgba(255,255,255,0.85)',
  '--glass-border': 'rgba(0,0,0,0.06)',
  '--glass-shadow': '0 1px 3px rgba(0,0,0,0.04)',
  '--scrollbar-track': '#F0F0EE',
  '--nav-bg': 'rgba(255,255,255,0.85)',
  '--nav-border': 'rgba(0,0,0,0.04)',
  '--selection-bg': 'rgba(213,247,76,0.35)',
  '--grain-opacity': '0.02',
}

const darkVars: Record<string, string> = {
  '--bg-primary': '#0A0A0A',
  '--bg-card': '#141414',
  '--bg-card-hover': '#1C1C1C',
  '--text-primary': '#FFFFFF',
  '--text-muted': '#777777',
  '--border-subtle': '#1F1F1F',
  '--border-hover': '#333333',
  '--glass-bg': 'rgba(10,10,10,0.85)',
  '--glass-border': 'rgba(255,255,255,0.06)',
  '--glass-shadow': '0 1px 3px rgba(0,0,0,0.2)',
  '--scrollbar-track': '#141414',
  '--nav-bg': 'rgba(10,10,10,0.85)',
  '--nav-border': 'rgba(255,255,255,0.04)',
  '--selection-bg': 'rgba(213,247,76,0.35)',
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
