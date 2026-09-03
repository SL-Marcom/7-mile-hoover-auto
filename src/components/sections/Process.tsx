import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessProps {
  title: string;
  steps: ProcessStep[];
}

export function Process({ title, steps }: ProcessProps) {
  return (
    <Section className="bg-white py-16 sm:py-20">
      <Container className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} variant="elevated" className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
              <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
