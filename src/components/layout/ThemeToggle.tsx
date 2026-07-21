import { Sun, Moon } from 'lucide-react'
import { useTheme, type ColorMode } from '../../contexts/ThemeContext'

const modeIcons: Record<ColorMode, typeof Sun> = {
  dark: Moon,
  light: Sun,
}

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme()

  const ModeIcon = modeIcons[mode]

  return (
    <button
      onClick={toggleMode}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-full transition-all duration-200"
      style={{ color: 'var(--text-muted)' }}
      title={`${mode === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      <ModeIcon size={15} />
    </button>
  )
}
