import { useEffect, useRef } from 'react';
import { gsap, motionOk } from '@/motion/gsap';

const lean = gsap.utils.clamp(-12, 12);

/** A small label that follows the pointer over pictures, and arrows that lean toward it. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !motionOk() || !window.matchMedia('(pointer: fine)').matches) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let magnet: HTMLElement | null = null;
    const rest = () => {
      if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
      magnet = null;
    };
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      const label = target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      if (label && el.firstElementChild) el.firstElementChild.textContent = label;
      el.toggleAttribute('data-on', label !== '');
      const next = target?.closest('a, button')?.querySelector<HTMLElement>('[data-magnet]') ?? null;
      if (next !== magnet) rest();
      magnet = next;
      if (!next) return;
      const r = next.getBoundingClientRect();
      const ox = Number(gsap.getProperty(next, 'x'));
      const oy = Number(gsap.getProperty(next, 'y'));
      gsap.to(next, {
        x: lean((e.clientX - (r.left - ox + r.width / 2)) * 0.22),
        y: lean((e.clientY - (r.top - oy + r.height / 2)) * 0.22),
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true,
      });
    };
    const leave = () => {
      el.removeAttribute('data-on');
      rest();
    };
    const press = () => el.removeAttribute('data-on');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, []);

  return (
    <div ref={dot} aria-hidden="true" className="group pointer-events-none fixed left-0 top-0 z-[96] -ml-10 -mt-10 size-20">
      <span className="grid size-full scale-0 place-items-center rounded-full bg-gold text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink transition-[scale] duration-300 ease-out group-data-[on]:scale-100" />
    </div>
  );
}
