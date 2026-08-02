-- ============================================================================
-- TryThisPlay Phase 3 fixes (creator editor refinements). Additive; safe re-run.
-- ============================================================================

-- Editable per-ebook author/creator display name (overrides creators.display_name).
alter table public.products add column if not exists author_name text;

-- Written setup now supports MULTIPLE plays per lesson. We keep the existing
-- `written_setup` jsonb for backward compat and add `plays` jsonb array where
-- each element is { play, audibles[], pre_snap[], reads[], notes } under one
-- formation. formation lives at the lesson level.
alter table public.lessons add column if not exists formation text;
alter table public.lessons add column if not exists plays jsonb not null default '[]'::jsonb;
