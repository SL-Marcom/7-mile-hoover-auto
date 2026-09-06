import { CTA } from "@/components/ui/CTA";
import { PhoneIcon, MapPinIcon } from "@/components/icons";
import { business } from "@/content/business";

/**
 * Fills the trailing grid cell in the services grid so the layout reads as
 * intentionally complete rather than ending on an empty slot. Same card
 * footprint (rounded-lg, p-5, flex column) as ServiceCard, just styled as
 * a strong CTA instead of a link-out card.
 */
export function ServiceCtaCard() {
  return (
    <div className="flex flex-col rounded-lg bg-[var(--color-primary)] p-5 text-white">
      <h3 className="text-lg font-extrabold leading-tight">Need Auto Repair in Detroit?</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-white/90">
        Call now for a straight answer, or stop by the shop at 7 Mile and Hoover — we&rsquo;re ready to help.
      </p>
      <div className="mt-4 flex flex-col gap-2.5">
        <CTA href={business.phone.href} variant="accent" className="w-full">
          <PhoneIcon className="h-4 w-4" />
          Call Now: {business.phone.display}
        </CTA>
        <a
          href={business.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border-2 border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <MapPinIcon className="h-4 w-4" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
