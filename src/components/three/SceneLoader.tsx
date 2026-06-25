import { useState, useEffect, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SceneFallback from './SceneFallback'

interface SceneLoaderProps {
  load: () => Promise<{ default: ComponentType<unknown> }>
}

export default function SceneLoader({ load }: SceneLoaderProps) {
  const [Scene, setScene] = useState<ComponentType<unknown> | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    load().then(mod => {
      if (!mounted) return
      setScene(() => mod.default as ComponentType<unknown>)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (mounted) setReady(true)
        })
      })
    })
    return () => { mounted = false }
  }, [load])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? 'auto' : 'none' }}
      >
        {Scene && <Scene />}
      </div>
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SceneFallback />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
