# Boriyad Youth Academy — System Architecture

## Vision

A **marketing-first public site** (cinematic, prestigious) that evolves into a **multi-tenant school ERP** on Supabase with role-based portals for students, parents, teachers, and administrators.

## Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│  Presentation (Next.js 15 App Router)                       │
│  • Public marketing routes                                  │
│  • Authenticated portal layouts (student/parent/teacher)    │
│  • Admin dashboard (dashboard/)                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  Application (services/, hooks/)                            │
│  • Domain services (admissions, news, academics)              │
│  • Auth session + role guards                               │
│  • Form validation (Zod)                                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  Data (Supabase)                                            │
│  • PostgreSQL + RLS                                         │
│  • Auth (email, OAuth future)                               │
│  • Storage (media, documents)                               │
└─────────────────────────────────────────────────────────────┘
```

## Folder Structure

| Path | Responsibility |
|------|----------------|
| `app/` | Routes, layouts, metadata, sitemap |
| `app/(marketing)/` | Public pages sharing SiteHeader/Footer |
| `app/(portal)/` | Student & parent portals (shared auth shell) |
| `app/dashboard/` | Teacher & admin dashboards |
| `components/ui/` | Design system primitives (shadcn-style) |
| `components/layout/` | Header, footer, section shells |
| `components/sections/` | Page-specific composed sections |
| `components/motion/` | Framer Motion wrappers |
| `lib/` | Constants, SEO helpers, utils |
| `hooks/` | Client hooks (scroll, media, auth) |
| `types/` | TypeScript domain + DB types |
| `services/` | Supabase/data access layer |
| `animations/` | Shared motion variants |
| `supabase/` | Client, migrations, types |
| `public/` | Static assets, OG images |

## Routing Strategy

### Phase 1 — Public (current)

- `/` — Homepage (11 sections)
- `/about`, `/academics`, `/admissions`, `/student-life`, `/gallery`, `/results`, `/news`, `/contact`

### Phase 2 — Portals (placeholders)

- `/portal/student` — Results, assignments, schedule, announcements
- `/portal/parent` — Grades, attendance, payments, notifications
- `/dashboard/teacher` — Marks, assignments, attendance
- `/dashboard/admin` — Full ERP modules

### Phase 3 — API & middleware

- `middleware.ts` — Route protection by role (`student`, `parent`, `teacher`, `admin`)
- `app/api/` — Webhooks, form submissions, cron (future)

## State Management

| Concern | Solution |
|---------|----------|
| Server data | React Server Components + Supabase server client |
| Auth session | Supabase SSR cookies |
| UI chrome (nav open, theme) | Zustand (`lib/stores/ui-store.ts`) — optional |
| Forms | React Hook Form + Zod |

## Performance

- `next/image` for all raster assets
- Lazy `loading="lazy"` on below-fold video
- Framer Motion: `viewport={{ once: true }}`, reduced motion media query
- Section code-split via dynamic import where needed

## Deployment

- **Vercel** — Preview + production
- **Supabase** — Separate project per environment
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only)

## SEO

- Central `lib/seo.ts` + per-page `generateMetadata`
- JSON-LD (`EducationalOrganization`) in root layout
- `app/sitemap.ts`, `app/robots.ts`

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- Focus-visible styles on interactive elements
- `prefers-reduced-motion` disables parallax/heavy animation

## Extension Points

1. **i18n** — Oromo, Amharic, English (logo already trilingual)
2. **CMS** — Supabase tables or headless CMS for news/events
3. **Payments** — Chapa/Telebirr integration in parent portal
4. **Realtime** — Supabase Realtime for messaging/notifications
