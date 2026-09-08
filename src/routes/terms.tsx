import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [{ title: "Terms | Mandil Health" }],
  }),
});

function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="Last updated: August 30, 2026">
      <p>
        This website is operated by Mandil Health LLC. These draft terms are
        a starting point and should be reviewed before the website is used
        for live lead collection.
      </p>
      <section>
        <h2 className="display text-2xl text-ink">Informational purpose</h2>
        <p className="mt-3">
          Website content is provided for general informational purposes and
          does not guarantee eligibility, approval, pricing, benefits, or
          availability of any health or life insurance product.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">No government affiliation</h2>
        <p className="mt-3">
          Mandil Health LLC is an independent insurance agency.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">Coverage availability</h2>
        <p className="mt-3">
          Insurance availability, eligibility, underwriting, benefits,
          limitations, rates, networks, and product fit vary by state,
          carrier, product, and individual circumstances.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">Communications</h2>
        <p className="mt-3">
          By submitting a website inquiry and selecting the consent checkbox,
          you agree that Mandil Health LLC may contact you by phone, email, or
          text about your insurance inquiry. Message and data rates may apply.
          Consent is not a condition of purchase. Reply STOP to opt out of
          text messages.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">No obligation</h2>
        <p className="mt-3">
          Submitting an inquiry or participating in a coverage review does not
          obligate you to purchase or enroll in insurance coverage.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">Contact</h2>
        <p className="mt-3">
          Questions can be sent to{" "}
          <a
            className="text-sea underline-offset-4 hover:underline"
            href="mailto:contact@mandilhealth.com"
          >
            contact@mandilhealth.com
          </a>
          .
        </p>
      </section>
      <p className="rounded-sm border border-line bg-cream px-4 py-3 text-sm text-muted">
        This is a draft page. Final terms should match the actual live
        website, marketing practices, communication tools, and insurance
        products before launch.
      </p>
    </LegalPage>
  );
}
