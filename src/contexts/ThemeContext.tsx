import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { themes, type Theme } from "../themes";

export type ColorMode = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (id: string) => void;
  themes: Theme[];
  mode: ColorMode;
  toggleMode: () => void;
  setMode: (m: ColorMode) => void;
  revealStarted: boolean;
  setRevealStarted: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_KEY = "aarush-theme";
const MODE_KEY = "aarush-mode";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return themes[0];
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    const found = themes.find((t) => t.id === stored);
    if (found) return found;
  }
  return themes[0];
}

function getInitialMode(): ColorMode {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(MODE_KEY) as ColorMode | null;
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
}

const lightVars: Record<string, string> = {
  "--bg-primary": "#f5f0eb",
  "--bg-card": "rgba(255,255,255,0.72)",
  "--bg-card-hover": "rgba(255,255,255,0.88)",
  "--text-primary": "#1a1a2e",
  "--text-muted": "#6b7280",
  "--border-subtle": "rgba(0,0,0,0.08)",
  "--border-hover": "rgba(0,0,0,0.15)",
  "--glass-bg": "rgba(255,255,255,0.72)",
  "--glass-border": "rgba(0,0,0,0.08)",
  "--glass-shadow": "0 4px 30px rgba(0,0,0,0.06)",
  "--scrollbar-track": "#e8e4df",
  "--nav-bg": "rgba(245,240,235,0.85)",
  "--nav-border": "rgba(0,0,0,0.05)",
  "--overlay-from": "rgba(245,240,235,0.65)",
  "--overlay-to": "rgba(245,240,235,0.92)",
  "--footer-border": "rgba(0,0,0,0.06)",
  "--selection-bg": "rgba(194,164,255,0.25)",
};

const darkVars: Record<string, string> = {
  "--bg-primary": "#0b080c",
  "--bg-card": "rgba(255,255,255,0.08)",
  "--bg-card-hover": "rgba(255,255,255,0.11)",
  "--text-primary": "#eae5ec",
  "--text-muted": "#adacac",
  "--border-subtle": "rgba(255,255,255,0.06)",
  "--border-hover": "rgba(255,255,255,0.12)",
  "--glass-bg": "rgba(255,255,255,0.08)",
  "--glass-border": "rgba(255,255,255,0.12)",
  "--glass-shadow": "0 4px 30px rgba(0,0,0,0.1)",
  "--scrollbar-track": "#0b080c",
  "--nav-bg": "rgba(11,8,12,0.8)",
  "--nav-border": "rgba(255,255,255,0.03)",
  "--overlay-from": "rgba(11,8,12,0.70)",
  "--overlay-to": "rgba(11,8,12,0.90)",
  "--footer-border": "rgba(255,255,255,0.05)",
  "--selection-bg": "rgba(194,164,255,0.5)",
};

function applyModeVars(mode: ColorMode) {
  const root = document.documentElement;
  const vars = mode === "light" ? lightVars : darkVars;
  for (const [key, val] of Object.entries(vars)) {
    root.style.setProperty(key, val);
  }
  root.setAttribute("data-mode", mode);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mode, setModeState] = useState<ColorMode>(getInitialMode);
  const [revealStarted, setRevealStarted] = useState(false);

  const setTheme = useCallback((id: string) => {
    const t = themes.find((th) => th.id === id);
    if (t) {
      setThemeState(t);
      localStorage.setItem(THEME_KEY, id);
    }
  }, []);

  const setMode = useCallback((m: ColorMode) => {
    setModeState(m);
    localStorage.setItem(MODE_KEY, m);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme.id);
    const { primary, secondary, accent } = theme.colors;
    root.style.setProperty("--color-primary", primary);
    root.style.setProperty("--color-secondary", secondary);
    root.style.setProperty("--color-accent", accent);
  }, [theme]);

  useEffect(() => {
    applyModeVars(mode);
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes,
        mode,
        toggleMode,
        setMode,
        revealStarted,
        setRevealStarted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
