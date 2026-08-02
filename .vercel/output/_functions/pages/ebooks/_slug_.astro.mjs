/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_CQJBa8a6.mjs';
import { $ as $$BaseLayout, E as EBOOK_CATEGORIES } from '../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_CuQmkuJE.mjs';
import { $ as $$EbookCard } from '../../chunks/EbookCard_Cp3Ck2eO.mjs';
import { $ as $$FaqList } from '../../chunks/FaqList_C8YemksL.mjs';
import { c as getPublishedProducts, g as getPublishedProductBySlug } from '../../chunks/products_X9YWEcqr.mjs';
import { $ as $$ProductPage } from '../../chunks/ProductPage_BWNDYi0e.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://trythisplay.com");
const $$CategoryPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CategoryPage;
  const { category } = Astro2.props;
  const allEbooks = await getPublishedProducts();
  const ebooks = allEbooks.filter(
    (e) => e.data.category === category.slug || e.data.difficulty === category.slug.replace("beginners", "beginner").replace("advanced", "advanced") || e.data.styles.includes(category.slug)
  );
  const allFaqs = await getCollection("faqs");
  const faqs = allFaqs.filter((f) => f.data.topic === "ebooks").sort((a, b) => a.data.order - b.data.order).map((f) => ({ question: f.data.question, answer: f.data.answer }));
  const title = `${category.label} Madden 27 Ebooks | Try This Play`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": category.intro }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [
    { label: "Home", href: "/" },
    { label: "Ebooks", href: "/ebooks/" },
    { label: category.label, href: `/ebooks/${category.slug}/` }
  ] })} ${maybeRenderHead()}<section class="container-site py-12"> <p class="eyebrow">Ebook Category</p> <h1 class="h-display mt-2 text-4xl sm:text-5xl">${category.label} Ebooks</h1> <p class="mt-4 max-w-3xl leading-relaxed text-brand-silver">${category.intro}</p> ${ebooks.length > 0 ? renderTemplate`<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> ${ebooks.map((ebook) => renderTemplate`${renderComponent($$result2, "EbookCard", $$EbookCard, { "ebook": ebook })}`)} </div>` : renderTemplate`<p class="mt-12 border border-brand-line bg-brand-panel p-8 text-brand-silver"> ${category.label} products are coming soon. Browse
<a href="/ebooks/" class="text-brand-red hover:underline"> all ebooks</a> or
        read our free
<a href="/guides/" class="text-brand-red hover:underline"> strategy guides</a> in
        the meantime.
</p>`} <div class="mt-16 max-w-3xl"> <h2 class="h-display text-2xl">How to choose</h2> <p class="mt-3 leading-relaxed text-brand-silver">${category.guidance}</p> </div> ${faqs.length > 0 && renderTemplate`<div class="mt-16 max-w-3xl"> <h2 class="h-display text-2xl">Frequently asked questions</h2> <div class="mt-6"> ${renderComponent($$result2, "FaqList", $$FaqList, { "items": faqs })} </div> </div>`} </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ebooks/CategoryPage.astro", void 0);

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const category = EBOOK_CATEGORIES.find((c) => c.slug === slug) ?? null;
  let ebook = null;
  if (!category && slug) {
    ebook = await getPublishedProductBySlug(slug);
    if (!ebook) return Astro2.redirect("/404/", 404);
  }
  return renderTemplate`${category ? renderTemplate`${renderComponent($$result, "CategoryPage", $$CategoryPage, { "category": category })}` : ebook && renderTemplate`${renderComponent($$result, "ProductPage", $$ProductPage, { "ebook": ebook })}`}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/ebooks/[slug].astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/ebooks/[slug].astro";
const $$url = "/ebooks/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
