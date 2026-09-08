import { useReveal } from "@/hooks/use-reveal";

const STEPS = [
  {
    n: "01",
    kicker: "Start simple",
    title: "Tell the agency what you are trying to solve.",
    body: "A few basic details are enough. No medical history, no long application on the first page, no pretending you already know the product name.",
  },
  {
    n: "02",
    kicker: "A real conversation",
    title: "A licensed advisor narrows down what matters.",
    body: "Budget, doctors, prescriptions, family, timing. The things that change the answer, not a script that ignores them.",
  },
  {
    n: "03",
    kicker: "Compare",
    title: "Review the relevant paths.",
    body: "Understand differences, limitations, and tradeoffs. A premium is not a plan. You should know what you are looking at before you decide.",
  },
  {
    n: "04",
    kicker: "Your call",
    title: "You decide what happens next.",
    body: "If something fits, a licensed advisor can help with the application. If it does not, there is no obligation to enroll.",
  },
];

export function Process() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="process" className="reveal scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="kicker">How the agency works</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.5rem)] text-ink">
            A clear process,{" "}
            <em className="display-italic text-sea">without the runaround.</em>
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Mandil Health LLC is an independent insurance agency that can help
            in 49 states. Requests are reviewed by a licensed advisor who stays
            the point of contact, not a rotation of strangers.
          </p>
        </div>

        <ol className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {STEPS.map((step) => (
            <li key={step.n} className="relative">
              <span
                className="display-hero block text-[clamp(3.5rem,8vw,5.5rem)] leading-none text-mist"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <p className="kicker mt-2">{step.kicker}</p>
              <h3 className="display mt-2 text-[1.55rem] leading-snug text-ink sm:text-[1.75rem]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
