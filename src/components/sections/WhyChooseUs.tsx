import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WrenchIcon, DiagnosticsIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

const POINTS = [
  {
    icon: WrenchIcon,
    title: "Mechanical Repair Focused",
    description: "We concentrate on mechanical auto repair and maintenance — brakes, engines, transmissions, and more — so that's where our attention stays.",
  },
  {
    icon: DiagnosticsIcon,
    title: "Diagnosis Before Repair",
    description: "We identify the actual cause of an issue before recommending work, so you know what you're paying for and why.",
  },
  {
    icon: MapPinIcon,
    title: "Local to Detroit",
    description: "A neighborhood shop on 7 Mile and Hoover, serving Detroit and nearby communities.",
  },
  {
    icon: PhoneIcon,
    title: "Straightforward to Reach",
    description: "Call for a quick answer or request a free quote — no complicated runaround.",
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-[var(--color-ink)] py-14 sm:py-18">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">Why Drivers Choose Us</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">A Straightforward Shop, Built Around Your Vehicle</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <div key={point.title} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <point.icon className="h-7 w-7 text-[var(--color-accent)]" />
              <h3 className="mt-4 text-base font-bold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{point.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
