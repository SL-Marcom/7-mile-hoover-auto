import { VariationPreview } from "@/components/blocks/VariationPreview";

interface VariationGridProps {
  count?: number;
}

export function VariationGrid({ count = 4 }: VariationGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {Array.from({ length: count }, (_, index) => (
        <VariationPreview key={index + 1} seed={index + 1} />
      ))}
    </div>
  );
}
