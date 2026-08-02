import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = supabaseServer(request, cookies);
  await supabase.auth.signOut();
  return redirect("/");
};
