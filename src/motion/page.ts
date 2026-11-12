import type { RefObject } from 'react';
import { gsap, SplitText } from '@/motion/gsap';
import { useMotion } from '@/motion/useMotion';

/** Reads data-lines, data-fade, data-clip and data-parallax inside a page and animates them on scroll. */
export function usePageMotion(scope: RefObject<HTMLElement | null>) {
  useMotion(scope, () => {
    const root = scope.current;
    if (!root) return;
    const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

    all('[data-lines]').forEach((el) => {
      let shown = false;
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          if (shown) return;
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            delay: Number(el.dataset.delay ?? 0),
            onComplete: () => void (shown = true),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        },
      });
    });

    all('[data-fade]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 36, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    all('[data-clip]').forEach((el) => {
      const img = el.querySelector('img');
      const trigger = { trigger: el, start: 'top 88%', once: true };
      gsap.fromTo(el, { clipPath: 'inset(14% 10% 14% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: trigger });
      if (img) gsap.from(img, { scale: 1.3, duration: 1.8, ease: 'expo.out', scrollTrigger: trigger });
    });

    all('[data-parallax]').forEach((el) => {
      const img = el.querySelector('img');
      if (!img) return;
      gsap.fromTo(img, { yPercent: -6.5 }, { yPercent: 6.5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
}
