/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_g5FSfEVc.mjs';
import { g as getUser } from '../chunks/auth_DJPD9eSZ.mjs';
import { f as formatDate, a as formatPrice } from '../chunks/format_UgvkLNN9.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { supabase, user } = await getUser(Astro2.request, Astro2.cookies);
  if (!user) return Astro2.redirect("/login/?next=/account/");
  const { data: purchases } = await supabase.from("purchases").select("product_title, amount_cents, created_at, status").order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Account | Try This Play", "description": "Your account.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site max-w-2xl py-12"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Account", "title": "Your Account" })} <div class="card mt-8 p-6"> <p class="font-mono text-xs uppercase tracking-wider text-brand-silver">Signed in as</p> <p class="mt-1 font-semibold">${user.email}</p> <form method="POST" action="/api/auth/logout" class="mt-5"> <button type="submit" class="btn-secondary">Sign Out</button> </form> </div> <h2 class="h-display mt-12 text-2xl">Purchase history</h2> ${(purchases ?? []).length === 0 ? renderTemplate`<p class="mt-4 text-sm text-brand-silver">No purchases yet.</p>` : renderTemplate`<ul class="mt-4 divide-y divide-brand-line border-y border-brand-line"> ${(purchases ?? []).map((p) => renderTemplate`<li class="flex items-center justify-between gap-4 py-4 text-sm"> <div> <p class="font-semibold">${p.product_title}</p> <p class="mt-1 font-mono text-xs text-brand-silver"> ${formatDate(new Date(p.created_at))} ${p.status === "refunded" && " \xB7 Refunded"} </p> </div> <span class="font-mono">${formatPrice(p.amount_cents / 100)}</span> </li>`)} </ul>`} <p class="mt-8 text-xs leading-relaxed text-brand-silver">
Need help with a purchase? <a href="/contact/" class="text-brand-red hover:underline">Contact support</a>.
</p> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/account/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/account/index.astro";
const $$url = "/account/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
