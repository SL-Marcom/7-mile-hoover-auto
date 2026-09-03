import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { MapPinIcon, ClockIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";

export function LocationHours() {
  return (
    <Section className="bg-white py-14 sm:py-18">
      <Container className="grid gap-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Visit the Shop</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">Serving {business.serviceAreas.value[0]}</h2>

          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
            <div>
              <p className="font-semibold text-[var(--color-ink)]">{business.address.full}</p>
              <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2">
                Get Directions
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <CTA href={business.phone.href} variant="primary">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}
            </CTA>
            <CTA href="/contact" variant="secondary">
              {business.ctas.secondary.label}
            </CTA>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-white p-6">
          <p className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-[var(--color-ink)]">
            <ClockIcon className="h-4 w-4 text-[var(--color-primary)]" />
            Hours
          </p>
          <dl className="mt-4 space-y-2.5 text-sm">
            {business.hours.value.map((entry) => (
              <div key={entry.days} className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5 last:border-none">
                <dt className="text-[var(--color-muted)]">{entry.days}</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{entry.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
