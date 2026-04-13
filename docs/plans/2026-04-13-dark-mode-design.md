# Dark Mode Design — KAG Website

**Date:** 2026-04-13  
**Status:** Approved

## Overview

Add a light/dark mode toggle to the KAG website navbar. The toggle uses a neumorphic pill switch with sun/moon icons, persisted via `next-themes` and `localStorage`, respecting the user's OS preference on first visit.

## Architecture

- **Library:** `next-themes` — handles SSR hydration safety, `localStorage` persistence, and `prefers-color-scheme` fallback
- **Tailwind:** Enable `dark:` class variant (Tailwind v4 via CSS `@variant dark`)
- **Theme class target:** `<html>` element — `next-themes` adds/removes the `dark` class
- **Layout change:** Wrap root layout with a client `ThemeProvider` component; add `suppressHydrationWarning` to `<html>`

## ThemeToggle Component

**File:** `frontend/components/ui/ThemeToggle.tsx`

- Rounded pill (~56×28px) with a sliding circle indicator
- Sun icon (left) + Moon icon (right), both from `lucide-react`
- Active icon is highlighted; inactive is dimmed
- Smooth CSS transition on the sliding circle
- Wrapped in `mounted` guard to prevent hydration mismatch (renders a neutral skeleton until mounted)
- Uses `useTheme()` from `next-themes`

### Neumorphic Styling

**Light mode:**
- Pill background: `#e8e8e8`
- Box shadow: `6px 6px 12px #c8c8c8, -6px -6px 12px #ffffff`
- Sliding circle: white with inner highlight

**Dark mode:**
- Pill background: `#1e1e1e`
- Box shadow: `6px 6px 12px #111111, -6px -6px 12px #2e2e2e`
- Sliding circle: `#2a2a2a` with subtle highlight

## Placement

- **Desktop:** Left of the "Contact Us" `FlowButton` in the right-side nav cluster
- **Mobile:** Next to the `LanguageSelectorDropdown` in the bottom section of the mobile drawer

## Global Dark Mode Colors

| Element | Light | Dark |
|---|---|---|
| Body background (`--color-bg`) | `#ffffff` | `#0f0f0f` |
| Body text | `#09090b` | `#f5f5f5` |
| Navbar background | `#f5f5f51A` frosted | `#1a1a1a1A` frosted |
| Mobile menu background | `#f5f5f5` | `#1a1a1a` |

## Files to Change

1. `frontend/package.json` — add `next-themes`
2. `frontend/app/globals.css` — add `dark:` CSS vars and `@variant dark`
3. `frontend/app/[locale]/layout.tsx` — add `ThemeProvider`, `suppressHydrationWarning`
4. `frontend/components/ui/ThemeToggle.tsx` — new neumorphic pill toggle component
5. `frontend/components/layout/Header.tsx` — add `ThemeToggle` to desktop nav and mobile drawer
