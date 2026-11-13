# Hills Apartments and Homes: full experience site

A separate project from `Hill_Homes`. It reuses the Hills brand (cream, navy, crimson, gold, Instrument Serif, Geist) and content, with a scroll-led feel: preloader, page transitions, pinned sequences, scroll reveals and smooth scroll.

## Run

```
npm install
npm run dev
```

Checks: `npx tsc -b`, `npx eslint src vite.config.ts`, `npx vite build`.

## Where things are

- `src/motion/`: GSAP setup, Lenis smooth scroll, the page transition and link, the motion gate, and the shared hooks.
- `src/sections/`: the pinned Showcase, Statement, Practice (horizontal), Routes and Values.
- `src/pages/`: Home, Properties (the listings index), Portal, Service, About, Gallery, Contact.
- `src/listings/`: sample listings, the listing card, the full-page glass drawer and the viewing checkout.
- `src/ui/`: the shared overlay (scroll lock, focus trap, Escape), the in-app confirm modal and toasts. Native `alert`, `confirm` and `prompt` are never used.
- `src/data/site.ts`: all copy. `src/data/seo.ts`: the title and description of every route.

## Listings and the viewing checkout

Listings in `src/listings/data.ts` are samples and are labelled as such on screen. Replace them with Hills' real inventory.
A listing opens at `?listing=<id>`, so it can be shared and closed with Back.
The checkout saves the request on the device and hands it to the team through WhatsApp or email. No payment is taken: connect a payment provider before showing a deposit step.

## SEO and the share image

- `index.html` carries the description, canonical link, Open Graph and Twitter tags and the `RealEstateAgent` structured data.
- The build writes one HTML file per route with its own title and description, plus `sitemap.xml` and `robots.txt`.
- The site address comes from `SITE_URL`, then Vercel's production URL, then the default in `src/data/seo.ts`. Set `SITE_URL` if the live domain differs, because share images need an absolute address.
- `public/og.jpg` (1200 x 630) is the picture shown when a link is shared.

## Motion rules

Everything is skipped under `prefers-reduced-motion`. Pinned sequences only run at 900px and wider.
