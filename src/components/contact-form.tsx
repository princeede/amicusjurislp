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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="card space-y-6"
    >
      <div className="space-y-2">
        <p className="eyebrow">Send a Message</p>
        <p className="text-base leading-7 text-[var(--muted)]">
          Complete the form below and a member of the firm will be in touch.
        </p>
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
            placeholder="+234 800 000 0000"
            className="form-input"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Subject
          </span>
          <select name="subject" required className="form-input">
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
          rows={5}
          placeholder="Briefly describe your legal matter or enquiry..."
          className="form-input resize-none"
        />
      </label>

      <button type="submit" className="button-primary w-full sm:w-auto">
        Submit Enquiry
      </button>
    </form>
  );
}
