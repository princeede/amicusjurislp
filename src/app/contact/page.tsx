import type { Metadata } from "next";
import { brandName, contactDetails } from "@/lib/site-data";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Amicus Juris LP for consultations, litigation, commercial advisory, and regulatory support in Nigeria.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 md:px-10 lg:px-12">
      <section className="grid gap-8 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-10 md:px-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">
            Contact {brandName} for legal advisory and representation in Nigeria.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            Reach out to discuss your legal matter. The firm offers consultations across litigation, commercial advisory, regulatory support, and emerging sectors.
          </p>
        </div>
        <div className="card space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
              Email
            </p>
            <p className="mt-2 text-lg leading-8 text-[var(--foreground)]">
              {contactDetails.email}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
              Phone
            </p>
            <div className="mt-2 space-y-1 text-base leading-7 text-[var(--foreground)]">
              {contactDetails.phones.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
              Website
            </p>
            <p className="mt-2 text-lg leading-8 text-[var(--foreground)]">
              {contactDetails.website}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="eyebrow">Our Offices</p>
          <h2 className="section-title max-w-3xl">
            Three locations across Nigeria.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {contactDetails.offices.map((office) => (
            <article key={office.name} className="card space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                {office.name}
              </p>
              <p className="text-base leading-7 text-[var(--muted)]">
                {office.address}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
