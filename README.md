# Hills Apartments and Homes: full experience site

A separate project from `Hill_Homes`. It reuses the Hills brand (cream, navy, crimson, gold, Instrument Serif, Geist) and content, with a scroll-led feel: preloader, page transitions, pinned sequences, scroll reveals and smooth scroll.

## Run

```
npm install
npm run dev
```

Checks: `npx tsc -b`, `npx eslint src`, `npx vite build`.

## Where things are

- `src/motion/`: GSAP setup, Lenis smooth scroll, the page transition and link, the motion gate, and the shared hooks.
- `src/sections/`: the pinned Showcase, Statement, Practice (horizontal), Gallery and Values.
- `src/pages/`: Home, Properties, Portal, Service, About, Contact.
- `src/data/site.ts`: all copy, taken from the main Hills repo. Sample statistics, quotes and FAQ answers were left out on purpose.

## Motion rules

Everything is skipped under `prefers-reduced-motion`. Pinned sequences only run at 900px and wider.
