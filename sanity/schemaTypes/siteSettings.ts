import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [{ name: "footer", title: "Footer", default: true }],
  fields: [
    defineField({
      name: "footerDescription",
      title: "Footer description",
      type: "text",
      rows: 2,
      group: "footer",
    }),
    defineField({
      name: "social",
      title: "Social links",
      description: "Leave a field empty to hide that icon.",
      type: "object",
      group: "footer",
      options: { collapsible: false },
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
