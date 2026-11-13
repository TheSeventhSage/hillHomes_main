import { ScrollTrigger } from '@/motion/gsap';

let open = false;
const waiters = new Set<() => void>();

/** Pages build their motion only once the cover has lifted. */
export const gate = {
  close() {
    open = false;
  },
  release() {
    open = true;
    const run = [...waiters];
    waiters.clear();
    run.forEach((fn) => fn());
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  },
};

export function whenOpen(fn: () => void): () => void {
  if (open) {
    fn();
    return () => {};
  }
  waiters.add(fn);
  return () => void waiters.delete(fn);
}

let shown = false;
const viewers = new Set<() => void>();

/** Fires once the first screen is actually visible. */
export const reveal = {
  done() {
    shown = true;
    const run = [...viewers];
    viewers.clear();
    run.forEach((fn) => fn());
  },
  then(fn: () => void): () => void {
    if (shown) {
      fn();
      return () => {};
    }
    viewers.add(fn);
    return () => void viewers.delete(fn);
  },
};
