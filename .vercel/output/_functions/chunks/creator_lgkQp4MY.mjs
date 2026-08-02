import { g as getUser } from './auth_DJPD9eSZ.mjs';

async function requireCreator(request, cookies, path) {
  const { supabase, user } = await getUser(request, cookies);
  if (!user) {
    return { ok: false, redirect: `/login/?next=${encodeURIComponent(path)}`, supabase, user: null, creator: null };
  }
  const { data: creator } = await supabase.from("creators").select(
    "id, display_name, gamertag, bio, specialties, socials, avatar_url, revenue_share_bps, stripe_account_id, status"
  ).eq("id", user.id).maybeSingle();
  if (!creator) {
    return { ok: false, redirect: "__invitation_required__", supabase, user, creator: null };
  }
  if (creator.status === "suspended") {
    return { ok: false, redirect: "__suspended__", supabase, user, creator };
  }
  return { ok: true, redirect: null, supabase, user, creator };
}

export { requireCreator as r };
