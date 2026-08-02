import { b as createAstro, c as createComponent, d as addAttribute, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead, o as renderScript, r as renderComponent, p as renderSlot, q as renderHead } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';

const SITE = {
  name: "Try This Play",
  url: "https://trythisplay.com",
  maddenVersion: "Madden 27",
  description: "Master Madden 27 with video ebooks, written setups, offensive and defensive schemes, competitive leagues, and realistic simulation franchises.",
  supportEmail: "support@trythisplay.com"
};
const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Ebooks", href: "/ebooks/" },
  { label: "Franchise", href: "/franchise/" },
  { label: "Meet The Team", href: "/team/" },
  { label: "Contact Us", href: "/contact/" }
];
const EBOOK_CATEGORIES = [
  {
    slug: "offense",
    label: "Offense",
    intro: "Offensive ebooks teach complete schemes: base plays, audibles, pre-snap setups, reads against every coverage shell, and blitz answers, delivered as video lessons with structured written setups.",
    guidance: "Pick an offensive ebook built around a playbook you enjoy. Beginners should favor compressed formations with simple first reads; advanced players can look for full-field spread schemes."
  },
  {
    slug: "defense",
    label: "Defense",
    intro: "Defensive ebooks cover coverage shells, disguises, user-lurk techniques, run fits, and pressure packages, with written adjustments for every situation.",
    guidance: "Choose a defensive ebook that matches how you like to defend: coverage-first systems for patient players, or blitz-heavy schemes if you want to dictate tempo."
  },
  {
    slug: "franchise",
    label: "Franchise",
    intro: "Franchise ebooks go deep on team building: drafting, scouting, salary cap management, trades, player development, and season-long strategy for both competitive and simulation leagues.",
    guidance: "Franchise products pair well with our league communities. Look for guides that match your league style, competitive or simulation."
  },
  {
    slug: "beginners",
    label: "Beginners",
    intro: "Beginner ebooks assume nothing. They teach reads, hot routes, adjustments, and core Madden 27 mechanics step by step so new players can compete quickly.",
    guidance: "Start with one offensive scheme and one defensive base. Mastering a small toolkit beats collecting products."
  },
  {
    slug: "advanced",
    label: "Advanced",
    intro: "Advanced ebooks are built for ranked and tournament play: layered scheme trees, counter systems, and adjustments that hold up against opponents who adapt.",
    guidance: "Advanced products expect fluency with hot routes and pre-snap reads. If a setup description reads like a foreign language, start one level down."
  },
  {
    slug: "competitive",
    label: "Competitive",
    intro: "Competitive ebooks focus on head-to-head user play: meta schemes, tournament-tested setups, and the counters you need when opponents adjust.",
    guidance: "Check the last-updated date. Competitive metas shift with patches, and current products list the patch they were tested on."
  },
  {
    slug: "simulation",
    label: "Simulation",
    intro: "Simulation ebooks teach realistic, NFL-style play: balanced play calling, situational football, and franchise management that respects sim rules.",
    guidance: "These products pair naturally with our Simulation Franchise league and its rule set."
  }
];

const $$Astro$2 = createAstro("https://trythisplay.com");
const $$SEOHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SEOHead;
  const {
    title,
    description,
    canonical,
    noindex = false,
    ogType = "website",
    ogImage = "/og-default.png",
    publishedAt,
    updatedAt,
    author
  } = Astro2.props;
  const canonicalUrl = canonical ?? new URL(Astro2.url.pathname, SITE.url).href;
  const ogImageUrl = new URL(ogImage, SITE.url).href;
  return renderTemplate`<title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<meta property="og:site_name"${addAttribute(SITE.name, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:type"${addAttribute(ogType === "product" ? "website" : ogType, "content")}><meta property="og:image"${addAttribute(ogImageUrl, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageUrl, "content")}>${author && renderTemplate`<meta name="author"${addAttribute(author, "content")}>`}${publishedAt && renderTemplate`<meta property="article:published_time"${addAttribute(publishedAt.toISOString(), "content")}>`}${updatedAt && renderTemplate`<meta property="article:modified_time"${addAttribute(updatedAt.toISOString(), "content")}>`}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/seo/SEOHead.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$OrganizationSchema = createComponent(($$result, $$props, $$slots) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    email: SITE.supportEmail
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/seo/OrganizationSchema.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$WebsiteSchema = createComponent(($$result, $$props, $$slots) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/seo/WebsiteSchema.astro", void 0);

const $$Astro$1 = createAstro("https://trythisplay.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  const isActive = (href) => href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 border-b border-brand-line bg-brand-black/90 backdrop-blur"> <div class="container-site flex h-16 items-center justify-between gap-4"> <a href="/" class="flex items-center gap-2" aria-label="Try This Play home"> <span class="font-display text-xl uppercase tracking-wide">
Try<span class="text-brand-red">This</span>Play
</span> </a> <nav aria-label="Primary" class="hidden lg:block"> <ul class="flex items-center gap-8"> ${NAV_PRIMARY.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(isActive(item.href) ? "page" : void 0, "aria-current")}${addAttribute([
    "text-sm font-semibold uppercase tracking-wider transition-colors",
    isActive(item.href) ? "text-brand-red" : "text-brand-silver hover:text-brand-white"
  ], "class:list")}> ${item.label} </a> </li>`)} </ul> </nav> <div class="hidden items-center gap-3 lg:flex"> <a href="/library/" class="text-sm font-semibold uppercase tracking-wider text-brand-silver hover:text-brand-white">
My Library
</a> <a href="/login/" class="text-sm font-semibold uppercase tracking-wider text-brand-silver hover:text-brand-white">
Login
</a> <a href="/ebooks/" class="btn-primary !py-2 !px-4 text-xs">Browse Ebooks</a> </div> <button id="mobile-menu-button" type="button" class="lg:hidden p-2 text-brand-white" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path d="M4 7h16M4 12h16M4 17h16"></path> </svg> </button> </div> <div id="mobile-menu" class="hidden border-t border-brand-line bg-brand-charcoal lg:hidden"> <nav aria-label="Mobile" class="container-site flex flex-col gap-1 py-4"> ${NAV_PRIMARY.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="py-3 text-base font-semibold uppercase tracking-wider text-brand-white border-b border-brand-line/50"> ${item.label} </a>`)} <a href="/library/" class="py-3 text-base font-semibold uppercase tracking-wider text-brand-silver">My Library</a> <a href="/login/" class="py-3 text-base font-semibold uppercase tracking-wider text-brand-silver">Login</a> <a href="/ebooks/" class="btn-primary mt-3 w-full">Browse Ebooks</a> </nav> </div> </header> ${renderScript($$result, "/home/rob/.openclaw/workspace/trythisplay/src/components/navigation/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/navigation/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-24 border-t border-brand-line bg-brand-charcoal"> <div class="container-site grid gap-10 py-14 md:grid-cols-4"> <div class="md:col-span-1"> <span class="font-display text-lg uppercase tracking-wide">
Try<span class="text-brand-red">This</span>Play
</span> <p class="mt-3 text-sm leading-relaxed text-brand-silver">
Madden video ebooks, written setups, and franchise communities. Updated for ${SITE.maddenVersion}.
</p> </div> <nav aria-label="Ebooks"> <h2 class="eyebrow">Ebooks</h2> <ul class="mt-4 space-y-2 text-sm"> <li><a class="text-brand-silver hover:text-brand-white" href="/ebooks/">All Ebooks</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/ebooks/offense/">Offense</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/ebooks/defense/">Defense</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/ebooks/franchise/">Franchise</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/ebooks/beginners/">Beginners</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/ebooks/advanced/">Advanced</a></li> </ul> </nav> <nav aria-label="Learn"> <h2 class="eyebrow">Learn</h2> <ul class="mt-4 space-y-2 text-sm"> <li><a class="text-brand-silver hover:text-brand-white" href="/guides/">Strategy Guides</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/playbooks/">Playbooks</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/formations/">Formations</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/creators/">Creators</a></li> </ul> </nav> <nav aria-label="Community"> <h2 class="eyebrow">Community</h2> <ul class="mt-4 space-y-2 text-sm"> <li><a class="text-brand-silver hover:text-brand-white" href="/franchise/competitive/">Competitive Franchise</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/franchise/simulation/">Simulation Franchise</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/creators/apply/">Become A Creator</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/team/">Meet The Team</a></li> <li><a class="text-brand-silver hover:text-brand-white" href="/contact/">Contact Us</a></li> </ul> </nav> </div> <div class="border-t border-brand-line"> <div class="container-site flex flex-col gap-2 py-6 text-xs text-brand-silver md:flex-row md:items-center md:justify-between"> <p>&copy; ${year} ${SITE.name}. All rights reserved.</p> <p class="max-w-2xl leading-relaxed"> ${SITE.name} is an independent educational and community platform. It is
        not affiliated with or endorsed by EA Sports, Madden NFL, the NFL, any
        NFL team, or any player.
</p> </div> </div> </footer>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/navigation/Footer.astro", void 0);

const $$Astro = createAstro("https://trythisplay.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, canonical, noindex, ogType, ogImage } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderComponent($$result, "SEOHead", $$SEOHead, { "title": title, "description": description, "canonical": canonical, "noindex": noindex, "ogType": ogType, "ogImage": ogImage })}${renderComponent($$result, "OrganizationSchema", $$OrganizationSchema, {})}${renderComponent($$result, "WebsiteSchema", $$WebsiteSchema, {})}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="min-h-screen"> <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white">
Skip to content
</a> ${renderComponent($$result, "Header", $$Header, {})} <main id="main"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, EBOOK_CATEGORIES as E, SITE as S };
