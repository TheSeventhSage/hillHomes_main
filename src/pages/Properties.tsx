import { useRef } from 'react';
import { usePageMotion } from '@/motion/page';
import { portals } from '@/data/site';
import { Card } from '@/components/Card';

const SLOTS = [
  { col: 'min-[900px]:col-span-7', ratio: 'aspect-[4/3]' },
  { col: 'min-[900px]:col-span-5 min-[900px]:mt-[10vw]', ratio: 'aspect-[3/4]' },
  { col: 'min-[900px]:col-span-5', ratio: 'aspect-[4/3]' },
  { col: 'min-[900px]:col-span-7 min-[900px]:mt-[6vw]', ratio: 'aspect-[16/10]' },
  { col: 'min-[900px]:col-span-6', ratio: 'aspect-[4/3]' },
];

export function Properties() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  return (
    <div ref={root} className="px-[max(1.25rem,3.5vw)] pb-28 pt-40">
      <div className="mx-auto max-w-[96rem]">
        <p data-fade="" className="m-0 mb-6 text-sm font-medium uppercase tracking-[0.2em] text-ink-2">
          Properties
        </p>
        <h1 data-lines="" className="m-0 mb-20 max-w-[12ch] font-display text-[clamp(3rem,9vw,9rem)] font-normal leading-[0.92] tracking-[-0.02em]">
          Find your place.
        </h1>
        <div className="grid gap-x-6 gap-y-14 min-[900px]:grid-cols-12">
          {portals.map((p, i) => (
            <Card key={p.id} item={{ path: p.path, label: p.label, description: p.line, image: p.image }} big ratio={SLOTS[i]?.ratio} className={SLOTS[i]?.col ?? ''} />
          ))}
        </div>
      </div>
    </div>
  );
}
