# Product Expandable Card — Design Spec
Date: 2026-05-05

## Overview
Replace the routed `/products/[slug]` page interaction with an expand-in-place modal pattern identical to the news `ExpandableCard`. Clicking a product card in `ProductShowcase` expands it in-place with a blurred backdrop; no page navigation occurs. The `/products/[slug]` route is kept for SEO/direct-link purposes but is no longer the primary UX entry point.

## Approach
Create a new `ProductExpandableCard` component. It reuses the animation and backdrop pattern from `ExpandableCard` (Framer Motion `layoutId`, `AnimatePresence`, blur overlay) but owns a product-specific expanded layout. `ProductShowcase` replaces its `<Link>` wrapper with a click handler on this component.

---

## Component: `ProductExpandableCard`

**File:** `frontend/components/ui/product-expandable-card.tsx`

### Props
```ts
interface ProductExpandableCardProps {
  // Card (collapsed) props
  category: string;
  categoryIcon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  brandLogoSrc?: string;

  // Expanded content
  specs: {
    origin: string;
    shelfLife: string;
    storage: string;
    sizes: string[];
  };
  packagingOptions: {
    type: string;
    sizes: string[];
  }[];
  features: string[];
  relatedProducts: {
    title: string;
    category: string;
    color: string;
    imageSrc: string;
    onClick: () => void;
  }[];

  // Actions
  quoteHref: string;
}
```

### Collapsed State
Identical to the current `ProductHighlightCard`:
- Card background (`--card-bg`), border-top, box-shadow, `rounded-3xl`
- Inner grid texture frame (`inset-4`, `bg-card-foreground/5`)
- Category icon + label top-left (`#354c9a` light / gray-400 dark)
- Product title (`#354c9a` light / gray-100 dark), description, brand logo bottom-left
- Product image floating bottom-right with 3D tilt on hover

### Expanded State
Full-width overlay card centered on screen, scrollable, max-width `2xl`. Sections top-to-bottom:

1. **Brand Logo** — centered, `h-16` image, `object-contain`
2. **Product Image** — centered, `h-48 md:h-64`, with the same `useMotionValue` + `useSpring` 3D tilt effect as `ProductHighlightCard` (tracks mouse over the image area)
3. **Name + Description** — centered, `text-3xl font-bold` name in `#354c9a`, description in `text-gray-600`
4. **Quick Specs** — 2×2 grid cards using `--card-bg` style: Origin, Shelf Life, Storage, Sizes
5. **Packaging Options** — horizontal scroll row of cards, each showing packaging type + size chips
6. **Product Features** — checklist with `Check` icon in `#354c9a`, feature text in gray
7. **Related Products** — horizontal row of small color cards (bg color per product), product name + image overlay, click opens that product's expanded card
8. **Request Quote CTA** — `FlowButton` centered, links to `/quotation`

### Close Behaviour
- Click outside the expanded card → close
- Press `Escape` → close
- `X` button top-right of expanded card → close

---

## Animation
Reuse `ExpandableCard` animation strategy:
- `layoutId` shared between collapsed card and expanded panel for smooth shared-element transition
- `AnimatePresence` for mount/unmount
- Backdrop: `fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md z-10`
- Expanded panel: `fixed` centered, `z-20`, `overflow-y-auto`, `max-h-[90vh]`

---

## Changes to `ProductShowcase`
- Remove `<Link href=…>` wrapper around each `ProductHighlightCard`
- Replace with `ProductExpandableCard` which handles its own click
- Pass static product data (specs, packaging, features, related) inline for now; Strapi integration is a future task

---

## What is NOT changing
- `/products/[slug]` page and `ProductDetail` component — kept as-is for direct URL access and SEO
- `ProductHighlightCard` component — kept, used outside showcase if needed
- `product-card.tsx` brand logo prop added in prior session — kept

---

## Out of Scope
- Strapi CMS integration for specs/features (hardcoded for now, same as current page)
- URL updating on expand (no history push)
- Animations on individual section entry (keep it simple)
