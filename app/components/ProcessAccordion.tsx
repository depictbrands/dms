"use client";

import { useId, useState } from "react";

export type ProcessStep = {
  id: string;
  title: string;
  description?: string;
};

/**
 * Single-open accordion: one step is always expanded; the first starts open.
 * Hovering a step opens it; click/tap and Enter/Space still work for touch
 * and keyboard users. The last hovered step stays open when the mouse leaves.
 */
export default function ProcessAccordion({ steps }: { steps: ProcessStep[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const isOpen = index === open;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={step.id}
            data-open={isOpen}
            onMouseEnter={() => setOpen(index)}
            className={[
              "border-solid transition-[background-color,padding,border-color,border-width] duration-300 ease-out motion-reduce:transition-none",
              isOpen
                ? "border-l-3 border-l-orange bg-apple-grey px-6 py-10 md:px-9"
                : "border-b border-b-divider py-6",
              !isOpen && index === 0 ? "border-t border-t-divider" : "",
            ].join(" ")}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(index)}
                className="w-full cursor-pointer text-left font-display text-[21.6px] leading-[23.76px] font-bold uppercase text-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                {step.title}
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {step.description && (
                  <p className="pt-2 text-[18px] leading-[1.35] font-light text-blue">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
