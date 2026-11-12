import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { gsap, motionOk } from '@/motion/gsap';
import { TLink } from '@/motion/transition';
import { company, menuGroups } from '@/data/site';
import { CloseIcon } from '@/components/Icons';
import { Card } from '@/components/Card';

const ORIGIN = 'calc(100% - 3.5rem) 2.75rem';
const PHONE = company.phone.replace(/\s/g, '');

/** The wordmark, the Menu pill and the mega menu: sections on the left, picture cards on the right. */
export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const was = useRef(false);

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-item]');
    const line = gsap
      .timeline({ paused: true, onReverseComplete: () => void gsap.set(el, { visibility: 'hidden' }) })
      .fromTo(el, { clipPath: `circle(0px at ${ORIGIN})` }, { clipPath: `circle(150vmax at ${ORIGIN})`, duration: 1, ease: 'expo.inOut' })
      .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.35)
      .fromTo(cards.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0.45);
    tl.current = line;
    return () => {
      line.kill();
    };
  }, []);

  const intent = useRef(0);
  const choose = (i: number) => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => setGroup(i), 110);
  };

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      if (motionOk()) tl.current?.timeScale(1).play();
      else tl.current?.progress(1);
      closer.current?.focus();
    } else if (was.current) {
      if (motionOk()) tl.current?.timeScale(1.4).reverse();
      else {
        tl.current?.progress(0);
        gsap.set(el, { visibility: 'hidden' });
      }
      opener.current?.focus();
    }
    was.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!was.current) return;
    tl.current?.progress(0);
    gsap.set(panel.current, { visibility: 'hidden' });
    was.current = false;
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <TLink to="/" aria-label="Hills Apartments and Homes, home" className="fixed left-[max(1.25rem,3.5vw)] top-3 z-50 block h-12 w-[6.5rem]">
        <img src="/brand/logo-dark.png" alt="" className="absolute inset-0 size-full object-contain transition-opacity duration-300 [html[data-header-dark]_&]:opacity-0" />
        <img src="/brand/logo-light.png" alt="" className="absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-300 [html[data-header-dark]_&]:opacity-100" />
      </TLink>
      <button
        ref={opener}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="fixed right-[max(1.25rem,3.5vw)] top-4 z-50 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-gold hover:text-ink"
      >
        Menu
        <span className="grid w-5 gap-[5px]" aria-hidden="true">
          <i className="block h-[1.5px] bg-current" />
          <i className="block h-[1.5px] w-3/5 justify-self-end bg-current" />
        </span>
      </button>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-lenis-prevent=""
        className="invisible fixed inset-0 z-[70] overflow-y-auto bg-[#040a1c] text-canvas min-[900px]:overflow-hidden"
      >
        <img src="/brand/logo-light.png" alt="" className="absolute left-[max(1.25rem,3.5vw)] top-3 h-12 w-[6.5rem] object-contain" />
        <button
          ref={closer}
          type="button"
          onClick={() => setOpen(false)}
          className="fixed right-[max(1.25rem,3.5vw)] top-4 z-10 inline-flex min-h-11 items-center gap-3 rounded-full bg-canvas px-5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-gold"
        >
          Close
          <CloseIcon width={14} height={14} />
        </button>
        <div className="grid gap-8 px-[max(1.25rem,3.5vw)] pb-8 pt-24 min-[900px]:h-full min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] min-[900px]:grid-rows-[minmax(0,1fr)] min-[900px]:gap-[4vw] min-[900px]:pr-[max(5rem,9vw)]">
          <div className="flex min-h-0 flex-col justify-between gap-10 min-[900px]:pt-10">
            <nav aria-label="Sections">
              <ul className="m-0 grid list-none gap-1 p-0">
                {menuGroups.map((g, i) => (
                  <li key={g.label} className="overflow-hidden">
                    <span data-item="" className="block">
                      <button
                        type="button"
                        aria-pressed={group === i}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && choose(i)}
                        onPointerLeave={() => window.clearTimeout(intent.current)}
                        onFocus={() => setGroup(i)}
                        onClick={() => setGroup(i)}
                        className={`flex items-center py-1 text-left font-display text-[clamp(2.2rem,4.6vw,4.4rem)] uppercase leading-[1.02] tracking-[-0.01em] transition-colors duration-500 ease-out ${group === i ? 'text-gold' : 'text-canvas'}`}
                      >
                        <span aria-hidden="true" className={`mr-3 block h-[0.95em] w-px origin-center rotate-[14deg] bg-gold transition-transform duration-500 ease-out ${group === i ? 'scale-y-100' : 'scale-y-0'}`} />
                        {g.label}
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid gap-3 text-sm text-canvas/75">
              <div className="overflow-hidden">
                <p data-item="" className="m-0 max-w-[34ch]">
                  {company.address}
                </p>
              </div>
              <div className="overflow-hidden">
                <p data-item="" className="m-0 flex flex-wrap gap-x-6 gap-y-1">
                  <a className="text-canvas no-underline hover:text-gold" href={`tel:${PHONE}`}>
                    {company.phone}
                  </a>
                  <a className="text-canvas no-underline hover:text-gold" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div ref={cards} className="relative min-h-0 min-[900px]:h-full">
            {menuGroups.map((g, gi) => (
              <div
                key={g.label}
                data-lenis-prevent=""
                inert={group !== gi}
                className={`grid content-start gap-8 transition-[opacity,translate,visibility] duration-500 ease-out min-[900px]:h-full min-[900px]:overflow-y-auto min-[900px]:pb-10 min-[900px]:pr-2 min-[900px]:[scrollbar-width:thin] ${group === gi ? 'visible relative translate-y-0 opacity-100 delay-100' : 'invisible absolute inset-0 translate-y-4 overflow-hidden opacity-0 min-[900px]:overflow-hidden'}`}
              >
                {g.items.map((it) => (
                  <Card key={it.path} item={it} light ratio="aspect-[16/7]" className="shrink-0" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
