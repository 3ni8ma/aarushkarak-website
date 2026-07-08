import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = cursorRef.current
    if (!el) return

    function onMove(e: PointerEvent) {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.3)',
        transform: 'translate(0, 0)',
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        marginLeft: -10,
        marginTop: -10,
      }}
      aria-hidden="true"
    />
  )
}
