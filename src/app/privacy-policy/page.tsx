import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `Privacy Policy | ${business.brandName.value}`,
  description: `Privacy policy for the ${business.brandName.value} website — what information is collected and how it's used.`,
  canonicalUrl: `${business.siteUrl.value}/privacy-policy`,
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Overview",
    body: [
      `This Privacy Policy explains how ${business.brandName.value} ("we," "us," or "our") handles information collected through this website. This is an informational website for our auto repair shop and does not process online payments or store customer vehicle records.`,
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "The only information we currently collect through this website is what you voluntarily provide through our contact form — your name, email address, and any message you write about your vehicle or service needs.",
      "We do not use cookies, analytics tools, or advertising trackers on this website at this time.",
    ],
  },
  {
    heading: "How We Use Information",
    body: [
      "Any information submitted through our contact form is used only to respond to your inquiry — for example, to follow up about a quote request or a question about our services. We do not sell or share your information with third parties for marketing purposes.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "Our website links to external services such as Google Maps for directions. These third-party sites have their own privacy practices, and we encourage you to review them separately — this policy only covers our own website.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We take reasonable steps to protect information submitted to us, but no method of electronic transmission or storage is completely secure. Please avoid sending sensitive personal or financial information through our contact form.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: ["This website is intended for a general audience and is not directed at children under 13."],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time as our website or practices change. The date below reflects the most recent update.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      `If you have questions about this Privacy Policy, please call us at ${business.phone.display} or visit us at ${business.address.full}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" breadcrumbLabel="Privacy Policy" description="Last updated: September 2026" />

      <Section className="bg-white pb-16 sm:pb-20">
        <Container className="max-w-3xl space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-xl font-bold text-[var(--color-ink)]">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-[var(--color-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
