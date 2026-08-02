import { a as supabaseServer } from '../../../chunks/supabase_w_KyqO0O.mjs';
import { s as siteOrigin } from '../../../chunks/auth_DJPD9eSZ.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, redirect, url }) => {
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
      emailRedirectTo: `${siteOrigin(request, url)}/auth/callback/?next=${encodeURIComponent(next)}`
    }
  });
  if (error) {
    console.error("signInWithOtp failed:", error.status, error.message);
    const msg = error.message?.toLowerCase() ?? "";
    if (error.status === 429 || msg.includes("rate limit") || msg.includes("too many")) {
      return redirect("/login/?error=rate-limit");
    }
    return redirect("/login/?error=send-failed");
  }
  return redirect("/login/?sent=1");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
