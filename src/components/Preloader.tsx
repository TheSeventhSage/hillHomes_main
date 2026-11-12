import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, motionOk } from '@/motion/gsap';
import { gate } from '@/motion/gate';
import { smooth } from '@/motion/smooth';
import { hero, preloaderImages } from '@/data/site';

const HALF_X = 92;
const HALF_Y = 44;
const FULL = 'inset(0px 0px 0px 0px)';
const small = () => {
  const y = Math.round(window.innerHeight / 2 - HALF_Y);
  const x = Math.round(window.innerWidth / 2 - HALF_X);
  return `inset(${y}px ${x}px ${y}px ${x}px)`;
};

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

function assetsReady() {
  const pictures = preloaderImages.map((src) => {
    const img = new Image();
    img.src = src;
    return img.decode().catch(() => {});
  });
  return Promise.all([document.fonts.ready, ...pictures]);
}

/** A small mark in the dark, then pictures open out of it until the last one is the hero. */
export function Preloader() {
  const [gone, setGone] = useState(() => !motionOk());
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gone) gate.release();
  }, [gone]);

  useLayoutEffect(() => {
    const el = root.current;
    if (gone || !el) return;
    smooth.stop();
    const mark = el.querySelector('[data-mark]');
    const ring = el.querySelector('[data-ring]');
    const shade = el.querySelector('[data-shade]');
    const lines = el.querySelectorAll('[data-line]');
    const frames = gsap.utils.toArray<HTMLElement>('[data-frame]', el);
    gsap.set(lines, { yPercent: 110 });
    const intro = gsap.timeline();
    intro
      .fromTo(mark, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.15 })
      .fromTo(ring, { scaleX: 0 }, { scaleX: 0.7, duration: 1.3, ease: 'power2.inOut' }, 0.2);
    let alive = true;
    void Promise.all([wait(1500), assetsReady()]).then(() => {
      if (!alive) return;
      const tl = gsap.timeline({
        onComplete() {
          smooth.start();
          setGone(true);
        },
      });
      gate.release();
      tl.to(ring, { scaleX: 1, duration: 0.5, ease: 'power2.out' });
      frames.forEach((frame, i) => {
        const img = frame.querySelector('img');
        const at = 0.5 + i * 0.85;
        tl.set(frame, { visibility: 'visible' }, at)
          .fromTo(frame, { clipPath: small() }, { clipPath: FULL, duration: 2.3, ease: 'sine.inOut' }, at)
          .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.5, ease: 'sine.inOut' }, at);
      });
      const end = 0.5 + (frames.length - 1) * 0.85 + 2.3;
      tl.to(mark, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, end - 1.3)
        .to(shade, { opacity: 1, duration: 1.2, ease: 'power1.inOut' }, end - 1.5)
        .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.14 }, end - 1.1)
        .to(el, { opacity: 0, duration: 1.3, ease: 'power2.inOut' }, end + 0.45);
    });
    return () => {
      alive = false;
      intro.kill();
    };
  }, [gone]);

  if (gone) return null;
  return (
    <div ref={root} role="status" aria-label="Loading" className="fixed inset-0 z-[100] overflow-hidden bg-night">
      {preloaderImages.map((src) => (
        <div key={src} data-frame="" className="invisible absolute inset-0 overflow-hidden">
          <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      ))}
      <div data-shade="" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-night/55 opacity-0" />
      <p aria-hidden="true" className="absolute inset-x-0 bottom-0 m-0 px-[max(1.25rem,3.5vw)] pb-[7svh] font-display text-[clamp(3.4rem,8.4vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-white">
        {hero.lines.map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.08em]">
            <span data-line="" className={`block ${i === hero.lines.length - 1 ? 'italic' : ''}`}>
              {l}
            </span>
          </span>
        ))}
      </p>
      <div data-mark="" aria-hidden="true" className="absolute left-1/2 top-1/2 grid w-[11.5rem] -translate-x-1/2 -translate-y-1/2 gap-3 opacity-0">
        <img src="/brand/logo-light.png" alt="" className="w-full" />
        <span className="block h-px bg-canvas/20">
          <span data-ring="" className="block h-px origin-left bg-gold" />
        </span>
      </div>
    </div>
  );
}
