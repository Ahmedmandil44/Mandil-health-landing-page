import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ReviewCard } from "@/components/site/testimonials";
import { listApprovedReviews } from "@/lib/reviews/server";
import type { PublicReview } from "@/lib/reviews/types";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [{ title: "Client reviews | Mandil Health" }],
  }),
});

function ReviewsPage() {
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);

  useEffect(() => {
    let live = true;
    listApprovedReviews()
      .then((rows) => {
        if (live) setReviews(rows);
      })
      .catch(() => {
        if (live) setReviews([]);
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="min-h-svh bg-paper">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="kicker">Client stories</p>
        <h1 className="display mt-3 text-[clamp(2rem,4.4vw,3.4rem)] text-navy">
          What clients say
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Published reviews from people who worked with Mandil Health.
        </p>
        <Link
          to="/review"
          className="mt-6 inline-flex text-sm font-bold text-navy underline-offset-4 hover:underline"
        >
          Write a review
        </Link>

        {reviews === null ? (
          <p className="mt-12 text-sm text-muted">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="mt-12 max-w-md leading-relaxed text-muted">
            Client reviews will appear here after they are published.
          </p>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
