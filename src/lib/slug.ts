import { supabaseAdmin } from "./supabase";

// Category slugs are reserved: /ebooks/[slug]/ serves both categories and
// products, so a product slug must never collide with a category.
export const RESERVED_CATEGORY_SLUGS = [
  "offense",
  "defense",
  "franchise",
  "beginners",
  "advanced",
  "competitive",
  "simulation",
];

// Guide slugs live at /guides/[slug]/ but are also protected to avoid confusion.
// Kept in sync with src/content/guides/ (extend if guides are added).
export const RESERVED_GUIDE_SLUGS = [
  "best-offensive-playbooks",
  "how-to-beat-cover-3",
];

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Validate a product slug. Returns an error string or null if OK.
 * `excludeProductId` lets a product keep its own slug on edit.
 */
export async function validateProductSlug(
  slug: string,
  excludeProductId?: string
): Promise<string | null> {
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
  const { data } = await admin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (data && data.id !== excludeProductId) {
    return "That slug is already taken.";
  }
  return null;
}
