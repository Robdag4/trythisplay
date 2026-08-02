import type { APIRoute } from "astro";
import type { Provider } from "@supabase/supabase-js";
import { supabaseServer } from "../../../lib/supabase";
import { siteOrigin } from "../../../lib/auth";

export const prerender = false;

// Providers we support on the login page. Enable each in the Supabase dashboard
// (Auth > Providers) with its client id/secret before the button will work.
const ALLOWED: Provider[] = ["discord", "google"];

/**
 * Starts a Supabase OAuth sign-in. GET /api/auth/oauth/?provider=discord[&next=/library/]
 * Redirects the browser to the provider's consent screen; the provider returns
 * to /auth/callback/?code=***, which exchanges the code for a session (PKCE).
 */
export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const provider = url.searchParams.get("provider") as Provider | null;
  const next = url.searchParams.get("next") ?? "/library/";
  const safeNext = next.startsWith("/") ? next : "/library/";

  if (!provider || !ALLOWED.includes(provider)) {
    return redirect("/login/?error=oauth-unavailable");
  }

  const supabase = supabaseServer(request, cookies);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${siteOrigin(request, url)}/auth/callback/?next=${encodeURIComponent(safeNext)}`,
    },
  });

  if (error || !data?.url) {
    console.error("signInWithOAuth failed:", provider, error?.message);
    return redirect("/login/?error=oauth-unavailable");
  }
  return redirect(data.url);
};
