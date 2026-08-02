# Phase 2 Setup: Accounts, Checkout & Customer Library

Phase 2 adds real functionality, so it needs two free external accounts
(Supabase and Stripe) plus environment variables in Vercel. Follow these in
order — total setup is roughly 30 minutes.

## What Phase 2 adds

- Passwordless login (email magic links) via Supabase
- Stripe Checkout: Buy Now buttons create real payment sessions
- Stripe webhook that records purchases and grants library access
- Private customer library at `/library/` with entitlement checks
- Lesson viewer with progress tracking and next/previous navigation
- Mux video playback slot (activates per-lesson once videos exist)
- Account page with purchase history and sign-out

## Step 1 — Supabase (database + login)

1. Create a free account at supabase.com and create a new project
   (any name, e.g. `trythisplay`). Choose a strong database password and save it.
2. In the project: **SQL Editor → New query**, paste the entire contents of
   `supabase/migration-phase2.sql` from this repo, and click **Run**.
3. In **Authentication → URL Configuration**, set:
   - Site URL: `https://YOUR-VERCEL-DOMAIN` (your production URL)
   - Add redirect URL: `https://YOUR-VERCEL-DOMAIN/auth/callback/**`
   - Also add `http://localhost:4321/auth/callback/**` for local testing
4. In **Project Settings → API**, copy three values:
   - Project URL
   - `anon` public key
   - `service_role` key (keep this one secret — it bypasses security rules)

## Step 2 — Stripe (payments)

1. Create an account at stripe.com. Stay in **Test mode** (toggle in the
   dashboard) until you're ready for real money.
2. **Developers → API keys**: copy the **Secret key** (starts `sk_test_`).
3. **Developers → Webhooks → Add endpoint**:
   - Endpoint URL: `https://YOUR-VERCEL-DOMAIN/api/webhooks/stripe`
   - Events: select `checkout.session.completed`
   - After creating it, copy the **Signing secret** (starts `whsec_`).

## Step 3 — Environment variables in Vercel

In Vercel: your project → **Settings → Environment Variables**. Add these six
(Production, and Preview if you want):

| Name | Value |
|---|---|
| `PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

For local dev, create a `.env` file in the project root with the same five
lines in `NAME=value` format. `.env` is gitignored — never commit it.

## Step 4 — Deploy

Push this code to GitHub (Vercel redeploys automatically). The build now
includes the Vercel adapter, so server routes (login, checkout, webhooks,
library) run as serverless functions while all public pages stay static.

## Step 5 — Test the full flow (Stripe test mode)

1. To have something purchasable, temporarily edit
   `src/content/ebooks/sample-gun-bunch-offense-guide.md`:
   set `published: true`. Push. (Revert before real launch.)
2. Visit `/login/`, enter your email, click the link Supabase sends you.
   You should land in an empty `/library/`.
3. Go to the sample product page and click **Buy Now**. On the Stripe page use
   test card `4242 4242 4242 4242`, any future expiry, any CVC and ZIP.
4. You'll land on the success page; within a few seconds the webhook records
   the purchase. Open `/library/` — the product should be there.
5. Open it: check lesson navigation, Mark Complete, and the progress bar.

If the purchase never appears in the library, check
**Stripe → Developers → Webhooks → your endpoint → Logs** for errors — the
most common cause is a wrong `STRIPE_WEBHOOK_SECRET`.

## Security notes

- Prices are read server-side from the catalog; the browser only ever sends a
  product slug, so prices can't be tampered with.
- The webhook verifies Stripe's cryptographic signature before trusting
  anything.
- Purchases can only be written by the server (service role); customers can
  only read their own rows (row-level security).
- Library pages check ownership on every request.

## What's still ahead

- **Phase 3** — Creator portal: invitations, video upload to Mux,
  transcript + written-setup generation, product submission
- **Phase 4** — Admin review: approval queues, catalog management, payouts
- **Phase 5** — Franchise features: league data, standings, applications,
  Discord role automation (needs your Discord servers + a bot)
- **Phase 6** — Polish: analytics, monitoring, performance, launch QA
