import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap } from '@/motion/gsap';
import { whenOpen } from '@/motion/gate';

export interface Env {
  /** Motion allowed and a wide screen: pinned sequences may run */
  pinned: boolean;
}

/** Runs build once the page is uncovered, only when motion is allowed, and reverts it on leave. */
export function useMotion(scope: RefObject<HTMLElement | null>, build: (env: Env) => void) {
  const latest = useRef(build);
  latest.current = build;
  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | undefined;
    const stop = whenOpen(() => {
      mm = gsap.matchMedia(scope.current ?? undefined);
      mm.add({ ok: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 900px)' }, (ctx) => {
        const c = ctx.conditions as { ok: boolean; wide: boolean };
        if (c.ok) latest.current({ pinned: c.wide });
      });
    });
    return () => {
      stop();
      mm?.revert();
    };
  }, [scope]);
}
