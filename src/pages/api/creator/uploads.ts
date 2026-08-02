import type { APIRoute } from "astro";
import { requireCreator } from "../../../lib/creator";
import { siteOrigin } from "../../../lib/auth";
import { supabaseAdmin } from "../../../lib/supabase";
import { createDirectUpload, muxConfigured } from "../../../lib/mux";

export const prerender = false;

/**
 * POST /api/creator/uploads  { lesson_id }
 * Creates a Mux Direct Upload for a lesson the caller owns and returns the
 * upload URL for the browser uploader. Stores the upload id on the lesson.
 */
export const POST: APIRoute = async ({ request, cookies, url }) => {
  const guard = await requireCreator(request, cookies, "/creator/");
  if (!guard.ok) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });

  if (!muxConfigured) {
    return new Response(JSON.stringify({ error: "video-unavailable" }), { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const lessonId = String(body.lesson_id ?? "");
  if (!lessonId) return new Response(JSON.stringify({ error: "lesson_id required" }), { status: 400 });

  const admin = supabaseAdmin();
  // Verify the lesson belongs to a product owned by this creator.
  const { data: lesson } = await admin
    .from("lessons")
    .select("id, product_id, products!inner(creator_id, status)")
    .eq("id", lessonId)
    .maybeSingle();
  const owner = (lesson as any)?.products?.creator_id;
  const status = (lesson as any)?.products?.status;
  if (!lesson || owner !== guard.creator.id) {
    return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  }
  if (status !== "draft" && status !== "changes_requested") {
    return new Response(JSON.stringify({ error: "locked" }), { status: 409 });
  }

  const origin = siteOrigin(request, url);
  const upload = await createDirectUpload(origin);
  if (!upload) return new Response(JSON.stringify({ error: "video-unavailable" }), { status: 503 });

  await admin
    .from("lessons")
    .update({ mux_upload_id: upload.uploadId, status: "uploading" })
    .eq("id", lessonId);

  return new Response(JSON.stringify({ url: upload.url }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
