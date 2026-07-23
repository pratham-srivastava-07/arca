# Deploying Arca

Arca is a Next.js 15 app using Clerk (auth), Postgres via Prisma (data),
Resend (renewal emails), and a Vercel Cron (daily billing rollover). Vercel is
the intended host.

---

## The one thing that will bite you: Clerk needs a real domain

**Clerk *development* keys (`pk_test_` / `sk_test_`) only work on `localhost`.**
They do **not** work on a deployed URL — not even a `*.vercel.app` one. If you
deploy with dev keys, every auth request fails with a CORS error like:

> Access to fetch at `https://<slug>.clerk.accounts.dev/...` from origin
> `https://your-app.vercel.app` has been blocked by CORS policy

A working public deployment therefore requires a **Clerk production instance**,
and a production instance requires a **domain you control** (to add the CNAME +
DKIM records Clerk needs). `*.vercel.app` is rejected — it has to be your own
domain (a subdomain like `app.yourdomain.com` is fine).

- **Local development:** dev keys on `localhost:3000` — works fully, Google included.
- **Public launch:** custom domain + production keys. No shortcut.

---

## Prerequisites (free tiers are fine)

- A GitHub repo connected to **Vercel**
- A **Neon** Postgres database — https://neon.tech
- A **Clerk** application — https://dashboard.clerk.com
- A **Resend** account — https://resend.com
- A **custom domain** (only for public launch, ~$12/yr)

---

## 1. Database (Neon)

1. Create a Neon project, copy the **pooled** connection string.
2. Push the schema (no migrations exist; `db push` is the whole step):
   ```bash
   DATABASE_URL="<neon-pooled-url>" npx prisma db push
   ```
   Seeding is optional and unnecessary in production — users create their own data.

## 2. Clerk

### For a public launch (production instance)
1. Buy a domain and add it to your Vercel project (**Settings → Domains**).
2. In Clerk, switch the environment selector to **Production** and create the
   instance on **your domain** (not `*.vercel.app`).
3. Add the DNS records Clerk shows you (CNAME for the Frontend API, DKIM for email).
4. Copy the **`pk_live_` / `sk_live_`** keys (Clerk → **API keys**).
5. **Google sign-in:** production needs your own Google OAuth credentials
   (Google Cloud Console → OAuth client ID) pasted into Clerk's Google
   connection. Email sign-in works without this.

### For local testing only
Use the **`pk_test_` / `sk_test_`** keys on `localhost:3000`. Don't deploy these.

## 3. Resend

1. Get an API key (Resend → **API keys**).
2. `RESEND_FROM` must use a **verified domain** in production. Until you verify
   one, `onboarding@resend.dev` only delivers to your own address — fine for
   testing, not for real users.

## 4. Vercel — environment variables

Set these under **Settings → Environment Variables** (Production):

| Key | Value |
|---|---|
| `DATABASE_URL` | Neon pooled connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_…` (prod) |
| `CLERK_SECRET_KEY` | `sk_live_…` (prod) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/signin` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/signup` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/onboarding` |
| `RESEND_API_KEY` | `re_…` |
| `RESEND_FROM` | `Arca <you@yourdomain.com>` (verified) |
| `CRON_SECRET` | long random string, e.g. `openssl rand -hex 32` |

> The Clerk sign-in/up URLs are `/signin` and `/signup` (not `/sign-in`).
> Using the hyphenated form breaks auth redirects.

## 5. Deploy

Push to the default branch (Vercel deploys from it). The build script runs
`prisma generate` automatically. Confirm:

- Landing renders (light, mountains animate)
- Sign up → onboarding → dashboard works
- **Cron Jobs** tab shows `/api/cron/daily` (runs 03:00 UTC daily; the manual
  "Run" button should return `{ ok: true }`)

---

## Notes

- The default branch must contain the UI work. If your latest work is on a
  feature branch, merge it to the default branch (or point Vercel's production
  branch at that branch) before deploying.
- `app/dev/*-preview` routes return 404 in production automatically — safe to leave in.
- The marketing/auth pages are locked to the light theme via a `force-light`
  scope, so they stay on-brand regardless of a viewer's saved app theme.
