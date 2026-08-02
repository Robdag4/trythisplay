/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, d as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CkKY5QST.mjs';
import { g as getUser } from '../../chunks/auth_DJPD9eSZ.mjs';
import { e as getEntitledProductsBySlug } from '../../chunks/products_X9YWEcqr.mjs';
import { s as signPlayback } from '../../chunks/mux_DWQFda0h.mjs';
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
  const { supabase, user } = await getUser(Astro2.request, Astro2.cookies);
  if (!user) return Astro2.redirect(`/login/?next=/library/${slug}/`);
  const { data: purchase } = await supabase.from("purchases").select("product_slug").eq("product_slug", slug).eq("status", "completed").maybeSingle();
  if (!purchase) return Astro2.redirect("/library/");
  const byslug = await getEntitledProductsBySlug([slug]);
  const ebook = byslug.get(slug) ?? null;
  if (!ebook) return Astro2.redirect("/library/");
  const { data: progressRows } = await supabase.from("lesson_progress").select("lesson_index").eq("product_slug", slug);
  const completed = new Set((progressRows ?? []).map((r) => r.lesson_index));
  const requested = Number(Astro2.url.searchParams.get("lesson") ?? 0);
  const current = Math.min(Math.max(requested, 0), Math.max(ebook.data.lessons.length - 1, 0));
  const lesson = ebook.data.lessons[current];
  const playbackToken = lesson?.playbackId ? await signPlayback(lesson.playbackId, "video", 3600) : null;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${ebook.data.title} | My Library`, "description": "Private lesson viewer.", "noindex": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="container-site grid gap-10 py-10 lg:grid-cols-[1fr_360px]"> <div> <a href="/library/" class="font-mono text-xs uppercase tracking-wider text-brand-silver hover:text-brand-white">\n\u2190 My Library\n</a> <h1 class="h-display mt-3 text-3xl sm:text-4xl">', '</h1> <!-- Video player: renders Mux playback when the lesson has a playbackId.\n           Until videos are uploaded (creator portal phase), shows written setup only. --> <div class="mt-6 aspect-video w-full border border-brand-line bg-brand-charcoal"> ', " </div> ", " ", ' <div class="mt-8 flex justify-between"> ', " ", ' </div> </div> <aside> <div class="card sticky top-24 p-5"> <h2 class="h-display text-xl">Lessons</h2> <ol class="mt-4 max-h-[60vh] space-y-1 overflow-y-auto"> ', ' </ol> </div> </aside> </section> <script src="https://cdn.jsdelivr.net/npm/@mux/mux-player@2"><\/script> '])), maybeRenderHead(), ebook.data.title, lesson?.playbackId && playbackToken ? renderTemplate`${renderComponent($$result2, "mux-player", "mux-player", { "playback-id": lesson.playbackId, "playback-token": playbackToken, "metadata-video-title": lesson.title, "accent-color": "#E11D2E", "style": "width:100%;height:100%;" })}` : renderTemplate`<div class="flex h-full items-center justify-center p-8 text-center"> <p class="max-w-sm text-sm text-brand-silver">
Video for this lesson hasn't been uploaded yet. The written setup
              below is available now.
</p> </div>`, lesson && renderTemplate`<div class="mt-6 flex flex-wrap items-center justify-between gap-4"> <div> <p class="font-mono text-xs text-brand-red">Lesson ${current + 1} of ${ebook.data.lessons.length}</p> <h2 class="h-display mt-1 text-2xl">${lesson.title}</h2> </div> <form method="POST" action="/api/progress"> <input type="hidden" name="slug"${addAttribute(ebook.slug, "value")}> <input type="hidden" name="lesson"${addAttribute(String(current), "value")}> <input type="hidden" name="done"${addAttribute(completed.has(current) ? "0" : "1", "value")}> <button type="submit"${addAttribute(completed.has(current) ? "btn-secondary" : "btn-primary", "class")}> ${completed.has(current) ? "Mark Incomplete" : "Mark Complete"} </button> </form> </div>`, lesson?.description && renderTemplate`<p class="mt-4 leading-relaxed text-brand-silver">${lesson.description}</p>`, current > 0 ? renderTemplate`<a${addAttribute(`/library/${ebook.slug}/?lesson=${current - 1}`, "href")} class="btn-secondary">← Previous</a>` : renderTemplate`<span></span>`, current < ebook.data.lessons.length - 1 && renderTemplate`<a${addAttribute(`/library/${ebook.slug}/?lesson=${current + 1}`, "href")} class="btn-primary">Next Lesson →</a>`, ebook.data.lessons.map((l, i) => renderTemplate`<li> <a${addAttribute(`/library/${ebook.slug}/?lesson=${i}`, "href")}${addAttribute([
    "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
    i === current ? "bg-brand-red/10 text-brand-white" : "text-brand-silver hover:text-brand-white"
  ], "class:list")}${addAttribute(i === current ? "true" : void 0, "aria-current")}> <span${addAttribute([
    "flex h-5 w-5 shrink-0 items-center justify-center border text-[10px] font-mono",
    completed.has(i) ? "border-brand-red bg-brand-red text-white" : "border-brand-line"
  ], "class:list")} aria-hidden="true"> ${completed.has(i) ? "\u2713" : i + 1} </span> <span class="flex-1 truncate">${l.title}</span> <span class="font-mono text-[10px] text-brand-silver">${l.runtime}</span> </a> </li>`)) })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/library/[slug].astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/library/[slug].astro";
const $$url = "/library/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
