import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Professional text-based wordmark treatment — no icon/logo mark yet, per
 * approved design direction. Two-line lockup so the full business name
 * stays readable at header size.
 */
export function Logo({ className, variant = "dark" }: LogoProps) {
  const primaryColor = variant === "dark" ? "text-[var(--color-ink)]" : "text-white";
  const accentColor = "text-[var(--color-primary)]";

  return (
    <Link href="/" className={cn("flex flex-col leading-none", className)} aria-label="7 Mile and Hoover Auto Services — Home">
      <span className={cn("font-display text-lg font-extrabold tracking-tight sm:text-xl", primaryColor)}>
        7 Mile <span className={accentColor}>&amp;</span> Hoover
      </span>
      <span className={cn("mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.28em]", variant === "dark" ? "text-[var(--color-muted)]" : "text-white/70")}>
        Auto Services
      </span>
    </Link>
  );
}
