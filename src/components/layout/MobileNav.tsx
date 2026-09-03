"use client";

import { useState } from "react";
import Link from "next/link";
import { CTA } from "@/components/ui/CTA";
import { MenuIcon, CloseIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <div id="mobile-nav-panel" className="absolute inset-x-0 top-full border-t border-[var(--color-border)] bg-white shadow-lg">
          <nav aria-label="Mobile" className="flex flex-col px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-border)] py-3 text-base font-medium text-[var(--color-ink)] last:border-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-4 pb-6">
            <CTA href={business.phone.href} variant="primary" className="w-full">
              <PhoneIcon className="h-4 w-4" />
              {business.ctas.primary.label}
            </CTA>
            <CTA href="/contact" variant="accent" className="w-full">
              {business.ctas.secondary.label}
            </CTA>
          </div>
        </div>
      )}
    </div>
  );
}
