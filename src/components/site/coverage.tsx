import { useReveal } from "@/hooks/use-reveal";

export function Health() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="health"
      className="reveal scroll-mt-24 border-b border-line bg-cream"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="kicker">Primary focus</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <h2 className="display text-[clamp(2rem,4.4vw,3.6rem)] text-ink">
            Private health insurance for people buying coverage on their own.
          </h2>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-muted">
            Mandil Health is first a health insurance agency. Licensed
            advisors help compare private individual and family coverage
            outside a traditional employer plan, in 49 states.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-3">
          {[
            {
              t: "Self employed and 1099",
              b: "No benefits packet from an employer. The agency can walk through private options that may be available in your state.",
            },
            {
              t: "Individuals and families",
              b: "One person or several. Networks, prescriptions, pediatric care, and budget all change the picture.",
            },
            {
              t: "Between jobs or shopping again",
              b: "Coverage lapsed, a deadline is coming, or the current plan simply costs too much. A review can help sort the next step.",
            },
          ].map((item) => (
            <article key={item.t} className="bg-cream px-0 py-8 sm:px-8 sm:py-10">
              <h3 className="display text-2xl text-ink">{item.t}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">{item.b}</p>
            </article>
          ))}
        </div>

        <aside className="mt-16 border border-line bg-paper px-5 py-8 sm:px-10 sm:py-10">
          <p className="kicker">United States, 2026</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-14">
            <p>
              <span className="display-hero block text-[clamp(4.2rem,12vw,6.5rem)] leading-none text-ink">
                $611
              </span>
              <span className="mt-2 block text-sm text-muted">
                a month, national average
              </span>
            </p>
            <div className="max-w-xl">
              <h3 className="display text-2xl text-ink sm:text-3xl">
                Marketplace Silver, full price, before subsidies.
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                That is the 2026 national average for the lowest cost
                Marketplace Silver plan for a 40 year old, before any tax
                credit. If you do not get a subsidy, that full price is often
                the starting point. Private coverage is a separate comparison,
                with different rules, networks, and underwriting.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Source: KFF State Health Facts, 2026. Actual premiums vary by
                state, county, age, tobacco use, and plan. Subsidies can lower
                Marketplace prices substantially. Private plans are not
                equivalent to Marketplace plans. Mandil Health can help in 49
                states.
              </p>
            </div>
          </div>
        </aside>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
          Coverage availability, eligibility, underwriting, benefits, and
          rates vary by state, carrier, product, and individual
          circumstances. A review is how you find out what actually applies,
          not a guarantee of any particular plan.
        </p>
        <a
          href="#start"
          className="mt-6 inline-flex text-sm font-medium text-sea underline-offset-4 hover:underline"
        >
          Request a health coverage review
        </a>
      </div>
    </section>
  );
}
