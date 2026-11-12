import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { useMotion } from '@/motion/useMotion';
import { smooth } from '@/motion/smooth';
import { TLink } from '@/motion/transition';
import { hero, portals } from '@/data/site';
import { ArrowIcon, PlusIcon } from '@/components/Icons';

const HERO_VW = 86;
const CARD_VW = 53.5;
const REST_VW = 75;
const TRAVEL_VW = HERO_VW + (portals.length - 1) * CARD_VW - (REST_VW - CARD_VW);
const GROW_VW = 42;
const clamp = gsap.utils.clamp(0, 1);
const easeOut = gsap.parseEase('power2.out');

/** The hero stays pinned while a row of cards slides over it; each card opens as it arrives. */
export function Showcase() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  useMotion(root, ({ pinned }) => {
    const el = root.current;
    if (!el) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el);

    if (!pinned) {
      cards.forEach((card) => {
        const pic = card.querySelector('[data-pic]');
        const block = card.querySelector('[data-block]');
        const on = { trigger: card, start: 'top 85%', once: true };
        if (pic) gsap.fromTo(pic, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', scrollTrigger: on });
        if (block) gsap.from(block, { opacity: 0, y: 30, duration: 1, ease: 'expo.out', scrollTrigger: on });
      });
      return;
    }

    const track = el.querySelector<HTMLElement>('[data-track]');
    const shade = el.querySelector<HTMLElement>('[data-shade]');
    const heroCopy = el.querySelector<HTMLElement>('[data-hero-copy]');
    const bar = el.querySelector<HTMLElement>('[data-progress]');
    const blocks = cards.map((c) => c.querySelector<HTMLElement>('[data-block]'));
    const copies = cards.map((c) => c.querySelector<HTMLElement>('[data-copy]'));
    const pics = cards.map((c) => c.querySelector<HTMLElement>('[data-pic] img'));
    if (!track) return;

    const render = (progress: number) => {
      const moved = progress * TRAVEL_VW;
      cards.forEach((_, i) => {
        const left = HERO_VW + i * CARD_VW - moved;
        const p = easeOut(clamp((HERO_VW - left) / GROW_VW));
        const block = blocks[i];
        const copy = copies[i];
        const pic = pics[i];
        if (block) block.style.height = `${50 - 18 * p}%`;
        if (copy) {
          copy.style.opacity = String(clamp((p - 0.45) * 2.2));
          copy.style.visibility = p > 0.45 ? 'visible' : 'hidden';
        }
        if (pic) pic.style.transform = `scale(${1.18 - 0.18 * p})`;
      });
      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (shade) shade.style.opacity = String(clamp(moved / 60) * 0.7);
      if (heroCopy) heroCopy.style.opacity = String(1 - clamp(moved / 70) * 0.75);
    };

    const travel = () => (TRAVEL_VW * window.innerWidth) / 100;
    const state: { tween?: gsap.core.Tween } = {};
    const tween = gsap.to(track, {
      x: () => -travel(),
      ease: 'none',
      onUpdate: () => render(state.tween?.progress() ?? 0),
      scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${travel()}`, pin: true, scrub: 0.9, invalidateOnRefresh: true },
    });
    state.tween = tween;
    render(tween.progress());
    trigger.current = tween.scrollTrigger ?? null;
  });

  const explore = () => {
    const st = trigger.current;
    if (st) smooth.to(st.start + ((HERO_VW - (100 - CARD_VW) / 2) * window.innerWidth) / 100);
    else {
      const next = root.current?.querySelector<HTMLElement>('[data-card]');
      if (next) smooth.to(next);
    }
  };

  return (
    <section ref={root} data-dark="" aria-label="Hills Apartments and Homes" className="relative bg-canvas pinned:h-svh pinned:overflow-hidden">
      <div className="relative h-svh w-full overflow-hidden pinned:absolute pinned:inset-y-0 pinned:left-0 pinned:w-[86vw]">
        <img src={hero.image} alt="A Hills residence, representative picture" className="absolute inset-0 size-full object-cover motion-safe:animate-slow-zoom" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/15 to-night/45" />
        <div data-shade="" className="absolute inset-0 bg-night opacity-0" />
        <div data-hero-copy="" className="absolute inset-0 text-white">
          <div className="absolute inset-x-[max(1.25rem,3.5vw)] top-1/2 hidden -translate-y-1/2 items-center text-sm font-medium pinned:flex">
            <span className="w-[22vw]">{hero.eyebrow}</span>
            <span>Founded in Abuja, 2021</span>
            <button type="button" onClick={explore} className="ml-auto inline-flex min-h-11 items-center gap-3 text-sm font-medium text-white">
              Scroll to explore
              <span data-magnet="" className="grid size-8 place-items-center rounded-full border border-white/70 transition-colors duration-300 hover:bg-white hover:text-ink">
                <ArrowIcon width={14} height={14} />
              </span>
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-[max(1.25rem,3.5vw)] pb-[7svh]">
            <p className="m-0 mb-5 text-sm font-medium pinned:hidden">{hero.eyebrow}</p>
            <h1 data-lines="" data-delay="0.35" className="m-0 font-display text-[clamp(3.4rem,8.4vw,9.5rem)] font-normal leading-[0.9] tracking-[-0.02em]">
              {hero.lines.map((l, i) => (
                <span key={l} className={`block ${i === hero.lines.length - 1 ? 'italic' : ''}`}>
                  {l}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-28 bg-gradient-to-b from-night/40 to-transparent pinned:block" />
      <div data-progress="" aria-hidden="true" className="absolute left-0 top-0 z-20 hidden h-[2px] w-full origin-left bg-gold pinned:block" style={{ transform: 'scaleX(0)' }} />
      <div data-track="" className="pinned:absolute pinned:inset-y-0 pinned:left-[86vw] pinned:flex pinned:will-change-transform">
        {portals.map((p, i) => (
          <article key={p.id} data-card="" className="relative overflow-hidden pinned:h-full pinned:w-[53.5vw] pinned:shrink-0" style={{ background: p.tone }}>
            <div data-pic="" className="relative aspect-[4/3] overflow-hidden pinned:absolute pinned:inset-x-0 pinned:bottom-[32%] pinned:top-0 pinned:aspect-auto">
              <img src={p.image} alt={`${p.label}, representative picture`} className="absolute inset-0 size-full object-cover pinned:will-change-transform" />
            </div>
            <div data-block="" className="relative text-white pinned:absolute pinned:inset-x-0 pinned:bottom-0 pinned:h-1/2" style={{ background: p.tone }}>
              <TLink to={p.path} data-cursor="View" className="group block h-full text-white no-underline">
                <div data-copy="" className="relative grid h-full min-h-60 grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-4 p-6 pinned:min-h-0 pinned:p-[2.2vw]">
                  <ul className="m-0 hidden list-none grid-cols-2 gap-x-6 gap-y-2 self-start p-0 text-xs min-[1100px]:grid">
                    {p.points.map((pt) => (
                      <li key={pt.label} className="flex items-center justify-between gap-3 border-b border-white/35 pb-1.5">
                        {pt.label}
                        <ArrowIcon width={11} height={11} />
                      </li>
                    ))}
                  </ul>
                  <span data-magnet="" className="col-start-2 row-start-1 grid size-11 place-items-center justify-self-end rounded-full border border-white/70 transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                    <PlusIcon />
                  </span>
                  <span className="col-start-1 row-start-2 grid content-end gap-2">
                    <span className="font-display text-[clamp(2.2rem,3.9vw,4.4rem)] leading-none">{p.kicker}</span>
                    <span className="text-xs tracking-widest">
                      {i + 1}/{portals.length}
                    </span>
                  </span>
                  <span className="col-start-2 row-start-2 max-w-[15ch] self-end text-right text-sm font-medium">{p.line}</span>
                  <span className="sr-only">{p.label}</span>
                </div>
              </TLink>
            </div>
          </article>
        ))}
        <div aria-hidden="true" className="hidden bg-canvas pinned:block pinned:h-full pinned:w-[40vw] pinned:shrink-0" />
      </div>
    </section>
  );
}
