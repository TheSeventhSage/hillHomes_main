import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { ScrollTrigger } from '@/motion/gsap';
import { usePageMotion } from '@/motion/page';
import { TLink } from '@/motion/transition';
import { portals } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';
import { Card } from '@/components/Card';
import { listings, SAMPLE_NOTE } from '@/listings/data';
import { useSaved } from '@/listings/store';
import { ListingGrid } from '@/listings/ListingCard';

const CHIP =
  'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-200 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas border-ink/15 bg-paper text-ink hover:border-ink/50';

export function Properties() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  const [params, setParams] = useSearchParams();
  const saved = useSaved();
  const type = params.get('type') ?? 'all';
  const items = type === 'saved' ? listings.filter((l) => saved.includes(l.id)) : type === 'all' ? listings : listings.filter((l) => l.portal === type);
  const active = portals.find((p) => p.id === type);

  const choose = (next: string) => {
    const q = new URLSearchParams(params);
    if (next === 'all') q.delete('type');
    else q.set('type', next);
    setParams(q, { replace: true, preventScrollReset: true });
  };

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [type, items.length]);

  return (
    <div ref={root} className="px-[max(1.25rem,3.5vw)] pb-28 pt-36">
      <div className="mx-auto max-w-[96rem]">
        <div className="mb-12 grid gap-8 min-[900px]:grid-cols-[1.4fr_1fr] min-[900px]:items-end">
          <div>
            <p data-fade="" className="m-0 mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-2">
              Listings
            </p>
            <h1 data-lines="" className="m-0 max-w-[12ch] font-display text-[clamp(3rem,8vw,8rem)] font-normal leading-[0.92] tracking-[-0.02em]">
              Find your place.
            </h1>
          </div>
          <p data-fade="" className="m-0 max-w-[44ch] text-base leading-relaxed text-ink-2">
            Homes, apartments, plots, estates and commercial space. Filter by what you are looking for, open any listing for its details, and request a viewing in a minute.
          </p>
        </div>

        <div data-fade="" role="group" aria-label="Filter listings" className="-mx-[max(1.25rem,3.5vw)] mb-4 flex gap-2.5 overflow-x-auto px-[max(1.25rem,3.5vw)] pb-2 [scrollbar-width:none]">
          <button type="button" aria-pressed={type === 'all'} onClick={() => choose('all')} className={CHIP}>
            All <span className="opacity-60">{listings.length}</span>
          </button>
          {portals.map((p) => (
            <button key={p.id} type="button" aria-pressed={type === p.id} onClick={() => choose(p.id)} className={CHIP}>
              {p.kicker} <span className="opacity-60">{listings.filter((l) => l.portal === p.id).length}</span>
            </button>
          ))}
          <button type="button" aria-pressed={type === 'saved'} onClick={() => choose('saved')} className={CHIP}>
            Saved <span className="opacity-60">{saved.length}</span>
          </button>
        </div>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-line pb-5 text-sm text-ink-2">
          <p aria-live="polite" className="m-0">
            {items.length} {items.length === 1 ? 'listing' : 'listings'}
            {active ? ` in ${active.label}` : type === 'saved' ? ' saved' : ''}
          </p>
          {active && (
            <TLink to={active.path} className="inline-flex min-h-11 items-center gap-2 font-medium text-ink no-underline hover:text-gold">
              About {active.label.toLowerCase()} <ArrowIcon width={14} height={14} />
            </TLink>
          )}
        </div>

        {items.length > 0 ? (
          <ListingGrid key={type} items={items} />
        ) : (
          <div className="grid justify-items-start gap-5 rounded-[1.5rem] bg-paper p-10">
            <p className="m-0 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none">Nothing saved yet.</p>
            <p className="m-0 max-w-[40ch] text-base text-ink-2">Tap the heart on any listing to keep it here while you compare.</p>
            <button type="button" onClick={() => choose('all')} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-gold hover:text-ink">
              See all listings <ArrowIcon />
            </button>
          </div>
        )}
        <p className="mb-0 mt-12 max-w-[70ch] text-sm leading-relaxed text-ink-2">{SAMPLE_NOTE}</p>

        <section className="mt-28">
          <h2 data-lines="" className="m-0 mb-10 border-b border-line pb-5 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-none">
            Browse by kind of property
          </h2>
          <div className="grid gap-x-6 gap-y-12 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-5">
            {portals.map((p) => (
              <Card key={p.id} item={{ path: p.path, label: p.label, description: p.summary, image: p.image }} ratio="aspect-[4/5]" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
