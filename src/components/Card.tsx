import { TLink } from '@/motion/transition';
import type { MenuItem } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';

const NOTCH = '[clip-path:polygon(0_0,100%_0,100%_calc(100%-3.2rem),calc(100%-3.2rem)_100%,0_100%)]';

interface Props {
  item: MenuItem;
  ratio?: string;
  big?: boolean;
  notch?: boolean;
  light?: boolean;
  className?: string;
}

/** The one card: a clean picture, a gold hairline, the name and a single line. */
export function Card({ item, ratio = 'aspect-[5/4]', big, notch, light, className = '' }: Props) {
  return (
    <TLink to={item.path} data-cursor="View" className={`group block no-underline ${light ? 'text-canvas' : 'text-ink'} ${className}`}>
      <div className={notch ? NOTCH : ''}>
        <div data-clip="" className={`relative overflow-hidden rounded-[1.1rem] ${light ? 'bg-canvas/10' : 'bg-ink/10'} ${ratio}`}>
          <img
            data-grow=""
            src={item.image}
            alt={`${item.label}, representative picture`}
            className="absolute inset-0 size-full object-cover transition-[scale] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </div>
      </div>
      <span data-fade="" className="mt-4 flex items-start justify-between gap-4 border-t border-gold/60 pt-3">
        <span className="grid gap-1">
          <span className={`font-display leading-none ${big ? 'text-[clamp(1.7rem,2.4vw,2.4rem)]' : 'text-[clamp(1.4rem,1.8vw,1.8rem)]'}`}>{item.label}</span>
          <span className={`text-sm ${light ? 'text-canvas/70' : 'text-ink-2'}`}>{item.description}</span>
        </span>
        <span data-magnet="" className="mt-1 shrink-0 text-gold transition-[translate] duration-500 ease-out group-hover:translate-x-1.5">
          <ArrowIcon />
        </span>
      </span>
    </TLink>
  );
}
