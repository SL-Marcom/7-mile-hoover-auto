import type { Metadata } from "next";
import Image from "next/image";
import { createMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFaqSchema } from "@/content/schema";
import { business, getServiceBySlug } from "@/content/business";
import { towing } from "@/content/towing";
import { getServiceImage } from "@/content/serviceImages";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneIcon } from "@/components/icons";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { ServiceWhyTimely } from "@/components/sections/ServiceWhyTimely";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = createMetadata({
  title: `Towing in Detroit, MI | ${business.brandName.value}`,
  description: towing.shortDescription,
  canonicalUrl: `${business.siteUrl.value}/towing`,
});

export default function TowingPage() {
  const imageSrc = getServiceImage("towing");
  const relatedServices = towing.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Towing", url: "/towing" },
  ]);
  const faqSchema = getFaqSchema(towing.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="bg-white">
        <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-stretch lg:py-16">
          <div className="space-y-5">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Towing" }]} />

            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Towing in Detroit, MI
            </h1>

            <div className="max-w-xl space-y-4 text-lg leading-7 text-[var(--color-muted)]">
              {towing.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CTA href={business.phone.href} variant="primary" className="text-base">
                <PhoneIcon className="h-4 w-4" />
                {business.ctas.primary.label}: {business.phone.display}
              </CTA>
              <CTA href="/contact" variant="accent">
                {business.ctas.secondary.label}
              </CTA>
            </div>
          </div>

          {imageSrc ? (
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-auto lg:min-h-[420px]">
              <Image
                src={imageSrc}
                alt={`Towing at ${business.brandName.value} in Detroit, MI`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <ImagePlaceholder label="Towing photo" aspect="none" className="h-64 sm:h-80 lg:h-auto lg:min-h-[420px]" />
          )}
        </Container>
      </Section>

      <ServiceDetails service={towing} />
      <ServiceWhyTimely service={towing} />
      <WhyChooseUs />
      {relatedServices.length > 0 && <RelatedServices services={relatedServices} />}
      <FAQ title="Towing FAQ" items={towing.faqs} />
      <CTASection
        title="Need a Tow in Detroit?"
        description="Call now and we'll help get your vehicle to our shop, or request a free quote and we'll follow up."
      />
    </>
  );
}
