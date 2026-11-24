import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

/** Created by the footer contact form. Read-only in the Studio. */
export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({ name: "firstName", title: "First name", type: "string" }),
    defineField({ name: "lastName", title: "Last name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 6 }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { firstName: "firstName", lastName: "lastName", email: "email", submittedAt: "submittedAt" },
    prepare: ({ firstName, lastName, email, submittedAt }) => ({
      title: [firstName, lastName].filter(Boolean).join(" ") || email || "Submission",
      subtitle: [email, submittedAt ? new Date(submittedAt).toLocaleString() : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
