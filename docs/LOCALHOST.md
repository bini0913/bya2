# Local development URLs

Dev server (always port **3000**):

```bash
npm run dev
```

## Public site

| Page | URL |
|------|-----|
| Home (redirects to English) | http://localhost:3000/ |
| English | http://localhost:3000/en |
| Afaan Oromoo | http://localhost:3000/om |
| Amharic | http://localhost:3000/am |
| Apply for admission | http://localhost:3000/en/admissions/apply |
| Admissions info | http://localhost:3000/en/admissions |
| Contact | http://localhost:3000/en/contact |

## Admin (not linked on public site)

| Page | URL |
|------|-----|
| Sign in | http://localhost:3000/admin-login |
| Dashboard | http://localhost:3000/admin |
| Applications | http://localhost:3000/admin/applications |

## Environment (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Auth redirect URLs

In Supabase → Authentication → URL configuration, add:

- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** `http://localhost:3000/**`

## Same Wi‑Fi (phone/tablet)

Use the **Network** URL from the terminal, e.g. `http://192.168.x.x:3000/en`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npm run dev:clean` or stop other Node processes |
| Wrong port in links | Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` |
| Admin auth fails | Add Supabase keys + set `profiles.role = 'admin'` |
| Forms work without Supabase | Demo mode logs to console; add keys for real storage |
