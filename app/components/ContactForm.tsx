"use client";

import { useActionState } from "react";

import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const INITIAL_STATE: ContactFormState = { status: "idle" };

const inputClass =
  "h-[34px] w-full border-0 border-b border-white bg-transparent p-0 pb-2 text-[15px] leading-[25.2px] text-white placeholder:text-white focus:border-yellow focus:outline-none aria-invalid:border-orange";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_STATE);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <p role="status" className="text-[15px] leading-[25.2px] text-white">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} noValidate aria-label="Contact us" className="flex flex-col">
      <div className="grid gap-x-8 gap-y-[42px] sm:grid-cols-2">
        <Field id="firstName" label="First Name" error={errors.firstName} autoComplete="given-name" />
        <Field id="lastName" label="Last Name" autoComplete="family-name" />
        <Field id="email" label="Email" type="email" error={errors.email} autoComplete="email" />
        <Field id="phone" label="Phone Number" type="tel" autoComplete="tel" />
      </div>

      <div className="mt-[42px]">
        <label htmlFor="message" className="sr-only">
          Write your message.
        </label>
        <textarea
          id="message"
          name="message"
          rows={1}
          placeholder="Write your message."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} h-[37px] resize-none field-sizing-content max-h-40 min-h-[37px]`}
        />
        <FieldError id="message-error" error={errors.message} />
      </div>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-end gap-4">
        {state.status === "error" && state.message && (
          <p role="alert" className="mr-auto text-[15px] leading-[25.2px] text-yellow">
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="h-10 cursor-pointer rounded-full border border-white px-6 py-2 text-center text-[15px] leading-[25.2px] text-white shadow-[0px_0px_14px_0px_rgba(0,0,0,0.12)] transition-colors hover:bg-white hover:text-base-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1 text-[13px] leading-snug text-yellow">
      {error}
    </p>
  );
}
