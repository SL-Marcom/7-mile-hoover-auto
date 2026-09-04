import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `Terms of Service | ${business.brandName.value}`,
  description: `Terms of service for the ${business.brandName.value} website.`,
  canonicalUrl: `${business.siteUrl.value}/terms-of-service`,
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Acceptance of Terms",
    body: [
      `By using this website, you agree to these Terms of Service. If you do not agree, please do not use the site. These terms apply to the ${business.brandName.value} website only, not to services performed at our shop, which are governed by the terms you agree to in person when work is authorized.`,
    ],
  },
  {
    heading: "Use of This Website",
    body: [
      "This website is provided for general information about our shop, services, hours, and location. You agree to use it only for lawful purposes and not to misuse the contact form or attempt to disrupt the site.",
    ],
  },
  {
    heading: "Information Is Not a Quote or Guarantee",
    body: [
      "Content on this website, including service descriptions, is provided for general informational purposes. It is not a price quote, a diagnosis of your specific vehicle, or a guarantee of any outcome. Actual repair recommendations, timelines, and costs are provided directly by our shop after inspecting your vehicle.",
    ],
  },
  {
    heading: "Accuracy of Information",
    body: [
      "We try to keep the information on this website accurate and current, including our hours and services, but we do not guarantee that every detail is error-free at all times. Please call us to confirm hours or service details before visiting.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      `The content, design, and layout of this website are owned by ${business.brandName.value} unless otherwise noted, and may not be copied or reused without permission.`,
    ],
  },
  {
    heading: "External Links",
    body: [
      "This website may link to third-party sites, such as Google Maps for directions. We are not responsible for the content or practices of external websites.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      `To the extent permitted by law, ${business.brandName.value} is not liable for any damages arising from your use of this website or reliance on its content.`,
    ],
  },
  {
    heading: "Governing Law",
    body: ["These terms are governed by the laws of the State of Michigan, without regard to conflict-of-law principles."],
  },
  {
    heading: "Changes to These Terms",
    body: ["We may update these Terms of Service from time to time. The date below reflects the most recent update."],
  },
  {
    heading: "Contact Us",
    body: [
      `If you have questions about these Terms of Service, please call us at ${business.phone.display} or visit us at ${business.address.full}.`,
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero title="Terms of Service" breadcrumbLabel="Terms of Service" description="Last updated: September 2026" />

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
