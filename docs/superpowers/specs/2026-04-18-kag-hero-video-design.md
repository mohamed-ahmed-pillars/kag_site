# KAG Hero Video — Nanobana Pro + Seedance 2 Spec

## Overview

- **Purpose:** Silent looping background video for the website hero section
- **Duration:** 15 seconds with seamless loop
- **Style:** White clay 3D isometric render, always 45° top-down camera
- **Camera:** Single continuous slow drone drift, natural pauses at 5 keyframe spots
- **Accent color:** `#354c9a` on trucks, helmets, silos, forklifts, tractors, container stripes
- **Logo:** KAG logo on every building, every truck, every container, every shed — in every scene

---

## Style Reference (apply to ALL 5 images)

> White and light gray matte clay 3D isometric render. All buildings, roads, and structures are pure white/off-white (#F0F0F4) with soft ambient occlusion shadows. Ground platform is light gray (#EAEAF0) with smooth rounded road paths. Accent color #354c9a applied to: truck cabs, worker helmets, silos, forklifts, container stripes, tractor body, storage tank tops. KAG logo printed clearly on every building facade, every truck trailer side, every shipping container, every shed wall. Camera angle: isometric 45-degree top-down. Style: Blender clay render, matte finish, no textures, soft directional light from upper left. No text overlays other than the KAG logo.

---

## Nanobana Pro — 5 Reference Image Prompts

### Image 1 — Factory Entrance (Keyframe 1 / Loop End)

> Isometric 3D white clay render of the entrance to a large food manufacturing factory complex. Wide establishing shot. Main factory building with multiple floors, large entrance gate, and a curved road leading in. A blue (#354c9a) cab semi-truck with a white trailer is arriving on the road. KAG logo displayed prominently on the main factory building facade, on the truck trailer side, and on the entrance gate wall. Worker figures in white uniforms with #354c9a helmets stand near the entrance. Storage silos with #354c9a tops visible in the background. Soft shadows, matte white clay finish, pale gray (#EAEAF0) ground. Isometric 45° camera. No text except KAG logo.

---

### Image 2 — Loading Dock

> Isometric 3D white clay render of a factory loading dock. A semi-truck with a #354c9a cab and white trailer is backed up to the loading bay. Three worker figures in white uniforms with #354c9a helmets carry white boxes from the dock onto the truck trailer. KAG logo on the truck trailer side, on the loading dock wall, and on the factory building behind. Dock has steps, railings, and roller doors. Stacked white product boxes with KAG logo visible on the dock floor. Forklift in #354c9a parked nearby. Soft ambient shadows, matte clay finish. Isometric 45° top-down camera.

---

### Image 3 — Production Floor (Exterior View)

> Isometric 3D white clay render of the exterior of a food production building with large industrial windows. Through the windows, white clay machinery and conveyor belts are visible inside, with small worker figures operating them. Two tall industrial silos with #354c9a top sections stand beside the building. Pipes connect the silos to the building. KAG logo on the building facade, on each silo, and on a white delivery van parked outside with a #354c9a stripe. Workers in #354c9a helmets visible both inside through windows and outside near the van. Matte white clay, soft shadows, isometric 45° camera.

---

### Image 4 — Shipping Yard

> Isometric 3D white clay render of an export shipping yard. Multiple stacked white shipping containers with a #354c9a horizontal stripe and KAG logo printed on each container face. A yellow-white forklift in #354c9a is mid-motion carrying a container. A second semi-truck with a #354c9a cab and white trailer with KAG logo is departing through the yard gate. A small control/office building with KAG logo on the wall stands at the corner. White road with rounded edges leads out of the yard. Workers in #354c9a helmets operate in the yard. Matte clay render, soft shadows, isometric 45° top-down.

---

### Image 5 — Fields / Agriculture

> Isometric 3D white clay render of agricultural fields adjacent to the factory complex. Rows of clay crop fields in pale green-white tones. Workers in white uniforms with #354c9a helmets are harvesting crops. A small tractor in #354c9a drives along a field row. A white clay storage shed with KAG logo on its wall sits at the edge of the fields. A small white delivery truck with #354c9a cab and KAG logo on the side is parked near the shed. In the far background, the tops of the factory silos with #354c9a are faintly visible, connecting the scene to the factory. Matte clay style, soft ambient light, isometric 45° camera.

---

## Seedance 2 — Video Prompt

**Settings:** 15 seconds, 1920×1080, no audio

**Reference frames:** Upload Images 1→2→3→4→5 as keyframes in order

### Main Prompt

> A 15-second seamlessly looping cinematic drone flythrough of a white clay 3D isometric miniature world representing a food manufacturing and export company. The camera moves in one continuous slow drift at a consistent isometric 45-degree angle throughout, never changing perspective. The camera naturally pauses and breathes at each of 5 locations before drifting to the next.
>
> **Shot sequence:**
>
> **0–1s** — Camera starts wide on the factory entrance. A #354c9a cab truck slowly rolls in along the curved road. KAG logo visible on the factory facade and truck trailer.
>
> **1–4s** — Camera drifts slowly to the loading dock. Workers in #354c9a helmets move boxes onto the truck. Forklift nudges forward. Gentle activity. Camera breathes and holds.
>
> **4–7s** — Camera drifts to the production building exterior. Silos with #354c9a tops. Through the windows, conveyor belts move slowly. A van with KAG logo idles outside. Camera holds.
>
> **7–10s** — Camera drifts to the shipping yard. Stacked containers with KAG logo and #354c9a stripe. Forklift moves a container. A truck departs slowly through the gate. Camera holds.
>
> **10–13s** — Camera drifts to the agricultural fields. Tractor in #354c9a moves along crop rows. Workers harvest. Storage shed with KAG logo. Camera holds and breathes.
>
> **13–15s** — Camera slowly drifts back, reframing to the exact factory entrance wide shot from 0s, completing the seamless loop.
>
> Style: Blender clay render aesthetic, matte white, soft ambient occlusion, isometric top-down 45°, smooth eased camera movement, no cuts, no text overlays.

### Style Tags
`clay render, isometric 3D, white clay miniature, matte, soft shadows, food factory, export logistics, seamless loop, slow drone, depth of field, #354c9a accent, KAG logo`

---

## Workflow

1. Generate all 5 images in Nanobana Pro using prompts above
2. Upload images 1–5 as ordered reference keyframes in Seedance 2
3. Paste the Seedance 2 video prompt
4. Set duration to 15s, resolution 1920×1080
5. Use the generated video as the `<video>` source in `Hero2.tsx` (backup of the current hero)
