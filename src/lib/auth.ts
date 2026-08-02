import type { AstroCookies } from "astro";
import { supabaseServer } from "./supabase";

export async function getUser(request: Request, cookies: AstroCookies) {
  const supabase = supabaseServer(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}
