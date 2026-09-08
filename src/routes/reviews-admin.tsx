import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/mark";
import { StarRating } from "@/components/reviews/stars";
import {
  adminListReviews,
  adminLogin,
  adminSetStatus,
  adminSetup,
  adminStatus,
} from "@/lib/reviews/server";
import type { AdminReview, ReviewStatus } from "@/lib/reviews/types";

export const Route = createFileRoute("/reviews-admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Review admin | Mandil Health" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const TOKEN_KEY = "mh-review-admin";

function AdminPage() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [reviews, setReviews] = useState<AdminReview[] | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY) ?? "";
    void adminStatus()
      .then((s) => {
        setConfigured(s.configured);
        if (s.configured && saved) {
          setToken(saved);
          return load(saved);
        }
        return undefined;
      })
      .catch(() => setConfigured(false));
  }, []);

  async function load(nextToken: string) {
    const rows = await adminListReviews({ data: { token: nextToken } });
    setReviews(rows);
  }

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = configured
        ? await adminLogin({ data: { password } })
        : await adminSetup({ data: { password } });
      sessionStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setPassword("");
      setConfigured(true);
      await load(result.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not continue.");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: ReviewStatus) {
    if (!token) return;
    setError("");
    try {
      await adminSetStatus({ data: { token, id, status } });
      await load(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update that review.");
    }
  }

  return (
    <div className="min-h-svh bg-wash">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <Link to="/" aria-label="Mandil Health home">
            <Wordmark />
          </Link>
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-muted">
            Private
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-5 py-10">
        <h1 className="display text-[clamp(1.8rem,4vw,2.6rem)] text-navy">
          Review submissions
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          New reviews stay hidden until you approve them. Reject anything that
          includes medical details, policy numbers, or anything you do not want
          public.
        </p>

        {!token ? (
          <form onSubmit={onUnlock} className="letter mt-8 max-w-md p-6">
            <p className="text-sm font-medium text-ink">
              {configured ? "Enter your admin password" : "Create an admin password"}
            </p>
            <p className="mt-2 text-sm text-muted">
              {configured
                ? "This page is only for publishing or hiding client reviews."
                : "Choose a password you will remember. You will need it to approve reviews."}
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-4 h-12 w-full rounded-md border border-line bg-paper px-3 text-base"
              minLength={8}
              required
            />
            {error ? <p className="mt-3 text-sm text-error">{error}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="btn-cta mt-5 inline-flex h-12 items-center rounded-md bg-navy px-5 text-sm font-bold text-cream disabled:opacity-60"
            >
              {configured ? "Open inbox" : "Save password"}
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-4">
            {error ? <p className="text-sm text-error">{error}</p> : null}
            {reviews === null ? (
              <p className="text-sm text-muted">Loading…</p>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-muted">No submissions yet.</p>
            ) : (
              reviews.map((review) => (
                <article key={review.id} className="border border-line bg-paper p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <StarRating value={review.rating} />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {review.status}
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink">“{review.reviewText}”</p>
                  <p className="mt-3 text-sm text-muted">
                    {review.displayName}
                    {review.state ? `, ${review.state}` : ""}
                    {`, ${new Date(review.createdAt).toLocaleString()}`}
                  </p>
                  {review.imageUrl ? (
                    <img
                      src={review.imageUrl}
                      alt=""
                      className="mt-3 size-16 rounded-full object-cover"
                    />
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {review.status !== "approved" ? (
                      <button
                        type="button"
                        className="inline-flex h-10 items-center rounded-md bg-sea px-4 text-sm font-bold text-cream hover:bg-sea-deep"
                        onClick={() => void setStatus(review.id, "approved")}
                      >
                        Approve
                      </button>
                    ) : null}
                    {review.status !== "rejected" ? (
                      <button
                        type="button"
                        className="inline-flex h-10 items-center rounded-md border border-line px-4 text-sm font-semibold text-ink hover:bg-wash"
                        onClick={() => void setStatus(review.id, "rejected")}
                      >
                        Reject
                      </button>
                    ) : null}
                    {review.status !== "pending" ? (
                      <button
                        type="button"
                        className="inline-flex h-10 items-center px-3 text-sm text-muted underline-offset-4 hover:underline"
                        onClick={() => void setStatus(review.id, "pending")}
                      >
                        Move to pending
                      </button>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
