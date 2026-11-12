import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { PageHero } from '@/components/PageHero';
import { NextLink } from '@/components/NextLink';
import { portals } from '@/data/site';

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
      <NextLink to={next.path} image={next.image} label={next.label} />
    </div>
  );
}
