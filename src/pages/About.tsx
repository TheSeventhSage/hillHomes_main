import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { PageHero } from '@/components/PageHero';
import { Values } from '@/sections/Values';
import { identity, offerings } from '@/data/site';

export function About() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  return (
    <div ref={root}>
      <PageHero image="/pictures/house.webp" alt="A Hills residence, representative picture" kicker="About Hills" title="Built to be lived in." line={identity.line} />
      <section className="px-[max(1.25rem,3.5vw)] py-28">
        <div className="mx-auto grid max-w-[96rem] gap-14 min-[900px]:grid-cols-[1.2fr_1fr]">
          <p data-lines="" className="m-0 max-w-[22ch] font-display text-[clamp(1.9rem,3.8vw,3.8rem)] leading-[1.06]">
            Excellent and classy real estate solutions, built around excellence, comfort and class.
          </p>
          <dl className="m-0 grid">
            {[
              ['Company', identity.legalName],
              ['Founded', identity.founded],
              ['Based in', identity.place],
              ['Values', identity.values.join(', ')],
            ].map(([k, v]) => (
              <div key={k} data-fade="" className="grid gap-1 border-t border-line py-5 min-[600px]:grid-cols-[9rem_1fr]">
                <dt className="text-sm text-ink-2">{k}</dt>
                <dd className="m-0 text-base font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="bg-paper px-[max(1.25rem,3.5vw)] py-28">
        <div className="mx-auto max-w-[96rem]">
          <h2 data-lines="" className="m-0 mb-14 font-display text-[clamp(2.2rem,5vw,5rem)] font-normal leading-none">
            What we do
          </h2>
          <ul className="m-0 grid list-none p-0">
            {offerings.map((o, i) => (
              <li key={o.title} data-fade="" className="grid gap-2 border-t border-line py-7 min-[900px]:grid-cols-[4rem_1fr_1fr] min-[900px]:items-baseline">
                <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                <b className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-normal">{o.title}</b>
                <span className="text-[0.95rem] text-ink-2">{o.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Values />
    </div>
  );
}
