import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface GalleryProps {
  title: string;
  items: Array<{ title: string; description: string }>;
}

export function Gallery({ title, items }: GalleryProps) {
  return (
    <Section className="bg-white py-16 sm:py-20">
      <Container className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} variant="elevated" className="space-y-3">
              <div className="h-36 rounded-2xl bg-slate-200" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
