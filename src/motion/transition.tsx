import { createContext, useCallback, useContext, useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { gsap, motionOk } from '@/motion/gsap';
import { gate } from '@/motion/gate';
import { smooth } from '@/motion/smooth';
import { brand, pageFor } from '@/data/site';
import { metaFor, NOT_FOUND } from '@/data/seo';

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
    const meta = metaFor(pathname) ?? NOT_FOUND;
    const url = `${window.location.origin}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;
    const set = (selector: string, attr: string, value: string) => document.head.querySelector(selector)?.setAttribute(attr, value);
    document.title = meta.title;
    set('meta[name="description"]', 'content', meta.description);
    set('meta[property="og:title"]', 'content', meta.title);
    set('meta[property="og:description"]', 'content', meta.description);
    set('meta[property="og:url"]', 'content', url);
    set('meta[name="twitter:title"]', 'content', meta.title);
    set('meta[name="twitter:description"]', 'content', meta.description);
    set('link[rel="canonical"]', 'href', url);
    set('meta[name="robots"]', 'content', meta === NOT_FOUND ? 'noindex' : 'index, follow');
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
      smooth.lock();
      gate.close();
      const g = ghost.current;
      const veil = g?.querySelector<HTMLElement>('[data-veil]');
      const frame = g?.querySelector<HTMLElement>('[data-frame]');
      const shade = g?.querySelector<HTMLElement>('[data-shade]');
      const pic = frame?.querySelector('img');
      const target = pageFor(to);
      const same = from && target?.hero && new URL(from.currentSrc || from.src, window.location.href).pathname === target.image;
      if (from && same && g && veil && frame && shade && pic) {
        const box = from.parentElement ?? from;
        const r = box.getBoundingClientRect();
        const view = window.innerHeight;
        const heroH = Math.max(view * 0.82, 448);
        const drift = -6.5 + 13 * (view / (view + heroH));
        const grown = Number(getComputedStyle(from).scale) || 1;
        pic.src = from.currentSrc || from.src;
        gsap
          .timeline({
            defaults: { duration: 1.05, ease: 'expo.inOut' },
            onComplete() {
              busy.current = false;
              smooth.unlock();
              gsap.set(g, { visibility: 'hidden', opacity: 1 });
            },
          })
          .set(g, { visibility: 'visible', opacity: 1 })
          .set(veil, { opacity: 0 })
          .set(shade, { opacity: from.dataset.grow === 'dim' ? 0.75 : 0 })
          .set(frame, { left: r.left, top: r.top, width: r.width, height: r.height, borderRadius: getComputedStyle(box).borderRadius })
          .set(pic, { top: '0%', height: '100%', scale: grown })
          .to(frame, { left: 0, top: 0, width: () => document.getElementById('main')?.getBoundingClientRect().width ?? window.innerWidth, height: heroH, borderRadius: 0 })
          .to(pic, { top: `${-8 + 1.16 * drift}%`, height: '116%', scale: 1 }, '<')
          .to(shade, { opacity: 1 }, '<')
          .to(veil, { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, '<0.2')
          .add(() => navigate(to))
          .to({}, { duration: 0.45 })
          .add(() => gate.release())
          .to(g, { opacity: 0, duration: 0.9, ease: 'power2.inOut' });
        return;
      }
      l.textContent = pageFor(to)?.label ?? brand.short;
      gsap
        .timeline({
          onComplete() {
            busy.current = false;
            smooth.unlock();
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
        <img src="/brand/logo-light.png" alt="" className="absolute left-1/2 top-[max(1.5rem,6svh)] h-10 w-auto -translate-x-1/2 opacity-80" />
        <span className="block overflow-hidden px-4 pb-[0.15em] text-center font-display text-[clamp(2.5rem,7vw,6rem)] leading-none text-canvas">
          <span ref={label} className="block" />
        </span>
      </div>
      <div ref={ghost} aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[95]">
        <div data-veil="" className="absolute inset-0 bg-canvas" />
        <div data-frame="" className="absolute overflow-hidden bg-night">
          <img alt="" className="absolute left-0 w-full max-w-none object-cover" />
          <div data-shade="" className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-night/40" />
        </div>
      </div>
    </Ctx.Provider>
  );
}
