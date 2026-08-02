/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_g5FSfEVc.mjs';
import { g as getUser } from '../chunks/auth_DJPD9eSZ.mjs';
import { f as formatDate } from '../chunks/format_UgvkLNN9.mjs';
import { e as getEntitledProductsBySlug } from '../chunks/products_X9YWEcqr.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { supabase, user } = await getUser(Astro2.request, Astro2.cookies);
  if (!user) return Astro2.redirect("/login/?next=/library/");
  const { data: purchases } = await supabase.from("purchases").select("product_slug, product_title, created_at").eq("status", "completed").order("created_at", { ascending: false });
  const { data: progress } = await supabase.from("lesson_progress").select("product_slug, lesson_index");
  const byslug = await getEntitledProductsBySlug(
    (purchases ?? []).map((p) => p.product_slug)
  );
  const owned = (purchases ?? []).map((p) => {
    const ebook = byslug.get(p.product_slug) ?? null;
    const total = ebook?.data.lessons.length ?? 0;
    const done = (progress ?? []).filter((x) => x.product_slug === p.product_slug).length;
    return { ...p, ebook, total, done };
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "My Library | Try This Play", "description": "Your ebook library.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site py-12"> <div class="flex flex-wrap items-end justify-between gap-4"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Signed in", "title": "My Library", "intro": user.email ?? void 0 })} <a href="/account/" class="btn-secondary shrink-0">Account</a> </div> ${owned.length === 0 ? renderTemplate`<div class="mt-12 border border-dashed border-brand-line bg-brand-panel p-10 text-center"> <p class="text-brand-silver">
You don't own any ebooks yet. Your purchases appear here instantly
          after checkout.
</p> <a href="/ebooks/" class="btn-primary mt-6">Browse Ebooks</a> </div>` : renderTemplate`<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${owned.map((item) => renderTemplate`<article class="card flex flex-col p-6"> <h2 class="h-display text-2xl"> <a${addAttribute(`/library/${item.product_slug}/`, "href")} class="hover:text-brand-red transition-colors"> ${item.product_title} </a> </h2> <p class="mt-2 font-mono text-xs text-brand-silver">
Purchased ${formatDate(new Date(item.created_at))} </p> ${item.total > 0 && renderTemplate`<div class="mt-4"> <div class="flex justify-between font-mono text-xs text-brand-silver"> <span>Progress</span> <span>${item.done}/${item.total} lessons</span> </div> <div class="mt-2 h-1.5 w-full bg-brand-charcoal"> <div class="h-full bg-brand-red"${addAttribute(`width: ${item.total ? Math.round(item.done / item.total * 100) : 0}%`, "style")}></div> </div> </div>`} <a${addAttribute(`/library/${item.product_slug}/`, "href")} class="btn-primary mt-6 w-full"> ${item.done > 0 ? "Continue" : "Start Learning"} </a> </article>`)} </div>`} </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/library/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/library/index.astro";
const $$url = "/library/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
