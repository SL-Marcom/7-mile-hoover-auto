import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from "@/content/schema";
import { business, getServiceBySlug, type Service } from "@/content/business";
import { getBlogPostBySlug, getRelatedBlogPosts, blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BlogPostBody } from "@/components/sections/BlogPostBody";
import { BlogCard } from "@/components/sections/BlogCard";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    canonicalUrl: `${business.siteUrl.value}/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => Boolean(s));
  const relatedPosts = getRelatedBlogPosts(post);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const articleSchema = getArticleSchema(post);
  const faqSchema = getFaqSchema(post.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="bg-white">
        <Container className="max-w-3xl space-y-5 py-10 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title }]} />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">{post.category}</p>
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-4xl">
            {post.title}
          </h1>
          <time dateTime={post.publishedAt} className="block text-sm text-[var(--color-muted)]">
            Published {formatDate(post.publishedAt)}
          </time>
          {post.heroImageSrc ? (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
              <Image
                src={post.heroImageSrc}
                alt={post.heroImageLabel}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <ImagePlaceholder label={post.heroImageLabel} aspect="wide" />
          )}
        </Container>
      </Section>

      <BlogPostBody blocks={post.body} />

      {relatedServices.length > 0 && <RelatedServices services={relatedServices} />}

      <FAQ title="Related Questions" items={post.faqs} />

      {relatedPosts.length > 0 && (
        <Section className="bg-white pb-16 sm:pb-20">
          <Container>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              Related Articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection
        title="Need Help With This in Detroit?"
        description="Call now for a straight answer, or request a free quote and we'll follow up."
      />
    </>
  );
}
