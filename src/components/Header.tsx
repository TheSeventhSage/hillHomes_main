import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { gsap, motionOk } from '@/motion/gsap';
import { TLink } from '@/motion/transition';
import { company, menuGroups } from '@/data/site';
import { ArrowIcon, CloseIcon } from '@/components/Icons';
import { Card } from '@/components/Card';
import { useOverlay } from '@/ui/overlay';

const ORIGIN = 'calc(100% - 3.5rem) 2.75rem';
const PHONE = company.phone.replace(/\s/g, '');

/** The wordmark, the Menu pill and the mega menu: sections on the left, picture cards on the right. */
export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const was = useRef(false);

  useOverlay(open, panel, () => setOpen(false));

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-item]');
    const line = gsap
      .timeline({ paused: true, onReverseComplete: () => void gsap.set(el, { visibility: 'hidden' }) })
      .fromTo(el, { clipPath: `circle(0px at ${ORIGIN})` }, { clipPath: `circle(150vmax at ${ORIGIN})`, duration: 1, ease: 'expo.inOut' })
      .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, 0.35)
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
    } else if (was.current) {
      if (motionOk()) tl.current?.timeScale(1.4).reverse();
      else {
        tl.current?.progress(0);
        gsap.set(el, { visibility: 'hidden' });
      }
    }
    was.current = open;
  }, [open]);

  useEffect(() => {
    if (!was.current) return;
    tl.current?.pause(0);
    gsap.set(panel.current, { visibility: 'hidden' });
    was.current = false;
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[4.75rem] border-b border-line bg-canvas/80 opacity-0 backdrop-blur-xl transition-opacity duration-300 [html[data-scrolled]_&]:opacity-100"
      />
      <TLink to="/" aria-label="Hills Apartments and Homes, home" className="fixed left-[max(1.25rem,3.5vw)] top-3 z-50 block h-12 w-[6.5rem]">
        <img src="/brand/logo-dark.png" alt="" className="absolute inset-0 size-full object-contain transition-opacity duration-300 [html[data-header-dark]_&]:opacity-0" />
        <img src="/brand/logo-light.png" alt="" className="absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-300 [html[data-header-dark]_&]:opacity-100" />
      </TLink>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="fixed right-[max(1.25rem,3.5vw)] top-4 z-50 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 text-sm font-medium text-canvas transition-colors duration-300 hover:bg-gold hover:text-ink"
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
        tabIndex={-1}
        data-lenis-prevent=""
        onClick={(e) => {
          const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
          if (link?.getAttribute('href') === pathname) setOpen(false);
        }}
        className="invisible fixed inset-0 z-[70] overflow-y-auto bg-[#040a1c] text-canvas outline-none min-[900px]:overflow-hidden"
      >
        <img src="/brand/logo-light.png" alt="" className="absolute left-[max(1.25rem,3.5vw)] top-3 h-12 w-[6.5rem] object-contain" />
        <button
          type="button"
          data-autofocus=""
          onClick={() => setOpen(false)}
          className="fixed right-[max(1.25rem,3.5vw)] top-4 z-10 inline-flex min-h-11 items-center gap-3 rounded-full bg-canvas px-5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-gold"
        >
          Close
          <CloseIcon width={14} height={14} />
        </button>

        <nav aria-label="All pages" className="grid gap-9 px-[max(1.25rem,3.5vw)] pb-6 pt-24 min-[900px]:hidden">
          {menuGroups.map((g) => (
            <section key={g.label}>
              <div className="overflow-hidden">
                <h2 data-item="" className="m-0 border-b border-canvas/15 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {g.label}
                </h2>
              </div>
              <ul className="m-0 list-none p-0">
                {g.items.map((it) => (
                  <li key={it.path} className="overflow-hidden border-b border-canvas/15">
                    <TLink data-item="" to={it.path} aria-current={pathname === it.path ? 'page' : undefined} className="flex items-center justify-between gap-4 py-3.5 text-canvas no-underline">
                      <span className="grid gap-1">
                        <span className="font-display text-[1.75rem] leading-none">{it.label}</span>
                        <span className="text-[0.82rem] leading-snug text-canvas/70">{it.description}</span>
                      </span>
                      <ArrowIcon width={15} height={15} className="shrink-0 text-gold" />
                    </TLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="hidden h-full grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] grid-rows-[minmax(0,1fr)] gap-[4vw] px-[max(1.25rem,3.5vw)] pb-8 pr-[max(5rem,9vw)] pt-24 min-[900px]:grid">
          <div className="flex min-h-0 flex-col justify-between gap-10 pt-10">
            <nav aria-label="Sections">
              <ul className="m-0 grid list-none gap-3 p-0">
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
                        className={`grid text-left transition-colors duration-500 ease-out ${group === i ? 'text-gold' : 'text-canvas hover:text-canvas/75'}`}
                      >
                        <span className="flex items-center font-display text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[1.02] tracking-[-0.01em]">
                          <span aria-hidden="true" className={`mr-3 block h-[0.8em] w-[2px] origin-center rotate-[14deg] bg-gold transition-transform duration-500 ease-out ${group === i ? 'scale-y-100' : 'scale-y-0'}`} />
                          {g.label}
                        </span>
                        <span className={`text-sm transition-opacity duration-500 ${group === i ? 'text-canvas/70 opacity-100' : 'opacity-0'}`}>{g.hint}</span>
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
          <div ref={cards} className="relative h-full min-h-0">
            {menuGroups.map((g, gi) => (
              <div
                key={g.label}
                data-lenis-prevent=""
                inert={group !== gi}
                className={`absolute inset-0 grid content-start gap-x-5 gap-y-8 overflow-y-auto pb-10 pr-2 [scrollbar-width:thin] ${g.items.length > 3 ? 'grid-cols-2' : ''} ${group === gi ? 'translate-y-0 opacity-100 transition-[opacity,translate,visibility] delay-200 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]' : 'invisible translate-y-3 opacity-0 transition-[opacity,translate,visibility] duration-200 ease-out'}`}
              >
                {g.items.map((it) => (
                  <Card key={it.path} item={it} light ratio={g.items.length > 3 ? 'aspect-[16/10]' : g.items.length > 2 ? 'aspect-[16/5]' : 'aspect-[16/7]'} className="shrink-0" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
