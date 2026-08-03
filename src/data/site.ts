export const SITE = {
  name: "Try This Play",
  domain: "trythisplay.com",
  url: "https://trythisplay.com",
  maddenVersion: "Madden 27",
  tagline: "Master Madden 27. Build Your Franchise. Dominate Every Game.",
  description:
    "Master Madden 27 with video ebooks, written setups, offensive and defensive schemes, competitive leagues, and realistic simulation franchises.",
  // Replace with real invite links before launch.
  discord: {
    competitive: "#",
    simulation: "#",
  },
  supportEmail: "support@trythisplay.com",
} as const;

export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Ebooks", href: "/ebooks/" },
  { label: "Franchise", href: "/franchise/" },
  { label: "Meet The Team", href: "/team/" },
  { label: "Contact Us", href: "/contact/" },
] as const;

export const EBOOK_CATEGORIES = [
  {
    slug: "offense",
    label: "Offense",
    intro:
      "Offensive ebooks teach complete schemes: base plays, audibles, pre-snap setups, reads against every coverage shell, and blitz answers, delivered as video lessons with structured written setups.",
    guidance:
      "Pick an offensive ebook built around a playbook you enjoy. Beginners should favor compressed formations with simple first reads; advanced players can look for full-field spread schemes.",
  },
  {
    slug: "defense",
    label: "Defense",
    intro:
      "Defensive ebooks cover coverage shells, disguises, user-lurk techniques, run fits, and pressure packages, with written adjustments for every situation.",
    guidance:
      "Choose a defensive ebook that matches how you like to defend: coverage-first systems for patient players, or blitz-heavy schemes if you want to dictate tempo.",
  },
  {
    slug: "franchise",
    label: "Franchise",
    intro:
      "Franchise ebooks go deep on team building: drafting, scouting, salary cap management, trades, player development, and season-long strategy for both competitive and simulation leagues.",
    guidance:
      "Franchise products pair well with our league communities. Look for guides that match your league style, competitive or simulation.",
  },
  {
    slug: "beginners",
    label: "Beginners",
    intro:
      "Beginner ebooks assume nothing. They teach reads, hot routes, adjustments, and core Madden 27 mechanics step by step so new players can compete quickly.",
    guidance:
      "Start with one offensive scheme and one defensive base. Mastering a small toolkit beats collecting products.",
  },
  {
    slug: "advanced",
    label: "Advanced",
    intro:
      "Advanced ebooks are built for ranked and tournament play: layered scheme trees, counter systems, and adjustments that hold up against opponents who adapt.",
    guidance:
      "Advanced products expect fluency with hot routes and pre-snap reads. If a setup description reads like a foreign language, start one level down.",
  },
  {
    slug: "competitive",
    label: "Competitive",
    intro:
      "Competitive ebooks focus on head-to-head user play: meta schemes, tournament-tested setups, and the counters you need when opponents adjust.",
    guidance:
      "Check the last-updated date. Competitive metas shift with patches, and current products list the patch they were tested on.",
  },
  {
    slug: "simulation",
    label: "Simulation",
    intro:
      "Simulation ebooks teach realistic, NFL-style play: balanced play calling, situational football, and franchise management that respects sim rules.",
    guidance:
      "These products pair naturally with our Simulation Franchise league and its rule set.",
  },
] as const;

export type EbookCategory = (typeof EBOOK_CATEGORIES)[number];
