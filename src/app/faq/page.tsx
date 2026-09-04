import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { getFaqSchema, getBreadcrumbSchema } from "@/content/schema";
import { PageHero } from "@/components/sections/PageHero";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `Frequently Asked Questions | ${business.brandName.value}`,
  description: `Answers to common questions about ${business.brandName.value} — service area, hours, vehicle types, quotes, and what we do and don't repair.`,
  canonicalUrl: `${business.siteUrl.value}/faq`,
});

const FAQ_ITEMS = [
  {
    question: "What areas do you serve?",
    answer: `We're located at ${business.address.full}, serving Detroit and nearby communities.`,
  },
  {
    question: "What types of vehicles do you work on?",
    answer: "We work on everyday cars, trucks, and SUVs.",
  },
  {
    question: "Do you offer free quotes?",
    answer: "Yes — call us or request a free quote and we'll help you understand what your vehicle needs.",
  },
  {
    question: "Do you do collision repair, body work, or tire services?",
    answer:
      "No. We focus on mechanical auto repair and maintenance and do not provide collision repair, auto body work, painting, or tire sales/replacement.",
  },
  {
    question: "What if I'm not sure what's wrong with my vehicle?",
    answer:
      "That's alright — describe what you're noticing when you call, and we can do a general inspection to help identify the cause.",
  },
  {
    question: "How do I get started with a repair or quote?",
    answer: `Call us at ${business.phone.display}, or request a free quote through our contact page and we'll follow up.`,
  },
  {
    question: "What are your hours?",
    answer: business.hours.value.map((entry) => `${entry.days}: ${entry.time}`).join(". "),
  },
  {
    question: "Where are you located?",
    answer: `We're at ${business.address.full}. Use the directions link on our contact page to get exact directions.`,
  },
];

export default function FAQPage() {
  const faqSchema = getFaqSchema(FAQ_ITEMS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Common Questions About Our Shop"
        breadcrumbLabel="FAQ"
        description="Answers to the questions we hear most. Have something else on your mind? Call us and we'll be glad to help."
      />

      <FAQ title="All Questions" items={FAQ_ITEMS} />

      <CTASection
        title="Still Have a Question?"
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
