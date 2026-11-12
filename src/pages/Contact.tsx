import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { company } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';

const LINK = 'text-ink no-underline underline-offset-4 hover:underline';

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  return (
    <div ref={root} className="px-[max(1.25rem,3.5vw)] pb-28 pt-40">
      <div className="mx-auto max-w-[96rem]">
        <p data-fade="" className="m-0 mb-6 text-sm font-medium uppercase tracking-[0.2em] text-ink-2">
          Contact
        </p>
        <h1 data-lines="" className="m-0 mb-20 max-w-[12ch] font-display text-[clamp(3rem,9vw,9rem)] font-normal leading-[0.92] tracking-[-0.02em]">
          Let us talk.
        </h1>
        <div className="grid gap-14 min-[900px]:grid-cols-[1fr_1fr]">
          <div data-clip="" className="relative aspect-[4/5] overflow-hidden bg-ink/10">
            <img src="/pictures/entrance.webp" alt="A Hills entrance, representative picture" className="absolute inset-0 size-full object-cover" />
          </div>
          <dl className="m-0 grid content-start">
            {[
              ['Visit', <>{company.address}</>],
              ['Hours', <>{company.hours}</>],
              ['Phone', <a className={LINK} href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>],
              ['Email', <a className={LINK} href={`mailto:${company.email}`}>{company.email}</a>],
            ].map(([k, v]) => (
              <div key={String(k)} data-fade="" className="grid gap-1 border-t border-line py-6 min-[600px]:grid-cols-[7rem_1fr]">
                <dt className="text-sm text-ink-2">{k}</dt>
                <dd className="m-0 font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight">{v}</dd>
              </div>
            ))}
            <div data-fade="" className="flex flex-wrap items-center gap-6 border-t border-line pt-8">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold text-canvas no-underline transition-colors duration-200 hover:bg-gold hover:text-ink"
              >
                Message on WhatsApp <ArrowIcon />
              </a>
              {company.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
                  {s.label}
                </a>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
