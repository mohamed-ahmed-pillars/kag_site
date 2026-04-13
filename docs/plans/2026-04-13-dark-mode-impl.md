# Dark Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a neumorphic light/dark mode pill toggle to the KAG website navbar, powered by `next-themes`.

**Architecture:** `next-themes` ThemeProvider wraps the root layout and manages a `dark` class on `<html>`. Tailwind v4's `@custom-variant` enables `dark:` utility classes. A `ThemeToggle` pill component (sun/moon icons, neumorphic shadow) is placed beside the "Contact Us" button on desktop and in the mobile drawer's bottom section.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, `next-themes`, `lucide-react` (already installed), TypeScript, Bun.

---

### Task 1: Install next-themes

**Files:**
- Modify: `frontend/package.json`

**Step 1: Install the package**

```bash
cd frontend && bun add next-themes
```

Expected output: package added, `bun.lock` updated.

**Step 2: Verify install**

```bash
bun list | grep next-themes
```

Expected: `next-themes@x.x.x` listed.

**Step 3: Commit**

```bash
cd frontend && git add package.json bun.lock
git commit -m "chore: install next-themes for dark mode"
```

---

### Task 2: Enable dark: variant in Tailwind v4

**Files:**
- Modify: `frontend/app/globals.css`

**Step 1: Add the dark variant and dark-mode CSS vars**

In `frontend/app/globals.css`, after the `@import "tailwindcss";` line, add:

```css
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --color-bg: #ffffff;
  --color-text: #09090b;
  --color-nav-bg: #f5f5f51A;
  --color-nav-mobile-bg: #f5f5f5;
  --color-nav-text: #09090b;
}

.dark {
  --color-bg: #0f0f0f;
  --color-text: #f5f5f5;
  --color-nav-bg: #1a1a1a1A;
  --color-nav-mobile-bg: #1a1a1a;
  --color-nav-text: #f5f5f5;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

> Note: Remove the existing `:root { --color-bg: #ffffff; }` and `body { background-color: var(--color-bg); }` blocks — they are being replaced.

**Step 2: Verify**

Run `cd frontend && bun run dev` and confirm no CSS errors in terminal.

**Step 3: Commit**

```bash
git add frontend/app/globals.css
git commit -m "style: add dark mode CSS vars and Tailwind v4 dark variant"
```

---

### Task 3: Create ThemeProvider wrapper component

**Files:**
- Create: `frontend/components/layout/ThemeProvider.tsx`

**Step 1: Write the component**

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
```

**Step 2: Commit**

```bash
git add frontend/components/layout/ThemeProvider.tsx
git commit -m "feat: add ThemeProvider client wrapper"
```

---

### Task 4: Wire ThemeProvider into the root layout

**Files:**
- Modify: `frontend/app/[locale]/layout.tsx`

**Step 1: Import ThemeProvider**

Add at the top of the imports:
```tsx
import { ThemeProvider } from '@/components/layout/ThemeProvider';
```

**Step 2: Add suppressHydrationWarning to `<html>` and wrap with ThemeProvider**

Change the return to:
```tsx
return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
        <body className={`${isRTL ? 'font-noto-arabic' : 'font-outfit'} antialiased`}>
            <ThemeProvider>
                <NextIntlClientProvider messages={messages}>
                    <SmoothScroll>
                        <Header />
                        <main className="relative z-10 -mt-14 md:-mt-16 rounded-b-[3.5rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)]">{children}</main>
                        <Footer />
                        <WhatsAppButton />
                        <ScrollToTop />
                        <ScrollToHash />
                    </SmoothScroll>
                </NextIntlClientProvider>
            </ThemeProvider>
        </body>
    </html>
);
```

**Step 3: Verify**

Run `bun run dev` — page should load without hydration errors in browser console.

**Step 4: Commit**

```bash
git add frontend/app/[locale]/layout.tsx
git commit -m "feat: wrap root layout with ThemeProvider"
```

---

### Task 5: Create the neumorphic ThemeToggle component

**Files:**
- Create: `frontend/components/ui/ThemeToggle.tsx`

**Step 1: Write the component**

```tsx
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import React from 'react';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === 'dark';

    const toggle = () => setTheme(isDark ? 'light' : 'dark');

    if (!mounted) {
        // Skeleton to prevent layout shift
        return (
            <div
                aria-hidden="true"
                style={{
                    width: 56,
                    height: 28,
                    borderRadius: 9999,
                    background: '#e8e8e8',
                    flexShrink: 0,
                }}
            />
        );
    }

    return (
        <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: 56,
                height: 28,
                borderRadius: 9999,
                padding: '0 4px',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                background: isDark ? '#1e1e1e' : '#e8e8e8',
                boxShadow: isDark
                    ? '4px 4px 8px #111111, -4px -4px 8px #2e2e2e'
                    : '4px 4px 8px #c8c8c8, -4px -4px 8px #ffffff',
            }}
        >
            {/* Sun icon */}
            <Sun
                size={13}
                style={{
                    position: 'absolute',
                    left: 6,
                    color: isDark ? '#555555' : '#f59e0b',
                    transition: 'color 0.3s ease',
                    zIndex: 1,
                }}
            />
            {/* Moon icon */}
            <Moon
                size={13}
                style={{
                    position: 'absolute',
                    right: 6,
                    color: isDark ? '#a78bfa' : '#aaaaaa',
                    transition: 'color 0.3s ease',
                    zIndex: 1,
                }}
            />
            {/* Sliding circle */}
            <span
                style={{
                    position: 'absolute',
                    top: 3,
                    left: isDark ? 'calc(100% - 25px)' : 3,
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: isDark ? '#2a2a2a' : '#ffffff',
                    boxShadow: isDark
                        ? 'inset 2px 2px 4px #111111, inset -2px -2px 4px #3a3a3a'
                        : 'inset 2px 2px 4px #e0e0e0, inset -2px -2px 4px #ffffff, 2px 2px 6px #d0d0d0',
                    zIndex: 2,
                }}
            />
        </button>
    );
}
```

**Step 2: Verify component renders**

Run `bun run dev` and temporarily add `<ThemeToggle />` somewhere visible to confirm it renders without errors, then remove it.

**Step 3: Commit**

```bash
git add frontend/components/ui/ThemeToggle.tsx
git commit -m "feat: add neumorphic ThemeToggle pill component"
```

---

### Task 6: Add ThemeToggle to the Header

**Files:**
- Modify: `frontend/components/layout/Header.tsx`

**Step 1: Import ThemeToggle**

Add to imports:
```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';
```

**Step 2: Add to desktop nav (beside Contact Us button)**

Find the desktop right-side div:
```tsx
<div className="hidden md:flex items-center gap-3">
    <Link href={getLocalizedHref('/contact')}>
        <FlowButton text={t('contactUs')} variant="solid" />
    </Link>
</div>
```

Replace with:
```tsx
<div className="hidden md:flex items-center gap-3">
    <ThemeToggle />
    <Link href={getLocalizedHref('/contact')}>
        <FlowButton text={t('contactUs')} variant="solid" />
    </Link>
</div>
```

**Step 3: Add to mobile drawer (next to LanguageSelectorDropdown)**

Find the mobile bottom section:
```tsx
<div className="flex items-center justify-between">
    <span className="text-sm text-gray-500">{t('language')}</span>
    <LanguageSelectorDropdown />
</div>
```

Replace with:
```tsx
<div className="flex items-center justify-between">
    <span className="text-sm text-gray-500">{t('language')}</span>
    <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSelectorDropdown />
    </div>
</div>
```

**Step 4: Update header inline styles to use CSS vars**

Replace the `<header>` style:
```tsx
style={{
    backgroundColor: '#f5f5f50D',
}}
```
with:
```tsx
style={{
    backgroundColor: 'var(--color-nav-bg)',
}}
```

Replace the backdrop `background`:
```
background: 'linear-gradient(to bottom, #f5f5f51A, transparent 50%)',
```
with no change needed — the blur overlay can stay as-is since it's decorative.

Replace the mobile menu `style`:
```tsx
style={{
    backgroundColor: '#f5f5f5',
}}
```
with:
```tsx
style={{
    backgroundColor: 'var(--color-nav-mobile-bg)',
}}
```

Replace `className="... text-[#09090b]"` on `<header>` with:
```tsx
className="sticky top-0 z-50 w-full"
style={{ color: 'var(--color-nav-text)', backgroundColor: 'var(--color-nav-bg)' }}
```

Replace `className="... text-[#09090b]"` on the mobile drawer `<div>` — remove the hardcoded color class, it will inherit from the CSS var.

**Step 5: Verify**

Run `bun run dev`, open the site, toggle between light and dark — confirm:
- Pill slides and changes shadow correctly
- Navbar background switches
- Body background switches
- No flash on hard refresh (or only a brief system-default flash which is acceptable)

**Step 6: Commit**

```bash
git add frontend/components/layout/Header.tsx
git commit -m "feat: add ThemeToggle to desktop nav and mobile drawer"
```

---

### Task 7: Export ThemeProvider from layout index (housekeeping)

**Files:**
- Modify: `frontend/components/layout/index.ts`

**Step 1: Add export**

Open `frontend/components/layout/index.ts` and add:
```ts
export { ThemeProvider } from './ThemeProvider';
```

**Step 2: Commit**

```bash
git add frontend/components/layout/index.ts
git commit -m "chore: export ThemeProvider from layout barrel"
```

---

## Done

After Task 7, the feature is complete. Verify end-to-end:
1. Light mode — neumorphic pill shows sun highlighted, site is white
2. Dark mode — neumorphic pill shows moon highlighted, site is dark (`#0f0f0f`)
3. Preference persists across page refreshes (localStorage)
4. OS dark mode preference is respected on first visit
5. Both locales (EN + AR/RTL) work correctly
6. Mobile drawer toggle works
