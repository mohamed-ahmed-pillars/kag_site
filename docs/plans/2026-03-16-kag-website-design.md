# KAG Corporate Website — Design Document

**Date:** 2026-03-16
**Client:** KAG — Food Manufacturing & Export Company
**Status:** Approved

---

## Project Overview

Build a bilingual (English + Arabic) corporate website for KAG, a food manufacturing and export company. The site will showcase products, certifications, export capabilities, and include a Request for Quotation (RFQ) system.

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Runtime / PM | Bun | Latest |
| Framework | Next.js | 16+ |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | GSAP + Framer Motion | Latest |
| CMS | Strapi | 5.31.0+ |
| Forms | React Hook Form + Zod | Latest |
| Email | Nodemailer | Latest |
| Maps | Leaflet + OpenStreetMap | Latest |
| i18n | next-intl | Latest |
| Database | PostgreSQL | 16+ |

---

## Architecture

```
kag-website/
├── frontend/                 # Next.js 16 + Bun (local: bun run dev)
│   ├── app/[locale]/         # All pages with locale routing
│   ├── components/           # layout/, ui/, sections/, animations/
│   ├── lib/                  # strapi.ts, i18n.ts, animations.ts
│   └── messages/             # en.json, ar.json
│
├── backend/                  # Strapi v5.31+ + Bun (local: bun run develop)
│   ├── src/api/              # Content types
│   └── config/               # database.ts, plugins.ts
│
├── scripts/
│   └── seed.ts               # Populate Strapi with placeholder data
│
├── docker-compose.yml        # PostgreSQL only (for development)
│
└── CLAUDE.md                 # Project context
```

### Development Setup

- `docker compose up -d` → PostgreSQL 16 on port 5432
- `cd backend && bun run develop` → Strapi on port 1337
- `cd frontend && bun run dev` → Next.js on port 3000

---

## Strapi Content Types

### Collections

| Content Type | Fields |
|-------------|--------|
| **Product** | name_en, name_ar, description_en, description_ar, slug, image, category (relation), featured, specs (JSON), packaging_options (JSON) |
| **Category** | name_en, name_ar, slug, icon, sort_order |
| **BlogPost** | title_en, title_ar, body_en, body_ar, slug, cover_image, published_date, category |
| **Certification** | name_en, name_ar, image, issuing_body_en, issuing_body_ar, valid_until |
| **Event** | title_en, title_ar, date, location, description_en, description_ar, cover_image |
| **RFQSubmission** | company_name, contact_name, email, phone, country, products (JSON), message, status (enum: new/reviewed/responded) |

### Single Types

| Content Type | Purpose |
|-------------|---------|
| **CompanyInfo** | About text, stats, contact info, social links, map coordinates |
| **CEOProfile** | Name, title, photo, quote (bilingual) |

---

## Pages

| Page | Route | Key Sections |
|------|-------|--------------|
| **Home** | `/[locale]` | Hero, Stats Counter, Product Showcase, Certifications Carousel, Global Map, Latest News, Newsletter |
| **About** | `/[locale]/about` | Company Story, CEO Profile, Timeline, Mission/Vision, Facility Gallery |
| **Products** | `/[locale]/products` | Category Filter, Product Grid |
| **Product Detail** | `/[locale]/products/[slug]` | Gallery, Specs Table, Packaging, Related Products, CTA |
| **Export** | `/[locale]/export` | Interactive Map, Export Process, Packaging Options, Private Label CTA |
| **Certifications** | `/[locale]/certifications` | Certification Grid with Lightbox |
| **Blog** | `/[locale]/blog` | Featured Post, Paginated Grid, Category Filter |
| **Blog Detail** | `/[locale]/blog/[slug]` | Article Content, Social Share |
| **Contact** | `/[locale]/contact` | Contact Form, Info Card, Map, WhatsApp |
| **Quotation (RFQ)** | `/[locale]/quotation` | Multi-step Form (4 steps), Progress Bar |

---

## Layout Components

### Header
- Sticky with backdrop blur on scroll
- Logo (flips position in RTL)
- Navigation: Home, About, Products, Export, Quotation, Blog, Contact, Certifications
- Language switcher (EN/AR toggle)
- Desktop: Full navbar with all menu items
- Mobile/Tablet: Hamburger menu with slide-in drawer

### Footer
- 4-column grid: Company Info, Quick Links, Contact, Social Media
- WhatsApp floating button (fixed position)
- Newsletter email input
- Copyright line

### Other
- PageTransition: Framer Motion fade + slideUp
- ScrollToTop: Appears after 300px scroll

---

## Technical Implementation

### Animations
- **GSAP**: Scroll-triggered animations (stats counter, timeline, staggered reveals)
- **Framer Motion**: Page transitions, hover effects, layout animations
- Dynamic imports (client-only) to avoid SSR issues
- Respects `prefers-reduced-motion`

### i18n (next-intl)
- Routes: `/en/...` and `/ar/...`
- Arabic pages: `dir="rtl"` and `lang="ar"`
- Tailwind logical properties (`ps-`, `pe-`, `ms-`, `me-`) for RTL spacing
- Language switcher in header

### Data Fetching
- `lib/strapi.ts`: Typed REST client with `fetch()`
- ISR with `revalidate: 60`
- `generateStaticParams` for product/blog slugs
- `generateMetadata` for SEO on every page

### Forms
- React Hook Form + Zod validation
- `/api/contact/route.ts`: Contact form → Nodemailer
- `/api/rfq/route.ts`: RFQ form → Strapi + Nodemailer

### Maps
- Leaflet + OpenStreetMap (free, no API key)
- Dynamic import to avoid SSR issues

---

## Placeholder Data Strategy

### Brand
- Primary: `#1E40AF` (blue)
- Secondary: `#059669` (green)
- Accent: `#F59E0B` (amber)
- Fonts: Inter (English), Noto Sans Arabic (Arabic)
- Logo: Text-based "KAG" placeholder

### Content
- 6 sample products across 3 categories (Oils, Sauces, Pickles)
- 5 sample certifications (ISO, HACCP, Halal, FDA, Organic)
- 3 sample blog posts
- 10 export destinations for the map
- Company stats: 50+ products, 30+ countries, 500+ clients, 25 years

### Images
- Placeholder images from `placeholder.com` or solid color blocks

---

## Build Phases

| Phase | Description |
|-------|-------------|
| 1 | Project Scaffolding & Foundation |
| 2 | Layout Components & Navigation |
| 3 | Home Page |
| 4 | About & Products Pages |
| 5 | Export, Certifications, Blog, Contact Pages |
| 6 | RFQ System |
| 7 | SEO, Performance & Deployment |
| 8 | Polish & Testing |

---

## Environment Variables

```env
# Frontend
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Strapi
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=kag_strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=random_salt
ADMIN_JWT_SECRET=random_secret
TRANSFER_TOKEN_SALT=random_salt
JWT_SECRET=random_secret

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@kagegypt.com
FROM_EMAIL=noreply@kagegypt.com
```

---

## Commands Reference

```bash
# Start PostgreSQL
docker compose up -d

# Backend (Strapi)
cd backend && bun run develop    # Dev
cd backend && bun run build      # Build
cd backend && bun run start      # Production

# Frontend (Next.js)
cd frontend && bun run dev       # Dev
cd frontend && bun run build     # Build
cd frontend && bun run start     # Production

# Seed data
bun run scripts/seed.ts
```
