import { useEffect, useRef } from 'react'
import { animate, stagger, splitText } from 'animejs'

interface Props {
  children: string
  className?: string
}

export default function SectionHeading({ children, className = '' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const split = splitText(el, { words: { class: 'anime-word' } })
    animate(split.words, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      delay: stagger(60, { start: 100 }),
      ease: 'outExpo',
    })
    return () => { split.revert() }
  }, [])

  return (
    <h2 ref={ref} className={`section-heading ${className}`}>
      {children}
    </h2>
  )
}
