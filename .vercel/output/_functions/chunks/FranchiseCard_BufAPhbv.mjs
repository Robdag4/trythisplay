import { b as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, d as addAttribute } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://trythisplay.com");
const $$FranchiseCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FranchiseCard;
  const { eyebrow, title, features, cta, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="card relative overflow-hidden p-8"> <div class="absolute inset-x-0 top-0 h-1 bg-brand-red" aria-hidden="true"></div> <p class="eyebrow">${eyebrow}</p> <h3 class="h-display mt-2 text-3xl">${title}</h3> <ul class="mt-6 grid gap-2 text-sm text-brand-silver sm:grid-cols-2"> ${features.map((f) => renderTemplate`<li class="flex items-start gap-2"> <span class="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" aria-hidden="true"></span> <span>${f}</span> </li>`)} </ul> <a${addAttribute(href, "href")} class="btn-primary mt-8">${cta}</a> </article>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/franchise/FranchiseCard.astro", void 0);

export { $$FranchiseCard as $ };
