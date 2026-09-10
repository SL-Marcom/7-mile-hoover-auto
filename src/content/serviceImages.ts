/**
 * Service-page hero photos, reused from client-provided blog images where the
 * subject matches. Kept as a plain lookup (not part of business.ts's `as const`
 * services array) so a missing entry is just `undefined`, not a type error.
 * Services not listed here still render the ImagePlaceholder until the client
 * sends a matching photo.
 */
export const serviceImages: Record<string, string> = {
  "brake-repair": "/images/blog/grinding-squealing-brakes-what-it-means.jpg",
  "muffler-exhaust-repair": "/images/services/muffler-exhaust-repair.jpg",
  "engine-repair": "/images/services/engine-repair.jpg",
  "check-engine-light-diagnostics": "/images/blog/why-is-my-check-engine-light-on.jpg",
  "transmission-repair": "/images/blog/signs-of-transmission-trouble.jpg",
  "oil-change-preventive-maintenance": "/images/blog/how-often-should-you-get-an-oil-change.jpg",
  "auto-electrical-repair": "/images/blog/common-car-electrical-problems-explained.jpg",
  "suspension-repair": "/images/blog/detroit-potholes-winter-roads-suspension-damage.jpg",
  "wheel-alignment": "/images/blog/why-is-my-car-pulling-to-one-side.jpg",
  "radiator-cooling-system-repair": "/images/blog/why-is-my-car-overheating.jpg",
  "ac-heating-repair": "/images/blog/ac-blowing-warm-air-causes.jpg",
  "starter-alternator-repair": "/images/blog/car-wont-start-battery-starter-or-alternator.jpg",
};

export function getServiceImage(slug: string): string | undefined {
  return serviceImages[slug];
}
