import { buildSchema } from "@/lib/seo/schema";
import { business } from "@/content/business";

/**
 * Site-wide AutoRepair (a schema.org AutomotiveBusiness subtype) JSON-LD.
 * Every value comes directly from src/content/business.ts, so it always
 * matches what's actually rendered on the page and updates everywhere the
 * moment business.ts is edited. No review/rating data is included — none
 * has been client-confirmed.
 */
export function getOrganizationSchema() {
  return buildSchema({
    type: "AutoRepair",
    data: {
      "@id": `${business.siteUrl.value}/#organization`,
      name: business.brandName.value,
      url: business.siteUrl.value,
      telephone: business.phone.value,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.postalCode,
        addressCountry: business.address.country,
      },
      hasMap: business.address.mapsUrl,
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:30", closes: "15:00" },
      ],
      areaServed: { "@type": "City", name: "Detroit, MI" },
    },
  });
}

export function getFaqSchema(items: { question: string; answer: string }[]) {
  return buildSchema({
    type: "FAQPage",
    data: {
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  });
}

/**
 * Per-service schema.org Service JSON-LD, linked back to the site-wide
 * AutoRepair organization by @id so both schemas describe the same business.
 */
export function getServiceSchema(service: { slug: string; name: string; shortDescription: string }) {
  return buildSchema({
    type: "Service",
    data: {
      name: service.name,
      description: service.shortDescription,
      serviceType: service.name,
      url: `${business.siteUrl.value}/services/${service.slug}`,
      provider: { "@id": `${business.siteUrl.value}/#organization` },
      areaServed: { "@type": "City", name: "Detroit, MI" },
    },
  });
}

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbEntry[]) {
  return buildSchema({
    type: "BreadcrumbList",
    data: {
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${business.siteUrl.value}${item.url}`,
      })),
    },
  });
}
