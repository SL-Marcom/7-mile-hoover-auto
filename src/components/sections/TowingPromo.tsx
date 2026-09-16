import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { towing } from "@/content/towing";
import { getServiceImage } from "@/content/serviceImages";

export function TowingPromo() {
  const imageSrc = getServiceImage("towing");

  return (
    <Section className="bg-[var(--color-surface)] py-14 sm:py-18">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Towing</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Need a Tow? We&rsquo;ve Got You Covered
          </h2>
          <p className="text-lg leading-7 text-[var(--color-muted)]">{towing.intro[0]}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTA href={business.phone.href} variant="primary">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}: {business.phone.display}
            </CTA>
            <CTA href="/towing" variant="secondary">
              Learn About Towing
            </CTA>
          </div>
        </div>

        {imageSrc ? (
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full lg:min-h-[320px]">
            <Image
              src={imageSrc}
              alt={`Towing at ${business.brandName.value} in Detroit, MI`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder label="Towing photo" aspect="none" className="h-64 sm:h-80 lg:h-full lg:min-h-[320px]" />
        )}
      </Container>
    </Section>
  );
}
