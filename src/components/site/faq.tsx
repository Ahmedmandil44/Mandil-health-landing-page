import * as Accordion from "@radix-ui/react-accordion";
import { useReveal } from "@/hooks/use-reveal";

const FAQS = [
  {
    q: "Can Mandil Health help in my state?",
    a: "Yes, in 49 states. Mandil Health is an independent agency that can work with people across most of the United States. Start with the form and choose the state where you need coverage. A licensed advisor will follow up on what is available where you live. Availability still varies by product, carrier, and applicant.",
  },
  {
    q: "Does Mandil Health help with private health insurance for self employed people and families?",
    a: "Yes. That is the main focus of the agency. A lot of people shopping on their own do not have a standard employer plan. Private individual and family health coverage may be worth comparing depending on your state, your health, your budget, and what you need the plan to do. There is no single product that fits every self employed person, which is why a licensed advisor reviews the situation before recommending a path.",
  },
  {
    q: "I just need coverage for myself, or for my family. Can the agency help either way?",
    a: "Yes. Individual coverage and family coverage are both common starting points. Who is covered changes the conversation: networks, prescriptions, pediatric care, budgets. The first step is the same. Tell the agency who needs help and what you are trying to solve. From there, a licensed advisor can walk through what may be available in your state.",
  },
  {
    q: "What is whole life insurance, and does the agency offer it?",
    a: "Whole life is a type of life insurance designed to last, rather than expire after a set term. Mandil Health can talk through whole life as its own product, separate from health coverage. A licensed advisor can explain what a whole life policy is meant to do, what it is not meant to do, and whether it may fit based on age, health, and budget. Availability varies.",
  },
  {
    q: "What is final expense insurance?",
    a: "Final expense is a simpler life insurance policy meant to help with funeral and related costs. It is not the same thing as whole life, and it is not health insurance. Mandil Health offers it as a separate option. If that is what you want to look at, choose final expense on the form so the follow up stays on that product.",
  },
  {
    q: "Will health and life insurance get mixed into one pitch?",
    a: "No. Health coverage is the agency’s primary work. Whole life and final expense are offered separately. The form asks which you want to review so a licensed advisor can keep the conversation on that product. If you later want to look at the other category, that can be a different review.",
  },
  {
    q: "What happens after I submit the form?",
    a: "A licensed advisor at Mandil Health reviews what you sent and follows up directly. The idea is one point of contact, not a blast of unrelated calls. In that first conversation you can expect questions about your situation, timing, and priorities, plus plain language explanations of what may be relevant. If this site is still a prototype, the form will tell you that nothing was transmitted yet.",
  },
  {
    q: "If I fill this out, am I committing to buy or enroll in a policy?",
    a: "No. Submitting the form does not obligate you to buy, enroll, or move forward with anything. It starts a conversation so you can understand your options. If something later makes sense, you can choose to apply. If it does not, you can stop.",
  },
  {
    q: "Why doesn’t the form ask for my date of birth, medications, or a full application?",
    a: "Because this page is meant to start a conversation, not complete an underwriting file. The first goal is simply to understand what you are looking for and how soon you need help. More detailed information such as age, health history, doctors, or prescriptions can come later if it is actually needed to evaluate coverage. Asking for less up front is intentional.",
  },
  {
    q: "What information will I eventually need if we look at specific plans?",
    a: "It depends on the coverage. For private health insurance, a licensed advisor may eventually need ages of the people to be covered, zip code, current doctors or medications, and a sense of budget. For whole life or final expense, the conversation often includes age, general health, coverage amount, and what you want the policy to do. None of that is required to start. You will be told what is needed, and why, before you are asked for it.",
  },
  {
    q: "Will I hear from one licensed advisor, or am I dropping into a giant lead funnel?",
    a: "Mandil Health is an independent agency, not a giant call center. A licensed advisor reviews the request and reaches out, rather than your information being thrown into a system with no context. You should not feel passed around. If at any point the conversation is not useful, you can say so.",
  },
  {
    q: "I’m just researching. Is it still okay to fill this out?",
    a: "Yes. You do not have to be ready to decide today. Some people need coverage immediately. Others are trying to understand the landscape before a deadline, a job change, or a family decision. Both are valid. There is a “just researching” option in the form for a reason. Use it.",
  },
  {
    q: "How does the advisor relationship actually work?",
    a: "You work with a licensed advisor at Mandil Health LLC as your point of contact. They help you understand what is available, what the tradeoffs are, and whether a given path is even relevant. The agency is independent, not a carrier, and not a government marketplace. If you decide to apply, the advisor can help with the application. You are not assigned a new person at every step of a website flow.",
  },
];

export function Faq() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="faq" className="reveal scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">Questions</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.2vw,3.3rem)] text-ink">
            A few things people want to know{" "}
            <em className="display-italic text-sea">before they reach out.</em>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            If you are still unsure, that is completely normal. The first
            conversation is for making sense of things, not for rushing a
            decision.
          </p>
          <a
            href="#start"
            className="mt-8 inline-flex text-sm font-medium text-sea underline-offset-4 hover:underline"
          >
            Request a review
          </a>
        </div>

        <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
          {FAQS.map((item, i) => (
            <Accordion.Item key={i} value={`q-${i}`} className="faq-item">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-sea">
                  <span className="display text-[1.15rem] leading-snug text-ink sm:text-[1.3rem]">
                    {item.q}
                  </span>
                  <span
                    className="faq-chevron mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-line text-lg leading-none text-ink"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                <p className="max-w-prose pb-6 leading-relaxed text-muted">
                  {item.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
