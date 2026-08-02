import { s as supabaseAdmin } from './supabase_w_KyqO0O.mjs';

function anonClient() {
  return null;
}
function secondsToRuntime(total) {
  if (!total || total <= 0) return "";
  const h = Math.floor(total / 3600);
  const m = Math.round(total % 3600 / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
function toEntry(row) {
  const lessons = (row.lessons ?? []).slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)).map((l) => ({
    title: l.title ?? "",
    runtime: secondsToRuntime(l.runtime_seconds),
    description: l.description ?? void 0,
    freePreview: !!l.free_preview,
    playbackId: l.mux_playback_id ?? void 0
  }));
  const totalSeconds = (row.lessons ?? []).reduce(
    (s, l) => s + (l.runtime_seconds ?? 0),
    0
  );
  return {
    id: row.id,
    slug: row.slug,
    body: row.full_description ?? "",
    data: {
      title: row.title,
      shortDescription: row.short_description ?? "",
      fullDescription: row.full_description ?? void 0,
      seoTitle: row.seo_title ?? void 0,
      seoDescription: row.seo_description ?? void 0,
      creatorId: row.creator_id,
      creatorName: row.author_name ?? row.creator?.display_name ?? "Try This Play Creator",
      currentMaddenVersion: row.current_madden_version ?? "Madden 27",
      supportedVersions: [row.current_madden_version ?? "Madden 27"],
      category: row.category,
      styles: row.styles ?? [],
      playbook: row.playbook ?? void 0,
      formation: row.formation ?? void 0,
      difficulty: row.difficulty,
      platforms: row.platforms ?? [],
      price: (row.price_cents ?? 0) / 100,
      priceCents: row.price_cents ?? 0,
      lessonCount: lessons.length,
      runtime: secondsToRuntime(totalSeconds),
      updatedAt: new Date(row.published_at ?? row.updated_at ?? Date.now()),
      coverImage: row.cover_image_url ?? void 0,
      coverImageAlt: row.cover_image_alt ?? void 0,
      lessons,
      whatYouWillLearn: row.what_you_will_learn ?? [],
      whoThisIsFor: row.who_this_is_for ?? [],
      featured: !!row.featured,
      published: row.status === "published",
      placeholder: false
    }
  };
}
const SELECT = "*, creator:creators(display_name, gamertag, avatar_url), lessons(*)";
async function getPublishedProducts() {
  const supabase = anonClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("products").select(SELECT).eq("status", "published").order("published_at", { ascending: false });
  if (error) {
    console.error("getPublishedProducts:", error.message);
    return [];
  }
  return (data ?? []).map(toEntry);
}
async function getPublishedProductBySlug(slug) {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("products").select(SELECT).eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) {
    console.error("getPublishedProductBySlug:", error.message);
    return null;
  }
  return data ? toEntry(data) : null;
}
async function getPublishedProductsByCreator(creatorId) {
  const all = await getPublishedProducts();
  return all.filter((p) => p.data.creatorId === creatorId);
}
async function getFeaturedProducts() {
  const all = await getPublishedProducts();
  return all.filter((p) => p.data.featured);
}
async function getProductByIdAdmin(id) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("products").select(SELECT).eq("id", id).maybeSingle();
  if (error) {
    console.error("getProductByIdAdmin:", error.message);
    return null;
  }
  return data ? toEntry(data) : null;
}
async function getEntitledProductsBySlug(slugs) {
  const map = /* @__PURE__ */ new Map();
  if (!slugs.length) return map;
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("products").select(SELECT).in("slug", slugs);
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

export { getProductByIdAdmin as a, getPublishedProductsByCreator as b, getPublishedProducts as c, getFeaturedProducts as d, getEntitledProductsBySlug as e, getPublishedProductBySlug as g };
