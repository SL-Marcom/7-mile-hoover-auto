import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label, Textarea } from "@/components/ui/Form";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface ContactProps {
  title: string;
  description: string;
}

export function Contact({ title, description }: ContactProps) {
  return (
    <Section id="contact" className="bg-slate-50 py-16 sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="text-lg text-slate-600">{description}</p>
        </div>
        <Card variant="elevated" className="space-y-4">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" placeholder="Your name" />
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" type="email" placeholder="you@example.com" />
          <Label htmlFor="contact-message">Message</Label>
          <Textarea id="contact-message" placeholder="Tell us about your project" />
          <Button type="button">Send message</Button>
        </Card>
      </Container>
    </Section>
  );
}
