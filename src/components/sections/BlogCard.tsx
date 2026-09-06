import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ChevronRightIcon } from "@/components/icons";
import type { BlogPost } from "@/content/blog";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition hover:border-[var(--color-primary)] hover:shadow-[0_4px_0_0_var(--color-primary)]"
    >
      <ImagePlaceholder label={post.heroImageLabel} aspect="video" framed={false} className="border-b border-[var(--color-border)]" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">{post.category}</p>
        <h3 className="mt-2 text-base font-bold leading-snug text-[var(--color-ink)]">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-muted)]">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <time dateTime={post.publishedAt} className="text-xs text-[var(--color-muted)]">
            {formatDate(post.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
            Read more
            <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
