import { useRef } from 'react';
import { gsap } from '@/motion/gsap';
import { useMotion } from '@/motion/useMotion';
import { offerings } from '@/data/site';

/** The six services as a row that travels sideways while the page stays pinned. */
export function Practice() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useMotion(root, ({ pinned }) => {
    const el = root.current;
    const row = track.current;
    if (!el || !row) return;
    if (!pinned) {
      gsap.utils.toArray<HTMLElement>('[data-card]', el).forEach((card) => {
        gsap.from(card, { opacity: 0, y: 36, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
      });
      return;
    }
    const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
    gsap.to(row, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    });
    gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, scrub: 0.6, invalidateOnRefresh: true } });
  });

  return (
    <section ref={root} className="bg-paper py-28 pinned:flex pinned:h-svh pinned:flex-col pinned:justify-center pinned:overflow-hidden pinned:py-0">
      <div className="px-[max(1.25rem,3.5vw)]">
        <p className="m-0 mb-4 text-sm font-medium uppercase tracking-[0.2em] text-ink-2">The practice</p>
        <h2 className="m-0 mb-14 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,6rem)] font-normal leading-[0.98]">Six ways to build with us.</h2>
      </div>
      <div ref={track} className="flex flex-col gap-4 px-[max(1.25rem,3.5vw)] pinned:w-max pinned:flex-row pinned:gap-6">
        {offerings.map((o, i) => (
          <article
            key={o.title}
            data-card=""
            className="grid min-h-64 content-between gap-10 border border-line bg-canvas p-8 pinned:h-[46svh] pinned:w-[min(28rem,70vw)] pinned:shrink-0"
          >
            <span className="font-display text-5xl text-gold">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="m-0 mb-3 font-display text-[clamp(1.8rem,2.6vw,2.8rem)] font-normal leading-none">{o.title}</h3>
              <p className="m-0 max-w-[30ch] text-[0.95rem] leading-relaxed text-ink-2">{o.body}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 hidden px-[max(1.25rem,3.5vw)] pinned:block">
        <div className="h-px bg-line">
          <div ref={bar} className="h-px origin-left bg-ink" />
        </div>
      </div>
    </section>
  );
}
