import Image from "next/image";
import { CTA } from "@/components/ui/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PhoneIcon, WrenchIcon, DiagnosticsIcon, MapPinIcon } from "@/components/icons";
import { business } from "@/content/business";

/** Mirrors 3 of the 4 points already used (and approved) in WhyChooseUs — no new claims introduced. */
const TRUST_POINTS = [
  { icon: WrenchIcon, label: "Mechanical Repair Focused" },
  { icon: DiagnosticsIcon, label: "Diagnosis Before Repair" },
  { icon: MapPinIcon, label: "Local to Detroit, MI" },
];

/**
 * Header height steps from 69px (mobile nav, no top info bar) to 105px at
 * the lg breakpoint, where the top bar and full desktop nav appear.
 * Subtracting the exact measured height per tier means header + hero always
 * covers exactly the first viewport instead of falling short or overshooting.
 */
export function Hero() {
  return (
    <Section className="relative isolate flex min-h-[calc(100svh-69px)] items-start overflow-hidden bg-white lg:min-h-[calc(100svh-105px)] lg:items-center">
      {/* Mobile/tablet: a dedicated portrait banner with the white text zone already built in, photo below. */}
      <Image
        src="/images/hero-shop-mobile.jpg"
        alt={`${business.brandName.value} shop exterior at ${business.address.full}`}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-top lg:hidden"
      />

      {/* Desktop: full shop photo, shown at its natural cover crop (no extra zoom) to keep it sharp. */}
      <Image
        src="/images/hero-shop-exterior.jpg"
        alt={`${business.brandName.value} shop exterior at ${business.address.full}`}
        fill
        priority
        quality={95}
        sizes="100vw"
        className="hidden object-cover object-[58%_35%] lg:block"
      />

      {/* Desktop: smooth left-to-right fade — solid over the text, clear toward the photo on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 22%, rgba(255,255,255,0.9) 38%, rgba(255,255,255,0.68) 48%, rgba(255,255,255,0.35) 58%, rgba(255,255,255,0) 68%)",
        }}
      />

      <Container className="relative z-10 w-full pt-6 pb-10 sm:pt-14 sm:pb-20 lg:py-20">
        <div className="max-w-xl space-y-3 sm:space-y-6">
          <p className="inline-flex items-center gap-2 rounded-md bg-[var(--color-surface)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary)] sm:py-1.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            Full-Service Auto Repair · Detroit, MI
          </p>

          <h1 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
            Honest Auto Repair for Detroit Drivers
          </h1>

          {/* Shorter subhead on mobile only — the full sentence doesn't fit inside the mobile banner's white zone above the shop photo. */}
          <p className="text-sm leading-5 text-[var(--color-muted)] sm:hidden">
            Mechanical repair and maintenance for cars, trucks, and SUVs — all under one roof at 7 Mile and Hoover.
          </p>
          <p className="hidden text-lg leading-7 text-[var(--color-muted)] sm:block sm:text-xl">
            From brakes to transmissions, we diagnose the real problem and fix it right — mechanical repair and maintenance for cars, trucks, and SUVs, all under one roof at 7 Mile and Hoover.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <CTA href={business.phone.href} variant="primary" className="text-base">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}: {business.phone.display}
            </CTA>
            <CTA href="/contact" variant="accent">
              {business.ctas.secondary.label}
            </CTA>
          </div>

          <ul className="hidden flex-wrap gap-x-6 gap-y-3 pt-2 sm:flex">
            {TRUST_POINTS.map((point) => (
              <li key={point.label} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
                <point.icon className="h-5 w-5 text-[var(--color-primary)]" />
                {point.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
