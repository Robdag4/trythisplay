import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { siteOrigin } from "../../../lib/auth";

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
      emailRedirectTo: `${siteOrigin(request, url)}/auth/callback/?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    console.error("signInWithOtp failed:", error.status, error.message);
    // Distinguish Supabase's email rate limit (429 / "rate limit") from other
    // send failures so the user gets an accurate message.
    const msg = error.message?.toLowerCase() ?? "";
    if (error.status === 429 || msg.includes("rate limit") || msg.includes("too many")) {
      return redirect("/login/?error=rate-limit");
    }
    return redirect("/login/?error=send-failed");
  }
  return redirect("/login/?sent=1");
};
