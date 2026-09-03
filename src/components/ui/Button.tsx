import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:bg-[var(--color-primary-hover)]",
    secondary: "border-2 border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ink-foreground)]",
    ghost: "bg-transparent text-[var(--color-ink)] hover:opacity-70",
  };

  const sizes = {
    sm: "min-h-9 px-3 py-2 text-sm",
    md: "min-h-11 px-5 py-3 text-sm",
    lg: "min-h-12 px-6 py-3.5 text-base",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
