import { useState, useRef, useEffect } from "react";
import {
  Palette,
  Flame,
  Leaf,
  Droplets,
  Sun,
  Moon,
  SunMoon,
} from "lucide-react";
import { useTheme, type ColorMode } from "../../contexts/ThemeContext";

const themeIcons: Record<string, typeof Flame> = {
  magma: Flame,
  forest: Leaf,
  ocean: Droplets,
  sunset: Sun,
  midnight: Moon,
};

const modeIcons: Record<ColorMode, typeof SunMoon> = {
  dark: Moon,
  light: Sun,
};

export default function ThemeToggle() {
  const { theme, setTheme, themes, mode, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const ModeIcon = modeIcons[mode];

  return (
    <div ref={ref} className="relative flex items-center gap-1">
      <button
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-light transition-all duration-200 p-1.5 rounded-lg hover:bg-white/5"
        title={`${mode === "dark" ? "Light" : "Dark"} mode`}
      >
        <ModeIcon size={14} />
      </button>
      <div
        className="w-px h-4"
        style={{ background: "var(--border-subtle)" }}
      />
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Theme: ${theme.label}. Click to switch.`}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-light transition-all duration-200 p-1.5 rounded-lg hover:bg-white/5"
      >
        <Palette size={14} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 rounded-2xl p-2 min-w-[160px] shadow-xl z-[100]"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(40px)",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--glass-shadow)",
          }}
          role="listbox"
          aria-label="Select theme"
        >
          {themes.map((t) => {
            const Icon = themeIcons[t.id];
            const [r, g, b] = t.colors.primary.split(" ").map(Number);
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                role="option"
                aria-selected={t.id === theme.id}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  t.id === theme.id
                    ? "bg-white/10 text-light"
                    : "text-muted hover:text-light hover:bg-white/5"
                }`}
              >
                <Icon size={16} style={{ color: `rgb(${r},${g},${b})` }} />
                <span className="font-medium">{t.label}</span>
                {t.id === theme.id && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
