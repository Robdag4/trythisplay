import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

export const prerender = false;

/** Exchanges the emailed magic-link code for a session cookie. */
export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/library/";

  if (code) {
    const supabase = supabaseServer(request, cookies);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return redirect(next.startsWith("/") ? next : "/library/");
    }
    console.error("exchangeCodeForSession failed:", error.message);
  }
  return redirect("/login/?error=link-expired");
};
