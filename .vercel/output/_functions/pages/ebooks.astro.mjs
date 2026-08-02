/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout, E as EBOOK_CATEGORIES } from '../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_CuQmkuJE.mjs';
import { $ as $$EbookCard } from '../chunks/EbookCard_Cp3Ck2eO.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_g5FSfEVc.mjs';
import { c as getPublishedProducts } from '../chunks/products_X9YWEcqr.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const ebooks = await getPublishedProducts();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Madden 27 Ebooks & Video Strategy Guides | Try This Play", "description": "Browse Madden 27 video ebooks: offensive schemes, defensive systems, and franchise guides with video lessons, written setups, audibles, and coverage beaters." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [{ label: "Home", href: "/" }, { label: "Ebooks", href: "/ebooks/" }] })} ${maybeRenderHead()}<section class="container-site py-12"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "The Marketplace", "title": "Madden 27 Ebooks", "intro": "Every product includes video lessons, structured written setups, audibles, reads, adjustments, blitz counters, transcripts, and future updates." })} <!-- Category navigation. Interactive filtering ships as a React island in
         Phase 2; filter query URLs will be noindexed and excluded from the sitemap. --> <nav aria-label="Ebook categories" class="mt-10 flex flex-wrap gap-2"> ${EBOOK_CATEGORIES.map((c) => renderTemplate`<a${addAttribute(`/ebooks/${c.slug}/`, "href")} class="border border-brand-line bg-brand-panel px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-silver transition-colors hover:border-brand-red hover:text-brand-white"> ${c.label} </a>`)} </nav> ${ebooks.length > 0 ? renderTemplate`<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> ${ebooks.map((ebook) => renderTemplate`${renderComponent($$result2, "EbookCard", $$EbookCard, { "ebook": ebook })}`)} </div>` : renderTemplate`<p class="mt-12 border border-brand-line bg-brand-panel p-8 text-brand-silver">
The launch catalog is in review. Check back soon, or apply to become a
        creator and sell your own Madden 27 products.
</p>`} </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/ebooks/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/ebooks/index.astro";
const $$url = "/ebooks/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
