/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../../chunks/SectionHeading_g5FSfEVc.mjs';
import { r as requireAdmin } from '../../chunks/adminAuth_mVq6uttz.mjs';
import { s as supabaseAdmin } from '../../chunks/supabase_w_KyqO0O.mjs';
import { f as formatDate } from '../../chunks/format_UgvkLNN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const gate = await requireAdmin(Astro2.request, Astro2.cookies, "/admin/submissions/");
  if (!gate.ok) return Astro2.redirect(gate.redirect);
  const admin = supabaseAdmin();
  const { data: subs } = await admin.from("submissions").select("id, product_id, submitted_at, products(title, slug, status, creator_id, creators(display_name))").is("decided_at", null).order("submitted_at", { ascending: true });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Submissions | Admin", "description": "Review queue.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site py-10"> <a href="/admin/" class="text-sm text-brand-silver hover:text-brand-white">← Admin</a> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Review Queue", "title": "Pending Submissions" })} ${!subs || subs.length === 0 ? renderTemplate`<div class="mt-8 border border-dashed border-brand-line bg-brand-panel p-10 text-center text-brand-silver">
Nothing waiting for review.
</div>` : renderTemplate`<div class="mt-8 grid gap-3"> ${subs.map((s) => {
    const p = s.products;
    return renderTemplate`<a${addAttribute(`/admin/submissions/${s.id}/`, "href")} class="card flex items-center justify-between p-5 hover:border-brand-red transition-colors"> <div> <div class="font-display text-lg">${p?.title ?? "Untitled"}</div> <div class="mt-1 font-mono text-xs text-brand-silver">
by ${p?.creators?.display_name ?? "creator"} · submitted ${formatDate(new Date(s.submitted_at))} </div> </div> <span class="btn-secondary text-xs">Review →</span> </a>`;
  })} </div>`} </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/submissions/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/submissions/index.astro";
const $$url = "/admin/submissions/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
