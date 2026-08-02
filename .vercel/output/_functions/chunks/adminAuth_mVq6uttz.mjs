import { g as getUser } from './auth_DJPD9eSZ.mjs';

async function requireAdmin(request, cookies, path = "/admin/") {
  const { supabase, user } = await getUser(request, cookies);
  if (!user) {
    return { ok: false, status: 401, redirect: `/login/?next=${encodeURIComponent(path)}`, user: null, admin: null, supabase };
  }
  const { data: admin } = await supabase.from("admin_users").select("user_id, role").eq("user_id", user.id).maybeSingle();
  if (!admin) {
    return { ok: false, status: 403, redirect: "/", user, admin: null, supabase };
  }
  return { ok: true, status: 200, redirect: null, user, admin, supabase };
}

export { requireAdmin as r };
