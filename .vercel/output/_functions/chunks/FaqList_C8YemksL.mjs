import { b as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead, r as renderComponent } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://trythisplay.com");
const $$FAQSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FAQSchema;
  const { items } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };
  return renderTemplate`${items.length > 0 && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)))}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/seo/FAQSchema.astro", void 0);

const $$Astro = createAstro("https://trythisplay.com");
const $$FaqList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FaqList;
  const { items, withSchema = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="divide-y divide-brand-line border-y border-brand-line"> ${items.map((f) => renderTemplate`<details class="group py-5"> <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"> ${f.question} <span class="text-brand-red transition-transform group-open:rotate-45" aria-hidden="true">+</span> </summary> <p class="mt-3 leading-relaxed text-brand-silver">${f.answer}</p> </details>`)} </div> ${withSchema && renderTemplate`${renderComponent($$result, "FAQSchema", $$FAQSchema, { "items": items })}`}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ui/FaqList.astro", void 0);

export { $$FaqList as $ };
