import { a as supabaseServer } from '../../../chunks/supabase_w_KyqO0O.mjs';
import { s as siteOrigin } from '../../../chunks/auth_DJPD9eSZ.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const ALLOWED = ["discord", "google"];
const GET = async ({ request, cookies, redirect, url }) => {
  const provider = url.searchParams.get("provider");
  const next = url.searchParams.get("next") ?? "/library/";
  const safeNext = next.startsWith("/") ? next : "/library/";
  if (!provider || !ALLOWED.includes(provider)) {
    return redirect("/login/?error=oauth-unavailable");
  }
  const supabase = supabaseServer(request, cookies);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${siteOrigin(request, url)}/auth/callback/?next=${encodeURIComponent(safeNext)}`
    }
  });
  if (error || !data?.url) {
    console.error("signInWithOAuth failed:", provider, error?.message);
    return redirect("/login/?error=oauth-unavailable");
  }
  return redirect(data.url);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
