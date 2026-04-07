import type { Metadata } from "next";
import Image from "next/image";
import {
  brandName,
  firmDescriptionLong,
  firmMission,
  firmValues,
  firmVision,
  teamMembers,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Amicus Juris LP, a partnership of Barristers and Solicitors in Nigeria with broad litigation, advisory, and regulatory capability.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12 md:px-10 lg:px-12">
      <section className="grid gap-8 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-10 md:px-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          <p className="eyebrow">About The Firm</p>
          <h1 className="section-title">
            {brandName} is a distinguished partnership of Barristers and Solicitors in Nigeria.
          </h1>
        </div>
        <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
          {firmDescriptionLong.slice(0, 2).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="card">
          <p className="eyebrow">Vision</p>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {firmVision}
          </p>
        </article>
        <article className="card">
          <p className="eyebrow">Mission</p>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {firmMission}
          </p>
        </article>
      </section>

      <section className="card space-y-5">
        <p className="eyebrow">Values</p>
        <h2 className="section-title max-w-3xl">
          Values that shape the firm&apos;s professional culture.
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {firmValues.map((value) => (
            <div
              key={value}
              className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white/70 px-5 py-4 text-base leading-7 text-[var(--foreground)]"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
              {value}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Our People</p>
          <h2 className="section-title max-w-3xl">
            Meet the partners and lawyers leading the firm.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
            The firm is led by experienced partners with multi-jurisdictional expertise and a record of delivering practical, business-aware legal counsel.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.slug}
              className="card grid gap-5 sm:grid-cols-[auto_1fr]"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)]">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="font-serif text-2xl font-semibold leading-tight text-[var(--foreground)]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {member.role}
                  </p>
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  {member.bio[0]}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {member.expertise.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border-soft)] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-strong)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
