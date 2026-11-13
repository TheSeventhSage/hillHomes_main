import { TLink } from '@/motion/transition';
import { ArrowIcon } from '@/components/Icons';

/** A wide picture strip that leads to the next page. */
export function NextLink({ to, image, label }: { to: string; image: string; label: string }) {
  return (
    <TLink to={to} data-dark="" data-cursor="Next" className="group relative block h-[56svh] min-h-[22rem] overflow-hidden bg-night text-white no-underline">
      <img data-grow="dim" src={image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
      <span className="absolute inset-0 bg-night/45" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-[max(1.25rem,3.5vw)] pb-[7svh]">
        <span className="grid gap-3">
          <span className="text-sm font-medium">Next</span>
          <span className="font-display text-[clamp(2.6rem,7vw,7rem)] leading-none">{label}</span>
        </span>
        <span data-magnet="" className="grid size-14 shrink-0 place-items-center rounded-full border border-white/70 transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
          <ArrowIcon />
        </span>
      </span>
    </TLink>
  );
}
