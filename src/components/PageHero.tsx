interface Props {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  line: string;
}

/** Full-width picture with the page title low on the left. */
export function PageHero({ image, alt, kicker, title, line }: Props) {
  return (
    <section data-dark="" className="relative h-[82svh] min-h-[28rem] overflow-hidden bg-night">
      <div data-parallax="" className="absolute inset-0">
        <img src={image} alt={alt} className="absolute left-0 top-[-8%] h-[116%] w-full object-cover" fetchPriority="high" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-night/40" />
      <div className="absolute inset-x-0 bottom-0 grid gap-6 px-[max(1.25rem,3.5vw)] pb-[8svh] text-white min-[900px]:grid-cols-[1fr_auto] min-[900px]:items-end">
        <div>
          <p className="m-0 mb-6 text-sm font-medium">{kicker}</p>
          <h1 data-lines="" className="m-0 max-w-[13ch] font-display text-[clamp(3rem,8vw,8.5rem)] font-normal leading-[1] tracking-[-0.02em]">
            {title}
          </h1>
        </div>
        <p data-fade="" className="m-0 max-w-[22ch] text-base font-medium min-[900px]:text-right">
          {line}
        </p>
      </div>
    </section>
  );
}
