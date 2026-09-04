import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/content/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { LocationHours } from "@/components/sections/LocationHours";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `Contact Us | ${business.brandName.value}`,
  description: `Contact ${business.brandName.value} at ${business.phone.display} or visit us at ${business.address.full}. Call now or request a free quote.`,
  canonicalUrl: `${business.siteUrl.value}/contact`,
});

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Contact"
        title="Contact 7 Mile and Hoover Auto Services"
        breadcrumbLabel="Contact Us"
        description="Call for a quick answer, or send us a note about your vehicle and we'll follow up."
      />

      <Contact
        title="Send Us a Note"
        description="Tell us what's going on with your vehicle and the best way to reach you."
      />

      <LocationHours />
    </>
  );
}
