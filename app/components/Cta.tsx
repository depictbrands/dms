import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import { getHomeCta } from "@/sanity/lib/queries";

/** Content from the Figma design, used until the section is filled in Sanity. */
const FALLBACK = {
  heading: "Looking for an assist?",
  body: "Tell us about your challenge. Whether you're scaling operations, launching a new initiative, or restructuring for growth — we're ready to help.",
  // Placeholder target until a real destination is set in Sanity.
  button: { label: "Let's Talk", href: "#contact" },
  imageSrc: "/cta/pattern.png",
};

export default async function Cta() {
  const data = await getHomeCta();

  const heading = data?.heading || FALLBACK.heading;
  const body = data?.body || FALLBACK.body;
  const button =
    data?.button?.label && data?.button?.href
      ? { label: data.button.label, href: data.button.href }
      : FALLBACK.button;
  const imageSrc = data?.image
    ? urlFor(data.image).width(1602).height(1084).fit("crop").auto("format").url()
    : FALLBACK.imageSrc;
  const isExternal = /^(https?:|mailto:|tel:)/.test(button.href);

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="scroll-mt-[127px] bg-apple-grey p-5 md:p-10"
    >
      <div className="grid overflow-hidden rounded-[20px] bg-blue lg:h-[542px] lg:grid-cols-[801fr_847fr]">
        <div className="relative h-[220px] md:h-[320px] lg:h-full">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-center gap-[31px] px-6 py-12 md:px-12 lg:py-0 lg:pr-[107px] lg:pl-[49px]">
          <div className="flex max-w-[692px] flex-col gap-6 text-white md:gap-9">
            <h2
              id="cta-heading"
              data-reveal="heading"
              className="font-display text-[36px] leading-[1.1] font-medium uppercase md:text-[53.75px]"
            >
              {heading}
            </h2>
            <p
              data-reveal
              className="text-[22px] leading-[1.15] font-light md:text-[28.5px] md:leading-[31.35px] [--reveal-delay:150ms]"
            >
              {body}
            </p>
          </div>

          <div data-reveal className="[--reveal-delay:300ms]">
            <Link
              href={button.href}
              {...(isExternal && !button.href.startsWith("mailto:") && !button.href.startsWith("tel:")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex h-[54px] items-center justify-center rounded-full bg-white px-6 py-3 text-center text-[18px] leading-[1.35] font-light whitespace-nowrap text-blue transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {button.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
