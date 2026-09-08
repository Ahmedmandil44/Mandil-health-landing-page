import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Grain } from "@/components/site/grain";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <Grain />
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          to="/"
          className="text-sm text-sea underline-offset-4 hover:underline"
        >
          ← Back to Mandil Health
        </Link>
        <p className="mt-8 inline-block rounded-xs border border-clay/40 px-2 py-1 text-[0.65rem] font-medium tracking-[0.16em] uppercase text-clay">
          Draft for review before publication
        </p>
        <h1 className="display mt-5 text-[clamp(2.2rem,5vw,3.4rem)] text-ink">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">{updated}</p>
        <div className="legal-body mt-10 space-y-8 text-[1.05rem] leading-relaxed text-ink/85">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
