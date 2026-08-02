/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_CQJBa8a6.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_CuQmkuJE.mjs';
import { $ as $$EbookCard } from '../../chunks/EbookCard_Cp3Ck2eO.mjs';
import { b as getPublishedProductsByCreator } from '../../chunks/products_X9YWEcqr.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const creators = await getCollection("creators");
  const creator = creators.find((c) => c.slug === slug);
  if (!creator) return Astro2.redirect("/404/", 404);
  const { data } = creator;
  const ebooks = await getPublishedProductsByCreator(creator.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: data.name,
      alternateName: data.gamertag,
      description: data.bio
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${data.name} | Madden Creator | Try This Play`, "description": data.bio, "ogType": "profile", "noindex": data.placeholder }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [
    { label: "Home", href: "/" },
    { label: "Creators", href: "/creators/" },
    { label: data.name, href: `/creators/${creator.slug}/` }
  ] })} ${maybeRenderHead()}<section class="container-site py-12"> ${data.placeholder && renderTemplate`<p class="mb-6 w-fit border border-dashed border-brand-line bg-brand-panel px-4 py-2 font-mono text-xs uppercase tracking-wider text-brand-silver">
Sample profile · replaced with a real creator at launch
</p>`} <p class="eyebrow">Creator Profile</p> <h1 class="h-display mt-2 text-4xl sm:text-5xl">${data.name}</h1> <p class="mt-2 font-mono text-lg text-brand-red">${data.gamertag}</p> <p class="mt-4 max-w-3xl leading-relaxed text-brand-silver">${data.bio}</p> ${data.specialties.length > 0 && renderTemplate`<ul class="mt-6 flex flex-wrap gap-2"> ${data.specialties.map((s) => renderTemplate`<li class="border border-brand-line bg-brand-panel px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-brand-silver"> ${s} </li>`)} </ul>`} <h2 class="h-display mt-16 text-2xl">Published ebooks</h2> ${ebooks.length > 0 ? renderTemplate`<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> ${ebooks.map((ebook) => renderTemplate`${renderComponent($$result2, "EbookCard", $$EbookCard, { "ebook": ebook })}`)} </div>` : renderTemplate`<p class="mt-6 text-brand-silver">No published products yet.</p>`} </section> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate`${!data.placeholder && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)))}` })}` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/creators/[slug].astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/creators/[slug].astro";
const $$url = "/creators/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
