export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string[];
}

export function createMetadata({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  keywords,
}: SeoMetadata) {
  return {
    title,
    description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: twitterTitle ?? ogTitle ?? title,
      description: twitterDescription ?? ogDescription ?? description,
      images: twitterImage ? [twitterImage] : ogImage ? [ogImage] : undefined,
    },
    keywords,
  };
}
