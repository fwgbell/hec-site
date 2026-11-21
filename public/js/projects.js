/* =============================================================
   SITE CONTENT — this is the only file you need to edit to add,
   remove or reorder projects.

   Each project:
     slug      unique, lowercase, no spaces (used in share links: /directing#slug)
     title     shown in the lists
     type      what kind of project, e.g. "Commercial", "Narrative", "Music Video",
               "Documentary", "Fashion Film" — shown on hover and in the player
     client    optional, shown in the player
     year      optional
     location  optional (small text next to the hovered title)
     roles     ["directing"], ["editing"] or both — decides which page(s) it's on
     featured  true = included in the homepage slideshow (directing work is shown first)
     video     { platform: "vimeo", id: "123456789", hash: "abc123" }   (hash only for unlisted Vimeo links: vimeo.com/123456789/abc123)
               { platform: "youtube", id: "dQw4w9WgXcQ" }               (the bit after watch?v= or youtu.be/)
     about     optional: a few short paragraphs shown beside the player, one string per paragraph:
               about: ["First paragraph.", "Second paragraph."]
     awards    optional list. Text only, or with a laurel image (PNG/SVG, white on transparent works best):
               awards: [
                 { name: "Festival or award", detail: "Winner — Best Short", year: 2025 },
                 { name: "Another festival", detail: "Official Selection", image: "assets/laurels/festival.png" },
               ]
     credits   optional; one credit per line, e.g. "Director — Hector Bell\nDP — Name"
     stills    optional list of image paths, e.g. ["assets/stills/night-swim-1.jpg", ...]
               YouTube projects fall back to YouTube's own frame grabs if left empty.
               Vimeo projects need stills added here to show anything on hover.
     loop      optional short muted MP4 for the homepage background (keep under ~10 MB,
               Cloudflare Pages max is 25 MB per file), e.g. "assets/loops/night-swim.mp4"

   Projects appear in the order listed here.

   ⚠️  Everything below is PLACEHOLDER content using Blender Foundation's
   open-licence films so the layout can be previewed. Types, text and awards
   are made up for layout only. Replace all of it with Hector's real work.
   ============================================================= */

window.SITE = {
  name: "Hector Bell",
  // Path to the handwritten-scan wordmark once you have it, e.g. "assets/wordmark.png"
  // (white or transparent PNG/SVG works best). Leave null to use the handwritten font fallback.
  wordmark: null,
  // Seconds each homepage slide stays up
  slideSeconds: 7,
};

window.PROJECTS = [
  {
    slug: "tears-of-steel",
    title: "Tears of Steel",
    type: "Narrative",
    client: "Placeholder Client",
    year: 2025,
    location: "Amsterdam, NL",
    roles: ["directing", "editing"],
    featured: true,
    video: { platform: "youtube", id: "R6MlUcmOul8" },
    about: [
      "Placeholder: a short paragraph on what the project is: the idea, the brief or the story, in one or two sentences.",
      "Placeholder: a second paragraph on the approach. How it was shot or cut, a technique, or what made it interesting to make.",
    ],
    awards: [
      { name: "Placeholder Film Festival", detail: "Winner, Best Short", year: 2025 },
      { name: "Placeholder Awards", detail: "Shortlist, Direction", year: 2025 },
      { name: "Another Festival", detail: "Official Selection", year: 2025 },
    ],
    credits: "Director & Editor — Hector Bell\nProduction — Placeholder Films",
  },
  {
    slug: "sintel",
    title: "Sintel",
    type: "Narrative",
    client: "Placeholder Client",
    year: 2025,
    location: "London, UK",
    roles: ["directing"],
    featured: true,
    video: { platform: "youtube", id: "eRsGyueVLvQ" },
    about: [
      "Placeholder: one paragraph is fine too. The text panel only shows what's filled in.",
    ],
    credits: "Director — Hector Bell",
  },
  {
    slug: "big-buck-bunny",
    title: "Big Buck Bunny",
    type: "Music Video",
    client: "Placeholder Artist",
    year: 2024,
    location: "Manchester, UK",
    roles: ["editing"],
    featured: true,
    video: { platform: "youtube", id: "aqz-KE-bpKQ" },
    about: [
      "Placeholder: a sentence or two about the edit: pace, structure, what the cut needed to do.",
    ],
    credits: "Editor — Hector Bell",
  },
  {
    slug: "agent-327",
    title: "Agent 327",
    type: "Commercial",
    client: "Placeholder Brand",
    year: 2024,
    location: "Paris, FR",
    roles: ["directing", "editing"],
    featured: true,
    video: { platform: "youtube", id: "mN0zPOpADL4" },
    about: [
      "Placeholder: the campaign in a line: who it was for and what it had to say.",
      "Placeholder: how it was made, the shoot, the cut, a detail worth knowing.",
    ],
    awards: [
      { name: "Placeholder Advertising Awards", detail: "Bronze, Film Craft", year: 2024 },
    ],
    credits: "Director & Editor — Hector Bell\nAgency — Placeholder Agency",
  },
  {
    slug: "vimeo-example",
    title: "Vimeo Example",
    type: "Documentary",
    client: "Placeholder Client",
    year: 2023,
    location: "Glasgow, UK",
    roles: ["editing"],
    featured: false,
    // Vimeo example — add your own stills for the hover preview
    video: { platform: "vimeo", id: "1084537" },
    stills: [
      "https://i.ytimg.com/vi/aqz-KE-bpKQ/hq2.jpg",
      "https://i.ytimg.com/vi/aqz-KE-bpKQ/hq3.jpg",
    ],
    credits: "Editor — Hector Bell",
  },
];
