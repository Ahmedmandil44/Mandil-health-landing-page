import { cn } from "@/lib/cn";

export function Monogram({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <img
      src={invert ? "/logo-mh-white.png" : "/logo-mh.png"}
      alt=""
      width={941}
      height={812}
      className={cn("h-10 w-auto shrink-0 object-contain object-left sm:h-12", className)}
    />
  );
}

export function Wordmark({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
      <Monogram invert={invert} />
      <span className="flex min-w-0 items-center gap-1 sm:gap-1.5">
        <span
          className={cn(
            "display text-[1.18rem] leading-none sm:text-[1.42rem]",
            invert ? "text-cream" : "text-navy",
          )}
        >
          Mandil
        </span>
        <span
          className={cn(
            "pt-px text-[0.72rem] font-semibold uppercase tracking-[0.16em] sm:text-[0.84rem] sm:tracking-[0.2em]",
            invert ? "text-cream/90" : "text-navy",
          )}
        >
          Health
        </span>
      </span>
    </span>
  );
}
