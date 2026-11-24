import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "caseStudies", title: "Case Studies" },
    { name: "services", title: "Services" },
    { name: "process", title: "Process" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    defineField({
      name: "cta",
      title: "Call to action section",
      type: "object",
      group: "cta",
      options: { collapsible: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        defineField({
          name: "button",
          title: "Button",
          description: "e.g. a mailto: link, a booking page URL, or a contact page path.",
          type: "link",
        }),
        defineField({
          name: "image",
          title: "Side image",
          description: "Decorative artwork shown on the left half of the panel.",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process section",
      type: "object",
      group: "process",
      options: { collapsible: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "steps",
          title: "Steps",
          description: "Shown as an accordion. The first step starts open.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "processStep",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              ],
              preview: { select: { title: "title", subtitle: "description" } },
            }),
          ],
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services section",
      type: "object",
      group: "services",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "cards",
          title: "Cards",
          description: "Hovering a card flips it to show its services.",
          type: "array",
          of: [{ type: "serviceCard" }],
        }),
      ],
    }),
    defineField({
      name: "caseStudies",
      title: "Case Studies section",
      type: "object",
      group: "caseStudies",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "intro",
          title: "Intro",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "items",
          title: "Case studies",
          description:
            "The first one starts expanded. The carousel is designed for 3 cards.",
          type: "array",
          of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
          validation: (rule) => rule.unique().max(5),
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "primaryCta",
          title: "Primary button",
          type: "link",
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary button",
          type: "link",
        }),
        defineField({
          name: "backgroundVideo",
          title: "Background video",
          description: "Plays muted on loop behind the hero. MP4 (H.264) or WebM, ideally under 10 MB.",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
        }),
        defineField({
          name: "posterImage",
          title: "Poster image",
          description:
            "Shown while the video loads and to visitors who prefer reduced motion.",
          type: "image",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
