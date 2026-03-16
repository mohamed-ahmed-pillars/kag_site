# KAG Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (EN/AR) corporate website for KAG food manufacturing company with Next.js 16, Strapi v5.31, and full RTL support.

**Architecture:** Monorepo with `frontend/` (Next.js 16 + Bun) and `backend/` (Strapi v5.31 + Bun). PostgreSQL runs in Docker for local dev. next-intl handles i18n with `[locale]` routing. Strapi provides headless CMS with REST API.

**Tech Stack:** Bun, Next.js 16, TypeScript, Tailwind CSS v4, Strapi v5.31, PostgreSQL 16, GSAP, Framer Motion, next-intl, React Hook Form, Zod, Leaflet, Nodemailer

---

## Phase 1: Project Scaffolding & Foundation

### Task 1.1: Initialize Git Repository

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: `CLAUDE.md`

**Step 1: Clean existing directory and initialize**

```bash
cd /Users/mohamed/MyData/Work/TechnologyPillars/Customers/KAG/kag-website
rm -rf Archive.zip .DS_Store
```

**Step 2: Create .gitignore**

```gitignore
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

# Env
.env
.env.local
.env.*.local

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

# Bun
bun.lockb

# Docker
*.log
```

**Step 3: Create CLAUDE.md**

```markdown
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
```

**Step 4: Create README.md**

```markdown
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
```

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: initialize project structure with CLAUDE.md"
```

---

### Task 1.2: Create Docker Compose for PostgreSQL

**Files:**
- Create: `docker-compose.yml`

**Step 1: Create docker-compose.yml**

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: kag_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi_password
      POSTGRES_DB: kag_strapi
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U strapi -d kag_strapi"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

**Step 2: Test PostgreSQL starts**

```bash
docker compose up -d
docker compose ps
```

Expected: `kag_postgres` running, healthy

**Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: add Docker Compose for PostgreSQL"
```

---

### Task 1.3: Scaffold Strapi v5 Backend

**Files:**
- Create: `backend/` (entire Strapi project)

**Step 1: Create Strapi project with Bun**

```bash
cd /Users/mohamed/MyData/Work/TechnologyPillars/Customers/KAG/kag-website
bunx create-strapi@latest backend --quickstart --no-run --typescript
```

**Step 2: Configure PostgreSQL database**

Create/update `backend/config/database.ts`:

```typescript
import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'kag_strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi_password'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
```

**Step 3: Create backend .env**

Create `backend/.env`:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=toBeModified1,toBeModified2,toBeModified3,toBeModified4
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=kag_strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false
```

**Step 4: Install PostgreSQL client and start Strapi**

```bash
cd backend
bun add pg
bun run develop
```

Expected: Strapi starts, creates admin panel at http://localhost:1337/admin

**Step 5: Stop Strapi (Ctrl+C) and commit**

```bash
cd /Users/mohamed/MyData/Work/TechnologyPillars/Customers/KAG/kag-website
git add backend/
git commit -m "feat: scaffold Strapi v5 backend with PostgreSQL config"
```

---

### Task 1.4: Create Strapi Content Types - Category

**Files:**
- Create: `backend/src/api/category/content-types/category/schema.json`
- Create: `backend/src/api/category/controllers/category.ts`
- Create: `backend/src/api/category/services/category.ts`
- Create: `backend/src/api/category/routes/category.ts`

**Step 1: Create category content type structure**

```bash
mkdir -p backend/src/api/category/content-types/category
mkdir -p backend/src/api/category/controllers
mkdir -p backend/src/api/category/services
mkdir -p backend/src/api/category/routes
```

**Step 2: Create schema.json**

Create `backend/src/api/category/content-types/category/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category",
    "description": "Product categories"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name_en": {
      "type": "string",
      "required": true
    },
    "name_ar": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name_en",
      "required": true
    },
    "icon": {
      "type": "string"
    },
    "sort_order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

**Step 3: Create controller**

Create `backend/src/api/category/controllers/category.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category');
```

**Step 4: Create service**

Create `backend/src/api/category/services/category.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::category.category');
```

**Step 5: Create routes**

Create `backend/src/api/category/routes/category.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::category.category');
```

**Step 6: Commit**

```bash
git add backend/src/api/category/
git commit -m "feat: add Category content type"
```

---

### Task 1.5: Create Strapi Content Types - Product

**Files:**
- Create: `backend/src/api/product/content-types/product/schema.json`
- Create: `backend/src/api/product/controllers/product.ts`
- Create: `backend/src/api/product/services/product.ts`
- Create: `backend/src/api/product/routes/product.ts`

**Step 1: Create product content type structure**

```bash
mkdir -p backend/src/api/product/content-types/product
mkdir -p backend/src/api/product/controllers
mkdir -p backend/src/api/product/services
mkdir -p backend/src/api/product/routes
```

**Step 2: Create schema.json**

Create `backend/src/api/product/content-types/product/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product",
    "description": "Food products"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name_en": {
      "type": "string",
      "required": true
    },
    "name_ar": {
      "type": "string",
      "required": true
    },
    "description_en": {
      "type": "text"
    },
    "description_ar": {
      "type": "text"
    },
    "slug": {
      "type": "uid",
      "targetField": "name_en",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "products"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "specs": {
      "type": "json"
    },
    "packaging_options": {
      "type": "json"
    }
  }
}
```

**Step 3: Update Category schema to add inverse relation**

Update `backend/src/api/category/content-types/category/schema.json` - add to attributes:

```json
{
  "attributes": {
    "products": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product",
      "mappedBy": "category"
    }
  }
}
```

**Step 4: Create controller, service, routes**

Create `backend/src/api/product/controllers/product.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product');
```

Create `backend/src/api/product/services/product.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product');
```

Create `backend/src/api/product/routes/product.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::product.product');
```

**Step 5: Commit**

```bash
git add backend/src/api/product/ backend/src/api/category/
git commit -m "feat: add Product content type with Category relation"
```

---

### Task 1.6: Create Strapi Content Types - BlogPost

**Files:**
- Create: `backend/src/api/blog-post/content-types/blog-post/schema.json`
- Create: `backend/src/api/blog-post/controllers/blog-post.ts`
- Create: `backend/src/api/blog-post/services/blog-post.ts`
- Create: `backend/src/api/blog-post/routes/blog-post.ts`

**Step 1: Create structure**

```bash
mkdir -p backend/src/api/blog-post/content-types/blog-post
mkdir -p backend/src/api/blog-post/controllers
mkdir -p backend/src/api/blog-post/services
mkdir -p backend/src/api/blog-post/routes
```

**Step 2: Create schema.json**

Create `backend/src/api/blog-post/content-types/blog-post/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post",
    "description": "Blog articles"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title_en": {
      "type": "string",
      "required": true
    },
    "title_ar": {
      "type": "string",
      "required": true
    },
    "body_en": {
      "type": "richtext"
    },
    "body_ar": {
      "type": "richtext"
    },
    "slug": {
      "type": "uid",
      "targetField": "title_en",
      "required": true
    },
    "cover_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "published_date": {
      "type": "date"
    },
    "category": {
      "type": "string"
    }
  }
}
```

**Step 3: Create controller, service, routes**

Create `backend/src/api/blog-post/controllers/blog-post.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post');
```

Create `backend/src/api/blog-post/services/blog-post.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::blog-post.blog-post');
```

Create `backend/src/api/blog-post/routes/blog-post.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog-post.blog-post');
```

**Step 4: Commit**

```bash
git add backend/src/api/blog-post/
git commit -m "feat: add BlogPost content type"
```

---

### Task 1.7: Create Strapi Content Types - Certification

**Files:**
- Create: `backend/src/api/certification/content-types/certification/schema.json`
- Create: `backend/src/api/certification/controllers/certification.ts`
- Create: `backend/src/api/certification/services/certification.ts`
- Create: `backend/src/api/certification/routes/certification.ts`

**Step 1: Create structure**

```bash
mkdir -p backend/src/api/certification/content-types/certification
mkdir -p backend/src/api/certification/controllers
mkdir -p backend/src/api/certification/services
mkdir -p backend/src/api/certification/routes
```

**Step 2: Create schema.json**

Create `backend/src/api/certification/content-types/certification/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "certifications",
  "info": {
    "singularName": "certification",
    "pluralName": "certifications",
    "displayName": "Certification",
    "description": "Quality certifications"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name_en": {
      "type": "string",
      "required": true
    },
    "name_ar": {
      "type": "string",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "issuing_body_en": {
      "type": "string"
    },
    "issuing_body_ar": {
      "type": "string"
    },
    "description_en": {
      "type": "text"
    },
    "description_ar": {
      "type": "text"
    },
    "valid_until": {
      "type": "date"
    }
  }
}
```

**Step 3: Create controller, service, routes**

Create `backend/src/api/certification/controllers/certification.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::certification.certification');
```

Create `backend/src/api/certification/services/certification.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::certification.certification');
```

Create `backend/src/api/certification/routes/certification.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::certification.certification');
```

**Step 4: Commit**

```bash
git add backend/src/api/certification/
git commit -m "feat: add Certification content type"
```

---

### Task 1.8: Create Strapi Content Types - Event

**Files:**
- Create: `backend/src/api/event/content-types/event/schema.json`
- Create: `backend/src/api/event/controllers/event.ts`
- Create: `backend/src/api/event/services/event.ts`
- Create: `backend/src/api/event/routes/event.ts`

**Step 1: Create structure**

```bash
mkdir -p backend/src/api/event/content-types/event
mkdir -p backend/src/api/event/controllers
mkdir -p backend/src/api/event/services
mkdir -p backend/src/api/event/routes
```

**Step 2: Create schema.json**

Create `backend/src/api/event/content-types/event/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "events",
  "info": {
    "singularName": "event",
    "pluralName": "events",
    "displayName": "Event",
    "description": "Company events and exhibitions"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title_en": {
      "type": "string",
      "required": true
    },
    "title_ar": {
      "type": "string",
      "required": true
    },
    "date": {
      "type": "datetime"
    },
    "location": {
      "type": "string"
    },
    "description_en": {
      "type": "text"
    },
    "description_ar": {
      "type": "text"
    },
    "cover_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    }
  }
}
```

**Step 3: Create controller, service, routes**

Create `backend/src/api/event/controllers/event.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event');
```

Create `backend/src/api/event/services/event.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::event.event');
```

Create `backend/src/api/event/routes/event.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::event.event');
```

**Step 4: Commit**

```bash
git add backend/src/api/event/
git commit -m "feat: add Event content type"
```

---

### Task 1.9: Create Strapi Content Types - RFQ Submission

**Files:**
- Create: `backend/src/api/rfq-submission/content-types/rfq-submission/schema.json`
- Create: `backend/src/api/rfq-submission/controllers/rfq-submission.ts`
- Create: `backend/src/api/rfq-submission/services/rfq-submission.ts`
- Create: `backend/src/api/rfq-submission/routes/rfq-submission.ts`

**Step 1: Create structure**

```bash
mkdir -p backend/src/api/rfq-submission/content-types/rfq-submission
mkdir -p backend/src/api/rfq-submission/controllers
mkdir -p backend/src/api/rfq-submission/services
mkdir -p backend/src/api/rfq-submission/routes
```

**Step 2: Create schema.json**

Create `backend/src/api/rfq-submission/content-types/rfq-submission/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "rfq_submissions",
  "info": {
    "singularName": "rfq-submission",
    "pluralName": "rfq-submissions",
    "displayName": "RFQ Submission",
    "description": "Request for quotation submissions"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "company_name": {
      "type": "string",
      "required": true
    },
    "contact_name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "phone": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "products": {
      "type": "json"
    },
    "message": {
      "type": "text"
    },
    "status": {
      "type": "enumeration",
      "enum": ["new", "reviewed", "responded"],
      "default": "new"
    },
    "reference_number": {
      "type": "string"
    }
  }
}
```

**Step 3: Create controller, service, routes**

Create `backend/src/api/rfq-submission/controllers/rfq-submission.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::rfq-submission.rfq-submission');
```

Create `backend/src/api/rfq-submission/services/rfq-submission.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::rfq-submission.rfq-submission');
```

Create `backend/src/api/rfq-submission/routes/rfq-submission.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::rfq-submission.rfq-submission');
```

**Step 4: Commit**

```bash
git add backend/src/api/rfq-submission/
git commit -m "feat: add RFQ Submission content type"
```

---

### Task 1.10: Create Strapi Single Types - Company Info

**Files:**
- Create: `backend/src/api/company-info/content-types/company-info/schema.json`
- Create: `backend/src/api/company-info/controllers/company-info.ts`
- Create: `backend/src/api/company-info/services/company-info.ts`
- Create: `backend/src/api/company-info/routes/company-info.ts`

**Step 1: Create structure**

```bash
mkdir -p backend/src/api/company-info/content-types/company-info
mkdir -p backend/src/api/company-info/controllers
mkdir -p backend/src/api/company-info/services
mkdir -p backend/src/api/company-info/routes
```

**Step 2: Create schema.json (Single Type)**

Create `backend/src/api/company-info/content-types/company-info/schema.json`:

```json
{
  "kind": "singleType",
  "collectionName": "company_infos",
  "info": {
    "singularName": "company-info",
    "pluralName": "company-infos",
    "displayName": "Company Info",
    "description": "Company information and settings"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "name_en": {
      "type": "string",
      "required": true
    },
    "name_ar": {
      "type": "string",
      "required": true
    },
    "tagline_en": {
      "type": "string"
    },
    "tagline_ar": {
      "type": "string"
    },
    "about_en": {
      "type": "richtext"
    },
    "about_ar": {
      "type": "richtext"
    },
    "mission_en": {
      "type": "text"
    },
    "mission_ar": {
      "type": "text"
    },
    "vision_en": {
      "type": "text"
    },
    "vision_ar": {
      "type": "text"
    },
    "stats": {
      "type": "json"
    },
    "contact": {
      "type": "json"
    },
    "social_links": {
      "type": "json"
    },
    "map_coordinates": {
      "type": "json"
    }
  }
}
```

**Step 3: Create controller, service, routes**

Create `backend/src/api/company-info/controllers/company-info.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::company-info.company-info');
```

Create `backend/src/api/company-info/services/company-info.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::company-info.company-info');
```

Create `backend/src/api/company-info/routes/company-info.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::company-info.company-info');
```

**Step 4: Commit**

```bash
git add backend/src/api/company-info/
git commit -m "feat: add Company Info single type"
```

---

### Task 1.11: Create Strapi Single Types - CEO Profile

**Files:**
- Create: `backend/src/api/ceo-profile/content-types/ceo-profile/schema.json`
- Create: `backend/src/api/ceo-profile/controllers/ceo-profile.ts`
- Create: `backend/src/api/ceo-profile/services/ceo-profile.ts`
- Create: `backend/src/api/ceo-profile/routes/ceo-profile.ts`

**Step 1: Create structure**

```bash
mkdir -p backend/src/api/ceo-profile/content-types/ceo-profile
mkdir -p backend/src/api/ceo-profile/controllers
mkdir -p backend/src/api/ceo-profile/services
mkdir -p backend/src/api/ceo-profile/routes
```

**Step 2: Create schema.json (Single Type)**

Create `backend/src/api/ceo-profile/content-types/ceo-profile/schema.json`:

```json
{
  "kind": "singleType",
  "collectionName": "ceo_profiles",
  "info": {
    "singularName": "ceo-profile",
    "pluralName": "ceo-profiles",
    "displayName": "CEO Profile",
    "description": "CEO information"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "name_en": {
      "type": "string",
      "required": true
    },
    "name_ar": {
      "type": "string",
      "required": true
    },
    "title_en": {
      "type": "string"
    },
    "title_ar": {
      "type": "string"
    },
    "photo": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "quote_en": {
      "type": "text"
    },
    "quote_ar": {
      "type": "text"
    },
    "bio_en": {
      "type": "richtext"
    },
    "bio_ar": {
      "type": "richtext"
    }
  }
}
```

**Step 3: Create controller, service, routes**

Create `backend/src/api/ceo-profile/controllers/ceo-profile.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::ceo-profile.ceo-profile');
```

Create `backend/src/api/ceo-profile/services/ceo-profile.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::ceo-profile.ceo-profile');
```

Create `backend/src/api/ceo-profile/routes/ceo-profile.ts`:

```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::ceo-profile.ceo-profile');
```

**Step 4: Commit**

```bash
git add backend/src/api/ceo-profile/
git commit -m "feat: add CEO Profile single type"
```

---

### Task 1.12: Verify Strapi Starts with All Content Types

**Step 1: Start PostgreSQL**

```bash
docker compose up -d
```

**Step 2: Start Strapi**

```bash
cd backend && bun run develop
```

Expected: Strapi starts without errors, admin panel at http://localhost:1337/admin shows all content types

**Step 3: Create admin user (first time)**

Visit http://localhost:1337/admin and create admin account

**Step 4: Verify content types in admin**

Check Content-Type Builder shows:
- Collection Types: Category, Product, BlogPost, Certification, Event, RFQ Submission
- Single Types: Company Info, CEO Profile

**Step 5: Stop Strapi and commit any generated files**

```bash
git add -A
git commit -m "chore: verify Strapi content types"
```

---

### Task 1.13: Scaffold Next.js 16 Frontend

**Files:**
- Create: `frontend/` (entire Next.js project)

**Step 1: Create Next.js project with Bun**

```bash
cd /Users/mohamed/MyData/Work/TechnologyPillars/Customers/KAG/kag-website
bunx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-bun
```

**Step 2: Install dependencies**

```bash
cd frontend
bun add next-intl framer-motion gsap react-hook-form zod lucide-react
bun add leaflet react-leaflet
bun add -d @types/leaflet
```

**Step 3: Create frontend .env.local**

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Step 4: Verify Next.js starts**

```bash
bun run dev
```

Expected: Next.js starts at http://localhost:3000

**Step 5: Stop and commit**

```bash
cd /Users/mohamed/MyData/Work/TechnologyPillars/Customers/KAG/kag-website
git add frontend/
git commit -m "feat: scaffold Next.js 16 frontend with dependencies"
```

---

### Task 1.14: Configure next-intl for Bilingual Support

**Files:**
- Create: `frontend/i18n/request.ts`
- Create: `frontend/i18n/routing.ts`
- Create: `frontend/messages/en.json`
- Create: `frontend/messages/ar.json`
- Modify: `frontend/next.config.ts`
- Create: `frontend/middleware.ts`

**Step 1: Create i18n configuration**

Create `frontend/i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
```

Create `frontend/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Step 2: Create message files**

Create `frontend/messages/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "products": "Products",
    "export": "Export",
    "quotation": "Quotation",
    "blog": "Blog",
    "contact": "Contact",
    "certifications": "Certifications"
  },
  "common": {
    "learnMore": "Learn More",
    "viewAll": "View All",
    "submit": "Submit",
    "loading": "Loading...",
    "error": "An error occurred"
  },
  "home": {
    "hero": {
      "title": "Premium Food Products for Global Markets",
      "subtitle": "Quality Egyptian food manufacturing and export since 1999",
      "cta": "Request a Quote"
    }
  },
  "footer": {
    "rights": "All rights reserved",
    "quickLinks": "Quick Links",
    "contactUs": "Contact Us",
    "followUs": "Follow Us"
  }
}
```

Create `frontend/messages/ar.json`:

```json
{
  "nav": {
    "home": "الرئيسية",
    "about": "من نحن",
    "products": "المنتجات",
    "export": "التصدير",
    "quotation": "طلب عرض سعر",
    "blog": "المدونة",
    "contact": "اتصل بنا",
    "certifications": "الشهادات"
  },
  "common": {
    "learnMore": "اعرف المزيد",
    "viewAll": "عرض الكل",
    "submit": "إرسال",
    "loading": "جاري التحميل...",
    "error": "حدث خطأ"
  },
  "home": {
    "hero": {
      "title": "منتجات غذائية متميزة للأسواق العالمية",
      "subtitle": "تصنيع وتصدير الأغذية المصرية عالية الجودة منذ 1999",
      "cta": "اطلب عرض سعر"
    }
  },
  "footer": {
    "rights": "جميع الحقوق محفوظة",
    "quickLinks": "روابط سريعة",
    "contactUs": "اتصل بنا",
    "followUs": "تابعنا"
  }
}
```

**Step 3: Create middleware**

Create `frontend/middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
```

**Step 4: Update next.config.ts**

Update `frontend/next.config.ts`:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
```

**Step 5: Commit**

```bash
git add frontend/i18n/ frontend/messages/ frontend/middleware.ts frontend/next.config.ts
git commit -m "feat: configure next-intl for EN/AR bilingual support"
```

---

### Task 1.15: Create Locale Layout with RTL Support

**Files:**
- Create: `frontend/app/[locale]/layout.tsx`
- Create: `frontend/app/[locale]/page.tsx`
- Delete: `frontend/app/page.tsx` (move to locale)
- Delete: `frontend/app/layout.tsx` (move to locale)

**Step 1: Create locale layout**

Create `frontend/app/[locale]/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
});

export const metadata: Metadata = {
  title: 'KAG - Food Manufacturing & Export',
  description: 'Premium Egyptian food products for global markets',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body
        className={`${inter.variable} ${notoArabic.variable} ${
          isRTL ? 'font-noto-arabic' : 'font-inter'
        } antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 2: Create locale page**

Create `frontend/app/[locale]/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          {t('hero.cta')}
        </button>
      </div>
    </main>
  );
}
```

**Step 3: Update globals.css for fonts**

Update `frontend/app/globals.css` - add font utilities:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.font-inter {
  font-family: var(--font-inter), system-ui, sans-serif;
}

.font-noto-arabic {
  font-family: var(--font-noto-arabic), system-ui, sans-serif;
}
```

**Step 4: Delete old root files**

```bash
rm frontend/app/page.tsx
```

Update `frontend/app/layout.tsx` to be minimal redirect:

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

**Step 5: Test both locales**

```bash
cd frontend && bun run dev
```

Visit:
- http://localhost:3000/en - English (LTR)
- http://localhost:3000/ar - Arabic (RTL)

**Step 6: Commit**

```bash
git add frontend/app/
git commit -m "feat: add locale layout with RTL support"
```

---

### Task 1.16: Create Strapi API Client

**Files:**
- Create: `frontend/lib/strapi.ts`
- Create: `frontend/types/strapi.ts`

**Step 1: Create TypeScript types**

Create `frontend/types/strapi.ts`:

```typescript
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface Category {
  id: number;
  documentId: string;
  name_en: string;
  name_ar: string;
  slug: string;
  icon?: string;
  sort_order: number;
}

export interface Product {
  id: number;
  documentId: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  slug: string;
  image?: StrapiImage;
  category?: Category;
  featured: boolean;
  specs?: Record<string, string>;
  packaging_options?: string[];
}

export interface BlogPost {
  id: number;
  documentId: string;
  title_en: string;
  title_ar: string;
  body_en?: string;
  body_ar?: string;
  slug: string;
  cover_image?: StrapiImage;
  published_date?: string;
  category?: string;
}

export interface Certification {
  id: number;
  documentId: string;
  name_en: string;
  name_ar: string;
  image?: StrapiImage;
  issuing_body_en?: string;
  issuing_body_ar?: string;
  description_en?: string;
  description_ar?: string;
  valid_until?: string;
}

export interface Event {
  id: number;
  documentId: string;
  title_en: string;
  title_ar: string;
  date?: string;
  location?: string;
  description_en?: string;
  description_ar?: string;
  cover_image?: StrapiImage;
}

export interface CompanyInfo {
  id: number;
  documentId: string;
  name_en: string;
  name_ar: string;
  tagline_en?: string;
  tagline_ar?: string;
  about_en?: string;
  about_ar?: string;
  mission_en?: string;
  mission_ar?: string;
  vision_en?: string;
  vision_ar?: string;
  stats?: {
    products: number;
    countries: number;
    clients: number;
    years: number;
  };
  contact?: {
    email: string;
    phone: string;
    address_en: string;
    address_ar: string;
  };
  social_links?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    whatsapp?: string;
  };
  map_coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CEOProfile {
  id: number;
  documentId: string;
  name_en: string;
  name_ar: string;
  title_en?: string;
  title_ar?: string;
  photo?: StrapiImage;
  quote_en?: string;
  quote_ar?: string;
  bio_en?: string;
  bio_ar?: string;
}

export interface RFQSubmission {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  country?: string;
  products?: Array<{ id: string; name: string; quantity: number }>;
  message?: string;
}
```

**Step 2: Create Strapi client**

Create `frontend/lib/strapi.ts`:

```typescript
import type {
  StrapiResponse,
  Category,
  Product,
  BlogPost,
  Certification,
  Event,
  CompanyInfo,
  CEOProfile,
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetchStrapi<StrapiResponse<Category[]>>(
    '/categories?sort=sort_order:asc&populate=*'
  );
  return response.data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await fetchStrapi<StrapiResponse<Category[]>>(
    `/categories?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

// Products
export async function getProducts(params?: {
  featured?: boolean;
  categorySlug?: string;
  limit?: number;
}): Promise<Product[]> {
  let query = '/products?populate=*';

  if (params?.featured) {
    query += '&filters[featured][$eq]=true';
  }
  if (params?.categorySlug) {
    query += `&filters[category][slug][$eq]=${params.categorySlug}`;
  }
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }

  const response = await fetchStrapi<StrapiResponse<Product[]>>(query);
  return response.data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetchStrapi<StrapiResponse<Product[]>>(
    `/products?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const response = await fetchStrapi<StrapiResponse<Product[]>>(
    '/products?fields[0]=slug'
  );
  return response.data.map((p) => p.slug);
}

// Blog Posts
export async function getBlogPosts(params?: {
  category?: string;
  limit?: number;
  page?: number;
}): Promise<{ posts: BlogPost[]; total: number }> {
  let query = '/blog-posts?populate=*&sort=published_date:desc';

  if (params?.category) {
    query += `&filters[category][$eq]=${params.category}`;
  }
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }
  if (params?.page) {
    query += `&pagination[page]=${params.page}`;
  }

  const response = await fetchStrapi<StrapiResponse<BlogPost[]>>(query);
  return {
    posts: response.data,
    total: response.meta.pagination?.total || 0,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetchStrapi<StrapiResponse<BlogPost[]>>(
    `/blog-posts?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const response = await fetchStrapi<StrapiResponse<BlogPost[]>>(
    '/blog-posts?fields[0]=slug'
  );
  return response.data.map((p) => p.slug);
}

// Certifications
export async function getCertifications(): Promise<Certification[]> {
  const response = await fetchStrapi<StrapiResponse<Certification[]>>(
    '/certifications?populate=*'
  );
  return response.data;
}

// Events
export async function getEvents(limit?: number): Promise<Event[]> {
  let query = '/events?populate=*&sort=date:desc';
  if (limit) {
    query += `&pagination[limit]=${limit}`;
  }
  const response = await fetchStrapi<StrapiResponse<Event[]>>(query);
  return response.data;
}

// Company Info (Single Type)
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<CompanyInfo>>(
      '/company-info?populate=*'
    );
    return response.data;
  } catch {
    return null;
  }
}

// CEO Profile (Single Type)
export async function getCEOProfile(): Promise<CEOProfile | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<CEOProfile>>(
      '/ceo-profile?populate=*'
    );
    return response.data;
  } catch {
    return null;
  }
}

// Helper to get full image URL
export function getStrapiImageUrl(url?: string): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
```

**Step 3: Commit**

```bash
git add frontend/lib/strapi.ts frontend/types/strapi.ts
git commit -m "feat: add typed Strapi API client"
```

---

### Task 1.17: Configure Tailwind v4 with Brand Colors

**Files:**
- Modify: `frontend/tailwind.config.ts`

**Step 1: Update Tailwind config with brand colors**

Update `frontend/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af', // Main primary
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669', // Main secondary
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'noto-arabic': ['var(--font-noto-arabic)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Commit**

```bash
git add frontend/tailwind.config.ts
git commit -m "feat: configure Tailwind with brand colors"
```

---

### Task 1.18: Phase 1 Verification

**Step 1: Start all services**

Terminal 1:
```bash
docker compose up -d
```

Terminal 2:
```bash
cd backend && bun run develop
```

Terminal 3:
```bash
cd frontend && bun run dev
```

**Step 2: Verify Strapi**

- Visit http://localhost:1337/admin
- Verify all content types are visible
- Create a test category to verify DB connection

**Step 3: Verify Frontend**

- Visit http://localhost:3000/en - English LTR
- Visit http://localhost:3000/ar - Arabic RTL
- Verify language switcher will work (text changes)

**Step 4: Final Phase 1 commit**

```bash
git add -A
git commit -m "chore: complete Phase 1 - project scaffolding"
```

---

## Phase 2: Layout Components & Navigation

### Task 2.1: Create Header Component

**Files:**
- Create: `frontend/components/layout/Header.tsx`
- Create: `frontend/components/layout/LanguageSwitcher.tsx`
- Create: `frontend/components/layout/MobileMenu.tsx`

**Step 1: Create LanguageSwitcher**

Create `frontend/components/layout/LanguageSwitcher.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {locale === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
```

**Step 2: Create MobileMenu**

Create `frontend/components/layout/MobileMenu.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'export', href: '/export' },
  { key: 'quotation', href: '/quotation' },
  { key: 'blog', href: '/blog' },
  { key: 'certifications', href: '/certifications' },
  { key: 'contact', href: '/contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href === '' && pathname === `/${locale}`);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-md"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 ${
                locale === 'ar' ? 'left-0' : 'right-0'
              } h-full w-80 bg-white z-50 shadow-xl`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-xl font-bold text-primary-600">KAG</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-md transition ${
                          isActive(item.href)
                            ? 'bg-primary-600 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 3: Create Header**

Create `frontend/components/layout/Header.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const navItems = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'export', href: '/export' },
  { key: 'quotation', href: '/quotation' },
  { key: 'blog', href: '/blog' },
  { key: 'certifications', href: '/certifications' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href === '' && pathname === `/${locale}`);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold text-primary-600"
          >
            KAG
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
```

**Step 4: Commit**

```bash
mkdir -p frontend/components/layout
git add frontend/components/layout/
git commit -m "feat: add Header with navigation and language switcher"
```

---

### Task 2.2: Create Footer Component

**Files:**
- Create: `frontend/components/layout/Footer.tsx`
- Create: `frontend/components/layout/WhatsAppButton.tsx`

**Step 1: Create WhatsAppButton**

Create `frontend/components/layout/WhatsAppButton.tsx`:

```typescript
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export default function WhatsAppButton({
  phoneNumber = '+201234567890',
}: WhatsAppButtonProps) {
  const locale = useLocale();
  const message = locale === 'ar'
    ? 'مرحباً، أود الاستفسار عن منتجاتكم'
    : 'Hello, I would like to inquire about your products';

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${locale === 'ar' ? 'left-6' : 'right-6'} z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}
```

**Step 2: Create Footer**

Create `frontend/components/layout/Footer.tsx`:

```typescript
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'certifications', href: '/certifications' },
];

const serviceLinks = [
  { key: 'export', href: '/export' },
  { key: 'quotation', href: '/quotation' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
];

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">KAG</h3>
            <p className="text-sm mb-4">
              {locale === 'ar'
                ? 'شركة رائدة في تصنيع وتصدير المنتجات الغذائية المصرية عالية الجودة'
                : 'A leading company in manufacturing and exporting premium Egyptian food products'}
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm hover:text-white transition"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm hover:text-white transition"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {locale === 'ar'
                    ? 'المنطقة الصناعية، القاهرة، مصر'
                    : 'Industrial Zone, Cairo, Egypt'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+201234567890" className="text-sm hover:text-white transition">
                  +20 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@kag.com" className="text-sm hover:text-white transition">
                  info@kag.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} KAG. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Commit**

```bash
git add frontend/components/layout/Footer.tsx frontend/components/layout/WhatsAppButton.tsx
git commit -m "feat: add Footer and WhatsApp floating button"
```

---

### Task 2.3: Create Page Transition and ScrollToTop Components

**Files:**
- Create: `frontend/components/layout/PageTransition.tsx`
- Create: `frontend/components/layout/ScrollToTop.tsx`

**Step 1: Create PageTransition**

Create `frontend/components/layout/PageTransition.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Create ScrollToTop**

Create `frontend/components/layout/ScrollToTop.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-6 ${
            locale === 'ar' ? 'right-6' : 'left-6'
          } z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

**Step 3: Commit**

```bash
git add frontend/components/layout/PageTransition.tsx frontend/components/layout/ScrollToTop.tsx
git commit -m "feat: add PageTransition and ScrollToTop components"
```

---

### Task 2.4: Create Layout Index Export

**Files:**
- Create: `frontend/components/layout/index.ts`

**Step 1: Create index export**

Create `frontend/components/layout/index.ts`:

```typescript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as LanguageSwitcher } from './LanguageSwitcher';
export { default as MobileMenu } from './MobileMenu';
export { default as PageTransition } from './PageTransition';
export { default as ScrollToTop } from './ScrollToTop';
export { default as WhatsAppButton } from './WhatsAppButton';
```

**Step 2: Commit**

```bash
git add frontend/components/layout/index.ts
git commit -m "feat: add layout components index export"
```

---

### Task 2.5: Update Locale Layout with All Components

**Files:**
- Modify: `frontend/app/[locale]/layout.tsx`

**Step 1: Update layout to include all components**

Update `frontend/app/[locale]/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header, Footer, ScrollToTop, WhatsAppButton } from '@/components/layout';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
});

export const metadata: Metadata = {
  title: 'KAG - Food Manufacturing & Export',
  description: 'Premium Egyptian food products for global markets',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body
        className={`${inter.variable} ${notoArabic.variable} ${
          isRTL ? 'font-noto-arabic' : 'font-inter'
        } antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pt-16 lg:pt-20">{children}</main>
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 2: Verify layout works**

```bash
cd frontend && bun run dev
```

Visit http://localhost:3000/en and http://localhost:3000/ar

Expected: Header, Footer, ScrollToTop, WhatsApp button all render correctly

**Step 3: Commit**

```bash
git add frontend/app/[locale]/layout.tsx
git commit -m "feat: integrate layout components into locale layout"
```

---

### Task 2.6: Phase 2 Verification

**Step 1: Test all layout features**

- Header sticky on scroll with blur
- Navigation links work for both locales
- Language switcher changes locale
- Mobile menu opens/closes correctly
- Mobile menu slides from correct side (RTL vs LTR)
- Footer renders 4 columns
- WhatsApp button positioned correctly (RTL vs LTR)
- ScrollToTop appears after scrolling

**Step 2: Final Phase 2 commit**

```bash
git add -A
git commit -m "chore: complete Phase 2 - layout components"
```

---

## Phase 3-8: Remaining Implementation

The implementation plan continues with the same granular task structure for:

- **Phase 3**: Home Page sections (Hero, Stats, Products, Map, etc.)
- **Phase 4**: About & Products pages
- **Phase 5**: Export, Certifications, Blog, Contact pages
- **Phase 6**: RFQ multi-step form system
- **Phase 7**: SEO, Performance, Docker deployment
- **Phase 8**: Polish, accessibility, testing

Each phase follows the same pattern:
1. Create component files
2. Write the code
3. Test locally
4. Commit incrementally

---

## Next Steps

This plan covers Phases 1-2 in full detail. Phases 3-8 follow the same structure.

**To continue:** After completing Phase 2, request the detailed tasks for Phase 3 (Home Page) to proceed.
