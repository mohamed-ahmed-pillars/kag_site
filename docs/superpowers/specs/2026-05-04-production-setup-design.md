# Production Setup Design — KAG Website

**Date:** 2026-05-04  
**Domain:** kagegypt.com  
**Repo:** https://github.com/mohamed-ahmed-pillars/kag_site.git

---

## Scope

Containerize the KAG website stack and push to GitHub ready for VPS deployment. Strapi/frontend data integration is explicitly out of scope — that comes later.

---

## Architecture

```
Internet
   │
   ▼
Traefik (ports 80/443)
   ├── kagegypt.com ──────────► Next.js frontend (internal:3000)
   └── api.kagegypt.com ──────► Strapi backend (internal:1337)
                                       │
                                       ▼
                               PostgreSQL (internal:5432)
```

All services share one internal Docker network. Only Traefik exposes public ports.

---

## Configuration: Single Root `.env`

One `.env` file at the repo root holds all secrets and config. `docker-compose.yml` reads from it via `${VAR}`. This file is never committed — only `.env.example` is committed.

**Variables:**

```env
# Domain & SSL
DOMAIN=kagegypt.com
ACME_EMAIL=your@email.com

# Database
POSTGRES_USER=strapi
POSTGRES_PASSWORD=<strong-password>
POSTGRES_DB=kag_strapi

# Strapi Secrets
APP_KEYS=<key1>,<key2>,<key3>,<key4>
API_TOKEN_SALT=<salt>
ADMIN_JWT_SECRET=<secret>
JWT_SECRET=<secret>
TRANSFER_TOKEN_SALT=<salt>
ENCRYPTION_KEY=<key>

# URLs
NEXT_PUBLIC_STRAPI_URL=https://api.kagegypt.com
NEXT_PUBLIC_SITE_URL=https://kagegypt.com
```

---

## Services

### Traefik
- Image: `traefik:latest`
- Ports: `80:80`, `443:443`
- Auto HTTP→HTTPS redirect
- Let's Encrypt via HTTP challenge
- Dashboard disabled in production
- Stores certificates in `traefik_certs` volume

### Frontend (Next.js)
- Built from `frontend/Dockerfile` (multi-stage)
- Stage 1: install deps + build with `bun run build` (standalone output)
- Stage 2: minimal node-alpine image, runs the standalone server
- Label: `traefik` routes `kagegypt.com` → port 3000
- Env at build: `NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_SITE_URL`

### Backend (Strapi)
- Built from `backend/Dockerfile`
- Stage 1: install deps + build with `bun run build`
- Stage 2: production image, runs `bun run start`
- Label: `traefik` routes `api.kagegypt.com` → port 1337
- All Strapi secrets injected via environment variables from root `.env`
- `strapi_uploads` volume for media persistence

### Database (PostgreSQL)
- Image: `postgres:16-alpine`
- Internal only — no exposed ports
- `postgres_data` volume for data persistence
- Credentials from root `.env`

---

## Volumes

| Name | Purpose |
|------|---------|
| `postgres_data` | PostgreSQL data |
| `strapi_uploads` | Strapi media uploads |
| `traefik_certs` | Let's Encrypt certificates |

---

## Files to Create/Modify

| File | Action | Notes |
|------|--------|-------|
| `docker-compose.yml` | Rewrite | Full production stack |
| `frontend/Dockerfile` | Create | Multi-stage Next.js standalone |
| `backend/Dockerfile` | Create | Multi-stage Strapi production |
| `.env.example` | Create | Root, all vars with placeholders |
| `backend/.env.example` | Create | Keep for local dev reference |
| `.gitignore` | Update | Ensure `.env` and `backend/.env` excluded |
| `frontend/next.config.ts` | Update | Enable `output: 'standalone'` |

---

## Security

- `backend/.env` is currently tracked by git → must be untracked (`git rm --cached backend/.env`)
- Root `.gitignore` updated to explicitly cover `backend/.env`
- New strong secrets should be generated for production (different from dev)
- `.env` on VPS only, never in repo

---

## Git & GitHub

- Untrack `backend/.env` before first push
- Commit all current changes (modified + untracked files) in one clean commit
- Push to `https://github.com/mohamed-ahmed-pillars/kag_site.git` on `main`
- `.superpowers/` directory excluded from commit (internal tooling)

---

## VPS Deployment (after push)

On the VPS:
```bash
git clone https://github.com/mohamed-ahmed-pillars/kag_site.git
cd kag_site
# Create .env with real production values
docker compose up -d --build
```

---

## Out of Scope

- Strapi/frontend data integration (future task)
- CI/CD pipeline
- Database backups
- Monitoring/logging
