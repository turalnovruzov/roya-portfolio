# Roya Portfolio - Application Architecture Documentation

**Generated:** 2025-01-28  
**Version:** Payload v3.53.0, Next.js v15.4.4

## Project Overview

A modern portfolio website for Roya Novruzova built with Payload CMS v3 and Next.js, featuring a comprehensive content management system with full-stack TypeScript architecture.

## Technology Stack

### Core Framework
- **CMS**: Payload v3.53.0 (headless CMS with admin panel)
- **Frontend**: Next.js 15.4.4 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v3 + shadcn/ui components

### Database & Storage
- **Database**: PostgreSQL via `@payloadcms/db-postgres`
- **Current Storage**: Local filesystem (`/public/media`) 
- **Target Storage**: Supabase Storage (per PRD)
- **Image Processing**: Sharp library

### Authentication & Security
- **Admin Auth**: Built-in Payload authentication
- **Session Management**: Payload JWT tokens
- **CORS**: Configured for localhost development

## Current Architecture

```
src/
├── collections/           # Payload collections (data models)
│   ├── Categories/       # Blog categories
│   ├── Media.ts          # File uploads & media management  
│   ├── Pages/            # CMS-managed pages
│   ├── Posts/            # Blog posts
│   └── Users.ts          # Admin users
├── globals/              # Site-wide settings
│   ├── Footer/           # Footer navigation
│   └── Header/           # Main navigation
├── blocks/               # Reusable content blocks
│   ├── ArchiveBlock/     # Post listings
│   ├── Banner/           # Hero sections
│   ├── CallToAction/     # CTA components
│   ├── Code/             # Code snippets
│   ├── Content/          # Rich text content
│   ├── Form/             # Form builder blocks
│   ├── MediaBlock/       # Image/video blocks
│   └── RelatedPosts/     # Related content
├── components/           # React components
│   ├── AdminBar/         # CMS editing toolbar
│   ├── Blocks/           # Block renderers
│   ├── Header/           # Site header
│   ├── Footer/           # Site footer
│   └── ui/               # shadcn/ui components
├── app/                  # Next.js App Router
│   ├── [slug]/           # Dynamic page routing
│   ├── posts/            # Blog routing
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── utilities/            # Helper functions
└── payload.config.ts     # Payload configuration
```

## Data Model - Current State

### Collections

#### 1. Pages Collection
```typescript
// Fields: title, hero, layout (blocks), SEO, publishedAt, slug
// Features: drafts, versioning, live preview
// Purpose: General CMS pages
```

#### 2. Posts Collection  
```typescript
// Fields: title, heroImage, content, categories, authors, relatedPosts
// Features: full blog functionality, SEO, drafts
// Purpose: Blog content management
```

#### 3. Media Collection
```typescript
// Fields: filename, alt, sizes (thumbnail → xlarge)
// Current: Local file storage in /public/media
// Issue: Needs Supabase Storage integration per PRD
```

#### 4. Categories Collection
```typescript
// Fields: title, slug
// Purpose: Blog post categorization
```

#### 5. Users Collection
```typescript
// Standard Payload user management for admin access
```

### Globals

#### 1. Header Global
```typescript
// Fields: navItems array (label, link)
// Purpose: Main site navigation
```

#### 2. Footer Global  
```typescript
// Fields: navItems array (label, link)
// Purpose: Footer navigation links
```

## Missing Components (Per PRD)

### Required Collections
- ❌ **Projects** - Core portfolio content (title, year, category, coverImage, gallery, slug)
- ❌ **SiteSettings** - Global site configuration (title, accent color, contact email)

### Required Frontend Pages
- ❌ Single-page home with Resume → Portfolio → Contact sections
- ❌ `/projects/[slug]` - Individual project detail pages
- ❌ Portfolio grid component for project listings

### Required Integrations
- ❌ Supabase Storage for media management
- ❌ Resend email service for contact form
- ❌ Pink accent color theming system

## Plugin Ecosystem

### Active Plugins
- **@payloadcms/plugin-form-builder** - Contact form creation ✅
- **@payloadcms/plugin-seo** - Meta tags and SEO ✅  
- **@payloadcms/plugin-search** - Content search functionality ✅
- **@payloadcms/plugin-redirects** - URL redirect management ✅
- **@payloadcms/plugin-nested-docs** - Hierarchical content ✅
- **@payloadcms/plugin-cloud** - Payload Cloud integration ✅

### Rich Text Features
- Lexical editor with comprehensive formatting
- Block-level content embedding
- Image and media insertion
- Code syntax highlighting

## Development Configuration

### Build System
- **Package Manager**: npm
- **TypeScript**: Strict mode with path aliases
- **Build Target**: Node.js 20+ 
- **Image Optimization**: Next.js Image component + Sharp

### Environment Variables
```bash
DATABASE_URI=postgresql://... (Supabase)
PAYLOAD_SECRET=... (JWT encryption)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=... (automated tasks)
PREVIEW_SECRET=... (draft previews)
```

### Scripts
```json
{
  "dev": "cross-env NODE_OPTIONS=\"--no-deprecation\" next dev",
  "build": "cross-env NODE_OPTIONS=\"--no-deprecation\" next build",
  "start": "cross-env NODE_OPTIONS=\"--no-deprecation\" next start",
  "generate:types": "payload generate:types",
  "payload": "payload"
}
```

## Database Schema

### Current Tables
- `pages` - CMS-managed pages
- `posts` - Blog content  
- `media` - File metadata (files stored locally)
- `categories` - Content categorization
- `users` - Admin accounts
- `payload_*` - CMS system tables

### Missing Tables (Per PRD)
- `projects` - Portfolio project data
- `site_settings` - Global site configuration

## API Endpoints

### Auto-Generated REST API
- `GET/POST /api/pages` - Page management
- `GET/POST /api/posts` - Blog content
- `GET/POST /api/media` - File uploads
- `GET/POST /api/categories` - Category management
- `GET/POST /api/users` - User management

### Auto-Generated GraphQL API
- Available at `/api/graphql`
- Full CRUD operations for all collections
- Type-safe queries and mutations
- Real-time subscriptions support

## Deployment Architecture

### Current Setup
- **Platform**: Vercel-ready Next.js application
- **Database**: PostgreSQL (Supabase connection configured)
- **Media Storage**: Local filesystem (needs Supabase migration)
- **Domain**: Ready for royanovruzova.com

### Production Requirements
- Environment variables in Vercel dashboard
- Supabase project configuration
- Resend API key for email functionality
- Domain DNS configuration

## Security & Performance

### Security Features
- JWT-based admin authentication
- CORS configuration
- Input validation via Payload schemas
- File upload restrictions and validation

### Performance Optimizations  
- Next.js Image optimization
- Sharp image processing
- Static generation where possible
- Tree-shaking and code splitting

## Development Workflow

### Local Development
1. `npm run dev` - Start development server
2. Visit `http://localhost:3000/admin` for CMS
3. `npm run generate:types` - Update TypeScript types
4. Database migrations handled automatically

### Content Management
- Admin panel at `/admin` route
- Draft/publish workflow for all collections
- Version history and rollback capability
- Live preview for pages

---

This documentation provides a complete picture of the current application state and serves as a reference for development planning and implementation.