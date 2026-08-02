/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../../chunks/SectionHeading_g5FSfEVc.mjs';
import { r as requireAdmin } from '../../chunks/adminAuth_mVq6uttz.mjs';
import { s as supabaseAdmin } from '../../chunks/supabase_w_KyqO0O.mjs';
import { s as stripe } from '../../chunks/stripe_Da_YONpy.mjs';
import { a as formatPrice, f as formatDate } from '../../chunks/format_UgvkLNN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const gate = await requireAdmin(Astro2.request, Astro2.cookies, "/admin/orders/");
  if (!gate.ok) return Astro2.redirect(gate.redirect);
  const admin = supabaseAdmin();
  let notice = null;
  let error = null;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    if (String(form.get("_action")) === "refund") {
      const purchaseId = String(form.get("purchase_id") ?? "");
      const { data: purchase } = await admin.from("purchases").select("*").eq("id", purchaseId).maybeSingle();
      if (!purchase) error = "Purchase not found.";
      else if (purchase.status === "refunded") notice = "Already refunded.";
      else if (!purchase.stripe_payment_intent) error = "No payment intent on this purchase.";
      else {
        try {
          const refund = await stripe.refunds.create({ payment_intent: purchase.stripe_payment_intent });
          await admin.from("purchases").update({ status: "refunded", refunded_at: (/* @__PURE__ */ new Date()).toISOString(), stripe_refund_id: refund.id }).eq("id", purchaseId);
          notice = "Refunded \u2014 library access removed.";
        } catch (e) {
          console.error("refund failed:", e.message);
          error = "Stripe refund failed.";
        }
      }
    }
  }
  const search = (Astro2.url.searchParams.get("q") ?? "").trim();
  let q = admin.from("purchases").select("id, product_title, product_slug, amount_cents, status, created_at, stripe_payment_intent").order("created_at", { ascending: false }).limit(200);
  if (search) q = q.ilike("product_title", `%${search}%`);
  const { data: orders } = await q;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Orders | Admin", "description": "Orders.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site py-10"> <a href="/admin/" class="text-sm text-brand-silver hover:text-brand-white">← Admin</a> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Sales", "title": "Orders" })} ${notice && renderTemplate`<p class="mt-4 border border-emerald-600/40 bg-emerald-950/15 p-3 text-sm text-emerald-300">${notice}</p>`} ${error && renderTemplate`<p class="mt-4 border border-brand-red/50 bg-brand-red/10 p-3 text-sm">${error}</p>`} <form method="GET" class="mt-6 flex gap-2"> <input name="q" type="text"${addAttribute(search, "value")} placeholder="Search by product title" class="flex-1 border border-brand-line bg-brand-panel px-4 py-2.5 text-sm focus:border-brand-red"> <button class="btn-secondary">Search</button> </form> <div class="mt-6 grid gap-2"> ${(orders ?? []).map((o) => renderTemplate`<div class="card flex flex-wrap items-center justify-between gap-3 p-4"> <div> <div class="font-semibold">${o.product_title}</div> <div class="mt-0.5 font-mono text-xs text-brand-silver"> ${formatPrice((o.amount_cents ?? 0) / 100)} · ${formatDate(new Date(o.created_at))} ·
<span${addAttribute(o.status === "refunded" ? "text-red-400" : "text-emerald-400", "class")}> ${o.status}</span> </div> </div> ${o.status !== "refunded" && o.stripe_payment_intent && renderTemplate`<form method="POST" onsubmit="return confirm('Refund this order and remove library access?')"> <input type="hidden" name="_action" value="refund"> <input type="hidden" name="purchase_id"${addAttribute(o.id, "value")}> <button class="btn-secondary text-xs">Refund</button> </form>`} </div>`)} ${(!orders || orders.length === 0) && renderTemplate`<p class="text-sm text-brand-silver">No orders${search ? " match your search" : " yet"}.</p>`} </div> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/orders/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/orders/index.astro";
const $$url = "/admin/orders/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
