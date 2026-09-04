import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `Auto Repair Services in Detroit, MI | ${business.brandName.value}`,
  description:
    "Full-service mechanical auto repair in Detroit, MI — brakes, engines, transmissions, diagnostics, suspension, electrical, cooling, and more. Call now or request a free quote.",
  canonicalUrl: `${business.siteUrl.value}/services`,
});

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Section className="bg-white">
        <Container className="max-w-3xl space-y-5 py-10 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Our Services</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Full-Service Mechanical Auto Repair in Detroit, MI
          </h1>
          <p className="text-lg leading-7 text-[var(--color-muted)]">
            {business.brandName.value} works on cars, trucks, and SUVs at {business.address.full}. Browse our
            services below, or call us if you&rsquo;re not sure exactly what your vehicle needs.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTA href={business.phone.href} variant="primary">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}: {business.phone.display}
            </CTA>
            <CTA href="/contact" variant="accent">
              {business.ctas.secondary.label}
            </CTA>
          </div>
        </Container>
      </Section>

      <Section className="bg-white pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {business.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm text-[var(--color-muted)]">
            We focus on mechanical auto repair and maintenance. We do not perform collision repair, auto body work,
            painting, or tire sales/replacement.
          </p>
        </Container>
      </Section>

      <CTASection
        title="Not Sure What Your Vehicle Needs?"
        description="Call and describe what you're noticing, or request a free quote and we'll help you figure out the next step."
      />
    </>
  );
}
