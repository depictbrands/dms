import Image from "next/image";
import Link from "next/link";

import { getSiteSettings } from "@/sanity/lib/queries";

import ContactForm from "./ContactForm";

const QUICK_LINKS = [
  { label: "Case Study", href: "#case-studies" },
  { label: "Our Services", href: "#services" },
  { label: "Our Process", href: "#process" },
];

/** Used until the fields are filled in Sanity → Site Settings. */
const FALLBACK_DESCRIPTION =
  "DMS is a Boston operations management firm for businesses, nonprofits, and agencies ready to scale.";

const SOCIAL_ICONS = [
  { key: "facebook", label: "Facebook", src: "/footer/facebook.svg", width: 29 },
  { key: "instagram", label: "Instagram", src: "/footer/instagram.svg", width: 35 },
  { key: "linkedin", label: "LinkedIn", src: "/footer/linkedin.svg", width: 36 },
] as const;

export default async function Footer() {
  const settings = await getSiteSettings();
  const description = settings?.footerDescription || FALLBACK_DESCRIPTION;
  const socials = SOCIAL_ICONS.map((icon) => ({
    ...icon,
    href: settings?.social?.[icon.key] ?? undefined,
  }));

  return (
    <footer className="bg-base-black text-white">
      <div className="grid gap-12 px-5 py-14 md:px-[50px] lg:grid-cols-[517fr_437fr_588fr] lg:gap-0 lg:pt-16 lg:pr-[127px] lg:pb-[30px] lg:pl-[59px]">
        <div data-reveal className="flex flex-col gap-[34px]">
          <Link href="/" aria-label="DMS Consulting — home" className="w-fit">
            <Image src="/footer/logo-white.png" alt="DMS Consulting" width={130} height={79} />
          </Link>
          <p className="max-w-[336px] text-[15px] leading-[25.2px]">{description}</p>
        </div>

        <div data-reveal className="flex flex-col gap-12 lg:pt-[5px] [--reveal-delay:120ms]">
          <nav aria-labelledby="footer-quick-links" className="flex flex-col gap-6">
            <h2 id="footer-quick-links" className="text-[15px] leading-[25.2px] uppercase">
              Quick Links
            </h2>
            <ul className="flex flex-wrap gap-x-[6px] gap-y-2 text-[15px] leading-[25.2px] uppercase">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-yellow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="text-[15px] leading-[25.2px] uppercase">Let’s Connect</h2>
            <ul className="flex items-center">
              {socials.map((icon) => (
                <li key={icon.key}>
                  {/* Icons link once a URL is set in Sanity → Site Settings. */}
                  {icon.href ? (
                    <a
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`DMS Consulting on ${icon.label}`}
                      className="block transition-opacity hover:opacity-70"
                    >
                      <Image src={icon.src} alt="" width={icon.width} height={36} unoptimized />
                    </a>
                  ) : (
                    <Image src={icon.src} alt="" width={icon.width} height={36} unoptimized />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="lg:pt-1 [--reveal-delay:240ms]">
          <h2 className="sr-only">Contact us</h2>
          <ContactForm />
        </div>
      </div>
    </footer>
  );
}
