"use client";

import FormField from "@/components/features/landing/FormField";
import CheckIcon from "@/components/ui/icons/CheckIcon";
import SendIcon from "@/components/ui/icons/SendIcon";
import { CONTACT_EMAIL } from "@/constants/landing";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactField } from "@/services/contact";

interface FieldConfig {
  name: ContactField;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}

const FIELDS: readonly FieldConfig[] = [
  { name: "name", label: "Your name", placeholder: "Jane Doe", autoComplete: "name" },
  {
    name: "email",
    label: "Work email",
    placeholder: "jane@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "company",
    label: "Company",
    placeholder: "Company name",
    autoComplete: "organization",
  },
  {
    name: "message",
    label: "How can we help?",
    placeholder: "Tell us about your team and goals...",
    multiline: true,
  },
];

export default function ContactForm() {
  const {
    values,
    errors,
    status,
    isBusy,
    formRef,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-brand-teal/10 bg-white/5 p-6 sm:p-8"
    >
      {FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ))}

      <button
        type="submit"
        disabled={isBusy}
        className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-teal-dark py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow disabled:cursor-default disabled:hover:scale-100"
      >
        {status === "sending" ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden
            />
            Sending…
          </>
        ) : status === "sent" ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Message sent
          </>
        ) : (
          <>
            <SendIcon className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

      {status === "sent" ? (
        <p className="text-center text-sm text-brand-teal-light">
          Thanks. Your message is on its way. We&apos;ll be in touch shortly.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="break-words text-center text-sm text-brand-error">
          Sorry, something went wrong. Please email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-teal-light underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <p role="status" aria-live="polite" className="sr-only">
        {status === "sent"
          ? "Your message has been sent."
          : status === "error"
            ? "Your message could not be sent."
            : ""}
      </p>
    </form>
  );
}
