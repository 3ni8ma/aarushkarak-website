import type { BlogPost } from '../blog'

export const buildingHelios: BlogPost = {
  slug: 'building-helios',
  title: 'Building HELIOS: A Browser-Based AI Operating System',
  date: '2026-06-25',
  excerpt: 'How I built a browser-based AI operating system with hand-gesture navigation, spatial windows, and an LLM-powered assistant — entirely in the browser.',
  tags: ['Three.js', 'MediaPipe', 'AI', 'React'],
  image: '',
  content: `
## The Idea

HELIOS started as a simple question: *What if your computer desktop was a 3D space you could control with your hands?*

No windows. No mouse. No file manager. Just a spatial environment where applications float as 3D objects, and you interact with them through natural gestures.

### Tech Stack

- **Three.js / React Three Fiber** — 3D rendering and spatial UI
- **MediaPipe Hands** — Real-time hand tracking via webcam
- **OpenAI API** — Natural language interface
- **Web Speech API** — Voice input/output

## How Gesture Control Works

The core challenge was running hand tracking at 60fps while maintaining a responsive 3D scene. Here's the architecture:

### MediaPipe Pipeline

\`\`\`typescript
const hands = new Hands({
  locateFile: (file) => \`https://cdn.jsdelivr.net/npm/@mediapipe/hands/\${file}\`
})

hands.onResults((results) => {
  if (results.multiHandLandmarks) {
    const landmarks = results.multiHandLandmarks[0]
    const gesture = interpretGesture(landmarks)
    dispatch(gesture)
  }
})
\`\`\`

### Gesture Mapping

| Gesture | Action |
|---------|--------|
| Pinch (thumb + index) | Click / select |
| Swipe left/right | Navigate between spaces |
| Open palm | Show application launcher |
| Fist | Close / go back |
| Point | Hover / highlight |
| Two-hand pinch | Resize window |

### Performance Optimization

The main bottleneck was MediaPipe's WASM inference competing with Three.js for the GPU. The fix: render MediaPipe landmarks on a separate 2D canvas overlay and composite via CSS, leaving the WebGL context exclusively for Three.js.

## AI Integration

Every "window" in HELIOS has an AI assistant accessible via \`Ctrl+Space\`. The assistant has context about what's on your screen and can:

- Answer questions about the current application
- Execute commands ("open terminal", "search for...")
- Generate content ("write an email to...")
- Explain code in the code editor

The backend uses OpenAI's streaming API with a prompt that includes the current workspace context:

\`\`\`typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: buildSystemPrompt(workspaceState) },
    { role: 'user', content: query }
  ],
  stream: true
})
\`\`\`

## Lessons Learned

1. **Webcam permission UX matters** — Users are hesitant to grant camera access. The gesture control is opt-in with a clear explainer.
2. **Latency is the enemy** — Even 100ms of gesture lag breaks immersion. Throttle to 30fps tracking, interpolate to 60fps rendering.
3. **Accessibility isn't optional** — Every gesture feature has a keyboard/mouse equivalent.
4. **Three.js + MediaPipe is incredibly powerful** — The browser can handle real-time ML + 3D rendering on consumer hardware. We're only scratching the surface.

## What's Next

I'm working on multi-user spatial collaboration — think Figma meets VR, but in a browser tab. The architecture is solid; now it's about building the right abstractions.

The entire project is [open source on GitHub](https://github.com/3ni8ma/HELIOS).
`
}
