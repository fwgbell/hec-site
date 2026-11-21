# Hector Bell — portfolio site

A plain static site (HTML, CSS, a little JavaScript). No build step and no hosting cost. Films are embedded from Vimeo and YouTube, so no video files live on the site.

```
public/              ← everything that gets deployed
  index.html         homepage: wordmark + full-screen slideshow of featured films
  directing.html     project list, stills on hover, click to play
  editing.html       same, for editing work
  info.html          bio, portrait, links and contact
  js/projects.js     ← ALL PROJECTS LIVE HERE: edit this file to add or change work
  js/site.js         behaviour (slideshow, hover stills, video player)
  css/style.css      all styling
  assets/            images: stills, wordmark scan, portrait, homepage loops
serve.js             local preview server
```

## Adding a project

Open `public/js/projects.js` and copy one of the `{ ... }` blocks. The comment at the top explains every field. In short:

- **YouTube:** `video: { platform: "youtube", id: "VIDEO_ID" }` (the part after `watch?v=`)
- **Vimeo:** `video: { platform: "vimeo", id: "123456789" }`. For an **unlisted** Vimeo link like `vimeo.com/123456789/abc123def`, also add `hash: "abc123def"`.
- `roles: ["directing"]`, `["editing"]` or both. This decides which page(s) it appears on.
- `type: "Commercial"` (or Narrative, Music Video, Documentary, and so on) is shown when you hover the title and in the player.
- `about: ["Paragraph one.", "Paragraph two."]` holds a few short paragraphs shown beside the video.
- `awards: [{ name: "Festival", detail: "Winner, Best Short", year: 2025 }]` adds an awards list under the text. Add `image: "assets/laurels/festival.png"` to show a laurel instead of text only. Leave `awards` out and the section disappears.
- `featured: true` puts it in the homepage slideshow. Directing work always comes first there.
- `stills: ["assets/stills/name-1.jpg", ...]` sets the images shown on hover. YouTube projects use YouTube's own frame grabs if you leave this out. **Vimeo projects need stills added.**
- `loop: "assets/loops/name.mp4"` (optional) is a short, silent clip that plays behind the homepage slide instead of a still. Keep it under about 10 MB (Cloudflare's hard limit is 25 MB per file). For example:
  `ffmpeg -i in.mov -t 12 -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4`

Stills: export JPGs at about 1600px wide and around 200–400 KB each into `public/assets/stills/`.

## The handwritten wordmark

Scan Hector's signature, remove the background (white ink on transparent PNG, or SVG), save it as `public/assets/wordmark.png`, then set `wordmark: "assets/wordmark.png"` in `projects.js`. Until then a handwriting font stands in.

## Preview locally

```bash
node serve.js
```

Then open http://localhost:8787.

## Deploy on Cloudflare Pages (free)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repo.
3. Build settings: **Framework preset: None**, **Build command:** leave empty, **Build output directory:** `public`.
4. Deploy. You'll get a `*.pages.dev` address, and every push to `main` redeploys automatically.
5. Optional: under **Custom domains**, add something like `hectorbell.com`. Buy it through Cloudflare Registrar at cost, about $10/yr.

Cloudflare serves `directing.html` at `/directing` automatically.

## Before launch: replace the placeholders

- [ ] Projects in `js/projects.js` (currently Blender open-movie placeholders)
- [ ] Wordmark scan
- [ ] Bio, portrait (`assets/portrait.jpg`), Instagram/Vimeo links and contact email in `info.html`
- [ ] Page descriptions in each HTML `<head>`
