import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/content/business";

export function ServiceWhyTimely({ service }: { service: Service }) {
  return (
    <Section className="bg-white py-14 sm:py-18">
      <Container className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Why It Matters</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">
          Why Timely {service.name} Matters
        </h2>
        <p className="text-lg leading-7 text-[var(--color-muted)]">{service.whyTimelyMatters}</p>
      </Container>
    </Section>
  );
}
