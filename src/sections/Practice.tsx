import { useRef } from 'react';
import { gsap } from '@/motion/gsap';
import { useMotion } from '@/motion/useMotion';
import { offerings } from '@/data/site';

const PICTURES = ['interior', 'tropical', 'house', 'entrance', 'land', 'commercial'];

/** The six services as tall picture plates that travel sideways while the page stays pinned. */
export function Practice() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useMotion(root, ({ pinned }) => {
    const el = root.current;
    const row = track.current;
    if (!el || !row) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el);
    if (!pinned) {
      cards.forEach((card) => {
        gsap.from(card, { opacity: 0, y: 36, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
      });
      return;
    }
    const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
    const tween = gsap.to(row, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          if (count.current) count.current.textContent = String(Math.min(cards.length, Math.floor(self.progress * cards.length) + 1)).padStart(2, '0');
        },
      },
    });
    cards.forEach((card) => {
      const img = card.querySelector('img');
      if (img) gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    });
  });

  return (
    <section ref={root} className="bg-paper py-24 text-ink pinned:flex pinned:h-svh pinned:flex-col pinned:justify-center pinned:overflow-hidden pinned:py-0">
      <div className="mb-10 flex items-end justify-between gap-6 px-[max(1.25rem,3.5vw)]">
        <div>
          <p className="m-0 mb-4 text-xs font-medium uppercase tracking-[0.24em] text-ink-2">What we do</p>
          <h2 className="m-0 max-w-[14ch] font-display text-[clamp(2.2rem,4.6vw,4.8rem)] font-normal leading-[0.98]">Six ways we can help.</h2>
        </div>
        <p aria-hidden="true" className="m-0 hidden font-display text-[clamp(2rem,3vw,3rem)] leading-none text-ink/50 pinned:block">
          <span ref={count} className="text-gold">
            01
          </span>
          <span className="mx-2 text-ink/25">/</span>
          {String(offerings.length).padStart(2, '0')}
        </p>
      </div>
      <div ref={track} className="flex flex-col gap-4 px-[max(1.25rem,3.5vw)] pinned:w-max pinned:flex-row pinned:gap-5">
        {offerings.map((o, i) => (
          <article key={o.title} data-card="" className="group relative h-[22rem] overflow-hidden rounded-[1.25rem] bg-night text-canvas pinned:h-[54svh] pinned:w-[min(26rem,34vw)] pinned:shrink-0">
            <img
              src={`/pictures/${PICTURES[i] ?? 'house'}.webp`}
              alt=""
              loading="lazy"
              className="absolute -inset-x-[10%] inset-y-0 h-full w-[120%] max-w-none object-cover opacity-90 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/15 to-night/35" />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-[scale] duration-700 ease-out group-hover:scale-x-100" />
            <div className="absolute inset-0 flex flex-col justify-between p-7">
              <span className="font-display text-[clamp(3.4rem,5vw,5rem)] leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div className="transition-[translate] duration-700 ease-out group-hover:-translate-y-2">
                <h3 className="m-0 mb-3 font-display text-[clamp(1.8rem,2.4vw,2.6rem)] font-normal leading-none">{o.title}</h3>
                <p className="m-0 max-w-[28ch] text-[0.95rem] leading-relaxed text-canvas/85">{o.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 hidden px-[max(1.25rem,3.5vw)] pinned:block">
        <div className="h-px bg-ink/15">
          <div ref={bar} className="h-px origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  );
}
