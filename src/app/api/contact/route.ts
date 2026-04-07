import { NextResponse } from "next/server";
import { Resend } from "resend";

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const phone = payload.phone?.trim() ?? "";
  const subject = payload.subject!.trim();
  const message = payload.message!.trim();

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #132027;">
      <h2 style="font-family: Georgia, serif; color: #132027;">New enquiry from the website</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px 0; color: #6f7c83; width: 110px;"><strong>Name</strong></td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6f7c83;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding: 8px 0; color: #6f7c83;"><strong>Phone</strong></td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #6f7c83;"><strong>Subject</strong></td><td style="padding: 8px 0;">${escapeHtml(subject)}</td></tr>
      </table>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
        <p style="color: #6f7c83; margin: 0 0 8px;"><strong>Message</strong></p>
        <p style="white-space: pre-wrap; line-height: 1.7;">${escapeHtml(message)}</p>
      </div>
      <p style="margin-top: 32px; font-size: 12px; color: #6f7c83;">Sent from the Amicus Juris LP contact form.</p>
    </div>
  `;

  const text = `New enquiry from the website

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}Subject: ${subject}

${message}
`;

  try {
    const result = await resend.emails.send({
      from: `Amicus Juris Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Website Enquiry] ${subject}`,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 },
      );
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
