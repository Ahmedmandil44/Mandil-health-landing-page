import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { listApprovedReviews } from "@/lib/reviews/server";
import type { PublicReview } from "@/lib/reviews/types";
import { StarRating } from "@/components/reviews/stars";
import { US_STATES } from "@/lib/states";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || "MH";
}

function stateLabel(code: string | null) {
  if (!code) return null;
  return US_STATES.find((s) => s.code === code)?.name ?? code;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ReviewCard({ review }: { review: PublicReview }) {
  const state = stateLabel(review.state);
  const date = formatDate(review.createdAt);
  return (
    <article className="flex h-full flex-col border border-line bg-paper p-6">
      <StarRating value={review.rating} />
      <p className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-ink">
        “{review.reviewText}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-wash text-xs font-semibold tracking-wide text-navy">
          {review.imageUrl ? (
            <img src={review.imageUrl} alt="" className="size-full object-cover" />
          ) : (
            initialsFrom(review.displayName)
          )}
        </span>
        <div className="min-w-0 text-sm">
          <p className="font-semibold text-ink">{review.displayName}</p>
          <p className="text-muted">
            {[state, date].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const ref = useReveal<HTMLElement>();
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

  const preview = (reviews ?? []).slice(0, 3);
  const extra = (reviews ?? []).length > 3;

  return (
    <section
      ref={ref}
      id="reviews"
      className="reveal scroll-mt-24 border-t border-line bg-wash"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="kicker">Client stories</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.2vw,3.2rem)] text-navy">
              What clients say
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Real notes from people who asked Mandil Health to look at their
              coverage options.
            </p>
          </div>
          <Link
            to="/review"
            className="inline-flex h-11 shrink-0 items-center text-sm font-bold text-navy underline-offset-4 hover:underline"
          >
            Write a review
          </Link>
        </div>

        {reviews === null ? (
          <p className="mt-12 text-sm text-muted">Loading reviews…</p>
        ) : preview.length === 0 ? (
          <p className="mt-12 max-w-md leading-relaxed text-muted">
            Client reviews will appear here after they are published.
          </p>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {preview.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {extra ? (
          <Link
            to="/reviews"
            className="mt-8 inline-flex text-sm font-bold text-navy underline-offset-4 hover:underline"
          >
            View more reviews
          </Link>
        ) : null}
      </div>
    </section>
  );
}
