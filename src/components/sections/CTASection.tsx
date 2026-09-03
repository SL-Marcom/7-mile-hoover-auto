import { CTA } from "@/components/ui/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";

interface CTASectionProps {
  title: string;
  description: string;
}

export function CTASection({ title, description }: CTASectionProps) {
  return (
    <Section className="bg-[var(--color-primary)] py-14 sm:py-18">
      <Container className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-2 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          <p className="text-lg text-white/85">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href={business.phone.href} variant="accent" className="border-white bg-white text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]">
            <PhoneIcon className="h-4 w-4" />
            {business.ctas.primary.label}
          </CTA>
          <CTA href="/contact" variant="secondary" className="border-white text-white hover:bg-white hover:text-[var(--color-primary)]">
            {business.ctas.secondary.label}
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
