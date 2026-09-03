import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { CheckIcon } from "@/components/icons";
import { business } from "@/content/business";

const FOCUS_POINTS = [
  "Brake, engine, and transmission repair",
  "Diagnostics and check engine light service",
  "Suspension, steering, and alignment",
  "Electrical, cooling, and AC/heating repair",
];

export function About() {
  return (
    <Section id="about" className="bg-[var(--color-surface)] py-14 sm:py-18">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">About the Shop</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">A Full-Service Mechanical Repair Shop on 7 Mile and Hoover</h2>
          <p className="text-lg leading-7 text-[var(--color-muted)]">
            {business.brandName.value} is a full-service auto repair shop serving {business.serviceAreas.value.join(" ")}. We work on cars, trucks, and SUVs,
            handling everything from routine maintenance to more involved mechanical repair.
          </p>
          <CTA href="/about" variant="secondary">
            More About Us
          </CTA>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-7">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-ink)]">What We Focus On</p>
          <ul className="mt-4 space-y-3">
            {FOCUS_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-[var(--color-ink)]">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
