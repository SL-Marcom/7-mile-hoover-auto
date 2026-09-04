import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumbLabel, children }: PageHeroProps) {
  return (
    <Section className="bg-white">
      <Container className="max-w-3xl space-y-5 py-10 sm:py-14">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: breadcrumbLabel }]} />
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">{eyebrow}</p>}
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">{title}</h1>
        {description && <p className="text-lg leading-7 text-[var(--color-muted)]">{description}</p>}
        {children}
      </Container>
    </Section>
  );
}
