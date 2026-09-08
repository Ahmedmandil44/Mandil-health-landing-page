import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/mark";

export function Footer() {
  return (
    <footer className="bg-ink text-cream pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:py-20">
        <div>
          <Wordmark invert />
          <p className="display-italic mt-6 max-w-sm text-xl leading-snug text-mist">
            An independent agency for private health coverage, available in 49
            states, with whole life and final expense offered separately.
          </p>
        </div>

        <div>
          <p className="kicker text-mist">Get in touch</p>
          <p className="mt-3 font-medium text-cream">
            Mandil Health LLC
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Questions about coverage? Start with the short form and a licensed
            advisor will follow up.
          </p>
          <a
            href="/#start"
            className="mt-4 inline-flex text-sm text-cream underline-offset-4 hover:underline"
          >
            Request a review
          </a>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="kicker text-mist">On this site</p>
          <a href="/#health" className="mt-2 text-mist hover:text-cream">
            Health
          </a>
          <a href="/#life" className="text-mist hover:text-cream">
            Life
          </a>
          <a href="/#process" className="text-mist hover:text-cream">
            How it works
          </a>
          <a href="/#faq" className="text-mist hover:text-cream">
            Questions
          </a>
          <Link to="/privacy" className="text-mist hover:text-cream">
            Privacy
          </Link>
          <Link to="/terms" className="text-mist hover:text-cream">
            Terms
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-cream/10 px-5 py-8 sm:px-8">
        <p className="max-w-3xl text-xs leading-relaxed text-mist/80">
          Mandil Health LLC is an independent insurance agency. Coverage
          availability, eligibility, underwriting, benefits, limitations, and
          rates vary by state, carrier, product, and individual circumstances.
          Website content is for general information and does not guarantee
          eligibility, approval, pricing, or availability of any product.
        </p>
        <p className="mt-4 text-xs text-mist/70">
          © 2026 Mandil Health LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
