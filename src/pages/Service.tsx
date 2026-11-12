import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { TLink } from '@/motion/transition';
import { PageHero } from '@/components/PageHero';
import { NextLink } from '@/components/NextLink';
import { ArrowIcon } from '@/components/Icons';
import { services } from '@/data/site';

export function Service({ path }: { path: string }) {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  const index = Math.max(0, services.findIndex((s) => s.path === path));
  const service = services[index];
  const next = services[(index + 1) % services.length];
  if (!service || !next) return null;
  return (
    <div ref={root}>
      <PageHero image={service.image} alt={`${service.label}, representative picture`} kicker="Services" title={service.label} line={service.description} />
      <section className="px-[max(1.25rem,3.5vw)] py-28">
        <div className="mx-auto grid max-w-[96rem] gap-10 min-[900px]:grid-cols-[1.2fr_1fr]">
          <p data-lines="" className="m-0 max-w-[20ch] font-display text-[clamp(1.9rem,3.8vw,3.8rem)] leading-[1.06]">
            This page is being prepared.
          </p>
          <div className="grid content-start gap-8">
            <p data-fade="" className="m-0 text-base leading-relaxed text-ink-2">
              Speak to an adviser in the meantime and ask about {service.label.toLowerCase()}.
            </p>
            <TLink data-fade="" to="/contact" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold text-canvas no-underline transition-colors duration-200 hover:bg-gold hover:text-ink">
              Contact Hills <ArrowIcon />
            </TLink>
          </div>
        </div>
      </section>
      <NextLink to={next.path} image={next.image} label={next.label} />
    </div>
  );
}
