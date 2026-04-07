"use client";

import { useState } from "react";

const subjectOptions = [
  "General Enquiry",
  "Litigation & Dispute Resolution",
  "Corporate & Commercial Advisory",
  "Energy, Oil & Gas",
  "Regulatory & Public Law",
  "Publications & Media",
  "Other",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""), // honeypot
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Unable to reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/15">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M5 13l4 4L19 7"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-serif text-3xl font-semibold text-[var(--foreground)]">
          Message received
        </h3>
        <p className="text-base leading-7 text-[var(--muted)]">
          Thank you for reaching out. A member of the firm will respond within
          one business day.
        </p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
      <div className="space-y-2">
        <p className="eyebrow">Send a Message</p>
        <p className="text-base leading-7 text-[var(--muted)]">
          Complete the form below and a member of the firm will be in touch.
        </p>
      </div>

      {/* Honeypot field — hidden from real users, bots tend to fill it. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Full Name
          </span>
          <input
            type="text"
            name="name"
            required
            disabled={isSubmitting}
            placeholder="Your full name"
            className="form-input"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Email Address
          </span>
          <input
            type="email"
            name="email"
            required
            disabled={isSubmitting}
            placeholder="you@example.com"
            className="form-input"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Phone Number
          </span>
          <input
            type="tel"
            name="phone"
            disabled={isSubmitting}
            placeholder="+234 800 000 0000"
            className="form-input"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Subject
          </span>
          <select name="subject" required disabled={isSubmitting} className="form-input">
            <option value="">Select a subject</option>
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-[var(--foreground)]">
          Message
        </span>
        <textarea
          name="message"
          required
          disabled={isSubmitting}
          rows={5}
          placeholder="Briefly describe your legal matter or enquiry..."
          className="form-input resize-none"
        />
      </label>

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
