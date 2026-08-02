# SETUP — Phase 3: Creator Portal

Operator (human) steps for Phase 3. Code is deployed; these are DB/dashboard steps.

## 1. Run the migration
Supabase → **SQL Editor → New query** → paste and run
`supabase/migration-phase3.sql`. It's additive (does not touch Phase 2 tables)
and creates: `creators`, `creator_invitations`, `products`, `lessons`,
`submissions`, plus RLS. Safe to re-run.

## 2. Create the first creator invitation (until Phase 4 admin ships)
The portal is invitation-only. Redemption lives at `/creator/accept/[token]/`.
Insert an invitation manually in the SQL Editor, then send the link.

```sql
-- Generate a random token and a 14-day expiry for a specific email.
insert into public.creator_invitations (email, token, expires_at)
values (
  'creator@example.com',
  encode(gen_random_bytes(24), 'hex'),
  now() + interval '14 days'
)
returning email, token;
```

Send the returned token as a link:
`https://trythisplay.vercel.app/creator/accept/<token>/`

The invitee must be **signed in** (any auth method) when they open the link; it
creates their `creators` row and marks the invitation accepted. Reuse fails.

### Make yourself a creator quickly (founder)
If you're already signed in and just want portal access without the email loop,
insert a `creators` row directly with your auth user id:

```sql
-- find your user id
select id, email from auth.users order by created_at desc limit 5;

-- grant creator access
insert into public.creators (id, display_name, status)
values ('<YOUR-AUTH-USER-ID>', 'Your Name', 'active')
on conflict (id) do nothing;
```

Then open `/creator/`.

## 3. Access states
- Not signed in → `/creator/` bounces to login, returns after.
- Signed in, no `creators` row → "Invitation Required" page (links to apply).
- Suspended creator → "Account Suspended" page.
- Active creator → dashboard.

## 4. Storefront is now DB-driven
Public catalog pages (`/ebooks/`, `/ebooks/[slug]/`, homepage featured, creator
profiles) and checkout/library read from the `products` table, `status =
'published'` only. Until you publish a product, these show honest empty states.

The old `src/content/ebooks/` markdown collection is no longer read by any page
(kept as reference). To seed a first draft product for testing, either build one
in the portal (Phase 3.3+) or insert a row:

```sql
-- example draft owned by a creator (must exist in public.creators first)
insert into public.products (slug, title, short_description, category, difficulty, price_cents, creator_id, status)
values ('gun-bunch-mastery', 'Gun Bunch Mastery', 'Full Gun Bunch scheme.', 'offense', 'intermediate', 2999, '<CREATOR-ID>', 'draft');
```

Reserved slugs (cannot be used as product slugs): `offense`, `defense`,
`franchise`, `beginners`, `advanced`, `competitive`, `simulation`. Also avoid
colliding with guide slugs. The portal validates this at creation time.

## Coming in later Phase 3 steps
- 3.3 portal editor (details, lessons, cover, preview, submit)
- 3.4 Mux video uploads + signed playback (env: `MUX_TOKEN_ID`,
  `MUX_TOKEN_SECRET`, `MUX_WEBHOOK_SECRET`, `MUX_SIGNING_KEY_ID`,
  `MUX_SIGNING_KEY_PRIVATE`)
- 3.5 transcripts + AI written-setup drafting (env: `OPENAI_API_KEY`)

These env vars will be documented here as each step lands; add them to Vercel
and `.env.example` when prompted.
