import { cn } from "@/lib/cn";

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.6l2.62 6.28 6.88.58-5.22 4.46 1.58 6.72L12 16.98 5.14 20.64l1.58-6.72L1.5 9.46l6.88-.58L12 2.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarRating({
  value,
  onChange,
  size = "sm",
  label,
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: "sm" | "lg";
  label?: string;
}) {
  const interactive = typeof onChange === "function";
  const dim = size === "lg" ? "size-11" : "size-4";

  return (
    <div
      className={cn("flex items-center gap-1", interactive ? "text-navy" : "text-navy/90")}
      role={interactive ? "radiogroup" : "img"}
      aria-label={label ?? `${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            className={cn(
              "grid place-items-center rounded-sm transition-transform duration-150 ease-out",
              dim,
              "hover:scale-[1.04] active:scale-[0.96]",
            )}
            onClick={() => onChange?.(n)}
          >
            <StarIcon filled={n <= value} className={size === "lg" ? "size-10" : "size-4"} />
          </button>
        ) : (
          <StarIcon
            key={n}
            filled={n <= value}
            className={size === "lg" ? "size-10" : "size-4"}
          />
        ),
      )}
    </div>
  );
}
