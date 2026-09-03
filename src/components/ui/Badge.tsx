import { cn } from "@/lib/cn";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  const variants = {
    default: "border-slate-300 bg-slate-100 text-slate-800",
    success: "border-emerald-300 bg-emerald-50 text-emerald-800",
    warning: "border-amber-300 bg-amber-50 text-amber-800",
    info: "border-sky-300 bg-sky-50 text-sky-800",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
