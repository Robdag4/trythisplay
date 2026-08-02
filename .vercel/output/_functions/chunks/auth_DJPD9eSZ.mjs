import { a as supabaseServer } from './supabase_w_KyqO0O.mjs';

function siteOrigin(request, url) {
  const fwdHost = request.headers.get("x-forwarded-host");
  const fwdProto = request.headers.get("x-forwarded-proto") ?? "https";
  if (fwdHost) return `${fwdProto}://${fwdHost}`;
  const configured = "https://trythisplay.com";
  if (!url.origin.includes("localhost")) return url.origin;
  return configured.replace(/\/$/, "");
}
async function getUser(request, cookies) {
  const supabase = supabaseServer(request, cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return { supabase, user };
}

export { getUser as g, siteOrigin as s };
