import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { ChevronRightIcon, SERVICE_ICONS } from "@/components/icons";
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
          {business.services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-lg border border-[var(--color-border)] p-5 transition hover:border-[var(--color-primary)] hover:shadow-[0_4px_0_0_var(--color-primary)]"
              >
                <Icon className="h-8 w-8 text-[var(--color-primary)]" />
                <h3 className="mt-4 text-base font-bold text-[var(--color-ink)]">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-muted)]">{service.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
                  Learn more
                  <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
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
