import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

interface TeamProps {
  title: string;
  members: TeamMember[];
}

export function Team({ title, members }: TeamProps) {
  return (
    <Section className="bg-slate-50 py-16 sm:py-20">
      <Container className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <Card key={member.name} variant="elevated" className="space-y-3">
              <div className="h-24 w-24 rounded-full bg-slate-200" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-slate-950">{member.name}</h3>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{member.role}</p>
              <p className="text-sm leading-7 text-slate-600">{member.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
