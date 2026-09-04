import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/sections/ServiceCard";
import type { Service } from "@/content/business";

export function RelatedServices({ services }: { services: Service[] }) {
  return (
    <Section className="bg-[var(--color-surface)] py-14 sm:py-18">
      <Container>
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">Related Services</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
