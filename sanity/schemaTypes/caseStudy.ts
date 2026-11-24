import { DocumentPdfIcon } from "@sanity/icons/DocumentPdf";
import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Shown when the card is expanded. Fits on one line up to about 60 characters.",
      type: "string",
      validation: (rule) =>
        rule.max(60).warning("Long titles wrap and can crowd the summary."),
    }),
    defineField({
      name: "shortTitle",
      title: "Short title",
      description:
        "Shown when the card is collapsed (narrow). Keep it to one or two short words, e.g. “ETTA”.",
      type: "string",
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: "sector",
      title: "Sector tag",
      type: "string",
      placeholder: "Public Sector",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "About three lines on the card. Keep under 200 characters.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "metric",
      title: "Highlight metric",
      type: "string",
      placeholder: "300+ residents engaged",
    }),
    defineField({
      name: "image",
      title: "Card image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "pdf",
      title: "Case study PDF",
      description: "The card links to this file.",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "sector", media: "image" },
  },
});
