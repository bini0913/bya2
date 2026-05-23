# BYA Admissions System

Premium public admissions flow with a hidden admin portal. This is **not** an ERP, student portal, or teacher dashboard.

## Routes

| Route | Purpose |
|-------|---------|
| `/[locale]/admissions/apply` | Multi-step application form |
| `/[locale]/admissions/apply/success?ref=BYA-2026-0001` | Confirmation + reference ID |
| `/admin-login` | Supabase Auth (not linked publicly) |
| `/admin` | Dashboard |
| `/admin/applications` | Application list + filters |
| `/admin/applications/[id]` | Application detail + actions |

## Supabase setup

1. Run migrations in order:
   - `supabase/migrations/001_initial.sql`
   - `supabase/migrations/002_applications.sql`

2. Create storage bucket `applications-documents` (private).

3. Create an admin user in Supabase Auth and set `profiles.role = 'admin'` for that user.

4. Environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Reference IDs

Generated via RPC `next_application_reference()` → `BYA-YYYY-####` (e.g. `BYA-2026-0012`).

## Email (future)

`services/email.service.ts` exposes `prepareApprovalEmail` and `prepareRejectionEmail`. SMTP is not wired yet; calls log payloads for later integration.

## Demo mode

Without Supabase env vars, applications log to the console and reference IDs use client-side demo generation. Admin UI is accessible after `/admin-login` (auth skipped when Supabase is unset).
