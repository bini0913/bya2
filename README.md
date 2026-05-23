# Boriyad Youth Academy (BYA)

Premium KG–Grade 12 school website and future-ready school management platform.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** + Framer Motion
- **Supabase** (Auth, Database, Storage)
- **React Hook Form** + Zod
- **Recharts** · **Zustand**

## Languages

The site supports three languages via the header switcher:

| Code | Language |
|------|----------|
| `en` | English — http://localhost:3000/en |
| `om` | Afaan Oromoo — http://localhost:3000/om |
| `am` | አማርኛ — http://localhost:3000/am |

Translation files live in `messages/en.json`, `messages/om.json`, and `messages/am.json`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

**All local URLs:** see [docs/LOCALHOST.md](docs/LOCALHOST.md).

### Local troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | Stop other Node processes, or use the port shown in the terminal (e.g. 3001) |
| Blank page / ENOENT errors | Run `npm run dev:clean` to clear `.next` and restart |
| Wrong language URL | Use `/en`, `/om`, or `/am` prefixes (e.g. `/om/about`) |

Ensure `.env.local` exists with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

### Environment (optional)

Copy `.env.example` to `.env.local` and add Supabase credentials. Without them, the site runs in **demo mode** — forms succeed locally without a database.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage (11 sections) |
| `/about` | Mission, story, stats |
| `/academics` | Programs & curriculum |
| `/admissions` | Process + inquiry form |
| `/student-life` | Campus activities |
| `/gallery` | Photo gallery |
| `/results` | Exam outcomes & chart |
| `/news` | News & events |
| `/contact` | Contact form |

## Portals (scaffolded)

- `/portal/student` · `/portal/parent`
- `/dashboard/teacher` · `/dashboard/admin`

See `docs/PORTALS.md` and `docs/BACKEND.md` for ERP expansion plans.

## Deploy

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add env vars from `.env.example`
4. Run `supabase/migrations/001_initial.sql` in Supabase

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — System design
- [`docs/BACKEND.md`](docs/BACKEND.md) — Supabase setup
- [`docs/PORTALS.md`](docs/PORTALS.md) — Portal roadmap
