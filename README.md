# KAG Corporate Website

Corporate website for KAG Food Manufacturing & Export Company.

## Requirements
- Bun (latest)
- Docker & Docker Compose
- Node.js 20+ (for some tooling)

## Quick Start

1. Start PostgreSQL:
   ```bash
   docker compose up -d
   ```

2. Start Strapi (backend):
   ```bash
   cd backend
   bun install
   bun run develop
   ```

3. Start Next.js (frontend):
   ```bash
   cd frontend
   bun install
   bun run dev
   ```

4. Open http://localhost:3000

## Project Structure
- `frontend/` - Next.js 16 application
- `backend/` - Strapi v5.31 CMS
- `scripts/` - Seed and utility scripts
- `docs/` - Documentation and plans
