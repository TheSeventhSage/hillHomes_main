import Lenis from 'lenis';
import { gsap, ScrollTrigger, motionOk } from '@/motion/gsap';

let lenis: Lenis | null = null;
let locks = 0;

/** Smooth scroll for capable devices; native scroll otherwise. */
export function startSmooth(): () => void {
  if (!motionOk()) return () => {};
  const instance = new Lenis({ lerp: 0.1 });
  lenis = instance;
  instance.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => instance.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}

export const smooth = {
  to(target: number | HTMLElement) {
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else if (typeof target === 'number') window.scrollTo({ top: target });
    else target.scrollIntoView();
  },
  top() {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  },
  stop: () => lenis?.stop(),
  start: () => {
    if (locks === 0) lenis?.start();
  },
  lock() {
    locks += 1;
    document.documentElement.toggleAttribute('data-locked', true);
    lenis?.stop();
  },
  unlock() {
    locks = Math.max(0, locks - 1);
    if (locks > 0) return;
    document.documentElement.removeAttribute('data-locked');
    lenis?.start();
  },
};
