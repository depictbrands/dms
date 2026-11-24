import { defineArrayMember, defineField, defineType } from "sanity";

export const SERVICE_CARD_COLORS = [
  { title: "Green", value: "green" },
  { title: "Yellow", value: "yellow" },
  { title: "Blue", value: "blue" },
] as const;

export const serviceCard = defineType({
  name: "serviceCard",
  title: "Service card",
  type: "object",
  fieldsets: [
    { name: "front", title: "Front of card" },
    { name: "back", title: "Back of card (shown on hover)" },
  ],
  fields: [
    defineField({
      name: "color",
      title: "Card colour",
      type: "string",
      options: { list: [...SERVICE_CARD_COLORS], layout: "radio", direction: "horizontal" },
      initialValue: "green",
    }),
    defineField({
      name: "title",
      title: "Audience",
      type: "string",
      fieldset: "front",
      placeholder: "Small and mid-sized businesses",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description:
        "Single-colour line icon (SVG preferred, or PNG with a transparent background). It's automatically recoloured to match the card's text.",
      type: "image",
      fieldset: "front",
      options: { accept: "image/svg+xml,image/png" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      fieldset: "front",
      validation: (rule) => rule.max(90).warning("Long descriptions may not fit the card."),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      fieldset: "back",
      validation: (rule) => rule.max(3).warning("More than two or three services may not fit."),
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceItem",
          fields: [
            defineField({ name: "title", title: "Service", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", color: "color" },
    prepare: ({ title, color }) => ({
      title: title || "Untitled card",
      subtitle: color ? `${color[0].toUpperCase()}${color.slice(1)} card` : undefined,
    }),
  },
});
