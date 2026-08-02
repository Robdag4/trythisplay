import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$UpdatedBadge } from './UpdatedBadge_BKrBFWKq.mjs';
import { c as capitalize, a as formatPrice } from './format_UgvkLNN9.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const $$EbookCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EbookCard;
  const { ebook } = Astro2.props;
  const { data } = ebook;
  return renderTemplate`${maybeRenderHead()}<article class="card group flex flex-col"> <a${addAttribute(`/ebooks/${ebook.slug}/`, "href")} class="flex flex-1 flex-col"> <div class="relative aspect-[4/5] overflow-hidden border-b border-brand-line bg-brand-charcoal"> ${data.coverImage ? renderTemplate`<img${addAttribute(data.coverImage, "src")}${addAttribute(data.coverImageAlt ?? `${data.title} ebook cover`, "alt")} width="640" height="800" loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]">` : renderTemplate`<div class="flex h-full w-full items-center justify-center p-6 bg-stadium-glow"> <span class="font-display text-center text-2xl uppercase leading-tight text-brand-white/80"> ${data.title} </span> </div>`} ${data.placeholder && renderTemplate`<span class="absolute left-2 top-2 bg-brand-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-silver">
Sample listing
</span>`} </div> <div class="flex flex-1 flex-col gap-3 p-5"> ${renderComponent($$result, "UpdatedBadge", $$UpdatedBadge, {})} <h3 class="font-display text-xl uppercase tracking-wide group-hover:text-brand-red transition-colors" data-card="title"> ${data.title} </h3> <p class="text-sm text-brand-silver">by <span data-card="author">${data.creatorName}</span></p> <ul class="mt-auto flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-brand-silver"> <li data-card="category">${capitalize(data.category)}</li> ${data.playbook && renderTemplate`<li>${data.playbook}</li>`} <li data-card="difficulty">${capitalize(data.difficulty)}</li> <li>${data.lessonCount} lessons</li> <li>${data.runtime}</li> </ul> <div class="flex items-center justify-between border-t border-brand-line pt-4"> <span class="font-mono text-lg font-medium" data-card="price">${formatPrice(data.price)}</span> <span class="text-xs font-semibold uppercase tracking-wider text-brand-red">
View Ebook →
</span> </div> </div> </a> </article>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ebooks/EbookCard.astro", void 0);

export { $$EbookCard as $ };
