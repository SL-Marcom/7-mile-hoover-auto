import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `Blog | ${business.brandName.value}`,
  description: `Auto repair tips and updates from ${business.brandName.value} — coming soon.`,
  canonicalUrl: `${business.siteUrl.value}/blog`,
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Auto Repair Tips & Updates"
        breadcrumbLabel="Blog"
        description="We're working on adding helpful articles here. In the meantime, call us directly with any questions about your vehicle."
      />

      <CTASection
        title="Have a Question in the Meantime?"
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
