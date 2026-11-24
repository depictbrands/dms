"use client";

import { useState, type MouseEvent } from "react";

export type ServiceCardColor = "green" | "yellow" | "blue";

export type ServiceCardData = {
  id: string;
  color: ServiceCardColor;
  title: string;
  description?: string;
  /** Uploaded in Sanity; recoloured to the card's text colour via a CSS mask. */
  icon?: { src: string; aspectRatio: number };
  services: { id: string; title?: string; description?: string }[];
};

/** Icon box from the design: ~80px tall, never wider than 110px. */
const ICON_HEIGHT = 80;
const ICON_MAX_WIDTH = 110;

const COLOR_STYLES: Record<ServiceCardColor, string> = {
  green: "bg-green text-white",
  yellow: "bg-yellow text-base-black",
  blue: "bg-blue text-white",
};

/**
 * Flips to its back on hover (mouse), keyboard focus, or tap (touch devices,
 * where hover doesn't exist). Both faces stay in the DOM, so screen readers
 * read the front and back in order.
 */
export default function ServiceFlipCard({ card }: { card: ServiceCardData }) {
  const [flipped, setFlipped] = useState(false);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Mouse users flip by hovering; only taps (no hover) and keyboard
    // activation (detail === 0) toggle, so a click doesn't leave it stuck.
    const isKeyboard = event.detail === 0;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (isKeyboard || !canHover) setFlipped((value) => !value);
  }

  const face = `absolute inset-0 overflow-hidden rounded-[20px] backface-hidden ${COLOR_STYLES[card.color]}`;

  return (
    <button
      type="button"
      aria-pressed={flipped}
      data-flipped={flipped}
      onClick={handleClick}
      onMouseLeave={() => setFlipped(false)}
      className="group block h-[402px] w-[293px] shrink-0 cursor-default rounded-[20px] text-left perspective-[1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
    >
      <span className="relative block size-full transition-transform duration-500 ease-out transform-3d group-hover:rotate-y-180 group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
        {/* Front */}
        <span className={`${face} flex flex-col px-6 pt-[30px] pb-6`}>
          <span className="block font-display text-[31.1px] leading-[34.21px] font-normal">
            {card.title}
          </span>
          {card.icon && <CardIcon icon={card.icon} />}
          {card.description && (
            <span className="mt-auto block max-w-[245px] text-[18px] leading-[1.35] font-light">
              {card.description}
            </span>
          )}
        </span>

        {/* Back */}
        <span className={`${face} flex rotate-y-180 flex-col gap-8 px-6 pt-10 pb-6`}>
          {card.services.map((service) => (
            <span key={service.id} className="flex flex-col gap-2">
              {service.title && (
                <span className="block font-display text-[21.6px] leading-[23.76px] font-bold uppercase">
                  {service.title}
                </span>
              )}
              {service.description && (
                <span className="block max-w-[235px] text-[12.5px] leading-[25.2px] font-normal">
                  {service.description}
                </span>
              )}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

/**
 * Renders the uploaded icon as a mask filled with `currentColor`, so a single
 * line icon matches each card's text colour (white, or near-black on yellow).
 */
function CardIcon({ icon }: { icon: NonNullable<ServiceCardData["icon"]> }) {
  const ratio = icon.aspectRatio > 0 ? icon.aspectRatio : 1;
  const width = Math.min(ICON_HEIGHT * ratio, ICON_MAX_WIDTH);
  const height = width / ratio;
  const mask = `url("${icon.src}") left center / contain no-repeat`;

  return (
    <span
      aria-hidden
      className="mt-[60px] block shrink-0 bg-current"
      style={{ width, height, mask, WebkitMask: mask }}
    />
  );
}
