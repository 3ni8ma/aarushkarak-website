import { useState, useEffect, type ComponentType } from 'react'
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
      {!ready && <SceneFallback />}
    </div>
  )
}
