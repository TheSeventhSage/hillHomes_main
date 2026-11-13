import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { TLink } from '@/motion/transition';
import { PageHero } from '@/components/PageHero';
import { NextLink } from '@/components/NextLink';
import { ArrowIcon } from '@/components/Icons';
import { portals } from '@/data/site';
import { listingsFor, SAMPLE_NOTE } from '@/listings/data';
import { ListingGrid } from '@/listings/ListingCard';

export function Portal({ id }: { id: string }) {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  const index = Math.max(0, portals.findIndex((p) => p.id === id));
  const portal = portals[index];
  const next = portals[(index + 1) % portals.length];
  if (!portal || !next) return null;
  return (
    <div ref={root}>
      <PageHero image={portal.image} alt={`${portal.label}, representative picture`} kicker={portal.kicker} title={portal.label} line={portal.line} />
      <section className="px-[max(1.25rem,3.5vw)] py-28">
        <div className="mx-auto grid max-w-[96rem] gap-14 min-[900px]:grid-cols-[1.2fr_1fr]">
          <p data-lines="" className="m-0 max-w-[22ch] font-display text-[clamp(1.9rem,3.8vw,3.8rem)] leading-[1.06]">
            {portal.intro}
          </p>
          <div>
            <p data-fade="" className="m-0 mb-10 text-base leading-relaxed text-ink-2">
              {portal.detail}
            </p>
            <ul className="m-0 list-none p-0">
              {portal.points.map((pt, i) => (
                <li key={pt.label} data-fade="" className="grid gap-1 border-t border-line py-6 min-[600px]:grid-cols-[3rem_1fr]">
                  <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <b className="block text-base font-semibold">{pt.label}</b>
                    <span className="text-[0.95rem] text-ink-2">{pt.note}</span>
                  </span>
                </li>
              ))}
              <li className="border-t border-line" />
            </ul>
          </div>
        </div>
      </section>
      <section id="listings" className="bg-paper px-[max(1.25rem,3.5vw)] py-24">
        <div className="mx-auto max-w-[96rem]">
          <header className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-5">
            <h2 data-lines="" className="m-0 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-none">
              {portal.label} to view
            </h2>
            <TLink data-fade="" to="/properties" className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink no-underline">
              All listings
              <span data-magnet="" className="grid size-8 place-items-center rounded-full border border-ink/40 transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas">
                <ArrowIcon width={14} height={14} />
              </span>
            </TLink>
          </header>
          <ListingGrid items={listingsFor(portal.id)} />
          <p className="mb-0 mt-12 max-w-[70ch] text-sm leading-relaxed text-ink-2">{SAMPLE_NOTE}</p>
        </div>
      </section>
      <NextLink to={next.path} image={next.image} label={next.label} />
    </div>
  );
}
