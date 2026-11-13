import { smooth } from '@/motion/smooth';
import { TLink } from '@/motion/transition';
import { company, identity, menu, portals } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';

const PHONE = company.phone.replace(/\s/g, '');
const LINK = 'text-canvas no-underline transition-colors duration-200 hover:text-gold';
const HEAD = 'm-0 mb-3 text-xs font-medium text-canvas/60';
const BIG = 'block font-display text-[clamp(1.9rem,min(4.2vw,6.6svh),4.4rem)] leading-[1.08] text-canvas no-underline transition-colors duration-300 hover:text-gold';

/** The page lifts away to uncover a picture with the main links, then the small print. */
export function Footer() {
  return (
    <footer className="bg-night text-canvas pinned:sticky pinned:bottom-0 pinned:z-0 pinned:h-svh">
      <div className="pinned:flex pinned:h-full pinned:flex-col">
        <div className="relative min-h-[80svh] overflow-hidden px-[max(1.25rem,3.5vw)] pb-16 pt-28 pinned:min-h-0 pinned:flex-1">
          <img src="/pictures/interior.webp" alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-night/70" />
          <div className="relative mx-auto grid max-w-[96rem] gap-12 min-[900px]:grid-cols-[1.3fr_1fr_auto]">
            <nav aria-label="Find a property">
              <p className={HEAD}>Find a property</p>
              {portals.map((p) => (
                <TLink key={p.path} to={p.path} className={BIG}>
                  {p.kicker}
                </TLink>
              ))}
            </nav>
            <nav aria-label="The company">
              <p className={HEAD}>The company</p>
              <TLink to="/properties" className={BIG}>
                All listings
              </TLink>
              <TLink to="/gallery" className={BIG}>
                Gallery
              </TLink>
              <TLink to="/about" className={BIG}>
                About Hills
              </TLink>
            </nav>
            <TLink
              to="/contact"
              className="inline-flex min-h-12 items-center gap-3 self-start rounded-full border border-canvas/50 px-6 text-sm text-canvas no-underline transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Book a viewing or ask a question <ArrowIcon />
            </TLink>
          </div>
        </div>
        <div className="px-[max(1.25rem,3.5vw)] pb-4 pt-8">
          <div className="mx-auto max-w-[96rem] text-sm text-canvas/75">
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-canvas/15 pb-6">
              <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
                {menu.map((m) => (
                  <TLink key={m.path} to={m.path} className={LINK}>
                    {m.label}
                  </TLink>
                ))}
              </nav>
              <img src="/brand/logo-light.png" alt="Hills Apartments and Homes" className="h-14 w-auto" />
            </div>
            <div className="grid gap-8 border-b border-canvas/15 py-6 min-[900px]:grid-cols-[1fr_1fr_auto]">
              <div className="grid content-start gap-1">
                <b className="font-medium text-canvas">Abuja</b>
                <span className="max-w-[28ch]">{company.address}</span>
                <span>{company.hours}</span>
              </div>
              <div className="grid content-start gap-1">
                <b className="font-medium text-canvas">Talk</b>
                <a className={LINK} href={`tel:${PHONE}`}>
                  {company.phone}
                </a>
                <a className={LINK} href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <a className={LINK} href={company.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
              <div className="flex gap-5 self-start">
                {company.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={`${LINK} underline underline-offset-4`}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-canvas/55">
              <span>
                {identity.legalName}. {identity.line}
              </span>
              <button type="button" onClick={() => smooth.to(0)} className="inline-flex min-h-11 items-center gap-2 text-canvas transition-colors duration-200 hover:text-gold">
                Back to top <ArrowIcon width={12} height={12} className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
