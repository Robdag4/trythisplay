# SETUP — Phase 2.5: Social Login (Discord + Google) & Email Deliverability

This covers the operator (human) steps to (A) enable one-click Discord/Google
sign-in, and (B) fix the Supabase default-email rate limit with Resend SMTP.
The code is already deployed; these are dashboard-only steps.

Base URL used below: `https://trythisplay.vercel.app` (swap for the custom
domain once `trythisplay.com` points at Vercel).

---

## A. Enable Discord + Google OAuth

The login page shows "Continue with Discord" and "Continue with Google" buttons.
Each button hits `/api/auth/oauth/?provider=...` → Supabase → the provider →
back to `/auth/callback/`. The buttons only work once the provider is enabled in
Supabase with real credentials; until then they redirect back with a friendly
"that sign-in option isn't available yet" message.

### A1. Supabase redirect allowlist (do this first, once)
Supabase Dashboard → **Authentication → URL Configuration**:
- **Site URL:** `https://trythisplay.vercel.app`
- **Redirect URLs** (add all):
  - `https://trythisplay.vercel.app/auth/callback/**`
  - `http://localhost:4321/auth/callback/**` (local dev)

### A2. Discord
1. https://discord.com/developers/applications → **New Application** ("Try This Play").
2. **OAuth2** → copy **Client ID** and **Client Secret**.
3. **OAuth2 → Redirects** → add the Supabase callback (NOT our app URL):
   `https://<PROJECT-REF>.supabase.co/auth/v1/callback`
   (Find `<PROJECT-REF>` in Supabase → Project Settings → API → Project URL.)
4. Supabase Dashboard → **Authentication → Providers → Discord** → enable, paste
   Client ID + Secret, save.

### A3. Google
1. https://console.cloud.google.com → create/select a project.
2. **APIs & Services → OAuth consent screen** → External → fill app name, support
   email, developer email → save (Testing mode is fine to start; add your email
   as a test user).
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID** →
   Web application.
   - **Authorized redirect URIs:** `https://<PROJECT-REF>.supabase.co/auth/v1/callback`
4. Copy **Client ID** + **Client Secret**.
5. Supabase Dashboard → **Authentication → Providers → Google** → enable, paste
   Client ID + Secret, save.

### A4. Verify
Open `/login/`, click a provider, approve consent → you should land in
`/library/`. Sign-in with a brand-new social account auto-creates the Supabase
`auth.users` row (same identity model the rest of the app uses).

---

## B. Fix email deliverability (Resend SMTP)

Supabase's built-in email is throttled (~2-4/hour) — fine for a first test,
unusable for real magic-link sign-ins. Point Supabase at Resend.

1. https://resend.com → sign up → **Add Domain** → add `trythisplay.com`, then
   add the DNS records Resend shows (SPF/DKIM) at your DNS host. Wait for verify.
   (Until the domain verifies you can send from `onboarding@resend.dev` for testing.)
2. Resend → **API Keys** → create a key.
3. Supabase Dashboard → **Project Settings → Authentication → SMTP Settings** →
   **Enable Custom SMTP**:
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: `<RESEND_API_KEY>`
   - Sender email: `no-reply@trythisplay.com` (or `onboarding@resend.dev` pre-verify)
   - Sender name: `Try This Play`
4. Supabase → **Authentication → Rate Limits** → raise the **Emails** limit for
   testing headroom.
5. (Recommended) Supabase → **Authentication → Email Templates → Magic Link** →
   confirm the link uses `{{ .ConfirmationURL }}` (or the token_hash form). Our
   `/auth/callback/` handles both PKCE `?code` and `?token_hash&type` links.

### Verify
Request a magic link at `/login/` → email arrives promptly from the Try This
Play sender → clicking it lands in `/library/`.

---

## Env vars
No new app env vars are required for Phase 2.5 — Discord/Google credentials live
in the Supabase dashboard, and Resend SMTP is configured in Supabase, not the
app. (Phase 5 will add `DISCORD_*` bot vars for role automation, separate from
this OAuth sign-in.)
