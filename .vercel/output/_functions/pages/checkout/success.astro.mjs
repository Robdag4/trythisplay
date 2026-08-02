/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CkKY5QST.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Purchase Complete | Try This Play", "description": "Your purchase was successful.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site flex min-h-[60vh] items-center justify-center py-12"> <div class="card w-full max-w-md p-8 text-center"> <p class="eyebrow">Touchdown</p> <h1 class="h-display mt-2 text-3xl">Purchase Complete</h1> <p class="mt-4 text-sm leading-relaxed text-brand-silver">
Your ebook is being added to your library right now — this usually
        takes a few seconds. A receipt is on its way to your email.
</p> <a href="/library/" class="btn-primary mt-6 w-full">Go To My Library</a> </div> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/checkout/success.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/checkout/success.astro";
const $$url = "/checkout/success/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
