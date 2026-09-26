---
name: web3-cinematic-portfolio
description: Build cinematic 3D portfolios with Three.js/React Fiber for performance.
triggers:
  - "portfolio website"
  - "3d portfolio"
  - "cinematic website"
  - "interactive 3d site"
  - "digital environment portfolio"
  - "WebGL portfolio"
  - "threejs portfolio"
  - "next.js 3d site"
category: software-development
---

# Web3 Cinematic Portfolio Design

## When to Use This Skill

Activate when building a portfolio with cinematic, interactive 3D experience. The website should feel like "an engineering laboratory" with high contrast, technical aesthetics.

## Core Design Principles

### Color System
| Element | Color | Purpose |
|---------|-------|---------|
| Background | `#0a0a0a` - `#0f0f0f` | Near-black dark base |
| Primary Text | `#ffffff` | Strong contrast |
| Secondary Text | `#e0e0e0`, `#a3a3a3` | Off-white typography |
| Accent | `#ff1744` | Restrained red (RANN identity) |

**DO NOT USE:** Purple neon, blue glow, excessive glassmorphism, random spheres

### Architecture

**Required Stack:**
- Next.js 14 (App Router)
- TypeScript
- @react-three/fiber
- @react-three/drei
- three.js
- gsap + ScrollTrigger
- lenis (smooth scroll)
- framer-motion (UI transitions)

### Performance Optimization

| Device | Strategy |
|--------|----------|
| Desktop | Full 3D scene |
| Tablet | Reduced complexity |
| Mobile | 100 particles (vs 500), DPR limit 2 |

**GPU Rules:**
- Maximum 500 particles
- Use BufferGeometry
- Dispose geometries/materials properly
- Pre-baked textures over real-time lighting

## Common Patterns

### 3D Component Structure
```tsx
const Scene = () => (
  <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <GeometricCore />  {/* Brand-specific object */}
    <TechnicalElements />  {/* Floating elements */}
    <ParticleSystem count={mobile ? 100 : 500} />
  </>
)
```

### Mobile Detection
```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
useEffect(() => {
  gsap.set(canvas, { 
    perspective: isMobile ? 800 : 1200 
  })
}, [isMobile])
```

### Loading Sequence
1. Technical loading screen with noise/particles
2. Initialize 3D in background
3. Fade in content when ready
4. Never show empty canvas

## Template File Locations

Create in `/components/3d/`:
- `Hero3D.tsx` - Main cinematic scene
- `TechnicalObjects.tsx` - Branded geometric forms
- `ParticleSystem.tsx` - Atmospheric effects
- `CameraController.tsx` - Scroll-based camera

## Checklist Before Completion

- [ ] npm build succeeds
- [ ] No TypeScript errors
- [ ] 3D works on mobile with reduced effects
- [ ] WebGL fallback exists
- [ ] Reduced motion support (prefers-reduced-motion)
- [ ] Semantic HTML with proper headings
- [ ] Keyboard navigation works
- [ ] All links verified (no fake data)
- [ ] Accessibility contrast ratios checked