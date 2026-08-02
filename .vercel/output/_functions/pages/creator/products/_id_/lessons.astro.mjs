import { r as requireCreator } from '../../../../chunks/creator_lgkQp4MY.mjs';
import { s as supabaseAdmin } from '../../../../chunks/supabase_w_KyqO0O.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ params, request, cookies, redirect }) => {
  const { id } = params;
  const path = `/creator/products/${id}/`;
  const guard = await requireCreator(request, cookies, path);
  if (!guard.ok) return redirect(guard.redirect?.startsWith("/login") ? guard.redirect : "/creator/");
  const admin = supabaseAdmin();
  const { data: product } = await admin.from("products").select("id, creator_id, status").eq("id", id).maybeSingle();
  if (!product || product.creator_id !== guard.creator.id) return redirect("/creator/");
  if (product.status !== "draft" && product.status !== "changes_requested") {
    return redirect(`${path}?tab=lessons`);
  }
  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim().slice(0, 120);
  if (!title) return redirect(`${path}?tab=lessons`);
  const { data: last } = await admin.from("lessons").select("sort_order").eq("product_id", id).order("sort_order", { ascending: false }).limit(1).maybeSingle();
  const sortOrder = (last?.sort_order ?? -1) + 1;
  const { data: created } = await admin.from("lessons").insert({
    product_id: id,
    title,
    sort_order: sortOrder,
    status: "uploading"
  }).select("id").single();
  if (created?.id) return redirect(`${path}lessons/${created.id}/`);
  return redirect(`${path}?tab=lessons`);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
