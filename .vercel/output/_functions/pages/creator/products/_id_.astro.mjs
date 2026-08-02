/* empty css                                       */
import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_CkKY5QST.mjs';
import { r as requireCreator } from '../../../chunks/creator_lgkQp4MY.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_w_KyqO0O.mjs';
import { s as slugify, v as validateProductSlug } from '../../../chunks/slug_kiIBs-7p.mjs';
import 'clsx';
import { $ as $$EbookCard } from '../../../chunks/EbookCard_Cp3Ck2eO.mjs';
import { a as getProductByIdAdmin } from '../../../chunks/products_X9YWEcqr.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$3 = createAstro("https://trythisplay.com");
const $$DetailsTab = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DetailsTab;
  const { product, editable, creatorName } = Astro2.props;
  const dollars = ((product.price_cents ?? 0) / 100).toFixed(2);
  const fieldset = editable ? "" : "pointer-events-none opacity-60";
  const authorValue = product.author_name ?? creatorName ?? "";
  return renderTemplate`${maybeRenderHead()}<form method="POST" enctype="multipart/form-data"${addAttribute(`grid max-w-2xl gap-5 ${fieldset}`, "class")}> <input type="hidden" name="_action" value="details"> <div> <label class="block text-sm font-semibold" for="title">Title</label> <input id="title" name="title" type="text" required maxlength="120"${addAttribute(product.title, "value")} data-preview="title" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> </div> <div> <label class="block text-sm font-semibold" for="author_name">Author name</label> <input id="author_name" name="author_name" type="text" maxlength="80"${addAttribute(authorValue, "value")} data-preview="author" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> <p class="mt-1 text-xs text-brand-silver">Shown as the ebook's creator. Defaults to your profile name.</p> </div> <div> <span class="block text-sm font-semibold">Page URL</span> <div class="mt-2 flex items-center border border-brand-line bg-brand-charcoal/60 px-4 py-3"> <span class="font-mono text-xs text-brand-silver">/ebooks/${product.slug}/</span> </div> <p class="mt-1 text-xs text-brand-silver">Generated from your title.${product.published_at ? " Locked after publishing." : " Updates when you rename before publishing."}</p> </div> <!-- Cover (moved here from the old Cover tab). --> <div> <span class="block text-sm font-semibold">Cover image</span> <div class="mt-2 flex items-start gap-4"> <div class="aspect-[4/5] w-28 shrink-0 overflow-hidden border border-brand-line bg-brand-charcoal"> ${product.cover_image_url ? renderTemplate`<img${addAttribute(product.cover_image_url, "src")}${addAttribute(product.cover_image_alt ?? "Cover", "alt")} class="h-full w-full object-cover">` : renderTemplate`<div class="flex h-full w-full items-center justify-center p-2 text-center text-[10px] text-brand-silver">No cover</div>`} </div> <div class="flex-1"> <input id="cover" name="cover" type="file" accept="image/jpeg,image/png,image/webp" class="w-full text-sm text-brand-silver file:mr-3 file:border file:border-brand-line file:bg-brand-panel file:px-3 file:py-2 file:text-sm"> <p class="mt-1 text-xs text-brand-silver">4:5 portrait, JPG/PNG/WebP, under 3&nbsp;MB. Alt text is generated from your title.</p> </div> </div> </div> <div> <label class="block text-sm font-semibold" for="short_description">Short description</label> <input id="short_description" name="short_description" type="text" maxlength="300"${addAttribute(product.short_description ?? "", "value")} placeholder="One line shown on cards and search." class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> </div> <div> <label class="block text-sm font-semibold" for="full_description">Full description (markdown)</label> <textarea id="full_description" name="full_description" rows="6" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red">${product.full_description ?? ""}</textarea> </div> <div class="grid gap-4 sm:grid-cols-2"> <div> <label class="block text-sm font-semibold" for="category">Category</label> <select id="category" name="category" data-preview="category" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm"> ${["offense", "defense"].map((c) => renderTemplate`<option${addAttribute(c, "value")}${addAttribute(product.category === c, "selected")}>${c}</option>`)} </select> </div> <div> <label class="block text-sm font-semibold" for="difficulty">Difficulty</label> <select id="difficulty" name="difficulty" data-preview="difficulty" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm"> ${["beginner", "intermediate", "advanced"].map((d) => renderTemplate`<option${addAttribute(d, "value")}${addAttribute(product.difficulty === d, "selected")}>${d}</option>`)} </select> </div> </div> <div> <span class="block text-sm font-semibold">Play styles</span> <div class="mt-2 flex gap-4"> ${["competitive", "simulation"].map((s) => renderTemplate`<label class="flex items-center gap-2 text-sm"> <input type="checkbox" name="styles"${addAttribute(s, "value")}${addAttribute((product.styles ?? []).includes(s), "checked")}> ${s} </label>`)} </div> </div> <div class="grid gap-4 sm:grid-cols-2"> <div> <label class="block text-sm font-semibold" for="playbook">Playbook (optional)</label> <input id="playbook" name="playbook" type="text"${addAttribute(product.playbook ?? "", "value")} class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> </div> <div> <label class="block text-sm font-semibold" for="formation">Formation (optional)</label> <input id="formation" name="formation" type="text"${addAttribute(product.formation ?? "", "value")} class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> </div> </div> <div> <label class="block text-sm font-semibold" for="price">Price (USD)</label> <input id="price" name="price" type="number" min="1" max="500" step="1"${addAttribute(dollars, "value")} data-preview="price" class="mt-2 w-40 border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> <p class="mt-1 text-xs text-brand-silver">$1–$500.</p> </div> <div> <label class="block text-sm font-semibold" for="what_you_will_learn">What you'll learn (one per line)</label> <textarea id="what_you_will_learn" name="what_you_will_learn" rows="4" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red">${(product.what_you_will_learn ?? []).join("\n")}</textarea> </div> <div> <label class="block text-sm font-semibold" for="who_this_is_for">Who this is for (one per line)</label> <textarea id="who_this_is_for" name="who_this_is_for" rows="3" class="mt-2 w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red">${(product.who_this_is_for ?? []).join("\n")}</textarea> </div> ${editable && renderTemplate`<button type="submit" class="btn-primary w-fit">Save Details</button>`} </form>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/creator/DetailsTab.astro", void 0);

const $$Astro$2 = createAstro("https://trythisplay.com");
const $$LessonsTab = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LessonsTab;
  const { product, lessons, editable } = Astro2.props;
  function fmt(sec) {
    if (!sec) return "\u2014";
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  const statusDot = {
    uploading: "bg-yellow-500",
    processing: "bg-yellow-500",
    ready: "bg-emerald-500",
    error: "bg-red-500"
  };
  return renderTemplate`${maybeRenderHead()}<div class="max-w-2xl"> <p class="text-sm text-brand-silver">
Add lessons in order. Each needs a video (uploaded to Mux) and, before you can
    submit, an approved written setup. At least one lesson must be a free preview.
</p> ${lessons.length === 0 ? renderTemplate`<div class="mt-6 border border-dashed border-brand-line bg-brand-panel p-8 text-center text-sm text-brand-silver">
No lessons yet. Add your first below.
</div>` : renderTemplate`<ol class="mt-6 grid gap-2"> ${lessons.map((l, i) => renderTemplate`<li class="card flex items-center justify-between p-4"> <div class="flex items-center gap-3"> <span class="font-mono text-xs text-brand-silver">${i + 1}</span> <div> <div class="font-semibold">${l.title || "Untitled lesson"}</div> <div class="mt-0.5 flex items-center gap-2 text-xs text-brand-silver"> <span${addAttribute(`inline-block h-2 w-2 rounded-full ${statusDot[l.status] ?? "bg-brand-line"}`, "class")}></span> ${l.status} · ${fmt(l.runtime_seconds)} ${l.free_preview && renderTemplate`<span class="text-emerald-400">· free preview</span>`} ${l.written_setup_approved_at && renderTemplate`<span class="text-sky-400">· setup approved</span>`} </div> </div> </div> ${editable && renderTemplate`<a${addAttribute(`/creator/products/${product.id}/lessons/${l.id}/`, "href")} class="btn-secondary text-xs">Edit</a>`} </li>`)} </ol>`} ${editable && renderTemplate`<form method="POST"${addAttribute(`/creator/products/${product.id}/lessons/`, "action")} class="mt-6 flex gap-2"> <input type="hidden" name="_action" value="add"> <input name="title" type="text" required maxlength="120" placeholder="New lesson title" class="flex-1 border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"> <button type="submit" class="btn-primary">Create Lesson</button> </form>`} </div>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/creator/LessonsTab.astro", void 0);

const $$Astro$1 = createAstro("https://trythisplay.com");
const $$SubmitTab = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SubmitTab;
  const { product, lessons, submission } = Astro2.props;
  const readyLessons = lessons.filter((l) => l.status === "ready");
  const hasFreePreview = lessons.some((l) => l.free_preview);
  const allSetupsApproved = lessons.length > 0 && lessons.every((l) => !!l.written_setup_approved_at);
  const checks = [
    { ok: !!product.title && !!product.short_description, label: "Title and short description filled" },
    { ok: (product.price_cents ?? 0) >= 100, label: "Price set ($1 minimum)" },
    { ok: !!product.cover_image_url, label: "Cover image uploaded" },
    { ok: readyLessons.length >= 3, label: "At least 3 lessons uploaded and ready" },
    { ok: hasFreePreview, label: "At least one free-preview lesson" },
    { ok: allSetupsApproved, label: "Every lesson's written setup approved" }
  ];
  const allPass = checks.every((c) => c.ok);
  const canSubmit = allPass && (product.status === "draft" || product.status === "changes_requested");
  const comments = submission?.comments ?? [];
  const showComments = product.status === "changes_requested" && comments.length > 0;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-2xl"> ${showComments && renderTemplate`<div class="mb-6 border border-orange-600/40 bg-orange-950/15 p-4"> <div class="text-sm font-bold text-orange-300">Reviewer requested changes</div> <ul class="mt-2 grid gap-2"> ${comments.map((c) => renderTemplate`<li class="text-sm text-brand-silver"> ${c.lesson_id && renderTemplate`<span class="font-mono text-xs text-orange-400">lesson · </span>`} ${c.field && renderTemplate`<span class="font-mono text-xs text-orange-400">${c.field} · </span>`} ${c.message} </li>`)} </ul> </div>`} <p class="text-sm text-brand-silver">Everything below must pass before you can submit for review.</p> <ul class="mt-5 grid gap-2"> ${checks.map((c) => renderTemplate`<li class="flex items-center gap-3 text-sm"> <span${addAttribute(`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${c.ok ? "bg-emerald-600 text-white" : "border border-brand-line text-brand-silver"}`, "class")}> ${c.ok ? "\u2713" : ""} </span> <span${addAttribute(c.ok ? "text-brand-white" : "text-brand-silver", "class")}>${c.label}</span> </li>`)} </ul> ${product.status === "submitted" ? renderTemplate`<p class="mt-6 border border-yellow-600/40 bg-yellow-950/15 p-3 text-sm text-yellow-300">
Submitted — in the review queue. Editing is locked until a decision.
</p>` : renderTemplate`<form method="POST"${addAttribute(`/creator/products/${product.id}/submit/`, "action")} class="mt-6"> <button type="submit" class="btn-primary"${addAttribute(!canSubmit, "disabled")}>
Submit for Review
</button> ${!allPass && renderTemplate`<p class="mt-2 text-xs text-brand-silver">Complete every item above to enable submission.</p>`} </form>`} </div>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/creator/SubmitTab.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
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
  const admin = supabaseAdmin();
  let { data: product } = await admin.from("products").select("*").eq("id", id).maybeSingle();
  if (!product || product.creator_id !== guard.creator.id) {
    return Astro2.redirect("/creator/");
  }
  const editable = product.status === "draft" || product.status === "changes_requested";
  let notice = null;
  let error = null;
  if (Astro2.request.method === "POST" && editable) {
    const form = await Astro2.request.formData();
    const action = String(form.get("_action") ?? "");
    if (action === "details") {
      const title = String(form.get("title") ?? "").trim();
      let slug = product.slug;
      let slugErr = null;
      if (!product.published_at) {
        slug = slugify(title);
        slugErr = await validateProductSlug(slug, product.id);
        for (let i = 0; i < 5 && slugErr; i++) {
          slug = slugify(`${title}-${Math.random().toString(36).slice(2, 6)}`);
          slugErr = await validateProductSlug(slug, product.id);
        }
      }
      if (!title) error = "Title is required.";
      else if (slugErr) error = "Couldn't generate a unique URL from that title.";
      else {
        const priceDollars = Math.max(1, Math.min(500, Number(form.get("price") ?? 0)));
        const styles = form.getAll("styles").map(String).filter((s) => ["competitive", "simulation"].includes(s));
        const categoryRaw = String(form.get("category") ?? "offense");
        const category = ["offense", "defense", "franchise"].includes(categoryRaw) ? categoryRaw : "offense";
        const patch = {
          title,
          slug,
          author_name: String(form.get("author_name") ?? "").trim() || null,
          short_description: String(form.get("short_description") ?? "").slice(0, 300),
          full_description: String(form.get("full_description") ?? ""),
          category,
          difficulty: String(form.get("difficulty") ?? "beginner"),
          styles,
          playbook: String(form.get("playbook") ?? "").trim() || null,
          formation: String(form.get("formation") ?? "").trim() || null,
          price_cents: Math.round(priceDollars * 100),
          what_you_will_learn: String(form.get("what_you_will_learn") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
          who_this_is_for: String(form.get("who_this_is_for") ?? "").split("\n").map((s) => s.trim()).filter(Boolean)
        };
        const cover = form.get("cover");
        if (cover instanceof File && cover.size > 0) {
          const OK = ["image/jpeg", "image/png", "image/webp"];
          const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
          if (!OK.includes(cover.type)) error = "Cover must be JPG, PNG, or WebP.";
          else if (cover.size > 3 * 1024 * 1024) error = "Cover must be under 3 MB.";
          else {
            const key = `${product.id}/cover-${Date.now()}.${EXT[cover.type]}`;
            const bytes = new Uint8Array(await cover.arrayBuffer());
            const { error: sErr } = await admin.storage.from("covers").upload(key, bytes, { contentType: cover.type, upsert: true });
            if (sErr) {
              console.error("cover upload:", sErr.message);
              error = "Cover upload failed (is the 'covers' bucket created?).";
            } else {
              const { data: pub } = admin.storage.from("covers").getPublicUrl(key);
              patch.cover_image_url = pub.publicUrl;
              patch.cover_image_alt = `${title} \u2014 Madden 27 video ebook cover`.slice(0, 160);
            }
          }
        }
        if (!error) {
          const { error: upErr } = await admin.from("products").update(patch).eq("id", product.id);
          if (upErr) {
            console.error(upErr.message);
            error = "Save failed. Try again.";
          } else {
            notice = "Details saved.";
            product = { ...product, ...patch };
          }
        }
      }
    }
  }
  const { data: lessons } = await admin.from("lessons").select("*").eq("product_id", product.id).order("sort_order", { ascending: true });
  const { data: submission } = await admin.from("submissions").select("*").eq("product_id", product.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
  const previewEntry = await getProductByIdAdmin(product.id);
  const tab = Astro2.url.searchParams.get("tab") ?? "details";
  const TABS = [
    { key: "details", label: "Details" },
    { key: "lessons", label: "Lessons" },
    { key: "preview", label: "Preview" },
    { key: "submit", label: "Submit" }
  ];
  const statusChip = {
    draft: "border-brand-line text-brand-silver",
    submitted: "border-yellow-500/50 text-yellow-400",
    changes_requested: "border-orange-500/50 text-orange-400",
    approved: "border-sky-500/50 text-sky-400",
    published: "border-emerald-500/50 text-emerald-400",
    archived: "border-brand-line text-brand-silver/60"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${product.title} | Creator Portal`, "description": "Edit ebook.", "noindex": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="container-site py-10"> <div class="flex flex-wrap items-center justify-between gap-3"> <div class="flex items-center gap-3"> <a href="/creator/" class="text-sm text-brand-silver hover:text-brand-white">\u2190 Portal</a> <h1 class="h-display text-2xl">', "</h1> <span", ">", "</span> </div> ", " </div> ", " ", " ", ' <!-- Tabs --> <nav class="mt-6 flex flex-wrap gap-1 border-b border-brand-line"> ', ' </nav> <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]"> <div> ', " ", " ", " ", ' </div> <!-- Live marketplace card preview (updates as Details fields change) --> <aside class="lg:sticky lg:top-8 lg:self-start"> <div class="text-[10px] font-bold uppercase tracking-widest text-brand-silver">Marketplace card preview</div> <div id="card-preview" class="mt-3"> ', ' </div> <p class="mt-3 text-[11px] leading-relaxed text-brand-silver">\nThis is how your ebook appears on the marketplace. It updates live as you\n          edit \u2014 save to persist.\n</p> </aside> </div> </section>  <script>\n    (function () {\n      const map = {\n        title: ["[data-card=\\"title\\"]"],\n        author: ["[data-card=\\"author\\"]"],\n        price: ["[data-card=\\"price\\"]"],\n        category: ["[data-card=\\"category\\"]"],\n        difficulty: ["[data-card=\\"difficulty\\"]"],\n      };\n      const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;\n      function bind(el) {\n        const key = el.getAttribute("data-preview");\n        const sels = map[key];\n        if (!sels) return;\n        const update = () => {\n          let v = el.value;\n          if (key === "price") { const n = parseFloat(v || "0"); v = isNaN(n) ? "" : "$" + n.toFixed(2); }\n          if (key === "category" || key === "difficulty") v = cap(v);\n          sels.forEach((s) => document.querySelectorAll(s).forEach((t) => { t.textContent = v; }));\n        };\n        el.addEventListener("input", update);\n        el.addEventListener("change", update);\n      }\n      document.querySelectorAll("[data-preview]").forEach(bind);\n    })();\n  <\/script> '], [" ", '<section class="container-site py-10"> <div class="flex flex-wrap items-center justify-between gap-3"> <div class="flex items-center gap-3"> <a href="/creator/" class="text-sm text-brand-silver hover:text-brand-white">\u2190 Portal</a> <h1 class="h-display text-2xl">', "</h1> <span", ">", "</span> </div> ", " </div> ", " ", " ", ' <!-- Tabs --> <nav class="mt-6 flex flex-wrap gap-1 border-b border-brand-line"> ', ' </nav> <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]"> <div> ', " ", " ", " ", ' </div> <!-- Live marketplace card preview (updates as Details fields change) --> <aside class="lg:sticky lg:top-8 lg:self-start"> <div class="text-[10px] font-bold uppercase tracking-widest text-brand-silver">Marketplace card preview</div> <div id="card-preview" class="mt-3"> ', ' </div> <p class="mt-3 text-[11px] leading-relaxed text-brand-silver">\nThis is how your ebook appears on the marketplace. It updates live as you\n          edit \u2014 save to persist.\n</p> </aside> </div> </section>  <script>\n    (function () {\n      const map = {\n        title: ["[data-card=\\\\"title\\\\"]"],\n        author: ["[data-card=\\\\"author\\\\"]"],\n        price: ["[data-card=\\\\"price\\\\"]"],\n        category: ["[data-card=\\\\"category\\\\"]"],\n        difficulty: ["[data-card=\\\\"difficulty\\\\"]"],\n      };\n      const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;\n      function bind(el) {\n        const key = el.getAttribute("data-preview");\n        const sels = map[key];\n        if (!sels) return;\n        const update = () => {\n          let v = el.value;\n          if (key === "price") { const n = parseFloat(v || "0"); v = isNaN(n) ? "" : "$" + n.toFixed(2); }\n          if (key === "category" || key === "difficulty") v = cap(v);\n          sels.forEach((s) => document.querySelectorAll(s).forEach((t) => { t.textContent = v; }));\n        };\n        el.addEventListener("input", update);\n        el.addEventListener("change", update);\n      }\n      document.querySelectorAll("[data-preview]").forEach(bind);\n    })();\n  <\/script> '])), maybeRenderHead(), product.title, addAttribute(`border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusChip[product.status]}`, "class"), product.status.replace("_", " "), product.status === "published" && renderTemplate`<a${addAttribute(`/ebooks/${product.slug}/`, "href")} class="btn-secondary text-sm">View live</a>`, !editable && renderTemplate`<p class="mt-4 border border-yellow-600/40 bg-yellow-950/15 p-3 text-sm text-yellow-300">
This product is <b>${product.status.replace("_", " ")}</b> and is locked for editing.
${product.status === "submitted" && " It's in the review queue."} </p>`, notice && renderTemplate`<p class="mt-4 border border-emerald-600/40 bg-emerald-950/15 p-3 text-sm text-emerald-300">${notice}</p>`, error && renderTemplate`<p class="mt-4 border border-brand-red/50 bg-brand-red/10 p-3 text-sm">${error}</p>`, TABS.map((t) => renderTemplate`<a${addAttribute(`${path}?tab=${t.key}`, "href")}${addAttribute(`px-4 py-2 text-sm font-semibold ${tab === t.key ? "border-b-2 border-brand-red text-brand-white" : "text-brand-silver hover:text-brand-white"}`, "class")}> ${t.label} </a>`), tab === "details" && renderTemplate`${renderComponent($$result2, "DetailsTab", $$DetailsTab, { "product": product, "editable": editable, "creatorName": guard.creator.display_name })}`, tab === "lessons" && renderTemplate`${renderComponent($$result2, "LessonsTab", $$LessonsTab, { "product": product, "lessons": lessons ?? [], "editable": editable })}`, tab === "preview" && renderTemplate`<div class="rounded border border-brand-line bg-brand-panel p-6"> <p class="text-sm text-brand-silver">
A watermarked draft preview of your public product page opens in a new tab.
</p> <a${addAttribute(`/creator/products/${product.id}/preview/`, "href")} target="_blank" class="btn-primary mt-4 inline-block">Open Draft Preview</a> </div>`, tab === "submit" && renderTemplate`${renderComponent($$result2, "SubmitTab", $$SubmitTab, { "product": product, "lessons": lessons ?? [], "submission": submission })}`, previewEntry ? renderTemplate`${renderComponent($$result2, "EbookCard", $$EbookCard, { "ebook": previewEntry })}` : renderTemplate`<p class="text-xs text-brand-silver">Save details to see your card.</p>`) })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/products/[id]/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/products/[id]/index.astro";
const $$url = "/creator/products/[id]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
