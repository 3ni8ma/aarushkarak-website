import type { BlogPost } from '../blog'

export const heliosSpatial: BlogPost = {
  slug: 'spatial-computing-mediapipe-threejs',
  title: 'Spatial Computing on the Web: MediaPipe + Three.js',
  date: '2026-06-20',
  excerpt: 'Lessons learned from building HELIOS — a gesture-controlled browser OS that runs hand tracking and 3D rendering simultaneously in a single tab, without any hardware wearables.',
  tags: ['Spatial Computing', 'MediaPipe', 'Three.js', 'WebGL', 'HELIOS'],
  image: '/images/bg/about.jpg',
  content: `
## The Core Question

Can you build a spatial computing experience — hand tracking, 3D environments, voice control — entirely in a browser tab, without VR headsets or dedicated hardware?

I spent two months answering that question with [HELIOS](https://github.com/3ni8ma/HELIOS), a browser-native spatial OS that lets you control a 3D workspace with your webcam and microphone. This post covers the key integration challenges and what I learned about making MediaPipe and Three.js work together at 60fps.

## The MediaPipe + Three.js Stack

The stack combines two GPU-intensive subsystems:

| Subsystem | What It Does | GPU Load |
|-----------|-------------|----------|
| MediaPipe Hands | 21-point hand landmarks at 30fps via WASM + WebGL | High (WebGL texture inference) |
| Three.js Scene | 3D rendering, post-processing, CSS3D objects | High (WebGL draw calls) |
| CSS3D Renderer | DOM elements projected onto 3D planes | Low (CPU compositing) |

The challenge: both MediaPipe and Three.js want exclusive access to the WebGL context. Running them in the same tab creates GPU contention that drops frame rates below usable thresholds.

## The Two-Canvas Solution

The fix was separating rendering concerns across two canvas layers:

\`\`\`
┌─────────────────────────────────────┐
│  CSS3D Layer (DOM)                  │
│  iframe windows, text overlays      │
├─────────────────────────────────────┤
│  Three.js WebGL Canvas              │
│  3D scene, geometries, post-fx      │
├─────────────────────────────────────┤
│  2D Canvas Overlay (CSS composited) │
│  MediaPipe landmarks, cursor        │
└─────────────────────────────────────┘
\`\`\`

### Layer 1: Three.js WebGL

The primary renderer handles the 3D scene — floating geometries, particle systems, bloom post-processing:

\`\`\`javascript
this.renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
})
this.renderer.toneMapping = THREE.ACESFilmicToneMapping
this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
\`\`\`

Key constraint: keep Three.js in its own WebGL context and never share it with MediaPipe.

### Layer 2: 2D Canvas Overlay

MediaPipe processes the webcam feed in its own pipeline. The hand landmarks are drawn on a separate 2D canvas positioned absolutely above the Three.js canvas:

\`\`\`javascript
class GestureEngine {
  constructor() {
    this.overlay = document.createElement('canvas')
    this.overlay.style.position = 'absolute'
    this.overlay.style.inset = '0'
    this.overlay.style.pointerEvents = 'none'  // passthrough
    this.ctx = this.overlay.getContext('2d')
  }

  drawLandmarks(landmarks) {
    this.ctx.clearRect(0, 0, this.overlay.width, this.overlay.height)
    for (const lm of landmarks) {
      this.ctx.beginPath()
      this.ctx.arc(lm.x * this.overlay.width, lm.y * this.overlay.height, 4, 0, Math.PI * 2)
      this.ctx.fillStyle = '#00f2fe'
      this.ctx.fill()
    }
  }
}
\`\`\`

\`pointerEvents: none\` ensures clicks pass through to the Three.js scene below. The overlay handles all visual feedback from gesture recognition — cursor position, pinch highlight, swipe trails.

## Performance Budget

The 60fps frame budget is 16.6ms. Here's how it breaks down:

| Operation | Budget | Actual | Notes |
|-----------|--------|--------|-------|
| MediaPipe inference | 33ms | ~28ms | Runs at 30fps, separate from render loop |
| Three.js render | 16ms | ~12ms | Post-processing included |
| CSS3D composite | 0ms | ~2ms | Browser compositor, non-blocking |
| Gesture classification | 1ms | ~0.5ms | Pure JS math |
| Landmark overlay draw | 2ms | ~1ms | Canvas 2D, mostly clears |

### The 30/60 Split

MediaPipe runs at 30fps (every other frame). The Three.js scene runs at 60fps. Gesture events from the 30fps pipeline are interpolated to create smooth cursor movement:

\`\`\`javascript
// GestureEngine outputs at 30fps
// RenderEngine interpolates to 60fps
let lastPosition = { x: 0, y: 0 }
let targetPosition = { x: 0, y: 0 }

function interpolateCursor() {
  const t = 0.3  // lerp factor
  cursor.x += (targetPosition.x - cursor.x) * t
  cursor.y += (targetPosition.y - cursor.y) * t
}

// Called every render frame (60fps)
function animate() {
  interpolateCursor()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
\`\`\`

The lerp factor of 0.3 provides smooth cursor motion without noticeable lag. Higher values feel jittery; lower values feel sluggish.

## Camera Resolution Trade-Offs

MediaPipe accuracy scales with input resolution, but higher resolution means more pixels to process:

| Resolution | Pixel Count | Inference Time | Accuracy |
|-----------|-------------|---------------|----------|
| 320x240 | 76,800 | ~15ms | Poor (misses finger landmarks) |
| 640x480 | 307,200 | ~22ms | Good (reliable 21-point detection) |
| 1280x720 | 921,600 | ~40ms | Excellent (>30fps not guaranteed) |

The sweet spot is 640x480 — 85% of the accuracy of 720p at half the pixel count. On an M1 MacBook Air, this keeps MediaPipe consistently under 25ms per frame.

## Gesture Classification

With 21 landmarks per hand, the classification logic is surprisingly simple geometry:

\`\`\`javascript
function classifyGesture(landmarks) {
  const thumb = landmarks[4]
  const index = landmarks[8]
  const middle = landmarks[12]
  const ring = landmarks[16]
  const pinky = landmarks[20]
  const wrist = landmarks[0]

  const pinchDist = distance(thumb, index)
  const palmOpen = [index, middle, ring, pinky].every(lm => lm.y < wrist.y)

  if (pinchDist < 0.04) return 'pinch'       // index + thumb touching
  if (palmOpen) return 'palm'                  // all fingers above knuckles

  return 'point'
}
\`\`\`

The threshold values (0.04 for pinch, palm detection) were empirically tuned. They vary slightly between users, but the defaults work for most people. A calibration step could personalize them.

## CSS3D: The Browser's Hidden Superpower

The most unexpected discovery was Three.js's \`CSS3DRenderer\`. It projects real DOM elements — including iframes — onto 3D planes:

\`\`\`javascript
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'

const cssRenderer = new CSS3DRenderer()
cssRenderer.domElement.style.position = 'absolute'
cssRenderer.domElement.style.inset = '0'
cssRenderer.domElement.style.pointerEvents = 'none'

const div = document.createElement('div')
div.appendChild(document.createElement('iframe'))
const obj = new CSS3DObject(div)
obj.position.set(x, y, z)
cssScene.add(obj)

// CSS3D needs its own render loop
function render() {
  cssRenderer.render(cssScene, cssCamera)
  webglRenderer.render(webglScene, webglCamera)
  requestAnimationFrame(render)
}
\`\`\`

This means HELIOS can display real, interactive web pages in 3D space. Iframes inside CSS3D objects remain fully interactive — users can scroll, click, and type in floating browser windows.

### The iframe Problem

Not all websites allow iframe embedding. Sites with \`X-Frame-Options: DENY\` or \`SAMEORIGIN\` headers will not render. The solution:

1. Try loading the page in an iframe
2. If blocked (detected via \`onerror\`), show a preview card with the site title, description, and an "Open in new tab" link
3. Maintain a whitelist of embeddable sites (YouTube, GitHub, Wikipedia, etc.)

## What I'd Do Differently

1. **WebCodecs for camera input** — \`getUserMedia\` with \`<video>\` element is fine, but WebCodecs provides lower-level control over frame capture
2. **OffscreenCanvas for landmarks** — Moving the overlay canvas to a Web Worker via \`OffscreenCanvas\` would free the main thread entirely
3. **WebGPU compute shaders** — MediaPipe is adding WebGPU backend support, which would eliminate the WebGL contention entirely by using a different GPU API

## The Takeaway

The browser is already capable of spatial computing without any hardware beyond a webcam. MediaPipe + Three.js + CSS3D is a surprisingly powerful stack — the main challenges are GPU resource contention and latency budgeting, both of which are solvable with the right architecture.

The entire HELIOS project is [open source on GitHub](https://github.com/3ni8ma/HELIOS) with detailed architecture documentation.
`
}
