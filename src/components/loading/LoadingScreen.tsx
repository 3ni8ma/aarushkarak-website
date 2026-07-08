import { useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const { setRevealStarted, revealStarted } = useTheme()

  useEffect(() => {
    if (revealStarted) return
    const timer = setTimeout(() => {
      setVisible(false)
      setRevealStarted(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [revealStarted, setRevealStarted])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700"
      style={{
        background: 'var(--bg-primary)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-6 h-[1px] transition-all duration-1000"
          style={{
            background: 'rgb(var(--color-primary))',
            width: visible ? 48 : 0,
          }}
        />
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted">
          Loading
        </span>
      </div>
    </div>
  )
}
