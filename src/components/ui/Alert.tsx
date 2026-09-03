import { cn } from "@/lib/cn";

interface AlertProps {
  variant?: "info" | "success" | "warning";
  className?: string;
  children: React.ReactNode;
}

export function Alert({ variant = "info", className, children }: AlertProps) {
  const variants = {
    info: "border-sky-300 bg-sky-50 text-sky-900",
    success: "border-emerald-300 bg-emerald-50 text-emerald-900",
    warning: "border-amber-300 bg-amber-50 text-amber-900",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-3 text-sm", variants[variant], className)}>
      {children}
    </div>
  );
}
