/* empty css                                          */
import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate } from '../../../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$ProductPage } from '../../../../chunks/ProductPage_BWNDYi0e.mjs';
import { r as requireCreator } from '../../../../chunks/creator_lgkQp4MY.mjs';
import { a as getProductByIdAdmin } from '../../../../chunks/products_X9YWEcqr.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { id } = Astro2.params;
  const path = `/creator/products/${id}/`;
  const guard = await requireCreator(Astro2.request, Astro2.cookies, path);
  if (!guard.ok) {
    if (guard.redirect?.startsWith("/login")) return Astro2.redirect(guard.redirect);
    return Astro2.redirect("/creator/");
  }
  const ebook = await getProductByIdAdmin(id);
  if (!ebook || ebook.data.creatorId !== guard.creator.id) return Astro2.redirect("/creator/");
  return renderTemplate`${maybeRenderHead()}<div class="fixed left-0 right-0 top-0 z-50 bg-brand-red px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-white">
Draft preview — not live · <a${addAttribute(`/creator/products/${id}/`, "href")} class="underline">back to editor</a> </div> <div class="pt-9"> ${renderComponent($$result, "ProductPage", $$ProductPage, { "ebook": ebook, "draftPreview": true })} </div>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/products/[id]/preview/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/products/[id]/preview/index.astro";
const $$url = "/creator/products/[id]/preview/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
