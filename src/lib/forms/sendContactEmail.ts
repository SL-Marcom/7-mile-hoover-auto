"use server";

import { Resend } from "resend";
import { business } from "@/content/business";

export interface ContactSubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Sends a contact-form submission via Resend. Requires RESEND_API_KEY,
 * CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL to be set in the environment —
 * see .env.example. If any are missing this returns a clear "not
 * configured" error instead of attempting to send, rather than failing
 * silently or claiming success.
 */
export async function sendContactEmail(formData: FormData): Promise<ContactSubmitResult> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !email || !message) {
    return { success: false, error: "Please fill in your name, phone number, email, and a short message before sending." };
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 7) {
    return { success: false, error: "Please enter a valid phone number." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      success: false,
      error: `Something went wrong sending your message. Please call us at ${business.phone.display} instead.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      ...(email ? { replyTo: email } : {}),
      subject: `New Quote Request — ${business.brandName.value}`,
      text: [
        `New quote request from the ${business.brandName.value} website.`,
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      return {
        success: false,
        error: `Something went wrong sending your message. Please call us at ${business.phone.display} instead.`,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: `Something went wrong sending your message. Please call us at ${business.phone.display} instead.`,
    };
  }
}
