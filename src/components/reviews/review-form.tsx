import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { US_STATES } from "@/lib/states";
import { submitReview } from "@/lib/reviews/server";
import { StarRating } from "@/components/reviews/stars";
import { cn } from "@/lib/cn";

const MAX_TEXT = 1000;

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || "MH";
}

async function fileToAvatar(file: File): Promise<string> {
  if (!/image\/(jpeg|jpg|png|webp)/i.test(file.type)) {
    throw new Error("Please choose a JPG, PNG, or WebP photo.");
  }
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("Please use a photo smaller than 4 MB.");
  }
  const bitmap = await createImageBitmap(file);
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not read that photo.");
  const scale = Math.max(size / bitmap.width, size / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;
  ctx.drawImage(bitmap, (size - w) / 2, (size - h) / 2, w, h);
  return canvas.toDataURL("image/jpeg", 0.72);
}

export function ReviewForm({ compact = false }: { compact?: boolean }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [state, setState] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [showExtras, setShowExtras] = useState(false);

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    try {
      setError("");
      setImageData(await fileToAvatar(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add that photo.");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (rating < 1) {
      setError("Please tap a star rating.");
      return;
    }
    if (reviewText.trim().length < 8) {
      setError("A sentence or two is perfect.");
      return;
    }
    if (displayName.trim().length < 2) {
      setError("Add the name you want shown with your review.");
      return;
    }
    if (!consent) {
      setError("Please confirm we can share this review.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await submitReview({
        data: {
          rating,
          reviewText: reviewText.trim(),
          displayName: displayName.trim(),
          state,
          imageData,
          consent,
          website,
        },
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="flex min-h-[22rem] flex-col justify-center py-4">
        <p className="kicker">Thank you</p>
        <h2 className="display mt-3 text-[clamp(1.8rem,4vw,2.6rem)] text-ink">
          Thank you for sharing your experience.
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          We really appreciate you taking the time to leave a review.
        </p>
        <Link
          to="/"
          className="btn-cta mt-8 inline-flex h-12 w-fit items-center rounded-md bg-sea px-5 text-sm font-bold text-cream hover:bg-sea-deep"
        >
          Back to Mandil Health
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn(!compact && "pt-1")}>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm font-medium text-ink">How was your experience?</p>
        <StarRating value={rating} onChange={setRating} size="lg" label="Star rating" />
      </div>

      <label className="mt-6 block text-sm font-medium text-ink">
        Your review
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value.slice(0, MAX_TEXT))}
          rows={3}
          maxLength={MAX_TEXT}
          placeholder="A sentence or two is perfect."
          className="mt-2 w-full resize-none rounded-md border border-line bg-paper px-3 py-3 text-base leading-relaxed text-ink"
        />
      </label>
      <p className="mt-1.5 text-xs text-muted">
        Please don’t include private medical, policy, or account information in
        your review.
      </p>

      <label className="mt-5 block text-sm font-medium text-ink">
        Name shown with your review
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value.slice(0, 60))}
          placeholder="Sarah M. or John"
          autoComplete="nickname"
          className="mt-2 h-12 w-full rounded-md border border-line bg-paper px-3 text-base text-ink"
        />
      </label>
      <p className="mt-1.5 text-xs text-muted">A first name is enough. A last initial is fine too.</p>

      <input
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <label className="mt-5 flex items-start gap-3 text-sm leading-snug text-ink">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 accent-navy"
        />
        <span>I’m okay with Mandil Health sharing this review publicly.</span>
      </label>

      <div className="mt-5">
        <button
          type="button"
          className="text-sm font-medium text-navy underline-offset-4 hover:underline"
          onClick={() => setShowExtras((v) => !v)}
        >
          {showExtras ? "Hide optional details" : "Add optional details"}
        </button>
        {showExtras ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-ink">
              State
              <span className="font-normal text-muted"> (optional)</span>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="select-plain mt-2 h-12 w-full rounded-md border border-line bg-paper px-3 text-base text-ink"
              >
                <option value="">Select a state</option>
                {US_STATES.filter((s) => s.code !== "NY" && s.code !== "DC").map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <p className="text-sm font-medium text-ink">
                Photo <span className="font-normal text-muted">(optional)</span>
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-wash text-sm font-semibold text-navy">
                  {imageData ? (
                    <img src={imageData} alt="" className="size-full object-cover" />
                  ) : (
                    initialsFrom(displayName)
                  )}
                </span>
                <label className="text-sm font-medium text-navy underline-offset-4 hover:underline">
                  {imageData ? "Change photo" : "Add a photo (optional)"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(e) => {
                      void onPhoto(e.target.files?.[0]);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}

      <button
        type="submit"
        disabled={busy}
        className="btn-cta mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-sea px-5 text-sm font-bold text-cream hover:bg-sea-deep disabled:opacity-60 sm:w-auto"
      >
        {busy ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
