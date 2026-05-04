# Dark Mode Fix Progress

## Completed
1. **FlowButton** (`components/ui/flow-button.tsx`) - Solid variant: `dark:bg-white dark:border-gray-200 dark:text-[#111111]`, arrows: `dark:stroke-[#111111]`. Outline variant: `dark:border-gray-600 dark:text-gray-100`, arrows: `dark:stroke-gray-100`
2. **LanguageSelectorDropdown** (`components/ui/language-selector-dropdown.tsx`) - White in dark mode: `dark:bg-white dark:border-gray-200 dark:text-[#111111]`, dropdown stays white, items stay light-themed
3. **Contact page** (`app/[locale]/contact/page.tsx`) - All inline neumorphic styles → CSS vars, all text/inputs have dark variants
4. **Quotation page** (`app/[locale]/quotation/page.tsx`) - All inline neumorphic styles → CSS vars, all text/inputs have dark variants
5. **Export page** (`app/[locale]/export/page.tsx`) - All inline neumorphic styles → CSS vars, all text have dark variants
6. **Certifications page** (`app/[locale]/certifications/page.tsx`) - SVG illustrations use `useTheme()` for theme-aware colors, all inline styles → CSS vars, modal dark-aware
7. **ProductDetail** (`app/[locale]/products/[slug]/ProductDetail.tsx`) - All bg/text/borders have dark variants
8. **BlogDetail** (`app/[locale]/blog/[slug]/BlogDetail.tsx`) - All bg/text/share buttons/prose have dark variants
9. **Home page** (`app/[locale]/page.tsx`) - Section bg → CSS vars `--section-alt-bg`/`--section-alt-border`, badge → CSS vars + `dark:bg-[#1e1e1e]`, all text has dark variants
10. **Newsletter** (`components/sections/Newsletter.tsx`) - Badge → CSS vars + `dark:bg-[#1e1e1e]`, input wrapper → `var(--neuo-badge-bg)`/`var(--neuo-badge-shadow)`, all text dark variants
11. **WhatWeOffer** (`components/sections/WhatWeOffer.tsx`) - Icon containers: `dark:bg-primary-900/30 dark:text-primary-400`, `dark:bg-blue-900/30`, `dark:bg-amber-900/30`, `dark:bg-green-900/30`
12. **Blog page** (`app/[locale]/blog/page.tsx`) - Badge → CSS vars + `dark:bg-[#1e1e1e]`, category filters → CSS vars `--cat-active-*`/`--cat-inactive-*`, all text dark variants, h4 → `dark:[&_h4]:text-gray-100`
13. **Products page** (`app/[locale]/products/page.tsx`) - Badge → CSS vars + `dark:bg-[#1e1e1e]`, text `dark:text-gray-100`
14. **PrivateLabel** (`components/sections/PrivateLabel.tsx`) - All 4 SVG illustrations use `useTheme()` for theme-aware colors (gradients, shadows, strokes, fills), `IllustrationBadge` already uses CSS vars
15. **Footer** (`components/layout/Footer.tsx`) - Social icon shadows → `var(--neuo-badge-shadow)`

## Remaining (in priority order)

None — all items completed!

## Pattern for fixing inline neumorphic styles
Replace hardcoded values with CSS variables defined in `globals.css`:
- `background: '#f5f5f5'` or `bg-[#f5f5f5]` → `background: 'var(--card-bg)'` or add `dark:bg-[#1e1e1e]`
- `borderTop: '1px solid rgba(255,255,255,0.8)'` → `borderTop: 'var(--card-border-top)'`
- `boxShadow: '...'` → `boxShadow: 'var(--card-shadow)'`
- `background: '#ebebeb'` → `background: 'var(--neuo-surface)'`
- `background: '#f0f0f0'` → `background: 'var(--neuo-badge-bg)'`
- Badge shadows → `boxShadow: 'var(--neuo-badge-shadow)'`

## CSS Variables available (from globals.css)
```css
:root {
  --card-bg: #f5f5f5;
  --card-border-top: 1px solid rgba(255,255,255,0.8);
  --card-shadow: 0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9);
  --neuo-surface: #ebebeb;
  --neuo-badge-bg: #f0f0f0;
  --neuo-badge-shadow: 3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92);
  --section-alt-bg: #f8f8f8;
  --section-alt-border: #fbfbfb;
  --cat-active-bg: #e0e0e0;
  --cat-active-shadow: inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9);
  --cat-inactive-bg: #f5f5f5;
  --cat-inactive-border-top: 1px solid rgba(255,255,255,0.8);
  --cat-inactive-shadow: 3px 3px 8px rgba(0,0,0,0.12), -3px -3px 8px rgba(255,255,255,0.9);
}
.dark {
  --card-bg: #1e1e1e;
  --card-border-top: 1px solid rgba(255,255,255,0.06);
  --card-shadow: 0 8px 16px -4px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.04), 4px 4px 8px rgba(0,0,0,0.5), -4px -4px 8px rgba(255,255,255,0.02);
  --neuo-surface: #2a2a2a;
  --neuo-badge-bg: #2a2a2a;
  --neuo-badge-shadow: 3px 3px 6px rgba(0,0,0,0.5), -2px -2px 5px rgba(255,255,255,0.04);
  --section-alt-bg: #141414;
  --section-alt-border: #1a1a1a;
  --cat-active-bg: #2a2a2a;
  --cat-active-shadow: inset 3px 3px 7px rgba(0,0,0,0.5), inset -3px -3px 7px rgba(255,255,255,0.04);
  --cat-inactive-bg: #1e1e1e;
  --cat-inactive-border-top: 1px solid rgba(255,255,255,0.06);
  --cat-inactive-shadow: 3px 3px 8px rgba(0,0,0,0.5), -3px -3px 8px rgba(255,255,255,0.02);
}
```
