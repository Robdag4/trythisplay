import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabase";

// ============================================================================
// Product catalog data-access (Phase 3).
//
// The purchasable catalog now lives in the `products` table (Phase 3 migration).
// Public storefront reads status='published' rows. To avoid rewriting every
// component that consumed CollectionEntry<"ebooks">, we return objects in the
// SAME shape ({ slug, data, body }) the collection produced, so EbookCard,
// ProductPage, CategoryPage, etc. keep working unchanged.
//
// Reads use a plain anon client (RLS enforces published-only for the public
// site). Purchaser/library reads are handled separately with the request-scoped
// server client + entitlement checks.
//
// DEFENSIVE: if env is missing or the table isn't populated yet, these return
// empty arrays so the site renders honest empty states instead of erroring.
// ============================================================================

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export interface ProductData {
  title: string;
  shortDescription: string;
  fullDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  creatorId: string;
  creatorName: string;
  currentMaddenVersion: string;
  supportedVersions: string[];
  category: "offense" | "defense" | "franchise";
  styles: ("competitive" | "simulation")[];
  playbook?: string;
  formation?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  platforms: string[];
  price: number; // dollars (components format from dollars)
  priceCents: number; // canonical server value
  lessonCount: number;
  runtime: string;
  updatedAt: Date;
  coverImage?: string;
  coverImageAlt?: string;
  lessons: {
    id?: string;
    title: string;
    runtime: string;
    description?: string;
    freePreview: boolean;
    playbackId?: string;
    formation?: string;
    audibles?: string[];
    plays?: any[];
  }[];
  whatYouWillLearn: string[];
  whoThisIsFor: string[];
  featured: boolean;
  published: boolean;
  placeholder: boolean;
}

/** Collection-entry-shaped product so existing components don't change. */
export interface ProductEntry {
  id: string; // db product id
  slug: string;
  body: string; // full_description markdown (rendered where needed)
  data: ProductData;
}

function anonClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function secondsToRuntime(total: number | null): string {
  if (!total || total <= 0) return "";
  const h = Math.floor(total / 3600);
  const m = Math.round((total % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Map a joined DB row (product + creator + lessons) to the entry shape. */
function toEntry(row: any): ProductEntry {
  const lessons = (row.lessons ?? [])
    .slice()
    .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((l: any) => ({
      id: l.id,
      title: l.title ?? "",
      runtime: secondsToRuntime(l.runtime_seconds),
      description: l.description ?? undefined,
      freePreview: !!l.free_preview,
      playbackId: l.mux_playback_id ?? undefined,
      formation: l.formation ?? undefined,
      audibles: Array.isArray(l.written_setup?.audibles) ? l.written_setup.audibles : [],
      plays: Array.isArray(l.plays) ? l.plays : [],
    }));

  const totalSeconds = (row.lessons ?? []).reduce(
    (s: number, l: any) => s + (l.runtime_seconds ?? 0),
    0
  );

  return {
    id: row.id,
    slug: row.slug,
    body: row.full_description ?? "",
    data: {
      title: row.title,
      shortDescription: row.short_description ?? "",
      fullDescription: row.full_description ?? undefined,
      seoTitle: row.seo_title ?? undefined,
      seoDescription: row.seo_description ?? undefined,
      creatorId: row.creator_id,
      creatorName: row.author_name ?? row.creator?.display_name ?? "Try This Play Creator",
      currentMaddenVersion: row.current_madden_version ?? "Madden 27",
      supportedVersions: [row.current_madden_version ?? "Madden 27"],
      category: row.category,
      styles: row.styles ?? [],
      playbook: row.playbook ?? undefined,
      formation: row.formation ?? undefined,
      difficulty: row.difficulty,
      platforms: row.platforms ?? [],
      price: (row.price_cents ?? 0) / 100,
      priceCents: row.price_cents ?? 0,
      lessonCount: lessons.length,
      runtime: secondsToRuntime(totalSeconds),
      updatedAt: new Date(row.published_at ?? row.updated_at ?? Date.now()),
      coverImage: row.cover_image_url ?? undefined,
      coverImageAlt: row.cover_image_alt ?? undefined,
      lessons,
      whatYouWillLearn: row.what_you_will_learn ?? [],
      whoThisIsFor: row.who_this_is_for ?? [],
      featured: !!row.featured,
      published: row.status === "published",
      placeholder: false,
    },
  };
}

const SELECT =
  "*, creator:creators(display_name, gamertag, avatar_url), lessons(*)";

/** All published products (storefront marketplace). */
export async function getPublishedProducts(): Promise<ProductEntry[]> {
  const supabase = anonClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("getPublishedProducts:", error.message);
    return [];
  }
  return (data ?? []).map(toEntry);
}

/** One published product by slug (public product page). Null if not found. */
export async function getPublishedProductBySlug(
  slug: string
): Promise<ProductEntry | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error("getPublishedProductBySlug:", error.message);
    return null;
  }
  return data ? toEntry(data) : null;
}

/** Published products for a given creator (public creator profile). */
export async function getPublishedProductsByCreator(
  creatorId: string
): Promise<ProductEntry[]> {
  const all = await getPublishedProducts();
  return all.filter((p) => p.data.creatorId === creatorId);
}

/** Featured published products (homepage). */
export async function getFeaturedProducts(): Promise<ProductEntry[]> {
  const all = await getPublishedProducts();
  return all.filter((p) => p.data.featured);
}

/** Fetch one product by id in any status (creator preview). Service-role. */
export async function getProductByIdAdmin(id: string): Promise<ProductEntry | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("products").select(SELECT).eq("id", id).maybeSingle();
  if (error) {
    console.error("getProductByIdAdmin:", error.message);
    return null;
  }
  return data ? toEntry(data) : null;
}

/**
 * Fetch products by slug for a PURCHASER's library, regardless of current
 * status (archived/unpublished products stay accessible to owners). Uses the
 * service-role client and must only be called AFTER verifying the caller owns
 * a completed purchase for each slug. Returns a slug -> entry map.
 */
export async function getEntitledProductsBySlug(
  slugs: string[]
): Promise<Map<string, ProductEntry>> {
  const map = new Map<string, ProductEntry>();
  if (!slugs.length) return map;
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .in("slug", slugs);
  if (error) {
    console.error("getEntitledProductsBySlug:", error.message);
    return map;
  }
  for (const row of data ?? []) {
    const entry = toEntry(row);
    map.set(entry.slug, entry);
  }
  return map;
}
