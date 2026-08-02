import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

export const prerender = false;

/** Sends a magic sign-in link to the submitted email. */
export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const next = String(form.get("next") ?? "/library/");

  if (!email || !email.includes("@")) {
    return redirect("/login/?error=invalid-email");
  }

  const supabase = supabaseServer(request, cookies);
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${url.origin}/auth/callback/?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    console.error("signInWithOtp failed:", error.message);
    return redirect("/login/?error=send-failed");
  }
  return redirect("/login/?sent=1");
};
