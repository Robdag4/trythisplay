import type { AstroCookies } from "astro";
import { getUser } from "./auth";

export interface AdminRow {
  user_id: string;
  role: "admin" | "reviewer";
}

/**
 * Gate for /admin/* routes and admin APIs. Checks admin_users on every request.
 * Returns { ok, user, admin, supabase } or a redirect/response target.
 *
 * Usage in a page:
 *   const gate = await requireAdmin(Astro.request, Astro.cookies, "/admin/...");
 *   if (!gate.ok) return Astro.redirect(gate.redirect);
 *
 * Usage in an API route: if (!gate.ok) return new Response("forbidden", {status: gate.status});
 */
export async function requireAdmin(
  request: Request,
  cookies: AstroCookies,
  path = "/admin/"
) {
  const { supabase, user } = await getUser(request, cookies);
  if (!user) {
    return { ok: false as const, status: 401, redirect: `/login/?next=${encodeURIComponent(path)}`, user: null, admin: null, supabase };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    // Do not reveal /admin exists — send non-admins home.
    return { ok: false as const, status: 403, redirect: "/", user, admin: null, supabase };
  }

  return { ok: true as const, status: 200, redirect: null, user, admin: admin as AdminRow, supabase };
}
