import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { LocationHours } from "@/components/sections/LocationHours";
import { CTASection } from "@/components/sections/CTASection";
import { CheckIcon } from "@/components/icons";
import { business } from "@/content/business";

export const metadata: Metadata = createMetadata({
  title: `About Us | ${business.brandName.value}`,
  description: `Learn about ${business.brandName.value}, a full-service mechanical auto repair shop at ${business.address.full}, serving Detroit and nearby communities.`,
  canonicalUrl: `${business.siteUrl.value}/about`,
});

const FOCUS_POINTS = [
  "Brake, engine, and transmission repair",
  "Check engine light and diagnostic service",
  "Suspension, steering, and wheel alignment",
  "Electrical, cooling, and AC/heating repair",
  "Oil changes and preventive maintenance",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Shop"
        title="About 7 Mile and Hoover Auto Services"
        breadcrumbLabel="About Us"
        description={`${business.brandName.value} is a full-service mechanical auto repair shop at ${business.address.full}, serving ${business.serviceAreas.value.join(" ")}. We work on cars, trucks, and SUVs, handling everything from routine maintenance to more involved mechanical repair.`}
      />

      <section className="bg-[var(--color-surface)] py-14 sm:py-18">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-7">
            <h2 className="text-xl font-bold text-[var(--color-ink)] sm:text-2xl">What We Focus On</h2>
            <ul className="mt-5 space-y-3">
              {FOCUS_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-[var(--color-ink)]">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 sm:p-7">
            <h2 className="text-xl font-bold text-[var(--color-ink)] sm:text-2xl">What We Don&rsquo;t Do</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              We focus on mechanical auto repair and maintenance. To keep that focus, we don&rsquo;t offer:
            </p>
            <ul className="mt-4 space-y-3">
              {business.exclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--color-ink)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-muted)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Our Approach</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Diagnosis Before Repair
          </h2>
          <p className="text-lg leading-7 text-[var(--color-muted)]">
            Before recommending any work, we identify the actual cause of the issue and explain what we find in plain
            language. Our goal is for you to understand what your vehicle needs and why, so you can make an informed
            decision about the next step.
          </p>
        </div>
      </section>

      <LocationHours />

      <CTASection
        title="Have a Question About Your Vehicle?"
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
