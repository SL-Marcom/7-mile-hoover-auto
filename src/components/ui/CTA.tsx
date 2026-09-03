import Link from "next/link";
import { cn } from "@/lib/cn";

interface CTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  className?: string;
}

export function CTA({
  href,
  children,
  variant = "primary",
  className,
}: CTAProps) {
  const baseClasses =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

  const variants = {
    primary: "bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:bg-[var(--color-primary-hover)]",
    secondary: "border-2 border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ink-foreground)]",
    accent: "border-2 border-[var(--color-accent)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-accent)]",
    ghost: "bg-transparent px-0 text-[var(--color-ink)] hover:opacity-70",
  };

  return (
    <Link href={href} className={cn(baseClasses, variants[variant], className)}>
      {children}
    </Link>
  );
}
