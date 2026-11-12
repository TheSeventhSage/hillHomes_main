import { useRef } from 'react';
import { gsap, ScrollTrigger, motionOk } from '@/motion/gsap';
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

/** Wide screens: cards slide over the pinned hero. Phones: the cards stack over one another. */
export function Showcase() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  useMotion(root, ({ pinned }) => {
    const el = root.current;
    if (!el) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el);

    if (!pinned) {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        const body = card.querySelector('[data-body]');
        if (!next || !body) return;
        gsap.to(body, { scale: 0.92, opacity: 0.45, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } });
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
      if (shade) shade.style.opacity = String(clamp(moved / 60) * 0.6);
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
    <section ref={root} data-dark="" aria-label="Hills Apartments and Homes" className="relative bg-night pinned:h-svh pinned:overflow-hidden pinned:bg-canvas">
      <div className="relative h-svh w-full overflow-hidden pinned:absolute pinned:inset-y-0 pinned:left-0 pinned:w-[86vw]">
        <video
          className="absolute inset-0 size-full object-cover"
          src={hero.video}
          poster={hero.poster}
          autoPlay={motionOk()}
          muted
          loop
          playsInline
          preload="auto"
          aria-label="A quiet, sunlit bedroom, representative footage"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-night/55" />
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
            <h1 data-lines="" className="m-0 font-display text-[clamp(3.4rem,8.4vw,9.5rem)] font-normal leading-[0.9] tracking-[-0.02em]">
              {hero.lines.map((l, i) => (
                <span key={l} className={`block ${i === hero.lines.length - 1 ? 'italic' : ''}`}>
                  {l}
                </span>
              ))}
            </h1>
          </div>
          <div className="absolute inset-x-[max(1.25rem,3.5vw)] top-[30%] flex flex-wrap gap-x-8 gap-y-1 text-[0.8rem] font-medium pinned:hidden">
            <span>{hero.eyebrow}</span>
            <span>Founded in Abuja, 2021</span>
          </div>
          <button type="button" onClick={explore} className="absolute bottom-[2.2svh] left-[max(1.25rem,3.5vw)] inline-flex min-h-9 items-center gap-2 text-[0.8rem] font-medium text-white/90 underline decoration-gold underline-offset-4 pinned:hidden">
            Swipe up to explore
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-28 bg-gradient-to-b from-night/40 to-transparent pinned:block" />
      <div data-progress="" aria-hidden="true" className="absolute left-0 top-0 z-20 hidden h-[2px] w-full origin-left bg-gold pinned:block" style={{ transform: 'scaleX(0)' }} />
      <div data-track="" className="pinned:absolute pinned:inset-y-0 pinned:left-[86vw] pinned:flex pinned:will-change-transform">
        {portals.map((p, i) => (
          <article key={p.id} data-card="" className="sticky top-0 h-[78svh] overflow-hidden bg-night pinned:relative pinned:h-full pinned:w-[53.5vw] pinned:shrink-0">
            <div data-body="" className="grid h-full origin-top grid-cols-[minmax(0,1fr)_30%] pinned:block" style={{ background: p.tone }}>
              <div data-pic="" className="relative order-2 h-full overflow-hidden pinned:absolute pinned:inset-x-0 pinned:bottom-[32%] pinned:top-0 pinned:h-auto">
                <img src={p.image} alt={`${p.label}, representative picture`} className="absolute inset-0 size-full object-cover pinned:will-change-transform" />
              </div>
              <div data-block="" className="relative order-1 h-full text-white pinned:absolute pinned:inset-x-0 pinned:bottom-0 pinned:h-1/2" style={{ background: p.tone }}>
                <TLink to={p.path} data-cursor="View" className="group block h-full text-white no-underline">
                  <div data-copy="" className="relative flex h-full flex-col gap-5 p-5 pt-20 pinned:grid pinned:grid-cols-[1fr_auto] pinned:grid-rows-[auto_1fr] pinned:gap-4 pinned:p-[2.2vw]">
                    <span className="order-1 font-display text-[clamp(2.4rem,11vw,3.4rem)] leading-none pinned:hidden">{p.kicker}</span>
                    <ul className="order-2 m-0 grid list-none gap-y-2.5 self-stretch p-0 text-[0.8rem] pinned:order-none pinned:hidden pinned:grid-cols-2 pinned:gap-x-6 pinned:gap-y-2 pinned:self-start pinned:text-xs pinned:min-[1100px]:grid">
                      {p.points.map((pt) => (
                        <li key={pt.label} className="flex items-center justify-between gap-3 border-b border-white/35 pb-1.5">
                          {pt.label}
                          <ArrowIcon width={11} height={11} />
                        </li>
                      ))}
                    </ul>
                    <span data-magnet="" className="col-start-2 row-start-1 hidden size-11 place-items-center justify-self-end rounded-full border border-white/70 transition-colors duration-300 group-hover:bg-white group-hover:text-ink pinned:grid">
                      <PlusIcon />
                    </span>
                    <span className="col-start-1 row-start-2 hidden content-end gap-2 pinned:grid">
                      <span className="font-display text-[clamp(2.2rem,3.9vw,4.4rem)] leading-none">{p.kicker}</span>
                      <span className="text-xs tracking-widest">
                        {i + 1}/{portals.length}
                      </span>
                    </span>
                    <span className="order-3 mt-auto grid gap-3 text-sm font-medium pinned:order-none pinned:col-start-2 pinned:row-start-2 pinned:mt-0 pinned:max-w-[15ch] pinned:self-end pinned:text-right">
                      {p.line}
                      <span className="flex items-center justify-between text-xs tracking-widest pinned:hidden">
                        {i + 1}/{portals.length}
                        <span className="grid size-9 place-items-center rounded-full border border-white/70">
                          <PlusIcon width={14} height={14} />
                        </span>
                      </span>
                    </span>
                    <span className="sr-only">{p.label}</span>
                  </div>
                </TLink>
              </div>
            </div>
          </article>
        ))}
        <div aria-hidden="true" className="hidden bg-canvas pinned:block pinned:h-full pinned:w-[40vw] pinned:shrink-0" />
      </div>
    </section>
  );
}
