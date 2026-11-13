import { useCallback, useSyncExternalStore } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

const SAVED_KEY = 'hills.saved';
const VIEWINGS_KEY = 'hills.viewings';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

const initial = read<unknown>(SAVED_KEY, []);
let saved: string[] = Array.isArray(initial) ? initial.filter((x): x is string => typeof x === 'string') : [];
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => void listeners.delete(l);
};
const snapshot = () => saved;

/** Returns true when the listing ends up saved. */
export function toggleSaved(id: string): boolean {
  const on = !saved.includes(id);
  saved = on ? [...saved, id] : saved.filter((x) => x !== id);
  write(SAVED_KEY, saved);
  listeners.forEach((l) => l());
  return on;
}

export const useSaved = () => useSyncExternalStore(subscribe, snapshot, snapshot);

export interface Viewing {
  reference: string;
  listing: string;
  mode: string;
  when: string;
  name: string;
  phone: string;
  email: string;
  note: string;
}

export function recordViewing(v: Omit<Viewing, 'reference'>): Viewing {
  const reference = `HV-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const viewing = { ...v, reference };
  const all = read<unknown>(VIEWINGS_KEY, []);
  write(VIEWINGS_KEY, [...(Array.isArray(all) ? all : []), { ...viewing, at: new Date().toISOString() }]);
  return viewing;
}

/** The open listing lives in the address bar. */
export function useListingParam() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const id = params.get('listing');
  const inApp = (location.state as { listing?: boolean } | null)?.listing === true;

  const open = useCallback(
    (next: string) => {
      const q = new URLSearchParams(window.location.search);
      q.set('listing', next);
      navigate({ search: `?${q.toString()}` }, { state: { listing: true }, preventScrollReset: true });
    },
    [navigate],
  );

  const close = useCallback(() => {
    if (inApp) {
      navigate(-1);
      return;
    }
    const q = new URLSearchParams(window.location.search);
    q.delete('listing');
    const search = q.toString();
    navigate({ search: search ? `?${search}` : '' }, { replace: true, preventScrollReset: true });
  }, [inApp, navigate]);

  return { id, open, close };
}
