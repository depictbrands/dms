import type { CSSProperties } from "react";

import { getHomeServices, type ServiceCardContent } from "@/sanity/lib/queries";

import ServiceFlipCard, { type ServiceCardColor, type ServiceCardData } from "./ServiceFlipCard";

/** Content from the Figma design, used until the section is filled in Sanity. */
const FALLBACK_HEADING =
  "We serve growing organizations with the operational leadership to scale.";

const FALLBACK_CARDS: ServiceCardData[] = [
  {
    id: "fallback-smb",
    color: "green",
    title: "Small and mid-sized businesses",
    description: "1M–50M, for-profit and nonprofit. Scaling without losing what works.",
    services: [
      {
        id: "fractional-coo",
        title: "Fractional COO (flagship)",
        description:
          "A COO's operational leadership without the full-time cost: daily operations, team alignment, KPI dashboards, and strategic execution from the inside.",
      },
      {
        id: "operational-excellence",
        title: "Operational Excellence",
        description:
          "Process redesign, workflow automation, and SOPs that remove bottlenecks and let you scale.",
      },
    ],
  },
  {
    id: "fallback-mission",
    color: "yellow",
    title: "Mission-driven organizations",
    description: "Growth, grant management, and stakeholder accountability.",
    services: [
      {
        id: "strategic-planning",
        title: "Strategic Planning",
        description:
          "Living roadmaps, OKR/KPI frameworks, and leadership alignment that turn vision into prioritized action.",
      },
    ],
  },
  {
    id: "fallback-public",
    color: "blue",
    title: "Public sector & agencies",
    description: "Procurement that favors certified MBE/WBE partners.",
    services: [
      {
        id: "project-management",
        title: "Project Management",
        description:
          "Living roadmaps, OKR/KPI frameworks, and leadership alignment that turn vision into prioritized action.",
      },
    ],
  },
];

const COLOR_CYCLE: ServiceCardColor[] = ["green", "yellow", "blue"];

function toCard(card: ServiceCardContent, index: number): ServiceCardData | null {
  if (!card.title && !card.description && !card.iconUrl && !card.services?.length) return null;
  return {
    id: card._key,
    color: card.color ?? COLOR_CYCLE[index % COLOR_CYCLE.length],
    title: card.title ?? "",
    description: card.description ?? undefined,
    icon: card.iconUrl
      ? { src: card.iconUrl, aspectRatio: card.iconAspectRatio ?? 1 }
      : undefined,
    services: (card.services ?? []).map((service) => ({
      id: service._key,
      title: service.title ?? undefined,
      description: service.description ?? undefined,
    })),
  };
}

export default async function Services() {
  const data = await getHomeServices();

  const cards = (data?.cards ?? [])
    .map(toCard)
    .filter((card): card is ServiceCardData => card !== null);
  const items = cards.length > 0 ? cards : FALLBACK_CARDS;
  const heading = data?.heading || FALLBACK_HEADING;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-[127px] bg-cream-white px-5 py-20 md:px-[50px] lg:pt-[164px] lg:pb-[192px]"
    >
      <h2
        id="services-heading"
        data-reveal="heading"
        className="mx-auto max-w-[1056px] text-center font-display text-[30px] leading-[1.1] font-medium text-balance uppercase text-blue md:text-[44.79px] md:leading-[49.27px]"
      >
        {heading}
      </h2>

      <ul className="mt-12 flex flex-wrap justify-center gap-2 lg:mt-[142px]">
        {items.map((card, index) => (
          <li
            key={card.id}
            data-reveal
            style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
          >
            <ServiceFlipCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
