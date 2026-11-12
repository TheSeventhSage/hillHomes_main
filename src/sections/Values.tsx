import { identity } from '@/data/site';

const ROWS = [
  { label: 'Vision', text: identity.vision },
  { label: 'Mission', text: identity.mission },
  { label: 'Motto', text: identity.motto },
] as const;

/** Vision, mission and motto on a dark band. */
export function Values() {
  return (
    <section data-dark="" className="bg-night px-[max(1.25rem,3.5vw)] py-28 text-canvas">
      <div className="mx-auto max-w-[96rem]">
        {ROWS.map((r) => (
          <div key={r.label} className="grid gap-4 border-t border-canvas/20 py-10 min-[900px]:grid-cols-[14rem_1fr] min-[900px]:gap-10">
            <p data-fade="" className="m-0 text-sm font-medium uppercase tracking-[0.2em] text-gold">
              {r.label}
            </p>
            <p data-lines="" className="m-0 max-w-[24ch] font-display text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.04]">
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
