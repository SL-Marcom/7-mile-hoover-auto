import Link from "next/link";
import { ChevronRightIcon, SERVICE_ICONS } from "@/components/icons";
import type { Service } from "@/content/business";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-lg border border-[var(--color-border)] bg-white p-5 transition hover:border-[var(--color-primary)] hover:shadow-[0_4px_0_0_var(--color-primary)]"
    >
      <Icon className="h-8 w-8 text-[var(--color-primary)]" />
      <h3 className="mt-4 text-base font-bold text-[var(--color-ink)]">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-muted)]">{service.shortDescription}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
        Learn more
        <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
