import type { BlogPost } from '../blog'

export const spatialComputing: BlogPost = {
  slug: 'spatial-computing-future',
  title: 'The Future of Spatial Computing in the Browser',
  date: '2026-06-20',
  excerpt: 'Spatial computing is moving beyond VR headsets. The browser is becoming the most accessible platform for 3D interfaces — and we are just getting started.',
  tags: ['Spatial Computing', 'WebGL', 'Three.js', 'WebXR'],
  image: '',
  content: `
## Beyond the Headset

When most people hear "spatial computing," they think of Apple Vision Pro, Meta Quest, or HoloLens. But I'd argue the most interesting spatial computing platform is already on your computer — the web browser.

### Why the Browser?

1. **Zero install** — Open a URL and you're in a 3D space
2. **Cross-platform** — Same code runs on desktop, mobile, tablet, VR
3. **Progressive enhancement** — Full 3D on capable hardware, graceful fallback on older devices
4. **Web standards** — WebGL, WebGPU, WebXR, WebCodecs, MediaPipe — all converging

## The Stack for Browser Spatial Computing

### Rendering: WebGPU is the Future

WebGL 2.0 is mature and widely supported, but WebGPU is the real game-changer. It provides:

- Lower driver overhead
- Compute shaders (for ML inference on GPU)
- Explicit resource management
- Significantly better performance on Apple Silicon

\`\`\`typescript
const adapter = await navigator.gpu.requestAdapter()
const device = await adapter.requestDevice()
// ... full GPU compute pipeline without a library
\`\`\`

Three.js already supports WebGPU as a renderer backend, so frameworks built on it get the upgrade automatically.

### Input: Camera-Based Hand Tracking

The biggest UX breakthrough for browser spatial computing is camera-based hand tracking via MediaPipe. No controllers, no headset — just your webcam:

- **Hand landmarks** — 21 3D points per hand at 30fps
- **Face mesh** — 468 3D facial landmarks for expression tracking
- **Pose detection** — 33 body landmarks for full-body interaction

Combined with the **Screen Capture API** and **WebCodecs**, you can build gesture-controlled UIs that overlay on any website or application.

### AI: On-Device Inference

The real magic happens when you combine spatial input with on-device AI:

- **WebLLM** — Run Llama 3 and other LLMs directly in the browser via WebGPU
- **Transformers.js** — ONNX-based ML models in JavaScript
- **TensorFlow.js** — Browser-based training and inference

This means entirely offline, privacy-preserving spatial AI applications.

## What I'm Building

My project **HELIOS** is a browser-based spatial operating system that combines all three layers. Users can:

1. Navigate a 3D workspace using hand gestures
2. Run AI tasks locally or via API
3. Interact with floating application windows

The architecture is modular — each component can be used independently:

\`\`\`typescript
// Standalone gesture recognition
import { useHandTracking } from '@helios/gestures'

function App() {
  const { gesture, landmarks } = useHandTracking()

  if (gesture === 'swipe_left') navigate('/prev')
  if (gesture === 'pinch') select()
}
\`\`\`

## The Road Ahead

The browser's capabilities are expanding rapidly. By 2028, I expect:

- **WebGPU** to be universally supported
- **On-device LLMs** to be standard in browsers
- **WebXR** to reach critical mass
- **Gesture control** to be a built-in OS feature

The line between "web app" and "native app" will continue to blur. The browser won the application platform war years ago — now it's winning the spatial computing war too.
`
}
