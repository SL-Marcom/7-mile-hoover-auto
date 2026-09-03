import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface StatsProps {
  title: string;
  items: Array<{ value: string; label: string }>;
}

export function Stats({ title, items }: StatsProps) {
  return (
    <Section className="bg-slate-950 py-16 text-white sm:py-20">
      <Container className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item.label} variant="bordered" className="border-slate-800 bg-slate-900/70">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm text-slate-300">{item.label}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
