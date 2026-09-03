import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { LocationHours } from "@/components/sections/LocationHours";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { getFaqSchema } from "@/content/schema";
import { business } from "@/content/business";

const HOME_FAQ_ITEMS = [
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
    answer: "No. We focus on mechanical auto repair and maintenance and do not provide collision repair, auto body work, painting, or tire sales/replacement.",
  },
];

export const metadata: Metadata = createMetadata({
  title: `${business.brandName.value} | Auto Repair in Detroit, MI`,
  description:
    "Full-service mechanical auto repair in Detroit, MI. Brake, engine, transmission, diagnostics, suspension, electrical, and AC/heating repair. Call now or request a free quote.",
  canonicalUrl: business.siteUrl.value,
});

export default function Home() {
  const faqSchema = getFaqSchema(HOME_FAQ_ITEMS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero />
      <WhyChooseUs />
      <Services />
      <About />
      <LocationHours />
      <FAQ title="Common Questions" items={HOME_FAQ_ITEMS} viewAllHref="/faq" />
      <CTASection
        title="Need Auto Repair in Detroit?"
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
