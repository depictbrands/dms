import { getHomeCaseStudies, type CaseStudyContent } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import CaseStudyCarousel, { type CaseStudyCard } from "./CaseStudyCarousel";

/** Content from the Figma design, used until case studies are added in Sanity. */
const FALLBACK_INTRO =
  "From operational leadership to complex project delivery and strategic planning, see how DMS partners with organizations to turn priorities into action.";

const FALLBACK_ITEMS: CaseStudyCard[] = [
  {
    id: "fallback-events-production-company",
    title: "Large-Scale Events Production Company",
    shortTitle: "Events Production",
    sector: "Public Sector",
    summary:
      "Building the operating layer under a founder-led company. Performance reporting, SOPs, quarterly governance, and role clarity, so the CEO could return to revenue.",
    metric: "300+ residents engaged",
    imageSrc: "/case-studies/events-production-company.png",
    imageAlt: "Open Streets mural painted on orange panels",
  },
  {
    id: "fallback-events-production",
    title: "Large-Scale Events Production Company",
    shortTitle: "Events Production",
    sector: "Public Sector",
    summary:
      "Two seasons, nine neighborhoods, one operating model. Integrated project management across programming, outreach, logistics, marketing, and sponsorship, and a playbook the client owns.",
    metric: "300+ residents engaged",
    imageSrc: "/case-studies/events-production.jpg",
    imageAlt: "Crowd at an outdoor community event with tents",
  },
  {
    id: "fallback-etta",
    title: "Equal Treatment and Territories for Tribal Ancestry (ETTA)",
    shortTitle: "ETTA",
    sector: "Public Sector",
    summary:
      "Turning a generational mission into an operating plan. Organizational strategy, governance, and funding readiness for a Massachusetts nonprofit restoring Indigenous land, wood, and water rights.",
    metric: "300+ residents engaged",
    imageSrc: "/case-studies/etta.jpg",
    imageAlt: "Speaker addressing an audience with a microphone",
  },
];

function toCard(item: CaseStudyContent): CaseStudyCard | null {
  // All fields are optional in Sanity; skip only cards with nothing to show.
  const title = item.title || item.shortTitle;
  if (!title) return null;
  return {
    id: item._id,
    title,
    shortTitle: item.shortTitle || title,
    sector: item.sector ?? undefined,
    summary: item.summary ?? undefined,
    metric: item.metric ?? undefined,
    imageSrc: item.image
      ? urlFor(item.image).width(2040).height(1376).fit("crop").auto("format").url()
      : undefined,
    imageAlt: item.imageAlt || title,
    href: item.pdfUrl ?? undefined,
  };
}

export default async function CaseStudies() {
  const data = await getHomeCaseStudies();

  const cards = (data?.items ?? [])
    .map(toCard)
    .filter((card): card is CaseStudyCard => card !== null);
  const items = cards.length > 0 ? cards : FALLBACK_ITEMS;
  const intro = data?.intro || FALLBACK_INTRO;

  return (
    <section
      id="case-studies"
      aria-label="Case studies"
      className="scroll-mt-[127px] px-5 py-20 md:px-[50px] lg:px-[70px] lg:py-[136px]"
    >
      <div className="flex flex-col gap-10">
        <p data-reveal className="max-w-[1041px] text-[22px] leading-[1.15] font-light text-base-black md:text-[28.5px] md:leading-[31.35px]">
          {intro}
        </p>
        <div data-reveal className="[--reveal-delay:150ms]">
          <CaseStudyCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
