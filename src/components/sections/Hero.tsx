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
    <Section className="relative isolate flex min-h-[calc(100svh-69px)] items-center overflow-hidden bg-white lg:min-h-[calc(100svh-105px)]">
      <Image
        src="/images/hero-shop-exterior.jpg"
        alt={`${business.brandName.value} shop exterior at ${business.address.full}`}
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[center_38%] lg:scale-[1.1] lg:object-[88%_38%] lg:origin-[88%_38%]"
      />

      {/* Mobile/tablet: text spans nearly the full width, so a stronger, more uniform wash keeps it readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.93) 40%, rgba(255,255,255,0.8) 65%, rgba(255,255,255,0.62) 100%)",
        }}
      />

      {/* Desktop: smooth left-to-right fade — solid over the text, clear toward the photo on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.92) 20%, rgba(255,255,255,0.82) 36%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.12) 54%, rgba(255,255,255,0) 62%)",
        }}
      />

      <Container className="relative z-10 w-full py-16 sm:py-20">
        <div className="max-w-xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-md bg-[var(--color-surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            Full-Service Auto Repair · Detroit, MI
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
            Honest Auto Repair for Detroit Drivers
          </h1>

          <p className="text-lg leading-7 text-[var(--color-muted)] sm:text-xl">
            From brakes to transmissions, we diagnose the real problem and fix it right — mechanical repair and maintenance for cars, trucks, and SUVs, all under one roof at 7 Mile and Hoover.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CTA href={business.phone.href} variant="primary" className="text-base">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}: {business.phone.display}
            </CTA>
            <CTA href="/contact" variant="accent">
              {business.ctas.secondary.label}
            </CTA>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
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
