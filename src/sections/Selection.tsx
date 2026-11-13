import { TLink } from '@/motion/transition';
import { allListings, portals, type MenuItem } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';
import { Card } from '@/components/Card';

const cards: MenuItem[] = [...portals.map((p) => ({ path: p.path, label: p.label, description: p.summary, image: p.image })), { ...allListings, image: '/pictures/bedroom.webp' }];

/** The places in an uneven grid: one large picture beside two small, then mirrored. */
export function Selection() {
  const [a, b, c, d, e, f] = cards;
  if (!a || !b || !c || !d || !e || !f) return null;
  return (
    <section className="px-[max(1.25rem,3.5vw)] pb-28 pt-10">
      <div className="mx-auto max-w-[96rem]">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <h2 data-lines="" className="m-0 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-none">
            Find a property
          </h2>
          <TLink data-fade="" to="/properties" className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink no-underline">
            See all listings
            <span data-magnet="" className="grid size-8 place-items-center rounded-full border border-ink/40 transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas">
              <ArrowIcon width={14} height={14} />
            </span>
          </TLink>
        </header>
        <div className="grid gap-x-4 gap-y-14 min-[900px]:grid-cols-2">
          <Card item={a} big ratio="aspect-[16/10]" />
          <div className="grid grid-cols-2 content-end gap-4">
            <Card item={b} />
            <Card item={c} />
          </div>
          <div className="grid grid-cols-2 content-end gap-4">
            <Card item={d} />
            <Card item={e} />
          </div>
          <Card item={f} big notch ratio="aspect-[16/10]" />
        </div>
      </div>
    </section>
  );
}
