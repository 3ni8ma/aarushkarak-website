import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { NormalizedLandmark, HandLandmarker } from '@mediapipe/tasks-vision'

type Gesture = 'none' | 'pinch' | 'point' | 'fist'

const SCROLL_AMOUNT = 500
const SKIP_FRAMES = 30
const COOLDOWN = 1000
const pages = ['/', '/about', '/experience', '/skills', '/blog', '/contact']

const GESTURE_INFO = [
  { icon: '⊹', label: 'Pinch', desc: 'Scroll down' },
  { icon: '☝', label: 'Point', desc: 'Scroll up' },
  { icon: '✊', label: 'Fist', desc: 'Next tab' },
] as const

function distance(a: NormalizedLandmark, b: NormalizedLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)
}

function classifyGesture(landmarks: NormalizedLandmark[]): Gesture {
  const thumbTip = landmarks[4]
  const indexTip = landmarks[8]
  const indexPip = landmarks[6]
  const middleTip = landmarks[12]
  const middlePip = landmarks[10]
  const ringTip = landmarks[16]
  const ringPip = landmarks[14]
  const pinkyTip = landmarks[20]
  const pinkyPip = landmarks[18]

  const thumbIndexDist = distance(thumbTip, indexTip)
  const indexExt = distance(indexTip, indexPip) > 0.07
  const middleExt = distance(middleTip, middlePip) > 0.07
  const ringExt = distance(ringTip, ringPip) > 0.07
  const pinkyExt = distance(pinkyTip, pinkyPip) > 0.07
  const allCurled = !indexExt && !middleExt && !ringExt && !pinkyExt

  if (thumbIndexDist < 0.045) return 'pinch'
  if (allCurled) return 'fist'
  if (indexExt && !middleExt && !ringExt && !pinkyExt) return 'point'

  return 'none'
}

export default function GestureControls() {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const [currentGesture, setCurrentGesture] = useState<Gesture>('none')
  const [showGuide, setShowGuide] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const lastGesture = useRef<Gesture>('none')
  const lastGestureTime = useRef(0)
  const frameId = useRef(0)
  const frameCount = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  const fireGesture = useCallback((gesture: Gesture) => {
    const now = Date.now()
    if (gesture === lastGesture.current && now - lastGestureTime.current < COOLDOWN) return

    lastGesture.current = gesture
    lastGestureTime.current = now
    setCurrentGesture(gesture)
    setTimeout(() => setCurrentGesture('none'), 300)

    switch (gesture) {
      case 'pinch':
        window.scrollBy(0, SCROLL_AMOUNT)
        break
      case 'point':
        window.scrollBy(0, -SCROLL_AMOUNT)
        break
      case 'fist':
        navigate(pages[(pages.indexOf(location.pathname) + 1) % pages.length])
        break
    }
  }, [navigate, location.pathname])

  const detect = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const landmarker = landmarkerRef.current
    if (!video || !canvas || !landmarker || video.readyState < 2) return

    let result
    try {
      result = landmarker.detectForVideo(video, performance.now())
    } catch {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!result.landmarks || result.landmarks.length === 0) {
      if (showDebug && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const lm = result.landmarks[0]
    const gesture = classifyGesture(lm)
    if (gesture !== 'none') fireGesture(gesture)

    if (showDebug && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawLandmarks(ctx, lm, canvas.width, canvas.height)
    }
  }, [showDebug, fireGesture])

  const loop = useCallback(() => {
    frameCount.current++
    if (frameCount.current % SKIP_FRAMES === 0) detect()
    frameId.current = requestAnimationFrame(loop)
  }, [detect])

  useEffect(() => {
    if (!enabled) {
      setReady(false)
      return
    }

    let cancelled = false

    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 160, height: 120, facingMode: 'user' },
        })
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream

        const { HandLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision')
        if (cancelled) return

        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm/'
        )
        if (cancelled) return

        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'CPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        })
        if (cancelled) { landmarker.close(); return }

        landmarkerRef.current = landmarker
        setReady(true)
        frameId.current = requestAnimationFrame(loop)
      } catch (err) {
        console.error('Gesture setup failed:', err)
        const msg = err instanceof DOMException
          ? err.name === 'NotAllowedError'
            ? 'Webcam access denied'
            : err.name === 'NotFoundError'
              ? 'No camera found'
              : err.message
          : err instanceof Error ? err.message : 'Unknown error'
        setError(msg)
      }
    }

    setup()

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId.current)
      if (landmarkerRef.current) { landmarkerRef.current.close(); landmarkerRef.current = null }
      if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null }
      setReady(false)
    }
  }, [enabled, loop])

  const toggle = useCallback(() => {
    if (!enabled) setError(null)
    setEnabled(e => !e)
  }, [enabled])

  return (
    <>
      <div className="fixed bottom-20 right-8 z-50 flex flex-col items-end gap-2">
        {!enabled ? (
          <button
            onClick={toggle}
            onMouseEnter={() => setShowGuide(true)}
            onMouseLeave={() => setShowGuide(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all backdrop-blur-xl hover:scale-105"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
            aria-label="Enable gesture controls"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="2" x2="6" y2="4"/>
              <line x1="10" y1="2" x2="10" y2="4"/>
              <line x1="14" y1="2" x2="14" y2="4"/>
            </svg>
            Gesture
          </button>
        ) : (
          <>
            <button
              onClick={toggle}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all backdrop-blur-xl hover:scale-105"
              style={{
                background: currentGesture !== 'none' ? 'rgba(var(--color-primary),0.15)' : 'var(--glass-bg)',
                border: `1px solid ${currentGesture !== 'none' ? 'rgb(var(--color-primary))' : 'var(--glass-border)'}`,
                color: currentGesture !== 'none' ? 'rgb(var(--color-primary))' : 'var(--text-muted)',
              }}
            >
              <span className={`inline-block w-2 h-2 rounded-full ${ready ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
              {currentGesture !== 'none' ? (
                <span>{currentGesture}</span>
              ) : ready ? (
                'Active'
              ) : 'Loading...'}
            </button>
            <button
              onClick={() => setShowGuide(g => !g)}
              className="text-xs px-2 py-1 rounded-full backdrop-blur-xl transition-all hover:scale-105"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
              }}
            >
              {showGuide ? 'Hide guide' : 'Guide'}
            </button>
            <button
              onClick={() => setShowDebug(d => !d)}
              className="text-[10px] px-2 py-1 rounded-full backdrop-blur-xl transition-all"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                opacity: 0.4,
              }}
            >
              Debug
            </button>
            {error && (
              <button
                onClick={() => { setError(null); setEnabled(false); setTimeout(() => setEnabled(true), 100); }}
                className="text-[10px] px-2 py-1 rounded-full backdrop-blur-xl transition-all cursor-pointer hover:scale-105"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#EF4444',
                }}
                title="Tap to retry"
              >
                {error} — tap to retry
              </button>
            )}
          </>
        )}

        {showGuide && (
          <div
            className="p-3 rounded-xl backdrop-blur-xl shadow-lg text-xs min-w-[160px]"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Gesture Guide
            </div>
            <div className="flex flex-col gap-1.5">
              {GESTURE_INFO.map(g => (
                <div key={g.label} className="flex items-center gap-2">
                  <span className="w-5 text-center">{g.icon}</span>
                  <div>
                    <span style={{ color: 'var(--text-primary)' }}>{g.label}</span>
                    <span className="ml-1" style={{ color: 'var(--text-muted)' }}>— {g.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <video ref={videoRef} autoPlay playsInline muted className="hidden" />
      <canvas
        ref={canvasRef}
        width={160}
        height={120}
        className="fixed bottom-4 right-4 z-50 rounded-xl shadow-lg pointer-events-none"
        style={{ width: 80, height: 60, display: showDebug ? 'block' : 'none' }}
      />
    </>
  )
}

function drawLandmarks(ctx: CanvasRenderingContext2D, landmarks: NormalizedLandmark[], w: number, h: number) {
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
    [5, 9], [9, 13], [13, 17],
  ]

  for (const [i, j] of connections) {
    ctx.beginPath()
    ctx.moveTo(landmarks[i].x * w, landmarks[i].y * h)
    ctx.lineTo(landmarks[j].x * w, landmarks[j].y * h)
    ctx.strokeStyle = 'rgba(var(--color-primary),0.5)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  for (const lm of landmarks) {
    ctx.beginPath()
    ctx.arc(lm.x * w, lm.y * h, 4, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgb(var(--color-primary))'
    ctx.fill()
  }
}
