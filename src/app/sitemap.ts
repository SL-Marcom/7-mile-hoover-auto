import type { MetadataRoute } from "next";
import { business } from "@/content/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.value;
  const staticRoutes = ["", "/about", "/services", "/faq", "/contact", "/blog", "/privacy-policy", "/terms-of-service"];
  const serviceRoutes = business.services.map((service) => `/services/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
