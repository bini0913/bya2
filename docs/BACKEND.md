# Backend Plan — Supabase

## Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy URL and anon key to `.env.local` (see `.env.example`)
3. Run `supabase/migrations/001_initial.sql` in the SQL Editor
4. Deploy to Vercel with the same env vars

## Tables (Phase 1)

| Table | Purpose |
|-------|---------|
| `profiles` | User roles linked to `auth.users` |
| `news_articles` | CMS for `/news` |
| `admission_inquiries` | Admissions form submissions |
| `contact_messages` | Contact form submissions |

## Phase 2 — ERP Tables

- `students`, `classes`, `enrollments`
- `grades`, `assignments`, `submissions`
- `attendance_records`
- `fee_invoices`, `payments`
- `announcements`, `events`
- `messages` (parent–teacher)

## Auth & Roles

| Role | Portal route |
|------|----------------|
| `student` | `/portal/student` |
| `parent` | `/portal/parent` |
| `teacher` | `/dashboard/teacher` |
| `admin` | `/dashboard/admin` |

Middleware (`middleware.ts`) refreshes sessions. Add role guards in Phase 2:

```ts
// Example: protect /dashboard/admin
if (pathname.startsWith('/dashboard/admin') && profile.role !== 'admin') {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

## Storage Buckets

- `avatars` — profile photos
- `assignments` — student uploads
- `media` — gallery, news images

## Demo Mode

Without env vars, forms log to console and return success — ideal for local development and Vercel previews.
