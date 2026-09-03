import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { PhoneIcon, ClockIcon, MapPinIcon } from "@/components/icons";
import { business } from "@/content/business";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="hidden bg-[var(--color-ink)] text-white md:block">
        <Container className="flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              {business.address.full}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              Mon–Fri 8:30–6:00 · Sat 8:30–3:00 · Sun Closed
            </span>
          </div>
          <a href={business.phone.href} className="inline-flex items-center gap-1.5 font-semibold hover:text-[var(--color-accent)]">
            <PhoneIcon className="h-3.5 w-3.5" />
            {business.phone.display}
          </a>
        </Container>
      </div>

      <div className="relative border-b border-[var(--color-border)]">
        <Container className="flex items-center justify-between py-3">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-[var(--color-ink)] transition hover:text-[var(--color-primary)]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <CTA href={business.phone.href} variant="primary">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}
            </CTA>
            <CTA href="/contact" variant="accent">
              {business.ctas.secondary.label}
            </CTA>
          </div>

          <MobileNav links={NAV_LINKS} />
        </Container>
      </div>
    </header>
  );
}
