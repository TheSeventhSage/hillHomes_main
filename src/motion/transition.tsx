import { createContext, useCallback, useContext, useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { gsap, motionOk } from '@/motion/gsap';
import { gate } from '@/motion/gate';
import { smooth } from '@/motion/smooth';
import { brand, pageFor } from '@/data/site';

const Ctx = createContext<{ go: (to: string, from?: HTMLImageElement) => void }>({ go: () => {} });
export const useGo = () => useContext(Ctx).go;

const warmed = new Set<string>();
function warm(to: string) {
  const image = pageFor(to)?.image;
  if (!image || warmed.has(image)) return;
  warmed.add(image);
  const img = new Image();
  img.src = image;
  void img.decode().catch(() => {});
}

/** A link that plays the page transition instead of jumping. */
export function TLink({ to, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const go = useGo();
  return (
    <a
      href={to}
      {...rest}
      onPointerEnter={() => warm(to)}
      onFocus={() => warm(to)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(to, e.currentTarget.querySelector<HTMLImageElement>('img[data-grow]') ?? undefined);
      }}
    />
  );
}

/** The curtain that wipes up, names the next page, then lifts away. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const here = useRef(pathname);
  here.current = pathname;

  useEffect(() => {
    document.title = pathname === '/' ? brand.name : `${pageFor(pathname)?.label ?? 'Page'} | ${brand.name}`;
    smooth.top();
  }, [pathname]);

  const go = useCallback(
    (to: string, from?: HTMLImageElement) => {
      if (busy.current || to === here.current) return;
      const c = curtain.current;
      const l = label.current;
      if (!c || !l || !motionOk()) {
        navigate(to);
        return;
      }
      busy.current = true;
      smooth.stop();
      gate.close();
      const g = ghost.current;
      const pic = g?.querySelector('img');
      if (from && g && pic) {
        const r = from.getBoundingClientRect();
        pic.src = from.currentSrc || from.src;
        gsap
          .timeline({
            onComplete() {
              busy.current = false;
              smooth.start();
              gsap.set(g, { visibility: 'hidden', opacity: 1 });
            },
          })
          .set(g, { visibility: 'visible', left: r.left, top: r.top, width: r.width, height: r.height })
          .to(g, { left: 0, top: 0, width: () => window.innerWidth, height: () => window.innerHeight, duration: 0.95, ease: 'expo.inOut' })
          .add(() => navigate(to))
          .to({}, { duration: 0.45 })
          .add(() => gate.release())
          .to(g, { opacity: 0, duration: 0.7, ease: 'power2.out' });
        return;
      }
      l.textContent = pageFor(to)?.label ?? brand.short;
      gsap
        .timeline({
          onComplete() {
            busy.current = false;
            smooth.start();
            gsap.set(c, { visibility: 'hidden', pointerEvents: 'none' });
          },
        })
        .set(c, { visibility: 'visible', pointerEvents: 'auto' })
        .fromTo(c, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'expo.inOut' })
        .fromTo(l, { yPercent: 115 }, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, '-=0.35')
        .add(() => navigate(to))
        .to({}, { duration: 0.5 })
        .add(() => gate.release())
        .to(l, { yPercent: -115, duration: 0.5, ease: 'expo.in' })
        .to(c, { clipPath: 'inset(0% 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.3');
    },
    [navigate],
  );

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <div ref={curtain} aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[90] grid place-items-center bg-night">
        <span className="block overflow-hidden px-4 pb-[0.15em] text-center font-display text-[clamp(2.5rem,7vw,6rem)] leading-none text-canvas">
          <span ref={label} className="block" />
        </span>
      </div>
      <div ref={ghost} aria-hidden="true" className="pointer-events-none invisible fixed z-[95] overflow-hidden bg-night">
        <img alt="" className="absolute inset-0 size-full object-cover" />
      </div>
    </Ctx.Provider>
  );
}
