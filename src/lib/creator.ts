import type { AstroCookies } from "astro";
import { getUser } from "./auth";

export interface CreatorRow {
  id: string;
  display_name: string;
  gamertag: string | null;
  bio: string | null;
  specialties: string[];
  socials: Record<string, unknown>;
  avatar_url: string | null;
  revenue_share_bps: number;
  stripe_account_id: string | null;
  status: "active" | "suspended";
}

export type CreatorGuard =
  | { ok: true; user: { id: string; email?: string }; creator: CreatorRow; supabase: ReturnType<typeof getUser> extends Promise<infer R> ? (R extends { supabase: infer S } ? S : never) : never }
  | { ok: false; redirect: string };

/**
 * Gate for /creator/* routes. Requires a signed-in user who has an ACTIVE
 * creators row. Returns a redirect target otherwise:
 *  - not signed in            -> /login/?next=<path>
 *  - signed in, no creator    -> /creator/ (which shows the invitation-required page)
 *  - suspended creator        -> /creator/?suspended=1
 *
 * Pass the current path so the login redirect returns the user here.
 */
export async function requireCreator(
  request: Request,
  cookies: AstroCookies,
  path: string
) {
  const { supabase, user } = await getUser(request, cookies);
  if (!user) {
    return { ok: false as const, redirect: `/login/?next=${encodeURIComponent(path)}`, supabase, user: null, creator: null };
  }

  const { data: creator } = await supabase
    .from("creators")
    .select(
      "id, display_name, gamertag, bio, specialties, socials, avatar_url, revenue_share_bps, stripe_account_id, status"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (!creator) {
    return { ok: false as const, redirect: "__invitation_required__", supabase, user, creator: null };
  }
  if (creator.status === "suspended") {
    return { ok: false as const, redirect: "__suspended__", supabase, user, creator };
  }

  return { ok: true as const, redirect: null, supabase, user, creator: creator as CreatorRow };
}
