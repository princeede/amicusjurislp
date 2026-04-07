import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { ContactNotificationEmail } from "@/emails/contact-notification";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";

export const runtime = "nodejs";

// Very small in-memory rate limiter. Sufficient for low-volume contact
// forms on a single serverless instance. Swap for Upstash Redis if the
// firm starts seeing abuse or needs a shared limit across regions.
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 3;
const hits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot
};

function validate(payload: ContactPayload): string | null {
  if (payload.company) return "Spam detected.";
  if (!payload.name || payload.name.trim().length < 2) return "Please provide your full name.";
  if (!payload.email || !EMAIL_RE.test(payload.email)) return "Please provide a valid email address.";
  if (!payload.subject || payload.subject.trim().length === 0) return "Please select a subject.";
  if (!payload.message || payload.message.trim().length < 10) return "Please include a short message (at least 10 characters).";
  if (payload.message.length > 5000) return "Message is too long.";
  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact form: missing environment variables");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const name = payload.name!.trim();
  const email = payload.email!.trim();
  const phone = payload.phone?.trim() || undefined;
  const subject = payload.subject!.trim();
  const message = payload.message!.trim();

  // Render the branded React Email templates to HTML + plain-text.
  const [notificationHtml, notificationText, confirmationHtml, confirmationText] =
    await Promise.all([
      render(
        ContactNotificationEmail({ name, email, phone, subject, message }),
      ),
      render(
        ContactNotificationEmail({ name, email, phone, subject, message }),
        { plainText: true },
      ),
      render(ContactConfirmationEmail({ name, subject, message })),
      render(ContactConfirmationEmail({ name, subject, message }), {
        plainText: true,
      }),
    ]);

  try {
    // Send the firm notification first; this is the email we cannot lose.
    const notification = await resend.emails.send({
      from: `Amicus Juris Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Website Enquiry] ${subject}`,
      html: notificationHtml,
      text: notificationText,
    });

    if (notification.error) {
      console.error("Resend notification error:", notification.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 },
      );
    }

    // Send the auto-reply confirmation to the enquirer. If this fails we
    // still consider the submission successful — the firm has the lead.
    const confirmation = await resend.emails.send({
      from: `Amicus Juris LP <${fromEmail}>`,
      to: [email],
      replyTo: toEmail,
      subject: "We've received your enquiry — Amicus Juris LP",
      html: confirmationHtml,
      text: confirmationText,
    });

    if (confirmation.error) {
      console.error("Resend confirmation error:", confirmation.error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
