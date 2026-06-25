import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onOver(this: Element) {
      if (!cursor) return
      cursor.style.width = '32px'
      cursor.style.height = '32px'
      cursor.style.borderWidth = '1.5px'
    }

    function onOut(this: Element) {
      if (!cursor) return
      cursor.style.width = '16px'
      cursor.style.height = '16px'
      cursor.style.borderWidth = '2px'
    }

    document.addEventListener('mousemove', onMove)

    const interactive = document.querySelectorAll('a, button, [data-cursor]')
    interactive.forEach(el => {
      el.addEventListener('mouseenter', onOver)
      el.addEventListener('mouseleave', onOut)
    })

    function animate() {
      if (cursor) {
        cursorX += (mouseX - cursorX) * 0.12
        cursorY += (mouseY - cursorY) * 0.12
        cursor.style.left = `${cursorX}px`
        cursor.style.top = `${cursorY}px`
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onOver)
        el.removeEventListener('mouseleave', onOut)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999999] rounded-full"
      style={{
        width: '16px',
        height: '16px',
        border: '2px solid rgb(194, 164, 255)',
        backgroundColor: 'transparent',
        mixBlendMode: 'difference',
        transition: 'width 0.2s, height 0.2s, border-width 0.2s',
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    />
  )
}
