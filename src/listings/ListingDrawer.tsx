import { useRef, useState, type RefObject } from 'react';
import { whatsappLink } from '@/data/site';
import { ArrowIcon, CheckIcon, CloseIcon } from '@/components/Icons';
import { Overlay } from '@/ui/overlay';
import { askConfirm } from '@/ui/feedback';
import { kindOf, listingById, SAMPLE_NOTE, type Listing } from '@/listings/data';
import { useListingParam } from '@/listings/store';
import { Picture, SaveButton } from '@/listings/ListingCard';
import { Checkout, PRIMARY, QUIET } from '@/listings/Checkout';

const PLAN: Record<Listing['plan'], string> = { signature: '/plans/signature.webp', residence: '/plans/residence.webp', apartment: '/plans/apartment.webp', plot: '' };
const CELLS = [
  [18, 22],
  [104, 22],
  [190, 22],
  [18, 118],
  [104, 118],
  [190, 118],
] as const;
const NEXT = [
  { label: 'Request a time', note: 'Pick a day and a time that suit you.' },
  { label: 'An adviser confirms', note: 'The team checks the slot and replies.' },
  { label: 'See it properly', note: 'In person, or live on a video call.' },
];
const H3 = 'm-0 mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-2';

function PlotPlan({ plot }: { plot: number }) {
  return (
    <svg viewBox="0 0 290 190" role="img" aria-label={`Schematic site plan with plot ${String.fromCharCode(64 + plot)} highlighted`} className="block w-full rounded-2xl">
      <rect width="290" height="190" className="fill-canvas" />
      <path d="M0 96H290" className="stroke-white" strokeWidth="26" />
      <path d="M0 96H290" className="stroke-ink/25" strokeWidth="1" strokeDasharray="8 7" />
      {CELLS.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="78" height="54" rx="4" className={i + 1 === plot ? 'fill-gold stroke-ink' : 'fill-white/70 stroke-ink/25'} strokeWidth="1" />
          <text x={x + 39} y={y + 32} textAnchor="middle" className="fill-ink text-[13px] font-medium">
            {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Gallery({ listing, active, pick, className }: { listing: Listing; active: number; pick: (i: number) => void; className: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="group absolute inset-0 overflow-hidden rounded-[1.5rem] bg-ink/5">
        {listing.pictures.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === active ? `${listing.name}, representative picture ${i + 1}` : ''}
            className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
          />
        ))}
      </div>
      <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-md">Sample listing</span>
      {listing.pictures.length > 1 && (
        <div role="group" aria-label="Pictures" className="absolute inset-x-4 bottom-4 flex gap-2 rounded-[1.1rem] border border-white/60 bg-white/55 p-2 backdrop-blur-xl">
          {listing.pictures.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Picture ${i + 1} of ${listing.pictures.length}`}
              aria-pressed={i === active}
              onClick={() => pick(i)}
              className={`relative h-14 flex-1 overflow-hidden rounded-xl transition-[opacity,box-shadow] duration-300 min-[900px]:h-[4.5rem] ${i === active ? 'opacity-100 shadow-[0_0_0_2px_var(--color-ink)]' : 'opacity-65 hover:opacity-100'}`}
            >
              <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({ listing }: { listing: Listing }) {
  return (
    <div className="grid gap-10">
      <div>
        <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-2">{kindOf(listing)}</p>
        <h2 className="m-0 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.01em]">{listing.name}</h2>
        <p className="mb-0 mt-4 max-w-[48ch] text-[1.05rem] leading-relaxed text-ink-2">{listing.about}</p>
      </div>
      <dl className="m-0 grid grid-cols-2 gap-3 min-[1200px]:grid-cols-4">
        {listing.facts.map(([k, v]) => (
          <div key={k} className="glass-tile grid gap-1 rounded-2xl p-4">
            <dt className="text-xs text-ink-2">{k}</dt>
            <dd className="m-0 font-display text-[1.45rem] leading-tight">{v}</dd>
          </div>
        ))}
      </dl>
      <section>
        <h3 className={H3}>Features</h3>
        <ul className="m-0 grid list-none gap-x-6 gap-y-3 p-0 min-[520px]:grid-cols-2">
          {listing.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-base">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-gold">
                <CheckIcon width={12} height={12} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className={H3}>{listing.plan === 'plot' ? 'Site plan' : 'Plan'}</h3>
        <figure className="glass-tile m-0 rounded-3xl p-4">
          {listing.plan === 'plot' ? <PlotPlan plot={listing.plot ?? 1} /> : <Picture src={PLAN[listing.plan]} alt={`Illustrative plan for ${listing.name}`} className="aspect-[16/10] rounded-2xl bg-white" />}
          <figcaption className="mt-3 text-xs text-ink-2">Illustrative drawing, not to scale.</figcaption>
        </figure>
      </section>
      <section>
        <h3 className={H3}>What happens next</h3>
        <ol className="m-0 grid list-none gap-3 p-0 min-[1200px]:grid-cols-3">
          {NEXT.map((n, i) => (
            <li key={n.label} className="glass-tile grid gap-1 rounded-2xl p-4">
              <span className="font-display text-2xl leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
              <b className="mt-2 text-[0.95rem] font-semibold">{n.label}</b>
              <span className="text-sm text-ink-2">{n.note}</span>
            </li>
          ))}
        </ol>
      </section>
      <p className="m-0 rounded-2xl bg-ink/5 p-4 text-sm leading-relaxed text-ink-2">{SAMPLE_NOTE}</p>
    </div>
  );
}

function Body({ listing, dirty, onClose }: { listing: Listing; dirty: RefObject<boolean>; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const [booking, setBooking] = useState(false);
  const leave = () => {
    dirty.current = false;
    setBooking(false);
  };
  return (
    <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <span aria-hidden="true" className="absolute left-1/2 top-2.5 z-10 h-1 w-11 -translate-x-1/2 rounded-full bg-ink/20" />
      <Gallery listing={listing} active={active} pick={setActive} className="m-6 mr-0 hidden min-[900px]:row-span-2 min-[900px]:block" />
      <div data-drawer-scroll="" data-lenis-prevent="" className="overflow-y-auto overscroll-contain [scrollbar-width:thin]">
        {!booking && <Gallery listing={listing} active={active} pick={setActive} className="mx-3 mt-7 h-[40svh] min-h-[16rem] min-[900px]:hidden" />}
        <div className="mx-auto max-w-[44rem] px-5 pb-10 pt-8 min-[900px]:px-[max(2rem,3.2vw)] min-[900px]:pt-20">
          <div key={booking ? 'book' : 'detail'} className="motion-safe:animate-[rise_0.7s_cubic-bezier(0.32,0.72,0,1)_both]">
            {booking ? <Checkout listing={listing} dirty={dirty} onBack={leave} onDone={leave} /> : <Detail listing={listing} />}
          </div>
        </div>
      </div>
      {!booking && (
        <div className="flex items-center gap-2.5 border-t border-line bg-white/55 px-4 py-4 backdrop-blur-xl min-[900px]:px-[max(2rem,3.2vw)]">
          <button type="button" data-autofocus="" onClick={() => setBooking(true)} className={`${PRIMARY} flex-1 whitespace-nowrap max-[519px]:px-5 min-[520px]:flex-none`}>
            Book a viewing <ArrowIcon />
          </button>
          <a href={whatsappLink(`Hello Hills, I would like to know more about ${listing.name}.`)} target="_blank" rel="noreferrer" className={`${QUIET} whitespace-nowrap max-[519px]:px-5 min-[520px]:flex-none`}>
            <span>
              <span className="hidden min-[520px]:inline">Ask on </span>WhatsApp
            </span>
          </a>
          <SaveButton listing={listing} className="ml-auto border-ink/15" />
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close listing"
        className="absolute right-4 top-9 z-10 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/70 bg-white/80 px-4 text-sm font-medium text-ink backdrop-blur-md transition-colors duration-200 hover:bg-ink hover:text-canvas min-[900px]:right-6 min-[900px]:top-7"
      >
        Close <CloseIcon width={13} height={13} />
      </button>
    </div>
  );
}

/** One listing in a full-page glass sheet. */
export function ListingDrawer() {
  const { id, close } = useListingParam();
  const listing = listingById(id);
  const last = useRef<Listing | null>(null);
  if (listing) last.current = listing;
  const shown = listing ?? last.current;
  const dirty = useRef(false);

  const requestClose = () => {
    if (!dirty.current) {
      close();
      return;
    }
    void askConfirm({
      title: 'Leave this booking?',
      body: 'The day, time and details you entered will be cleared.',
      yes: 'Leave',
      no: 'Keep booking',
    }).then((ok) => {
      if (!ok) return;
      dirty.current = false;
      close();
    });
  };

  return (
    <Overlay
      open={listing !== null}
      onClose={requestClose}
      label={shown?.name ?? 'Listing'}
      layer={80}
      panelClass="glass absolute inset-x-0 bottom-0 h-[92svh] translate-y-full overflow-hidden rounded-t-[2rem] border-b-0 text-ink transition-[translate] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-data-[shown]/ov:translate-y-0 motion-reduce:transition-none"
    >
      {shown && <Body key={shown.id} listing={shown} dirty={dirty} onClose={requestClose} />}
    </Overlay>
  );
}
