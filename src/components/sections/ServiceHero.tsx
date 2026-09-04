import { CTA } from "@/components/ui/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneIcon } from "@/components/icons";
import { business, type Service } from "@/content/business";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <Section className="bg-white">
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-stretch lg:py-16">
        <div className="space-y-5">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name }]}
          />

          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {service.name} in Detroit, MI
          </h1>

          <div className="max-w-xl space-y-4 text-lg leading-7 text-[var(--color-muted)]">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CTA href={business.phone.href} variant="primary" className="text-base">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}: {business.phone.display}
            </CTA>
            <CTA href="/contact" variant="accent">
              {business.ctas.secondary.label}
            </CTA>
          </div>
        </div>

        <ImagePlaceholder
          label={`${service.name} photo`}
          aspect="none"
          className="h-64 sm:h-80 lg:h-auto lg:min-h-[420px]"
        />
      </Container>
    </Section>
  );
}
