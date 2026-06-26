import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { themes, type Theme } from '../themes'

interface ThemeContextType {
  theme: Theme
  setTheme: (id: string) => void
  themes: Theme[]
  revealStarted: boolean
  setRevealStarted: (v: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const STORAGE_KEY = 'aarush-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return themes[0]
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    const found = themes.find(t => t.id === stored)
    if (found) return found
  }
  return themes[0]
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [revealStarted, setRevealStarted] = useState(false)

  const setTheme = (id: string) => {
    const t = themes.find(th => th.id === id)
    if (t) {
      setThemeState(t)
      localStorage.setItem(STORAGE_KEY, id)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme.id)
    const { primary, secondary, accent } = theme.colors
    root.style.setProperty('--color-primary', primary)
    root.style.setProperty('--color-secondary', secondary)
    root.style.setProperty('--color-accent', accent)
  }, [theme])

  return (
      <ThemeContext.Provider value={{ theme, setTheme, themes, revealStarted, setRevealStarted }}>
        {children}
      </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
