import { useReveal } from "@/hooks/use-reveal";

const SITUATIONS = [
  {
    n: "01",
    quote: "I work for myself.",
    body: "Self employed, 1099, or running a small business, and there is no HR portal waiting with a tidy benefits packet.",
  },
  {
    n: "02",
    quote: "I need to cover my family.",
    body: "Premiums, networks, prescriptions, and more than one person to think about. The agency helps compare plans that may actually fit, not just plans that exist.",
  },
  {
    n: "03",
    quote: "This costs too much.",
    body: "Current coverage feels expensive. Mandil Health can help you understand whether other private health options are worth comparing, without a hard sell.",
  },
  {
    n: "04",
    quote: "I do not have employer coverage.",
    body: "A job change, a new business, or a gap where benefits used to be. Private individual and family health coverage may be worth looking at, depending on the state.",
  },
  {
    n: "05",
    quote: "I am losing coverage.",
    body: "A deadline is coming and the next step should be calm and specific, not a scramble through twenty tabs.",
  },
  {
    n: "06",
    quote: "I honestly do not know.",
    body: "That is a perfectly good place to start. Name the problem. A licensed advisor at the agency can help sort out what is relevant from there.",
  },
];

export function Situations() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="situations"
      className="reveal scroll-mt-24 border-b border-line"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">Who the agency helps</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] text-ink">
            Start with the need,{" "}
            <em className="display-italic text-sea">not the jargon.</em>
          </h2>
          <p className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-muted">
            Most people who reach Mandil Health do not arrive with a product
            name. They arrive with a family to protect, a bill that feels too
            high, or a gap where employer benefits used to be.
          </p>
        </div>

        <ol className="divide-y divide-line border-t border-line">
          {SITUATIONS.map((item) => (
            <li
              key={item.n}
              className="grid grid-cols-[3rem_1fr] gap-4 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-6 sm:py-8"
            >
              <span className="display pt-1 text-sm text-sea">{item.n}</span>
              <div>
                <h3 className="display text-[1.45rem] leading-snug text-ink sm:text-[1.7rem]">
                  “{item.quote}”
                </h3>
                <p className="mt-2 max-w-prose leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
