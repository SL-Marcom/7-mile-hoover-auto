import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { ChevronRightIcon } from "@/components/icons";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  items: FAQItem[];
  viewAllHref?: string;
}

export function FAQ({ title, items, viewAllHref }: FAQProps) {
  return (
    <Section className="bg-[var(--color-surface)] py-14 sm:py-18">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">{title}</h2>

        <div className="mt-8 divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-white">
          {items.map((item) => (
            <details key={item.question} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--color-ink)] marker:content-none">
                {item.question}
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-[var(--color-primary)] transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-8">
            <CTA href={viewAllHref} variant="secondary">
              View All FAQs
            </CTA>
          </div>
        )}
      </Container>
    </Section>
  );
}
