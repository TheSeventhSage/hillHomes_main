import { useRef } from 'react';
import { gsap } from '@/motion/gsap';
import { useMotion } from '@/motion/useMotion';
import { usePageMotion } from '@/motion/page';
import { smooth } from '@/motion/smooth';
import { plates } from '@/data/site';

const two = (n: number) => String(n).padStart(2, '0');

/** A deck of plates: each picture settles, then the next one slides over it. */
export function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;
    const frames = gsap.utils.toArray<HTMLElement>('[data-plate]', el);
    frames.forEach((frame, i) => {
      const pic = frame.querySelector('[data-plate-pic]');
      const img = frame.querySelector('img');
      const next = frames[i + 1];
      if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'top top', scrub: true } });
      if (next && pic) gsap.to(pic, { scale: 0.86, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } });
    });
  });

  const jump = (i: number) => {
    const deck = root.current?.querySelector<HTMLElement>('[data-deck]');
    if (deck) smooth.to(deck.getBoundingClientRect().top + window.scrollY + i * window.innerHeight);
  };

  return (
    <div ref={root}>
      <section className="px-[max(1.25rem,3.5vw)] pb-16 pt-40">
        <div className="mx-auto grid max-w-[96rem] gap-10 min-[900px]:grid-cols-[1.4fr_1fr] min-[900px]:items-end">
          <div>
            <p data-fade="" className="m-0 mb-6 text-xs font-medium uppercase tracking-[0.24em] text-gold">
              Gallery
            </p>
            <h1 data-lines="" className="m-0 max-w-[10ch] font-display text-[clamp(3rem,9vw,9rem)] font-normal leading-[0.92] tracking-[-0.02em]">
              Ten plates.
            </h1>
          </div>
          <p data-fade="" className="m-0 max-w-[40ch] text-base leading-relaxed text-ink-2">
            Representative pictures of homes, interiors, courtyards and gardens. Scroll to turn them over one at a time, or pick one below.
          </p>
        </div>
        <ol data-fade="" className="mx-auto mt-14 grid max-w-[96rem] list-none grid-cols-5 gap-2 p-0 min-[900px]:grid-cols-10">
          {plates.map((p, i) => (
            <li key={p.src}>
              <button type="button" onClick={() => jump(i)} aria-label={`Plate ${i + 1}: ${p.caption}`} className="group block w-full text-left">
                <span className="relative block aspect-[3/4] overflow-hidden bg-ink/10">
                  <img src={p.src} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-80 transition-[opacity,scale] duration-700 ease-out group-hover:scale-105 group-hover:opacity-100" />
                </span>
                <span className="mt-2 block border-t border-gold/60 pt-1.5 font-display text-lg leading-none">{two(i + 1)}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>
      <div data-deck="" className="bg-night">
        {plates.map((p, i) => (
            <section key={p.src} data-plate="" data-dark="" className="sticky top-0 grid h-svh grid-rows-[1fr_auto] overflow-hidden bg-night px-[max(1.25rem,3.5vw)] pb-[5svh] pt-24 text-canvas">
              <div data-plate-pic="" className="relative mx-auto h-full w-full max-w-[min(100%,150svh)] overflow-hidden">
                <img src={p.src} alt={`Representative picture: ${p.caption}`} loading={i < 2 ? 'eager' : 'lazy'} className="absolute inset-0 size-full object-cover" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold/45" />
              </div>
              <div className="mx-auto mt-5 flex w-full max-w-[min(100%,150svh)] items-end justify-between gap-6">
                <p className="m-0 flex items-baseline gap-4">
                  <span className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-none text-gold">{two(i + 1)}</span>
                  <span className="font-display text-[clamp(1.4rem,2.4vw,2.4rem)] leading-none">{p.caption}</span>
                </p>
                <p className="m-0 text-xs tracking-[0.2em] text-canvas/60">
                  {two(i + 1)} / {two(plates.length)}
                </p>
              </div>
            </section>
        ))}
      </div>
    </div>
  );
}
