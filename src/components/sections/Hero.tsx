import Image from "next/image";
import { CTA } from "@/components/ui/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PhoneIcon, CheckIcon } from "@/components/icons";
import { business } from "@/content/business";

const QUICK_SERVICES = ["Brakes", "Engine", "Transmission", "Diagnostics", "Suspension", "AC & Heating"];

export function Hero() {
  return (
    <Section className="bg-white">
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:items-stretch lg:py-20">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-md bg-[var(--color-surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            Full-Service Auto Repair · Detroit, MI
          </p>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Honest Auto Repair for Detroit Drivers
          </h1>

          <p className="max-w-xl text-lg leading-7 text-[var(--color-muted)]">
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

          <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
            {QUICK_SERVICES.map((service) => (
              <li key={service} className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]">
                <CheckIcon className="h-4 w-4 text-[var(--color-primary)]" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-auto lg:min-h-[420px]">
          <Image
            src="/images/hero-shop-exterior.jpg"
            alt={`${business.brandName.value} shop exterior at ${business.address.full}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </Section>
  );
}
