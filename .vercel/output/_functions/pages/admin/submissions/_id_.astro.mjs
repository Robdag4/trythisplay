/* empty css                                       */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_CkKY5QST.mjs';
import { r as requireAdmin } from '../../../chunks/adminAuth_mVq6uttz.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_w_KyqO0O.mjs';
import { m as muxSigningConfigured, s as signPlayback } from '../../../chunks/mux_DWQFda0h.mjs';
import { a as formatPrice } from '../../../chunks/format_UgvkLNN9.mjs';
import { s as sendSubmissionDecision } from '../../../chunks/email_CgFGrK62.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { id } = Astro2.params;
  const path = `/admin/submissions/${id}/`;
  const gate = await requireAdmin(Astro2.request, Astro2.cookies, path);
  if (!gate.ok) return Astro2.redirect(gate.redirect);
  const admin = supabaseAdmin();
  let { data: submission } = await admin.from("submissions").select("*").eq("id", id).maybeSingle();
  if (!submission) return Astro2.redirect("/admin/submissions/");
  let { data: product } = await admin.from("products").select("*, creators(display_name, id)").eq("id", submission.product_id).maybeSingle();
  if (!product) return Astro2.redirect("/admin/submissions/");
  let notice = null;
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = String(form.get("_action") ?? "");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    if (action === "approve") {
      await admin.from("products").update({ status: "approved" }).eq("id", product.id);
      await admin.from("submissions").update({ decided_at: now, decision: "approved", reviewer_id: gate.user.id }).eq("id", id);
      notice = "Approved. Use Publish to make it live.";
    } else if (action === "publish") {
      await admin.from("products").update({ status: "published", published_at: now }).eq("id", product.id);
      notice = "Published \u2014 now live on the storefront.";
      await sendSubmissionDecision({ productTitle: product.title, decision: "published", creatorId: product.creators?.id }).catch(() => {
      });
    } else if (action === "reject") {
      await admin.from("products").update({ status: "archived" }).eq("id", product.id);
      await admin.from("submissions").update({ decided_at: now, decision: "rejected", reviewer_id: gate.user.id }).eq("id", id);
      notice = "Rejected.";
      await sendSubmissionDecision({ productTitle: product.title, decision: "rejected", creatorId: product.creators?.id }).catch(() => {
      });
    } else if (action === "changes") {
      const general = String(form.get("comment") ?? "").trim();
      const comments = general ? [{ message: general, created_at: now, author_id: gate.user.id }] : [];
      await admin.from("products").update({ status: "changes_requested" }).eq("id", product.id);
      await admin.from("submissions").update({ decided_at: now, decision: "changes_requested", reviewer_id: gate.user.id, comments }).eq("id", id);
      notice = "Changes requested \u2014 creator notified.";
      await sendSubmissionDecision({ productTitle: product.title, decision: "changes_requested", creatorId: product.creators?.id, note: general }).catch(() => {
      });
    }
    const pr = await admin.from("products").select("*, creators(display_name, id)").eq("id", submission.product_id).maybeSingle();
    product = pr.data ?? product;
    const sr = await admin.from("submissions").select("*").eq("id", id).maybeSingle();
    submission = sr.data ?? submission;
  }
  const { data: lessons } = await admin.from("lessons").select("*").eq("product_id", product.id).order("sort_order");
  const tokens = {};
  for (const l of lessons ?? []) {
    if (l.mux_playback_id && muxSigningConfigured) {
      tokens[l.id] = await signPlayback(l.mux_playback_id, "video", 3600);
    }
  }
  const decided = !!submission.decided_at;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Review: ${product.title} | Admin`, "description": "Review submission.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site max-w-3xl py-10"> <a href="/admin/submissions/" class="text-sm text-brand-silver hover:text-brand-white">← Queue</a> <div class="mt-2 flex flex-wrap items-center gap-3"> <h1 class="h-display text-2xl">${product.title}</h1> <span class="border border-brand-line px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-silver">${product.status.replace("_", " ")}</span> </div> <p class="mt-1 font-mono text-xs text-brand-silver">
by ${product.creators?.display_name} · /ebooks/${product.slug}/ · ${formatPrice((product.price_cents ?? 0) / 100)} · ${product.category} · ${product.difficulty} </p> ${notice && renderTemplate`<p class="mt-4 border border-emerald-600/40 bg-emerald-950/15 p-3 text-sm text-emerald-300">${notice}</p>`} <!-- Product overview --> <div class="mt-6 grid gap-2"> <div class="text-sm"><span class="text-brand-silver">Short:</span> ${product.short_description}</div> ${product.cover_image_url && renderTemplate`<img${addAttribute(product.cover_image_url, "src")} alt="" width="160" class="mt-2 aspect-[4/5] w-40 border border-brand-line object-cover">`} </div> <!-- Lessons --> <h2 class="h-display mt-10 text-xl">Lessons (${lessons?.length ?? 0})</h2> <div class="mt-4 grid gap-6"> ${(lessons ?? []).map((l, i) => {
    const ws = l.written_setup ?? {};
    return renderTemplate`<div class="card p-5"> <div class="flex items-center justify-between"> <div class="font-semibold">${i + 1}. ${l.title}</div> <div class="flex gap-2 text-[10px] uppercase"> <span${addAttribute(l.status === "ready" ? "text-emerald-400" : "text-yellow-400", "class")}>${l.status}</span> ${l.free_preview && renderTemplate`<span class="text-emerald-400">free</span>`} ${l.written_setup_approved_at ? renderTemplate`<span class="text-sky-400">setup ✓</span>` : renderTemplate`<span class="text-red-400">no setup</span>`} </div> </div> ${l.mux_playback_id && tokens[l.id] ? renderTemplate`${renderComponent($$result2, "mux-player", "mux-player", { "class": "mt-3 block aspect-video w-full overflow-hidden rounded", "playback-id": l.mux_playback_id, "playback-token": tokens[l.id], "stream-type": "on-demand" })}` : renderTemplate`<p class="mt-3 text-xs text-brand-silver">No playable video (status: ${l.status}).</p>`} ${ws.play && renderTemplate`<div class="mt-3 grid gap-1 text-xs text-brand-silver"> <div><b class="text-brand-white">Formation:</b> ${ws.formation} · <b class="text-brand-white">Play:</b> ${ws.play}</div> ${ws.reads?.length ? renderTemplate`<div><b class="text-brand-white">Reads:</b> ${ws.reads.join(" \u2192 ")}</div>` : null} ${ws.counters?.length ? renderTemplate`<div><b class="text-brand-white">Counters:</b> ${ws.counters.join(", ")}</div>` : null} </div>`} ${l.transcript && renderTemplate`<details class="mt-3"><summary class="cursor-pointer text-xs text-brand-silver">Transcript</summary> <p class="mt-2 text-xs leading-relaxed text-brand-silver">${l.transcript.slice(0, 2e3)}</p> </details>`} </div>`;
  })} </div> <!-- Decision actions --> ${!decided && product.status === "submitted" ? renderTemplate`<div class="mt-10 border-t border-brand-line pt-8"> <h2 class="h-display text-xl">Decision</h2> <div class="mt-4 flex flex-wrap gap-3"> <form method="POST"><input type="hidden" name="_action" value="approve"><button class="btn-primary">Approve</button></form> <form method="POST"><input type="hidden" name="_action" value="reject"><button class="btn-secondary">Reject</button></form> </div> <form method="POST" class="mt-6 grid max-w-xl gap-3"> <input type="hidden" name="_action" value="changes"> <label class="text-sm font-semibold" for="comment">Request changes (comment shown to creator)</label> <textarea id="comment" name="comment" rows="3" required class="w-full border border-brand-line bg-brand-panel px-4 py-3 text-sm focus:border-brand-red"></textarea> <button class="btn-secondary w-fit">Request Changes</button> </form> </div>` : product.status === "approved" ? renderTemplate`<div class="mt-10 border-t border-brand-line pt-8"> <p class="text-sm text-brand-silver">Approved and ready to go live.</p> <form method="POST" class="mt-3"><input type="hidden" name="_action" value="publish"><button class="btn-primary">Publish Now</button></form> </div>` : renderTemplate`<p class="mt-10 border-t border-brand-line pt-8 text-sm text-brand-silver">
Decision recorded: <b>${submission.decision ?? product.status}</b>.
</p>`} </section> ${muxSigningConfigured && renderTemplate(_a || (_a = __template(['<script src="https://cdn.jsdelivr.net/npm/@mux/mux-player@2"><\/script>'])))}` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/submissions/[id]/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/admin/submissions/[id]/index.astro";
const $$url = "/admin/submissions/[id]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
