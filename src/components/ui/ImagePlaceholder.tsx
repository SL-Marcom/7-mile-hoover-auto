import { cn } from "@/lib/cn";
import { ImageIcon } from "@/components/icons";

interface ImagePlaceholderProps {
  /** Describes what photo belongs here, e.g. "Brake pad replacement in progress". */
  label: string;
  /**
   * Aspect ratio for the placeholder box. Use "none" when the parent controls
   * height directly (e.g. via explicit breakpoint heights) instead of an
   * aspect-ratio class.
   */
  aspect?: "video" | "square" | "wide" | "portrait" | "none";
  className?: string;
}

const ASPECT_CLASSES: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  none: "",
};

/**
 * Fixed-dimension placeholder standing in for a real photo. Keeping the same
 * rounded, bordered container size now means dropping in a real <Image fill>
 * later won't shift surrounding layout.
 */
export function ImagePlaceholder({ label, aspect = "video", className }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center",
        ASPECT_CLASSES[aspect],
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="h-8 w-8 text-[var(--color-muted)]" />
        <p className="text-sm font-semibold text-[var(--color-ink)]">{label}</p>
        <p className="text-xs text-[var(--color-muted)]">Image placeholder — photo to be added</p>
      </div>
    </div>
  );
}
