import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.trythisplay.com",
  trailingSlash: "always",
  // Astro 5's default security.checkOrigin rejected legitimate SAME-ORIGIN form
  // POSTs behind Vercel's proxy ("Cross-site POST form submissions are
  // forbidden") — it broke the login/logout/checkout/progress forms. We disable
  // the built-in origin check and rely on our own boundaries instead: Supabase
  // auth gates every private action, Stripe/Mux webhooks verify signatures, and
  // prices come from the server (spec security invariant #5). The Stripe webhook
  // is an intentional cross-origin POST and must not be origin-blocked.
  security: {
    checkOrigin: false,
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes("/admin/") &&
        !page.includes("/creator/") &&
        !page.includes("/library/") &&
        !page.includes("/account/") &&
        !page.includes("/checkout/") &&
        !page.includes("/search"),
    }),
  ],
  // Phase 1 is fully prerendered. When private areas (library, creator portal,
  // admin) are added in Phase 2+, switch to `output: "static"` with
  // `export const prerender = false` on private routes and add the
  // Vercel or Cloudflare adapter.
  adapter: vercel(),
});
