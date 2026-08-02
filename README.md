# TryThisPlay.com

Madden video ebooks, written setups, and franchise league communities. Built with Astro.

**Phase 1: Public website** (this repo state). Prerendered marketing and content pages with the brand design system, evergreen URL structure, SEO metadata, and structured data. Later phases add commerce (Stripe), customer libraries (Supabase + Mux), the creator portal, admin review, and Discord automation.

## Stack

- Astro 5 (static output, all Phase 1 pages prerendered)
- Tailwind CSS 3 (brand tokens in `tailwind.config.mjs`)
- TypeScript strict
- `@astrojs/sitemap` with private-route exclusions

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + production build to dist/
npm run preview
```

## Project structure

```
src/
  components/
    seo/          SEOHead, Organization/Website/Breadcrumb/FAQ/Article/Product JSON-LD
    navigation/   Header, Footer
    ebooks/       EbookCard, CategoryPage, ProductPage
    franchise/    FranchiseCard, LeaguePage (shared league template)
    ui/           Breadcrumbs, SectionHeading, UpdatedBadge, FaqList, RouteLines, HubPage
  content/        Astro content collections (schema in content/config.ts)
    guides/       Free strategy guides (markdown)
    ebooks/       Product catalog entries (placeholder until DB in Phase 2/3)
    playbooks/    Playbook reference pages
    formations/   Formation reference pages
    creators/     Public creator profiles
    team/         Meet The Team entries (JSON)
    faqs/         FAQ entries (JSON)
  data/site.ts    Site constants, nav, ebook category copy, current Madden version
  layouts/        BaseLayout
  pages/          Route files (evergreen URLs, trailing slashes)
```

## Key conventions (do not break these)

- **Evergreen URLs.** No Madden version numbers or years in any path. The visible Madden version lives in `src/data/site.ts` (`SITE.maddenVersion`) and page copy; update it once per annual release.
- **`/ebooks/[slug]/` resolves both category and product pages.** The seven category slugs (`offense`, `defense`, `franchise`, `beginners`, `advanced`, `competitive`, `simulation`) are reserved; product slugs must not collide with them.
- **No fabricated people or reviews.** Team, creator, and ebook entries marked `placeholder: true` render with visible "sample / coming soon" treatment and are noindexed where relevant. Replace them with real people and real products before launch; never publish fictional profiles or testimonials.
- **Private routes** (`/library/`, and later `/account/`, `/creator/`, `/admin/`, `/checkout/`) are noindexed, excluded from the sitemap, and disallowed in `robots.txt`.
- **Product schema has no aggregate ratings** until genuine review data exists.

## Before launch checklist

- Replace placeholder team members (`src/content/team/`) and the placeholder creator/ebook entries.
- Add `public/og-default.png` (1200x630 social share image) and `public/logo.png` (referenced by Organization schema).
- Set real Discord invite links and confirm the support email in `src/data/site.ts`.
- Point the contact form at a server endpoint (currently a mailto fallback).

## Phase roadmap

1. **Public website** — this repo state
2. **Commerce + accounts** — Supabase auth, Stripe checkout/webhooks, customer library, secure Mux video playback, hosting adapter + server-rendered private routes
3. **Creator portal** — invitations, uploads, transcript + written-setup generation with creator review, submission workflow
4. **Admin review** — review queues, approve/reject with comments, catalog management, payouts
5. **Franchise features** — league data, standings, applications, Discord role automation
6. **Polish + launch** — performance, analytics, monitoring, content QA
