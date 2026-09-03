import { cn } from "@/lib/cn";

interface CardProps {
  variant?: "default" | "elevated" | "bordered";
  className?: string;
  children: React.ReactNode;
}

export function Card({ variant = "default", className, children }: CardProps) {
  const variants = {
    default: "rounded-2xl border border-slate-200 bg-white",
    elevated: "rounded-2xl border border-slate-200 bg-white shadow-sm",
    bordered: "rounded-2xl border border-slate-300 bg-slate-50",
  };

  return <div className={cn("p-6", variants[variant], className)}>{children}</div>;
}
