import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://trythisplay.com",
  trailingSlash: "always",
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
