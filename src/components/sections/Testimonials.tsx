import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialsProps {
  title: string;
  items: TestimonialItem[];
}

export function Testimonials({ title, items }: TestimonialsProps) {
  return (
    <Section className="bg-slate-50 py-16 sm:py-20">
      <Container className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.name} variant="elevated" className="space-y-3">
              <p className="text-sm leading-7 text-slate-700">“{item.quote}”</p>
              <div>
                <p className="font-semibold text-slate-950">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
