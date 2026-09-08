import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { US_STATES } from "@/lib/states";
import { cn } from "@/lib/cn";

const TOTAL = 5;

const WHO = [
  { value: "Just me", title: "Just me", copy: "Individual coverage" },
  { value: "Me + spouse", title: "Me + spouse", copy: "Two adults" },
  { value: "Family", title: "Family", copy: "Adults + children" },
  { value: "Child / children", title: "Child / children", copy: "Dependent coverage" },
];

const TYPES = [
  {
    value: "Private health",
    title: "Private health coverage",
    copy: "Individuals, families, self employed",
    featured: true,
  },
  {
    value: "Whole life",
    title: "Whole life",
    copy: "Long term life insurance",
    featured: false,
  },
  {
    value: "Final expense",
    title: "Final expense",
    copy: "Help with funeral costs",
    featured: false,
  },
];

const TIMING = [
  { value: "As soon as possible", label: "As soon as possible" },
  { value: "Within 30 days", label: "Within the next 30 days" },
  { value: "Open Enrollment", label: "During Open Enrollment" },
  { value: "Researching", label: "I’m just researching right now" },
];

type Data = {
  state: string;
  coverageFor: string;
  situation: string;
  timing: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
};

const EMPTY: Data = {
  state: "",
  coverageFor: "",
  situation: "",
  timing: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  consent: false,
};

export function Conversation() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>(EMPTY);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const advanceTimer = useRef<number | null>(null);

  function patch(partial: Partial<Data>) {
    setData((d) => ({ ...d, ...partial }));
    setError("");
  }

  function choose(partial: Partial<Data>) {
    patch(partial);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      setStep((s) => Math.min(TOTAL, s + 1));
    }, 220);
  }

  function valid(n: number) {
    if (n === 1) return US_STATES.some((s) => s.code === data.state);
    if (n === 2) return Boolean(data.situation);
    if (n === 3) return Boolean(data.coverageFor);
    if (n === 4) return Boolean(data.timing);
    if (n === 5) {
      if (!data.firstName.trim() || !data.lastName.trim()) return false;
      if (!data.phone.trim()) return false;
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return false;
      if (!data.consent) return false;
      return true;
    }
    return false;
  }

  function next() {
    if (!valid(step)) {
      setError(
        step === 1
          ? "Choose the state where you need coverage."
          : step === 5
            ? "Please complete the required fields and consent before sending."
            : "Choose an option to continue.",
      );
      return;
    }
    setError("");
    setStep((s) => Math.min(TOTAL, s + 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid(5)) {
      setError("Please complete the required fields and consent before sending.");
      return;
    }
    console.info("Mandil Health prototype lead:", data);
    setDone(true);
  }

  function reset() {
    setData(EMPTY);
    setStep(1);
    setError("");
    setDone(false);
  }

  return (
    <section id="start" className="relative scroll-mt-24 overflow-hidden bg-ink text-cream">
      <Constellation />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-28">
        <div className="order-2 lg:order-1 lg:pt-6">
          <p className="kicker text-mist">Get started</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.2vw,3.4rem)] text-cream">
            Let’s make the first step{" "}
            <em className="display-italic">easy.</em>
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-mist">
            A few questions to help the agency prepare. Detailed information
            can wait until it is actually needed.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-mist">
            {["Takes about a minute", "No obligation to enroll", "A licensed advisor follows up directly"].map(
              (item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-clay" aria-hidden="true">
                    ·
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="letter relative order-1 p-6 text-ink sm:p-9 lg:order-2">
          {done ? (
            <Success onReset={reset} />
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="kicker">Coverage review</p>
                  <p className="display mt-1 text-2xl">A short form</p>
                </div>
                <p className="display text-sm text-muted tabular-nums">
                  {step} of {TOTAL}
                </p>
              </div>
              <div className="mt-5 h-px bg-line" aria-hidden="true">
                <div
                  className="h-px bg-sea transition-[width] duration-300 ease-out"
                  style={{ width: `${(step / TOTAL) * 100}%` }}
                />
              </div>

              <div className="mt-8 min-h-[18rem]">
                {step === 1 && (
                  <StepShell
                    legend="Which state do you need coverage in?"
                    help="The agency can help in 49 states. Choose the state where you need coverage."
                  >
                    <label className="block text-sm font-medium text-ink">
                      State
                      <select
                        className="select-plain mt-2 h-14 w-full rounded-sm border border-line bg-paper px-4 text-base text-ink"
                        value={data.state}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v) choose({ state: v });
                          else patch({ state: v });
                        }}
                        required
                      >
                        <option value="">Select a state</option>
                        {US_STATES.map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.name} ({s.code})
                          </option>
                        ))}
                      </select>
                    </label>
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell
                    legend="What would you like the agency to review?"
                    help="Health is the main focus. Whole life and final expense are separate options."
                  >
                    <div className="grid gap-2">
                      {TYPES.map((opt) => (
                        <OptionButton
                          key={opt.value}
                          on={data.situation === opt.value}
                          onClick={() => choose({ situation: opt.value })}
                          title={opt.title}
                          copy={opt.copy}
                          featured={opt.featured}
                        />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell
                    legend="Who are you looking to cover?"
                    help="Choose the closest fit."
                  >
                    <div className="grid gap-2 sm:grid-cols-2">
                      {WHO.map((opt) => (
                        <OptionButton
                          key={opt.value}
                          on={data.coverageFor === opt.value}
                          onClick={() => choose({ coverageFor: opt.value })}
                          title={opt.title}
                          copy={opt.copy}
                        />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 4 && (
                  <StepShell
                    legend="When are you hoping to have coverage?"
                    help="No pressure, this just helps with timing."
                  >
                    <div className="grid gap-2">
                      {TIMING.map((opt) => (
                        <OptionButton
                          key={opt.value}
                          on={data.timing === opt.value}
                          onClick={() => choose({ timing: opt.value })}
                          title={opt.label}
                        />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 5 && (
                  <StepShell
                    legend="Where should a licensed advisor reach you?"
                    help="You’re almost done."
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="First name"
                        value={data.firstName}
                        autoComplete="given-name"
                        onChange={(v) => patch({ firstName: v })}
                      />
                      <Field
                        label="Last name"
                        value={data.lastName}
                        autoComplete="family-name"
                        onChange={(v) => patch({ lastName: v })}
                      />
                    </div>
                    <Field
                      label="Phone number"
                      value={data.phone}
                      type="tel"
                      autoComplete="tel"
                      onChange={(v) => patch({ phone: v })}
                    />
                    <Field
                      label="Email"
                      optional
                      value={data.email}
                      type="email"
                      autoComplete="email"
                      onChange={(v) => patch({ email: v })}
                    />
                    <label className="mt-2 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                      <input
                        type="checkbox"
                        className="mt-1 size-4 accent-sea"
                        checked={data.consent}
                        onChange={(e) => patch({ consent: e.target.checked })}
                        required
                      />
                      <span>
                        By submitting, I agree that Mandil Health LLC may
                        contact me by phone, email, or text about my insurance
                        inquiry. Message and data rates may apply. Consent is
                        not a condition of purchase. Reply STOP to opt out of
                        texts.
                      </span>
                    </label>
                  </StepShell>
                )}
              </div>

              {error ? (
                <p className="mt-4 text-sm text-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex h-12 items-center justify-center gap-2 px-2 text-sm text-muted hover:text-ink"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </button>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {step < TOTAL ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-ink px-5 text-sm font-medium text-cream hover:bg-ink-soft sm:w-auto"
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-sea px-5 text-sm font-medium text-cream hover:bg-sea-deep sm:w-auto"
                  >
                    Request a review
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function StepShell({
  legend,
  help,
  children,
}: {
  legend: string;
  help: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="display text-[1.45rem] leading-snug text-ink sm:text-[1.7rem]">
        {legend}
      </legend>
      <p className="mt-2 mb-5 text-sm text-muted">{help}</p>
      {children}
    </fieldset>
  );
}

function OptionButton({
  on,
  onClick,
  title,
  copy,
  featured,
}: {
  on: boolean;
  onClick: () => void;
  title: string;
  copy?: string;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-on={on}
      className={cn("opt-row", featured && "min-h-16 bg-mist/50")}
      aria-pressed={on}
    >
      <span
        className={cn(
          "grid size-4 shrink-0 place-items-center rounded-full border",
          on ? "border-sea bg-sea" : "border-ink/30",
        )}
        aria-hidden="true"
      >
        {on ? <span className="size-1.5 rounded-full bg-cream" /> : null}
      </span>
      <span className="flex flex-col">
        <span className="text-[0.95rem] font-medium text-ink">{title}</span>
        {copy ? (
          <span className="text-xs text-muted">{copy}</span>
        ) : null}
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <label className="mt-1 block text-sm font-medium text-ink">
      {label}{" "}
      {optional ? (
        <span className="font-normal text-muted">(optional)</span>
      ) : null}
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-sm border border-line bg-paper px-3 text-base text-ink"
      />
    </label>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[22rem] flex-col justify-center py-6">
      <span className="grid size-12 place-items-center rounded-full bg-sea text-cream">
        <Check className="size-5" strokeWidth={2.4} />
      </span>
      <h3 className="display mt-6 text-3xl text-ink">
        The conversation is ready.
      </h3>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        This is still a front end prototype, so the form is not connected to a
        webhook yet, and nothing was transmitted. When it is live, a licensed
        advisor at Mandil Health will review your request and follow up.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 self-start text-sm text-sea underline-offset-4 hover:underline"
      >
        Start over
      </button>
    </div>
  );
}

function Constellation() {
  const dots = [
    [8, 18],
    [14, 72],
    [22, 40],
    [78, 14],
    [88, 58],
    [70, 82],
    [42, 8],
    [92, 30],
    [6, 90],
    [50, 92],
  ];
  return (
    <div className="constellation pointer-events-none absolute inset-0" aria-hidden="true">
      {dots.map(([l, t], i) => (
        <span key={i} style={{ left: `${l}%`, top: `${t}%` }} />
      ))}
    </div>
  );
}

export function MobileStickyCta() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const lead = document.getElementById("start");
    if (!lead) return;
    const onScroll = () => {
      const rect = lead.getBoundingClientRect();
      const inLead = rect.top < window.innerHeight * 0.7 && rect.bottom > 100;
      setHide(inLead);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#start"
      className={cn(
        "sticky-cta fixed inset-x-4 z-40 flex h-14 items-center justify-center rounded-sm bg-ink text-base font-medium text-cream shadow-[0_12px_32px_-12px_rgba(26,40,52,0.55)] md:hidden",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))]",
        hide && "hide",
      )}
    >
      Request a review
    </a>
  );
}
