import { useReveal } from "@/hooks/use-reveal";

export function Quote() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal bg-sea text-cream"
      aria-label="A note on the first step"
    >
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="display-italic text-[clamp(1.8rem,4.2vw,3.15rem)] leading-[1.15] text-cream">
          You should not have to fill out fifteen fields before you even know
          whether a conversation is worth having.
        </p>
        <p className="mt-8 text-sm font-medium tracking-[0.2em] uppercase text-mist">
          Mandil Health LLC
        </p>
      </div>
    </section>
  );
}
