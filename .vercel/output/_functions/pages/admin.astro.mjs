/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_g5FSfEVc.mjs';
import { r as requireAdmin } from '../chunks/adminAuth_mVq6uttz.mjs';
import { s as supabaseAdmin } from '../chunks/supabase_w_KyqO0O.mjs';
import { a as formatPrice } from '../chunks/format_UgvkLNN9.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const gate = await requireAdmin(Astro2.request, Astro2.cookies, "/admin/");
  if (!gate.ok) return Astro2.redirect(gate.redirect);
  const admin = supabaseAdmin();
  const [pendingRes, publishedRes, creatorsRes, salesRes] = await Promise.all([
    admin.from("products").select("id", { count: "exact", head: true }).eq("status", "submitted"),
    admin.from("products").select("id", { count: "exact", head: true }).eq("status", "published"),
    admin.from("creators").select("id", { count: "exact", head: true }).eq("status", "active"),
    admin.from("purchases").select("amount_cents, created_at").eq("status", "completed")
  ]);
  const sevenDaysAgo = Date.now() - 7 * 864e5;
  const recentSales = (salesRes.data ?? []).filter((s) => new Date(s.created_at).getTime() >= sevenDaysAgo);
  const last7Gross = recentSales.reduce((sum, s) => sum + (s.amount_cents ?? 0), 0);
  const cards = [
    { label: "Pending submissions", value: pendingRes.count ?? 0, href: "/admin/submissions/" },
    { label: "Published products", value: publishedRes.count ?? 0, href: "/admin/products/" },
    { label: "Active creators", value: creatorsRes.count ?? 0, href: "/admin/creators/" },
    { label: "Sales (7d)", value: `${recentSales.length} \xB7 ${formatPrice(last7Gross / 100)}`, href: "/admin/orders/" }
  ];
  const nav = [
    { label: "Submissions", href: "/admin/submissions/" },
    { label: "Products", href: "/admin/products/" },
    { label: "Orders", href: "/admin/orders/" },
    { label: "Creators", href: "/admin/creators/" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin | Try This Play", "description": "Admin.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site py-10"> <div class="flex flex-wrap items-end justify-between gap-3"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Staff", "title": "Admin Dashboard" })} <span class="text-xs font-mono text-brand-silver">${gate.admin.role}</span> </div> <div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"> ${cards.map((c) => renderTemplate`<a${addAttribute(c.href, "href")} class="card p-5 hover:border-brand-red transition-colors"> <div class="font-mono text-xs text-brand-silver">${c.label}</div> <div class="mt-1 text-2xl font-black">${c.value}</div> </a>`)} </div> <nav class="mt-10 flex flex-wrap gap-2"> ${nav.map((n) => renderTemplate`<a${addAttribute(n.href, "href")} class="border border-brand-line bg-brand-panel px-4 py-2 text-sm font-semibold hover:border-brand-red">${n.label}</a>`)} </nav> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/index.astro";
const $$url = "/admin/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
