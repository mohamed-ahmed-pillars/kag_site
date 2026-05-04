# Homepage Performance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce CPU/GPU load on the homepage by lazy-loading below-fold sections, pausing animations when off-screen, and stopping the globe RAF loop when not visible.

**Architecture:** Four independent fixes applied to existing components. No new dependencies. Uses Next.js `dynamic()` for code-splitting, IntersectionObserver for the globe, and Framer Motion's `useInView` to gate continuous animations.

**Tech Stack:** Next.js 16 App Router, Framer Motion, COBE globe, TypeScript

---

### Task 1: Lazy-load below-fold sections

**Files:**
- Modify: `app/[locale]/page.tsx`

**What:** Replace static imports of `GlobalMap`, `PrivateLabel`, `LatestNews`, `Newsletter` with `next/dynamic`. These sections are always below the fold — there's no reason to parse their JS on initial load.

**Step 1: Replace imports**

```tsx
// Remove from the sections barrel import:
//   GlobalMap, PrivateLabel, LatestNews, Newsletter
// Keep in barrel import:
//   Hero, ProductShowcase, Certifications

import dynamic from 'next/dynamic';
import { Hero, ProductShowcase, Certifications } from '@/components/sections';

const PrivateLabel = dynamic(() => import('@/components/sections/PrivateLabel'));
const GlobalMap    = dynamic(() => import('@/components/sections/GlobalMap'),   { ssr: false });
const LatestNews   = dynamic(() => import('@/components/sections/LatestNews'));
const Newsletter   = dynamic(() => import('@/components/sections/Newsletter'));
```

`ssr: false` on GlobalMap because COBE uses `window`/canvas at module level.

**Step 2: Verify dev server starts without errors**

Run: `bun run dev`
Expected: No import errors, page renders normally.

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "perf: lazy-load below-fold homepage sections"
```

---

### Task 2: Pause Globe RAF when not visible

**Files:**
- Modify: `components/sections/GlobalMap.tsx`

**What:** The COBE globe runs `requestAnimationFrame` 60fps even when the user is reading the Hero or Products section. Add an IntersectionObserver to the canvas wrapper: cancel RAF when off-screen, restart when visible.

**Step 1: Add visibility ref and IntersectionObserver inside the Globe `useEffect`**

Find the `Globe` component's `useEffect` (around line 71). Add an `isVisibleRef` and wire an `IntersectionObserver` to the canvas:

```tsx
const isVisibleRef = useRef(false);

// Inside useEffect, BEFORE the existing animate loop:
const observer = new IntersectionObserver(
  ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
  { threshold: 0.1 }
);
if (canvasRef.current) observer.observe(canvasRef.current);
```

**Step 2: Gate the animation loop**

Change the existing `animate` function body to skip update when off-screen:

```tsx
const animate = () => {
  rafId = requestAnimationFrame(animate);          // keep scheduling
  if (!isVisibleRef.current) return;               // skip GPU work
  if (!pointerInteracting.current) phiRef.current += 0.003;
  globe.update({ phi: phiRef.current + rRef.current, width: width * 2, height: width * 2 });
};
```

**Step 3: Clean up observer in return**

```tsx
return () => {
  cancelAnimationFrame(rafId);
  globe.destroy();
  observer.disconnect();
  window.removeEventListener('resize', onResize);
};
```

**Step 4: Fix devicePixelRatio — always capped at 2**

Change the static config at the top of the file:

```tsx
// Before:
devicePixelRatio: 2,

// After:
devicePixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
```

**Step 5: Verify globe still spins and stops when scrolled away**

Run dev server, scroll globe into view → spins. Scroll away → GPU usage drops (check Activity Monitor / Chrome Task Manager).

**Step 6: Commit**

```bash
git add components/sections/GlobalMap.tsx
git commit -m "perf: pause globe RAF when off-screen, cap devicePixelRatio"
```

---

### Task 3: Gate Certifications continuous animations to viewport

**Files:**
- Modify: `components/sections/Certifications.tsx`

**What:** Five illustration components run `repeat: Infinity` animations (rotating ring, pulse circle, scan line, floating particles) from the moment they mount — even while the user is looking at the Hero. Fix: each illustration reads a `isInView` boolean and only animates when `true`.

**Step 1: Add `useInView` import**

At the top of `Certifications.tsx`, add:
```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
```
(`useRef` is likely already imported via React — add `useInView` to the framer-motion import.)

**Step 2: Add `isInView` prop to each illustration**

Change all five illustration component signatures:

```tsx
// Before:
function IsoIllustration() {

// After:
function IsoIllustration({ isInView }: { isInView: boolean }) {
```

Apply the same change to: `HaccpIllustration`, `HalalIllustration`, `FdaIllustration`, `OrganicIllustration`.

**Step 3: Gate each `repeat: Infinity` animate prop**

For every motion element that has `repeat: Infinity`, wrap the `animate` value:

```tsx
// Rotating ring (IsoIllustration):
animate={isInView ? { rotate: 360 } : {}}

// Pulse ring (HalalIllustration):
animate={isInView ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}

// Scan line (FdaIllustration):
animate={isInView ? { y: [-13, 13, -13] } : {}}

// Floating particles (OrganicIllustration) — each particle circle:
animate={isInView ? { opacity: [0, 0.7, 0], y: [4, -6, -14] } : {}}
```

Leave all `initial` / one-shot `animate` (pathLength, scale spring) unchanged — those are fine.

**Step 4: Add `useInView` to the `illustrations` array builder**

The five illustration JSX elements are built into the `illustrations` array. Replace it with a component that tracks its own visibility:

```tsx
function IllustrationWithView({ children }: { children: (isInView: boolean) => React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  return <div ref={ref} className="w-full h-full">{children(isInView)}</div>;
}
```

Then update the `illustrations` array:

```tsx
const illustrations = [
  <IllustrationWithView key="iso">{(v) => <IsoIllustration isInView={v} />}</IllustrationWithView>,
  <IllustrationWithView key="haccp">{(v) => <HaccpIllustration isInView={v} />}</IllustrationWithView>,
  <IllustrationWithView key="halal">{(v) => <HalalIllustration isInView={v} />}</IllustrationWithView>,
  <IllustrationWithView key="fda">{(v) => <FdaIllustration isInView={v} />}</IllustrationWithView>,
  <IllustrationWithView key="organic">{(v) => <OrganicIllustration isInView={v} />}</IllustrationWithView>,
];
```

**Step 5: Verify animations start when cards scroll into view, stop when scrolled away**

**Step 6: Commit**

```bash
git add components/sections/Certifications.tsx
git commit -m "perf: pause certification illustrations when off-screen"
```

---

### Task 4: Gate PrivateLabel continuous animations to viewport

**Files:**
- Modify: `components/sections/PrivateLabel.tsx`

**What:** Same pattern as Task 3. The conveyor belt, moving boxes, smoke puffs, and pulse rings all run `repeat: Infinity` from mount.

**Step 1: Add `useInView` import**

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
```

**Step 2: Add `isInView` prop to all four illustration components**

```tsx
function BrandIllustration({ isInView }: { isInView: boolean }) {
function ManufacturingIllustration({ isInView }: { isInView: boolean }) {
function MoqIllustration({ isInView }: { isInView: boolean }) {
function QualityIllustration({ isInView }: { isInView: boolean }) {
```

**Step 3: Gate each `repeat: Infinity` animate**

```tsx
// BrandIllustration — peeling corner:
animate={isInView ? { rotateY: [0, 40, 0] } : {}}

// ManufacturingIllustration — belt lines:
animate={isInView ? { x: [i * 32 - 48, i * 32 + 32 - 48] } : {}}

// ManufacturingIllustration — moving boxes:
animate={isInView ? { x: [-60 + i * 44, 80 + i * 44] } : {}}

// ManufacturingIllustration — smoke puffs:
animate={isInView ? { opacity: [0, 0.6, 0], y: [0, -10, -20], scale: [0.5, 1, 1.4] } : {}}

// MoqIllustration — double arrow:
animate={isInView ? { scaleX: [1, 1.15, 1] } : {}}

// QualityIllustration — pulse rings:
animate={isInView ? { scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] } : {}}
```

**Step 4: Wire `useInView` inside each feature card**

In the features `.map()` where cards are rendered, add a ref to each card wrapper:

```tsx
function FeatureCardWrapper({ f, locale, isRTL, index }: { ... }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const content = locale === 'ar' ? f.ar : f.en;
  return (
    <BlurFade key={index} delay={0.05 + index * 0.08} inView>
      <div ref={ref} className="relative h-full ...">
        ...
        <div className="h-48 ...">
          {React.cloneElement(f.illustration(isInView))}
        </div>
        ...
      </div>
    </BlurFade>
  );
}
```

Change `features` array to store illustration as a function `(isInView: boolean) => ReactNode`:

```tsx
const features = [
  {
    illustration: (v: boolean) => <BrandIllustration isInView={v} />,
    ...
  },
  ...
];
```

**Step 5: Verify animations stop when cards scroll off-screen**

**Step 6: Commit**

```bash
git add components/sections/PrivateLabel.tsx
git commit -m "perf: pause private label illustrations when off-screen"
```

---

### Task 5: Remove CSS filter from Hero video

**Files:**
- Modify: `components/sections/Hero.tsx`

**What:** `filter: invert(1) grayscale(1) brightness(1)` on a playing video forces the GPU to re-process every decoded frame — the most expensive single operation on the page. The fix is to remove the runtime filter and either accept the original video colors or apply a static CSS overlay instead.

**Step 1: Remove `filter` from the video style**

```tsx
// Remove this line from the video style object:
filter: 'invert(1) grayscale(1) brightness(1)',
```

**Step 2: Add a CSS blend-mode overlay instead (achieves greyscale without per-frame GPU filter)**

Wrap the video in a relative container and add a `mix-blend-mode` overlay div:

```tsx
<div className="absolute inset-0" style={{ mixBlendMode: 'color', backgroundColor: 'white', zIndex: 1 }} />
```

`mix-blend-mode: color` with a white overlay desaturates without re-processing every frame — it's a one-time compositing layer, not a per-frame filter.

**Step 3: Verify the hero still looks grey/white toned**

**Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "perf: replace video CSS filter with blend-mode overlay"
```
