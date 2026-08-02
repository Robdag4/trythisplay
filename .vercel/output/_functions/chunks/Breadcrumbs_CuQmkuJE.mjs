import { b as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead, d as addAttribute, r as renderComponent } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import 'clsx';
import { S as SITE } from './BaseLayout_CkKY5QST.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://trythisplay.com");
const $$BreadcrumbSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BreadcrumbSchema;
  const { crumbs } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: new URL(c.href, SITE.url).href
    }))
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/seo/BreadcrumbSchema.astro", void 0);

const $$Astro = createAstro("https://trythisplay.com");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { crumbs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Breadcrumb" class="container-site pt-6"> <ol class="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-silver"> ${crumbs.map((c, i) => renderTemplate`<li class="flex items-center gap-2"> ${i > 0 && renderTemplate`<span aria-hidden="true" class="text-brand-line">/</span>`} ${i === crumbs.length - 1 ? renderTemplate`<span aria-current="page" class="text-brand-white">${c.label}</span>` : renderTemplate`<a${addAttribute(c.href, "href")} class="hover:text-brand-white">${c.label}</a>`} </li>`)} </ol> </nav> ${renderComponent($$result, "BreadcrumbSchema", $$BreadcrumbSchema, { "crumbs": crumbs })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ui/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
