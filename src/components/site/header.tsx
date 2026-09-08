import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/mark";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/#health", label: "Health" },
  { href: "/#life", label: "Life" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "Questions" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-200",
        scrolled
          ? "bg-paper/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        {onHome ? (
          <a href="#top" aria-label="Mandil Health home">
            <Wordmark />
          </a>
        ) : (
          <Link to="/" aria-label="Mandil Health home">
            <Wordmark />
          </Link>
        )}

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/#start"
          className="inline-flex h-10 items-center rounded-sm bg-ink px-4 text-sm font-medium text-cream transition-colors hover:bg-ink-soft sm:h-11 sm:px-5"
        >
          Request a review
        </a>
      </div>
    </header>
  );
}
