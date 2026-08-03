-- Phase 5: working contact form + structured creator applications.
-- Both tables are default-deny (RLS on, no policies): all reads/writes happen
-- through the service role in server endpoints, same pattern as admin_users.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  gamertag text,
  inquiry_type text not null,
  order_number text,
  message text not null,
  status text not null default 'new' check (status in ('new','handled')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;

create table if not exists public.creator_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  gamertag text not null,
  discord text,
  socials text[] not null default '{}',
  experience text not null,
  content_links text[] not null default '{}',
  category text not null check (category in ('offense','defense','franchise')),
  audience_size text,
  product_concept text not null,
  status text not null default 'new' check (status in ('new','reviewed','invited','rejected')),
  created_at timestamptz not null default now()
);
alter table public.creator_applications enable row level security;
