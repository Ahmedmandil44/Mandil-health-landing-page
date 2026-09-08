export function Hero() {
  return (
    <section className="relative overflow-x-clip" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8 lg:pb-20 lg:pt-10">
        <div>
          <p className="kicker">Independent insurance agency</p>
          <h1
            id="hero-title"
            className="display-hero mt-5 text-[clamp(2.5rem,8.4vw,5.6rem)] text-ink"
          >
            Private health coverage,{" "}
            <em className="display-italic text-sea">explained clearly.</em>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            Mandil Health is an independent agency that helps individuals,
            families, and self employed professionals compare private health
            insurance. Whole life and final expense coverage are available as
            separate options. The agency can help in 49 states.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#start"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-ink px-6 text-base font-medium text-cream transition-colors hover:bg-ink-soft"
            >
              Request a review
            </a>
            <a
              href="#health"
              className="inline-flex h-14 items-center justify-center px-2 text-base text-ink underline-offset-[6px] hover:underline"
            >
              See health coverage
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            Licensed advisors, 49 states, no obligation
          </p>
        </div>

        <p className="hidden select-none lg:block" aria-hidden="true">
          <span className="display-hero block text-[10.5rem] leading-[0.8] text-sea">
            49
          </span>
          <span className="mt-2 block text-sm font-semibold tracking-[0.28em] uppercase text-ink">
            states
          </span>
        </p>
      </div>
    </section>
  );
}
