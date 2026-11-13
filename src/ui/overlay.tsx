import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { smooth } from '@/motion/smooth';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const stack: symbol[] = [];

/** Scroll lock, focus trap and Escape for overlays. */
export function useOverlay(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    const id = Symbol('overlay');
    stack.push(id);
    const before = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    smooth.lock();
    const timer = window.setTimeout(() => {
      const el = ref.current;
      (el?.querySelector<HTMLElement>('[data-autofocus]') ?? el)?.focus({ preventScroll: true });
    }, 80);
    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close.current();
        return;
      }
      const el = ref.current;
      if (e.key !== 'Tab' || !el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.getClientRects().length > 0);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        e.preventDefault();
        return;
      }
      const active = document.activeElement;
      if (!el.contains(active) || (!e.shiftKey && active === last)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      const i = stack.indexOf(id);
      if (i >= 0) stack.splice(i, 1);
      smooth.unlock();
      before?.focus({ preventScroll: true });
    };
  }, [open, ref]);
}

function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      const t = window.setTimeout(() => setShown(true), 30);
      return () => window.clearTimeout(t);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), exitMs);
    return () => window.clearTimeout(t);
  }, [open, exitMs]);
  return { mounted, shown };
}

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  layer: number;
  panelClass: string;
  blur?: boolean;
  children: ReactNode;
}

/** A blurred scrim holding one animated dialog panel. */
export function Overlay({ open, onClose, label, layer, panelClass, blur, children }: Props) {
  const { mounted, shown } = usePresence(open, 760);
  const panel = useRef<HTMLDivElement>(null);
  useOverlay(open, panel, onClose);
  if (!mounted) return null;
  return createPortal(
    <div data-shown={shown ? '' : undefined} className="group/ov fixed inset-0" style={{ zIndex: layer }}>
      <div
        onClick={onClose}
        className={`absolute inset-0 opacity-0 ${blur ? 'bg-night/30 backdrop-blur-md' : 'bg-night/55'} transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[shown]/ov:opacity-100 motion-reduce:transition-none`}
      />
      <div ref={panel} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={`outline-none ${panelClass}`}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
