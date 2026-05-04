# Production Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Containerize the KAG website stack with Docker + Traefik, secure secrets from git, and push everything to GitHub ready for VPS deployment.

**Architecture:** Traefik handles SSL termination and routing — `kagegypt.com` → Next.js (port 3000), `api.kagegypt.com` → Strapi (port 1337). All services share one internal Docker network; only Traefik exposes ports 80/443. A single root `.env` file feeds all secrets into `docker-compose.yml`.

**Tech Stack:** Docker, Docker Compose, Traefik latest, Next.js 16 standalone, Strapi v5, PostgreSQL 16, Bun

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `.gitignore` | Modify | Add `backend/.env`, `.superpowers/` |
| `.env.example` | Create | Root template with all variables |
| `docker-compose.yml` | Rewrite | Full production stack |
| `frontend/Dockerfile` | Create | Multi-stage Next.js standalone build |
| `frontend/.dockerignore` | Create | Exclude node_modules, .next from build context |
| `frontend/next.config.ts` | Modify | Add `output: 'standalone'`, production image domain |
| `backend/Dockerfile` | Create | Multi-stage Strapi production build |
| `backend/.dockerignore` | Create | Exclude node_modules, dist from build context |

---

### Task 1: Fix Git Security — Untrack `backend/.env`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Untrack `backend/.env` without deleting it**

```bash
cd /path/to/kag-website
git rm --cached backend/.env
```

Expected output:
```
rm 'backend/.env'
```

- [ ] **Step 2: Update root `.gitignore` to explicitly exclude sensitive files and tooling**

Open `.gitignore` and replace the `# Env` section and add tooling exclusion:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build
.next/
out/
build/
dist/

# Strapi
backend/.tmp/
backend/.cache/
backend/build/
backend/dist/

# Env — never commit secrets
.env
.env.local
.env.*.local
backend/.env
frontend/.env.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Lockfiles (we use bun.lock)
package-lock.json
yarn.lock
pnpm-lock.yaml

# Docker
*.log

# Internal tooling
.superpowers/
```

- [ ] **Step 3: Verify `backend/.env` is now untracked**

```bash
git status backend/.env
```

Expected output:
```
On branch main
Changes to be staged:
  (use "git add <file>..." to update index)
        deleted: backend/.env
```

The file itself should still exist locally:
```bash
ls backend/.env
```
Expected: file exists.

- [ ] **Step 4: Commit the security fix**

```bash
git add .gitignore
git commit -m "security: untrack backend/.env and update gitignore"
```

---

### Task 2: Create Root `.env.example`

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example` at repo root**

```bash
cat > .env.example << 'EOF'
# Domain & SSL
DOMAIN=kagegypt.com
ACME_EMAIL=your@email.com

# Database
POSTGRES_USER=strapi
POSTGRES_PASSWORD=change_me_strong_password
POSTGRES_DB=kag_strapi

# Strapi Secrets — generate with: openssl rand -base64 32
APP_KEYS=key1base64==,key2base64==,key3base64==,key4base64==
API_TOKEN_SALT=saltbase64==
ADMIN_JWT_SECRET=secretbase64==
JWT_SECRET=secretbase64==
TRANSFER_TOKEN_SALT=saltbase64==
ENCRYPTION_KEY=keybase64==

# URLs
NEXT_PUBLIC_STRAPI_URL=https://api.kagegypt.com
NEXT_PUBLIC_SITE_URL=https://kagegypt.com
EOF
```

- [ ] **Step 2: Verify the file was created**

```bash
cat .env.example
```

Expected: file shows all variables with placeholder values.

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "chore: add root .env.example with all production variables"
```

---

### Task 3: Update `frontend/next.config.ts` for Production

**Files:**
- Modify: `frontend/next.config.ts`

- [ ] **Step 1: Update `next.config.ts` to enable standalone output and add production image domain**

Replace the entire file contents with:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.kagegypt.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Commit**

```bash
git add frontend/next.config.ts
git commit -m "feat: enable Next.js standalone output for Docker production build"
```

---

### Task 4: Create `frontend/.dockerignore` and `frontend/Dockerfile`

**Files:**
- Create: `frontend/.dockerignore`
- Create: `frontend/Dockerfile`

- [ ] **Step 1: Create `frontend/.dockerignore`**

```bash
cat > frontend/.dockerignore << 'EOF'
node_modules
.next
.git
*.md
.env*
EOF
```

- [ ] **Step 2: Create `frontend/Dockerfile`**

```dockerfile
# Stage 1: Install dependencies
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN bun run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

- [ ] **Step 3: Commit**

```bash
git add frontend/Dockerfile frontend/.dockerignore
git commit -m "feat: add frontend Dockerfile for production build"
```

---

### Task 5: Create `backend/.dockerignore` and `backend/Dockerfile`

**Files:**
- Create: `backend/.dockerignore`
- Create: `backend/Dockerfile`

- [ ] **Step 1: Create `backend/.dockerignore`**

```bash
cat > backend/.dockerignore << 'EOF'
node_modules
dist
.tmp
.cache
.git
*.md
.env
EOF
```

- [ ] **Step 2: Create `backend/Dockerfile`**

```dockerfile
# Stage 1: Install and build
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN NODE_ENV=production bun run build

# Stage 2: Production runner
FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/favicon.png ./favicon.png
COPY --from=builder /app/package.json ./package.json
EXPOSE 1337
CMD ["bun", "run", "start"]
```

- [ ] **Step 3: Commit**

```bash
git add backend/Dockerfile backend/.dockerignore
git commit -m "feat: add backend Dockerfile for Strapi production build"
```

---

### Task 6: Rewrite `docker-compose.yml`

**Files:**
- Modify: `docker-compose.yml`

- [ ] **Step 1: Replace `docker-compose.yml` with the full production stack**

```yaml
services:
  traefik:
    image: traefik:latest
    container_name: kag_traefik
    restart: unless-stopped
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--api.dashboard=false"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik_certs:/letsencrypt
    networks:
      - web

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_STRAPI_URL: ${NEXT_PUBLIC_STRAPI_URL}
        NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL}
    container_name: kag_frontend
    restart: unless-stopped
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`${DOMAIN}`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
      - "traefik.http.services.frontend.loadbalancer.server.port=3000"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: kag_backend
    restart: unless-stopped
    environment:
      HOST: 0.0.0.0
      PORT: 1337
      NODE_ENV: production
      APP_KEYS: ${APP_KEYS}
      API_TOKEN_SALT: ${API_TOKEN_SALT}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      JWT_SECRET: ${JWT_SECRET}
      TRANSFER_TOKEN_SALT: ${TRANSFER_TOKEN_SALT}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
      DATABASE_CLIENT: postgres
      DATABASE_HOST: db
      DATABASE_PORT: 5432
      DATABASE_NAME: ${POSTGRES_DB}
      DATABASE_USERNAME: ${POSTGRES_USER}
      DATABASE_PASSWORD: ${POSTGRES_PASSWORD}
      DATABASE_SSL: "false"
    volumes:
      - strapi_uploads:/app/public/uploads
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.backend.rule=Host(`api.${DOMAIN}`)"
      - "traefik.http.routers.backend.entrypoints=websecure"
      - "traefik.http.routers.backend.tls.certresolver=letsencrypt"
      - "traefik.http.services.backend.loadbalancer.server.port=1337"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    container_name: kag_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - web
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  web:
    driver: bridge

volumes:
  postgres_data:
  strapi_uploads:
  traefik_certs:
```

- [ ] **Step 2: Commit**

```bash
git add docker-compose.yml
git commit -m "feat: add full production docker-compose with Traefik, Next.js, Strapi, and PostgreSQL"
```

---

### Task 7: Commit All Remaining Changes and Push to GitHub

**Files:** All modified and untracked frontend/backend source files

- [ ] **Step 1: Check what's left to stage**

```bash
git status --short
```

Review the list. Everything under `frontend/` and `backend/` (excluding `.env` files) should be staged. The `.superpowers/` directory should be ignored.

- [ ] **Step 2: Stage all remaining source changes**

```bash
git add frontend/ backend/types/ backend/src/ backend/config/
git add docs/
```

Do NOT add:
- `backend/.env`
- `.superpowers/`
- Any `.env*` files

- [ ] **Step 3: Verify staging looks clean**

```bash
git status --short
```

Confirm no `.env` files are staged. Confirm `.superpowers/` is not staged.

- [ ] **Step 4: Commit all source changes**

```bash
git commit -m "feat: production-ready frontend and backend with dark mode, i18n, about/blog/product pages"
```

- [ ] **Step 5: Verify the remote is set**

```bash
git remote -v
```

Expected:
```
origin  https://github.com/mohamed-ahmed-pillars/kag_site.git (fetch)
origin  https://github.com/mohamed-ahmed-pillars/kag_site.git (push)
```

- [ ] **Step 6: Push to GitHub**

```bash
git push -u origin main
```

Expected: all commits pushed successfully.

- [ ] **Step 7: Confirm on GitHub**

Visit https://github.com/mohamed-ahmed-pillars/kag_site and verify all files are present and `backend/.env` is NOT visible in the repo.

---

## VPS Deployment Checklist (after push)

Run these on your VPS once the code is pushed:

```bash
# 1. Clone the repo
git clone https://github.com/mohamed-ahmed-pillars/kag_site.git
cd kag_site

# 2. Create production .env from the example
cp .env.example .env
# Edit .env and fill in all real values

# 3. Make sure ports 80 and 443 are open in your firewall

# 4. Start everything
docker compose up -d --build

# 5. Check logs
docker compose logs -f
```

**DNS:** Point `kagegypt.com` and `api.kagegypt.com` A records to your VPS IP before running `docker compose up` so Traefik can get SSL certificates.
