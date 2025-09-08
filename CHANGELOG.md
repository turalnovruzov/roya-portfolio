# Changelog

All notable changes to the Roya Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-09

### Added
- Initial portfolio website setup with Payload CMS v3
- Projects collection for portfolio content management
- Single-page architecture with Resume → Portfolio → Contact sections
- Homepage with project grid display showing project cards with cover images, titles, years, and categories
- Project detail pages accessible at `/projects/[slug]` routes
- Contact form functionality with email integration
- Vercel Analytics integration for usage tracking
- Light mode color theme system with pink accent color
- PostgreSQL database integration via Supabase
- Responsive design using CSS Grid for project layouts
- SEO optimization through Payload CMS plugin
- Form builder capabilities through Payload CMS plugin
- Search functionality through Payload CMS plugin
- URL redirect management through Payload CMS plugin
- Nested document structure support through Payload CMS plugin

### Technical Stack
- **CMS**: Payload v3.53.0 with admin panel
- **Frontend**: Next.js 15.4.4 (App Router)
- **Runtime**: React 19.1.0  
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Database**: PostgreSQL via Supabase
- **Storage**: Local filesystem (Supabase Storage planned)
- **Deployment**: Vercel-ready configuration
- **Image Processing**: Sharp library with Next.js Image optimization

### Collections Implemented
- **Projects**: Core portfolio content with title, year, category, slug, description, cover image, and gallery
- **Pages**: CMS-managed pages with blocks and SEO
- **Posts**: Blog content management system
- **Media**: File upload and management system
- **Categories**: Content categorization system
- **Users**: Admin authentication and user management

### Features Implemented  
- Admin panel accessible at `/admin` route
- Draft/publish workflow for content management
- Version history and rollback capabilities
- Live preview functionality for pages
- Responsive image handling with multiple size variants
- Cross-environment configuration support
- Development and production build optimization

### Development Workflow
- Local development server with hot reloading
- TypeScript type generation for Payload collections
- ESLint configuration with Next.js best practices
- Prettier code formatting
- Testing setup with Vitest and Playwright
- Docker configuration for containerized deployment

[0.1.0]: https://github.com/turalnovruzov/roya-portfolio/releases/tag/v0.1.0