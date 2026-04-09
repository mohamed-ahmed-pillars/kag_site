# Page Neumorphic Reskin — Design Document

**Date:** 2026-04-09  
**Scope:** All inner pages restyled to match the homepage section design language  
**Approach:** Option B — Full neumorphic reskin

---

## Goal

Every inner page should visually match the corresponding homepage section. The homepage uses a consistent "neumorphic" design language (white backgrounds, pill badges with inset shadows, FeatureCard-style cards) while the pages currently use color gradients and standard Tailwind patterns.

---

## Design System — Neumorphic Language

| Element | Token |
|---|---|
| Background | `white` or `bg-[#f5f5f5]` |
| Section badge | `inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]` + shadow: `0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)` |
| Cards | `FeatureCard` component (white, rounded-3xl, inset shadow) |
| Large wrappers | `rounded-3xl bg-[#f5f5f5]` + same neumorphic box-shadow (as in GlobalMap) |
| CTAs | `FlowButton` component |
| Remove | All `bg-gradient-to-br from-primary-*`, `bg-primary-100 text-primary-700` badges |

---

## Per-Page Changes

### 1. Products Page (`app/[locale]/products/page.tsx`)
**Matches:** `components/sections/ProductShowcase.tsx`
- Remove `bg-gray-50` background → white
- Add neumorphic pill badge (Package icon + "PRODUCTS") above title
- Restyle `CategoryFilter` pill buttons to neumorphic style (same shadow pattern)
- Keep `ProductGrid` and `CategoryFilter` functionality intact

### 2. Certifications Page (`app/[locale]/certifications/page.tsx`)
**Matches:** `components/sections/Certifications.tsx`
- Remove gradient hero (`from-primary-50 via-white to-secondary-50`)
- Add neumorphic pill badge (Shield icon + "CERTIFICATIONS")
- Replace 6 gradient-colored icon cards with `FeatureCard` components
- Reuse the existing cert illustrations (IsoIllustration, HaccpIllustration, HalalIllustration, FdaIllustration, OrganicIllustration) — add a new `BrcIllustration` for the 6th cert
- Keep the modal for cert detail views
- Restyle "Why Certifications Matter" section: replace `bg-primary-100` icon boxes with neumorphic FeatureCard style

### 3. Blog Page (`app/[locale]/blog/page.tsx`)
**Matches:** `components/sections/LatestNews.tsx`
- Remove gradient hero (`from-primary-50 via-white to-secondary-50`)
- Add neumorphic pill badge (Newspaper icon + "LATEST NEWS")
- Replace post grid cards with `ExpandableCard` components (exactly matching LatestNews)
- Restyle category filter pills to neumorphic style
- Remove separate featured post section (integrate into the ExpandableCard grid)
- Keep `FlowButton` CTA pattern

### 4. Export Page (`app/[locale]/export/page.tsx`)
**Matches:** `components/sections/GlobalMap.tsx`
- Remove dark green hero (`from-primary-600 to-primary-800 text-white`) → neumorphic card wrapper (rounded-3xl, bg-[#f5f5f5], neumorphic shadow)
- Use same left-text + right-visual layout as GlobalMap
- Restyle export process steps: replace `bg-primary-600` circles with neumorphic disc icons
- Restyle destinations section: replace `bg-white rounded-xl shadow-sm` cards with FeatureCard style
- Restyle packaging options: replace `bg-gray-50/bg-primary-100` with FeatureCard style
- Remove colored private label CTA section (`from-secondary-600`) → neumorphic card wrapper

### 5. Contact Page (`app/[locale]/contact/page.tsx`)
**No direct section match — apply neumorphic language throughout**
- Remove gradient hero → white background + neumorphic badge (MessageSquare icon)
- Wrap contact form in neumorphic card (`bg-[#f5f5f5]` rounded-3xl with shadow)
- Replace `bg-primary-100` contact info icon boxes with neumorphic disc style
- Restyle social link circles to neumorphic pills
- Keep all form functionality (react-hook-form, zod validation)

### 6. Quotation Page (`app/[locale]/quotation/page.tsx`)
**No direct section match — apply neumorphic language throughout**
- Remove gradient hero → white background + neumorphic badge (FileCheck icon)
- Restyle progress stepper: replace `bg-primary-600`/`bg-green-500` circles with neumorphic discs
- Wrap multi-step form in neumorphic card wrapper
- Restyle step connector lines to match neumorphic palette (`bg-[#d8d8d8]`)
- Keep all form functionality (multi-step, react-hook-form, zod)

### 7. About Sub-Components
**No direct section match — apply neumorphic language throughout**
Files: `CompanyStory`, `CEOProfile`, `MissionVision`, `Timeline`, `FacilityGallery`
- Add neumorphic pill badge to each section header
- Replace any `bg-primary-*` color accents with neumorphic disc/card style
- Replace gradient backgrounds with white or `bg-[#f5f5f5]`

---

## Files to Modify

| File | Change type |
|---|---|
| `app/[locale]/products/page.tsx` | Restyle |
| `app/[locale]/certifications/page.tsx` | Restyle + add BrcIllustration |
| `app/[locale]/blog/page.tsx` | Restyle + swap to ExpandableCard |
| `app/[locale]/export/page.tsx` | Restyle |
| `app/[locale]/contact/page.tsx` | Restyle |
| `app/[locale]/quotation/page.tsx` | Restyle |
| `components/sections/about/CompanyStory.tsx` | Restyle |
| `components/sections/about/CEOProfile.tsx` | Restyle |
| `components/sections/about/MissionVision.tsx` | Restyle |
| `components/sections/about/Timeline.tsx` | Restyle |
| `components/sections/about/FacilityGallery.tsx` | Restyle |

---

## What Does NOT Change

- All forms and their validation logic
- All i18n translations usage
- All routing and navigation
- All animation logic (framer-motion stays)
- CategoryFilter / ProductGrid component logic
- Modal behaviour on certifications page
- Multi-step quotation logic
