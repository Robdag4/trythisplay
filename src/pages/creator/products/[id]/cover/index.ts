import type { APIRoute } from "astro";
import { requireCreator } from "../../../../../lib/creator";
import { supabaseAdmin } from "../../../../../lib/supabase";

export const prerender = false;

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB
const OK_TYPES = ["image/jpeg", "image/png", "image/webp"];
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/** Upload product cover art to the public `covers` bucket. */
export const POST: APIRoute = async ({ params, request, cookies, redirect }) => {
  const { id } = params;
  const path = `/creator/products/${id}/`;
  const guard = await requireCreator(request, cookies, path);
  if (!guard.ok) return redirect(guard.redirect?.startsWith("/login") ? guard.redirect : "/creator/");

  const admin = supabaseAdmin();
  const { data: product } = await admin
    .from("products")
    .select("id, creator_id, status")
    .eq("id", id)
    .maybeSingle();
  if (!product || product.creator_id !== guard.creator.id) return redirect("/creator/");
  if (product.status !== "draft" && product.status !== "changes_requested") {
    return redirect(`${path}?tab=cover`);
  }

  const form = await request.formData();
  const file = form.get("cover");
  const alt = String(form.get("cover_alt") ?? "").slice(0, 160);

  if (!(file instanceof File) || file.size === 0) return redirect(`${path}?tab=cover&error=nofile`);
  if (!OK_TYPES.includes(file.type)) return redirect(`${path}?tab=cover&error=type`);
  if (file.size > MAX_BYTES) return redirect(`${path}?tab=cover&error=size`);

  const ext = EXT[file.type] ?? "jpg";
  const key = `${id}/cover-${Date.now()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await admin.storage
    .from("covers")
    .upload(key, bytes, { contentType: file.type, upsert: true });
  if (upErr) {
    // Most likely the bucket doesn't exist yet — see SETUP-PHASE3.md.
    console.error("cover upload failed:", upErr.message);
    return redirect(`${path}?tab=cover&error=upload`);
  }

  const { data: pub } = admin.storage.from("covers").getPublicUrl(key);
  await admin
    .from("products")
    .update({ cover_image_url: pub.publicUrl, cover_image_alt: alt })
    .eq("id", id);

  return redirect(`${path}?tab=cover`);
};
