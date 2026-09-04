"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Form";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sendContactEmail, type ContactSubmitResult } from "@/lib/forms/sendContactEmail";

interface ContactProps {
  title: string;
  description: string;
}

const initialState: ContactSubmitResult = { success: false };

export function Contact({ title, description }: ContactProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: ContactSubmitResult, formData: FormData) => sendContactEmail(formData),
    initialState,
  );

  return (
    <Section id="contact" className="bg-white py-14 sm:py-18">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Get in Touch</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">{title}</h2>
          <p className="text-lg leading-7 text-[var(--color-muted)]">{description}</p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7"
        >
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" placeholder="Your name" autoComplete="name" required />
          </div>
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div>
            <Label htmlFor="contact-message">What&rsquo;s going on with your vehicle?</Label>
            <Textarea id="contact-message" name="message" placeholder="Tell us about your vehicle and what you're noticing" required />
          </div>

          <Button type="submit" fullWidth disabled={isPending}>
            {isPending ? "Sending…" : "Request a Free Quote"}
          </Button>

          {state.success && (
            <p role="status" className="text-sm font-medium text-emerald-700">
              Thanks — we&rsquo;ve received your message and will follow up soon.
            </p>
          )}
          {!state.success && state.error && (
            <p role="alert" className="text-sm font-medium text-[var(--color-primary)]">
              {state.error}
            </p>
          )}
        </form>
      </Container>
    </Section>
  );
}
