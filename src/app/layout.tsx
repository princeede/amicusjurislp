import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import {
  brandName,
  contactDetails,
  domainName,
  firmDescriptionShort,
  siteNavigation,
} from "@/lib/site-data";
import { NavLink } from "@/components/nav-link";
import { MobileNav } from "@/components/mobile-nav";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domainName}`),
  title: {
    default: `${brandName} | Business, Litigation and Regulatory Lawyers in Nigeria`,
    template: `%s | ${brandName}`,
  },
  description:
    "Amicus Juris LP is a Nigerian law firm advising on litigation, corporate and commercial law, public law, regulatory matters, and emerging sectors including energy, technology, and oil and gas.",
  keywords: [
    "Amicus Juris LP",
    "law firm in Nigeria",
    "lawyers in Nigeria",
    "business lawyers Nigeria",
    "commercial law Nigeria",
    "litigation lawyers Nigeria",
    "oil and gas lawyers Nigeria",
    "regulatory lawyers Nigeria",
  ],
  alternates: {
    canonical: `https://${domainName}`,
  },
  openGraph: {
    title: `${brandName} | Lawyers in Nigeria`,
    description: firmDescriptionShort,
    type: "website",
    locale: "en_GB",
    siteName: brandName,
    url: `https://${domainName}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="site-shell">
          <header className="border-b border-[var(--border-soft)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
              <Link href="/" className="block max-w-[24rem]">
                <Image
                  src="/brand/amicus-logo-black.png"
                  alt={`${brandName} logo`}
                  width={1664}
                  height={768}
                  className="h-auto w-full object-contain"
                  priority
                />
              </Link>
              <nav className="hidden flex-wrap gap-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-strong)] lg:flex">
                {siteNavigation.map((item) => (
                  <NavLink key={item.href} href={item.href}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <MobileNav items={siteNavigation} />
            </div>
          </header>
          {children}
          <footer className="border-t border-[var(--border-soft)]">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 lg:px-12">
              <div className="space-y-4">
                <Link href="/" className="block max-w-[20rem]">
                  <Image
                    src="/brand/amicus-logo-black.png"
                    alt={`${brandName} logo`}
                    width={1664}
                    height={768}
                    className="h-auto w-full object-contain"
                  />
                </Link>
                <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
                  {firmDescriptionShort}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <p className="eyebrow">Navigate</p>
                  <div className="space-y-2 text-sm leading-7 text-[var(--muted)]">
                    {siteNavigation.map((item) => (
                      <p key={item.href}>
                        <Link
                          href={item.href}
                          className="transition hover:text-[var(--foreground)]"
                        >
                          {item.label}
                        </Link>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="eyebrow">Contact</p>
                  <div className="space-y-2 text-sm leading-7 text-[var(--muted)]">
                    <p>{contactDetails.email}</p>
                    <p>{contactDetails.phone}</p>
                    <p>{contactDetails.address}</p>
                    <p>{contactDetails.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-[var(--border-soft)]">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-xs leading-5 text-[var(--muted-strong)] md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
                <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
                <p>Barristers and Solicitors &middot; Legal Practitioners in Nigeria</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
