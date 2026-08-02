# SETUP — Phase 4: Admin Review & Management

Operator steps for Phase 4. Code is deployed; these are DB/dashboard steps.

## 1. Run the migration
Supabase → SQL Editor → run `supabase/migration-phase4.sql`. Additive; safe to
re-run. Adds `admin_users`, `payouts`, and refund columns on `purchases`.

## 2. Make yourself an admin (no self-service signup)
```sql
select id, email from auth.users order by created_at desc;

insert into public.admin_users (user_id, role)
values ('<YOUR-AUTH-USER-ID>', 'admin')
on conflict (user_id) do nothing;
```
Then open `/admin/`. Non-admins are redirected to `/` (the section isn't revealed).

Roles: `admin` (full) or `reviewer`. Both can access `/admin/` in this build.

## 3. Email notifications (Resend) — optional but recommended
Decision emails (published / changes requested / rejected) and the "your ebook is
ready" purchase email send via Resend. Without the key they're safe no-ops.

- Resend → verify `trythisplay.com` (SPF/DKIM) → create an API key.
- Add to Vercel:
  - `RESEND_API_KEY`
  - `EMAIL_FROM` e.g. `Try This Play <no-reply@trythisplay.com>`
- Redeploy.

(If you already set up Resend as Supabase SMTP in Phase 2.5, that's for auth
emails; this `RESEND_API_KEY` is for app transactional email — same account,
same/another key.)

## 4. Stripe refund webhook
So refunds initiated from the **Stripe dashboard** sync back to library access,
add `charge.refunded` to your Stripe webhook events (Stripe → Developers →
Webhooks → your endpoint → add event). Admin-initiated refunds (from
`/admin/orders/`) already update the DB directly.

## 5. What's live in /admin/
- **Dashboard** — pending submissions, published, active creators, 7-day sales.
- **Submissions** — queue + detail with playable lessons (signed), written setups,
  transcripts. Approve → Publish (separate), Request Changes (comment to creator),
  Reject. Decision emails sent.
- **Products** — filter by status, feature/unfeature, archive/unarchive.
- **Orders** — search, refund (Stripe + entitlement removal).
- **Creators** — suspend/reactivate, revenue-share %, create invitations (token link).

## 6. Payouts (Phase 4.4) — DECISION NEEDED
Two modes (per spec). Not built yet — pending your choice:

- **A. Full Stripe Connect (Express):** creators onboard from their dashboard
  ("Set up payouts"), checkout adds transfer groups, a payout run creates real
  Stripe Transfers (creator share = amount × revenue_share_bps ÷ 10000). Needs
  Connect enabled on your Stripe account.
- **B. Ledger only:** compute + display earnings and payout history, create
  `payouts` rows as `pending`, mark "paid manually" in admin. No money movement.
  (Transfers can be added later behind an env flag.)

Tell the builder which mode to implement.
