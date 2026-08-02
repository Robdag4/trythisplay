import { a as supabaseServer } from '../../chunks/supabase_w_KyqO0O.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function safeNext(next) {
  return next && next.startsWith("/") ? next : "/library/";
}
const GET = async ({ request, cookies, redirect, url }) => {
  const next = safeNext(url.searchParams.get("next"));
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const supabase = supabaseServer(request, cookies);
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect(next);
    console.error("exchangeCodeForSession failed:", error.message);
    return redirect("/login/?error=link-expired");
  }
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return redirect(next);
    console.error("verifyOtp failed:", error.message);
    return redirect("/login/?error=link-expired");
  }
  return redirect("/login/?error=link-expired");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
