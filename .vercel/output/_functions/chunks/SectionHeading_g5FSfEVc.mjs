import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://trythisplay.com");
const $$SectionHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionHeading;
  const { eyebrow, title, intro, align = "left" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["max-w-3xl", align === "center" && "mx-auto text-center"], "class:list")}> ${eyebrow && renderTemplate`<p class="eyebrow">${eyebrow}</p>`} <h2 class="h-display mt-2 text-3xl sm:text-4xl">${title}</h2> ${intro && renderTemplate`<p class="mt-4 text-brand-silver leading-relaxed">${intro}</p>`} </div>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ui/SectionHeading.astro", void 0);

export { $$SectionHeading as $ };
