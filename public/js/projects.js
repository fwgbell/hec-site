/* =============================================================
   SITE CONTENT — this is the only file you need to edit to add,
   remove or reorder projects.

   Each project:
     slug      unique, lowercase, no spaces (used in share links: /directing#slug)
     title     shown in the lists
     client    optional, shown under the title in the player
     year      optional
     location  optional (small text next to the hovered title)
     roles     ["directing"], ["editing"] or both — decides which page(s) it's on
     featured  true = included in the homepage slideshow
     video     { platform: "vimeo", id: "123456789", hash: "abc123" }   (hash only for unlisted Vimeo links: vimeo.com/123456789/abc123)
               { platform: "youtube", id: "dQw4w9WgXcQ" }               (the bit after watch?v= or youtu.be/)
     stills    optional list of image paths, e.g. ["assets/stills/night-swim-1.jpg", ...]
               YouTube projects fall back to YouTube's own frame grabs if left empty.
               Vimeo projects need stills added here to show anything on hover.
     loop      optional short muted MP4 for the homepage background (keep under ~10 MB,
               Cloudflare Pages max is 25 MB per file), e.g. "assets/loops/night-swim.mp4"
     credits   optional text shown under the player

   Projects appear in the order listed here.

   ⚠️  Everything below is PLACEHOLDER content using Blender Foundation's
   open-licence films so the layout can be previewed. Replace with Hector's work.
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
    client: "Placeholder Client",
    year: 2025,
    location: "Amsterdam, NL",
    roles: ["directing", "editing"],
    featured: true,
    video: { platform: "youtube", id: "R6MlUcmOul8" },
    credits: "Director & Editor — Hector Bell",
  },
  {
    slug: "sintel",
    title: "Sintel",
    client: "Placeholder Client",
    year: 2025,
    location: "London, UK",
    roles: ["directing"],
    featured: true,
    video: { platform: "youtube", id: "eRsGyueVLvQ" },
    credits: "Director — Hector Bell",
  },
  {
    slug: "big-buck-bunny",
    title: "Big Buck Bunny",
    client: "Placeholder Client",
    year: 2024,
    location: "Manchester, UK",
    roles: ["editing"],
    featured: true,
    video: { platform: "youtube", id: "aqz-KE-bpKQ" },
    credits: "Editor — Hector Bell",
  },
  {
    slug: "agent-327",
    title: "Agent 327",
    client: "Placeholder Client",
    year: 2024,
    location: "Paris, FR",
    roles: ["directing", "editing"],
    featured: true,
    video: { platform: "youtube", id: "mN0zPOpADL4" },
    credits: "Director & Editor — Hector Bell",
  },
  {
    slug: "vimeo-example",
    title: "Vimeo Example",
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
