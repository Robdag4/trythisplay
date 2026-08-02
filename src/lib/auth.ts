import type { AstroCookies } from "astro";
import { supabaseServer } from "./supabase";

/**
 * Resolve the public origin for building auth redirect URLs. Behind Vercel's
 * proxy `url.origin` can resolve to `localhost`, which breaks OAuth returns and
 * magic-link redirects. Prefer the forwarded host/proto Vercel sets, then the
 * configured Astro `site`, then the request URL as a last resort.
 */
export function siteOrigin(request: Request, url: URL): string {
  const fwdHost = request.headers.get("x-forwarded-host");
  const fwdProto = request.headers.get("x-forwarded-proto") ?? "https";
  if (fwdHost) return `${fwdProto}://${fwdHost}`;

  const configured = import.meta.env.SITE as string | undefined;
  if (configured && !url.origin.includes("localhost")) return url.origin;
  if (configured) return configured.replace(/\/$/, "");
  return url.origin;
}

export async function getUser(request: Request, cookies: AstroCookies) {
  const supabase = supabaseServer(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}
