import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { TLink } from '@/motion/transition';
import { PageHero } from '@/components/PageHero';
import { NextLink } from '@/components/NextLink';
import { ArrowIcon } from '@/components/Icons';
import { services, whatsappLink } from '@/data/site';

export function Service({ path }: { path: string }) {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  const index = Math.max(0, services.findIndex((s) => s.path === path));
  const service = services[index];
  const next = services[(index + 1) % services.length];
  if (!service || !next) return null;
  return (
    <div ref={root}>
      <PageHero image={service.image} alt={`${service.label}, representative picture`} kicker={service.label} title={service.title} line={service.description} />
      <section className="px-[max(1.25rem,3.5vw)] py-28">
        <div className="mx-auto grid max-w-[96rem] gap-14 min-[900px]:grid-cols-[1.2fr_1fr]">
          <div>
            <p data-lines="" className="m-0 max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,3.4rem)] leading-[1.08]">
              {service.intro}
            </p>
            <p data-fade="" className="mb-0 mt-10 max-w-[44ch] border-l-2 border-gold pl-5 text-base leading-relaxed text-ink-2">
              {service.who}
            </p>
          </div>
          <div>
            <h2 data-fade="" className="m-0 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-2">
              What is included
            </h2>
            <ul className="m-0 list-none p-0">
              {service.includes.map((it, i) => (
                <li key={it.label} data-fade="" className="grid gap-1 border-t border-line py-6 min-[600px]:grid-cols-[3rem_1fr]">
                  <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <b className="block text-base font-semibold">{it.label}</b>
                    <span className="text-[0.95rem] text-ink-2">{it.note}</span>
                  </span>
                </li>
              ))}
              <li className="border-t border-line" />
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-paper px-[max(1.25rem,3.5vw)] py-24">
        <div className="mx-auto max-w-[96rem]">
          <h2 data-lines="" className="m-0 mb-12 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-none">
            How it works
          </h2>
          <ol className="m-0 grid list-none gap-5 p-0 min-[900px]:grid-cols-3">
            {service.steps.map((st, i) => (
              <li key={st.label} data-fade="" className="grid content-start gap-3 rounded-[1.5rem] bg-canvas p-8">
                <span className="font-display text-[3.2rem] leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
                <b className="font-display text-[1.7rem] font-normal leading-tight">{st.label}</b>
                <span className="text-[0.95rem] leading-relaxed text-ink-2">{st.note}</span>
              </li>
            ))}
          </ol>
          <div data-fade="" className="mt-14 flex flex-wrap items-center gap-4">
            <TLink to="/contact" className="inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold text-canvas no-underline transition-colors duration-200 hover:bg-gold hover:text-ink">
              {service.ask} <ArrowIcon />
            </TLink>
            <a
              href={whatsappLink(`Hello Hills, I would like to ask about ${service.label.toLowerCase()}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-13 items-center gap-3 rounded-full border border-ink/20 px-6 text-sm font-semibold text-ink no-underline transition-colors duration-200 hover:border-ink"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <NextLink to={next.path} image={next.image} label={next.label} />
    </div>
  );
}
