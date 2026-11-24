import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import { getHomeProcess } from "@/sanity/lib/queries";

import ProcessAccordion, { type ProcessStep } from "./ProcessAccordion";

/** Content from the Figma design, used until the section is filled in Sanity. */
const FALLBACK = {
  heading: "How we work with you",
  intro:
    "From discovery to delivery, we work alongside your team to understand what’s holding growth back, design the right approach, and put practical systems in place that last.",
  steps: [
    {
      id: "discover",
      title: "Discover",
      description: "A short conversation about your goals and where growth is straining the system.",
    },
    {
      id: "design",
      title: "Design",
      description: "A tailored proposal within five business days.",
    },
    {
      id: "deliver",
      title: "Deliver",
      description: "We execute alongside your team, then hand off the systems so results hold.",
    },
  ] satisfies ProcessStep[],
  imageSrc: "/process/team.jpg",
  imageAlt: "Team members sharing a high five in a bright office",
};

export default async function Process() {
  const data = await getHomeProcess();

  const steps: ProcessStep[] = (data?.steps ?? [])
    .filter((step) => step.title)
    .map((step) => ({
      id: step._key,
      title: step.title as string,
      description: step.description ?? undefined,
    }));

  const heading = data?.heading || FALLBACK.heading;
  const intro = data?.intro || FALLBACK.intro;
  const imageSrc = data?.image
    ? urlFor(data.image).width(1112).height(614).fit("crop").auto("format").url()
    : FALLBACK.imageSrc;
  const imageAlt = data?.image ? data.imageAlt || "" : FALLBACK.imageAlt;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-[127px] bg-white px-5 py-20 md:px-[50px] lg:pt-[86px] lg:pb-[183px]"
    >
      <div className="mx-auto max-w-[1089px]">
        <div className="flex flex-col gap-6 text-blue md:gap-9">
          <h2
            id="process-heading"
            data-reveal="heading"
            className="font-display text-[30px] leading-[1.1] font-medium uppercase md:text-[44.79px] md:leading-[49.27px]"
          >
            {heading}
          </h2>
          <p
            data-reveal
            className="text-[22px] leading-[1.15] font-light md:text-[28.5px] md:leading-[31.35px] [--reveal-delay:150ms]"
          >
            {intro}
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-[57px] lg:grid-cols-[503fr_556fr] lg:gap-[17px] lg:pl-[5px]">
          <div data-reveal className="[--reveal-delay:150ms]">
            <ProcessAccordion steps={steps.length > 0 ? steps : FALLBACK.steps} />
          </div>
          <div
            data-reveal
            className="relative aspect-[556/307] overflow-hidden rounded-[20px] lg:-mt-[3px] [--reveal-delay:300ms]"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 556px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
