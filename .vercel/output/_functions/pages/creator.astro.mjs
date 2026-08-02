/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment, d as addAttribute } from '../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_g5FSfEVc.mjs';
import { r as requireCreator } from '../chunks/creator_lgkQp4MY.mjs';
import { a as formatPrice, f as formatDate } from '../chunks/format_UgvkLNN9.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const guard = await requireCreator(Astro2.request, Astro2.cookies, "/creator/");
  if (!guard.ok && guard.redirect && guard.redirect.startsWith("/login")) {
    return Astro2.redirect(guard.redirect);
  }
  const invitationRequired = !guard.ok && guard.redirect === "__invitation_required__";
  const suspended = !guard.ok && guard.redirect === "__suspended__";
  let products = [];
  let totals = { products: 0, published: 0, salesCount: 0, grossCents: 0 };
  if (guard.ok) {
    const { supabase, creator } = guard;
    const { data: prods } = await supabase.from("products").select("id, slug, title, status, price_cents, updated_at, featured").eq("creator_id", creator.id).order("updated_at", { ascending: false });
    products = prods ?? [];
    totals.products = products.length;
    totals.published = products.filter((p) => p.status === "published").length;
    const ids = products.map((p) => p.id);
    if (ids.length) {
      const { data: sales } = await supabase.from("purchases").select("amount_cents").in("product_id", ids).eq("status", "completed");
      totals.salesCount = sales?.length ?? 0;
      totals.grossCents = (sales ?? []).reduce((s, r) => s + (r.amount_cents ?? 0), 0);
    }
  }
  const statusChip = {
    draft: "border-brand-line text-brand-silver",
    submitted: "border-yellow-500/50 text-yellow-400",
    changes_requested: "border-orange-500/50 text-orange-400",
    approved: "border-sky-500/50 text-sky-400",
    published: "border-emerald-500/50 text-emerald-400",
    archived: "border-brand-line text-brand-silver/60"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Creator Portal | Try This Play", "description": "Creator portal.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site py-12"> ${invitationRequired ? renderTemplate`<div class="mx-auto max-w-xl"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Creators", "title": "Invitation Required" })} <div class="card mt-6 p-8"> <p class="text-brand-silver leading-relaxed">
The creator portal is invitation-only. If you were invited, use the
            link in your invitation email to activate your account. Otherwise,
            apply below and we'll be in touch.
</p> <div class="mt-6 flex gap-3"> <a href="/creators/apply/" class="btn-primary">Apply to Create</a> <a href="/library/" class="btn-secondary">Back to Library</a> </div> </div> </div>` : suspended ? renderTemplate`<div class="mx-auto max-w-xl"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Creators", "title": "Account Suspended" })} <div class="card mt-6 p-8"> <p class="text-brand-silver">
Your creator account is currently suspended. Contact support if you
            think this is a mistake.
</p> <a href="mailto:support@trythisplay.com" class="btn-secondary mt-6 inline-block">Contact Support</a> </div> </div>` : guard.ok ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="flex flex-wrap items-end justify-between gap-4"> ${renderComponent($$result3, "SectionHeading", $$SectionHeading, { "eyebrow": "Creator Portal", "title": `Welcome, ${guard.creator.display_name}` })} <a href="/creator/products/new/" class="btn-primary shrink-0">New Ebook</a> </div>  <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"> <div class="card p-5"><div class="font-mono text-xs text-brand-silver">Products</div><div class="mt-1 text-2xl font-black">${totals.products}</div></div> <div class="card p-5"><div class="font-mono text-xs text-brand-silver">Published</div><div class="mt-1 text-2xl font-black">${totals.published}</div></div> <div class="card p-5"><div class="font-mono text-xs text-brand-silver">Sales</div><div class="mt-1 text-2xl font-black">${totals.salesCount}</div></div> <div class="card p-5"><div class="font-mono text-xs text-brand-silver">Gross</div><div class="mt-1 text-2xl font-black">${formatPrice(totals.grossCents / 100)}</div></div> </div> <h2 class="h-display mt-12 text-2xl">Your Ebooks</h2> ${products.length === 0 ? renderTemplate`<div class="mt-6 border border-dashed border-brand-line bg-brand-panel p-10 text-center"> <p class="text-brand-silver">No products yet. Create your first video ebook.</p> <a href="/creator/products/new/" class="btn-primary mt-6">New Ebook</a> </div>` : renderTemplate`<div class="mt-6 grid gap-3"> ${products.map((p) => renderTemplate`<a${addAttribute(`/creator/products/${p.id}/`, "href")} class="card flex items-center justify-between p-5 hover:border-brand-red transition-colors"> <div> <div class="font-display text-lg">${p.title || "Untitled ebook"}</div> <div class="mt-1 font-mono text-xs text-brand-silver">/${p.slug} · ${formatPrice((p.price_cents ?? 0) / 100)} · updated ${formatDate(new Date(p.updated_at))}</div> </div> <span${addAttribute(`border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusChip[p.status] ?? "border-brand-line text-brand-silver"}`, "class")}> ${p.status.replace("_", " ")} </span> </a>`)} </div>`}` })}` : null} </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/index.astro";
const $$url = "/creator/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
