import { useRef } from 'react';
import { gsap, SplitText } from '@/motion/gsap';
import { useMotion } from '@/motion/useMotion';
import { TLink } from '@/motion/transition';
import { hero, identity } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';

/** The introduction: a large line that lights up word by word, then the plain statement. */
export function Statement() {
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLHeadingElement>(null);

  useMotion(root, () => {
    const el = text.current;
    if (!el) return;
    const split = SplitText.create(el, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: true } },
    );
  });

  return (
    <section ref={root} className="px-[max(1.25rem,3.5vw)] pb-[12svh] pt-[16svh]">
      <div className="mx-auto max-w-[96rem]">
        <h2 ref={text} className="m-0 max-w-[18ch] font-display text-[clamp(2.4rem,5.6vw,6rem)] font-normal leading-[1.02] tracking-[-0.01em]">
          {identity.mission} {identity.motto}
        </h2>
        <div className="mt-14 grid gap-6 min-[900px]:grid-cols-[1fr_2.4fr]">
          <p data-fade="" className="m-0 max-w-[14ch] text-sm font-medium leading-snug">
            {identity.values.join('. ')}.
          </p>
          <div>
            <p data-fade="" className="m-0 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink-2">
              {hero.statement}
            </p>
            <TLink data-fade="" to="/about" className="group mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink no-underline">
              About Hills
              <span data-magnet="" className="grid size-8 place-items-center rounded-full border border-ink/40 transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas">
                <ArrowIcon width={14} height={14} />
              </span>
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
