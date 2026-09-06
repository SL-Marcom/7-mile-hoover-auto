import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ChevronRightIcon } from "@/components/icons";
import type { BlogBlock } from "@/content/blog";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <Section className="bg-white py-4 sm:py-6">
      <Container className="max-w-3xl space-y-5">
        {blocks.map((block, index) => {
          switch (block.type) {
            case "p":
              return (
                <p key={index} className="text-base leading-7 text-[var(--color-muted)]">
                  {block.text}
                </p>
              );
            case "h2":
              return (
                <h2
                  key={index}
                  id={slugify(block.text)}
                  className="pt-4 text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl"
                >
                  {block.text}
                </h2>
              );
            case "h3":
              return (
                <h3 key={index} id={slugify(block.text)} className="pt-2 text-xl font-bold text-[var(--color-ink)]">
                  {block.text}
                </h3>
              );
            case "ul":
              return (
                <ul key={index} className="space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-7 text-[var(--color-muted)]">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case "image":
              return <ImagePlaceholder key={index} label={block.label} aspect="video" className="my-2" />;
            case "link":
              return (
                <Link
                  key={index}
                  href={block.href}
                  className="flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)]"
                >
                  {block.text}
                  <ChevronRightIcon className="h-4 w-4 shrink-0" />
                </Link>
              );
            default:
              return null;
          }
        })}
      </Container>
    </Section>
  );
}
