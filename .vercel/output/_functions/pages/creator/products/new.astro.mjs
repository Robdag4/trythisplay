/* empty css                                       */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../../../chunks/SectionHeading_g5FSfEVc.mjs';
import { r as requireCreator } from '../../../chunks/creator_lgkQp4MY.mjs';
import { s as slugify, v as validateProductSlug } from '../../../chunks/slug_kiIBs-7p.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_w_KyqO0O.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const path = "/creator/products/new/";
  const guard = await requireCreator(Astro2.request, Astro2.cookies, path);
  if (!guard.ok) {
    if (guard.redirect?.startsWith("/login")) return Astro2.redirect(guard.redirect);
    return Astro2.redirect("/creator/");
  }
  let error = null;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const title = String(form.get("title") ?? "").trim();
    let slug = slugify(title);
    if (!title) {
      error = "Give your ebook a title to start.";
    } else {
      let slugErr = await validateProductSlug(slug);
      if (slugErr) {
        for (let i = 0; i < 5 && slugErr; i++) {
          const suffix = Math.random().toString(36).slice(2, 6);
          slug = slugify(`${title}-${suffix}`);
          slugErr = await validateProductSlug(slug);
        }
      }
      if (slugErr) {
        error = "Couldn't generate a unique URL from that title. Try a different title.";
      } else {
        const admin = supabaseAdmin();
        const { data, error: insErr } = await admin.from("products").insert({
          title,
          slug,
          creator_id: guard.creator.id,
          status: "draft",
          current_madden_version: "Madden 27"
        }).select("id").single();
        if (insErr || !data) {
          console.error("create product failed:", insErr?.message);
          error = "Could not create the product. Try again.";
        } else {
          return Astro2.redirect(`/creator/products/${data.id}/`);
        }
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "New Ebook | Creator Portal", "description": "Create a new ebook.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site max-w-xl py-12"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Creator Portal", "title": "New Ebook" })} <p class="mt-3 text-sm text-brand-silver">
Start with a working title. You can refine everything — including the URL
      slug — before you submit for review.
</p> ${error && renderTemplate`<p class="mt-5 border border-brand-red/50 bg-brand-red/10 p-3 text-sm">${error}</p>`} <form method="POST" class="mt-6 grid gap-5"> <div> <label for="title" class="block text-sm font-semibold">Title</label> <input id="title" name="title" type="text" required maxlength="120" placeholder="e.g. Gun Bunch Mastery" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> <p class="mt-1 text-xs text-brand-silver">The page URL is generated automatically from your title.</p> </div> <div class="flex gap-3"> <button type="submit" class="btn-primary">Create Draft</button> <a href="/creator/" class="btn-secondary">Cancel</a> </div> </form> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/products/new/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/products/new/index.astro";
const $$url = "/creator/products/new/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
