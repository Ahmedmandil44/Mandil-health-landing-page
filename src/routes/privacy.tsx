import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [{ title: "Privacy | Mandil Health" }],
  }),
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="Last updated: August 30, 2026">
      <p>
        This draft is provided as a starting point for the Mandil Health
        website and should be reviewed before the site is used for live lead
        collection.
      </p>
      <section>
        <h2 className="display text-2xl text-ink">Information you provide</h2>
        <p className="mt-3">
          If you submit a coverage inquiry, Mandil Health LLC may collect
          information you choose to provide, such as your name, phone number,
          email address, state, coverage needs, and general timing or shopping
          situation.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">How information may be used</h2>
        <p className="mt-3">
          Information submitted through the website may be used to respond to
          your inquiry, communicate about private health coverage or life
          insurance options, schedule or conduct a coverage review, and
          maintain records related to your request.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">Communications</h2>
        <p className="mt-3">
          If you consent to phone, email, or text communications, Mandil
          Health LLC may contact you regarding your insurance inquiry. Message
          and data rates may apply. Consent is not a condition of purchase.
          You may reply STOP to text messages to opt out.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">Sharing</h2>
        <p className="mt-3">
          Information may be shared with service providers used to operate the
          website, CRM, communications, or insurance application workflow, and
          with insurance carriers or related parties when necessary to
          evaluate or apply for coverage with your authorization.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-ink">Contact</h2>
        <p className="mt-3">
          Questions about this policy can be sent to{" "}
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
        This page is intentionally marked as a draft because privacy language
        should match the actual live form, CRM, analytics, texting, and
        data sharing setup before publication.
      </p>
    </LegalPage>
  );
}
