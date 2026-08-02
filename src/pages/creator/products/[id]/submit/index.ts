import type { APIRoute } from "astro";
import { requireCreator } from "../../../../../lib/creator";
import { supabaseAdmin } from "../../../../../lib/supabase";

export const prerender = false;

/** Submit a product for review. Re-checks completeness server-side. */
export const POST: APIRoute = async ({ params, request, cookies, redirect }) => {
  const { id } = params;
  const path = `/creator/products/${id}/`;
  const guard = await requireCreator(request, cookies, path);
  if (!guard.ok) return redirect(guard.redirect?.startsWith("/login") ? guard.redirect : "/creator/");

  const admin = supabaseAdmin();
  const { data: product } = await admin.from("products").select("*").eq("id", id).maybeSingle();
  if (!product || product.creator_id !== guard.creator.id) return redirect("/creator/");
  if (product.status !== "draft" && product.status !== "changes_requested") {
    return redirect(`${path}?tab=submit`);
  }

  const { data: lessons } = await admin
    .from("lessons")
    .select("status, free_preview, written_setup_approved_at")
    .eq("product_id", id);
  const ls = lessons ?? [];

  // Server-side completeness gate (mirrors SubmitTab).
  const pass =
    !!product.title &&
    !!product.short_description &&
    (product.price_cents ?? 0) >= 100 &&
    !!product.cover_image_url &&
    ls.filter((l) => l.status === "ready").length >= 3 &&
    ls.some((l) => l.free_preview) &&
    ls.length > 0 &&
    ls.every((l) => !!l.written_setup_approved_at);

  if (!pass) return redirect(`${path}?tab=submit`);

  await admin.from("submissions").insert({ product_id: id });
  await admin.from("products").update({ status: "submitted" }).eq("id", id);

  return redirect(`${path}?tab=submit`);
};
