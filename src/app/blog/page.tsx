import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/sections/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/content/business";
import { getSortedBlogPosts } from "@/content/blog";

export const metadata: Metadata = createMetadata({
  title: `Auto Repair Blog | ${business.brandName.value}`,
  description:
    "Answers to common auto repair questions for Detroit drivers — check engine lights, brakes, starting problems, cooling, transmission, suspension, and more.",
  canonicalUrl: `${business.siteUrl.value}/blog`,
});

export default function BlogPage() {
  const posts = getSortedBlogPosts();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Section className="bg-white">
        <Container className="max-w-3xl space-y-5 py-10 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Blog</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Auto Repair Answers for Detroit Drivers
          </h1>
          <p className="text-lg leading-7 text-[var(--color-muted)]">
            Straightforward answers to common questions about check engine lights, brakes, starting problems, and
            more — written for drivers in Detroit and nearby communities.
          </p>
        </Container>
      </Section>

      <Section className="bg-white pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Need Help With Something Specific?"
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
