import { useRef, useState } from 'react';
import { gsap, motionOk } from '@/motion/gsap';
import { TLink } from '@/motion/transition';
import { routes } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';

/** A plain list of places to go; a picture follows the pointer over each row. */
export function Routes() {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const follow = (e: React.PointerEvent) => {
    const el = float.current;
    const box = root.current?.getBoundingClientRect();
    if (!el || !box || e.pointerType !== 'mouse') return;
    gsap.to(el, { x: e.clientX - box.left + 28, y: e.clientY - box.top - 110, duration: motionOk() ? 0.6 : 0, ease: 'power3.out', overwrite: true });
  };

  return (
    <section ref={root} onPointerMove={follow} onPointerLeave={() => setActive(null)} className="relative px-[max(1.25rem,3.5vw)] py-28">
      <div className="mx-auto max-w-[96rem]">
        <h2 data-lines="" className="m-0 mb-8 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-none">
          Where would you like to go?
        </h2>
        <ul className="m-0 list-none border-t border-line p-0">
          {routes.map((r, i) => (
            <li key={r.path} data-fade="" className="border-b border-line">
              <TLink
                to={r.path}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid min-h-16 items-center gap-x-6 gap-y-1 py-4 text-ink no-underline transition-[padding] duration-500 ease-out hover:pl-4 min-[900px]:grid-cols-[1fr_1.4fr_auto]"
              >
                <span className="text-lg font-medium">{r.label}</span>
                <span className="text-[0.95rem] text-ink-2">{r.description}</span>
                <span data-magnet="" className="hidden size-8 place-items-center rounded-full border border-ink/30 transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas min-[900px]:grid">
                  <ArrowIcon width={14} height={14} />
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        ref={float}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-10 hidden h-[13rem] w-[20rem] overflow-hidden transition-[opacity,clip-path] duration-500 ease-out min-[900px]:block ${active === null ? 'opacity-0 [clip-path:inset(50%_0_50%_0)]' : 'opacity-100 [clip-path:inset(0)]'}`}
      >
        {routes.map((r, i) => (
          <img key={r.path} src={r.image} alt="" loading="lazy" className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
    </section>
  );
}
