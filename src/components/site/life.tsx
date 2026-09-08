import { useReveal } from "@/hooks/use-reveal";

export function Life() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="life"
      className="reveal scroll-mt-24 bg-ink text-cream"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="kicker text-mist">Also offered</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)] text-cream">
          Life insurance, kept in its own lane.
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist">
          Whole life and final expense are separate products from health
          coverage. They are reviewed as their own conversation, with their
          own rules, underwriting, and purpose.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article className="border border-cream/15 bg-ink-soft p-8 sm:p-10">
            <p className="kicker text-mist">Whole life</p>
            <h3 className="display mt-4 text-3xl text-cream">
              Coverage meant to last.
            </h3>
            <p className="mt-4 leading-relaxed text-mist">
              Whole life may be worth exploring if the goal is long term
              protection for loved ones, not a short term policy. A licensed
              advisor can explain what the policy is designed to do, what it
              is not designed to do, and whether it fits the budget.
            </p>
            <p className="mt-6 text-sm text-mist/80">
              Availability and fit vary by age, health, and coverage amount.
            </p>
          </article>
          <article className="border border-cream/15 bg-ink-soft p-8 sm:p-10">
            <p className="kicker text-mist">Final expense</p>
            <h3 className="display mt-4 text-3xl text-cream">
              Help with funeral costs.
            </h3>
            <p className="mt-4 leading-relaxed text-mist">
              Final expense insurance is a simpler life policy meant to help
              with funeral and related costs. It is a different product from
              whole life, and from health insurance. The agency treats it as
              its own decision.
            </p>
            <p className="mt-6 text-sm text-mist/80">
              Eligibility, amounts, and rates vary by carrier and applicant.
            </p>
          </article>
        </div>

        <a
          href="#start"
          className="mt-10 inline-flex text-sm font-medium text-cream underline-offset-4 hover:underline"
        >
          Request a life insurance review
        </a>
      </div>
    </section>
  );
}
