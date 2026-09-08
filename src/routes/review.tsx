import { createFileRoute, Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/mark";
import { ReviewForm } from "@/components/reviews/review-form";

export const Route = createFileRoute("/review")({
  component: ReviewPage,
  head: () => ({
    meta: [
      { title: "Leave a review | Mandil Health" },
      {
        name: "description",
        content: "Leave a short review for Mandil Health. A sentence or two is enough.",
      },
    ],
  }),
});

function ReviewPage() {
  return (
    <div className="min-h-svh bg-wash">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-5">
          <Link to="/" aria-label="Mandil Health home">
            <Wordmark />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-5 py-8 sm:py-12">
        <p className="kicker">Quick review</p>
        <h1 className="display mt-3 text-[clamp(1.8rem,6vw,2.5rem)] text-navy">
          How did we do?
        </h1>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
          Stars, a sentence or two, and the name you want shown. That is all.
        </p>
        <div className="letter mt-8 p-5 sm:p-8">
          <ReviewForm />
        </div>
      </main>
    </div>
  );
}
