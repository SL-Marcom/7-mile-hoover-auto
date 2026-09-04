import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/icons";
import type { Service } from "@/content/business";

export function ServiceDetails({ service }: { service: Service }) {
  return (
    <Section className="bg-[var(--color-surface)] py-14 sm:py-18">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold text-[var(--color-ink)] sm:text-2xl">Common Signs You May Need {service.name}</h2>
          <ul className="mt-5 space-y-3">
            {service.signs.map((sign) => (
              <li key={sign} className="flex items-start gap-3 text-sm leading-6 text-[var(--color-ink)]">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                {sign}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold text-[var(--color-ink)] sm:text-2xl">What&rsquo;s Included</h2>
          <ul className="mt-5 space-y-3">
            {service.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--color-ink)]">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
