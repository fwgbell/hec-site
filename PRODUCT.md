# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS with no build step, deployed on Cloudflare Pages (output directory `public/`). Films are embedded from Vimeo and YouTube, never self-hosted. The only self-hosted video is an optional short, muted homepage loop under 25 MB.

## Users

- **Production companies and agencies:** producers and creatives deciding whether to commission Hector as a director, mostly for commercial and branded work. This is the primary audience.
- **Brands hiring directly:** in-house brand and marketing teams commissioning without an agency.
- **Post houses and other directors:** people hiring him specifically as an editor.

They usually arrive from a link in an email, a treatment or Instagram, often on a laptop between other tabs, and judge within a minute or two. Music artists and labels were not named as a target audience.

## Product Purpose

A portfolio for Hector Bell, director and editor. It gets him hired by showing the work immediately and letting a visitor play any film in one click. Success means a commissioner watches at least one film and gets in touch.

## Positioning

Hector is **a director first**; editing is a real second practice that supports it. The site shows both, but directing leads wherever an order or emphasis has to be chosen. Editing work still has to be easy to find for people hiring an editor.

## Operating Context

- Visitors move between the full slideshow, the project lists and a single film; a film often opens straight from a shared `#slug` link.
- Updates are made by Hector or his brother, who aren't developers, by editing one data file (`public/js/projects.js`) and pushing to GitHub. Cloudflare redeploys automatically.

## Capabilities and Constraints

- Pages: Home (featured-film slideshow), Directing, Editing, Info. There's a lightbox player with prev/next, and every project has a deep link.
- Each project carries a Vimeo (including unlisted) or YouTube video, a role (directing, editing or both), an optional `featured` flag, stills and an optional loop.
- Vimeo's free plan can't hide its player UI or do background playback, so the homepage background uses stills or a self-hosted loop, never a live Vimeo embed.
- Hosting must stay free.
- **Contact:** Hector is contacted directly by email and Instagram. **He has no representation.** The rep block on the Info page should be removed.

## Brand Commitments

Binding, from the client brief `website-idea.pdf`:
- The homepage wordmark is a scan of Hector's own handwritten "Hector Bell", sitting above a full-bleed film slideshow, with small, neat tabs along the bottom: Directing, Editing, Info.
- Directing and Editing are large typographic lists of every project; hovering a title recedes the others and brings up that project's stills.
- Every page except home carries a small "hector–bell" corner logo whose dash stretches on hover.
- Info is a plain white page: portrait, short bio, links.

## Evidence on Hand

- **Real assets, none yet in the repo:** the handwritten wordmark scan, project list, video links, stills, bio, portrait, email and Instagram are all still to come from Hector.
- Current projects are **placeholders** (Blender Foundation open films) and must be fully replaced before launch.
- Don't invent clients, awards, press, festival selections or testimonials. Show them only when Hector supplies them.

## Product Principles

1. The work leads. Every page gets a visitor to a playing film in one click, and nothing sits between the visitor and the work.
2. Directing first. Where order or prominence must be chosen, directing wins, but editing is never hidden.
3. Anyone can update it. Adding a project means editing one file, and the design must hold up with any number of projects and any mix of stills.
4. Only real proof: show only the work and credits Hector actually has.
