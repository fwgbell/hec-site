# Design

Direction pinned by the client brief (`seed: none (pinned)`): the reference boards in `website-idea.pdf`.

## Surfaces
| Page | Ground | Voice |
|---|---|---|
| Home | Black under full-bleed film stills/loops, with a soft top and bottom gradient for legibility | Handwritten wordmark (scan; fallback Reenie Beanie). Small serif labels and tabs (Libre Caslon Text, 14–15px) |
| Directing / Editing | `--paper` #ececec | Host Grotesk 400, 30–50px, tracking -0.04em. Inactive titles recede to #c4c4c4 on hover |
| Info | White | Host Grotesk 14px. Links in `--muted` #6b6b6b with an underline |
| Player | rgba(0,0,0,.94) overlay | 13px meta in #a8a8a8 |

## Tokens (`public/css/style.css :root`)
- `--accent` #2f6fd6: the corner logo and text selection only
- `--ink` #111, `--muted` #6b6b6b (≥4.5:1 on white and paper), `--paper` #ececec
- `--gutter` clamp(16px, 2.2vw, 32px): every page edge and fixed element
- `--ease` cubic-bezier(.7,0,.2,1): the logo dash

## Content order
- The homepage slideshow puts featured directing work first (PRODUCT.md: director first). Otherwise it keeps the `projects.js` order.
- Info is a single column: portrait, bio, links. There's no representation block because Hector is contacted directly.

## Motion
One authored moment per surface:
- Home: 1.2s crossfade between slides, plus a slow 8s settle from 1.04 scale.
- Lists: the color recede on hover, with stills fading in.
- Logo: the dash stretches from 0.42em to 1.9em.

Everything collapses under `prefers-reduced-motion`.

## Components
- Corner logo, fixed top-left on inner pages. Top nav, fixed top-right, with `aria-current` on the current page.
- **Lightbox player:** a 16:9 video capped at 880px, so it takes a section of the screen rather than all of it, with a 280–380px text column beside it. The column holds the title (22–30px, 500), a "type · client · year" line, the `about` paragraphs (60ch max), an Awards list under a hairline rule (text, or a laurel image at 52px tall), credits (one per line), then Previous/Next. The column scrolls on its own if it gets long. Empty sections are hidden. Below 900px it stacks, with the video on top and the whole overlay scrolling. Esc, the arrow keys and the `#slug` deep link all work.
- **Project list meta (on hover):** type (semibold), then location and year, as 9px caps. On touch screens only the type shows, in `--muted`, beside each title.

## Small screens (≤760px)
- No hover stills. Tapping a title plays it.
- The wordmark scales to 27vw. The slide label moves above the bottom tabs.
