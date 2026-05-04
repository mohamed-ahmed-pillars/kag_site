# Terms & Privacy Pages — Design Spec

**Date:** 2026-04-18
**Status:** Approved

---

## Overview

Add two static legal pages to the KAG website: Terms & Conditions and Privacy Policy. Both pages are bilingual (EN/AR with RTL), linked from the footer, and follow the existing neumorphic design system.

---

## Pages & Routing

| Route | File |
|-------|------|
| `/en/terms` | `frontend/app/[locale]/terms/page.tsx` |
| `/ar/terms` | same file, locale-aware via next-intl |
| `/en/privacy` | `frontend/app/[locale]/privacy/page.tsx` |
| `/ar/privacy` | same file, locale-aware via next-intl |

Both are server components (no client-side interactivity needed).

---

## Layout

Each page renders:

1. **Hero header** — badge icon + page title + short subtitle (same pattern as Contact/Blog pages)
2. **Content sections** — each section is a neumorphic card with a heading and body paragraph
3. **Last updated** note at the bottom

Styling uses existing CSS variables (`--neuo-surface`, `--card-shadow`, `--card-border-top`) and Tailwind dark mode classes, consistent with the rest of the site.

---

## Content Structure

### Terms & Conditions (5 sections)

1. **Acceptance of Terms** — accessing the site constitutes agreement to these terms
2. **Use License** — permission for personal, non-commercial, transitory viewing only
3. **Disclaimer** — materials provided "as is" without warranty of any kind
4. **Limitations** — company not liable for damages arising from site use
5. **Contact Information** — KAG facility address in 10th of Ramadan City, Egypt

### Privacy Policy (8 sections)

1. **Information Collection** — name, email, phone, company info, messages from contact/quotation forms
2. **Information Usage** — respond to inquiries, process quotes, newsletters (with consent), improve services
3. **Information Sharing** — no sale/transfer to third parties without consent, except when legally required
4. **Data Security** — protective measures in place; no method is 100% secure
5. **Cookies** — may use cookies to improve experience; can be disabled in browser
6. **User Rights** — access, modify, or delete personal data; unsubscribe at any time
7. **Contact Information** — KAG facility address for data-related requests
8. **Policy Updates** — changes posted with updated timestamp; last updated April 2026

---

## i18n

Content added to:
- `frontend/messages/en.json` — under `"terms"` and `"privacy"` top-level keys
- `frontend/messages/ar.json` — Arabic translations of the same structure

Each section has a `title` and `body` key. The hero has `badge`, `title`, and `subtitle`.

---

## Footer Update

`frontend/components/layout/Footer.tsx` updated to add links:
- "Terms & Conditions" → `/terms`
- "Privacy Policy" → `/privacy`

Both link keys added to `en.json` and `ar.json` under the existing `"footer"` key.

---

## Future Migration Path

When Strapi CMS integration is added site-wide, these pages become single-type content types. The `page.tsx` files will swap `useTranslations` for a `fetchStrapiPage()` call with no layout changes needed.
