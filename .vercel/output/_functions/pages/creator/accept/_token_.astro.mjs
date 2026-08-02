/* empty css                                       */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$SectionHeading } from '../../../chunks/SectionHeading_g5FSfEVc.mjs';
import { g as getUser } from '../../../chunks/auth_DJPD9eSZ.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_w_KyqO0O.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { token } = Astro2.params;
  const { user } = await getUser(Astro2.request, Astro2.cookies);
  if (!user) {
    return Astro2.redirect(`/login/?next=${encodeURIComponent(`/creator/accept/${token}/`)}`);
  }
  let state = "invalid";
  const admin = supabaseAdmin();
  const { data: invite } = await admin.from("creator_invitations").select("id, email, expires_at, accepted_at").eq("token", token).maybeSingle();
  const { data: existing } = await admin.from("creators").select("id").eq("id", user.id).maybeSingle();
  if (existing) {
    state = "already";
  } else if (!invite) {
    state = "invalid";
  } else if (invite.accepted_at) {
    state = "used";
  } else if (new Date(invite.expires_at).getTime() < Date.now()) {
    state = "expired";
  } else {
    const displayName = (user.email ? user.email.split("@")[0] : "Creator").replace(/[^a-zA-Z0-9 _-]/g, "") || "Creator";
    const { error: insertErr } = await admin.from("creators").insert({
      id: user.id,
      display_name: displayName,
      status: "active"
    });
    if (!insertErr) {
      await admin.from("creator_invitations").update({ accepted_at: (/* @__PURE__ */ new Date()).toISOString(), accepted_by: user.id }).eq("id", invite.id);
      state = "accepted";
    } else {
      console.error("accept invitation insert failed:", insertErr.message);
      state = "invalid";
    }
  }
  const copy = {
    accepted: {
      title: "You're In",
      body: "Your creator account is active. Head to the portal to build your first video ebook.",
      cta: { href: "/creator/", label: "Open Creator Portal" }
    },
    already: {
      title: "Already a Creator",
      body: "This account already has creator access.",
      cta: { href: "/creator/", label: "Open Creator Portal" }
    },
    used: {
      title: "Invitation Already Used",
      body: "This invitation link has already been redeemed. If that wasn't you, contact support.",
      cta: { href: "/library/", label: "Back to Library" }
    },
    expired: {
      title: "Invitation Expired",
      body: "This invitation has expired. Ask for a fresh invite link.",
      cta: { href: "/creators/apply/", label: "Apply to Create" }
    },
    invalid: {
      title: "Invalid Invitation",
      body: "We couldn't verify this invitation link.",
      cta: { href: "/creators/apply/", label: "Apply to Create" }
    }
  };
  const c = copy[state];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Accept Invitation | Try This Play", "description": "Accept your creator invitation.", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-site flex min-h-[50vh] items-center justify-center py-12"> <div class="card w-full max-w-lg p-8"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Creator Invitation", "title": c.title })} <p class="mt-4 text-brand-silver leading-relaxed">${c.body}</p> ${c.cta && renderTemplate`<a${addAttribute(c.cta.href, "href")} class="btn-primary mt-6 inline-block">${c.cta.label}</a>`} </div> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/accept/[token]/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/creator/accept/[token]/index.astro";
const $$url = "/creator/accept/[token]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
