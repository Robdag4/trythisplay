import type { APIRoute } from "astro";
import type { EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "../../../lib/supabase";

export const prerender = false;

function safeNext(next: string | null): string {
  return next && next.startsWith("/") ? next : "/library/";
}

/**
 * Completes an emailed auth link and sets the session cookie. Handles BOTH
 * link formats Supabase may send:
 *   1. PKCE magic link  -> ?code=...            (exchangeCodeForSession)
 *   2. OTP verify link  -> ?token_hash=&type=   (verifyOtp) — this is what the
 *      default "Confirm signup" / recovery templates produce.
 * Supporting both means login works regardless of which email template is
 * configured in the Supabase dashboard.
 */
export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const next = safeNext(url.searchParams.get("next"));
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  const supabase = supabaseServer(request, cookies);

  // 1) PKCE flow (?code=)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect(next);
    console.error("exchangeCodeForSession failed:", error.message);
    return redirect("/login/?error=link-expired");
  }

  // 2) OTP verify flow (?token_hash=&type=)
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return redirect(next);
    console.error("verifyOtp failed:", error.message);
    return redirect("/login/?error=link-expired");
  }

  return redirect("/login/?error=link-expired");
};
