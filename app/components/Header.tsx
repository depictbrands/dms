"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Case Studies", href: "#case-studies" },
  { label: "Our Services", href: "#services" },
  { label: "Our Process", href: "#process" },
];

const CTA = { label: "Book a Consultation", href: "#contact" };

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-white">
      <div className="flex h-[126px] items-center justify-between px-5 md:px-[50px]">
        <Link href="/" aria-label="DMS Consulting — home" className="shrink-0">
          <Image
            src="/dms-logo.jpg"
            alt="DMS Consulting"
            width={356}
            height={70}
            priority
            className="h-[50px] w-auto object-contain md:h-[70px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] leading-[25.2px] uppercase whitespace-nowrap text-ink-muted transition-colors hover:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={CTA.href}
            className="flex h-[41px] items-center justify-center rounded-full bg-blue px-6 py-1 text-[14px] leading-[1.15] tracking-[-0.3125px] whitespace-nowrap text-white transition-opacity hover:opacity-90"
          >
            {CTA.label}
          </Link>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center text-blue lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-[7px] rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-hairline px-5 pb-6 pt-4 lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] leading-[25.2px] uppercase text-ink-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={CTA.href}
            onClick={() => setOpen(false)}
            className="mt-6 flex h-[41px] w-full items-center justify-center rounded-full bg-blue px-6 text-[14px] tracking-[-0.3125px] text-white"
          >
            {CTA.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
