import { identity } from '@/data/site';

const WORDS = [...identity.values, ...identity.values];

/** The three values, drifting past in a single quiet line. */
export function Marquee() {
  return (
    <section aria-label={identity.motto} className="overflow-hidden border-y border-line py-[5svh]">
      <div aria-hidden="true" className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center">
            {WORDS.map((w, i) => (
              <span key={`${w}${i}`} className="flex items-center font-display text-[clamp(3rem,9vw,9rem)] leading-none">
                <span className={i % 2 ? 'italic text-gold' : 'text-ink'}>{w}</span>
                <span className="mx-[4vw] block size-2.5 rotate-45 bg-gold" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
