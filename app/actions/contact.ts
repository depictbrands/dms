"use server";

import { writeClient } from "@/sanity/lib/writeClient";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"firstName" | "email" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string, max: number) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "company", 200)) {
    return { status: "success", message: "Thanks — we'll be in touch soon." };
  }

  const submission = {
    firstName: field(formData, "firstName", 100),
    lastName: field(formData, "lastName", 100),
    email: field(formData, "email", 200),
    phone: field(formData, "phone", 50),
    message: field(formData, "message", 5000),
  };

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!submission.firstName) fieldErrors.firstName = "Please enter your first name.";
  if (!EMAIL_PATTERN.test(submission.email)) fieldErrors.email = "Please enter a valid email.";
  if (!submission.message) fieldErrors.message = "Please write a short message.";
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  if (!writeClient) {
    console.error("Contact form: SANITY_API_WRITE_TOKEN is not set; submission not saved.");
    return {
      status: "error",
      message: "Sorry, the form isn't available right now. Please try again later.",
    };
  }

  try {
    await writeClient.create({
      _type: "contactSubmission",
      ...submission,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Contact form: failed to save submission", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success", message: "Thanks — we'll be in touch soon." };
}
