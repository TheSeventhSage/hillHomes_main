import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Overlay } from '@/ui/overlay';

interface Ask {
  title: string;
  body: string;
  yes: string;
  no: string;
}

interface State {
  ask: (Ask & { settle: (ok: boolean) => void }) | null;
  last: Ask | null;
  toasts: { id: number; text: string }[];
}

let state: State = { ask: null, last: null, toasts: [] };
const listeners = new Set<() => void>();
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => void listeners.delete(l);
};
const snapshot = () => state;

/** In-app confirm; resolves true when the person agrees. */
export function askConfirm(ask: Ask): Promise<boolean> {
  state.ask?.settle(false);
  return new Promise((resolve) => {
    set({
      last: ask,
      ask: {
        ...ask,
        settle(ok) {
          set({ ask: null });
          resolve(ok);
        },
      },
    });
  });
}

let nextId = 1;
/** A short notice that clears itself after seconds. */
export function toast(text: string) {
  const id = nextId++;
  set({ toasts: [...state.toasts.slice(-2), { id, text }] });
  window.setTimeout(() => set({ toasts: state.toasts.filter((t) => t.id !== id) }), 4000);
}

const BTN = 'inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors duration-200';

export function FeedbackHost() {
  const { ask, last, toasts } = useSyncExternalStore(subscribe, snapshot, snapshot);
  const shown = ask ?? last;
  return (
    <>
      <Overlay
        open={ask !== null}
        onClose={() => ask?.settle(false)}
        label={shown?.title ?? 'Confirm'}
        layer={86}
        blur
        panelClass="glass absolute left-1/2 top-1/2 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-[46%] scale-95 rounded-[1.75rem] p-7 opacity-0 transition-[opacity,scale,translate] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[shown]/ov:-translate-y-1/2 group-data-[shown]/ov:scale-100 group-data-[shown]/ov:opacity-100 motion-reduce:transition-none"
      >
        <h2 className="m-0 font-display text-[2rem] font-normal leading-none text-ink">{shown?.title}</h2>
        <p className="mb-7 mt-3 text-[0.95rem] leading-relaxed text-ink-2">{shown?.body}</p>
        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" data-autofocus="" onClick={() => ask?.settle(false)} className={`${BTN} border border-ink/20 text-ink hover:border-ink`}>
            {shown?.no}
          </button>
          <button type="button" onClick={() => ask?.settle(true)} className={`${BTN} bg-ink text-canvas hover:bg-gold hover:text-ink`}>
            {shown?.yes}
          </button>
        </div>
      </Overlay>
      {createPortal(
        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[88] grid justify-items-center gap-2 px-4">
          {toasts.map((t) => (
            <p key={t.id} className="m-0 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas shadow-[0_18px_40px_-12px_rgb(0_3_13/0.5)] motion-safe:animate-[toast_4s_cubic-bezier(0.32,0.72,0,1)_both]">
              {t.text}
            </p>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
