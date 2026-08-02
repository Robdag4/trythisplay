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
  const { data: product } = await admin.from("products").select("*").eq("id", id).maybeSingle();
  if (!product || product.creator_id !== guard.creator.id) return redirect("/creator/");
  if (product.status !== "draft" && product.status !== "changes_requested") {
    return redirect(`${path}?tab=submit`);
  }
  const { data: lessons } = await admin.from("lessons").select("status, free_preview, written_setup_approved_at").eq("product_id", id);
  const ls = lessons ?? [];
  const pass = !!product.title && !!product.short_description && (product.price_cents ?? 0) >= 100 && !!product.cover_image_url && ls.filter((l) => l.status === "ready").length >= 3 && ls.some((l) => l.free_preview) && ls.length > 0 && ls.every((l) => !!l.written_setup_approved_at);
  if (!pass) return redirect(`${path}?tab=submit`);
  await admin.from("submissions").insert({ product_id: id });
  await admin.from("products").update({ status: "submitted" }).eq("id", id);
  return redirect(`${path}?tab=submit`);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
