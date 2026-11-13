import { useState } from 'react';
import { ArrowIcon, HeartIcon } from '@/components/Icons';
import { toast } from '@/ui/feedback';
import { kindOf, type Listing } from '@/listings/data';
import { toggleSaved, useListingParam, useSaved } from '@/listings/store';

export function Picture({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [ready, setReady] = useState(false);
  return (
    <span className={`block overflow-hidden ${ready ? '' : 'skeleton motion-safe:animate-shimmer'} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        className={`size-full object-cover transition-[opacity,scale] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  );
}

export function SaveButton({ listing, className = '' }: { listing: Listing; className?: string }) {
  const on = useSaved().includes(listing.id);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${listing.name} from saved` : `Save ${listing.name}`}
      onClick={() => toast(toggleSaved(listing.id) ? `${listing.name} saved to your shortlist` : `${listing.name} removed from your shortlist`)}
      className={`grid size-11 place-items-center rounded-full border border-white/70 bg-white/75 text-ink backdrop-blur-md transition-[background-color,color,scale] duration-300 hover:bg-white active:scale-90 ${className}`}
    >
      <HeartIcon className={on ? 'fill-[#b3263a] text-[#b3263a]' : ''} />
    </button>
  );
}

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const { open } = useListingParam();
  const summary = listing.facts
    .slice(0, 3)
    .map(([k, v]) => `${v} ${k.toLowerCase()}`)
    .join('  ·  ');
  return (
    <li className="relative motion-safe:animate-[rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}>
      <a
        href={`?listing=${listing.id}`}
        data-cursor="Open"
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          open(listing.id);
        }}
        className="group block text-ink no-underline"
      >
        <Picture src={listing.pictures[0] ?? ''} alt={`${listing.name}, representative picture`} className="aspect-[4/3] rounded-[1.25rem]" />
        <span className="mt-4 grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-2">{kindOf(listing)}</span>
          <span className="font-display text-[clamp(1.6rem,2.1vw,2.1rem)] leading-none">{listing.name}</span>
          <span className="text-[0.95rem] text-ink-2">{listing.line}</span>
          <span className="mt-2 flex items-center justify-between gap-4 border-t border-line pt-3 text-sm">
            <span className="text-ink-2">{summary}</span>
            <span className="inline-flex shrink-0 items-center gap-2 font-medium">
              View details
              <ArrowIcon width={14} height={14} className="transition-[translate] duration-500 ease-out group-hover:translate-x-1" />
            </span>
          </span>
        </span>
      </a>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-md">
        Sample listing
      </span>
      <SaveButton listing={listing} className="absolute right-3 top-3" />
    </li>
  );
}

export function ListingGrid({ items }: { items: Listing[] }) {
  return (
    <ul className="m-0 grid list-none gap-x-6 gap-y-12 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
      {items.map((l, i) => (
        <ListingCard key={l.id} listing={l} index={i} />
      ))}
    </ul>
  );
}
