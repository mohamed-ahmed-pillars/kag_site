# KAG Website - Claude Code Context

## Project Overview
Bilingual corporate website for KAG (Food Manufacturing & Export).

## Tech Stack
- Runtime: Bun (use `bun` not npm/yarn)
- Frontend: Next.js 16 + TypeScript + Tailwind v4
- Backend: Strapi v5.31+ (Document Service API)
- Database: PostgreSQL 16 (Docker)
- i18n: next-intl (EN + AR with RTL)
- Animations: GSAP + Framer Motion

## Commands
```bash
# Start PostgreSQL
docker compose up -d

# Backend
cd backend && bun run develop

# Frontend
cd frontend && bun run dev

# Seed data
bun run scripts/seed.ts
```

## Key Files
- `frontend/lib/strapi.ts` - Strapi API client
- `frontend/app/[locale]/layout.tsx` - Root layout with RTL
- `backend/src/api/` - Strapi content types

## Strapi v5 Notes
- Uses Document Service API (not Entity Service)
- Use `documentId` not `id` for queries
- Content type fields use snake_case
