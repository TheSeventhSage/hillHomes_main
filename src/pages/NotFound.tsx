import { TLink } from '@/motion/transition';
import { ArrowIcon } from '@/components/Icons';

export function NotFound() {
  return (
    <div className="grid min-h-svh content-center gap-8 px-[max(1.25rem,3.5vw)] pt-24">
      <h1 className="m-0 font-display text-[clamp(3rem,9vw,9rem)] font-normal leading-[0.92]">This page does not exist.</h1>
      <TLink to="/" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold text-canvas no-underline hover:bg-gold hover:text-ink">
        Back to the home page <ArrowIcon />
      </TLink>
    </div>
  );
}
