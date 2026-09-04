import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { getServiceSchema, getBreadcrumbSchema, getFaqSchema } from "@/content/schema";
import { business, getServiceBySlug, getRelatedServices } from "@/content/business";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { ServiceWhyTimely } from "@/components/sections/ServiceWhyTimely";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return business.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: `${service.name} in Detroit, MI | ${business.brandName.value}`,
    description: service.shortDescription,
    canonicalUrl: `${business.siteUrl.value}/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);
  const serviceSchema = getServiceSchema(service);
  const faqSchema = getFaqSchema([...service.faqs]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ServiceHero service={service} />
      <ServiceDetails service={service} />
      <ServiceWhyTimely service={service} />
      <WhyChooseUs />
      {related.length > 0 && <RelatedServices services={related} />}
      <FAQ title={`${service.name} FAQ`} items={[...service.faqs]} />
      <CTASection
        title={`Need ${service.name} in Detroit?`}
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
