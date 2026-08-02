import { defineCollection, z } from "astro:content";

/**
 * Public structured content lives in Astro Content Collections (this file).
 * Users, purchases, entitlements, lessons, progress, payouts, submissions,
 * review comments, and Discord connections belong in the database (Phase 2+).
 */

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
    author: z.string().default("Try This Play Team"),
    reviewer: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    currentMaddenVersion: z.string().default("Madden 27"),
    supportedVersions: z.array(z.string()).default(["Madden 27"]),
    category: z.enum(["offense", "defense", "franchise", "beginners", "advanced"]),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
    playbook: z.string().optional(),
    formation: z.string().optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    relatedGuides: z.array(z.string()).default([]),
    relatedEbooks: z.array(z.string()).default([]),
    faqItems: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    contentStatus: z
      .enum(["current", "needs-review", "outdated", "archived"])
      .default("current"),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

const ebooks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    creatorId: z.string(),
    creatorName: z.string(),
    currentMaddenVersion: z.string().default("Madden 27"),
    supportedVersions: z.array(z.string()).default(["Madden 27"]),
    category: z.enum(["offense", "defense", "franchise"]),
    styles: z.array(z.enum(["competitive", "simulation"])).default([]),
    playbook: z.string().optional(),
    formation: z.string().optional(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    platforms: z.array(z.string()).default(["PlayStation 5", "Xbox Series X|S"]),
    price: z.number(),
    lessonCount: z.number(),
    runtime: z.string(),
    updatedAt: z.coerce.date(),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    lessons: z
      .array(
        z.object({
          title: z.string(),
          runtime: z.string(),
          description: z.string().optional(),
          freePreview: z.boolean().default(false),
          playbackId: z.string().optional(), // Mux playback ID, set when video is uploaded
        })
      )
      .default([]),
    whatYouWillLearn: z.array(z.string()).default([]),
    whoThisIsFor: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

const playbooks = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    side: z.enum(["offense", "defense"]),
    currentMaddenVersion: z.string().default("Madden 27"),
    bestFormations: z.array(z.string()).default([]),
    strengths: z.array(z.string()).default([]),
    weaknesses: z.array(z.string()).default([]),
    skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
    lastReviewed: z.coerce.date(),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

const formations = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    personnel: z.string(),
    side: z.enum(["offense", "defense"]),
    strengths: z.array(z.string()).default([]),
    weaknesses: z.array(z.string()).default([]),
    bestSituations: z.array(z.string()).default([]),
    currentMaddenVersion: z.string().default("Madden 27"),
    lastReviewed: z.coerce.date(),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

const creators = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    gamertag: z.string(),
    bio: z.string(),
    specialties: z.array(z.string()).default([]),
    favoritePlaybook: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    socials: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    avatar: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
});

const team = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    gamertag: z.string().optional(),
    role: z.string(),
    group: z.enum([
      "founders",
      "administrators",
      "commissioners",
      "competitive-players",
      "simulation-experts",
      "creators",
      "content-team",
      "support-team",
    ]),
    bio: z.string(),
    experience: z.string().optional(),
    favoritePlaybook: z.string().optional(),
    specialty: z.string().optional(),
    photo: z.string().optional(),
    socials: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    placeholder: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const faqs = defineCollection({
  type: "data",
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    topic: z.enum(["general", "ebooks", "franchise", "creators", "billing"]),
    order: z.number().default(99),
  }),
});

export const collections = { guides, ebooks, playbooks, formations, creators, team, faqs };
