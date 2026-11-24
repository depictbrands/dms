import Link from "next/link";

import { getHomeHero, type HeroContent } from "@/sanity/lib/queries";

/** Copy from the Figma design, used until the field is filled in Sanity. */
const FALLBACK = {
  heading: "Where Strategy Meets Momentum",
  body: "An operations management firm for founders, executives, and institutions at the intersection of growth and scale. We align strategy, operations, and delivery into measurable results.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "View Our Work", href: "#case-studies" },
};

function resolveCta(
  cta: HeroContent["primaryCta"],
  fallback: { label: string; href: string },
) {
  return cta?.label && cta?.href ? { label: cta.label, href: cta.href } : fallback;
}

export default async function Hero() {
  const hero = await getHomeHero();

  const heading = hero?.heading || FALLBACK.heading;
  const body = hero?.body || FALLBACK.body;
  const primaryCta = resolveCta(hero?.primaryCta, FALLBACK.primaryCta);
  const secondaryCta = resolveCta(hero?.secondaryCta, FALLBACK.secondaryCta);
  const posterUrl = hero?.posterUrl ?? undefined;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[640px] overflow-hidden bg-cream bg-cover bg-center lg:min-h-[990px]"
      style={posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined}
    >
      {hero?.videoUrl && (
        <video
          className="absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterUrl}
          aria-hidden="true"
        >
          <source src={hero.videoUrl} type={hero.videoMimeType ?? undefined} />
        </video>
      )}

      <div className="flex w-full max-w-[calc(800px+2*137px)] flex-col items-start gap-6 px-5 pt-24 pb-16 md:px-[50px] lg:px-[137px] lg:pt-[176px]">
        <h1
          id="hero-heading"
          data-reveal="heading"
          className="max-w-[800px] text-balance font-display text-[34px] leading-[1.1] font-medium uppercase text-blue md:text-[44.79px] md:leading-[49.27px]"
        >
          {heading}
        </h1>

        <div className="flex flex-col items-start gap-4">
          <p
            data-reveal
            className="max-w-[479px] text-[18px] leading-[1.35] font-light text-blue whitespace-pre-line [--reveal-delay:150ms]"
          >
            {body}
          </p>

          <div data-reveal className="flex flex-wrap items-center gap-6 [--reveal-delay:300ms]">
            <Link
              href={primaryCta.href}
              className="flex h-[54px] items-center justify-center rounded-full bg-blue px-6 py-3 text-[16px] leading-6 tracking-[-0.3125px] whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="flex h-[54px] items-center justify-center rounded-full border border-blue px-[25px] py-[13px] text-[16px] leading-6 tracking-[-0.3125px] whitespace-nowrap text-blue transition-colors hover:bg-blue hover:text-white"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
