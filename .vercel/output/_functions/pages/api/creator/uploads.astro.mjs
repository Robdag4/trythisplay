import { r as requireCreator } from '../../../chunks/creator_lgkQp4MY.mjs';
import { s as siteOrigin } from '../../../chunks/auth_DJPD9eSZ.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_w_KyqO0O.mjs';
import { b as muxConfigured, c as createDirectUpload } from '../../../chunks/mux_DWQFda0h.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, url }) => {
  const guard = await requireCreator(request, cookies, "/creator/");
  if (!guard.ok) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  if (!muxConfigured) {
    return new Response(JSON.stringify({ error: "video-unavailable" }), { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  const lessonId = String(body.lesson_id ?? "");
  if (!lessonId) return new Response(JSON.stringify({ error: "lesson_id required" }), { status: 400 });
  const admin = supabaseAdmin();
  const { data: lesson } = await admin.from("lessons").select("id, product_id, products!inner(creator_id, status)").eq("id", lessonId).maybeSingle();
  const owner = lesson?.products?.creator_id;
  const status = lesson?.products?.status;
  if (!lesson || owner !== guard.creator.id) {
    return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  }
  if (status !== "draft" && status !== "changes_requested") {
    return new Response(JSON.stringify({ error: "locked" }), { status: 409 });
  }
  const origin = siteOrigin(request, url);
  const upload = await createDirectUpload(origin);
  if (!upload) return new Response(JSON.stringify({ error: "video-unavailable" }), { status: 503 });
  await admin.from("lessons").update({ mux_upload_id: upload.uploadId, status: "uploading" }).eq("id", lessonId);
  return new Response(JSON.stringify({ url: upload.url }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
