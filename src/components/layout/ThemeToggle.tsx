import { useState, useRef, useEffect } from 'react'
import { Palette } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Theme: ${theme.label}. Click to switch.`}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-light transition-all duration-200"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">{theme.icon}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 glass border border-white/10 rounded-2xl p-2 min-w-[160px] shadow-xl" role="listbox" aria-label="Select theme">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false) }}
              role="option"
              aria-selected={t.id === theme.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                t.id === theme.id ? 'bg-white/10 text-light' : 'text-muted hover:text-light hover:bg-white/5'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span className="font-medium">{t.label}</span>
              {t.id === theme.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
