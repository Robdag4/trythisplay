import { b as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML, r as renderComponent, F as Fragment, m as maybeRenderHead, d as addAttribute } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { S as SITE, $ as $$BaseLayout } from './BaseLayout_CkKY5QST.mjs';
import { $ as $$Breadcrumbs } from './Breadcrumbs_CuQmkuJE.mjs';
import { $ as $$UpdatedBadge } from './UpdatedBadge_BKrBFWKq.mjs';
import 'clsx';
import { c as capitalize, f as formatDate, a as formatPrice } from './format_UgvkLNN9.mjs';
import { marked } from 'marked';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://trythisplay.com");
const $$ProductSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductSchema;
  const { name, description, price, creatorName, url, image } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    ...image ? { image: new URL(image, SITE.url).href } : {},
    brand: { "@type": "Brand", name: SITE.name },
    creator: { "@type": "Person", name: creatorName },
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: new URL(url, SITE.url).href
    }
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/seo/ProductSchema.astro", void 0);

const $$Astro = createAstro("https://trythisplay.com");
const $$ProductPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductPage;
  const { ebook, draftPreview = false } = Astro2.props;
  const { data } = ebook;
  const overviewHtml = ebook.body ? marked.parse(ebook.body) : "";
  const url = `/ebooks/${ebook.slug}/`;
  const noindex = !data.published || draftPreview;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": data.seoTitle ?? `${data.title} | Madden 27 Ebook | Try This Play`, "description": data.seoDescription ?? data.shortDescription, "ogType": "product", "noindex": noindex }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [
    { label: "Home", href: "/" },
    { label: "Ebooks", href: "/ebooks/" },
    { label: data.title, href: url }
  ] })}  ${maybeRenderHead()}<section class="container-site grid gap-10 py-12 lg:grid-cols-[380px_1fr]"> <div class="relative mx-auto w-full max-w-sm"> <div class="aspect-[4/5] border border-brand-line bg-brand-charcoal bg-stadium-glow shadow-[0_0_60px_-20px_rgba(225,29,46,0.4)]"> ${data.coverImage ? renderTemplate`<img${addAttribute(data.coverImage, "src")}${addAttribute(data.coverImageAlt ?? `${data.title} ebook cover`, "alt")} width="640" height="800" class="h-full w-full object-cover">` : renderTemplate`<div class="flex h-full items-center justify-center p-8"> <span class="font-display text-center text-3xl uppercase leading-tight text-brand-white/80"> ${data.title} </span> </div>`} </div> </div> <div> ${renderComponent($$result2, "UpdatedBadge", $$UpdatedBadge, {})} <h1 class="h-display mt-3 text-4xl sm:text-5xl">${data.title}</h1> <p class="mt-3 text-brand-silver">
by
<a${addAttribute(`/creators/${data.creatorId}/`, "href")} class="text-brand-red hover:underline"> ${data.creatorName} </a> </p> <p class="mt-4 max-w-2xl leading-relaxed text-brand-silver">${data.shortDescription}</p> <dl class="mt-8 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-4 border-y border-brand-line py-6 font-mono text-sm sm:grid-cols-3"> <div><dt class="text-xs uppercase tracking-wider text-brand-silver">Category</dt><dd class="mt-1">${capitalize(data.category)}</dd></div> ${data.playbook && renderTemplate`<div><dt class="text-xs uppercase tracking-wider text-brand-silver">Playbook</dt><dd class="mt-1">${data.playbook}</dd></div>`} ${data.formation && renderTemplate`<div><dt class="text-xs uppercase tracking-wider text-brand-silver">Formation</dt><dd class="mt-1">${data.formation}</dd></div>`} <div><dt class="text-xs uppercase tracking-wider text-brand-silver">Skill Level</dt><dd class="mt-1">${capitalize(data.difficulty)}</dd></div> <div><dt class="text-xs uppercase tracking-wider text-brand-silver">Lessons</dt><dd class="mt-1">${data.lessonCount}</dd></div> <div><dt class="text-xs uppercase tracking-wider text-brand-silver">Runtime</dt><dd class="mt-1">${data.runtime}</dd></div> <div><dt class="text-xs uppercase tracking-wider text-brand-silver">Consoles</dt><dd class="mt-1">${data.platforms.join(", ")}</dd></div> <div><dt class="text-xs uppercase tracking-wider text-brand-silver">Last Updated</dt><dd class="mt-1">${formatDate(data.updatedAt)}</dd></div> </dl> <div class="mt-8 flex flex-wrap items-center gap-5"> <span class="font-mono text-3xl font-medium">${formatPrice(data.price)}</span> ${data.published ? renderTemplate`<form method="POST" action="/api/checkout"> <input type="hidden" name="slug"${addAttribute(ebook.slug, "value")}> <button type="submit" class="btn-primary">Buy Now</button> </form>` : renderTemplate`<span class="btn-secondary cursor-not-allowed opacity-60">Coming Soon</span>`} </div> <p class="mt-3 text-xs text-brand-silver">
Instant access after purchase. Includes all future Madden 27 updates.
</p> </div> </section>  <section class="container-site grid gap-12 py-12 lg:grid-cols-[1fr_340px]"> <div class="space-y-12"> ${data.whatYouWillLearn.length > 0 && renderTemplate`<div> <h2 class="h-display text-2xl">What you will learn</h2> <ul class="mt-5 grid gap-2 sm:grid-cols-2"> ${data.whatYouWillLearn.map((item) => renderTemplate`<li class="flex items-start gap-2 text-sm text-brand-silver"> <span class="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" aria-hidden="true"></span> ${item} </li>`)} </ul> </div>`} ${data.whoThisIsFor.length > 0 && renderTemplate`<div> <h2 class="h-display text-2xl">Who this is for</h2> <ul class="mt-5 space-y-2"> ${data.whoThisIsFor.map((item) => renderTemplate`<li class="flex items-start gap-2 text-sm text-brand-silver"> <span class="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" aria-hidden="true"></span> ${item} </li>`)} </ul> </div>`} <div> <h2 class="h-display text-2xl">Product overview</h2> <div class="prose-invert mt-5 max-w-none leading-relaxed text-brand-silver [&>p]:mt-4">${unescapeHTML(overviewHtml)}</div> </div> <!-- Lesson preview: titles public, content locked --> ${data.lessons.length > 0 && renderTemplate`<div> <h2 class="h-display text-2xl">Lesson list</h2> <ol class="mt-5 divide-y divide-brand-line border-y border-brand-line"> ${data.lessons.map((lesson, i) => renderTemplate`<li class="flex items-center gap-4 py-4"> <span class="font-mono text-sm text-brand-silver">${String(i + 1).padStart(2, "0")}</span> <div class="flex-1"> <p class="font-semibold">${lesson.title}</p> ${lesson.description && renderTemplate`<p class="mt-1 text-sm text-brand-silver">${lesson.description}</p>`} </div> <span class="font-mono text-xs text-brand-silver">${lesson.runtime}</span> ${lesson.freePreview ? renderTemplate`<span class="border border-brand-red/50 bg-brand-red/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-red">
Free preview
</span>` : renderTemplate`<span class="text-brand-silver" aria-label="Locked lesson" title="Unlocks after purchase"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"> <rect x="5" y="11" width="14" height="9" rx="1"></rect> <path d="M8 11V7a4 4 0 0 1 8 0v4"></path> </svg> </span>`} </li>`)} </ol> </div>`} </div> <!-- Desktop purchase rail --> <aside class="hidden lg:block"> <div class="card sticky top-24 p-6"> <p class="font-mono text-2xl font-medium">${formatPrice(data.price)}</p> <ul class="mt-5 space-y-2 text-sm text-brand-silver"> <li>Video lessons with written setups</li> <li>Audibles, reads, and adjustments</li> <li>Coverage beaters and blitz counters</li> <li>Full transcripts</li> <li>Future Madden 27 updates</li> <li>Discord product-owner role</li> </ul> ${data.published ? renderTemplate`<form method="POST" action="/api/checkout"> <input type="hidden" name="slug"${addAttribute(ebook.slug, "value")}> <button type="submit" class="btn-primary mt-6 w-full">Buy Now</button> </form>` : renderTemplate`<span class="btn-secondary mt-6 block w-full cursor-not-allowed text-center opacity-60">Coming Soon</span>`} </div> </aside> </section>  <div class="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-brand-line bg-brand-black/95 px-4 py-3 backdrop-blur lg:hidden"> <span class="font-mono text-lg font-medium">${formatPrice(data.price)}</span> ${data.published ? renderTemplate`<form method="POST" action="/api/checkout"> <input type="hidden" name="slug"${addAttribute(ebook.slug, "value")}> <button type="submit" class="btn-primary !py-2">Buy Now</button> </form>` : renderTemplate`<span class="btn-secondary !py-2 cursor-not-allowed opacity-60">Coming Soon</span>`} </div> `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate`${!noindex && renderTemplate`${renderComponent($$result3, "ProductSchema", $$ProductSchema, { "name": data.title, "description": data.shortDescription, "price": data.price, "creatorName": data.creatorName, "url": url, "image": data.coverImage })}`}` })}` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ebooks/ProductPage.astro", void 0);

export { $$ProductPage as $ };
