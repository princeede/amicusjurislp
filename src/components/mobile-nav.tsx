"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/nav-link";

type MobileNavProps = {
  items: { href: string; label: string }[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className="lg:hidden">
      <button
        onClick={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-white/60 transition hover:bg-white/90"
      >
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          className="text-[var(--foreground)]"
        >
          <rect
            y={open ? "6" : "0"}
            width="18"
            height="2"
            rx="1"
            fill="currentColor"
            style={{
              transition: "transform 200ms ease, y 200ms ease",
              transformOrigin: "center",
              transform: open ? "rotate(45deg)" : "none",
            }}
          />
          <rect
            y="6"
            width="18"
            height="2"
            rx="1"
            fill="currentColor"
            style={{
              transition: "opacity 150ms ease",
              opacity: open ? 0 : 1,
            }}
          />
          <rect
            y={open ? "6" : "12"}
            width="18"
            height="2"
            rx="1"
            fill="currentColor"
            style={{
              transition: "transform 200ms ease, y 200ms ease",
              transformOrigin: "center",
              transform: open ? "rotate(-45deg)" : "none",
            }}
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-[var(--foreground)]/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 right-0 z-40 flex h-full w-72 flex-col gap-1 overflow-y-auto bg-[var(--background)] px-6 pb-10 pt-24 shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] text-[var(--muted-strong)]"
          >
            {item.label}
          </NavLink>
        ))}
        <div className="mt-auto pt-8">
          <NavLink
            href="/contact"
            onClick={() => setOpen(false)}
            className="button-primary w-full text-center"
          >
            Contact the Firm
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
