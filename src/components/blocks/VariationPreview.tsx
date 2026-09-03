import { createDesignRecipe } from "@/lib/variation-engine";

interface VariationPreviewProps {
  seed?: number;
}

export function VariationPreview({ seed = 1 }: VariationPreviewProps) {
  const recipe = createDesignRecipe(seed);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Variation engine</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Recipe #{seed}</h2>
      <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        {Object.entries(recipe).map(([key, value]) => (
          <li key={key} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="font-medium text-slate-950">{key}:</span> {value}
          </li>
        ))}
      </ul>
    </section>
  );
}
