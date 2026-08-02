-- ============================================================================
-- TryThisPlay Phase 4: Admin Review & Management
-- Run in Supabase SQL Editor. Additive only. Safe to re-run.
--
-- Adds: admin_users, payouts. Extends purchases (refund fields).
-- Admin access is not self-service — insert the founder row manually (below).
-- ============================================================================

-- ── admin_users ─────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin','reviewer')),
  created_at timestamptz not null default now()
);

-- ── payouts (Phase 4.4 ledger; Stripe Connect optional) ─────────────────────
create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators(id) on delete cascade,
  period text,                                   -- e.g. '2026-08' or a run id
  amount_cents int not null default 0,
  stripe_transfer_id text,
  status text not null default 'pending' check (status in ('pending','paid','failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists payouts_creator_idx on public.payouts(creator_id);

-- ── purchases: refund + payout tracking ─────────────────────────────────────
alter table public.purchases add column if not exists refunded_at timestamptz;
alter table public.purchases add column if not exists stripe_refund_id text;
alter table public.purchases add column if not exists payout_id uuid references public.payouts(id);
-- allow 'refunded' status already exists in the Phase 2 check; keep as-is.

-- ============================================================================
-- RLS
-- ============================================================================
alter table public.admin_users enable row level security;
alter table public.payouts enable row level security;

-- admin_users: default-deny. Reads/writes happen only via service role in
-- verified admin endpoints (requireAdmin). No permissive policies = locked down.

-- payouts: a creator may read their own payout rows (earnings history). Writes
-- are service-role only (admin payout run).
drop policy if exists "payouts creator read own" on public.payouts;
create policy "payouts creator read own" on public.payouts
  for select using (creator_id = auth.uid());

-- ============================================================================
-- SEED THE FOUNDER ADMIN (edit the id, then run):
--   select id, email from auth.users order by created_at desc;
--   insert into public.admin_users (user_id, role)
--   values ('<YOUR-AUTH-USER-ID>', 'admin')
--   on conflict (user_id) do nothing;
-- ============================================================================
