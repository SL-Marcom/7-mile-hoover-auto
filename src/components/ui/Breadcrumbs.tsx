import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

export interface BreadcrumbLink {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbLink[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRightIcon className="h-3.5 w-3.5" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--color-primary)]">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-[var(--color-ink)]">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
