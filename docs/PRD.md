# Overview

A minimal, image‑first architecture portfolio for Roya Novruzova. MVP focuses on fast loading, simple editing via Payload CMS, and a straightforward presentation suitable for feedback and iteration.

## Goals

* Publish a clean portfolio with **minimal copy** and **project imagery**.
* Author content through **Payload admin**; store assets in **Supabase Storage**.
* Host the single application on **Vercel** with **Supabase Postgres** as DB.
* Provide a simple **contact form** (via Resend) that emails submissions.

## Non‑Goals (MVP)

* No public user authentication or dashboards.
* No analytics, tracking, or cookie banners.
* No scheduled tasks/cron, background workers, or real‑time features.
* No legal pages (Privacy/ToS) for MVP.
* No complex galleries (masonry/lightbox) or heavy UI libraries.

---

# Scope (MVP)

## Tech & Hosting

* **App shape**: Single app created with `npx create-payload-app` (already running locally).
* **Hosting target**: Vercel (single environment for now).
* **Database**: Supabase Postgres (connection already configured).
* **File storage**: Supabase Storage for uploads (images, PDFs if needed).
* **Runtime**: Next.js + Payload within the same project.

## UI/UX

* **Styling**: Tailwind CSS.
* **Optional components**: shadcn/ui **only if necessary** (keep usage minimal).
* **Branding**: Black/white base with a pink accent. Fonts TBD (system/default for MVP).
* **Accessibility**: Rely on default semantics and focus styles from Tailwind; revisit after feedback.

## Content Model (Payload)

* **Projects** (MVP):

  * Fields: title, year, category, slug, shortDescription (1–2 short paragraphs), coverImage, gallery\[] (ordered, alt text optional for MVP), tags (optional), featured (bool optional).
* **SiteSettings** (MVP):

  * Fields: siteTitle, accentColor (pink), navigation order (used for in‑page sections), contact email.
* **Publications**: *Out of MVP* (placeholder to be added later if needed).
* **Editorial workflow**: Minimal — publish on save (no drafts/versioning in MVP).

## Pages & Routing

* **Home** (`/`): single‑page scroll with sections in order: **Resume → Portfolio → Contact**.

  * **Resume section**: brief bio/education + link to PDF CV (optional in MVP).
  * **Portfolio section**: responsive grid of Project cards (CSS Grid). Card shows cover image, title, year, category.
  * **Contact section**: simple form (name, email, message) → sends via Resend.
* **Project detail** (`/projects/[slug]`): simple page with title, year/category, shortDescription, and stacked images (no modal/lightbox in MVP).

## Forms & Email

* **Contact**: POST to Next.js route, server‑side call to **Resend** to deliver email to configured recipient (from SiteSettings).
* **Spam prevention**: None in MVP (add hCaptcha later if needed).

## Media Handling

* Uploads stored in **Supabase Storage**.
* Frontend uses `next/image` for responsive images (default blur placeholder; WebP/AVIF where supported).
* Basic size guidance (content only, not enforced): 1600–2000px wide for hero/cover images.

## Environments & Ops

* **Environments**: Single **Production** environment (for now). Dev/Preview to be added later.
* **Environment variables** (names indicative; exact values managed outside repo):

  * `DATABASE_URL` (Supabase Postgres)
  * `PAYLOAD_SECRET`
  * `RESEND_API_KEY`
  * `NEXT_PUBLIC_SITE_URL` (e.g., [https://royanovruzova.com](https://royanovruzova.com))
  * Supabase Storage credentials/bucket settings as required by the chosen adapter
* **Backups**: Rely on Supabase’s default backups for DB and Storage at this stage.
* **Domains**: Primary domain **royanovruzova.com** (apex and www redirect behavior configured in Vercel after MVP).

---

# Acceptance Criteria (MVP)

1. **CMS + DB**: Admin can log in to Payload, create at least 1 Project with cover image + 3+ gallery images, and publish it.
2. **Portfolio grid**: Home page shows the project card(s) with correct imagery, title, year, and category. Grid is responsive without extra libraries.
3. **Project detail**: Clicking a project navigates to `/projects/[slug]` and displays the project content and images.
4. **Contact form**: Submits and delivers an email via Resend to the configured recipient; shows success/failure feedback to the user.
5. **Media**: Images load via `next/image` and are served from Supabase Storage.
6. **Deploy**: Site builds and serves on Vercel under a preview or production URL; environment variables are set and functional.

---

# Risks & Notes

* Supabase cold starts and free‑tier limits may introduce small delays after idle; acceptable for MVP.
* If imagery volume/transfer grows, we may revisit Storage/CDN choices later.
* Publications, drafts/versioning, advanced galleries, analytics, legal pages, and additional environments are intentionally **out of scope** for MVP and will be scheduled after stakeholder feedback.

---

# Change Control

This PRD documents **approved decisions only**. Any feature or dependency not listed here is **out of scope** and requires explicit approval before implementation.
