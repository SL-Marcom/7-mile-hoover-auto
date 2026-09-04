import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { business } from "@/content/business";

export function Services() {
  return (
    <Section id="services" className="bg-white py-14 sm:py-18">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Our Services</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">Mechanical Repair for Every Part of Your Vehicle</h2>
          </div>
          <CTA href="/services" variant="secondary" className="hidden sm:inline-flex">
            View All Services
          </CTA>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <CTA href="/services" variant="secondary">
            View All Services
          </CTA>
        </div>

        <p className="mt-10 max-w-3xl text-sm text-[var(--color-muted)]">
          We focus on mechanical auto repair and maintenance. We do not perform collision repair, auto body work, painting, or tire sales/replacement.
        </p>
      </Container>
    </Section>
  );
}
