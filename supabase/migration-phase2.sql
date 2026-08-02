-- TryThisPlay Phase 2: run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- Purchases: one row per completed order line
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null,
  product_title text not null,
  amount_cents integer not null,
  currency text not null default 'usd',
  stripe_session_id text unique,
  stripe_payment_intent text,
  status text not null default 'completed' check (status in ('completed','refunded')),
  created_at timestamptz not null default now(),
  unique (user_id, product_slug)
);

-- Lesson progress: tracks which lessons a customer marked complete
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null,
  lesson_index integer not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, product_slug, lesson_index)
);

alter table public.purchases enable row level security;
alter table public.lesson_progress enable row level security;

-- Customers can read their own purchases; only the server (service role,
-- via the Stripe webhook) can insert them.
create policy "read own purchases" on public.purchases
  for select using (auth.uid() = user_id);

-- Customers manage their own lesson progress
create policy "read own progress" on public.lesson_progress
  for select using (auth.uid() = user_id);
create policy "insert own progress" on public.lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "delete own progress" on public.lesson_progress
  for delete using (auth.uid() = user_id);
