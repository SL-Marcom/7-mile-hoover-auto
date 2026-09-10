import { CTA } from "@/components/ui/CTA";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StarIcon } from "@/components/icons";
import { reviews, readAllReviewsUrl, leaveReviewUrl } from "@/content/reviews";

export function Reviews() {
  return (
    <Section className="bg-[var(--color-primary)] py-14 sm:py-20">
      <Container className="space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/80">Customer Reviews</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">What Customers Are Saying</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.name} variant="elevated" className="flex h-full flex-col gap-4">
              <div className="flex gap-0.5 text-[var(--color-accent)]" aria-hidden="true">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-7 text-[var(--color-muted)]">&ldquo;{review.quote}&rdquo;</p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-[var(--color-ink)]">{review.name}</p>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2"
                >
                  View on Google
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href={readAllReviewsUrl} variant="light" external>
            Read All Reviews
          </CTA>
          <CTA href={leaveReviewUrl} variant="lightOutline" external>
            Leave A Review
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
