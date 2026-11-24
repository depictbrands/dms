"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

export type CaseStudyCard = {
  id: string;
  title: string;
  shortTitle: string;
  sector?: string;
  summary?: string;
  metric?: string;
  /** Cards without an image show a solid brand-blue background. */
  imageSrc?: string;
  imageAlt: string;
  /** PDF URL. Cards without one render as non-links. */
  href?: string;
};

/** Expanded / collapsed card widths from the Figma design; used as flex-grow ratios. */
const EXPANDED_GROW = 1019;
const COLLAPSED_GROW = 251;

export default function CaseStudyCarousel({ items }: { items: CaseStudyCard[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul
      className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:-mx-[50px] md:scroll-px-[50px] md:px-[50px] lg:mx-0 lg:h-[687px] lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0"
      aria-label="Case studies"
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-active={index === active}
          className="group relative h-[520px] w-[85%] max-w-[480px] shrink-0 snap-start overflow-hidden rounded-[20px] md:h-[600px] lg:h-full lg:w-auto lg:max-w-none lg:min-w-0 lg:shrink lg:basis-0 lg:[flex-grow:var(--grow)] lg:transition-[flex-grow] lg:duration-300 lg:ease-out motion-reduce:transition-none"
          style={{ "--grow": index === active ? EXPANDED_GROW : COLLAPSED_GROW } as CSSProperties}
          onMouseEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
        >
          <CardBody item={item} />
        </li>
      ))}
    </ul>
  );
}

function CardBody({ item }: { item: CaseStudyCard }) {
  const content = (
    <>
      {item.imageSrc ? (
        <>
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 1024px) 60vw, 85vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-black/80" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 bg-blue" />
      )}

      {/* Mobile: copy stacks at the bottom. Desktop: copy and metric are pinned
          independently (top 425px / bottom 50px, per Figma) so every card lines up. */}
      <div className="absolute inset-x-5 bottom-8 flex flex-col gap-8 md:inset-x-10 lg:inset-0">
        <div className="flex flex-col items-start gap-4 lg:absolute lg:top-[425px] lg:left-10">
          {item.sector && (
            <span className="rounded-full bg-hairline px-3 py-1 text-[18px] leading-[1.35] font-light whitespace-nowrap text-blue">
              {item.sector}
            </span>
          )}

          {/* Expanded and collapsed copy share one grid cell and crossfade. */}
          <div className="grid">
            <div className="flex flex-col gap-[5px] [grid-area:1/1] lg:w-[715px] lg:transition-opacity lg:duration-300 lg:ease-out lg:group-data-[active=false]:opacity-0 motion-reduce:transition-none">
              <h3 className="max-w-[715px] text-[24px] leading-[1.1] font-light text-white md:text-[28.5px] md:leading-[31.35px]">
                {item.title}
              </h3>
              {item.summary && (
                <p className="max-w-[599px] text-[16px] leading-[1.35] font-light text-apple-grey md:text-[18px]">
                  {item.summary}
                </p>
              )}
            </div>
            <p
              aria-hidden
              className="hidden w-[171px] text-[28.5px] leading-[31.35px] font-light text-white [grid-area:1/1] lg:block lg:transition-opacity lg:duration-300 lg:ease-out lg:group-data-[active=true]:opacity-0 motion-reduce:transition-none"
            >
              {item.shortTitle}
            </p>
          </div>
        </div>

        {item.metric && (
          <p className="text-[15px] leading-[25.2px] font-bold whitespace-nowrap text-yellow lg:absolute lg:bottom-[50px] lg:left-10">
            {item.metric}
          </p>
        )}
      </div>
    </>
  );

  if (!item.href) {
    return <div className="relative block size-full">{content}</div>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.title} case study (PDF, opens in a new tab)`}
      className="relative block size-full rounded-[20px] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-yellow"
    >
      {content}
    </a>
  );
}
