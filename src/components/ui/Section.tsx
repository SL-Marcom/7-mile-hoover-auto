import { cn } from "@/lib/cn";

interface SectionProps {
  as?: "section" | "div";
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  as: Component = "section",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <Component id={id} className={cn("w-full", className)}>
      {children}
    </Component>
  );
}
