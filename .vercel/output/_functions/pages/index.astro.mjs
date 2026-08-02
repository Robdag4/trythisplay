/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_ukkwF2dm.mjs';
import 'piccolore';
import { d as getFeaturedProducts } from '../chunks/products_X9YWEcqr.mjs';
import { $ as $$BaseLayout, S as SITE } from '../chunks/BaseLayout_CkKY5QST.mjs';
import { $ as $$EbookCard } from '../chunks/EbookCard_Cp3Ck2eO.mjs';
import { $ as $$FranchiseCard } from '../chunks/FranchiseCard_BufAPhbv.mjs';
import { $ as $$SectionHeading } from '../chunks/SectionHeading_g5FSfEVc.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://trythisplay.com");
const $$RouteLines = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RouteLines;
  const { class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(className, "class")} viewBox="0 0 800 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice"> <g stroke="currentColor" stroke-width="2"> <path d="M120 360 V 160 L 220 80"></path> <path d="M320 360 V 220 H 470"></path> <path d="M560 360 V 120 L 640 180"></path> <path d="M700 360 V 60" stroke-dasharray="8 8"></path> </g> <g fill="currentColor"> <path d="M220 80 l -22 2 l 12 18 z"></path> <path d="M470 220 l -18 -11 v 22 z"></path> <path d="M640 180 l -20 -8 l 4 21 z"></path> <path d="M700 60 l -11 18 h 22 z"></path> </g> <g stroke="currentColor" stroke-width="2" fill="none"> <circle cx="120" cy="372" r="9"></circle> <circle cx="320" cy="372" r="9"></circle> <path d="M551 363 l 18 18 m 0 -18 l -18 18"></path> <path d="M691 363 l 18 18 m 0 -18 l -18 18"></path> </g> </svg>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ui/RouteLines.astro", void 0);

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const featured = (await getFeaturedProducts()).slice(0, 4);
  const steps = [
    {
      title: "Choose Your Ebook",
      body: "Browse offensive, defensive, and franchise products by playbook, formation, and skill level. Every product shows exactly what's inside before you buy."
    },
    {
      title: "Purchase Instant Access",
      body: "Secure checkout, instant delivery. Your ebook appears in your private library with video lessons, written setups, audibles, reads, adjustments, counters, and full transcripts."
    },
    {
      title: "Watch, Learn, and Win",
      body: "Follow step-by-step lessons, track your progress, and get future updates as creators revise setups for new patches throughout the Madden season."
    }
  ];
  const whyItems = [
    { title: "Experienced players", body: "Learn from creators with real competitive Madden experience, not recycled tips." },
    { title: "Video and written instruction", body: "Every lesson pairs video with a structured written setup you can reference mid-game." },
    { title: "Step-by-step setups", body: "Formations, audibles, pre-snap adjustments, and reads laid out in order, nothing assumed." },
    { title: "Updated strategies", body: "Products show their current Madden version and last-updated date, and get revised as the meta shifts." },
    { title: "Secure customer access", body: "Your library is private, protected, and streams securely on any device." },
    { title: "Two franchise communities", body: "Competitive and simulation leagues with active Discords, rankings, and season-long content." }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Madden 27 Ebooks, Strategy Guides & Franchise Leagues | Try This Play", "description": SITE.description }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative overflow-hidden border-b border-brand-line bg-stadium-glow"> ${renderComponent($$result2, "RouteLines", $$RouteLines, { "class": "pointer-events-none absolute -right-24 bottom-0 h-[420px] w-auto text-brand-red/15" })} <div class="container-site relative py-24 sm:py-32"> <p class="eyebrow">Video Ebooks · Written Setups · Franchise Leagues</p> <h1 class="h-display mt-4 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
Master Madden 27.<br>
Build Your Franchise.<br> <span class="text-brand-red">Dominate Every Game.</span> </h1> <p class="mt-6 max-w-2xl text-lg leading-relaxed text-brand-silver">
Learn winning Madden strategies through premium video ebooks, written
        setups, competitive franchise leagues, simulation-style leagues, and an
        active Madden community.
</p> <div class="mt-10 flex flex-wrap gap-4"> <a href="/ebooks/" class="btn-primary">Browse Ebooks</a> <a href="/franchise/" class="btn-secondary">Join A Franchise</a> </div> </div> </section>  <section class="container-site py-20"> <div class="flex flex-wrap items-end justify-between gap-6"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "The Marketplace", "title": "Featured Ebooks", "intro": "Creator-led products with video lessons, structured written setups, and updates throughout the Madden 27 season." })} <a href="/ebooks/" class="btn-secondary shrink-0">View All Ebooks</a> </div> ${featured.length > 0 ? renderTemplate`<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"> ${featured.map((ebook) => renderTemplate`${renderComponent($$result2, "EbookCard", $$EbookCard, { "ebook": ebook })}`)} </div>` : renderTemplate`<p class="mt-12 border border-brand-line bg-brand-panel p-8 text-brand-silver">
Products are coming soon. Creator submissions are in review for the
        Madden 27 launch catalog.
</p>`} </section>  <section class="diagonal-top bg-brand-charcoal pb-20 pt-28"> <div class="container-site"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "How It Works", "title": "Three Steps To Better Football", "align": "center" })} <ol class="mt-12 grid gap-6 md:grid-cols-3"> ${steps.map((step, i) => renderTemplate`<li class="card p-8"> <span class="font-mono text-sm text-brand-red">Step ${i + 1}</span> <h3 class="h-display mt-2 text-2xl">${step.title}</h3> <p class="mt-4 text-sm leading-relaxed text-brand-silver">${step.body}</p> </li>`)} </ol> </div> </section>  <section class="container-site py-20"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "The Franchise Experience", "title": "Two Leagues. One Community.", "intro": "Whether you want ranked competition or realistic NFL-style team building, there's a league and a Discord built for how you play." })} <div class="mt-12 grid gap-6 lg:grid-cols-2"> ${renderComponent($$result2, "FranchiseCard", $$FranchiseCard, { "eyebrow": "For Competitors", "title": "Competitive Franchise", "features": [
    "High-level user gameplay",
    "Rankings and standings",
    "Tournaments",
    "Advanced rule set",
    "Scheduled user games",
    "Competitive Discord access",
    "Leaderboards",
    "Seasonal champions"
  ], "cta": "Join Competitive Franchise", "href": "/franchise/competitive/" })} ${renderComponent($$result2, "FranchiseCard", $$FranchiseCard, { "eyebrow": "For Team Builders", "title": "Simulation Franchise", "features": [
    "Realistic NFL-style gameplay",
    "Team building and trades",
    "Salary cap management",
    "Draft strategy",
    "Player development",
    "Weekly league content",
    "Power rankings",
    "Simulation Discord access"
  ], "cta": "Join Simulation Franchise", "href": "/franchise/simulation/" })} </div> </section>  <section class="border-y border-brand-line bg-brand-charcoal py-20"> <div class="container-site"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Why Try This Play", "title": "Built For Players Who Want To Improve" })} <div class="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"> ${whyItems.map((item) => renderTemplate`<div class="border-l-2 border-brand-red pl-5"> <h3 class="font-semibold">${item.title}</h3> <p class="mt-2 text-sm leading-relaxed text-brand-silver">${item.body}</p> </div>`)} </div> </div> </section>  <section class="container-site py-20"> <div class="card relative overflow-hidden p-10 sm:p-14"> ${renderComponent($$result2, "RouteLines", $$RouteLines, { "class": "pointer-events-none absolute -bottom-10 right-0 h-64 w-auto text-brand-red/10" })} <p class="eyebrow">For Creators</p> <h2 class="h-display mt-2 max-w-2xl text-4xl">
Turn Your Madden Knowledge Into Income
</h2> <p class="mt-4 max-w-2xl leading-relaxed text-brand-silver">
Approved creators upload video lessons, generate transcripts, build
        structured written setups, add cover art, preview their ebook, and
        submit for review, then earn revenue from every sale.
</p> <a href="/creators/apply/" class="btn-primary mt-8">Become A Creator</a> </div> </section>  <section class="border-y border-brand-line bg-brand-charcoal py-20"> <div class="container-site text-center"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Community", "title": "Connect On Discord", "intro": "Verified customer roles, product-owner channels, strategy discussion, matchmaking, franchise announcements, and league updates across both servers.", "align": "center" })} <div class="mt-10 flex flex-wrap justify-center gap-4"> <a href="/franchise/competitive/" class="btn-primary">Connect With The Community</a> <a href="/franchise/simulation/" class="btn-secondary">Simulation Server Info</a> </div> </div> </section>  <section class="container-site py-20"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Player Results", "title": "What Customers Are Saying" })} <div class="mt-10 border border-dashed border-brand-line bg-brand-panel p-10 text-center"> <p class="mx-auto max-w-xl leading-relaxed text-brand-silver">
We only publish verified reviews from real customers. Reviews will
        appear here as players complete their first products after launch.
</p> </div> </section>  <section class="relative overflow-hidden border-t border-brand-line bg-stadium-glow py-24"> <div class="container-site text-center"> <h2 class="h-display text-5xl sm:text-6xl">
Stop Guessing.<br><span class="text-brand-red">Start Winning.</span> </h2> <div class="mt-10 flex flex-wrap justify-center gap-4"> <a href="/ebooks/" class="btn-primary">Browse Ebooks</a> <a href="/franchise/" class="btn-secondary">Join A Franchise</a> </div> </div> </section> ` })}`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/pages/index.astro", void 0);

const $$file = "/home/rob/.openclaw/workspace/trythisplay/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
