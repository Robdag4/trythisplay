/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../../chunks/SectionHeading_g5FSfEVc.mjs';
import { r as requireAdmin } from '../../chunks/adminAuth_mVq6uttz.mjs';
import { s as supabaseAdmin } from '../../chunks/supabase_w_KyqO0O.mjs';
import { a as formatPrice } from '../../chunks/format_UgvkLNN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const gate = await requireAdmin(Astro2.request, Astro2.cookies, "/admin/products/");
  if (!gate.ok) return Astro2.redirect(gate.redirect);
  const admin = supabaseAdmin();
  let notice = null;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = String(form.get("_action") ?? "");
    const pid = String(form.get("product_id") ?? "");
    if (pid && action === "feature") {
      const on = String(form.get("value")) === "1";
      await admin.from("products").update({ featured: on }).eq("id", pid);
      notice = on ? "Featured." : "Unfeatured.";
    } else if (pid && action === "archive") {
      await admin.from("products").update({ status: "archived" }).eq("id", pid);
      notice = "Archived (hidden from storefront; owners keep library access).";
    } else if (pid && action === "unarchive") {
      await admin.from("products").update({ status: "draft" }).eq("id", pid);
      notice = "Moved back to draft.";
    }
  }
  const filter = Astro2.url.searchParams.get("status") ?? "";
  let q = admin.from("products").select("id, title, slug, status, price_cents, featured, creators(display_name)").order("updated_at", { ascending: false });
  if (filter) q = q.eq("status", filter);
  const { data: products } = await q;
  const statuses = ["", "draft", "submitted", "changes_requested", "approved", "published", "archived"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Products | Admin", "description": "Catalog.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site py-10"> <a href="/admin/" class="text-sm text-brand-silver hover:text-brand-white">← Admin</a> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Catalog", "title": "Products" })} ${notice && renderTemplate`<p class="mt-4 border border-emerald-600/40 bg-emerald-950/15 p-3 text-sm text-emerald-300">${notice}</p>`} <nav class="mt-6 flex flex-wrap gap-2"> ${statuses.map((s) => renderTemplate`<a${addAttribute(`/admin/products/${s ? `?status=${s}` : ""}`, "href")}${addAttribute(`border px-3 py-1.5 text-xs font-semibold ${filter === s ? "border-brand-red text-brand-white" : "border-brand-line text-brand-silver hover:text-brand-white"}`, "class")}> ${s || "all"} </a>`)} </nav> <div class="mt-6 grid gap-2"> ${(products ?? []).map((p) => renderTemplate`<div class="card flex flex-wrap items-center justify-between gap-3 p-4"> <div> <div class="font-display">${p.title} ${p.featured && renderTemplate`<span class="text-[10px] text-brand-red">★ featured</span>`}</div> <div class="mt-0.5 font-mono text-xs text-brand-silver">/${p.slug} · ${p.creators?.display_name} · ${formatPrice((p.price_cents ?? 0) / 100)} · ${p.status}</div> </div> <div class="flex flex-wrap gap-2"> ${p.status === "published" && renderTemplate`<form method="POST"> <input type="hidden" name="_action" value="feature"> <input type="hidden" name="product_id"${addAttribute(p.id, "value")}> <input type="hidden" name="value"${addAttribute(p.featured ? "0" : "1", "value")}> <button class="btn-secondary text-xs">${p.featured ? "Unfeature" : "Feature"}</button> </form>`} ${p.status !== "archived" ? renderTemplate`<form method="POST"><input type="hidden" name="_action" value="archive"><input type="hidden" name="product_id"${addAttribute(p.id, "value")}><button class="btn-secondary text-xs">Archive</button></form>` : renderTemplate`<form method="POST"><input type="hidden" name="_action" value="unarchive"><input type="hidden" name="product_id"${addAttribute(p.id, "value")}><button class="btn-secondary text-xs">Unarchive</button></form>`} ${p.status === "submitted" && renderTemplate`<a${addAttribute(`/admin/submissions/`, "href")} class="btn-secondary text-xs">Review</a>`} </div> </div>`)} </div> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/products/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/products/index.astro";
const $$url = "/admin/products/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
