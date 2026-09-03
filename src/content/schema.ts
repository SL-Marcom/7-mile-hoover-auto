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
