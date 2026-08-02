import { s as supabaseAdmin } from './supabase_w_KyqO0O.mjs';

const RESERVED_CATEGORY_SLUGS = [
  "offense",
  "defense",
  "franchise",
  "beginners",
  "advanced",
  "competitive",
  "simulation"
];
const RESERVED_GUIDE_SLUGS = [
  "best-offensive-playbooks",
  "how-to-beat-cover-3"
];
function slugify(input) {
  return input.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
async function validateProductSlug(slug, excludeProductId) {
  if (!slug) return "Slug is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return "Slug can contain only lowercase letters, numbers, and hyphens.";
  }
  if (slug.length < 3) return "Slug is too short.";
  if (RESERVED_CATEGORY_SLUGS.includes(slug)) {
    return `"${slug}" is a reserved category slug. Choose another.`;
  }
  if (RESERVED_GUIDE_SLUGS.includes(slug)) {
    return `"${slug}" collides with a guide. Choose another.`;
  }
  const admin = supabaseAdmin();
  const { data } = await admin.from("products").select("id").eq("slug", slug).maybeSingle();
  if (data && data.id !== excludeProductId) {
    return "That slug is already taken.";
  }
  return null;
}

export { slugify as s, validateProductSlug as v };
