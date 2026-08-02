-- ============================================================================
-- TryThisPlay Phase 3: Creator Portal
-- Run in Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Additive only — does not alter Phase 2 tables (purchases, lesson_progress).
--
-- Adds: creators, creator_invitations, products, lessons, submissions.
-- The purchasable catalog moves from src/content/ebooks/ markdown to the
-- `products` table (creators author products at runtime). Public storefront
-- reads status='published' rows; drafts are private via RLS.
-- ============================================================================

-- ── helper: updated_at trigger ──────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ── creators ────────────────────────────────────────────────────────────────
create table if not exists public.creators (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  gamertag text,
  bio text,
  specialties text[] not null default '{}',
  socials jsonb not null default '{}'::jsonb,
  avatar_url text,
  revenue_share_bps int not null default 7000,   -- 70% to creator
  stripe_account_id text,                         -- Phase 4 payouts (Connect)
  status text not null default 'active' check (status in ('active','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_creators_updated on public.creators;
create trigger trg_creators_updated before update on public.creators
  for each row execute function public.set_updated_at();

-- ── creator_invitations ─────────────────────────────────────────────────────
create table if not exists public.creator_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token text not null unique,
  invited_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  accepted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists creator_invitations_token_idx on public.creator_invitations(token);
create index if not exists creator_invitations_email_idx on public.creator_invitations(lower(email));

-- ── products (the catalog) ──────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null default '',
  full_description text,
  seo_title text,
  seo_description text,
  category text not null default 'offense' check (category in ('offense','defense','franchise')),
  styles text[] not null default '{}',            -- competitive|simulation
  playbook text,
  formation text,
  difficulty text not null default 'beginner' check (difficulty in ('beginner','intermediate','advanced')),
  platforms text[] not null default '{PlayStation 5,Xbox Series X|S}',
  price_cents int not null default 0 check (price_cents >= 0 and price_cents <= 50000),
  cover_image_url text,
  cover_image_alt text,
  creator_id uuid not null references public.creators(id) on delete cascade,
  current_madden_version text not null default 'Madden 27',
  what_you_will_learn text[] not null default '{}',
  who_this_is_for text[] not null default '{}',
  discord_role_id text,                           -- Phase 5 product-owner role
  status text not null default 'draft'
    check (status in ('draft','submitted','changes_requested','approved','published','archived')),
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_status_idx on public.products(status);
create index if not exists products_creator_idx on public.products(creator_id);
create index if not exists products_featured_idx on public.products(featured) where featured;
drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated before update on public.products
  for each row execute function public.set_updated_at();

-- ── lessons ─────────────────────────────────────────────────────────────────
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sort_order int not null default 0,
  title text not null default '',
  description text,
  runtime_seconds int,
  free_preview boolean not null default false,
  mux_upload_id text,
  mux_asset_id text,
  mux_playback_id text,
  transcript text,
  written_setup jsonb,        -- {formation, play, audibles[], pre_snap[], reads[], counters[], notes}
  written_setup_approved_at timestamptz,
  transcribe_count int not null default 0,        -- simple per-hour rate-limit source
  last_transcribe_at timestamptz,
  status text not null default 'uploading'
    check (status in ('uploading','processing','ready','error')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists lessons_product_idx on public.lessons(product_id);
create index if not exists lessons_upload_idx on public.lessons(mux_upload_id);
create index if not exists lessons_asset_idx on public.lessons(mux_asset_id);
drop trigger if exists trg_lessons_updated on public.lessons;
create trigger trg_lessons_updated before update on public.lessons
  for each row execute function public.set_updated_at();

-- ── submissions ─────────────────────────────────────────────────────────────
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  submitted_at timestamptz not null default now(),
  decided_at timestamptz,
  decision text check (decision in ('approved','changes_requested','rejected')),
  reviewer_id uuid references auth.users(id) on delete set null,
  comments jsonb not null default '[]'::jsonb,   -- [{lesson_id?, field?, message, created_at, author_id}]
  created_at timestamptz not null default now()
);
create index if not exists submissions_product_idx on public.submissions(product_id);
create index if not exists submissions_open_idx on public.submissions(decided_at) where decided_at is null;

-- ── link Phase 2 purchases to products going forward ────────────────────────
alter table public.purchases add column if not exists product_id uuid references public.products(id);

-- ============================================================================
-- RLS
-- ============================================================================
alter table public.creators enable row level security;
alter table public.creator_invitations enable row level security;
alter table public.products enable row level security;
alter table public.lessons enable row level security;
alter table public.submissions enable row level security;

-- creators: a user reads/updates only their own creator row.
drop policy if exists "creators read own" on public.creators;
create policy "creators read own" on public.creators
  for select using (auth.uid() = id);
drop policy if exists "creators update own" on public.creators;
create policy "creators update own" on public.creators
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- products: public can read PUBLISHED products (storefront). Creators read +
-- write only their own (any status). Service role bypasses RLS for admin/webhook.
drop policy if exists "products public read published" on public.products;
create policy "products public read published" on public.products
  for select using (status = 'published');
drop policy if exists "products creator read own" on public.products;
create policy "products creator read own" on public.products
  for select using (creator_id = auth.uid());
drop policy if exists "products creator insert own" on public.products;
create policy "products creator insert own" on public.products
  for insert with check (creator_id = auth.uid());
drop policy if exists "products creator update own" on public.products;
create policy "products creator update own" on public.products
  for update using (creator_id = auth.uid()) with check (creator_id = auth.uid());

-- lessons: readable if the parent product is published (for free-preview and
-- purchaser playback the server uses service role / signed tokens), or if the
-- requester owns the parent product. Creators manage lessons on their products.
drop policy if exists "lessons public read published" on public.lessons;
create policy "lessons public read published" on public.lessons
  for select using (
    exists (select 1 from public.products p
            where p.id = lessons.product_id and p.status = 'published')
  );
drop policy if exists "lessons creator all own" on public.lessons;
create policy "lessons creator all own" on public.lessons
  for all using (
    exists (select 1 from public.products p
            where p.id = lessons.product_id and p.creator_id = auth.uid())
  ) with check (
    exists (select 1 from public.products p
            where p.id = lessons.product_id and p.creator_id = auth.uid())
  );

-- submissions: creators read submissions for their own products. Writes happen
-- server-side (service role) on submit/decide.
drop policy if exists "submissions creator read own" on public.submissions;
create policy "submissions creator read own" on public.submissions
  for select using (
    exists (select 1 from public.products p
            where p.id = submissions.product_id and p.creator_id = auth.uid())
  );

-- creator_invitations: no anon/user access at all (token lookup + redemption is
-- server-side via service role). Default-deny (RLS on, no permissive policies).
