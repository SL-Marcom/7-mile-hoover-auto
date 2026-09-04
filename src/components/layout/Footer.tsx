import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { PhoneIcon, MapPinIcon, ClockIcon } from "@/components/icons";
import { business } from "@/content/business";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)] text-white/80">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div>
            <p className="font-display text-xl font-extrabold text-white">
              7 Mile <span className="text-[var(--color-accent)]">&amp;</span> Hoover
            </p>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.28em] text-white/50">Auto Services</p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/70">
            Full-service mechanical auto repair for Detroit and nearby communities — brakes, engines, transmissions, diagnostics, and more, all under one roof.
          </p>
          <div className="flex flex-col gap-2 pt-2 text-sm">
            <a href={business.phone.href} className="inline-flex items-center gap-2 font-semibold text-white hover:text-[var(--color-accent)]">
              <PhoneIcon className="h-4 w-4 text-[var(--color-accent)]" />
              {business.phone.display}
            </a>
            <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 hover:text-white">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              {business.address.full}
            </a>
            <p className="inline-flex items-start gap-2">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <span>
                Mon–Fri: 8:30 AM–6:00 PM
                <br />
                Sat: 8:30 AM–3:00 PM
                <br />
                Sun: Closed
              </span>
            </p>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-white">Quick Links</p>
          <nav aria-label="Footer quick links" className="mt-4 flex flex-col gap-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/70 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-white">Our Services</p>
          <nav aria-label="Footer services" className="mt-4 grid grid-cols-1 gap-2.5 text-sm">
            {business.services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="text-white/70 hover:text-white">
                {service.name}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <p>© {year} 7 Mile and Hoover Auto Services. All rights reserved.</p>
            <nav aria-label="Legal" className="flex items-center gap-3">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </nav>
          </div>
          <CTA href={business.phone.href} variant="accent" className="border-white/30 hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]">
            <PhoneIcon className="h-4 w-4" />
            Call Now: {business.phone.display}
          </CTA>
        </Container>
      </div>
    </footer>
  );
}
